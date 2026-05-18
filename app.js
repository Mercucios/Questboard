'use strict';

const STORE_STATE = 'qb_state';
const STORE_STARS = 'qb_stars';
const MAX_MANA    = 10;

const QUESTS_DATA = [
  { name: 'Duschen',            mana: 2, category: 'Körperpflege',  rest: false },
  { name: 'Haare waschen',      mana: 2, category: 'Körperpflege',  rest: false },
  { name: 'Zähneputzen',        mana: 1, category: 'Körperpflege',  rest: false },
  { name: 'Einkaufen',          mana: 5, category: 'Outdoor',        rest: false },
  { name: 'Spazieren gehen',    mana: 2, category: 'Outdoor',        rest: false },
  { name: 'Garderobe ordnen',   mana: 1, category: 'Vorraum',        rest: false },
  { name: 'Kommode ordnen',     mana: 1, category: 'Ordnung',        rest: false },
  { name: 'Tafeln reinigen',    mana: 1, category: 'Ordnung',        rest: false },
  { name: 'Klopapier nachfüllen', mana: 1, category: 'WC',           rest: false },
  { name: 'Geschirrspüler',     mana: 1, category: 'Küche',          rest: false },
  { name: 'Kaffee Corner ordnen', mana: 1, category: 'Küche',        rest: false },
  { name: 'Staubwischen',       mana: 1, category: 'Wohnzimmer',     rest: false },
  { name: 'Bettwäsche wechseln', mana: 2, category: 'Schlafzimmer',  rest: false },
  { name: 'Handtücher wechseln', mana: 2, category: 'Bad',           rest: false },
  { name: 'Bett machen',        mana: 1, category: 'Schlafzimmer',   rest: false },
  { name: 'Waschbecken wischen', mana: 1, category: 'Bad',           rest: false },
  { name: 'Gewandkasten ordnen', mana: 2, category: 'Catze Hort',    rest: false },
  { name: 'Waschen',            mana: 1, category: 'Wäsche',         rest: false },
  { name: 'Aufhängen',          mana: 1, category: 'Wäsche',         rest: false },
  { name: 'Sortieren',          mana: 1, category: 'Wäsche',         rest: false },
  { name: 'Wegräumen',          mana: 1, category: 'Wäsche',         rest: false },
  { name: 'Musik hören',        mana: 0, category: 'Rast & Freude',  rest: true  },
  { name: 'Zeichnen',           mana: 0, category: 'Rast & Freude',  rest: true  },
  { name: 'Häkeln',             mana: 0, category: 'Rast & Freude',  rest: true  },
  { name: 'Zocken',             mana: 0, category: 'Rast & Freude',  rest: true  },
  { name: 'Pferde',             mana: 0, category: 'Rast & Freude',  rest: true  },
  { name: 'Musizieren',         mana: 0, category: 'Rast & Freude',  rest: true  },
  { name: 'Lesen',              mana: 0, category: 'Rast & Freude',  rest: true  },
  { name: 'Balkonieren',        mana: 0, category: 'Rast & Freude',  rest: true  },
];

const MOOD_GLYPH = {
  'sehr-gut':       '☀️',
  'gut':            '🌤️',
  'okay':           '⛅',
  'schlecht':       '☁️',
  'nur-ueberleben': '🌧️',
};
const MOOD_LABEL = {
  'sehr-gut':       'Sehr gut',
  'gut':            'Gut',
  'okay':           'Okay',
  'schlecht':       'Schlecht',
  'nur-ueberleben': 'Überleben',
};

const MOOD_CONFIG = {
  'sehr-gut':       { regularCount: 4, restCount: 2 },
  'gut':            { regularCount: 3, restCount: 2 },
  'okay':           { regularCount: 2, restCount: 2 },
  'schlecht':       { regularCount: 1, restCount: 2 },
  'nur-ueberleben': { regularCount: 0, restCount: 2 },
};

const STORE_RHYTHM = 'qb_rhythm';

// Interval in days; array = random pick between the values
const RHYTHM_RULES = {
  'Bettwäsche wechseln':  14,
  'Handtücher wechseln':  14,
  'Gewandkasten ordnen':  7,
  'Waschbecken wischen':  7,
  'Staubwischen':         7,
  'Kaffee Corner ordnen': 7,
  'Haare waschen':        [2, 3],
  'Geschirrspüler':       [2, 3],
  'Waschen':              [2, 3],
};

const TREASURE_ITEMS = [
  { name: 'Rubin',           color: '#c0392b' },
  { name: 'Saphir',          color: '#2471a3' },
  { name: 'Smaragd',         color: '#1e8449' },
  { name: 'Amethyst',        color: '#7d3c98' },
  { name: 'Opal',            color: '#d5d8dc', special: 'opal' },
  { name: 'Topas',           color: '#f39c12' },
  { name: 'Aquamarin',       color: '#48c9b0' },
  { name: 'Mondstein',       color: '#eaf0f6', special: 'moonstone' },
  { name: 'Obsidian',        color: '#1a1a2e' },
  { name: 'Rosenquarz',      color: '#f1948a' },
  { name: 'Tigerauge',       color: '#ca6f1e' },
  { name: 'Lapislazuli',     color: '#1a5276' },
  { name: 'Citrin',          color: '#f9ca24' },
  { name: 'Malachit',        color: '#1d8348' },
  { name: 'Turmalin',        color: '#e91e8c' },
  { name: 'Bergkristall',    color: '#d6eaf8' },
  { name: 'Granat',          color: '#8b0000' },
  { name: 'Feueropal',       color: '#e55a00', special: 'fireopal' },
  { name: 'Geodenkristall',  color: '#9b59b6' },
  { name: 'Diamantsplitter', color: '#eaf4fc', special: 'diamond' },
];

const REST_MSGS = [
  'Heute reicht es, einfach da zu sein. Das ist genug.',
  'Manche Tage sind zum Überstehen da. Du machst das.',
  'Kein Kampf heute – nur Ruhe. Du hast sie verdient.',
  'Es ist okay, heute nichts zu leisten. Du bist mehr als deine Aufgaben.',
  'Heute darfst du einfach atmen. Alles andere kann warten.',
  'Selbst die leiseste Flamme leuchtet noch. Du auch.',
  'Du musst heute nichts beweisen – nicht mir, nicht dir.',
  'Ruh dich aus. Morgen ist ein neuer Tag mit neuer Energie.',
];

const REWARD_MSGS = [
  'Du bist wunderschön — und du schaffst das.',
  'Ich bin so stolz auf dich. Wirklich.',
  'Jeder kleine Schritt zählt. Du machst das großartig.',
  'Du bist tapferer als du weißt.',
  'Siehst du? Du kannst das. Immer wieder.',
  'Dein Drachen-Herz leuchtet heute ganz hell.',
  'Du verdienst jeden dieser Schätze.',
  'So ein toller Mensch du bist.',
  'Das war mutig. Ich bin beeindruckt.',
  'Schritt für Schritt — und du bist schon so weit.',
  'Du bist genug. Heute und jeden Tag.',
  'Nicht aufgeben — du bist auf dem richtigen Weg.',
  'Diese Energie gehört dir. Du hast sie verdient.',
  'Welch tapferes Wesen du bist!',
  'Dein innerer Drache ist mächtig.',
  'Heute bist du dein eigenes Abenteuer.',
  'Kleines Licht, große Flamme — das bist du.',
  'Du sorgst für dich, und das ist alles.',
  'Kleine Schritte, großes Herz. Du schaffst das.',
  'Die Horde wächst — genau wie du.',
];

