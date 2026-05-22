'use strict';

const STORE_STATE = 'qb_state';
const STORE_STARS = 'qb_stars';
const MAX_MANA    = 30;

const QUESTS_DATA = [
  { name: 'Duschen',            mana: 20, category: 'Körperpflege',  rest: false },
  { name: 'Haare waschen',      mana: 20, category: 'Körperpflege',  rest: false },
  { name: 'Zähneputzen',        mana: 10, category: 'Körperpflege',  rest: false },
  { name: 'Einkaufen',          mana: 50, category: 'Outdoor',        rest: false },
  { name: 'Spazieren gehen',    mana: 20, category: 'Outdoor',        rest: false },
  { name: 'Garderobe ordnen',   mana: 10, category: 'Vorraum',        rest: false },
  { name: 'Kommode ordnen',     mana: 10, category: 'Ordnung',        rest: false },
  { name: 'Tafeln reinigen',    mana: 10, category: 'Ordnung',        rest: false },
  { name: 'Klopapier nachfüllen', mana: 10, category: 'WC',           rest: false },
  { name: 'Geschirrspüler',     mana: 10, category: 'Küche',          rest: false },
  { name: 'Kaffee Corner ordnen', mana: 10, category: 'Küche',        rest: false },
  { name: 'Staubwischen',       mana: 10, category: 'Wohnzimmer',     rest: false },
  { name: 'Bettwäsche wechseln', mana: 20, category: 'Schlafzimmer',  rest: false },
  { name: 'Handtücher wechseln', mana: 20, category: 'Bad',           rest: false },
  { name: 'Bett machen',        mana: 10, category: 'Schlafzimmer',   rest: false },
  { name: 'Waschbecken wischen', mana: 10, category: 'Bad',           rest: false },
  { name: 'Gewandkasten ordnen', mana: 20, category: 'Catze Hort',    rest: false },
  { name: 'Waschen',            mana: 10, category: 'Wäsche',         rest: false },
  { name: 'Aufhängen',          mana: 10, category: 'Wäsche',         rest: false },
  { name: 'Sortieren',          mana: 10, category: 'Wäsche',         rest: false },
  { name: 'Wegräumen',          mana: 10, category: 'Wäsche',         rest: false },
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
  { name: 'Rubin' },
  { name: 'Smaragd' },
  { name: 'Saphir' },
  { name: 'Amethyst' },
  { name: 'Geode' },
  { name: 'Goldnugget' },
  { name: 'Zaubertrank' },
  { name: 'Zauberstab' },
  { name: 'Hexenkessel' },
  { name: 'Kristallkugel' },
  { name: 'Zauberbuch' },
  { name: 'Amulett' },
  { name: 'Drachenschuppe' },
  { name: 'Ritterschild' },
  { name: 'Königskrone' },
  { name: 'Pergament' },
  { name: 'Schlüssel' },
  { name: 'Drachenzahn' },
  { name: 'Goldmünze' },
  { name: 'Feenstaub' },
  { name: 'Phönixfeder' },
  { name: 'Mondstein' },
  { name: 'Drachenkristall' },
  { name: 'Mystische Essenz' },
];