// ── Daily Symbols ─────────────────────────────────────────────────────────────

const DAILY_SYMBOLS = [
  // Drache
  `<svg viewBox="0 0 50 50" width="50" height="50" aria-hidden="true">
    <ellipse cx="25" cy="33" rx="13" ry="8" fill="none" stroke="#c084fc" stroke-width="1.8"/>
    <ellipse cx="15" cy="23" rx="6.5" ry="5.5" fill="#a855f7" stroke="#d8b4fe" stroke-width="1.5"/>
    <path d="M22 27 Q30 14 42 18 Q35 24 26 27Z" fill="#7c3aed" stroke="#d8b4fe" stroke-width="1.5"/>
    <path d="M22 27 Q20 14 10 14 Q16 22 20 27Z" fill="#7c3aed" stroke="#d8b4fe" stroke-width="1.5"/>
    <circle cx="12.5" cy="22" r="1.8" fill="#f0c040"/>
    <path d="M36 36 Q42 36 46 42" stroke="#c084fc" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M7 22 Q3 18 5 13 Q7 17 9 15 Q9 20 11 18 Q9 23 7 22Z" fill="#f0c040"/>
  </svg>`,
  // Mond
  `<svg viewBox="0 0 50 50" width="50" height="50" aria-hidden="true">
    <path d="M32 8 Q18 12 16 25 Q14 38 28 44 Q14 42 10 30 Q6 16 20 8 Q26 5 32 8Z" fill="#a855f7" stroke="#d8b4fe" stroke-width="1.8"/>
    <circle cx="34" cy="14" r="2" fill="#f0c040"/>
    <circle cx="38" cy="23" r="1.3" fill="#f0c040" opacity="0.7"/>
    <circle cx="36" cy="32" r="1.5" fill="#c084fc" opacity="0.8"/>
    <circle cx="30" cy="10" r="1" fill="#d8b4fe" opacity="0.8"/>
  </svg>`,
  // Hexenhut
  `<svg viewBox="0 0 50 50" width="50" height="50" aria-hidden="true">
    <ellipse cx="25" cy="44" rx="18" ry="5" fill="#7c3aed" stroke="#d8b4fe" stroke-width="1.5"/>
    <path d="M25 6 L12 40 L38 40 Z" fill="#a855f7" stroke="#d8b4fe" stroke-width="1.8"/>
    <path d="M13 34 Q25 30 37 34" fill="none" stroke="#f0c040" stroke-width="2" stroke-linecap="round"/>
    <path d="M17 22 Q25 19 33 22" fill="none" stroke="#f0c040" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="25" cy="6" r="2.5" fill="#f0c040"/>
  </svg>`,
  // Kristall
  `<svg viewBox="0 0 50 50" width="50" height="50" aria-hidden="true">
    <path d="M25 4 L36 16 L32 44 L18 44 L14 16 Z" fill="#a855f7" stroke="#d8b4fe" stroke-width="1.8"/>
    <path d="M14 16 L25 4 L36 16 Z" fill="#c084fc" stroke="#d8b4fe" stroke-width="1.5"/>
    <line x1="25" y1="4" x2="25" y2="44" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
    <circle cx="25" cy="4" r="2.5" fill="#f0c040"/>
    <line x1="36" y1="16" x2="44" y2="20" stroke="#f0c040" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="14" y1="16" x2="6"  y2="20" stroke="#f0c040" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  // Galaxie
  `<svg viewBox="0 0 50 50" width="50" height="50" aria-hidden="true">
    <circle cx="25" cy="25" r="4" fill="#f0c040"/>
    <ellipse cx="25" cy="25" rx="18" ry="6" fill="none" stroke="#c084fc" stroke-width="1.8" transform="rotate(-25 25 25)"/>
    <ellipse cx="25" cy="25" rx="13" ry="4" fill="none" stroke="#a855f7" stroke-width="1.5" transform="rotate(30 25 25)"/>
    <circle cx="8"  cy="18" r="1.5" fill="#d8b4fe"/>
    <circle cx="42" cy="32" r="1.5" fill="#d8b4fe"/>
    <circle cx="40" cy="15" r="1"   fill="#f0e4c0"/>
    <circle cx="12" cy="36" r="1"   fill="#f0e4c0"/>
    <circle cx="30" cy="10" r="1.2" fill="#c084fc"/>
  </svg>`,
  // Zauberstab
  `<svg viewBox="0 0 50 50" width="50" height="50" aria-hidden="true">
    <line x1="10" y1="40" x2="36" y2="14" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M36 14 L34 6 L38 12 L46 10 L40 16 L44 22 L38 18 L36 26 L34 18 L28 22 L32 14Z" fill="#f0c040" stroke="#f0e4c0" stroke-width="1"/>
    <circle cx="10" cy="40" r="3" fill="#a855f7" stroke="#d8b4fe" stroke-width="1.5"/>
    <circle cx="20" cy="28" r="1.5" fill="#f0c040" opacity="0.7"/>
    <circle cx="15" cy="34" r="1"   fill="#d8b4fe" opacity="0.8"/>
  </svg>`,
  // Burg
  `<svg viewBox="0 0 50 50" width="50" height="50" aria-hidden="true">
    <rect x="8"  y="22" width="34" height="22" fill="none" stroke="#c084fc" stroke-width="1.8"/>
    <rect x="8"  y="15" width="5"  height="9"  fill="#a855f7" stroke="#d8b4fe" stroke-width="1.5"/>
    <rect x="15" y="15" width="5"  height="9"  fill="#a855f7" stroke="#d8b4fe" stroke-width="1.5"/>
    <rect x="30" y="15" width="5"  height="9"  fill="#a855f7" stroke="#d8b4fe" stroke-width="1.5"/>
    <rect x="37" y="15" width="5"  height="9"  fill="#a855f7" stroke="#d8b4fe" stroke-width="1.5"/>
    <path d="M20 44 L20 34 Q25 30 30 34 L30 44" fill="#060614" stroke="#d8b4fe" stroke-width="1.5"/>
    <rect x="11" y="27" width="5" height="6" rx="1" fill="#f0c040" opacity="0.7"/>
    <rect x="34" y="27" width="5" height="6" rx="1" fill="#f0c040" opacity="0.7"/>
    <line x1="25" y1="4" x2="25" y2="16" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M25 4 L33 8 L25 12Z" fill="#f0c040"/>
  </svg>`,
  // Trank
  `<svg viewBox="0 0 50 50" width="50" height="50" aria-hidden="true">
    <rect x="19" y="9"  width="12" height="7" rx="2" fill="#a855f7" stroke="#d8b4fe" stroke-width="1.5"/>
    <rect x="21" y="6"  width="8"  height="5" rx="2" fill="#c084fc" stroke="#d8b4fe" stroke-width="1.5"/>
    <path d="M19 16 L14 28 Q12 38 25 44 Q38 38 36 28 L31 16Z" fill="#7c3aed" stroke="#d8b4fe" stroke-width="1.8"/>
    <path d="M15 32 Q25 28 35 32 Q38 38 25 43 Q12 38 15 32Z" fill="#c084fc" opacity="0.7"/>
    <circle cx="20" cy="36" r="2"   fill="#f0e4c0" opacity="0.5"/>
    <circle cx="28" cy="34" r="1.5" fill="#f0e4c0" opacity="0.4"/>
    <circle cx="32" cy="21" r="2.5" fill="#f0c040"/>
    <line x1="32" y1="17" x2="32" y2="25" stroke="#f0c040" stroke-width="1.5"/>
    <line x1="28" y1="21" x2="36" y2="21" stroke="#f0c040" stroke-width="1.5"/>
  </svg>`,
];

function getDailySymbol() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day   = Math.floor((now - start) / 86400000);
  return DAILY_SYMBOLS[day % DAILY_SYMBOLS.length];
}

// ── Category Icons ─────────────────────────────────────────────────────────────

let _catIdx = 0;

function _rg(id, cx, cy, r, c1, c2) {
  return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></radialGradient>`;
}

const CATEGORY_META = {
  'Körperpflege': { color:'#7ab0e0', icon(id){ return `<svg viewBox="0 0 20 22" width="16" height="18" aria-hidden="true"><defs>${_rg(id,6,5,14,'#90c8f8','#3a5a8a')}</defs><path d="M10 2Q4 11 4 15.5A6 6 0 0 0 16 15.5Q16 11 10 2Z" fill="url(#${id})"/><ellipse cx="7.5" cy="12" rx="1.1" ry="2.3" transform="rotate(-22,7.5,12)" fill="rgba(255,255,255,0.38)"/></svg>`; } },
  'Outdoor':      { color:'#5aaa6a', icon(id){ return `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><defs>${_rg(id,6,4,13,'#6ac07a','#226a32')}</defs><path d="M10 18C6 13 2 6 5 3C9 1 17 3 17 8C17 13 14 18 10 18Z" fill="url(#${id})"/><path d="M10 18Q12 11 15 6.5" stroke="rgba(255,255,255,0.22)" stroke-width="0.8" fill="none" stroke-linecap="round"/><ellipse cx="8.5" cy="8" rx="1.2" ry="2" transform="rotate(25,8.5,8)" fill="rgba(255,255,255,0.32)"/></svg>`; } },
  'Küche':        { color:'#e08a30', icon(id){ return `<svg viewBox="0 0 20 22" width="14" height="16" aria-hidden="true"><defs>${_rg(id,8,5,14,'#f0b050','#7a3a08')}</defs><path d="M10 21C6 18 4 12 7 9C7.5 11 9 11.5 9 11.5C9 7.5 10.5 3.5 13 2C11.5 6.5 15 9.5 13.5 13.5C15.5 11 15 8.5 14 8.5C17 11 16 17 12 21C11.3 21.3 10.7 21.3 10 21Z" fill="url(#${id})"/><ellipse cx="9.5" cy="9" rx="0.9" ry="1.7" transform="rotate(-20,9.5,9)" fill="rgba(255,240,160,0.42)"/></svg>`; } },
  'Schlafzimmer': { color:'#8a70c0', icon(id){ return `<svg viewBox="0 0 20 22" width="15" height="17" aria-hidden="true"><defs>${_rg(id,7,5,13,'#9888cc','#2a1a5a')}</defs><path d="M13 3C8 3 4 7.5 4 13C4 16.5 6.5 19.5 10 21C8 19 7 16 8.5 12.5C10.5 7.5 15.5 6 18.5 8.5C17.5 5.5 15.5 3.5 13 3Z" fill="url(#${id})"/><ellipse cx="9" cy="9" rx="0.9" ry="1.6" transform="rotate(-25,9,9)" fill="rgba(255,255,255,0.3)"/></svg>`; } },
  'Vorraum':      { color:'#b08040', icon(id){ return `<svg viewBox="0 0 20 22" width="14" height="16" aria-hidden="true"><defs>${_rg(id,7,5,12,'#d09850','#4a2808')}</defs><rect x="3" y="3" width="14" height="18" rx="1.5" fill="url(#${id})"/><path d="M3 3Q10 1 17 3L17 9Q10 7 3 9Z" fill="rgba(255,255,255,0.08)"/><circle cx="13.5" cy="12" r="1.4" fill="rgba(255,255,255,0.52)"/></svg>`; } },
  'Ordnung':      { color:'#c0a030', icon(id){ return `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><defs>${_rg(id,7,5,12,'#e8c848','#6a5010')}</defs><path d="M10 1L11.5 8.5L19 10L11.5 11.5L10 19L8.5 11.5L1 10L8.5 8.5Z" fill="url(#${id})"/><ellipse cx="8.5" cy="6.5" rx="1" ry="1.8" transform="rotate(-20,8.5,6.5)" fill="rgba(255,255,255,0.42)"/></svg>`; } },
  'WC':           { color:'#50a890', icon(id){ return `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><defs>${_rg(id,7,6,11,'#70c8b0','#1a6058')}</defs><circle cx="10" cy="10" r="7.5" fill="url(#${id})"/><circle cx="10" cy="10" r="3.8" fill="rgba(6,4,20,0.62)"/><ellipse cx="7.5" cy="6.5" rx="1.2" ry="1.8" transform="rotate(-20,7.5,6.5)" fill="rgba(255,255,255,0.38)"/></svg>`; } },
  'Wohnzimmer':   { color:'#c07838', icon(id){ return `<svg viewBox="0 0 22 18" width="18" height="14" aria-hidden="true"><defs>${_rg(id,6,4,14,'#d89858','#4a2808')}</defs><rect x="1" y="6" width="20" height="10" rx="2.5" fill="url(#${id})"/><rect x="1" y="6" width="4.5" height="10" rx="2" fill="url(#${id})"/><rect x="16.5" y="6" width="4.5" height="10" rx="2" fill="url(#${id})"/><rect x="4.5" y="3" width="13" height="6" rx="2.5" fill="url(#${id})"/><ellipse cx="8" cy="6" rx="1.5" ry="1" fill="rgba(255,255,255,0.28)"/></svg>`; } },
  'Bad':          { color:'#4aa0b8', icon(id){ return `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><defs>${_rg(id,6,4,12,'#70c0e0','#1a6080')}</defs><circle cx="10" cy="7.5" r="5.5" fill="url(#${id})"/><circle cx="8" cy="14" r="1.3" fill="url(#${id})"/><circle cx="10.5" cy="16" r="1.3" fill="url(#${id})"/><circle cx="13" cy="14" r="1.3" fill="url(#${id})"/><ellipse cx="7.5" cy="5.5" rx="1.1" ry="1.7" transform="rotate(-20,7.5,5.5)" fill="rgba(255,255,255,0.38)"/></svg>`; } },
  'Wäsche':       { color:'#7890c0', icon(id){ return `<svg viewBox="0 0 22 20" width="17" height="15" aria-hidden="true"><defs>${_rg(id,6,5,13,'#98b0e0','#2a406a')}</defs><path d="M5 5C2 5 1 8 3.5 9L5.5 9.5V18H16.5V9.5L18.5 9C21 8 20 5 17 5L14 7L11 5.5L8 7Z" fill="url(#${id})"/><ellipse cx="8.5" cy="8" rx="1.2" ry="1.9" transform="rotate(20,8.5,8)" fill="rgba(255,255,255,0.3)"/></svg>`; } },
  'Catze Hort':   { color:'#c07098', icon(id){ return `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><defs>${_rg(id,6,5,12,'#e098c0','#5a1848')}</defs><ellipse cx="10" cy="14" rx="5.5" ry="4.5" fill="url(#${id})"/><circle cx="6.5" cy="8.5" r="2.4" fill="url(#${id})"/><circle cx="10" cy="7" r="2.4" fill="url(#${id})"/><circle cx="13.5" cy="8.5" r="2.4" fill="url(#${id})"/><ellipse cx="8" cy="13" rx="0.9" ry="1.4" fill="rgba(255,255,255,0.28)"/></svg>`; } },
  'Rast & Freude':{ color:'#c0a840', icon(id){ return `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><defs>${_rg(id,7,5,12,'#f0d060','#706010')}</defs><path d="M10 1L11.5 8.5L19 10L11.5 11.5L10 19L8.5 11.5L1 10L8.5 8.5Z" fill="url(#${id})"/><ellipse cx="8.5" cy="6.5" rx="0.9" ry="1.5" transform="rotate(-15,8.5,6.5)" fill="rgba(255,255,255,0.45)"/></svg>`; } },
};