const REST_MSGS = [
  'Heute reicht es, einfach da zu sein. Das ist genug.',
  'Manche Tage sind zum Überstehen da. Du machst das.',
  'Kein Kampf heute – nur Ruhe. Du hast sie verdient.',
  'Es ist okay, heute nichts zu leisten. Du bist mehr als deine Aufgaben.',
  'Heute darfst du einfach atmen. Alles andere kann warten.',
  'Selbst die leiseste Flamme leuchtet noch. Du auch.',
  'Du musst heute nichts beweisen – nicht mir, nicht dir.',
  'Ruh dich aus. Morgen ist ein neuer Tag mit neuem Mana.',
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
  'Dieses Mana gehört dir. Du hast es verdient.',
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

// === RUCKSACK: 24 Belohnungs-Icons als inline SVG ===
let _ruckIconSeq = 0;
function _ruckTreasureIcon(name, size) {
  const u = 'ri' + (++_ruckIconSeq);
  const s = size || 52;
  const icons = {
    'Rubin': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="35%" cy="25%" r="75%"><stop offset="0%" stop-color="#ff6080"/><stop offset="45%" stop-color="#d01830"/><stop offset="100%" stop-color="#600010"/></radialGradient>
      </defs><polygon points="22,4 38,14 38,30 22,40 6,30 6,14" fill="url(#${u}a)"/>
      <polygon points="22,4 30,8 24,6" fill="white" opacity="0.7"/>
      <line x1="22" y1="4" x2="30" y2="14" stroke="#ffb0c0" stroke-width="0.8" opacity="0.7"/>
      <ellipse cx="16" cy="13" rx="5" ry="3" fill="white" opacity="0.25" transform="rotate(-20 16 13)"/></svg>`,

    'Smaragd': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="35%" cy="25%" r="75%"><stop offset="0%" stop-color="#60ff90"/><stop offset="45%" stop-color="#0a9048"/><stop offset="100%" stop-color="#024020"/></radialGradient>
      </defs><polygon points="22,4 36,12 36,32 22,40 8,32 8,12" fill="url(#${u}a)"/>
      <polygon points="22,4 30,8 24,6" fill="white" opacity="0.6"/>
      <line x1="22" y1="4" x2="29" y2="12" stroke="#90ffb0" stroke-width="0.8" opacity="0.7"/>
      <ellipse cx="16" cy="12" rx="5" ry="3" fill="white" opacity="0.2" transform="rotate(-15 16 12)"/></svg>`,

    'Saphir': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="35%" cy="25%" r="75%"><stop offset="0%" stop-color="#80c0ff"/><stop offset="45%" stop-color="#1848d0"/><stop offset="100%" stop-color="#041060"/></radialGradient>
      </defs><polygon points="22,3 40,16 34,38 10,38 4,16" fill="url(#${u}a)"/>
      <polygon points="22,3 31,9 25,7" fill="white" opacity="0.65"/>
      <line x1="22" y1="3" x2="32" y2="13" stroke="#b0d8ff" stroke-width="0.8" opacity="0.7"/>
      <ellipse cx="15" cy="14" rx="5" ry="3" fill="white" opacity="0.2" transform="rotate(-20 15 14)"/></svg>`,

    'Amethyst': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="35%" cy="25%" r="75%"><stop offset="0%" stop-color="#e090ff"/><stop offset="45%" stop-color="#7020c0"/><stop offset="100%" stop-color="#2a0860"/></radialGradient>
      </defs><polygon points="22,4 37,13 37,31 22,40 7,31 7,13" fill="url(#${u}a)"/>
      <polygon points="22,4 30,8 24,6" fill="white" opacity="0.65"/>
      <line x1="22" y1="4" x2="30" y2="12" stroke="#d090ff" stroke-width="0.8" opacity="0.7"/>
      <ellipse cx="16" cy="12" rx="5" ry="3" fill="white" opacity="0.22" transform="rotate(-20 16 12)"/></svg>`,

    'Geode': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#c0a0ff" stop-opacity="0.8"/><stop offset="60%" stop-color="#4a2090"/><stop offset="100%" stop-color="#0a0420"/></radialGradient>
      <radialGradient id="${u}b" cx="40%" cy="30%" r="50%"><stop offset="0%" stop-color="#e0c0ff"/><stop offset="100%" stop-color="#6030a0" stop-opacity="0"/></radialGradient>
      </defs><ellipse cx="22" cy="22" rx="20" ry="20" fill="#0a0420" stroke="#4a2090" stroke-width="1"/>
      <ellipse cx="22" cy="22" rx="15" ry="15" fill="#2a1060" stroke="#8060c0" stroke-width="0.7"/>
      <ellipse cx="22" cy="22" rx="10" ry="10" fill="url(#${u}a)"/>
      <polygon points="22,14 25,20 22,26 19,20" fill="url(#${u}b)" stroke="#e0c0ff" stroke-width="0.5"/>
      <ellipse cx="17" cy="16" rx="4" ry="2.5" fill="white" opacity="0.2" transform="rotate(-30 17 16)"/></svg>`,

    'Goldnugget': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="38%" cy="28%" r="65%"><stop offset="0%" stop-color="#ffe080"/><stop offset="55%" stop-color="#c49020"/><stop offset="100%" stop-color="#7a5008"/></radialGradient>
      </defs><ellipse cx="18" cy="20" rx="12" ry="10" fill="url(#${u}a)"/>
      <ellipse cx="28" cy="26" rx="11" ry="9" fill="url(#${u}a)"/>
      <ellipse cx="22" cy="15" rx="9" ry="8" fill="url(#${u}a)"/>
      <ellipse cx="15" cy="17" rx="4" ry="2.5" fill="white" opacity="0.3" transform="rotate(-25 15 17)"/></svg>`,

    'Zaubertrank': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="38%" cy="28%" r="65%"><stop offset="0%" stop-color="#80d0ff"/><stop offset="55%" stop-color="#1870c0"/><stop offset="100%" stop-color="#041848"/></radialGradient>
      </defs><rect x="18" y="6" width="8" height="6" rx="2" fill="#6a4010"/>
      <path d="M16 12 Q12 20 12 28 Q12 38 22 38 Q32 38 32 28 Q32 20 28 12Z" fill="url(#${u}a)"/>
      <ellipse cx="20" cy="26" rx="4" ry="3" fill="white" opacity="0.55"/>
      <circle cx="27" cy="30" r="2.5" fill="white" opacity="0.45"/>
      <path d="M16 12 Q10 22 12 30" stroke="rgba(255,255,255,0.12)" stroke-width="1" fill="none"/></svg>`,

    'Zauberstab': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c080ff"/><stop offset="100%" stop-color="#4010a0"/></linearGradient>
      <radialGradient id="${u}b" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffc0"/><stop offset="50%" stop-color="#f0c040"/><stop offset="100%" stop-color="#c08000"/></radialGradient>
      </defs><line x1="8" y1="36" x2="32" y2="12" stroke="url(#${u}a)" stroke-width="3" stroke-linecap="round"/>
      <polygon points="32,12 29,5 33,10 40,8 35,14 39,19 33,15 32,22 30,14 24,18" fill="url(#${u}b)"/>
      <line x1="29" y1="6" x2="39" y2="7" stroke="#f0c040" stroke-width="0.7" opacity="0.7"/>
      <line x1="37" y1="16" x2="38" y2="22" stroke="#f0c040" stroke-width="0.7" opacity="0.7"/></svg>`,

    'Hexenkessel': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="50%" cy="60%" r="55%"><stop offset="0%" stop-color="#3a1868"/><stop offset="100%" stop-color="#0a0418"/></radialGradient>
      </defs><path d="M8 20 Q8 38 22 38 Q36 38 36 20 Q36 14 22 14 Q8 14 8 20Z" fill="url(#${u}a)" stroke="#8040c0" stroke-width="1.2"/>
      <ellipse cx="22" cy="20" rx="14" ry="6" fill="#2a1050"/>
      <path d="M14 20 Q17 17 22 21 Q26 17 30 20" fill="none" stroke="#60ff80" stroke-width="1.2" opacity="0.8"/>
      <path d="M17 20 Q19 15 22 18" fill="none" stroke="#80ffaa" stroke-width="0.8" opacity="0.6"/>
      <line x1="8" y1="18" x2="2" y2="12" stroke="#8040c0" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="36" y1="18" x2="42" y2="12" stroke="#8040c0" stroke-width="1.8" stroke-linecap="round"/>
      <rect x="6" y="36" width="32" height="4" rx="2" fill="#2a0840"/></svg>`,

    'Kristallkugel': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="38%" cy="28%" r="65%"><stop offset="0%" stop-color="#9060e0"/><stop offset="55%" stop-color="#2a0868"/><stop offset="100%" stop-color="#080214"/></radialGradient>
      <radialGradient id="${u}b" cx="30%" cy="25%" r="45%"><stop offset="0%" stop-color="rgba(220,200,255,0.5)"/><stop offset="100%" stop-color="rgba(220,200,255,0)"/></radialGradient>
      </defs><circle cx="22" cy="20" r="18" fill="url(#${u}a)"/>
      <circle cx="22" cy="20" r="18" fill="url(#${u}b)"/>
      <ellipse cx="22" cy="20" rx="14" ry="6" fill="none" stroke="#c080ff" stroke-width="0.6" opacity="0.4"/>
      <ellipse cx="22" cy="20" rx="6" ry="14" fill="none" stroke="#c080ff" stroke-width="0.6" opacity="0.4"/>
      <rect x="14" y="37" width="16" height="5" rx="2" fill="#3a2060"/></svg>`,

    'Zauberbuch': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#5a1880"/><stop offset="100%" stop-color="#1a0430"/></linearGradient>
      </defs><rect x="8" y="6" width="28" height="34" rx="2" fill="url(#${u}a)" stroke="#8040c0" stroke-width="0.8"/>
      <rect x="8" y="6" width="5" height="34" rx="2" fill="#2a0848"/>
      <ellipse cx="14" cy="20" rx="2" ry="5" fill="rgba(200,160,255,0.18)"/>
      <polygon points="26,14 28,20 26,26 24,20" fill="#f0c040" opacity="0.85" stroke="#f0c040" stroke-width="0.3"/>
      <circle cx="26" cy="20" r="2" fill="#f0c040" opacity="0.5"/>
      <ellipse cx="30" cy="26" rx="4" ry="2" fill="white" opacity="0.12" transform="rotate(-15 30 26)"/></svg>`,

    'Amulett': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="40%" cy="30%" r="65%"><stop offset="0%" stop-color="#ffe090"/><stop offset="55%" stop-color="#c49020"/><stop offset="100%" stop-color="#704000"/></radialGradient>
      <radialGradient id="${u}b" cx="40%" cy="30%" r="60%"><stop offset="0%" stop-color="#e090ff"/><stop offset="100%" stop-color="#4010a0"/></radialGradient>
      </defs><polygon points="22,4 25,14 35,14 27,20 30,30 22,24 14,30 17,20 9,14 19,14" fill="url(#${u}a)"/>
      <circle cx="22" cy="19" r="6" fill="url(#${u}b)" stroke="#e090ff" stroke-width="0.5"/>
      <ellipse cx="20" cy="17" rx="2.5" ry="1.5" fill="white" opacity="0.4"/></svg>`,

    'Drachenschuppe': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="38%" cy="30%" r="65%"><stop offset="0%" stop-color="#60e090"/><stop offset="55%" stop-color="#0a7030"/><stop offset="100%" stop-color="#022010"/></radialGradient>
      </defs><ellipse cx="22" cy="24" rx="16" ry="18" fill="url(#${u}a)" stroke="#20a050" stroke-width="0.8"/>
      <path d="M22 6 L18 16 L22 14 L26 16 Z" fill="#10a040"/>
      <ellipse cx="16" cy="18" rx="5" ry="3" fill="white" opacity="0.2" transform="rotate(-10 16 18)"/>
      <line x1="22" y1="8" x2="22" y2="40" stroke="rgba(0,255,80,0.15)" stroke-width="1.5"/></svg>`,

    'Ritterschild': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a3090"/><stop offset="100%" stop-color="#0a0e3a"/></linearGradient>
      </defs><path d="M6 6 L38 6 L38 26 Q38 40 22 42 Q6 40 6 26 Z" fill="url(#${u}a)" stroke="#c4a030" stroke-width="1.5"/>
      <line x1="22" y1="6" x2="22" y2="42" stroke="#c4a030" stroke-width="1.2"/>
      <line x1="6" y1="20" x2="38" y2="20" stroke="#c4a030" stroke-width="1.2"/>
      <polygon points="22,14 25,18 22,22 19,18" fill="#c4a030" opacity="0.9"/>
      <ellipse cx="14" cy="10" rx="5" ry="3" fill="white" opacity="0.12" transform="rotate(-20 14 10)"/></svg>`,

    'Königskrone': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe080"/><stop offset="55%" stop-color="#c49020"/><stop offset="100%" stop-color="#7a5008"/></linearGradient>
      </defs><path d="M4 30 L4 14 L14 22 L22 8 L30 22 L40 14 L40 30 Z" fill="url(#${u}a)" stroke="#f0d040" stroke-width="0.8"/>
      <rect x="4" y="30" width="36" height="8" rx="2" fill="url(#${u}a)"/>
      <circle cx="14" cy="26" r="3" fill="#e03040"/>
      <circle cx="22" cy="26" r="3" fill="#2060ff"/>
      <circle cx="30" cy="26" r="3" fill="#10a040"/>
      <ellipse cx="10" cy="16" rx="4" ry="2" fill="white" opacity="0.25" transform="rotate(-20 10 16)"/></svg>`,

    'Pergament': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e0c890"/><stop offset="100%" stop-color="#a88040"/></linearGradient>
      </defs><rect x="6" y="10" width="32" height="28" rx="1" fill="url(#${u}a)"/>
      <ellipse cx="22" cy="10" rx="16" ry="4" fill="#b89050"/>
      <ellipse cx="22" cy="38" rx="16" ry="4" fill="#b89050"/>
      <line x1="10" y1="16" x2="34" y2="16" stroke="#8a6020" stroke-width="0.7" opacity="0.5"/>
      <line x1="10" y1="21" x2="34" y2="21" stroke="#8a6020" stroke-width="0.7" opacity="0.5"/>
      <line x1="10" y1="26" x2="34" y2="26" stroke="#8a6020" stroke-width="0.7" opacity="0.5"/>
      <line x1="10" y1="31" x2="28" y2="31" stroke="#8a6020" stroke-width="0.7" opacity="0.5"/></svg>`,

    'Schlüssel': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffe080"/><stop offset="100%" stop-color="#8a6010"/></linearGradient>
      </defs><circle cx="14" cy="14" r="9" fill="none" stroke="url(#${u}a)" stroke-width="3.5"/>
      <circle cx="14" cy="14" r="5" fill="none" stroke="url(#${u}a)" stroke-width="1.8"/>
      <line x1="21" y1="20" x2="38" y2="36" stroke="url(#${u}a)" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="30" y1="30" x2="34" y2="26" stroke="url(#${u}a)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="34" y1="34" x2="38" y2="30" stroke="url(#${u}a)" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="10" cy="10" rx="4" ry="2.5" fill="white" opacity="0.3" transform="rotate(-30 10 10)"/></svg>`,

    'Drachenzahn': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0e8d0"/><stop offset="55%" stop-color="#c8b890"/><stop offset="100%" stop-color="#8a7850"/></linearGradient>
      </defs><path d="M22 4 Q28 10 30 22 Q32 34 22 40 Q12 34 14 22 Q16 10 22 4Z" fill="url(#${u}a)" stroke="#a08860" stroke-width="0.8"/>
      <line x1="22" y1="6" x2="22" y2="38" stroke="rgba(255,255,220,0.3)" stroke-width="1"/>
      <ellipse cx="17" cy="14" rx="4" ry="2.5" fill="white" opacity="0.35" transform="rotate(-20 17 14)"/></svg>`,

    'Goldmünze': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="38%" cy="30%" r="65%"><stop offset="0%" stop-color="#fff0a0"/><stop offset="55%" stop-color="#d4a030"/><stop offset="100%" stop-color="#7a5008"/></radialGradient>
      </defs><circle cx="22" cy="22" r="18" fill="url(#${u}a)" stroke="#c49030" stroke-width="1"/>
      <circle cx="22" cy="22" r="13" fill="none" stroke="#c49030" stroke-width="0.6" opacity="0.5"/>
      <text x="22" y="27" text-anchor="middle" font-size="14" fill="#8a5800" opacity="0.85">✦</text>
      <ellipse cx="16" cy="15" rx="5" ry="3" fill="white" opacity="0.3" transform="rotate(-30 16 15)"/></svg>`,

    'Feenstaub': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,0.9)"/><stop offset="40%" stop-color="rgba(240,192,64,0.4)"/><stop offset="100%" stop-color="rgba(240,192,64,0)"/></radialGradient>
      </defs><circle cx="22" cy="22" r="12" fill="url(#${u}a)"/>
      <text x="10" y="15" font-size="8" fill="#f0c040">✦</text>
      <text x="30" y="13" font-size="6" fill="#c080ff">✧</text>
      <text x="35" y="27" font-size="7" fill="#80c0ff">✦</text>
      <text x="27" y="37" font-size="7" fill="#f0c040">✧</text>
      <text x="10" y="36" font-size="6" fill="#c080ff">✦</text>
      <text x="4" y="24" font-size="7" fill="#80c0ff">✧</text>
      <text x="18" y="10" font-size="5" fill="#f0e4c0">✦</text>
      <circle cx="22" cy="22" r="3" fill="white" opacity="0.9"/></svg>`,

    'Phönixfeder': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe060"/><stop offset="55%" stop-color="#f06010"/><stop offset="100%" stop-color="#800010"/></linearGradient>
      </defs><path d="M22 4 Q30 10 34 18 Q38 26 32 32 Q28 36 22 38 Q18 36 16 32 Q12 26 14 18 Q16 10 22 4Z" fill="url(#${u}a)"/>
      <line x1="22" y1="6" x2="22" y2="36" stroke="#ffe080" stroke-width="1" opacity="0.5"/>
      <ellipse cx="17" cy="12" rx="4" ry="2.5" fill="white" opacity="0.35" transform="rotate(-30 17 12)"/></svg>`,

    'Mondstein': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="38%" cy="28%" r="65%"><stop offset="0%" stop-color="#f0f0ff"/><stop offset="55%" stop-color="#b0b8d8"/><stop offset="100%" stop-color="#6068a0"/></radialGradient>
      </defs><ellipse cx="22" cy="22" rx="17" ry="20" fill="url(#${u}a)" stroke="#9090c0" stroke-width="0.8"/>
      <ellipse cx="16" cy="16" rx="6" ry="3" fill="white" opacity="0.3"/>
      <ellipse cx="20" cy="28" rx="5" ry="2.5" fill="white" opacity="0.2"/>
      <ellipse cx="27" cy="20" rx="4" ry="2" fill="rgba(80,80,140,0.3)"/></svg>`,

    'Drachenkristall': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="40%" cy="30%" r="65%"><stop offset="0%" stop-color="#ff8090"/><stop offset="55%" stop-color="#c01020"/><stop offset="100%" stop-color="#400008"/></radialGradient>
      </defs><polygon points="22,2 26,8 34,6 30,14 38,18 30,20 34,28 26,26 22,34 18,26 10,28 14,20 6,18 14,14 10,6 18,8" fill="url(#${u}a)"/>
      <circle cx="22" cy="18" r="5" fill="#ff2040" opacity="0.7"/>
      <ellipse cx="16" cy="10" rx="4" ry="2.5" fill="white" opacity="0.3" transform="rotate(-10 16 10)"/></svg>`,

    'Mystische Essenz': () =>
      `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <radialGradient id="${u}a" cx="38%" cy="30%" r="65%"><stop offset="0%" stop-color="#80b0ff"/><stop offset="55%" stop-color="#1828b0"/><stop offset="100%" stop-color="#040828"/></radialGradient>
      <radialGradient id="${u}b" cx="35%" cy="25%" r="45%"><stop offset="0%" stop-color="rgba(180,210,255,0.55)"/><stop offset="100%" stop-color="rgba(180,210,255,0)"/></radialGradient>
      </defs><ellipse cx="22" cy="26" rx="12" ry="14" fill="url(#${u}a)" stroke="#4060d0" stroke-width="0.8"/>
      <ellipse cx="22" cy="26" rx="12" ry="14" fill="url(#${u}b)"/>
      <path d="M18 12 Q18 8 22 6 Q26 8 26 12" fill="none" stroke="#4060d0" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="22" y1="6" x2="22" y2="12" stroke="#4060d0" stroke-width="1.2"/></svg>`,
  };
  const fn = icons[name];
  if (!fn) {
    return `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs><radialGradient id="${u}x" cx="35%" cy="25%" r="70%"><stop offset="0%" stop-color="#d0a0ff"/><stop offset="100%" stop-color="#400080"/></radialGradient></defs><polygon points="22,4 38,14 38,30 22,40 6,30 6,14" fill="url(#${u}x)"/></svg>`;
  }
  return fn();
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

// === MANA-SYSTEM === Mana-Flasche aktualisieren
function manaSymbols(mana) {
  if (mana <= 0) return '';
  const count = mana >= 10
    ? Math.min(5, Math.ceil(mana / 10))
    : Math.min(5, mana);
  return Array(count).fill('<span class="mana-rune">✦</span>').join('');
}

function updateManaBottle(mana, maxMana) {
  const effectiveMax = maxMana || MAX_MANA;
  const pct = effectiveMax > 0 ? Math.max(0, Math.min(1, mana / effectiveMax)) : 0;
  const rect = document.getElementById('mana-fill-rect');
  if (rect) {
    rect.style.transform = `scaleY(${pct.toFixed(3)})`;
    const fillColor = pct > 0.6 ? '#2060ff'
                    : pct > 0.3 ? '#1040c0'
                    : pct > 0.1 ? '#0820a0'
                    : '#4a0080';
    rect.style.fill = fillColor;
  }
  const textEl = document.getElementById('mana-text');
  if (textEl) textEl.textContent = `${mana} / ${effectiveMax}`;
}

function renderBoard() {
  const { quests, mana } = appState;
  const active = quests.filter(q => !q.done);

  $('quest-list').innerHTML = '';
  active.forEach(q => $('quest-list').appendChild(makeQuestCard(q, mana)));

  // Done quests hidden from board — accessible via Rucksack Questlog/Schatztruhe
  $('treasure-section').classList.add('hidden');

  // === MANA-SYSTEM ===
  updateManaBottle(mana, appState.maxMana || MAX_MANA);
  $('star-count').textContent  = loadStars().length;

  renderSidequests();
}

function makeQuestCard(q, mana) {
  const canAfford = q.mana === 0 || mana >= q.mana;
  const canSwap   = appState.pool.some(p => p.rest === q.rest);
  const card      = document.createElement('div');

  // === QUEST-BOARD UPDATE === P7/P12: data-category + difficulty class
  const diffCount = q.mana > 0
    ? (q.mana >= 10 ? Math.min(5, Math.ceil(q.mana / 10)) : Math.min(5, q.mana))
    : 0;
  card.className       = `quest-card${q.rest ? ' rest-card' : ''}${diffCount > 0 ? ` difficulty-${diffCount}` : ''}`;
  card.dataset.name     = q.name;
  card.dataset.category = q.category || '';

  // === MANA-SYSTEM ===
  // === QUEST-BOARD UPDATE === P8: 🌙 Rast statt "Rast"
  const costHtml = q.mana > 0
    ? `<span class="quest-cost-runes">${manaSymbols(q.mana)}</span>`
    : `<span class="quest-rest-tag">🌙 Rast</span>`;

  const checkSvg = `<svg width="22" height="22" viewBox="0 0 28 28"><path d="M5 14 L11 21 L23 8" fill="none" stroke="#f0c040" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  // === QUEST-BOARD UPDATE === P6: SVG-Pfeil statt ⇄
  const swapSvg  = `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#c0a0f0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h14M14 4l3 3-3 3M17 13H3M6 10l-3 3 3 3"/></svg>`;

  card.innerHTML = `
    <div class="quest-info">
      <div class="quest-name">${q.name}</div>
      <div class="quest-meta">
        <span class="quest-cat-row">${catIconHtml(q.category)}</span>
        ${costHtml}
      </div>
    </div>
    <div class="quest-actions">
      <button class="quest-btn-swap" ${canSwap ? '' : 'disabled'} aria-label="${q.name} tauschen">${swapSvg}</button>
      <button class="quest-complete-btn${canAfford ? '' : ' cant-afford'}"
              ${canAfford ? '' : 'disabled'}
              aria-label="${q.name} abschließen">
        ${canAfford ? checkSvg : '<span style="color:rgba(255,255,255,0.2)">—</span>'}
      </button>
    </div>`;

  card.querySelector('.quest-btn-swap').addEventListener('click', () => swapQuest(q.name));
  if (canAfford) {
    card.querySelector('.quest-complete-btn').addEventListener('click', () => completeQuest(q.name));
  }
  return card;
}

function makeDoneCard(q) {
  const t    = q.treasure || TREASURE_ITEMS[0];
  const log  = getTodayLog(q.name);
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
    <div class="quest-done-mark">
      ${log
        ? `<button class="log-view-btn" aria-label="Log ansehen" title="Quest-Log ansehen">📜</button>`
        : '✓'}
    </div>`;
  if (log) {
    card.querySelector('.log-view-btn').addEventListener('click', () => showLogView(log));
  }
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
  _pendingCompletion = { type: 'quest', id: name, questTitle: name };
  openLogPopup(name, name);
}

function _finalizeQuestCompletion(name) {
  const quest = appState.quests.find(q => q.name === name && !q.done);
  if (!quest) return;

  quest.done     = true;
  quest.treasure = TREASURE_ITEMS[Math.floor(Math.random() * TREASURE_ITEMS.length)];

  // === MANA-SYSTEM ===
  if (quest.rest) {
    if (!appState.maxMana) appState.maxMana = MAX_MANA;
    appState.maxMana = Math.min(appState.maxMana + 10, 60);
    appState.mana    = Math.min(appState.mana + 10, appState.maxMana);
  } else {
    appState.mana = Math.max(0, appState.mana - quest.mana);
  }

  if (!quest.rest) {
    const rhythm = loadRhythm();
    markRhythmDone(quest.name, rhythm);
    saveRhythm(rhythm);
  }

  rucksackRecordTreasure(quest.name, quest.treasure, 'quest');
  saveDayState(appState);

  // === QUEST-BOARD UPDATE === P10: Shooting-Star-Animation
  const _cardEl = document.querySelector(`#quest-list .quest-card[data-name="${CSS.escape(name)}"]`);
  if (_cardEl) {
    const _rect = _cardEl.getBoundingClientRect();
    const _star = document.createElement('div');
    _star.className  = 'shooting-star-fx';
    _star.style.left = (_rect.left + _rect.width  / 2) + 'px';
    _star.style.top  = (_rect.top  + _rect.height / 2) + 'px';
    document.body.appendChild(_star);
    requestAnimationFrame(() => requestAnimationFrame(() => _star.classList.add('shooting-star-fx--go')));
    setTimeout(() => _star.remove(), 800);
  }

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
  const glyph = $('reward-glyph');
  glyph.className = 'reward-icon-wrap';
  glyph.innerHTML = _ruckTreasureIcon(t.name, 72);
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
    // === MANA-SYSTEM === backward compat
    if (!appState.maxMana) appState.maxMana = MAX_MANA;
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
          maxMana:     MAX_MANA,
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
        if (el.id === 'popup-day-rating') {
          _dayRatingDismissedAt = Date.now();
        }
        if (el.id === 'popup-quest-log') {
          _pendingCompletion = null;
        }
        el.classList.add('hidden');
      }
    });
  });

  $('btn-telescope-close').addEventListener('click', () => {
    $('popup-telescope').classList.add('hidden');
  });

  // Feature 1 – Day Rating
  initDayRatingPopup();
  setInterval(checkAndShowDayRating, 60000);

  // Feature 2 – Sidequests
  // === FIX: SIDEQUEST & UNTERSEITEN – Strudel als einziger Add-Button ===
  $('sq-vortex-btn').addEventListener('click', showSqCreateModal);
  initSqCreateModal();

  // Feature 3 – Quest Log
  initLogPopup();
  $('btn-log-view-close').addEventListener('click', () => $('popup-log-view').classList.add('hidden'));

  // === RUCKSACK ===
  initRucksack();
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