function catIconHtml(cat) {
  const m = CATEGORY_META[cat];
  if (!m) return `<span class="quest-cat-label">${cat}</span>`;
  const id = `ci${++_catIdx}`;
  return `<span class="quest-cat-icon">${m.icon(id)}</span><span class="quest-cat-label" style="color:${m.color}">${cat}</span>`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const $ = id => document.getElementById(id);

function gemDotHtml(t, size) {
  const color = t.color || '#888';
  const cls = t.special ? ` gem-${t.special}` : '';
  return `<span class="gem-dot gem-dot--${size}${cls}" style="--gem-color:${color}"></span>`;
}
const todayStr = () =>
  new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Vienna' }).format(new Date());

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Storage ───────────────────────────────────────────────────────────────────

function loadDayState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_STATE));
    return s?.date === todayStr() ? s : null;
  } catch { return null; }
}

function saveDayState(s) {
  localStorage.setItem(STORE_STATE, JSON.stringify(s));
}

function loadStars() {
  try { return JSON.parse(localStorage.getItem(STORE_STARS)) || []; }
  catch { return []; }
}

function saveStars(stars) {
  localStorage.setItem(STORE_STARS, JSON.stringify(stars));
}

function loadRhythm() {
  try { return JSON.parse(localStorage.getItem(STORE_RHYTHM)) || {}; }
  catch { return {}; }
}

function saveRhythm(r) {
  localStorage.setItem(STORE_RHYTHM, JSON.stringify(r));
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Vienna' }).format(d);
}

function isQuestDue(name, rhythm) {
  const rule = RHYTHM_RULES[name];
  if (!rule) return true;
  const entry = rhythm[name];
  if (!entry) return true;
  return todayStr() >= entry.nextDue;
}

function markRhythmDone(name, rhythm) {
  const rule = RHYTHM_RULES[name];
  if (!rule) return;
  const interval = Array.isArray(rule)
    ? rule[Math.floor(Math.random() * rule.length)]
    : rule;
  rhythm[name] = { lastDone: todayStr(), nextDue: addDays(todayStr(), interval) };
}

// ── Quest selection ───────────────────────────────────────────────────────────

function selectQuests(allQuests, mood) {
  const rhythm     = loadRhythm();
  const restQuests = allQuests.filter(q => q.rest);

  if (mood === 'nur-ueberleben') {
    const shown = shuffle(restQuests).slice(0, 2);
    const shownNames = new Set(shown.map(q => q.name));
    return {
      quests: shown.map(q => ({ ...q, done: false })),
      pool:   restQuests.filter(q => !shownNames.has(q.name)).map(q => ({ ...q, done: false })),
    };
  }

  const cfg        = MOOD_CONFIG[mood];
  const dueActions = allQuests.filter(q => !q.rest && isQuestDue(q.name, rhythm));

  // Duschen is always first if due
  const shower   = dueActions.find(q => q.name === 'Duschen');
  const others   = shuffle(dueActions.filter(q => q.name !== 'Duschen'));
  const fillCount = shower ? cfg.regularCount - 1 : cfg.regularCount;
  const actions  = shower
    ? [shower, ...others.slice(0, fillCount)]
    : others.slice(0, fillCount);

  const rests         = shuffle(restQuests).slice(0, cfg.restCount);
  const allSelected   = [...actions, ...rests];
  const selectedNames = new Set(allSelected.map(q => q.name));
  const pool          = allQuests.filter(q => !selectedNames.has(q.name));

  return {
    quests: allSelected.map(q => ({ ...q, done: false })),
    pool:   pool.map(q => ({ ...q, done: false })),
  };
}

// ── Screens ───────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

// ── Board rendering ───────────────────────────────────────────────────────────

let appState;
let starMapAnimFrame = null;

function renderBoard() {
  const { quests, mana } = appState;
  const active = quests.filter(q => !q.done);
  const done   = quests.filter(q => q.done);

  $('quest-list').innerHTML    = '';
  $('treasure-list').innerHTML = '';

  active.forEach(q => $('quest-list').appendChild(makeQuestCard(q, mana)));

  if (done.length > 0) {
    $('treasure-section').classList.remove('hidden');
    done.forEach(q => $('treasure-list').appendChild(makeDoneCard(q)));
  } else {
    $('treasure-section').classList.add('hidden');
  }

  $('mana-text').textContent   = `${mana} / ${MAX_MANA}`;
  $('mana-fill').style.width   = `${(mana / MAX_MANA) * 100}%`;
  $('star-count').textContent  = loadStars().length;
}

function makeQuestCard(q, mana) {
  const canAfford = q.mana === 0 || mana >= q.mana;
  const canSwap   = appState.pool.some(p => p.rest === q.rest);
  const card      = document.createElement('div');
  card.className  = `quest-card${q.rest ? ' rest-card' : ''}`;

  const costHtml = q.mana > 0
    ? `<span class="quest-cost">${Array(q.mana).fill('<span class="gem-dot gem-dot--xs" style="--gem-color:#4a9eff"></span>').join('')}</span>`
    : `<span class="quest-rest-tag">Rast</span>`;

  card.innerHTML = `
    <div class="quest-info">
      <div class="quest-name">${q.name}</div>
      <div class="quest-meta">
        <span class="quest-cat-row">${catIconHtml(q.category)}</span>
        ${costHtml}
      </div>
    </div>
    <div class="quest-actions">
      <button class="quest-btn-swap" ${canSwap ? '' : 'disabled'} aria-label="${q.name} tauschen">⇄</button>
      <button class="quest-btn${canAfford ? '' : ' cant-afford'}"
              ${canAfford ? '' : 'disabled'}
              aria-label="${q.name} abschließen">
        ${canAfford ? '✦' : '—'}
      </button>
    </div>`;

  card.querySelector('.quest-btn-swap').addEventListener('click', () => swapQuest(q.name));
  if (canAfford) {
    card.querySelector('.quest-btn').addEventListener('click', () => completeQuest(q.name));
  }
  return card;
}

function makeDoneCard(q) {
  const t = q.treasure || TREASURE_ITEMS[0];
  const card = document.createElement('div');
  card.className = 'quest-card done-card';
  card.innerHTML = `
    <span class="treasure-glyph">${gemDotHtml(t, 'md')}</span>
    <div class="quest-info">
      <div class="quest-name">${t.name}</div>
      <div class="quest-meta">
        <span class="quest-category">erbeutet</span>
      </div>
    </div>
    <div class="quest-done-mark">✓</div>`;
  return card;
}

// ── Quest completion ──────────────────────────────────────────────────────────

function swapQuest(name) {
  const idx = appState.quests.findIndex(q => q.name === name && !q.done);
  if (idx === -1) return;

  const isRest     = appState.quests[idx].rest;
  const candidates = appState.pool
    .map((q, i) => ({ q, i }))
    .filter(({ q }) => q.rest === isRest);
  if (candidates.length === 0) return;

  const pick     = candidates[Math.floor(Math.random() * candidates.length)];
  const incoming = { ...pick.q, done: false };
  const outgoing = appState.quests[idx];

  appState.pool.splice(pick.i, 1);
  appState.pool.push({ ...outgoing });
  appState.quests[idx] = incoming;

  saveDayState(appState);
  renderBoard();
}

function completeQuest(name) {
  const quest = appState.quests.find(q => q.name === name && !q.done);
  if (!quest) return;

  quest.done     = true;
  quest.treasure = TREASURE_ITEMS[Math.floor(Math.random() * TREASURE_ITEMS.length)];
  appState.mana  = Math.max(0, appState.mana - quest.mana);

  if (!quest.rest) {
    const rhythm = loadRhythm();
    markRhythmDone(quest.name, rhythm);
    saveRhythm(rhythm);
  }

  saveDayState(appState);
  renderBoard();
  showRewardPopup(quest);

  const totalDone = appState.quests.filter(q => q.done).length;
  if (totalDone >= 2 && !appState.starAwarded) {
    setTimeout(awardStar, 1800);
  }
}

// ── Popups ────────────────────────────────────────────────────────────────────

function showRewardPopup(quest) {
  const t = quest.treasure;
  $('reward-glyph').innerHTML       = gemDotHtml(t, 'lg');
  $('reward-loot-name').textContent = t.name;
  $('reward-msg').textContent       = REWARD_MSGS[Math.floor(Math.random() * REWARD_MSGS.length)];
  $('popup-reward').classList.remove('hidden');
}

function awardStar() {
  $('popup-reward').classList.add('hidden');

  const stars = loadStars();
  const today = todayStr();
  if (!stars.includes(today)) {
    stars.push(today);
    saveStars(stars);
  }
  appState.starAwarded = true;
  saveDayState(appState);
  $('star-count').textContent = stars.length;
  $('popup-star').classList.remove('hidden');
}

function getConstellationInfo(starCount) {
  let cumulative = 0;
  for (let i = 0; i < CONSTELLATIONS.length; i++) {
    const c = CONSTELLATIONS[i];
    if (starCount <= cumulative + c.starsNeeded) {
      return {
        idx: i,
        constellation: c,
        earned: starCount - cumulative,
        completedCount: i,
        allComplete: false,
      };
    }
    cumulative += c.starsNeeded;
  }
  const last = CONSTELLATIONS[CONSTELLATIONS.length - 1];
  return {
    idx: CONSTELLATIONS.length - 1,
    constellation: last,
    earned: last.starsNeeded,
    completedCount: CONSTELLATIONS.length,
    allComplete: true,
  };
}

function getStarsNeededForNext(starCount) {
  let cumulative = 0;
  for (const c of CONSTELLATIONS) {
    cumulative += c.starsNeeded;
    if (starCount < cumulative) return cumulative - starCount;
  }
  return 0;
}