// ═══════════════════════════════════════════════════════════════════
// === FEATURE 1: Tagesbewertung =====================================
// ═══════════════════════════════════════════════════════════════════

const STORE_DAY_RATINGS   = 'questboard_day_ratings';
let   _dayRatingDismissedAt = null;

function loadDayRatings() {
  try { return JSON.parse(localStorage.getItem(STORE_DAY_RATINGS)) || []; }
  catch { return []; }
}

function saveDayRating(entry) {
  const ratings = loadDayRatings();
  const idx = ratings.findIndex(r => r.date === entry.date);
  if (idx >= 0) ratings[idx] = entry; else ratings.push(entry);
  localStorage.setItem(STORE_DAY_RATINGS, JSON.stringify(ratings));
}

function getTodayDayRating() {
  return loadDayRatings().find(r => r.date === todayStr()) || null;
}

function getViennaHour() {
  const parts = new Intl.DateTimeFormat('de-AT', {
    timeZone: 'Europe/Vienna', hour: 'numeric', hour12: false,
  }).formatToParts(new Date());
  return parseInt(parts.find(p => p.type === 'hour')?.value ?? '0', 10);
}

function showDayRatingPopup() {
  if (!appState) return;

  const apUsed    = (appState.maxMana || MAX_MANA) - appState.mana;
  const autoHint  = $('day-rating-auto-hint');
  const existing  = getTodayDayRating();

  // === MANA-SYSTEM === Pre-select auto rating if < 20 Mana used and no existing rating
  let autoRated = false;
  if (!existing && apUsed < 20) {
    autoRated = true;
    const tooMuchBtn = document.querySelector('.day-rating-opt-btn[data-rating="too_much"]');
    document.querySelectorAll('.day-rating-opt-btn').forEach(b => b.classList.remove('selected'));
    tooMuchBtn?.classList.add('selected');
    autoHint.textContent = `Heute wurden weniger als 20 Mana verbraucht (${apUsed} Mana). Das deutet auf einen überwältigenden Tag hin – „Zu viel" wurde vorausgewählt.`;
    autoHint.classList.remove('hidden');
    $('btn-day-rating-save').disabled = false;
  } else {
    document.querySelectorAll('.day-rating-opt-btn').forEach(b => b.classList.remove('selected'));
    if (existing) {
      document.querySelector(`.day-rating-opt-btn[data-rating="${existing.rating}"]`)?.classList.add('selected');
      $('btn-day-rating-save').disabled = false;
    } else {
      $('btn-day-rating-save').disabled = true;
    }
    autoHint.classList.add('hidden');
  }

  $('popup-day-rating').dataset.autoRated = autoRated ? '1' : '';
  $('popup-day-rating').classList.remove('hidden');
}

function checkAndShowDayRating() {
  if (!appState) return;
  if (getTodayDayRating()) return;
  if (getViennaHour() < 21) return;
  if (_dayRatingDismissedAt) {
    const minSince = (Date.now() - _dayRatingDismissedAt) / 60000;
    if (minSince < 30) return;
  }
  showDayRatingPopup();
}

function initDayRatingPopup() {
  document.querySelectorAll('.day-rating-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-rating-opt-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      $('btn-day-rating-save').disabled = false;
    });
  });

  $('btn-day-rating-save').addEventListener('click', () => {
    const selected  = document.querySelector('.day-rating-opt-btn.selected');
    if (!selected) return;
    const autoRated = $('popup-day-rating').dataset.autoRated === '1';
    saveDayRating({
      date:      todayStr(),
      rating:    selected.dataset.rating,
      apUsed:    (appState?.maxMana ?? MAX_MANA) - (appState?.mana ?? MAX_MANA),
      autoRated,
    });
    $('popup-day-rating').classList.add('hidden');
  });

  $('btn-day-rating-skip').addEventListener('click', () => {
    _dayRatingDismissedAt = Date.now();
    $('popup-day-rating').classList.add('hidden');
  });
}

// ═══════════════════════════════════════════════════════════════════
// === FEATURE 2: Spontane Sidequests ================================
// ═══════════════════════════════════════════════════════════════════