function openStarMap() {
  $('popup-starmap').classList.remove('hidden');
  if (starMapAnimFrame) { cancelAnimationFrame(starMapAnimFrame); starMapAnimFrame = null; }
  const canvas  = $('starmap-canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  startStarMapAnimation(loadStars().length);
}

// ── Star map canvas (fullscreen) ──────────────────────────────────────────────

function startStarMapAnimation(starCount) {
  const canvas = $('starmap-canvas');
  const ctx    = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const info           = getConstellationInfo(starCount);
  const c              = info.constellation;
  const earnedInConst  = Math.min(info.earned, c.stars.length);
  const allStarsEarned = earnedInConst >= c.stars.length;
  const starsNeeded    = getStarsNeededForNext(starCount);

  // 280 seeded background stars
  const srng = s => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
  const bgStars = Array.from({ length: 280 }, (_, i) => ({
    ox:    srng(i * 1.1 + 0.3) * W,
    oy:    srng(i * 2.3 + 0.7) * H,
    r:     srng(i * 3.7 + 1.2) * 1.8 + 0.3,
    phase: srng(i * 5.1 + 0.9) * Math.PI * 2,
    speed: srng(i * 7.3 + 2.1) * 0.8 + 0.4,
  }));

  const cStars = c.stars.map(s => ({ x: s.x * W, y: s.y * H }));
  const INV2   = Math.SQRT1_2;

  // Shooting stars
  const shootStars = [];
  let tick = 0, nextST = 120 + Math.floor(Math.random() * 180);

  // Zoom state
  let zoom = 1.0;
  const TARGET_ZOOM = 3.2, ZOOM_LERP = 0.035;
  let zoomDone = false, postZoomNow = null;

  const LINE_DUR  = 380;
  const TITLE_DUR = 900;

  function drawBg() {
    ctx.fillStyle = '#06040f';
    ctx.fillRect(0, 0, W, H);
    [
      [W * 0.28, H * 0.38, W * 0.55, 'rgba(70,20,130,0.22)',  'rgba(40,0,80,0)'],
      [W * 0.72, H * 0.28, W * 0.42, 'rgba(20,45,150,0.18)',  'rgba(10,20,90,0)'],
      [W * 0.50, H * 0.72, W * 0.50, 'rgba(110,20,90,0.15)',  'rgba(60,0,60,0)'],
      [W * 0.18, H * 0.62, W * 0.38, 'rgba(50,20,140,0.12)',  'rgba(20,0,80,0)'],
      [W * 0.80, H * 0.70, W * 0.35, 'rgba(80,30,60,0.10)',   'rgba(50,0,50,0)'],
    ].forEach(([x, y, r, c1, c2]) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, c1); g.addColorStop(1, c2);
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    });
  }

  function drawBgStars(now) {
    for (const bs of bgStars) {
      const zx = (bs.ox - W / 2) * zoom + W / 2;
      const zy = (bs.oy - H / 2) * zoom + H / 2;
      if (zx < -6 || zx > W + 6 || zy < -6 || zy > H + 6) continue;
      const tw = 0.25 + (Math.sin((now / 1000) * bs.speed + bs.phase) * 0.5 + 0.5) * 0.7;
      ctx.globalAlpha = tw;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(zx, zy, bs.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function tickShootStars(now) {
    tick++;
    if (tick >= nextST) {
      shootStars.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.4,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5,
        spd: 180 + Math.random() * 220,
        t0: now,
      });
      nextST = tick + 120 + Math.floor(Math.random() * 180);
    }
  }

  function drawShootStars(now) {
    for (let i = shootStars.length - 1; i >= 0; i--) {
      const ss  = shootStars[i];
      const age = (now - ss.t0) / 1000;
      if (age > 1.4) { shootStars.splice(i, 1); continue; }
      const fade = age < 0.25 ? age / 0.25 : age > 0.85 ? 1 - (age - 0.85) / 0.55 : 1;
      const dist = ss.spd * age;
      const ex = ss.x + Math.cos(ss.angle) * dist;
      const ey = ss.y + Math.sin(ss.angle) * dist;
      const tLen = Math.min(dist, 90);
      const tx = ex - Math.cos(ss.angle) * tLen;
      const ty = ey - Math.sin(ss.angle) * tLen;
      const g = ctx.createLinearGradient(tx, ty, ex, ey);
      g.addColorStop(0, 'rgba(255,255,240,0)');
      g.addColorStop(1, `rgba(255,255,248,${(fade * 0.88).toFixed(2)})`);
      ctx.save();
      ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.restore();
    }
  }

  function drawLines(pe) {
    if (!allStarsEarned) return 0;
    const total = c.lines.length * LINE_DUR;
    ctx.lineWidth = 0.8; ctx.setLineDash([]);
    for (let li = 0; li < c.lines.length; li++) {
      const ls = li * LINE_DUR;
      if (pe < ls) break;
      const prog = Math.min(1, (pe - ls) / LINE_DUR);
      const [ai, bi] = c.lines[li];
      const a = cStars[ai], b = cStars[bi];
      ctx.strokeStyle = 'rgba(210,230,255,0.55)';
      ctx.beginPath(); ctx.moveTo(a.x, a.y);
      ctx.lineTo(a.x + (b.x - a.x) * prog, a.y + (b.y - a.y) * prog);
      ctx.stroke();
    }
    return total;
  }

  function drawCStar(p, earned, now, si) {
    const isBright = si % Math.max(1, Math.floor(c.stars.length / 3)) === 0;
    if (earned) {
      const pulse = Math.sin(now / 850 + si * 1.4) * 0.5 + 0.5;
      const r     = (isBright ? 4.5 : 3.2) + pulse * 1.8;
      // Soft glow — no hard ring
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5.5);
      grd.addColorStop(0,    'rgba(255,245,160,0.9)');
      grd.addColorStop(0.2,  'rgba(255,210,70,0.5)');
      grd.addColorStop(0.55, 'rgba(240,170,20,0.18)');
      grd.addColorStop(1,    'rgba(240,140,0,0)');
      ctx.beginPath(); ctx.arc(p.x, p.y, r * 5.5, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
      // Core
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff9d5'; ctx.fill();
      // Diffraction spikes on bright stars
      if (isBright) {
        const sl = r * 5 * (1 + pulse * 0.22);
        const al = 0.52 + pulse * 0.38;
        ctx.save();
        ctx.strokeStyle = `rgba(255,230,100,${al.toFixed(2)})`; ctx.lineWidth = 0.7;
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy]) => {
          ctx.beginPath(); ctx.moveTo(p.x + dx*r, p.y + dy*r);
          ctx.lineTo(p.x + dx*sl, p.y + dy*sl); ctx.stroke();
        });
        const dl = sl * 0.5;
        ctx.strokeStyle = `rgba(255,220,80,${(al * 0.35).toFixed(2)})`;
        [[INV2,INV2],[-INV2,INV2],[INV2,-INV2],[-INV2,-INV2]].forEach(([dx,dy]) => {
          ctx.beginPath(); ctx.moveTo(p.x + dx*r*0.8, p.y + dy*r*0.8);
          ctx.lineTo(p.x + dx*dl, p.y + dy*dl); ctx.stroke();
        });
        ctx.restore();
      }
    } else {
      ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180,160,240,0.18)'; ctx.fill();
    }
  }

  function drawTitle(pe, lEnd) {
    const after = lEnd + 350;
    if (pe < after) return;
    const alpha = Math.min(1, (pe - after) / TITLE_DUR);
    ctx.save(); ctx.globalAlpha = alpha; ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 12;
    const name = (starCount > 0 && allStarsEarned) ? c.name : (starCount > 0 ? '???' : '');
    if (name) {
      ctx.fillStyle = allStarsEarned ? '#f5d060' : 'rgba(190,165,255,0.9)';
      ctx.font = 'bold 20px Cinzel, serif';
      ctx.fillText(name, W / 2, H - 52);
    }
    const sub = starCount === 0
      ? 'Noch keine Sterne — du schaffst das!'
      : starsNeeded > 0
        ? `noch ${starsNeeded} ${starsNeeded === 1 ? 'Stern' : 'Sterne'} bis zum nächsten Sternbild`
        : 'Alle Sternbilder entdeckt ✦';
    ctx.fillStyle = 'rgba(210,192,158,0.9)';
    ctx.font = '15px Crimson Text, Georgia, serif';
    ctx.fillText(sub, W / 2, H - 25);
    ctx.restore();
  }

  function frame(now) {
    tickShootStars(now);
    ctx.clearRect(0, 0, W, H);
    drawBg();
    if (!zoomDone) {
      zoom += (TARGET_ZOOM - zoom) * ZOOM_LERP;
      if (TARGET_ZOOM - zoom < 0.04) { zoom = TARGET_ZOOM; zoomDone = true; postZoomNow = now; }
    }
    drawBgStars(now);
    drawShootStars(now);
    if (zoomDone) {
      const pe   = now - postZoomNow;
      const lEnd = drawLines(pe);
      for (let si = 0; si < c.stars.length; si++) drawCStar(cStars[si], si < earnedInConst, now, si);
      drawTitle(pe, lEnd);
    } else if (starCount > 0) {
      ctx.globalAlpha = Math.max(0, (zoom - 1.2) / (TARGET_ZOOM - 1) * 0.25);
      for (let si = 0; si < c.stars.length; si++) drawCStar(cStars[si], si < earnedInConst, now, si);
      ctx.globalAlpha = 1;
    }
    starMapAnimFrame = requestAnimationFrame(frame);
  }

  starMapAnimFrame = requestAnimationFrame(frame);
}

// ── Sky Canvas ────────────────────────────────────────────────────────────────

function initSkyCanvas() {
  const canvas = document.getElementById('sky-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = ['#ffffff', '#d0d0d0', '#bae6fd', '#c4b5fd', '#fef9c3', '#ddd6fe'];

  let W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 220 twinkling background stars
  const bgStars = Array.from({ length: 220 }, () => ({
    nx:     Math.random(),
    ny:     Math.random(),
    r:      0.4 + Math.random() * 1.6,
    color:  COLORS[Math.floor(Math.random() * COLORS.length)],
    phase:  Math.random(),
    freq:   0.4 + Math.random() * 0.8,
    bAlpha: 0.25 + Math.random() * 0.55,
  }));

  // 15 glitter crosses at fixed normalized positions
  const CROSS_POS = [
    [0.05, 0.06], [0.22, 0.03], [0.50, 0.04], [0.75, 0.07], [0.93, 0.11],
    [0.02, 0.38], [0.96, 0.44], [0.10, 0.62], [0.90, 0.56], [0.04, 0.80],
    [0.93, 0.77], [0.18, 0.92], [0.50, 0.96], [0.70, 0.89], [0.62, 0.14],
  ];
  const glitCrosses = CROSS_POS.map(([nx, ny], i) => ({
    nx, ny,
    sz:     4 + Math.random() * 8,
    color:  COLORS[i % COLORS.length],
    period: 4000 + Math.random() * 5000,
    phase:  Math.random(),
  }));

  // Shooting stars state
  let shootTick   = 0;
  let shootTarget = 300 + Math.floor(Math.random() * 200);
  let lastSide    = null;
  const sStar     = [];
  const glitParts = [];

  function spawnShoot() {
    const side  = lastSide === 'L' ? 'R' : 'L';
    lastSide    = side;
    const spd   = 1 + Math.random();
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const sy    = H * (0.05 + Math.random() * 0.45);
    const sx    = side === 'R' ? -30 : W + 30;
    const ex    = side === 'R' ? W + 30 : -30;
    const ey    = sy + H * (0.12 + Math.random() * 0.18);
    const cpx   = (sx + ex) / 2 + (Math.random() - 0.5) * W * 0.2;
    const cpy   = Math.min(sy, ey) - H * (0.05 + Math.random() * 0.12);
    const len   = Math.hypot(ex - sx, ey - sy) * 1.15;
    sStar.push({ sx, sy, ex, ey, cpx, cpy, t: 0, dt: spd / len, color, trail: [] });
  }

  function bezPt(ss, t) {
    const u = 1 - t;
    return {
      x: u * u * ss.sx + 2 * u * t * ss.cpx + t * t * ss.ex,
      y: u * u * ss.sy + 2 * u * t * ss.cpy + t * t * ss.ey,
    };
  }

  function tickShoot() {
    if (++shootTick >= shootTarget) {
      spawnShoot();
      shootTick   = 0;
      shootTarget = 300 + Math.floor(Math.random() * 200);
    }
    for (let i = sStar.length - 1; i >= 0; i--) {
      const ss = sStar[i];
      ss.t = Math.min(ss.t + ss.dt, 1);
      const p = bezPt(ss, ss.t);
      ss.trail.push(p);
      if (ss.trail.length > 28) ss.trail.shift();
      if (Math.random() < 0.25) {
        glitParts.push({
          x: p.x + (Math.random() - 0.5) * 5,
          y: p.y + (Math.random() - 0.5) * 5,
          color: ss.color, r: 0.5 + Math.random() * 1.2,
          a: 0.5 + Math.random() * 0.5, da: 0.015 + Math.random() * 0.025,
        });
      }
      if (ss.t >= 1) sStar.splice(i, 1);
    }
    for (let i = glitParts.length - 1; i >= 0; i--) {
      glitParts[i].a -= glitParts[i].da;
      if (glitParts[i].a <= 0) glitParts.splice(i, 1);
    }
  }

  function drawCross(cx, cy, sz, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineCap     = 'round';
    ctx.lineWidth   = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - sz, cy); ctx.lineTo(cx + sz, cy);
    ctx.moveTo(cx, cy - sz); ctx.lineTo(cx, cy + sz);
    ctx.stroke();
    ctx.lineWidth = 0.7;
    const d = sz * 0.55;
    ctx.beginPath();
    ctx.moveTo(cx - d, cy - d); ctx.lineTo(cx + d, cy + d);
    ctx.moveTo(cx + d, cy - d); ctx.lineTo(cx - d, cy + d);
    ctx.stroke();
    ctx.restore();
  }

  function skyFrame(now) {
    ctx.clearRect(0, 0, W, H);
    tickShoot();

    // background stars
    bgStars.forEach(s => {
      const a = s.bAlpha * (0.4 + 0.6 * (Math.sin(now * 0.001 * s.freq + s.phase * Math.PI * 2) * 0.5 + 0.5));
      ctx.globalAlpha = a;
      ctx.fillStyle   = s.color;
      ctx.beginPath();
      ctx.arc(s.nx * W, s.ny * H, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // glitter crosses
    glitCrosses.forEach(gc => {
      const a = Math.max(0, Math.sin(((now / gc.period) + gc.phase) * Math.PI * 2)) * 0.82;
      if (a > 0.01) drawCross(gc.nx * W, gc.ny * H, gc.sz, gc.color, a);
    });

    // glitter particles from shooting star trails
    glitParts.forEach(p => {
      ctx.globalAlpha = p.a;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // shooting stars
    sStar.forEach(ss => {
      if (ss.trail.length < 2) return;
      for (let i = 1; i < ss.trail.length; i++) {
        const frac = i / ss.trail.length;
        const p0 = ss.trail[i - 1], p1 = ss.trail[i];
        ctx.save();
        ctx.globalAlpha = frac * 0.75;
        ctx.strokeStyle = ss.color;
        ctx.lineWidth   = frac * 2.2;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.restore();
      }
      const head = ss.trail[ss.trail.length - 1];
      const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
      g.addColorStop(0,   ss.color);
      g.addColorStop(0.5, ss.color + '66');
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle   = g;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(skyFrame);
  }

  requestAnimationFrame(skyFrame);
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  initSkyCanvas();

  const dateStr = new Date().toLocaleDateString('de-AT', {
    timeZone: 'Europe/Vienna', weekday: 'long', day: 'numeric', month: 'long',
  });
  $('date-display').innerHTML = `<span>${dateStr}</span>${getDailySymbol()}`;

  const allQuests = QUESTS_DATA;
  const saved     = loadDayState();

  if (saved) {
    appState = saved;
    if (!appState.pool || appState.pool.length === 0) {
      const shownNames = new Set(appState.quests.map(q => q.name));
      appState.pool = QUESTS_DATA.filter(q => !shownNames.has(q.name)).map(q => ({ ...q, done: false }));
    }
    $('mood-badge').textContent = `${MOOD_GLYPH[saved.mood]} ${MOOD_LABEL[saved.mood]}`;
    renderBoard();
    showScreen('screen-board');
  } else {
    showScreen('screen-mood');
    document.querySelectorAll('.mood-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const mood = btn.dataset.mood;
        const { quests, pool } = selectQuests(allQuests, mood);
        appState = {
          date:        todayStr(),
          mood,
          mana:        MAX_MANA,
          quests,
          pool,
          starAwarded: false,
        };
        saveDayState(appState);
        $('mood-badge').textContent = `${MOOD_GLYPH[mood]} ${MOOD_LABEL[mood]}`;
        renderBoard();
        showScreen('screen-board');
        if (mood === 'nur-ueberleben') {
          $('rest-msg').textContent = REST_MSGS[Math.floor(Math.random() * REST_MSGS.length)];
          $('popup-rest').classList.remove('hidden');
        }
      });
    });
  }

  $('btn-reward-close').addEventListener('click', () => $('popup-reward').classList.add('hidden'));
  $('btn-star-close').addEventListener('click',   () => $('popup-star').classList.add('hidden'));
  $('btn-rest-close').addEventListener('click',   () => $('popup-rest').classList.add('hidden'));
  $('btn-starmap').addEventListener('click',      openStarMap);
  $('btn-starmap-close').addEventListener('click', () => {
    if (starMapAnimFrame) { cancelAnimationFrame(starMapAnimFrame); starMapAnimFrame = null; }
    $('popup-starmap').classList.add('hidden');
  });
  $('btn-reset').addEventListener('click', () => {
    localStorage.removeItem(STORE_STATE);
    location.reload();
  });

  document.querySelectorAll('.overlay').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el) {
        if (el.id === 'popup-starmap' && starMapAnimFrame) {
          cancelAnimationFrame(starMapAnimFrame); starMapAnimFrame = null;
        }
        el.classList.add('hidden');
      }
    });
  });

  $('btn-telescope-close').addEventListener('click', () => {
    $('popup-telescope').classList.add('hidden');
  });
}

document.addEventListener('DOMContentLoaded', init);

// ── Telescope Popup ────────────────────────────────────────────────────────────

let telescopeAnimFrame = null;

function openTelescopePopup() {
  const starsNeeded = getStarsNeededForNext(loadStars().length);
  $('popup-telescope').classList.remove('hidden');
  if (telescopeAnimFrame) { cancelAnimationFrame(telescopeAnimFrame); telescopeAnimFrame = null; }
  startTelescopeAnimation(starsNeeded);
}