const STORE_SIDEQUESTS = 'questboard_sidequests';

function loadTodaySidequests() {
  try {
    return (JSON.parse(localStorage.getItem(STORE_SIDEQUESTS)) || [])
      .filter(sq => sq.date === todayStr());
  } catch { return []; }
}

function saveSidequest(sq) {
  try {
    const all = JSON.parse(localStorage.getItem(STORE_SIDEQUESTS)) || [];
    const idx = all.findIndex(s => s.id === sq.id);
    if (idx >= 0) all[idx] = sq; else all.push(sq);
    localStorage.setItem(STORE_SIDEQUESTS, JSON.stringify(all));
  } catch {}
}

function renderSidequests() {
  const list = $('sidequest-list');
  if (!list) return;
  list.innerHTML = '';
  loadTodaySidequests().forEach(sq => list.appendChild(makeSidequestCard(sq)));
}

function makeSidequestCard(sq) {
  const card = document.createElement('div');
  card.className = `sidequest-card${sq.done ? ' sidequest-done' : ''}`;

  // === MANA-SYSTEM ===
  const costHtml = sq.mana > 0 ? manaSymbols(sq.mana) : '';

  const log       = getTodayLog(sq.id);
  const sqCheckSvg = `<svg width="22" height="22" viewBox="0 0 28 28"><path d="M5 14 L11 21 L23 8" fill="none" stroke="#f0c040" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const actionHtml = sq.done
    ? `<div class="quest-done-mark">
        ${log
          ? `<button class="log-view-btn" aria-label="Log ansehen" title="Quest-Log ansehen">📜</button>`
          : '✓'}
       </div>`
    : `<div class="quest-actions">
        <button class="quest-complete-btn" aria-label="${sq.title} abschließen">${sqCheckSvg}</button>
       </div>`;

  card.innerHTML = `
    <span class="sq-lightning-badge">⚡ Sidequest</span>
    <span class="sq-cat-emoji">${sq.emoji}</span>
    <div class="quest-info">
      <div class="quest-name">${sq.title}</div>
      <div class="quest-meta">
        <span class="quest-cost">${costHtml}</span>
        ${sq.description ? `<span class="quest-category">${sq.description}</span>` : ''}
      </div>
    </div>
    ${actionHtml}`;

  if (!sq.done) {
    card.querySelector('.quest-complete-btn').addEventListener('click', () => completeSidequest(sq.id));
  } else if (log) {
    card.querySelector('.log-view-btn')?.addEventListener('click', () => showLogView(log));
  }
  return card;
}

function showSqCreateModal() {
  $('sq-title-input').value  = '';
  $('sq-desc-input').value   = '';
  document.querySelectorAll('.sq-cat-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.sq-ap-btn').forEach(b => b.classList.remove('selected'));
  $('btn-sq-save').disabled  = true;
  $('popup-sq-create').classList.remove('hidden');
}

function _updateSqSaveState() {
  const hasCategory = !!document.querySelector('.sq-cat-btn.selected');
  const hasTitle    = $('sq-title-input').value.trim().length > 0;
  const hasAp       = !!document.querySelector('.sq-ap-btn.selected');
  $('btn-sq-save').disabled = !(hasCategory && hasTitle && hasAp);
}

function initSqCreateModal() {
  document.querySelectorAll('.sq-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sq-cat-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      _updateSqSaveState();
    });
  });

  document.querySelectorAll('.sq-ap-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sq-ap-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      _updateSqSaveState();
    });
  });

  $('sq-title-input').addEventListener('input', _updateSqSaveState);

  $('btn-sq-save').addEventListener('click', () => {
    const catBtn = document.querySelector('.sq-cat-btn.selected');
    const apBtn  = document.querySelector('.sq-ap-btn.selected');
    const title  = $('sq-title-input').value.trim();
    if (!catBtn || !apBtn || !title) return;

    const sq = {
      id:          `sq_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      date:        todayStr(),
      category:    catBtn.dataset.cat,
      emoji:       catBtn.dataset.emoji,
      title,
      mana:        parseInt(apBtn.dataset.ap, 10),
      description: $('sq-desc-input').value.trim() || null,
      done:        false,
      treasure:    null,
    };
    saveSidequest(sq);
    $('popup-sq-create').classList.add('hidden');
    renderSidequests();
  });

  $('btn-sq-cancel').addEventListener('click', () => $('popup-sq-create').classList.add('hidden'));
}

function completeSidequest(sqId) {
  const sqs = loadTodaySidequests();
  const sq  = sqs.find(s => s.id === sqId && !s.done);
  if (!sq) return;
  _pendingCompletion = { type: 'sidequest', id: sqId, questTitle: sq.title };
  openLogPopup(sqId, sq.title);
}

function _finalizeSidequestCompletion(sqId) {
  const sqs = loadTodaySidequests();
  const sq  = sqs.find(s => s.id === sqId && !s.done);
  if (!sq || !appState) return;

  sq.done     = true;
  sq.treasure = TREASURE_ITEMS[Math.floor(Math.random() * TREASURE_ITEMS.length)];
  appState.mana = Math.max(0, appState.mana - sq.mana);

  rucksackRecordTreasure(sq.title, sq.treasure, 'sidequest');
  saveSidequest(sq);
  saveDayState(appState);
  renderBoard();
  showRewardPopup(sq);
}

// ═══════════════════════════════════════════════════════════════════
// === FEATURE 3: Quest-Log als Schriftrolle =========================
// ═══════════════════════════════════════════════════════════════════

const STORE_LOGS       = 'questboard_logs';
let   _pendingCompletion = null;

const LOG_RATING_LABEL = { good: '😄 Sehr gut', ok: '😐 Ok', bad: '😞 Schlecht' };

function loadLogs() {
  try { return JSON.parse(localStorage.getItem(STORE_LOGS)) || []; }
  catch { return []; }
}

function saveLog(entry) {
  const logs = loadLogs();
  const idx  = logs.findIndex(l => l.questId === entry.questId && l.date === entry.date);
  if (idx >= 0) logs[idx] = entry; else logs.push(entry);
  localStorage.setItem(STORE_LOGS, JSON.stringify(logs));
}

function getTodayLog(questId) {
  return loadLogs().find(l => l.questId === questId && l.date === todayStr()) || null;
}

function openLogPopup(questId, questTitle) {
  $('log-quest-title').textContent = questTitle;
  $('log-note-input').value        = '';
  document.querySelectorAll('.log-rating-btn').forEach(b => b.classList.remove('selected'));
  $('btn-log-save').disabled       = true;
  $('popup-quest-log').classList.remove('hidden');
}

function initLogPopup() {
  document.querySelectorAll('.log-rating-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.log-rating-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      $('btn-log-save').disabled = false;
    });
  });

  $('btn-log-save').addEventListener('click', () => {
    const selected = document.querySelector('.log-rating-btn.selected');
    if (!selected || !_pendingCompletion) return;

    saveLog({
      questId:    _pendingCompletion.id,
      questTitle: _pendingCompletion.questTitle,
      date:       todayStr(),
      rating:     selected.dataset.rating,
      note:       $('log-note-input').value.trim() || null,
    });

    $('popup-quest-log').classList.add('hidden');

    const pending = _pendingCompletion;
    _pendingCompletion = null;

    if (pending.type === 'quest') {
      _finalizeQuestCompletion(pending.id);
    } else {
      _finalizeSidequestCompletion(pending.id);
    }
  });
}

function showLogView(log) {
  $('log-view-title').textContent  = log.questTitle;
  $('log-view-rating').textContent = LOG_RATING_LABEL[log.rating] || log.rating;
  $('log-view-note').textContent   = log.note || '(Keine Notiz)';
  $('popup-log-view').classList.remove('hidden');
}

// ═══════════════════════════════════════════════════════════════════
// === RUCKSACK ======================================================
// ═══════════════════════════════════════════════════════════════════

const STORE_TREASURES = 'questboard_treasures';