function startTelescopeAnimation(starsNeeded) {
  const canvas = $('telescope-canvas');
  const ctx    = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const PHASE1 = 600;   // telescope enters
  const PHASE2 = 1100;  // iris opens
  const PHASE3 = 2000;  // number visible

  let startTime = null;

  // Lens position
  const LX = 226, LY = 88, LR = 26;

  function drawTelescope(ctx, bodyAlpha, yOff) {
    ctx.save();
    ctx.globalAlpha = bodyAlpha;
    ctx.translate(0, yOff);

    // Tripod legs
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth   = 2;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(132, 108); ctx.lineTo(62, 190);
    ctx.moveTo(132, 108); ctx.lineTo(202, 190);
    ctx.moveTo(132, 108); ctx.lineTo(132, 190);
    ctx.stroke();
    ctx.strokeStyle = '#a07820';
    ctx.lineWidth   = 5;
    ctx.beginPath();
    ctx.moveTo(54, 190); ctx.lineTo(70, 190);
    ctx.moveTo(124, 190); ctx.lineTo(140, 190);
    ctx.moveTo(194, 190); ctx.lineTo(210, 190);
    ctx.stroke();

    // Main tube
    ctx.fillStyle   = '#12122a';
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.rect(28, 72, 178, 32);
    ctx.fill(); ctx.stroke();

    // Tube highlight strip
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    ctx.rect(28, 72, 178, 8);
    ctx.fill();

    // Focus ring (brass bump)
    ctx.fillStyle = '#c9a227';
    ctx.beginPath();
    ctx.rect(118, 68, 16, 40);
    ctx.fill();
    ctx.fillStyle = '#e8b830';
    ctx.beginPath();
    ctx.rect(122, 68, 5, 40);
    ctx.fill();

    // Eyepiece
    ctx.fillStyle   = '#0c0c1e';
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.rect(10, 80, 22, 16);
    ctx.fill(); ctx.stroke();

    // Objective cap (flared)
    ctx.fillStyle   = '#0c0c1e';
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.moveTo(200, 72); ctx.lineTo(LX, 62);
    ctx.lineTo(LX, 114); ctx.lineTo(200, 104);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Lens ring
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth   = 3.5;
    ctx.beginPath();
    ctx.arc(LX, LY, LR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#e8b830';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.arc(LX, LY, LR - 5, 0, Math.PI * 2);
    ctx.stroke();

    // Lens dark fill
    ctx.fillStyle = '#06061a';
    ctx.beginPath();
    ctx.arc(LX, LY, LR - 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawIrisAndNumber(ctx, irisP, numAlpha, starsNeeded) {
    ctx.save();

    // Clip to lens interior
    ctx.beginPath();
    ctx.arc(LX, LY, LR - 4, 0, Math.PI * 2);
    ctx.clip();

    // Stars glow behind iris
    if (numAlpha > 0) {
      const grd = ctx.createRadialGradient(LX, LY, 0, LX, LY, LR);
      grd.addColorStop(0,   `rgba(240,192,64,${numAlpha * 0.55})`);
      grd.addColorStop(0.6, `rgba(200,140,20,${numAlpha * 0.25})`);
      grd.addColorStop(1,   'rgba(200,140,20,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(LX, LY, LR, 0, Math.PI * 2);
      ctx.fill();
    }

    // Iris shutter: shrinking dark circle
    if (irisP < 1) {
      const irisR = (LR - 4) * (1 - irisP);
      ctx.fillStyle = '#06061a';
      ctx.beginPath();
      ctx.arc(LX, LY, irisR, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    // Number — drawn outside clip so it sits on top
    if (numAlpha > 0 && starsNeeded > 0) {
      ctx.save();
      ctx.globalAlpha = numAlpha;
      ctx.fillStyle   = '#f0c040';
      ctx.font        = `bold ${starsNeeded >= 10 ? 16 : 20}px Cinzel, serif`;
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(240,192,64,0.9)';
      ctx.shadowBlur  = 10;
      ctx.fillText(String(starsNeeded), LX, LY);
      ctx.restore();
    } else if (numAlpha > 0 && starsNeeded === 0) {
      ctx.save();
      ctx.globalAlpha = numAlpha;
      ctx.fillStyle   = '#c8a0ff';
      ctx.font        = 'bold 11px Cinzel, serif';
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', LX, LY);
      ctx.restore();
    }

    // Lens highlight
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.arc(LX - 8, LY - 9, 5, Math.PI * 1.1, Math.PI * 1.85);
    ctx.stroke();
    ctx.restore();
  }

  function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

  function frame(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0c0c22';
    ctx.fillRect(0, 0, W, H);

    // Phase 1: telescope enters (slides up + fades in)
    const p1     = Math.min(1, elapsed / PHASE1);
    const ep1    = ease(p1);
    const yOff   = (1 - ep1) * 45;
    drawTelescope(ctx, ep1, yOff);

    // Phase 2: iris opens
    const p2     = elapsed < PHASE1 ? 0 : Math.min(1, (elapsed - PHASE1) / (PHASE2 - PHASE1));
    const irisP  = ease(p2);

    // Phase 3: number fades in
    const p3     = elapsed < PHASE2 ? 0 : Math.min(1, (elapsed - PHASE2) / (PHASE3 - PHASE2));
    drawIrisAndNumber(ctx, irisP, ease(p3), starsNeeded);

    // Label below
    if (p3 > 0) {
      ctx.save();
      ctx.globalAlpha = ease(p3);
      ctx.fillStyle   = '#c8b89a';
      ctx.font        = '13px Crimson Text, Georgia, serif';
      ctx.textAlign   = 'center';
      ctx.fillText(starsNeeded === 0 ? 'Alle Sternbilder entdeckt!' : 'Sterne bis zum nächsten Sternbild', W / 2, 215);
      ctx.restore();
    }

    telescopeAnimFrame = requestAnimationFrame(frame);
  }

  telescopeAnimFrame = requestAnimationFrame(frame);
}

// ── Purple Orb Logo ────────────────────────────────────────────────────────────
function initOrbLogo() {
  const canvas = document.getElementById('constellation-logo');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 160, H = 160;
  let t = 0;

  function frame() {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    const pulse = 0.93 + 0.07 * Math.sin(t * 1.1);
    const r     = 52 * pulse;

    // Outer diffuse glow
    const outerGlow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2.4);
    outerGlow.addColorStop(0,   'rgba(140,60,255,0.30)');
    outerGlow.addColorStop(0.5, 'rgba(100,30,200,0.12)');
    outerGlow.addColorStop(1,   'rgba(60,0,160,0)');
    ctx.beginPath(); ctx.arc(cx, cy, r * 2.4, 0, Math.PI * 2);
    ctx.fillStyle = outerGlow; ctx.fill();

    // Orb body
    const grad = ctx.createRadialGradient(cx - r*0.28, cy - r*0.32, r*0.05, cx, cy, r);
    grad.addColorStop(0,    '#ddb0ff');
    grad.addColorStop(0.25, '#9040e0');
    grad.addColorStop(0.6,  '#5010a8');
    grad.addColorStop(1,    '#18004a');
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();

    // Specular highlight
    const spec = ctx.createRadialGradient(cx - r*0.3, cy - r*0.35, 0, cx - r*0.1, cy - r*0.1, r*0.52);
    spec.addColorStop(0,   'rgba(255,255,255,0.52)');
    spec.addColorStop(0.6, 'rgba(230,190,255,0.15)');
    spec.addColorStop(1,   'rgba(200,160,255,0)');
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = spec; ctx.fill();

    // Orbiting sparkles
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + t * 0.5 + i * 0.4;
      const dist  = r * (1.35 + 0.08 * Math.sin(t * 2.2 + i * 1.3));
      const sx    = cx + Math.cos(angle) * dist;
      const sy    = cy + Math.sin(angle) * dist * 0.58;
      const alpha = 0.25 + 0.55 * (Math.sin(t * 2 + i * 1.4) * 0.5 + 0.5);
      const sr    = 1.2 + 0.8 * Math.sin(t * 1.7 + i);
      ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,170,255,${alpha.toFixed(2)})`; ctx.fill();
    }

    t += 0.016;
    requestAnimationFrame(frame);
  }

  frame();
}

document.addEventListener('DOMContentLoaded', initOrbLogo);