function rucksackLoadTreasures() {
  try { return JSON.parse(localStorage.getItem(STORE_TREASURES)) || []; }
  catch { return []; }
}

function rucksackRecordTreasure(questTitle, treasure, type) {
  const all = rucksackLoadTreasures();
  all.push({
    date:    todayStr(),
    questTitle,
    name:    treasure.name,
    color:   treasure.color,
    special: treasure.special || null,
    type,
  });
  localStorage.setItem(STORE_TREASURES, JSON.stringify(all));
}

// ── State ─────────────────────────────────────────────────────────
let _ruckOpen        = false;
let _ruckView        = 'cards';
let _ruckChestDone   = false;
let _ruckCountRaf    = null;
let _ruckDragY       = 0;
let _ruckDragging    = false;
let _ruckChestTimers = []; // === FIX: PUNKT 3 – Timer-Handles für Kisten-Animation ===

// ── Open / Close ──────────────────────────────────────────────────
function openRucksack() {
  if (_ruckOpen) return;
  _ruckOpen = true;
  const overlay = $('rucksack-overlay');
  const drawer  = $('rucksack-drawer');
  overlay.classList.remove('hidden');
  drawer.classList.remove('hidden');
  // Reset to cards view without animation
  _ruckSetView('cards', false);
  requestAnimationFrame(() => {
    overlay.classList.add('rucksack-overlay-visible');
    drawer.classList.add('rucksack-drawer-open');
  });
}

function closeRucksack() {
  if (!_ruckOpen) return;
  _ruckOpen = false;
  const overlay = $('rucksack-overlay');
  const drawer  = $('rucksack-drawer');
  drawer.classList.remove('rucksack-drawer-open');
  overlay.classList.remove('rucksack-overlay-visible');
  drawer.style.transform = '';
  setTimeout(() => {
    drawer.classList.add('hidden');
    overlay.classList.add('hidden');
  }, 360);
}

// ── View Switching ────────────────────────────────────────────────
const RUCK_VIEWS = ['cards', 'telescope', 'questlog', 'treasure'];

function _ruckViewEl(name) {
  return document.getElementById('rucksack-view-' + name);
}

function _ruckSetView(name, animate) {
  const prev = _ruckView;
  _ruckView  = name;

  // Reset treasure animation state when returning to cards
  if (name === 'cards') {
    _ruckChestDone = false;
    _ruckChestTimers.forEach(clearTimeout);
    _ruckChestTimers = [];
  }

  if (!animate || prev === name) {
    RUCK_VIEWS.forEach(v => {
      const el = _ruckViewEl(v);
      el.style.transition = 'none';
      el.className = 'rucksack-view ' + (v === name ? 'rucksack-view-active' : 'rucksack-view-right');
    });
    _ruckPopulate(name);
    return;
  }

  _ruckPopulate(name);

  const goBack   = (name === 'cards');
  const prevEl   = _ruckViewEl(prev);
  const targetEl = _ruckViewEl(name);

  // Place target off-screen instantly
  targetEl.style.transition = 'none';
  targetEl.className = 'rucksack-view ' + (goBack ? 'rucksack-view-left' : 'rucksack-view-right');

  requestAnimationFrame(() => {
    targetEl.style.transition = '';
    requestAnimationFrame(() => {
      prevEl.className   = 'rucksack-view ' + (goBack ? 'rucksack-view-right' : 'rucksack-view-left');
      targetEl.className = 'rucksack-view rucksack-view-active';
    });
  });
}

function _ruckPopulate(name) {
  if (name === 'telescope') _ruckPopTelescope();
  if (name === 'questlog')  _ruckPopQuestlog();
  if (name === 'treasure')  _ruckPopTreasure();
}

// === FIX: PUNKT 5 – Teleskop Fly-in: ±150px Startposition, 0.05s Stagger, Bounce 1.4, CountUp danach ===
// ── Telescope ─────────────────────────────────────────────────────
function _ruckPopTelescope() {
  const starCount = loadStars().length;
  const numEl     = $('ruck-star-num');

  // Reset counter to 0 initially; CountUp starts AFTER fly-in animations complete
  if (_ruckCountRaf) cancelAnimationFrame(_ruckCountRaf);
  numEl.textContent = '0';

  // Constellations list
  const list = $('ruck-const-list');
  list.innerHTML = '';
  const info  = getConstellationInfo(starCount);
  const compN = info.allComplete ? CONSTELLATIONS.length : info.completedCount;

  CONSTELLATIONS.forEach((c, i) => {
    const isComplete = i < compN;
    const isCurrent  = !info.allComplete && i === compN;
    const isNext2    = !isComplete && !isCurrent && (i === compN + 1 || i === compN + 2);
    if (!isComplete && !isCurrent && !isNext2) return;

    const el = document.createElement('div');
    let cls = 'ruck-const-item ';
    if (isComplete)      cls += 'ci-done';
    else if (isCurrent)  cls += 'ci-active';
    else                 cls += 'ci-locked';
    el.className = cls;

    let icon, name, badgeCls, badgeTxt;
    if (isComplete) {
      icon = '⭐'; name = c.name;
      badgeCls = 'badge-done'; badgeTxt = 'Entdeckt ✦';
    } else if (isCurrent) {
      icon = '🔭'; name = c.name;
      badgeCls = 'badge-active'; badgeTxt = `${info.earned}/${c.starsNeeded}`;
    } else {
      icon = '🔒'; name = '???';
      badgeCls = 'badge-locked'; badgeTxt = `✦ ${c.starsNeeded} Sterne`;
    }

    el.innerHTML = `
      <span class="ruck-const-icon">${icon}</span>
      <span class="ruck-const-name">${name}</span>
      <span class="ruck-const-badge ${badgeCls}">${badgeTxt}</span>`;
    list.appendChild(el);
  });

  // Fly-in: Hero zuerst, dann Sternbild-Einträge (±150px Startversatz, 0.05s Stagger)
  const hero = document.querySelector('.ruck-stars-hero');
  if (hero) {
    hero.classList.remove('fly-in');
    void hero.offsetWidth;
    hero.classList.add('fly-in');
  }

  const items = list.querySelectorAll('.ruck-const-item');
  items.forEach((el, i) => {
    el.classList.remove('fly-in');
    const fx = (Math.random() * 300 - 150).toFixed(0);
    const fy = (Math.random() * 300 - 150).toFixed(0);
    el.style.setProperty('--fx', `${fx}px`);
    el.style.setProperty('--fy', `${fy}px`);
    el.style.animationDelay = `${(i * 0.05 + 0.1).toFixed(2)}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('fly-in')));
  });

  // CountUp startet NACH den Fly-in-Animationen (Fly-in max ~items*0.05+0.1+0.8s)
  const flyInEnd = Math.max(items.length * 0.05 + 0.1 + 0.8, 0.9) * 1000;
  setTimeout(() => {
    const t0  = performance.now();
    const dur = 900;
    function countStep(now) {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      numEl.textContent = Math.round(e * starCount);
      if (p < 1) _ruckCountRaf = requestAnimationFrame(countStep);
    }
    _ruckCountRaf = requestAnimationFrame(countStep);
  }, flyInEnd);
}

// ── Questlog ──────────────────────────────────────────────────────
function _ruckFmtDate(d) {
  try {
    return new Intl.DateTimeFormat('de-AT', {
      timeZone: 'Europe/Vienna', day: 'numeric', month: 'numeric', year: '2-digit',
    }).format(new Date(d + 'T12:00:00'));
  } catch { return d; }
}

function _ruckRatingLabel(type, rating) {
  if (type === 'quest') {
    return { good: '😄 Sehr gut', ok: '😐 Ok', bad: '😞 Schlecht' }[rating] || rating;
  }
  return {
    too_little: '🌱 Zu wenig', just_right: '⭐ Genau richtig',
    much: '🔥 Viel', too_much: '💀 Zu viel',
  }[rating] || rating;
}

// === FIX: PUNKT 2 – Questlog Pergament mit Tag-Gruppierung ===
function _ruckPopQuestlog() {
  const scrollArea = $('ruck-log-scroll');
  const logs       = loadLogs();
  const ratings    = loadDayRatings();

  const allEntries = [
    ...logs.map(l => ({ type: 'quest', date: l.date, title: l.questTitle, rating: l.rating, note: l.note })),
    ...ratings.map(r => ({ type: 'day', date: r.date, rating: r.rating })),
  ];

  // Empty state
  if (allEntries.length === 0) {
    scrollArea.innerHTML = `
      <div class="ruck-scroll-outer">
        <div class="ruck-scroll-roll"></div>
        <div class="ruck-scroll-body">
          <div class="ruck-scroll-heading">Quest Log</div>
          <div class="ruck-perg-empty">Noch keine Abenteuer verzeichnet...</div>
        </div>
        <div class="ruck-scroll-roll-bot"></div>
      </div>`;
    requestAnimationFrame(() => {
      const body = scrollArea.querySelector('.ruck-scroll-body');
      if (body) body.classList.add('unrolling');
    });
    return;
  }

  // Group by date
  const byDate = {};
  allEntries.forEach(e => {
    if (!byDate[e.date]) byDate[e.date] = { dayRating: null, quests: [] };
    if (e.type === 'day') byDate[e.date].dayRating = e;
    else byDate[e.date].quests.push(e);
  });

  const dates = Object.keys(byDate).sort().reverse();

  const DR_ICONS  = { too_little: '🌱', just_right: '⭐', much: '🔥', too_much: '💀' };
  const DR_LABELS = { too_little: 'Zu wenig', just_right: 'Genau richtig', much: 'Viel', too_much: 'Zu viel' };
  const QR_ICONS  = { good: '😄', ok: '😐', bad: '😞' };

  let entryIdx = 0;
  let bodyHtml = '';

  dates.forEach((date, di) => {
    const group   = byDate[date];
    const fmtDate = _ruckFmtDate(date);

    const sepClass = di > 0 ? ' ruck-perg-day-group ruck-perg-day-group-sep' : 'ruck-perg-day-group';
    bodyHtml += `<div class="${sepClass}">`;

    // Day header
    bodyHtml += `<div class="ruck-perg-entry ruck-perg-day-hdr" style="animation-delay:${(entryIdx * 0.1 + 0.22).toFixed(2)}s">
      <span class="ruck-perg-day-ornament">✦</span> ${fmtDate} <span class="ruck-perg-day-ornament">✦</span>
    </div>`;
    entryIdx++;

    // Day rating block
    if (group.dayRating) {
      const r = group.dayRating;
      bodyHtml += `<div class="ruck-perg-entry ruck-perg-day-rating" style="animation-delay:${(entryIdx * 0.1 + 0.22).toFixed(2)}s">
        <span class="ruck-perg-day-rating-icon">${DR_ICONS[r.rating] || '⭐'}</span>
        <span class="ruck-perg-day-rating-label">Tag: ${DR_LABELS[r.rating] || r.rating}</span>
      </div>`;
      entryIdx++;
    }

    // Quest entries with SVG separators
    group.quests.forEach((e, qi) => {
      if (qi > 0) {
        bodyHtml += `<div class="ruck-perg-sep" aria-hidden="true">
          <svg width="100%" height="12" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path d="M0,6 Q25,2 50,6 Q75,10 100,6 Q125,2 150,6 Q175,10 200,6" stroke="#8b6020" stroke-width="1.2" fill="none" opacity="0.4"/>
          </svg>
        </div>`;
      }
      const ratingIcon = QR_ICONS[e.rating] || '';
      bodyHtml += `<div class="ruck-perg-entry ruck-perg-quest" style="animation-delay:${(entryIdx * 0.1 + 0.22).toFixed(2)}s">
        <div class="ruck-perg-entry-hdr">
          <span class="ruck-perg-title">${e.title}</span>
          <span class="ruck-perg-rating-icon">${ratingIcon}</span>
        </div>
        ${e.note ? `<div class="ruck-perg-note">${e.note}</div>` : ''}
      </div>`;
      entryIdx++;
    });

    bodyHtml += `</div>`;
  });

  scrollArea.innerHTML = `
    <div class="ruck-scroll-outer">
      <div class="ruck-scroll-roll"></div>
      <div class="ruck-scroll-body"><div class="ruck-scroll-heading">Quest Log</div>${bodyHtml}</div>
      <div class="ruck-scroll-roll-bot"></div>
    </div>`;

  requestAnimationFrame(() => {
    const body = scrollArea.querySelector('.ruck-scroll-body');
    if (body) body.classList.add('unrolling');
    scrollArea.querySelectorAll('.ruck-perg-entry').forEach(el => {
      requestAnimationFrame(() => el.classList.add('perg-in'));
    });
  });
}

// ── Schatztruhe ───────────────────────────────────────────────────
function _ruckSpawnParticles() {
  const wrap = $('ruck-chest-particles');
  if (!wrap) return;
  wrap.innerHTML = '';
  const glyphs = ['✦', '✧', '★', '✦', '✧', '⭐', '✦'];
  for (let i = 0; i < 7; i++) {
    const p = document.createElement('span');
    p.className   = 'ruck-gold-particle';
    p.textContent = glyphs[i];
    p.style.left  = `${15 + Math.random() * 70}%`;
    p.style.top   = '0';
    p.style.animationDelay = `${i * 0.11}s`;
    wrap.appendChild(p);
  }
  setTimeout(() => { wrap.innerHTML = ''; }, 2200);
}

// === FIX: PUNKT 3 – Schatztruhe mit Deckel-Animation, Glitzer, gestaffelten Schätzen ===
function _ruckPopTreasure() {
  // Cancel any pending timers from previous opening
  _ruckChestTimers.forEach(clearTimeout);
  _ruckChestTimers = [];

  const container       = $('ruck-treasure-entries');
  const particleWrap    = $('ruck-chest-particles');
  const scrollArea      = particleWrap.parentNode;

  // Remove old hero wrap, create fresh one for re-animation
  const oldHero = document.getElementById('ruck-chest-hero-wrap');
  if (oldHero) oldHero.remove();
  const heroWrap = document.createElement('div');
  heroWrap.id        = 'ruck-chest-hero-wrap';
  heroWrap.className = 'ruck-chest-hero-wrap';
  scrollArea.insertBefore(heroWrap, particleWrap);

  heroWrap.innerHTML = `
    <div class="ruck-chest-hero-perspective">
      <svg class="ruck-chest-hero-svg" width="140" height="88" viewBox="0 0 180 100" aria-hidden="true">
        <defs>
          <filter id="chest-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- Körper -->
        <rect x="8" y="54" width="164" height="40" rx="4" fill="#3a1a08" stroke="#e8b840" stroke-width="2.5" filter="url(#chest-glow)"/>
        <!-- Unteres Band -->
        <rect x="8" y="86" width="164" height="8" rx="3" fill="#e8b840"/>
        <!-- Holzmaserung -->
        <rect x="46" y="57" width="8" height="36" rx="1.5" fill="#e8b840" opacity="0.45"/>
        <rect x="126" y="57" width="8" height="36" rx="1.5" fill="#e8b840" opacity="0.45"/>
        <!-- 4 Eckbeschläge -->
        <rect x="8"   y="54" width="18" height="18" rx="2" fill="#e8b840" opacity="0.78"/>
        <rect x="154" y="54" width="18" height="18" rx="2" fill="#e8b840" opacity="0.78"/>
        <rect x="8"   y="76" width="18" height="18" rx="2" fill="#e8b840" opacity="0.78"/>
        <rect x="154" y="76" width="18" height="18" rx="2" fill="#e8b840" opacity="0.78"/>
        <!-- Schlossplatte (Mitte, größer) -->
        <rect x="72" y="58" width="36" height="26" rx="5" fill="#e8b840" stroke="#ffe090" stroke-width="2"/>
        <!-- Schloss-Bügel -->
        <path d="M80 58 Q80 46 90 46 Q100 46 100 58" fill="none" stroke="#c49030" stroke-width="4.5"/>
        <!-- Schlüsselloch -->
        <circle cx="90" cy="68" r="4.5" fill="#2a1008"/>
        <rect x="88" y="70" width="4" height="7" rx="1.5" fill="#2a1008"/>
        <!-- Deckel (animiert) -->
        <g class="ruck-chest-lid-g">
          <path d="M8 54 L8 28 Q8 16 90 12 Q172 16 172 28 L172 54 Z" fill="#4a2010" stroke="#e8b840" stroke-width="2.5"/>
          <rect x="46" y="18" width="8" height="36" rx="1.5" fill="#e8b840" opacity="0.38"/>
          <rect x="126" y="18" width="8" height="36" rx="1.5" fill="#e8b840" opacity="0.38"/>
          <line x1="8" y1="42" x2="172" y2="38" stroke="#2a1008" stroke-width="1.5" opacity="0.4"/>
          <text x="90" y="40" text-anchor="middle" font-size="15" fill="#ffe090" opacity="0.9">✦</text>
          <rect x="8"   y="28" width="18" height="16" rx="2" fill="#e8b840" opacity="0.65"/>
          <rect x="154" y="28" width="18" height="16" rx="2" fill="#e8b840" opacity="0.65"/>
        </g>
      </svg>
    </div>
    <div class="ruck-chest-glitter-wrap" id="ruck-chest-glitter-wrap"></div>`;

  // 1. Trigger lid animation after first paint
  requestAnimationFrame(() => {
    const lid = heroWrap.querySelector('.ruck-chest-lid-g');
    if (lid) { void lid.offsetWidth; lid.classList.add('ruck-lid-open'); }
  });

  // Collect item data
  const stored = rucksackLoadTreasures();
  const today  = todayStr();
  const extra  = [];
  if (appState) {
    appState.quests.filter(q => q.done && q.treasure).forEach(q => {
      const already = stored.some(t => t.date === today && t.questTitle === q.name && t.type === 'quest');
      if (!already) extra.push({ date: today, questTitle: q.name, name: q.treasure.name, type: 'quest' });
    });
  }
  const all = [...stored, ...extra].sort((a, b) => b.date.localeCompare(a.date));

  if (all.length === 0) {
    container.innerHTML = '<div class="ruck-chest-empty">Die Truhe wartet auf deine Heldentaten...</div>';
    return;
  }

  container.innerHTML = ''; // Clear while lid animation plays

  // 2. Goldglitzer-Partikel nach Deckel-Animation (0.6s) + 0.3s Delay = 0.9s
  _ruckChestTimers.push(setTimeout(() => {
    const gw = document.getElementById('ruck-chest-glitter-wrap');
    if (!gw) return;
    const glyphs = ['✦', '✧', '★', '✦', '✧', '⭐', '✦', '✧'];
    glyphs.forEach((g, i) => {
      const el = document.createElement('span');
      el.className = 'ruck-chest-glitter-item';
      el.textContent = g;
      el.style.left = `${8 + Math.random() * 84}%`;
      el.style.top  = `${-(15 + Math.random() * 10)}px`;
      el.style.animation = `ruck-glitter-up 0.8s ease-out ${(i * 0.05).toFixed(2)}s forwards`;
      gw.appendChild(el);
    });
  }, 900));

  // 3. BG-Münzen/Edelsteine einblenden (1.0s) + Reward-Icons mit 0.4s Versatz (ab 1.4s)
  _ruckChestTimers.push(setTimeout(() => {
    const PER_ROW = 3;
    const rows    = Math.ceil(all.length / PER_ROW);
    const minH    = rows * 120 + 70;
    const COL_ANCHORS = [10, 40, 70];

    // Statische Münzen im Hintergrund
    let bgHtml = '';
    const coinData = [
      {l:6,t:18,s:22},{l:18,t:52,s:18},{l:28,t:28,s:25},{l:42,t:62,s:20},
      {l:55,t:15,s:24},{l:65,t:48,s:19},{l:78,t:32,s:22},{l:88,t:68,s:18},
    ];
    coinData.forEach((c, i) => {
      const jl = Math.max(2, Math.min(88, c.l + (Math.random()-0.5)*8));
      const jt = Math.max(4, c.t + (Math.random()-0.5)*10);
      bgHtml += `<svg class="ruck-chest-bg-coin" style="left:${jl.toFixed(1)}%;top:${jt.toFixed(0)}px;width:${c.s}px;height:${c.s}px" viewBox="0 0 20 20" aria-hidden="true"><defs><radialGradient id="bcg${i}" cx="38%" cy="32%" r="62%"><stop offset="0%" stop-color="#ffe080"/><stop offset="100%" stop-color="#c49020"/></radialGradient></defs><circle cx="10" cy="10" r="9" fill="url(#bcg${i})" stroke="#b08010" stroke-width="1"/></svg>`;
    });
    // Statische Edelsteine im Hintergrund
    const gemData = [
      {l:10,t:38,s:15,c:'#e83030',sc:'#ff9090'},{l:22,t:72,s:13,c:'#2060e8',sc:'#80b0ff'},
      {l:38,t:44,s:17,c:'#20b840',sc:'#80ff90'},{l:52,t:76,s:14,c:'#a030d8',sc:'#d888ff'},
      {l:70,t:22,s:16,c:'#e85030',sc:'#ff9868'},{l:84,t:55,s:13,c:'#1890e0',sc:'#70d8ff'},
    ];
    gemData.forEach((g, i) => {
      const jl = Math.max(2, Math.min(88, g.l + (Math.random()-0.5)*8));
      const jt = Math.max(4, g.t + (Math.random()-0.5)*10);
      bgHtml += `<svg class="ruck-chest-bg-gem" style="left:${jl.toFixed(1)}%;top:${jt.toFixed(0)}px;width:${g.s}px;height:${g.s}px" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,1 18,7 15,19 5,19 2,7" fill="${g.c}" stroke="${g.sc}" stroke-width="1.2" opacity="0.9"/></svg>`;
    });

    let scatterHtml = '';
    all.forEach((t, i) => {
      const col     = i % PER_ROW;
      const row     = Math.floor(i / PER_ROW);
      const leftPct = Math.max(-12, Math.min(84, COL_ANCHORS[col] + (Math.random() - 0.5) * 44));
      const topPx   = Math.max(0, row * 118 + (Math.random() - 0.5) * 55);
      const rot     = -25 + Math.random() * 50;
      const zIdx    = 2 + Math.floor(Math.random() * 7);
      const delay   = (i * 0.08 + 0.4).toFixed(2);
      scatterHtml += `<div class="ruck-scatter-item pop-in" style="left:${leftPct.toFixed(1)}%;top:${topPx.toFixed(0)}px;--rot:${rot.toFixed(1)}deg;z-index:${zIdx};animation-delay:${delay}s">${_ruckTreasureIcon(t.name, 52)}</div>`;
    });

    container.innerHTML = `<div class="ruck-chest-floor"><div class="ruck-chest-bg-layer" id="ruck-bg-layer">${bgHtml}</div><div class="ruck-scattered-wrap" style="min-height:${minH}px">${scatterHtml}</div></div>`;
    requestAnimationFrame(() => {
      const bgL = document.getElementById('ruck-bg-layer');
      if (bgL) bgL.classList.add('bg-fade-in');
    });
  }, 1000));
}

// ── Drag to close ─────────────────────────────────────────────────
function _ruckInitDrag() {
  const handle = $('rucksack-handle');
  const drawer = $('rucksack-drawer');
  let   startY = 0, startT = 0;

  handle.addEventListener('touchstart', e => {
    startY        = e.touches[0].clientY;
    startT        = Date.now();
    _ruckDragging = true;
    drawer.style.transition = 'none';
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!_ruckDragging) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 0) drawer.style.transform = `translateY(${dy}px)`;
  }, { passive: true });

  window.addEventListener('touchend', e => {
    if (!_ruckDragging) return;
    _ruckDragging = false;
    const dy  = e.changedTouches[0].clientY - startY;
    const vel = dy / Math.max(1, Date.now() - startT);
    drawer.style.transition = '';
    if (dy > 110 || vel > 0.55) {
      drawer.style.transform = '';
      closeRucksack();
    } else if (Math.abs(dy) < 10) {
      // Tap on handle → close
      drawer.style.transform = '';
      closeRucksack();
    } else {
      drawer.style.transform = '';
    }
  }, { passive: true });
}

// ── Card animations ───────────────────────────────────────────────
function _ruckCardPulse(id) {
  const el = $(id);
  el.classList.remove('inv-card-pulse');
  void el.offsetWidth;
  el.classList.add('inv-card-pulse');
  setTimeout(() => el.classList.remove('inv-card-pulse'), 420);
}

// ── Init ──────────────────────────────────────────────────────────
function initRucksack() {
  $('btn-rucksack').addEventListener('click', openRucksack);
  $('rucksack-overlay').addEventListener('click', closeRucksack);

  // Back buttons
  document.querySelectorAll('.rucksack-back-btn').forEach(btn => {
    btn.addEventListener('click', () => _ruckSetView('cards', true));
  });

  // Telescope card
  $('inv-card-telescope').addEventListener('click', () => {
    _ruckCardPulse('inv-card-telescope');
    setTimeout(() => _ruckSetView('telescope', true), 80);
  });

  // Questlog card — scroll-unroll animation on icon
  $('inv-card-questlog').addEventListener('click', () => {
    const icon = document.querySelector('#inv-card-questlog .inv-card-icon');
    icon.style.animation = 'none';
    void icon.offsetWidth;
    icon.style.animation = 'scroll-unroll 0.3s ease';
    setTimeout(() => { icon.style.animation = ''; }, 320);
    setTimeout(() => _ruckSetView('questlog', true), 80);
  });

  // Treasure card — chest open animation on icon
  $('inv-card-treasure').addEventListener('click', () => {
    const icon = document.querySelector('#inv-card-treasure .inv-card-icon-svg');
    icon.style.animation = 'none';
    void icon.offsetWidth;
    icon.style.animation = 'chest-open 0.4s ease';
    setTimeout(() => { icon.style.animation = ''; }, 420);
    setTimeout(() => _ruckSetView('treasure', true), 80);
  });

  // Starmap button within telescope area
  $('ruck-open-starmap').addEventListener('click', () => {
    closeRucksack();
    setTimeout(openStarMap, 400);
  });

  _ruckInitDrag();
}
