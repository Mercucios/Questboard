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

// === BUGFIX & UI UPDATE === PUNKT 2: Zufällige Belohnungen (lowercase keys)
const REWARDS = [
  'rubin', 'smaragd', 'saphir', 'amethyst', 'geode',
  'goldnugget', 'zaubertrank', 'drachenschuppe', 'phoenixfeder',
  'mondstein', 'krone', 'drachenzahn', 'goldmuenze',
  'schluessel', 'kristallkugel', 'zauberstab'
];
const REWARD_ICON_MAP = {
  'rubin': 'Rubin', 'smaragd': 'Smaragd', 'saphir': 'Saphir', 'amethyst': 'Amethyst',
  'geode': 'Geode', 'goldnugget': 'Goldnugget', 'zaubertrank': 'Zaubertrank',
  'drachenschuppe': 'Drachenschuppe', 'phoenixfeder': 'Phönixfeder',
  'mondstein': 'Mondstein', 'krone': 'Königskrone', 'drachenzahn': 'Drachenzahn',
  'goldmuenze': 'Goldmünze', 'schluessel': 'Schlüssel', 'kristallkugel': 'Kristallkugel',
  'zauberstab': 'Zauberstab'
};
function getRandomReward(questType) {
  if (questType === 'rast') return null;
  return REWARDS[Math.floor(Math.random() * REWARDS.length)];
}

// === VICTORY & REWARDS UPDATE === PUNKT 2: Stern-Reaktionen
const starReactions = [
  'Du leuchtest wie tausend Sterne!',
  'Unbezwingbar! Dein Drachen-Herz brennt!',
  'Du bist mächtiger als du weißt.',
  'Heute bist du eine Legende!',
  'Strahlend wie der Morgenstern!',
  'Kein Berg zu hoch für dich!',
  'Du erfüllst die Prophezeiung!',
  'Welch epischer Triumph!',
  'Deine Stärke ist grenzenlos!',
  'Der Himmel neigt sich vor dir!',
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
    'Rubin': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.65)"/></filter>
      <radialGradient id="${u}a" cx="30%" cy="20%" r="78%"><stop offset="0%" stop-color="#ff9aaa"/><stop offset="30%" stop-color="#e81e38"/><stop offset="65%" stop-color="#a00018"/><stop offset="100%" stop-color="#500008"/></radialGradient>
      </defs><polygon points="22,4 38,14 38,30 22,40 6,30 6,14" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <polygon points="22,4 32,10 28,20 16,20 12,10" fill="#ff6070" opacity="0.3"/>
      <polygon points="22,4 30,9 24,7" fill="#ffb0be" opacity="0.55"/>
      <ellipse cx="15" cy="13" rx="5.5" ry="3" fill="white" opacity="0.45" transform="rotate(-20 15 13)"/></svg>`,

    'Smaragd': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.65)"/></filter>
      <radialGradient id="${u}a" cx="30%" cy="20%" r="78%"><stop offset="0%" stop-color="#90ffaa"/><stop offset="30%" stop-color="#12a852"/><stop offset="65%" stop-color="#046830"/><stop offset="100%" stop-color="#012a10"/></radialGradient>
      </defs><polygon points="22,4 36,12 36,32 22,40 8,32 8,12" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <polygon points="22,4 33,10 30,22 14,22 11,10" fill="#50ff80" opacity="0.25"/>
      <polygon points="22,4 31,9 25,7" fill="#c0ffcc" opacity="0.5"/>
      <ellipse cx="15" cy="12" rx="5.5" ry="3" fill="white" opacity="0.42" transform="rotate(-15 15 12)"/></svg>`,

    'Saphir': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.65)"/></filter>
      <radialGradient id="${u}a" cx="30%" cy="20%" r="78%"><stop offset="0%" stop-color="#90d0ff"/><stop offset="30%" stop-color="#1848d8"/><stop offset="65%" stop-color="#0828a0"/><stop offset="100%" stop-color="#040e50"/></radialGradient>
      </defs><polygon points="22,3 40,16 34,38 10,38 4,16" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <polygon points="22,3 34,12 30,26 14,26 10,12" fill="#4090ff" opacity="0.25"/>
      <polygon points="22,3 32,10 26,7" fill="#c0e0ff" opacity="0.5"/>
      <ellipse cx="14" cy="14" rx="5.5" ry="3" fill="white" opacity="0.42" transform="rotate(-20 14 14)"/></svg>`,

    'Amethyst': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.65)"/></filter>
      <radialGradient id="${u}a" cx="30%" cy="20%" r="78%"><stop offset="0%" stop-color="#e8a0ff"/><stop offset="30%" stop-color="#7820c8"/><stop offset="65%" stop-color="#4a0890"/><stop offset="100%" stop-color="#1e0448"/></radialGradient>
      </defs><polygon points="22,4 37,13 37,31 22,40 7,31 7,13" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <polygon points="22,4 33,10 30,22 14,22 11,10" fill="#c060ff" opacity="0.25"/>
      <polygon points="22,4 31,9 25,7" fill="#ddb0ff" opacity="0.5"/>
      <ellipse cx="15" cy="12" rx="5.5" ry="3" fill="white" opacity="0.42" transform="rotate(-20 15 12)"/></svg>`,

    'Geode': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.7)"/></filter>
      <radialGradient id="${u}a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#c8a8ff" stop-opacity="0.95"/><stop offset="50%" stop-color="#5030a0"/><stop offset="100%" stop-color="#0a0420"/></radialGradient>
      <radialGradient id="${u}b" cx="35%" cy="25%" r="50%"><stop offset="0%" stop-color="rgba(220,190,255,0.6)"/><stop offset="100%" stop-color="rgba(220,190,255,0)"/></radialGradient>
      </defs><ellipse cx="22" cy="22" rx="20" ry="20" fill="#060214" stroke="#3a1878" stroke-width="1.2" filter="url(#${u}f)"/>
      <ellipse cx="22" cy="22" rx="15" ry="15" fill="#1e0c58" stroke="#7050c0" stroke-width="0.8"/>
      <ellipse cx="22" cy="22" rx="10" ry="10" fill="url(#${u}a)"/>
      <polygon points="22,14 26,20 22,26 18,20" fill="url(#${u}b)" stroke="#e0c0ff" stroke-width="0.6"/>
      <ellipse cx="16" cy="15" rx="4.5" ry="2.5" fill="white" opacity="0.4" transform="rotate(-30 16 15)"/></svg>`,

    'Goldnugget': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(60,30,0,0.7)"/></filter>
      <radialGradient id="${u}a" cx="32%" cy="22%" r="68%"><stop offset="0%" stop-color="#ffe898"/><stop offset="35%" stop-color="#d4a030"/><stop offset="70%" stop-color="#9a6808"/><stop offset="100%" stop-color="#4a2e00"/></radialGradient>
      </defs><ellipse cx="18" cy="20" rx="12" ry="10" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <ellipse cx="28" cy="26" rx="11" ry="9" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <ellipse cx="22" cy="15" rx="9" ry="8" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <ellipse cx="14" cy="16" rx="4.5" ry="2.5" fill="white" opacity="0.45" transform="rotate(-25 14 16)"/>
      <ellipse cx="24" cy="12" rx="3.5" ry="2" fill="white" opacity="0.35" transform="rotate(-15 24 12)"/></svg>`,

    'Zaubertrank': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2" flood-color="rgba(0,0,0,0.65)"/></filter>
      <radialGradient id="${u}a" cx="32%" cy="22%" r="68%"><stop offset="0%" stop-color="#a0e0ff"/><stop offset="35%" stop-color="#1870c8"/><stop offset="70%" stop-color="#0838a0"/><stop offset="100%" stop-color="#020e3c"/></radialGradient>
      </defs><rect x="18" y="5" width="8" height="7" rx="2" fill="#6a4212" stroke="#a06820" stroke-width="0.8"/>
      <path d="M16 12 Q12 20 12 28 Q12 38 22 38 Q32 38 32 28 Q32 20 28 12Z" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <path d="M16 12 Q12 20 12 28 Q12 38 22 38" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" fill="none"/>
      <ellipse cx="19" cy="25" rx="4.5" ry="3" fill="white" opacity="0.55"/>
      <circle cx="27" cy="30" r="2.5" fill="white" opacity="0.4"/>
      <ellipse cx="16" cy="18" rx="3" ry="1.5" fill="white" opacity="0.3" transform="rotate(-20 16 18)"/></svg>`,

    'Zauberstab': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.6)"/></filter>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#d090ff"/><stop offset="100%" stop-color="#3808a8"/></linearGradient>
      <radialGradient id="${u}b" cx="40%" cy="30%" r="55%"><stop offset="0%" stop-color="#ffffd0"/><stop offset="45%" stop-color="#f0c040"/><stop offset="100%" stop-color="#a06000"/></radialGradient>
      </defs><line x1="8" y1="36" x2="32" y2="12" stroke="url(#${u}a)" stroke-width="4" stroke-linecap="round" filter="url(#${u}f)"/>
      <polygon points="32,12 29,5 33,10 40,7 35,13 39,19 33,15 32,23 30,14 24,18" fill="url(#${u}b)" filter="url(#${u}f)"/>
      <line x1="29" y1="5" x2="40" y2="7" stroke="#ffe068" stroke-width="0.9" opacity="0.7"/>
      <line x1="37" y1="15" x2="39" y2="21" stroke="#ffe068" stroke-width="0.9" opacity="0.7"/>
      <ellipse cx="33" cy="10" rx="4" ry="2" fill="white" opacity="0.4" transform="rotate(-30 33 10)"/></svg>`,

    'Hexenkessel': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.7)"/></filter>
      <radialGradient id="${u}a" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#5a2890"/><stop offset="55%" stop-color="#1a0640"/><stop offset="100%" stop-color="#06020e"/></radialGradient>
      </defs><path d="M8 20 Q8 38 22 38 Q36 38 36 20 Q36 14 22 14 Q8 14 8 20Z" fill="url(#${u}a)" stroke="#9050d0" stroke-width="1.5" filter="url(#${u}f)"/>
      <ellipse cx="22" cy="20" rx="14" ry="6" fill="#200840"/>
      <path d="M14 20 Q17 17 22 21 Q26 17 30 20" fill="none" stroke="#80ff90" stroke-width="1.5" opacity="0.85"/>
      <path d="M17 20 Q19 14 22 18" fill="none" stroke="#c0ffb0" stroke-width="0.9" opacity="0.65"/>
      <line x1="8" y1="18" x2="2" y2="12" stroke="#7030a8" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="18" x2="42" y2="12" stroke="#7030a8" stroke-width="2" stroke-linecap="round"/>
      <rect x="6" y="36" width="32" height="5" rx="2.5" fill="#180430"/>
      <ellipse cx="14" cy="16" rx="4" ry="2" fill="white" opacity="0.2" transform="rotate(-15 14 16)"/></svg>`,

    'Kristallkugel': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.65)"/></filter>
      <radialGradient id="${u}a" cx="32%" cy="22%" r="70%"><stop offset="0%" stop-color="#b080f0"/><stop offset="35%" stop-color="#3010a0"/><stop offset="70%" stop-color="#140460"/><stop offset="100%" stop-color="#04010e"/></radialGradient>
      <radialGradient id="${u}b" cx="28%" cy="20%" r="45%"><stop offset="0%" stop-color="rgba(230,210,255,0.55)"/><stop offset="100%" stop-color="rgba(230,210,255,0)"/></radialGradient>
      </defs><circle cx="22" cy="20" r="18" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <circle cx="22" cy="20" r="18" fill="url(#${u}b)"/>
      <ellipse cx="22" cy="20" rx="14" ry="5.5" fill="none" stroke="#b070ff" stroke-width="0.7" opacity="0.4"/>
      <ellipse cx="22" cy="20" rx="5.5" ry="14" fill="none" stroke="#b070ff" stroke-width="0.7" opacity="0.4"/>
      <ellipse cx="15" cy="13" rx="6" ry="3" fill="white" opacity="0.45" transform="rotate(-25 15 13)"/>
      <rect x="14" y="37" width="16" height="5" rx="2.5" fill="#28104a"/></svg>`,

    'Zauberbuch': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2" flood-color="rgba(0,0,0,0.65)"/></filter>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#6a1e90"/><stop offset="100%" stop-color="#1a0430"/></linearGradient>
      </defs><rect x="8" y="6" width="28" height="34" rx="2.5" fill="url(#${u}a)" stroke="#9050c8" stroke-width="1" filter="url(#${u}f)"/>
      <rect x="8" y="6" width="6" height="34" rx="2.5" fill="#1c0438" stroke="#6030a0" stroke-width="0.5"/>
      <polygon points="25,13 27,20 25,27 23,20" fill="#f0c040" opacity="0.9" stroke="#ffd050" stroke-width="0.4"/>
      <circle cx="25" cy="20" r="2.5" fill="#ffe050" opacity="0.6"/>
      <line x1="15" y1="18" x2="34" y2="18" stroke="#d080ff" stroke-width="0.6" opacity="0.3"/>
      <line x1="15" y1="24" x2="34" y2="24" stroke="#d080ff" stroke-width="0.6" opacity="0.3"/>
      <ellipse cx="12" cy="10" rx="3" ry="1.5" fill="white" opacity="0.25" transform="rotate(-10 12 10)"/></svg>`,

    'Amulett': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2" flood-color="rgba(60,30,0,0.7)"/></filter>
      <radialGradient id="${u}a" cx="32%" cy="20%" r="68%"><stop offset="0%" stop-color="#ffe8a0"/><stop offset="35%" stop-color="#d4a030"/><stop offset="70%" stop-color="#9a6808"/><stop offset="100%" stop-color="#4a2c00"/></radialGradient>
      <radialGradient id="${u}b" cx="35%" cy="25%" r="60%"><stop offset="0%" stop-color="#f0a8ff"/><stop offset="55%" stop-color="#6818c8"/><stop offset="100%" stop-color="#20085a"/></radialGradient>
      </defs><polygon points="22,4 25,14 35,14 27,20 30,30 22,24 14,30 17,20 9,14 19,14" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <circle cx="22" cy="19" r="6.5" fill="url(#${u}b)" stroke="#d070ff" stroke-width="0.7"/>
      <ellipse cx="19" cy="16" rx="3" ry="1.8" fill="white" opacity="0.45"/>
      <ellipse cx="10" cy="11" rx="3.5" ry="2" fill="white" opacity="0.25" transform="rotate(-15 10 11)"/></svg>`,

    'Drachenschuppe': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.65)"/></filter>
      <radialGradient id="${u}a" cx="32%" cy="22%" r="68%"><stop offset="0%" stop-color="#80ffa0"/><stop offset="35%" stop-color="#0ea058"/><stop offset="70%" stop-color="#046030"/><stop offset="100%" stop-color="#011810"/></radialGradient>
      </defs><ellipse cx="22" cy="24" rx="16" ry="18" fill="url(#${u}a)" stroke="#1aaa58" stroke-width="1" filter="url(#${u}f)"/>
      <path d="M22 6 L18 16 L22 14 L26 16 Z" fill="#20c850" opacity="0.8"/>
      <line x1="22" y1="8" x2="22" y2="40" stroke="rgba(0,255,80,0.15)" stroke-width="2"/>
      <ellipse cx="15" cy="17" rx="5.5" ry="3" fill="white" opacity="0.35" transform="rotate(-10 15 17)"/></svg>`,

    'Ritterschild': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.65)"/></filter>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#3a40b0"/><stop offset="50%" stop-color="#1a1e6a"/><stop offset="100%" stop-color="#060830"/></linearGradient>
      </defs><path d="M6 6 L38 6 L38 26 Q38 40 22 42 Q6 40 6 26 Z" fill="url(#${u}a)" stroke="#d4b040" stroke-width="2" filter="url(#${u}f)"/>
      <line x1="22" y1="6" x2="22" y2="42" stroke="#d4b040" stroke-width="1.5"/>
      <line x1="6" y1="20" x2="38" y2="20" stroke="#d4b040" stroke-width="1.5"/>
      <polygon points="22,14 26,18 22,22 18,18" fill="#d4b040"/>
      <ellipse cx="13" cy="10" rx="5.5" ry="3" fill="white" opacity="0.25" transform="rotate(-20 13 10)"/></svg>`,

    'Königskrone': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(60,30,0,0.65)"/></filter>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe898"/><stop offset="45%" stop-color="#c89820"/><stop offset="100%" stop-color="#7a4e08"/></linearGradient>
      </defs><path d="M4 30 L4 14 L14 22 L22 8 L30 22 L40 14 L40 30 Z" fill="url(#${u}a)" stroke="#ffd050" stroke-width="1" filter="url(#${u}f)"/>
      <rect x="4" y="30" width="36" height="8" rx="2" fill="url(#${u}a)" stroke="#ffd050" stroke-width="1"/>
      <circle cx="14" cy="26" r="3.5" fill="#e02838" stroke="#ff8090" stroke-width="0.5"/>
      <circle cx="22" cy="26" r="3.5" fill="#2060ff" stroke="#80a8ff" stroke-width="0.5"/>
      <circle cx="30" cy="26" r="3.5" fill="#10a840" stroke="#60ff90" stroke-width="0.5"/>
      <ellipse cx="9" cy="16" rx="4" ry="2.2" fill="white" opacity="0.3" transform="rotate(-25 9 16)"/></svg>`,

    'Pergament': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2" flood-color="rgba(40,20,0,0.6)"/></filter>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0.1" y2="1"><stop offset="0%" stop-color="#e8d090"/><stop offset="50%" stop-color="#c8a848"/><stop offset="100%" stop-color="#9a7828"/></linearGradient>
      </defs><rect x="6" y="10" width="32" height="28" rx="1.5" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <ellipse cx="22" cy="10" rx="16" ry="4.5" fill="#b89050"/>
      <ellipse cx="22" cy="38" rx="16" ry="4.5" fill="#b89050"/>
      <line x1="11" y1="17" x2="33" y2="17" stroke="#7a5018" stroke-width="0.8" opacity="0.55"/>
      <line x1="11" y1="22" x2="33" y2="22" stroke="#7a5018" stroke-width="0.8" opacity="0.55"/>
      <line x1="11" y1="27" x2="33" y2="27" stroke="#7a5018" stroke-width="0.8" opacity="0.55"/>
      <line x1="11" y1="32" x2="26" y2="32" stroke="#7a5018" stroke-width="0.8" opacity="0.55"/>
      <ellipse cx="10" cy="13" rx="4" ry="2" fill="white" opacity="0.25" transform="rotate(-15 10 13)"/></svg>`,

    'Schlüssel': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(40,20,0,0.7)"/></filter>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffe898"/><stop offset="50%" stop-color="#c89820"/><stop offset="100%" stop-color="#7a4e08"/></linearGradient>
      </defs><circle cx="14" cy="14" r="9.5" fill="none" stroke="url(#${u}a)" stroke-width="4" filter="url(#${u}f)"/>
      <circle cx="14" cy="14" r="5" fill="none" stroke="url(#${u}a)" stroke-width="2"/>
      <line x1="21" y1="20" x2="38" y2="36" stroke="url(#${u}a)" stroke-width="4" stroke-linecap="round" filter="url(#${u}f)"/>
      <line x1="30" y1="30" x2="34" y2="26" stroke="url(#${u}a)" stroke-width="3" stroke-linecap="round"/>
      <line x1="34" y1="34" x2="38" y2="30" stroke="url(#${u}a)" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="10" cy="10" rx="4.5" ry="2.5" fill="white" opacity="0.4" transform="rotate(-30 10 10)"/></svg>`,

    'Drachenzahn': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2" flood-color="rgba(40,30,0,0.65)"/></filter>
      <linearGradient id="${u}a" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stop-color="#f4ecd8"/><stop offset="40%" stop-color="#d0b880"/><stop offset="75%" stop-color="#9a7848"/><stop offset="100%" stop-color="#5a4220"/></linearGradient>
      </defs><path d="M22 4 Q28 10 30 22 Q32 34 22 40 Q12 34 14 22 Q16 10 22 4Z" fill="url(#${u}a)" stroke="#a88850" stroke-width="1" filter="url(#${u}f)"/>
      <line x1="22" y1="6" x2="22" y2="38" stroke="rgba(255,255,220,0.3)" stroke-width="1.5"/>
      <ellipse cx="16" cy="14" rx="4.5" ry="2.5" fill="white" opacity="0.4" transform="rotate(-20 16 14)"/></svg>`,

    'Goldmünze': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(60,30,0,0.7)"/></filter>
      <radialGradient id="${u}a" cx="32%" cy="22%" r="68%"><stop offset="0%" stop-color="#fffab0"/><stop offset="30%" stop-color="#e4b030"/><stop offset="65%" stop-color="#a07010"/><stop offset="100%" stop-color="#503808"/></radialGradient>
      </defs><circle cx="22" cy="22" r="18" fill="url(#${u}a)" stroke="#c89030" stroke-width="1.5" filter="url(#${u}f)"/>
      <circle cx="22" cy="22" r="13" fill="none" stroke="#c89030" stroke-width="0.8" opacity="0.5"/>
      <text x="22" y="27" text-anchor="middle" font-size="13" fill="#8a5800" opacity="0.9">✦</text>
      <ellipse cx="14" cy="14" rx="6" ry="3.5" fill="white" opacity="0.4" transform="rotate(-30 14 14)"/></svg>`,

    'Feenstaub': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="rgba(200,140,255,0.5)"/></filter>
      <radialGradient id="${u}a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,0.95)"/><stop offset="40%" stop-color="rgba(245,200,80,0.5)"/><stop offset="100%" stop-color="rgba(245,200,80,0)"/></radialGradient>
      </defs><circle cx="22" cy="22" r="13" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <text x="10" y="15" font-size="9" fill="#f0c040">✦</text>
      <text x="30" y="13" font-size="7" fill="#c080ff">✧</text>
      <text x="35" y="27" font-size="8" fill="#80c0ff">✦</text>
      <text x="27" y="38" font-size="8" fill="#f0c040">✧</text>
      <text x="10" y="36" font-size="7" fill="#c080ff">✦</text>
      <text x="4" y="25" font-size="8" fill="#80c0ff">✧</text>
      <text x="18" y="9" font-size="6" fill="#f0e4c0">✦</text>
      <circle cx="22" cy="22" r="3.5" fill="white" opacity="0.95" filter="url(#${u}f)"/></svg>`,

    'Phönixfeder': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(80,0,0,0.65)"/></filter>
      <linearGradient id="${u}a" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stop-color="#ffe878"/><stop offset="35%" stop-color="#f06818"/><stop offset="70%" stop-color="#c02010"/><stop offset="100%" stop-color="#600008"/></linearGradient>
      </defs><path d="M22 4 Q30 10 34 18 Q38 26 32 32 Q28 36 22 38 Q18 36 16 32 Q12 26 14 18 Q16 10 22 4Z" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <line x1="22" y1="6" x2="22" y2="36" stroke="#ffe890" stroke-width="1.2" opacity="0.5"/>
      <line x1="22" y1="12" x2="14" y2="22" stroke="#ffe890" stroke-width="0.8" opacity="0.3"/>
      <line x1="22" y1="16" x2="30" y2="24" stroke="#ffe890" stroke-width="0.8" opacity="0.3"/>
      <ellipse cx="16" cy="11" rx="5" ry="2.5" fill="white" opacity="0.42" transform="rotate(-30 16 11)"/></svg>`,

    'Mondstein': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(20,20,60,0.65)"/></filter>
      <radialGradient id="${u}a" cx="32%" cy="22%" r="70%"><stop offset="0%" stop-color="#f4f4ff"/><stop offset="30%" stop-color="#c0c8e8"/><stop offset="65%" stop-color="#8088b8"/><stop offset="100%" stop-color="#404870"/></radialGradient>
      </defs><ellipse cx="22" cy="22" rx="17" ry="20" fill="url(#${u}a)" stroke="#a0a8c8" stroke-width="1" filter="url(#${u}f)"/>
      <ellipse cx="17" cy="16" rx="6" ry="3" fill="white" opacity="0.4"/>
      <ellipse cx="21" cy="28" rx="5" ry="2.5" fill="white" opacity="0.25"/>
      <ellipse cx="28" cy="20" rx="4" ry="2" fill="rgba(90,90,160,0.35)"/>
      <ellipse cx="13" cy="11" rx="4.5" ry="2.5" fill="white" opacity="0.45" transform="rotate(-15 13 11)"/></svg>`,

    'Drachenkristall': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(60,0,0,0.7)"/></filter>
      <radialGradient id="${u}a" cx="30%" cy="22%" r="70%"><stop offset="0%" stop-color="#ff90a0"/><stop offset="30%" stop-color="#d01030"/><stop offset="65%" stop-color="#880010"/><stop offset="100%" stop-color="#300006"/></radialGradient>
      </defs><polygon points="22,2 26,8 34,6 30,14 38,18 30,20 34,28 26,26 22,34 18,26 10,28 14,20 6,18 14,14 10,6 18,8" fill="url(#${u}a)" filter="url(#${u}f)"/>
      <circle cx="22" cy="18" r="5.5" fill="#ff2040" opacity="0.65"/>
      <ellipse cx="15" cy="10" rx="4.5" ry="2.5" fill="white" opacity="0.4" transform="rotate(-10 15 10)"/></svg>`,

    'Mystische Essenz': () => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><defs>
      <filter id="${u}f"><feDropShadow dx="1" dy="2" stdDeviation="3" flood-color="rgba(20,10,60,0.7)"/></filter>
      <radialGradient id="${u}a" cx="30%" cy="22%" r="68%"><stop offset="0%" stop-color="#a0c8ff"/><stop offset="30%" stop-color="#2038c0"/><stop offset="65%" stop-color="#0a16a0"/><stop offset="100%" stop-color="#020618"/></radialGradient>
      <radialGradient id="${u}b" cx="30%" cy="20%" r="45%"><stop offset="0%" stop-color="rgba(180,210,255,0.6)"/><stop offset="100%" stop-color="rgba(180,210,255,0)"/></radialGradient>
      </defs><ellipse cx="22" cy="27" rx="12" ry="14" fill="url(#${u}a)" stroke="#3858d8" stroke-width="1" filter="url(#${u}f)"/>
      <ellipse cx="22" cy="27" rx="12" ry="14" fill="url(#${u}b)"/>
      <path d="M18 13 Q18 9 22 7 Q26 9 26 13" fill="none" stroke="#4870e0" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="22" y1="7" x2="22" y2="13" stroke="#4870e0" stroke-width="1.4"/>
      <ellipse cx="15" cy="20" rx="5" ry="2.5" fill="white" opacity="0.38" transform="rotate(-15 15 20)"/></svg>`,
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

// === FIX: QUEST REMOVE ===
function _genQuestId() { return 'q_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7); }

function selectQuests(allQuests, mood) {
  const rhythm     = loadRhythm();
  const restQuests = allQuests.filter(q => q.rest);

  if (mood === 'nur-ueberleben') {
    const shown = shuffle(restQuests).slice(0, 2);
    const shownNames = new Set(shown.map(q => q.name));
    return {
      quests: shown.map(q => ({ ...q, done: false, id: _genQuestId() })), // === FIX: QUEST REMOVE ===
      pool:   restQuests.filter(q => !shownNames.has(q.name)).map(q => ({ ...q, done: false, id: _genQuestId() })),
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
    quests: allSelected.map(q => ({ ...q, done: false, id: _genQuestId() })), // === FIX: QUEST REMOVE ===
    pool:   pool.map(q => ({ ...q, done: false, id: _genQuestId() })),
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

// === MANA & QUEST UPDATE === P1/P2/P3/P4: Glasflasche, Layout, Mini-Phials
let _lastMiniBottleCount = -1;

// === VICTORY & REWARDS UPDATE === PUNKT 3+4: 6-Stufen-Mana + Blasen-Pause
function updateManaBottle(mana, maxMana) {
  const effectiveMax = maxMana || MAX_MANA;
  const pct = effectiveMax > 0 ? Math.max(0, Math.min(1, mana / effectiveMax)) : 0;
  const rect = document.getElementById('mana-fill-rect');
  if (rect) {
    rect.style.transform = `scaleY(${pct.toFixed(3)})`;

    let gradId, glow1, glow2, bubbleDur;
    if (pct >= 0.76) {
      gradId = 'mana-liq-s1'; glow1 = 'rgba(60,160,255,0.55)';  glow2 = 'rgba(80,200,255,0.4)';  bubbleDur = '2s';
    } else if (pct >= 0.51) {
      gradId = 'mana-liq-s2'; glow1 = 'rgba(30,120,230,0.45)';  glow2 = 'rgba(40,140,255,0.3)';  bubbleDur = '2.8s';
    } else if (pct >= 0.26) {
      gradId = 'mana-liq-s3'; glow1 = 'rgba(20,80,180,0.35)';   glow2 = 'rgba(30,90,200,0.25)';  bubbleDur = '4s';
    } else if (pct >= 0.11) {
      gradId = 'mana-liq-s4'; glow1 = 'rgba(30,40,160,0.4)';    glow2 = 'rgba(40,50,180,0.28)';  bubbleDur = '6s';
    } else if (pct > 0) {
      gradId = 'mana-liq-s5'; glow1 = 'rgba(60,20,140,0.45)';   glow2 = 'rgba(80,30,160,0.32)';  bubbleDur = '9s';
    } else {
      gradId = 'mana-liq-s6'; glow1 = '';                        glow2 = '';                       bubbleDur = null;
    }

    rect.style.fill = `url(#${gradId})`;

    // Bubble speed + pause at empty
    document.querySelectorAll('.mana-bubble').forEach(b => {
      if (bubbleDur) {
        b.style.animationPlayState = 'running';
        b.style.animationDuration  = bubbleDur;
      } else {
        b.style.animationPlayState = 'paused';
      }
    });

    // Outer glow
    const svg = document.getElementById('mana-bottle-svg');
    if (svg) {
      svg.style.filter = glow1
        ? `drop-shadow(0 4px 8px ${glow1}) drop-shadow(0 0 6px ${glow2})`
        : '';
    }

    // Wavy surface
    const surface = document.getElementById('mana-surface');
    if (surface) {
      const fy = Math.max(28, Math.min(72, 72 - 44 * pct));
      surface.setAttribute('d', `M6 ${fy.toFixed(1)} Q17 ${(fy - 3).toFixed(1)} 28 ${fy.toFixed(1)} Q39 ${(fy + 3).toFixed(1)} 50 ${fy.toFixed(1)}`);
    }
  }
  const textEl = document.getElementById('mana-text');
  if (textEl) textEl.textContent = `${mana} / ${effectiveMax}`;
  _updateMiniBottles(mana, effectiveMax);
}

// === MANA & QUEST UPDATE === P4: Mini-Phials für Extra-Mana
const _PHIAL_COLORS = ['#20c040', '#c4a030', '#e06010', '#c02020', '#8020c0'];

function _makeMinPhialSvg(color) {
  return `<svg width="12" height="32" viewBox="0 0 14 38" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<ellipse cx="7" cy="36" rx="5" ry="2" fill="rgba(0,0,0,0.2)"/>` +
    `<rect x="4" y="0" width="6" height="5" rx="2" fill="#c49030"/>` +
    `<rect x="2" y="4" width="10" height="30" rx="5" fill="${color}" opacity="0.9"/>` +
    `<ellipse cx="4.5" cy="15" rx="1.5" ry="5" fill="white" opacity="0.3"/>` +
    `</svg>`;
}

function _updateMiniBottles(mana, maxMana) {
  const extra = Math.max(0, mana - maxMana);
  const count = Math.min(5, Math.floor(extra / 10));
  const container = document.getElementById('mana-mini-bottles');
  if (!container || count === _lastMiniBottleCount) return;
  _lastMiniBottleCount = count;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const phial = document.createElement('div');
    phial.className = 'mana-mini-phial';
    phial.innerHTML = _makeMinPhialSvg(_PHIAL_COLORS[i] || _PHIAL_COLORS[4]);
    container.appendChild(phial);
    requestAnimationFrame(() => requestAnimationFrame(() => phial.classList.add('visible')));
    // === MANA & REMINDER UPDATE === PUNKT 5B: Long-Press (500ms) → Fläschchen entfernen
    let _phialPressTimer = null;
    phial.addEventListener('touchstart', e => {
      e.preventDefault();
      phial.classList.add('phial-wiggle');
      _phialPressTimer = setTimeout(() => {
        phial.classList.remove('phial-wiggle');
        phial.classList.add('phial-removing');
        const base = appState.maxMana || MAX_MANA;
        appState.mana = Math.max(base, appState.mana - 10);
        _lastMiniBottleCount = -1;
        saveDayState(appState);
        setTimeout(() => renderBoard(), 260);
      }, 500);
    }, { passive: false });
    const _cancelPhialPress = () => {
      clearTimeout(_phialPressTimer);
      phial.classList.remove('phial-wiggle');
    };
    phial.addEventListener('touchend',  _cancelPhialPress);
    phial.addEventListener('touchmove', _cancelPhialPress);
  }
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

// === KATEGORIE MODAL & SPIRALS === PUNKT 1: Kategorie-Modal Daten & Funktionen
// === STYLE UPDATE === PUNKT 1: rgba 20% bg + full-color border + light text
const CAT_MODAL_ITEMS = [
  { value: 'koerperpflege', name: 'Körperpflege', emoji: '💧', bg: 'rgba(64,128,255,0.2)',  borderColor: 'rgba(64,128,255,1)',  color: '#80b0ff' },
  { value: 'kueche',        name: 'Küche',         emoji: '🔥', bg: 'rgba(255,128,64,0.2)', borderColor: 'rgba(255,128,64,1)',  color: '#ffb080' },
  { value: 'ordnung',       name: 'Ordnung',       emoji: '✨', bg: 'rgba(64,208,208,0.2)', borderColor: 'rgba(64,208,208,1)',  color: '#80d8d8' },
  { value: 'waesche',       name: 'Wäsche',        emoji: '👕', bg: 'rgba(192,128,255,0.2)',borderColor: 'rgba(192,128,255,1)', color: '#c090ff' },
  { value: 'sport',         name: 'Sport',         emoji: '⚡', bg: 'rgba(255,96,96,0.2)',  borderColor: 'rgba(255,96,96,1)',   color: '#ff9090' },
  { value: 'arbeit',        name: 'Arbeit',        emoji: '💼', bg: 'rgba(212,160,48,0.2)', borderColor: 'rgba(212,160,48,1)',  color: '#d4b060' },
  { value: 'rast',          name: 'Rast',          emoji: '🌙', bg: 'rgba(64,128,192,0.2)', borderColor: 'rgba(64,128,192,1)',  color: '#80b0e0' },
  { value: 'ausflug',       name: 'Ausflug',       emoji: '🗺️', bg: 'rgba(128,192,64,0.2)', borderColor: 'rgba(128,192,64,1)', color: '#a0d080' },
  { value: 'soziales',      name: 'Soziales',      emoji: '👥', bg: 'rgba(255,128,192,0.2)',borderColor: 'rgba(255,128,192,1)', color: '#ff90c8' },
  { value: 'gesundheit',    name: 'Gesundheit',    emoji: '🏥', bg: 'rgba(128,208,128,0.2)',borderColor: 'rgba(128,208,128,1)', color: '#90d090' },
  { value: 'besorgung',     name: 'Besorgung',     emoji: '🛒', bg: 'rgba(212,192,80,0.2)', borderColor: 'rgba(212,192,80,1)',  color: '#d4c860' },
  { value: 'event',         name: 'Event',         emoji: '🎉', bg: 'rgba(255,204,0,0.2)',  borderColor: 'rgba(255,204,0,1)',   color: '#ffd840' },
  { value: 'notfall',       name: 'Notfall',       emoji: '🆘', bg: 'rgba(255,128,128,0.2)',borderColor: 'rgba(255,128,128,1)', color: '#ff9090' },
  { value: 'selbstfuersorge', name: 'Selbstfürsorge', emoji: '🌿', bg: 'rgba(160,208,160,0.2)', borderColor: 'rgba(160,208,160,1)', color: '#b0d8b0' },
];

function openCategoryModal() {
  const overlay = document.getElementById('catModalOverlay');
  if (overlay) overlay.classList.add('open');
}

function closeCategoryModal() {
  const overlay = document.getElementById('catModalOverlay');
  if (overlay) overlay.classList.remove('open');
}

// === TAG & RAST UPDATE === PUNKT 7: Drachen-Icon für Catze Hort
const CATZE_HORT_ICON = '<svg width="18" height="18" viewBox="0 0 36 32" style="overflow:visible;vertical-align:middle"><ellipse cx="16" cy="20" rx="8" ry="6" fill="#1a1a1a" stroke="#444" stroke-width="0.8"/><ellipse cx="24" cy="14" rx="5" ry="4" fill="#1a1a1a" stroke="#444" stroke-width="0.8"/><ellipse cx="28" cy="15" rx="3" ry="2" fill="#2a2a2a"/><circle cx="25" cy="12" r="1.5" fill="#ff4000"/><circle cx="25" cy="12" r="0.7" fill="#ff8000"/><path d="M10 18 C4 12 2 8 6 6 C8 10 10 14 12 16Z" fill="#222" stroke="#444" stroke-width="0.6"/><path d="M18 16 C20 10 24 8 26 10 C22 12 20 14 18 16Z" fill="#222" stroke="#444" stroke-width="0.6"/><path d="M8 22 C4 24 2 28 4 30 C6 28 8 26 10 24Z" fill="#1a1a1a"/><path d="M29 14 C32 12 34 10 32 8 C31 10 30 11 29 12 C31 8 30 5 28 6 C29 9 28 11 27 13Z" fill="#ff6000" opacity="0.9"/><path d="M30 13 C32 11 32 9 30 9 C31 10 30 12 29 13Z" fill="#ffcc00" opacity="0.8"/></svg>';

// === TAG & RAST UPDATE === PUNKT 6+7: Tag-Farben hell/dunkel, Drache für Catze Hort
// === STYLE UPDATE === PUNKT 1: rgba 20% bg + full-color border + light text
const TAG_CAT_STYLE = {
  'Körperpflege': { bg:'rgba(64,128,255,0.2)',  border:'rgba(64,128,255,1)',  text:'#80b0ff', emoji:'💧' },
  'Küche':        { bg:'rgba(255,128,64,0.2)',  border:'rgba(255,128,64,1)',  text:'#ffb080', emoji:'🔥' },
  'Ordnung':      { bg:'rgba(64,208,208,0.2)',  border:'rgba(64,208,208,1)',  text:'#80d8d8', emoji:'✨' },
  'Wäsche':       { bg:'rgba(192,128,255,0.2)', border:'rgba(192,128,255,1)', text:'#c090ff', emoji:'👕' },
  'Sport':        { bg:'rgba(255,96,96,0.2)',   border:'rgba(255,96,96,1)',   text:'#ff9090', emoji:'⚡' },
  'Arbeit':       { bg:'rgba(212,160,48,0.2)',  border:'rgba(212,160,48,1)',  text:'#d4b060', emoji:'💼' },
  'Outdoor':      { bg:'rgba(128,192,64,0.2)',  border:'rgba(128,192,64,1)',  text:'#a0d080', emoji:'🌿' },
  'WC':           { bg:'rgba(80,192,160,0.2)',  border:'rgba(80,192,160,1)',  text:'#50c0a0', emoji:'🚿' },
  'Schlafzimmer': { bg:'rgba(144,128,208,0.2)', border:'rgba(144,128,208,1)', text:'#a090d8', emoji:'🛏️' },
  'Vorraum':      { bg:'rgba(192,144,64,0.2)',  border:'rgba(192,144,64,1)',  text:'#c09040', emoji:'🚪' },
  'Wohnzimmer':   { bg:'rgba(192,128,64,0.2)',  border:'rgba(192,128,64,1)',  text:'#c08040', emoji:'🛋️' },
  'Bad':          { bg:'rgba(74,176,200,0.2)',  border:'rgba(74,176,200,1)',  text:'#4ab0c8', emoji:'🛁' },
  'Catze Hort':   { bg:'rgba(192,112,152,0.2)', border:'rgba(192,112,152,1)', text:'#c07098', icon: CATZE_HORT_ICON, emoji:'🐱' },
};

// === MANA & REMINDER UPDATE === PUNKT 4: Kompakt-Modus (nur Emoji, kein Text)
let _catTagCompact = false;

function makeQuestCard(q, mana) {
  const canAfford = q.mana === 0 || mana >= q.mana;
  const canSwap   = appState.pool.some(p => p.rest === q.rest);
  const card      = document.createElement('div');

  // === QUEST-BOARD UPDATE === P7/P12: data-category + difficulty class
  const diffCount = q.mana > 0
    ? (q.mana >= 10 ? Math.min(5, Math.ceil(q.mana / 10)) : Math.min(5, q.mana))
    : 0;
  // === RAST & FORMULAR UPDATE === PUNKT 5: rast-quest Klasse für Sternenhimmel
  card.className       = `quest-card${q.rest ? ' rest-card rast-quest' : ''}${diffCount > 0 ? ` difficulty-${diffCount}` : ''}`;
  card.dataset.name     = q.name;
  card.dataset.category = q.category || '';
  card.dataset.questId  = q.id || q.name; // === FIX: QUEST REMOVE ===

  // === MANA-SYSTEM ===
  // === QUEST-BOARD UPDATE === P8: 🌙 Rast statt "Rast"
  const costHtml = q.mana > 0
    ? `<span class="quest-cost-runes">${manaSymbols(q.mana)}</span>`
    : `<span class="quest-rest-tag">🌙 Rast</span>`;

  // === FIX: TAGS & FARBEN === PUNKT 2: Nur Tag-Badge, kein Kategorie-Text
  let catHtml = '';
  if (!q.rest) {
    const tagStyle = TAG_CAT_STYLE[q.category];
    if (tagStyle) {
      catHtml = `<span class="quest-cat-tag" style="background:${tagStyle.bg};color:${tagStyle.text};border:1.5px solid ${tagStyle.border}" title="${q.category}">${tagStyle.icon || tagStyle.emoji} ${q.category}</span>`;
    }
  }

  const checkSvg = `<svg width="22" height="22" viewBox="0 0 28 28"><path d="M5 14 L11 21 L23 8" fill="none" stroke="#f0c040" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  // === QUEST-BOARD UPDATE === P6: SVG-Pfeil statt ⇄
  const swapSvg  = `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#c0a0f0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h14M14 4l3 3-3 3M17 13H3M6 10l-3 3 3 3"/></svg>`;

  card.innerHTML = `
    <div class="quest-info">
      <div class="quest-name">${q.name}</div>
      <div class="quest-meta">
        ${catHtml}
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
  const incoming = { ...pick.q, done: false, id: _genQuestId() }; // === FIX: QUEST REMOVE ===
  const outgoing = appState.quests[idx];

  appState.pool.splice(pick.i, 1);
  appState.pool.push({ ...outgoing });
  appState.quests[idx] = incoming;

  saveDayState(appState);
  renderBoard();
}

// === FIX: QUEST COMPLETE FLOW ===
function completeQuest(name) {
  // FIX 1: Mana-Guard VOR allem anderen – Quest suchen und Mana prüfen
  const quest = appState.quests.find(q => q.name === name && !q.done);
  if (!quest) return;
  if (quest.mana > 0 && appState.mana < quest.mana) return;

  // A) Doppel-Tipp verhindern – Button sofort sperren
  const btn = document.querySelector(`#quest-list .quest-card[data-name="${CSS.escape(name)}"] .quest-complete-btn`);
  if (btn && btn.disabled) return;
  if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; btn.style.pointerEvents = 'none'; }

  if (quest.rest) { showRestManaPopup(quest); return; }

  // B) Mana SOFORT abziehen
  appState.mana = Math.max(0, appState.mana - quest.mana);
  updateManaBottle(appState.mana, appState.maxMana || MAX_MANA);
  renderBoard(); // FIX 2: alle Button-Zustände sofort aktualisieren

  const reward = getRandomReward('quest');
  // questObj-Snapshot mitgeben – wird gebraucht nachdem Quest aus Array entfernt wurde
  _pendingCompletion = { type: 'quest', id: name, questTitle: name, reward, questObj: { ...quest } };

  // C) Quest aus Daten SOFORT entfernen (bevor Victory-Screen erscheint)
  removeQuestFromData(quest.id || quest.name);
  saveDayState(appState);

  // D) DOM-Animation sofort starten
  const cardEl = document.querySelector(`#quest-list .quest-card[data-name="${CSS.escape(name)}"]`);
  if (cardEl) {
    cardEl.classList.add('quest-card--completing');
    const _rect = cardEl.getBoundingClientRect();
    const _star = document.createElement('div');
    _star.className  = 'shooting-star-fx';
    _star.style.left = (_rect.left + _rect.width  / 2) + 'px';
    _star.style.top  = (_rect.top  + _rect.height / 2) + 'px';
    document.body.appendChild(_star);
    requestAnimationFrame(() => requestAnimationFrame(() => _star.classList.add('shooting-star-fx--go')));
    setTimeout(() => _star.remove(), 800);
    cardEl.classList.add('shooting-star-exit');
    setTimeout(() => { if (cardEl.parentNode) cardEl.remove(); }, 600);
  }

  // E) Victory-Screen zeigen
  setTimeout(() => showVictoryScreen(quest, reward), 600);
}

function showVictoryScreen(quest, reward) {
  const vs = document.getElementById('victory-screen');
  if (!vs) { openLogPopup(quest.name, quest.name); return; }

  // === BUGFIX & UI UPDATE === PUNKT 2: reward ist jetzt ein String (lowercase key)
  const _rewardDisplayName = (reward && REWARD_ICON_MAP[reward]) || reward || '???';
  document.getElementById('victory-quest-name').textContent  = quest.name;
  document.getElementById('victory-reward-name').textContent = _rewardDisplayName;
  document.getElementById('victory-reward-icon').innerHTML   = _ruckTreasureIcon(_rewardDisplayName, 72);

  // Confetti
  const wrap   = document.getElementById('victory-confetti-wrap');
  wrap.innerHTML = '';
  const colors = ['#f0c040','#ff4060','#40c0ff','#80ff60','#c060ff','#ff8020','#ffffff'];
  const total  = 30 + Math.floor(Math.random() * 11);
  for (let i = 0; i < total; i++) {
    const c = document.createElement('div');
    c.className = 'victory-confetti';
    c.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};--cf-dur:${(1.5+Math.random()*2).toFixed(2)}s;--cf-delay:${(Math.random()*0.9).toFixed(2)}s;--cf-rot:${Math.round((Math.random()-0.5)*720)}deg`;
    wrap.appendChild(c);
  }

  // Show + trigger animations
  vs.classList.add('active');
  vs.querySelectorAll('.victory-banner, .victory-trumpet').forEach(el => el.classList.add('anim'));

  // === FIX: QUEST COMPLETE === C) { once: true } + manuelle Cleanup verhindert Doppel-Listener
  const onTap = (e) => {
    e.stopPropagation();
    vs.classList.remove('active');
    vs.querySelectorAll('.victory-banner, .victory-trumpet').forEach(el => el.classList.remove('anim'));
    wrap.innerHTML = '';
    vs.removeEventListener('click',    onTap);
    vs.removeEventListener('touchend', onTap);
    openLogPopup(quest.name, quest.name);
  };
  vs.addEventListener('click',    onTap, { once: true });
  vs.addEventListener('touchend', onTap, { once: true });
}

// === FIX: QUEST COMPLETE FLOW === questObj übergeben, da Quest bereits aus appState.quests entfernt
function _finalizeQuestCompletion(name, preReward, questObj) {
  const quest = questObj || appState.quests.find(q => q.name === name);
  if (!quest) return;

  let treasure;
  if (preReward && typeof preReward === 'string') {
    treasure = { name: REWARD_ICON_MAP[preReward] || preReward };
  } else if (preReward && typeof preReward === 'object') {
    treasure = preReward;
  } else {
    treasure = TREASURE_ITEMS[Math.floor(Math.random() * TREASURE_ITEMS.length)];
  }

  if (quest.rest) {
    if (!appState.maxMana) appState.maxMana = MAX_MANA;
    appState.maxMana = Math.min(appState.maxMana + 10, 80);
    appState.mana    = Math.min(appState.mana + 10, appState.maxMana);
  }
  updateManaBottle(appState.mana, appState.maxMana || MAX_MANA);

  if (!quest.rest) {
    const rhythm = loadRhythm();
    markRhythmDone(quest.name, rhythm);
    saveRhythm(rhythm);
  }

  rucksackRecordTreasure(quest.name, treasure, 'quest');

  appState.completedCount = (appState.completedCount || 0) + 1;
  saveDayState(appState);
  renderBoard();
  setTimeout(() => checkAndShowDayRating(), 1500);
  if ((appState.completedCount || 0) >= 2 && !appState.starAwarded) setTimeout(awardStar, 1800);
}

// === FIX: QUEST REMOVE ===
function removeQuest(questId, onDone) {
  console.log('questId:', questId, 'in array:', appState.quests.map(q => q.id));

  const element = document.querySelector(`[data-quest-id="${CSS.escape(questId)}"]`);
  if (!element) {
    appState.quests = appState.quests.filter(q => q.id !== questId);
    saveDayState(appState);
    renderBoard();
    if (onDone) onDone();
    return;
  }

  const _rect = element.getBoundingClientRect();
  const _star = document.createElement('div');
  _star.className  = 'shooting-star-fx';
  _star.style.left = (_rect.left + _rect.width  / 2) + 'px';
  _star.style.top  = (_rect.top  + _rect.height / 2) + 'px';
  document.body.appendChild(_star);
  requestAnimationFrame(() => requestAnimationFrame(() => _star.classList.add('shooting-star-fx--go')));
  setTimeout(() => _star.remove(), 800);

  element.classList.add('shooting-star-exit');

  let _done = false;
  const _finish = () => {
    if (_done) return;
    _done = true;
    appState.quests = appState.quests.filter(q => q.id !== questId);
    saveDayState(appState);
    if (element.parentNode) element.remove();
    renderBoard();
    if (onDone) onDone();
  };

  element.addEventListener('animationend', _finish, { once: true });
  setTimeout(() => {
    if (element.parentNode) _finish();
  }, 1000);
}

// === FIX: QUEST COMPLETE FLOW === Entfernt Quest-Daten aus localStorage (normale Quests + Sidequests)
function removeQuestFromData(questId) {
  const id = String(questId);
  // Normale Quests (qb_state via appState.quests)
  if (appState) {
    const before = appState.quests.length;
    appState.quests = appState.quests.filter(q => String(q.id) !== id && String(q.name) !== id);
    console.log('Removed from quests:', before - appState.quests.length);
    if (appState.quests.length !== before) saveDayState(appState);
  }
  // Sidequests (questboard_sidequests)
  try {
    const all      = JSON.parse(localStorage.getItem(STORE_SIDEQUESTS)) || [];
    const filtered = all.filter(sq => String(sq.id) !== id);
    console.log('Removed from sidequests:', all.length - filtered.length);
    if (filtered.length !== all.length)
      localStorage.setItem(STORE_SIDEQUESTS, JSON.stringify(filtered));
  } catch {}
}

// === FIX: QUEST COMPLETE FLOW === Verwaiste Sidequests beim App-Start bereinigen
function cleanupOrphanedQuests() {
  try {
    const all   = JSON.parse(localStorage.getItem(STORE_SIDEQUESTS)) || [];
    const today = todayStr();
    const filtered = all.filter(q => {
      if (!q || !q.id || !q.title) return false;
      if (!q.date) return false;
      if (q.done && q.date !== today) return false;
      return true;
    });
    if (filtered.length !== all.length) {
      localStorage.setItem(STORE_SIDEQUESTS, JSON.stringify(filtered));
      console.log('cleanupOrphanedQuests: removed', all.length - filtered.length, 'orphaned sidequests');
    }
  } catch {}
}

// === TAG & RAST UPDATE === PUNKT 8: Rast-Mana Popup
function showRestManaPopup(quest) {
  _pendingCompletion = { type: 'rest-quest', id: quest.name, questTitle: quest.name };
  $('popup-rest-mana').classList.remove('hidden');
}

function _finalizeRestQuestCompletion(name, manaGain) {
  const quest = appState.quests.find(q => q.name === name && !q.done);
  if (!quest) return;

  quest.done     = true;
  quest.treasure = TREASURE_ITEMS[Math.floor(Math.random() * TREASURE_ITEMS.length)];

  if (!appState.maxMana) appState.maxMana = MAX_MANA;
  appState.maxMana = Math.min(appState.maxMana + manaGain, 80);
  appState.mana    = Math.min(appState.mana + manaGain, appState.maxMana);

  $('popup-rest-mana').classList.add('hidden');

  // Shooting-star animation
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

  _lastMiniBottleCount = -1;
  saveDayState(appState);
  renderBoard();
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
  // === VICTORY & REWARDS UPDATE === PUNKT 2: Zufällige Reaktion + Stern-Animation
  $('star-msg').textContent = starReactions[Math.floor(Math.random() * starReactions.length)];
  const popupStar = $('popup-star');
  popupStar.classList.remove('hidden');
  popupStar.classList.remove('active-star');
  requestAnimationFrame(() => requestAnimationFrame(() => popupStar.classList.add('active-star')));
}

function getConstellationInfo(starCount) {
  let cumulative = 0;
  for (let i = 0; i < CONSTELLATIONS.length; i++) {
    const c = CONSTELLATIONS[i];
    if (starCount < cumulative + c.starsNeeded) {
      console.log('[Teleskop] Abgeschlossene Sternbilder:', i, '| Sterne:', starCount, '| Verdient in aktuellem:', starCount - cumulative, '/', c.starsNeeded);
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
  // === STERNENKARTE UPDATE === PUNKT 4B: CSS-Twinkle-Sterne injizieren
  _injectStarmapStars();
  startStarMapAnimation(loadStars().length);
}

// === STERNENKARTE UPDATE === PUNKT 4B: 40-60 CSS-animierte Twinkle-Sterne
function _injectStarmapStars() {
  const starmap = $('popup-starmap');
  starmap.querySelectorAll('.starmap-twinkle-star').forEach(s => s.remove());
  const count = 40 + Math.floor(Math.random() * 21);
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'starmap-twinkle-star';
    const sz = (1 + Math.random() * 1.5).toFixed(1);
    s.style.cssText = [
      `left:${(Math.random() * 100).toFixed(1)}%`,
      `top:${(Math.random() * 100).toFixed(1)}%`,
      `width:${sz}px`,
      `height:${sz}px`,
      `animation-duration:${(2 + Math.random() * 3).toFixed(2)}s`,
      `animation-delay:${(Math.random() * 4).toFixed(2)}s`,
    ].join(';');
    starmap.appendChild(s);
  }
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
    ctx.lineWidth = 1.5; ctx.setLineDash([]);
    for (let li = 0; li < c.lines.length; li++) {
      const ls = li * LINE_DUR;
      if (pe < ls) break;
      const prog = Math.min(1, (pe - ls) / LINE_DUR);
      const [ai, bi] = c.lines[li];
      const a = cStars[ai], b = cStars[bi];
      const ax = Math.round(a.x) + 0.5, ay = Math.round(a.y) + 0.5;
      const bx = Math.round(b.x) + 0.5, by = Math.round(b.y) + 0.5;
      ctx.strokeStyle = 'rgba(210,230,255,0.55)';
      ctx.beginPath(); ctx.moveTo(ax, ay);
      ctx.lineTo(ax + (bx - ax) * prog, ay + (by - ay) * prog);
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

// === BUGFIX & UI UPDATE === PUNKT 7B: Tages-Zitat & Wetter-Stimmung für Inventar
const DAILY_QUOTES = [
  'Jeder Schritt vorwärts zählt, egal wie klein.',
  'Du bist tapferer als du glaubst.',
  'Ruhe ist auch eine Form der Stärke.',
  'Kein Berg ist zu hoch, wenn du einen Schritt nach dem anderen gehst.',
  'Du verdienst Fürsorge – auch von dir selbst.',
  'Kleines Licht, große Wirkung. Das bist du.',
  'Der heutige Tag gehört dir.',
  'Atme. Du schaffst das.',
  'Selbst die Sterne brauchen die Nacht.',
  'Dein Drachen-Herz leuchtet.',
  'Alles, was du heute schaffst, ist genug.',
  'Du bist nicht allein auf diesem Weg.',
  'Manchmal ist Pause das Mutigste.',
  'Deine Stärke wächst mit jedem Tag.',
  'Sei sanft mit dir – du kämpfst täglich.',
];
const MOON_EMOTES = ['🌕','🌙','🔮','🌟','⚗️','🦉','🌿','🕯️','🌑','✨','🧿','🌒','🌛','🍄','🦇'];
function getDailyQuote() {
  const idx = Math.floor(Date.now() / 86400000) % DAILY_QUOTES.length;
  return DAILY_QUOTES[idx];
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  cleanupOrphanedQuests(); // === FIX: QUEST COMPLETE FLOW ===
  initSkyCanvas();

  const dateStr = new Date().toLocaleDateString('de-AT', {
    timeZone: 'Europe/Vienna', weekday: 'long', day: 'numeric', month: 'long',
  });
  $('date-display').innerHTML = `<span>${dateStr}</span>${getDailySymbol()}`;

  // Mondlicht-Prophezeiung befüllen
  const _moonEmote = $('moon-prophecy-emote');
  if (_moonEmote) _moonEmote.textContent = MOON_EMOTES[new Date().getDate() % MOON_EMOTES.length];
  const _moonQuote = $('moon-prophecy-quote');
  if (_moonQuote) _moonQuote.textContent = getDailyQuote();

  const allQuests = QUESTS_DATA;
  const saved     = loadDayState();

  if (saved) {
    appState = saved;
    // === MANA-SYSTEM === backward compat
    if (!appState.maxMana) appState.maxMana = MAX_MANA;
    appState.maxMana = Math.min(appState.maxMana, 80);
    appState.mana    = Math.min(appState.mana, 80);
    // === FIX: QUEST REMOVE === backward compat: IDs + completedCount
    if (!appState.completedCount) appState.completedCount = appState.quests.filter(q => q.done).length;
    appState.quests.forEach(q => { if (!q.id) q.id = _genQuestId(); });
    if (appState.pool) appState.pool.forEach(q => { if (!q.id) q.id = _genQuestId(); });
    if (!appState.pool || appState.pool.length === 0) {
      const shownNames = new Set(appState.quests.map(q => q.name));
      appState.pool = QUESTS_DATA.filter(q => !shownNames.has(q.name)).map(q => ({ ...q, done: false }));
    }
    $('mood-badge').textContent = `${MOOD_GLYPH[saved.mood]} ${MOOD_LABEL[saved.mood]}`;
    renderBoard();
    showScreen('screen-board');
    if (appState.dayRatingDismissedAt) _dayRatingDismissedAt = appState.dayRatingDismissedAt;
    setTimeout(checkAndShowDayRating, 800);
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
      });
    });
  }

  $('btn-reward-close').addEventListener('click', () => $('popup-reward').classList.add('hidden'));
  $('btn-star-close').addEventListener('click', () => {
    $('popup-star').classList.add('hidden');
    openStarMap();
  });

  // === TAG & RAST UPDATE === PUNKT 8: Rast-Mana Gain Buttons
  document.querySelectorAll('.rest-mana-gain-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const gain = parseInt(btn.dataset.gain, 10);
      if (_pendingCompletion?.type === 'rest-quest') {
        _finalizeRestQuestCompletion(_pendingCompletion.id, gain);
      }
    });
  });
  $('btn-starmap-close').addEventListener('click', () => {
    if (starMapAnimFrame) { cancelAnimationFrame(starMapAnimFrame); starMapAnimFrame = null; }
    $('popup-starmap').classList.add('hidden');
    openRucksack();
    _ruckSetView('telescope', false);
  });
  $('btn-reset').addEventListener('click', () => {
    localStorage.removeItem(STORE_STATE);
    location.reload();
  });

  document.querySelectorAll('.overlay').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el) {
        if (el.id === 'popup-quest-log') return; // mandatory: must save rating before closing
        if (el.id === 'popup-starmap' && starMapAnimFrame) {
          cancelAnimationFrame(starMapAnimFrame); starMapAnimFrame = null;
        }
        if (el.id === 'popup-day-rating') {
          _dayRatingDismissedAt = Date.now();
          if (appState) { appState.dayRatingDismissedAt = _dayRatingDismissedAt; saveDayState(appState); }
          el.querySelectorAll('.popup-abs-rune').forEach(r => r.remove());
        }
        el.classList.add('hidden');
        if (el.id === 'popup-starmap') {
          openRucksack();
          _ruckSetView('telescope', false);
        }
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

  // === MANA & QUEST UPDATE === P3: Mana Top-Up
  _initManaTopUp();

  // === MANA & REMINDER UPDATE === PUNKT 4: Klick auf Kategorie-Badge → Kompakt-Toggle
  document.getElementById('quest-list')?.addEventListener('click', e => {
    if (e.target.closest('.quest-cat-tag')) {
      _catTagCompact = !_catTagCompact;
      renderBoard();
    }
  });

  // === MANA & REMINDER UPDATE === PUNKT 2B: Notification-Erlaubnis + Tages-Reminder
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
  scheduleDailyReminder();

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

// === MANA & REMINDER UPDATE === PUNKT 2B: Minuten für 21:30-Check
function getViennaMinute() {
  const parts = new Intl.DateTimeFormat('de-AT', {
    timeZone: 'Europe/Vienna', hour: 'numeric', minute: 'numeric', hour12: false,
  }).formatToParts(new Date());
  return parseInt(parts.find(p => p.type === 'minute')?.value ?? '0', 10);
}

// === MANA & REMINDER UPDATE === PUNKT 2B: Tages-Push-Reminder um 21:30
function scheduleDailyReminder() {
  if (!('Notification' in window)) return;
  const now    = new Date();
  const target = new Date();
  target.setHours(21, 30, 0, 0);
  if (now >= target) return;
  const delay = target - now;
  setTimeout(() => {
    if (Notification.permission === 'granted' && !getTodayDayRating()) {
      new Notification('Questboard ✦', { body: 'Zeit für deine Tagesbewertung!', icon: './icon.svg' });
    }
  }, delay);
}

function showDayRatingPopup() {
  if (!appState) return;
  if (!$('popup-day-rating').classList.contains('hidden')) return;

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

  // Inject decorative runes around popup edges
  const _drPopup = document.querySelector('#popup-day-rating .day-rating-popup');
  if (_drPopup) {
    _drPopup.querySelectorAll('.popup-abs-rune').forEach(r => r.remove());
    const RUNES = 'ᚱᚢᚾᛖᚾᚠᚨᚷᛁᛉᛊᛏᛒᛗᛚ';
    const DR_POS = [
      // top edge
      ['5%',  null,  '8%',  null,  '1.1rem', '10s', '0s'  ],
      ['5%',  null,  '30%', null,  '0.9rem', '13s', '1.5s'],
      ['5%',  null,  '55%', null,  '1.3rem', '14s', '3s'  ],
      ['5%',  null,  '78%', null,  '1.0rem', '9s',  '5s'  ],
      // bottom edge
      [null,  '5%',  '12%', null,  '1.4rem', '12s', '2s'  ],
      [null,  '5%',  '38%', null,  '0.9rem', '8s',  '4s'  ],
      [null,  '5%',  '62%', null,  '1.2rem', '11s', '1s'  ],
      [null,  '5%',  '85%', null,  '1.3rem', '15s', '6s'  ],
      // left edge
      ['22%', null,  '3%',  null,  '1.0rem', '9s',  '0.5s'],
      ['42%', null,  '3%',  null,  '1.5rem', '16s', '3.5s'],
      ['62%', null,  '3%',  null,  '0.9rem', '11s', '7s'  ],
      ['78%', null,  '3%',  null,  '1.1rem', '8s',  '2.5s'],
      // right edge
      ['18%', null,  null,  '3%',  '1.3rem', '12s', '4.5s'],
      ['38%', null,  null,  '3%',  '1.6rem', '14s', '1s'  ],
      ['58%', null,  null,  '3%',  '0.9rem', '9s',  '5.5s'],
      ['75%', null,  null,  '3%',  '1.2rem', '13s', '8s'  ],
    ];
    DR_POS.forEach(([top, bot, left, right, size, dur, delay], i) => {
      const s = document.createElement('span');
      s.className = 'popup-abs-rune';
      let style = `font-size:${size};animation:runeOpacity ${dur} ease-in-out ${delay} infinite;animation-fill-mode:none;color:rgba(240,192,64,0.18);`;
      if (top)   style += `top:${top};`;
      if (bot)   style += `bottom:${bot};`;
      if (left)  style += `left:${left};`;
      if (right) style += `right:${right};`;
      s.style.cssText = style;
      s.textContent   = RUNES[i % RUNES.length];
      _drPopup.appendChild(s);
    });
  }

  $('popup-day-rating').classList.remove('hidden');
}

function checkAndShowDayRating() {
  if (!appState) return;
  if (getTodayDayRating()) return;
  if (_dayRatingDismissedAt) {
    const minSince = (Date.now() - _dayRatingDismissedAt) / 60000;
    if (minSince < 30) return;
  }
  const h = getViennaHour(), m = getViennaMinute();
  const afterHalfNine = h > 21 || (h === 21 && m >= 30);
  const allActionQuestsDone = appState.quests &&
    appState.quests.filter(q => !q.rest).length === 0 &&
    (appState.completedCount || 0) > 0;
  if (afterHalfNine || allActionQuestsDone) showDayRatingPopup();
}

function initDayRatingPopup() {
  document.querySelectorAll('.day-rating-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-rating-opt-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      $('btn-day-rating-save').disabled = false;
    });
  });

  const _drDoSave = () => {
    const selected = document.querySelector('.day-rating-opt-btn.selected');
    if (!selected) return;
    const autoRated = $('popup-day-rating').dataset.autoRated === '1';
    saveDayRating({
      date:      todayStr(),
      rating:    selected.dataset.rating,
      apUsed:    (appState?.maxMana ?? MAX_MANA) - (appState?.mana ?? MAX_MANA),
      autoRated,
    });
    $('popup-day-rating').querySelectorAll('.popup-abs-rune').forEach(r => r.remove());
    $('popup-day-rating').classList.add('hidden');
  };

  const _saveBtn = $('btn-day-rating-save');
  _saveBtn.addEventListener('click', _drDoSave);
  _saveBtn.addEventListener('touchend', e => { e.preventDefault(); _drDoSave(); });

  $('btn-day-rating-skip').addEventListener('click', () => {
    _dayRatingDismissedAt = Date.now();
    if (appState) { appState.dayRatingDismissedAt = _dayRatingDismissedAt; saveDayState(appState); }
    $('popup-day-rating').querySelectorAll('.popup-abs-rune').forEach(r => r.remove());
    $('popup-day-rating').classList.add('hidden');
  });
}

// ═══════════════════════════════════════════════════════════════════
// === FEATURE 2: Spontane Sidequests ================================
// ═══════════════════════════════════════════════════════════════════

// === SIDEQUEST & MANA UPDATE === PUNKT 4: Kategorie-Emoji-Map
const SQ_CAT_EMOJIS = {
  koerperpflege: '💧', kueche: '🔥', ordnung: '✨', waesche: '👕',
  sport: '⚡', arbeit: '💼', rast: '🌙', ausflug: '🗺️',
  soziales: '👥', gesundheit: '🏥', besorgung: '🛒',
  event: '🎉', notfall: '🆘', selbstfuersorge: '🌿',
};

const STORE_SIDEQUESTS = 'questboard_sidequests';

function loadTodaySidequests() {
  try {
    const today = todayStr();
    return (JSON.parse(localStorage.getItem(STORE_SIDEQUESTS)) || [])
      .filter(sq => sq.date === today && !sq.done);
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
  card.className    = `sidequest-card${sq.done ? ' sidequest-done' : ''}`;
  card.dataset.sqId = sq.id; // === FIX: QUEST REMOVE ===

  // === MANA-SYSTEM ===
  const costHtml = sq.mana > 0 ? manaSymbols(sq.mana) : '';
  const canAfford = appState.mana >= (sq.mana || 0);

  const log       = getTodayLog(sq.id);
  const sqCheckSvg   = `<svg width="22" height="22" viewBox="0 0 28 28"><path d="M5 14 L11 21 L23 8" fill="none" stroke="#f0c040" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const sqMinusSvg   = `<svg width="22" height="22" viewBox="0 0 28 28"><path d="M7 14 H21" fill="none" stroke="#606060" stroke-width="3" stroke-linecap="round"/></svg>`;
  const actionHtml = sq.done
    ? `<div class="quest-done-mark">
        ${log
          ? `<button class="log-view-btn" aria-label="Log ansehen" title="Quest-Log ansehen">📜</button>`
          : '✓'}
       </div>`
    : `<div class="quest-actions">
        <button class="quest-complete-btn${canAfford ? '' : ' cant-afford'}"${canAfford ? '' : ' disabled'} aria-label="${sq.title} abschließen">${canAfford ? sqCheckSvg : sqMinusSvg}</button>
       </div>`;

  card.innerHTML = `
    <span class="sq-lightning-badge">💫 Sidequest</span>
    <span class="sq-cat-emoji">${sq.emoji}</span>
    <div class="quest-info">
      <div class="quest-name">${sq.title}</div>
      <div class="quest-meta">
        <span class="quest-cost">${costHtml}</span>
        ${sq.description ? `<span class="quest-category">${sq.description}</span>` : ''}
      </div>
    </div>
    ${actionHtml}`;

  if (!sq.done && canAfford) {
    card.querySelector('.quest-complete-btn').addEventListener('click', () => completeSidequest(sq.id));
  } else if (log) {
    card.querySelector('.log-view-btn')?.addEventListener('click', () => showLogView(log));
  }
  return card;
}

function showSqCreateModal() {
  $('sq-title-input').value  = '';
  $('sq-desc-input').value   = '';
  const sel = $('sq-cat-select');
  if (sel) sel.value = '';
  // === KATEGORIE MODAL & SPIRALS === PUNKT 1: Display zurücksetzen
  const display = $('selectedCatDisplay');
  if (display) { display.textContent = 'Welchen Pfad wirst du beschreiten?'; display.style.color = ''; }
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.sq-ap-btn').forEach(b => b.classList.remove('selected'));
  $('btn-sq-save').disabled  = true;
  $('popup-sq-create').classList.remove('hidden');
  renderSidequests();
}

function _updateSqSaveState() {
  // === SIDEQUEST & MANA UPDATE === PUNKT 4: Select statt Grid
  const catSel   = $('sq-cat-select');
  const hasCategory = !!(catSel && catSel.value);
  const hasTitle    = $('sq-title-input').value.trim().length > 0;
  const hasAp       = !!document.querySelector('.sq-ap-btn.selected');
  $('btn-sq-save').disabled = !(hasCategory && hasTitle && hasAp);
}

function initSqCreateModal() {
  // === KATEGORIE MODAL & SPIRALS === PUNKT 1: Kategorie-Grid aufbauen
  const grid = $('cat-grid');
  if (grid) {
    CAT_MODAL_ITEMS.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'cat-card';
      card.dataset.value = cat.value;
      card.style.background = cat.bg;
      card.style.color = cat.color;
      card.style.border = `1.5px solid ${cat.borderColor}`;
      card.innerHTML = `<span class="cat-card-icon">${cat.emoji}</span><span class="cat-card-name">${cat.name}</span>`;
      card.addEventListener('click', () => {
        document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const display = $('selectedCatDisplay');
        if (display) { display.textContent = cat.emoji + ' ' + cat.name; display.style.color = '#f0c040'; }
        const sel = $('sq-cat-select');
        if (sel) sel.value = cat.value;
        _updateSqSaveState();
        setTimeout(() => closeCategoryModal(), 300);
      });
      grid.appendChild(card);
    });
  }

  // Path-Trigger-Button öffnet Modal
  const pathBtn = $('path-trigger-btn');
  if (pathBtn) pathBtn.addEventListener('click', openCategoryModal);

  // Klick auf Overlay-Hintergrund schließt Modal
  const overlay = $('catModalOverlay');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeCategoryModal(); });

  document.querySelectorAll('.sq-ap-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sq-ap-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      _updateSqSaveState();
    });
  });

  $('sq-title-input').addEventListener('input', _updateSqSaveState);

  // === BUGFIX & UI UPDATE === PUNKT 4: Sidequest-Speichern (click + touchend für mobil)
  const _sqDoSave = () => {
    const catSel   = $('sq-cat-select');
    const apBtn    = document.querySelector('.sq-ap-btn.selected');
    const title    = $('sq-title-input').value.trim();
    const catValue = catSel?.value || '';
    if (!catValue || !apBtn || !title) return;

    const sq = {
      id:          `sq_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      date:        todayStr(),
      category:    catValue,
      emoji:       SQ_CAT_EMOJIS[catValue] || '⚡',
      title,
      mana:        parseInt(apBtn.dataset.ap, 10) || 10,
      description: $('sq-desc-input').value.trim() || null,
      done:        false,
      treasure:    null,
    };
    saveSidequest(sq);
    $('popup-sq-create').classList.add('hidden');
    renderBoard();
  };
  const _sqSaveBtn = $('btn-sq-save');
  _sqSaveBtn.addEventListener('click', _sqDoSave);
  _sqSaveBtn.addEventListener('touchend', e => { e.preventDefault(); _sqDoSave(); });

  $('btn-sq-cancel').addEventListener('click', () => $('popup-sq-create').classList.add('hidden'));
}

function completeSidequest(sqId) {
  const sqs = loadTodaySidequests();
  const sq  = sqs.find(s => s.id === sqId && !s.done);
  if (!sq || appState.mana < (sq.mana || 0)) return;

  const reward = getRandomReward('sidequest');
  _pendingCompletion = { type: 'sidequest', id: sqId, questTitle: sq.title, reward, questObj: { ...sq } };

  appState.mana = Math.max(0, appState.mana - sq.mana);
  updateManaBottle(appState.mana, appState.maxMana || MAX_MANA);
  renderBoard();

  removeQuestFromData(sqId);
  saveDayState(appState);

  const sqCard = document.querySelector(`.sidequest-card[data-sq-id="${CSS.escape(sqId)}"]`);
  if (sqCard) {
    sqCard.classList.add('shooting-star-exit');
    setTimeout(() => { if (sqCard.parentNode) sqCard.remove(); }, 600);
  }

  setTimeout(() => showVictoryScreen({ name: sq.title }, reward), 600);
}

function _finalizeSidequestCompletion(sqId, preReward, questObj) {
  if (!appState) return;

  let treasure;
  if (preReward && typeof preReward === 'string') {
    treasure = { name: REWARD_ICON_MAP[preReward] || preReward };
  } else {
    treasure = TREASURE_ITEMS[Math.floor(Math.random() * TREASURE_ITEMS.length)];
  }

  const title = questObj ? questObj.title : sqId;
  rucksackRecordTreasure(title, treasure, 'sidequest');

  appState.completedCount = (appState.completedCount || 0) + 1;
  saveDayState(appState);
  renderBoard();
  setTimeout(() => checkAndShowDayRating(), 1500);
  if ((appState.completedCount || 0) >= 2 && !appState.starAwarded) setTimeout(awardStar, 1800);
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

  // Runen injizieren – NUR in Randbereichen, frisch pro Öffnen
  const popup = document.querySelector('#popup-quest-log .quest-log-popup');
  if (popup && !popup.hasAttribute('data-runes-injected')) {
    const RUNES  = ['ᚱ','ᚢ','ᚾ','ᛖ','ᚠ','ᚨ','ᚷ','ᛁ','ᛉ','ᛊ','ᛏ','ᛒ','ᛗ','ᛚ','ᚦ','ᚩ','ᚳ','ᚻ','ᛞ','ᛟ'];
    const DELAYS = [-2,-5,-8,-11,-14,-3,-7,-10,-13,-4,-6,-9,-12,-1.5,-4.5,-7.5,-10.5,-2.5,-6.5,-11.5];
    const SLR = 92 / 4; // top-spread für linken/rechten Rand: 3%–95%
    const STB = 90 / 4; // left-spread für oberen/unteren Rand: 5%–95%

    const pos = [];
    for (let i = 0; i < 5; i++) pos.push({ top: `${(3 + i * SLR).toFixed(1)}%`, left:   `${2 + (i % 3) * 2}%` });
    for (let i = 0; i < 5; i++) pos.push({ top: `${(3 + i * SLR).toFixed(1)}%`, right:  `${2 + (i % 3) * 2}%` });
    for (let i = 0; i < 5; i++) pos.push({ top: `${1 + (i % 3) * 2}%`,          left:   `${(5 + i * STB).toFixed(1)}%` });
    for (let i = 0; i < 5; i++) pos.push({ bottom: `${1 + (i % 3) * 2}%`,       left:   `${(5 + i * STB).toFixed(1)}%` });

    pos.forEach((p, i) => {
      const s     = document.createElement('span');
      s.className = 'popup-abs-rune';
      const color = i % 3 === 2 ? 'rgba(150,85,10,0.6)' : i % 2 === 0 ? 'rgba(120,60,5,0.55)' : 'rgba(180,110,15,0.5)';
      const size  = i % 2 === 0 ? '1.2rem' : '0.85rem';
      const dur   = (7 + (i / 19) * 8).toFixed(1);
      const delay = DELAYS[i];
      let css = `color:${color};font-size:${size};animation:runeGlow ${dur}s ease-in-out ${delay}s infinite;animation-fill-mode:none;`;
      if (p.top)    css += `top:${p.top};`;
      if (p.bottom) css += `bottom:${p.bottom};`;
      if (p.left)   css += `left:${p.left};`;
      if (p.right)  css += `right:${p.right};`;
      s.style.cssText = css;
      s.textContent   = RUNES[i];
      popup.appendChild(s);
    });
    popup.setAttribute('data-runes-injected', '1');
  }

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
    const popupEl = document.querySelector('#popup-quest-log .quest-log-popup');
    if (popupEl) {
      popupEl.querySelectorAll('.popup-abs-rune').forEach(r => r.remove());
      popupEl.removeAttribute('data-runes-injected');
    }

    const pending = _pendingCompletion;
    _pendingCompletion = null;

    if (pending.type === 'quest') {
      // === FIX: QUEST COMPLETE FLOW === questObj übergeben (Quest bereits aus Array entfernt)
      _finalizeQuestCompletion(pending.id, pending.reward, pending.questObj);
    } else {
      _finalizeSidequestCompletion(pending.id, pending.reward, pending.questObj);
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

// === BUGFIX & UI UPDATE === PUNKT 9: Sternbild-SVG – 'faint' zeigt nur Nebel
function _makeConstSvg(c, state) {
  const vw = 80, vh = 64;

  // Gesperrte Sternbilder (außer isCurrent=active): nur dichter Nebel
  if (state === 'faint') {
    return `<svg viewBox="0 0 ${vw} ${vh}" xmlns="http://www.w3.org/2000/svg" class="ci-svg ci-svg-nebula">
      <ellipse cx="40" cy="32" rx="34" ry="26" fill="rgba(100,40,200,0.38)"/>
      <ellipse cx="28" cy="26" rx="20" ry="15" fill="rgba(70,20,180,0.28)"/>
      <ellipse cx="52" cy="40" rx="18" ry="13" fill="rgba(50,10,150,0.22)"/>
      <ellipse cx="45" cy="18" rx="14" ry="10" fill="rgba(80,30,200,0.18)"/>
      <ellipse cx="22" cy="44" rx="12" ry="9"  fill="rgba(60,20,160,0.15)"/>
    </svg>`;
  }

  const pts = c.stars.map(s => ({ x: s.x * vw, y: s.y * vh }));

  let linesHtml = '';
  if (state === 'done' || state === 'active') {
    (c.lines || []).forEach(([ai, bi]) => {
      const a = pts[ai], b = pts[bi];
      const stroke = state === 'done' ? 'rgba(210,230,255,0.6)' : 'rgba(180,210,255,0.35)';
      const dash = state === 'active' ? 'stroke-dasharray="3 3"' : '';
      linesHtml += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${stroke}" stroke-width="1.2" ${dash}/>`;
    });
  }

  let dotsHtml = '';
  pts.forEach(p => {
    const r    = state === 'done' ? 2.5 : 2.2;
    const fill = state === 'done' ? '#fff9d5' : 'rgba(200,225,255,0.85)';
    dotsHtml += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="${fill}"/>`;
  });

  return `<svg viewBox="0 0 ${vw} ${vh}" xmlns="http://www.w3.org/2000/svg" class="ci-svg">${linesHtml}${dotsHtml}</svg>`;
}

// ── Entdeckt-Tab: Neuimplementierung mit benanntem Container ──────────────────
function renderEntdecktTab() {
  const starCount = loadStars().length;
  const info = getConstellationInfo(starCount);
  const compN = info.allComplete ? CONSTELLATIONS.length : (info.completedCount || 0);
  console.log('renderEntdecktTab: starCount=', starCount, 'compN=', compN);
  const container = $('const-view-entdeckt');
  if (!container) return;
  container.innerHTML = '';
  const discovered = CONSTELLATIONS.filter((c, i) => i < compN);
  if (discovered.length === 0) {
    const _dbgNeeded = CONSTELLATIONS[0]?.starsNeeded ?? '?';
    container.innerHTML = `<div class="tel-empty-found">
      Noch keine Sternbilder entdeckt.<br>
      Sammle Sterne durch das Abschließen von Quests.
      <br><small style="color:rgba(255,255,255,0.3);font-size:0.65rem;margin-top:0.4rem;display:block">
        ⭐ ${starCount} Sterne · ${_dbgNeeded} benötigt für erstes Sternbild
      </small>
    </div>`;
    return;
  }
  discovered.forEach((c) => {
    const item = document.createElement('div');
    item.className = 'const-list-item ruck-const-item ci-done tel-found-card';

    const loreObj = CONSTELLATION_LORE[c.name];
    const loreText = typeof loreObj === 'string'
      ? loreObj
      : (loreObj?.lore || '');
    const personalText = typeof loreObj === 'object'
      ? (loreObj?.personal || '')
      : '';

    item.innerHTML = `
      <div class="ci-svg-wrap" style="pointer-events:none">${_makeConstSvg(c, 'done')}</div>
      <div class="ci-info" style="pointer-events:none">
        <span class="ruck-const-name">${c.name}</span>
        <span class="ruck-const-badge badge-done">Entdeckt ✦</span>
        <span class="tel-found-hint">🔭 Tippen für Lore</span>
        <div class="tel-found-lore" style="display:none"></div>
      </div>`;

    const loreEl = item.querySelector('.tel-found-lore');
    loreEl.textContent = loreText || '✦ Die Sterne schweigen noch über dieses Bild…';
    if (personalText) {
      const personalEl = document.createElement('div');
      personalEl.className = 'tel-found-personal';
      personalEl.textContent = personalText;
      loreEl.appendChild(personalEl);
    }

    item.addEventListener('click', () => {
      const hintEl = item.querySelector('.tel-found-hint');
      const isOpen = loreEl.style.display === 'block';

      container.querySelectorAll('.tel-found-lore').forEach(el => {
        el.style.display = 'none';
      });
      container.querySelectorAll('.tel-found-hint').forEach(el => {
        el.textContent = '🔭 Tippen für Lore';
      });
      container.querySelectorAll('.tel-found-expanded').forEach(el => {
        el.classList.remove('tel-found-expanded');
      });

      if (!isOpen) {
        loreEl.style.display = 'block';
        if (hintEl) hintEl.textContent = '‹ Schließen';
        item.classList.add('tel-found-expanded');
      }
    });

    container.appendChild(item);
  });
}

// ── Entdeckt-Tab: discovered constellations list with tap-to-expand lore ──────
function renderDiscoveredConstellations(paneFoundEl) {
  if (!paneFoundEl) return;
  paneFoundEl.innerHTML = '';

  const starCount = loadStars().length;
  const info = getConstellationInfo(starCount);
  const compN = info.allComplete ? CONSTELLATIONS.length : info.completedCount;
  const discovered = CONSTELLATIONS.filter((c, i) => i < compN);
  console.log('compN:', compN, 'discovered:', discovered.length);

  if (discovered.length === 0) {
    const _dbgNeeded = CONSTELLATIONS[0]?.starsNeeded ?? '?';
    paneFoundEl.innerHTML = `<div class="tel-empty-found">
      Noch keine Sternbilder entdeckt.<br>
      Sammle Sterne durch das Abschließen von Quests.
      <br><small style="color:rgba(255,255,255,0.3);font-size:0.65rem;margin-top:0.4rem;display:block">
        ⭐ ${starCount} Sterne · ${_dbgNeeded} benötigt für erstes Sternbild
      </small>
    </div>`;
    return;
  }

  let expandedCard = null;

  discovered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'ruck-const-item ci-done tel-found-card';

    const fullText = CONSTELLATION_LORE[c.name] || '';
    const splitIdx = fullText.indexOf('\n\n');
    const loreText = splitIdx >= 0 ? fullText.slice(0, splitIdx) : fullText;

    card.innerHTML = `
      <div class="ci-svg-wrap">${_makeConstSvg(c, 'done')}</div>
      <div class="ci-info">
        <span class="ruck-const-name">${c.name}</span>
        <span class="ruck-const-badge badge-done">Entdeckt ✦</span>
        <span class="tel-found-hint">Tippen für Lore ›</span>
        <div class="tel-found-lore" hidden></div>
      </div>`;

    card.querySelector('.tel-found-lore').textContent = loreText;

    card.addEventListener('click', () => {
      const loreEl = card.querySelector('.tel-found-lore');
      const hintEl = card.querySelector('.tel-found-hint');
      const isOpen = !loreEl.hidden;

      if (expandedCard && expandedCard !== card) {
        const prevLore = expandedCard.querySelector('.tel-found-lore');
        const prevHint = expandedCard.querySelector('.tel-found-hint');
        if (prevLore) prevLore.hidden = true;
        if (prevHint) prevHint.textContent = 'Tippen für Lore ›';
        expandedCard.classList.remove('tel-found-expanded');
      }

      if (isOpen) {
        loreEl.hidden = true;
        hintEl.textContent = 'Tippen für Lore ›';
        card.classList.remove('tel-found-expanded');
        expandedCard = null;
      } else {
        loreEl.hidden = false;
        hintEl.textContent = '‹ Schließen';
        card.classList.add('tel-found-expanded');
        expandedCard = card;
      }
    });

    paneFoundEl.appendChild(card);
  });
}

// === FIX 6: Teleskop mit Aktuell/Entdeckt-Tabs ===
// ── Telescope ─────────────────────────────────────────────────────
function _ruckPopTelescope() {
  const starCount = loadStars().length;
  console.log('starCount:', appState.totalStars, appState.stars, appState.collectedStars);
  console.log('getConstellationInfo:', getConstellationInfo(starCount));
  const numEl     = $('ruck-star-num');

  if (_ruckCountRaf) cancelAnimationFrame(_ruckCountRaf);
  numEl.textContent = '0';

  const list  = $('ruck-const-list');
  list.innerHTML = '';
  const info  = getConstellationInfo(starCount);
  const compN_stars = info.allComplete ? CONSTELLATIONS.length : info.completedCount;

  // Fallback: check appState for directly tracked constellation completions
  let compN_state = 0;
  if (appState) {
    if (typeof appState.completedConstellations === 'number') {
      compN_state = Math.max(compN_state, appState.completedConstellations);
    }
    if (Array.isArray(appState.unlockedConstellations)) {
      compN_state = Math.max(compN_state, appState.unlockedConstellations.length);
      // check by id/name membership
      CONSTELLATIONS.forEach((c, i) => {
        if (appState.unlockedConstellations.includes(c.id) || appState.unlockedConstellations.includes(c.name)) {
          compN_state = Math.max(compN_state, i + 1);
        }
      });
    }
    if (Array.isArray(appState.stars)) {
      let cum2 = 0;
      for (let i = 0; i < CONSTELLATIONS.length; i++) {
        cum2 += CONSTELLATIONS[i].starsNeeded;
        if (appState.stars.length >= cum2) compN_state = Math.max(compN_state, i + 1);
      }
    }
    CONSTELLATIONS.forEach((c, i) => {
      const sc = appState[c.id] || appState[c.name];
      if (sc) {
        if (sc.isComplete || sc.isUnlocked || sc.completedAt || (sc.progress != null && sc.maxProgress != null && sc.progress >= sc.maxProgress)) {
          compN_state = Math.max(compN_state, i + 1);
        }
      }
    });
  }
  const compN = Math.min(Math.max(compN_stars, compN_state), CONSTELLATIONS.length);
  console.log('[Teleskop] Entdeckte Sternbilder:', compN, '| Sterne:', starCount, '| compN_stars:', compN_stars, '| compN_state:', compN_state);
  console.log('[Teleskop] appState.unlockedConstellations:', appState?.unlockedConstellations);
  console.log('[Teleskop] appState.completedConstellations:', appState?.completedConstellations);
  console.log('[Teleskop] appState.stars (count):', Array.isArray(appState?.stars) ? appState.stars.length : 'n/a');

  // Tab-Leiste
  const tabBar = document.createElement('div');
  tabBar.className = 'tel-tab-bar';
  tabBar.innerHTML = `
    <button class="tel-tab active" data-tab="current">Aktuell</button>
    <button class="tel-tab" data-tab="found">Entdeckt 🌟</button>
  `;
  list.appendChild(tabBar);

  const paneCurrentEl = document.createElement('div');
  paneCurrentEl.className = 'tel-tab-pane tel-pane-current';
  paneCurrentEl.id = 'const-view-aktuell';
  list.appendChild(paneCurrentEl);

  const paneFoundEl = document.createElement('div');
  paneFoundEl.className = 'tel-tab-pane tel-pane-found hidden';
  paneFoundEl.id = 'const-view-entdeckt';
  list.appendChild(paneFoundEl);

  tabBar.querySelectorAll('.tel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabBar.querySelectorAll('.tel-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      list.querySelectorAll('.tel-tab-pane').forEach(p => p.classList.add('hidden'));
      list.querySelector('.tel-pane-' + tab.dataset.tab).classList.remove('hidden');
      if (tab.dataset.tab === 'found') renderEntdecktTab();
    });
  });

  // Aktuell-Tab: aktives Sternbild + nächste gesperrte
  if (info.allComplete) {
    paneCurrentEl.innerHTML = '<div class="tel-all-done">✦ Alle Sternbilder entdeckt! ✦</div>';
  } else {
    CONSTELLATIONS.forEach((c, i) => {
      if (i < compN) return;
      const isCurrent = i === compN;
      const isNext1   = i === compN + 1;
      const isNext2   = i === compN + 2;

      const el = document.createElement('div');
      if (isCurrent) {
        el.className = 'ruck-const-item ci-active';
        el.innerHTML = `
          <div class="ci-svg-wrap constellation-locked">${_makeConstSvg(c, 'faint')}</div>
          <div class="ci-info">
            <div class="mystery-marks">
              <span class="mystery-q" style="animation-delay:0s">?</span>
              <span class="mystery-q" style="animation-delay:0.4s">?</span>
              <span class="mystery-q" style="animation-delay:0.8s">?</span>
            </div>
            <span class="ruck-const-badge badge-active">🔒</span>
            <span class="badge-star-count">⭐ ${info.earned} / ${c.starsNeeded}</span>
          </div>`;
      } else if (isNext1 || isNext2) {
        el.className = 'ruck-const-item ci-locked';
        el.innerHTML = `
          <div class="ci-svg-wrap constellation-locked">${_makeConstSvg(c, 'faint')}</div>
          <div class="ci-info">
            <div class="mystery-marks">
              <span class="mystery-q" style="animation-delay:0s">?</span>
              <span class="mystery-q" style="animation-delay:0.4s">?</span>
              <span class="mystery-q" style="animation-delay:0.8s">?</span>
            </div>
            <span class="ruck-const-badge badge-locked">🔒</span>
          </div>`;
      } else {
        el.className = 'ruck-const-item ci-far';
        el.innerHTML = `
          <div class="ci-svg-wrap constellation-locked">${_makeConstSvg(c, 'faint')}</div>
          <div class="ci-info">
            <div class="mystery-marks">
              <span class="mystery-q" style="animation-delay:0s">?</span>
              <span class="mystery-q" style="animation-delay:0.4s">?</span>
              <span class="mystery-q" style="animation-delay:0.8s">?</span>
            </div>
          </div>`;
      }
      paneCurrentEl.appendChild(el);
    });
  }

  // Entdeckt-Tab: beim Öffnen sofort rendern
  renderEntdecktTab();

  // Fly-in: Hero zuerst, dann Sternbild-Einträge (±150px Startversatz, 0.05s Stagger)
  const hero = document.querySelector('.ruck-stars-hero');
  if (hero) {
    hero.classList.remove('fly-in');
    void hero.offsetWidth;
    hero.classList.add('fly-in');

    // Inject decorative mini stars as CSS circles (protection zone: top 15-75%, left 20-80%)
    hero.querySelectorAll('.tel-mini-star').forEach(s => s.remove());
    const _STAR_COLORS = ['#f0c040', '#c0d0f0', '#c090f0', '#f090c0', '#60d0f0', '#ffffff'];
    const _STAR_COUNT  = 35 + Math.floor(Math.random() * 6);
    for (let i = 0; i < _STAR_COUNT; i++) {
      let sx, sy, tries = 0;
      do {
        sx = Math.random() * 100;
        sy = Math.random() * 100;
        tries++;
      } while (tries < 60 && sx >= 20 && sx <= 80 && sy >= 15 && sy <= 75);
      const sz = (2 + Math.random() * 3).toFixed(1);
      const s  = document.createElement('div');
      s.className = 'tel-mini-star';
      s.style.left             = sx.toFixed(1) + '%';
      s.style.top              = sy.toFixed(1) + '%';
      s.style.width            = sz + 'px';
      s.style.height           = sz + 'px';
      s.style.background       = _STAR_COLORS[Math.floor(Math.random() * _STAR_COLORS.length)];
      s.style.animationDuration = (1.5 + Math.random() * 2.5).toFixed(2) + 's';
      s.style.animationDelay   = (Math.random() * 4).toFixed(2) + 's';
      hero.insertBefore(s, hero.firstChild);
    }
  }

  const items = paneCurrentEl.querySelectorAll('.ruck-const-item:not(.ci-far)');
  items.forEach((el, i) => {
    el.classList.remove('fly-in');
    const fx = (Math.random() * 300 - 150).toFixed(0);
    const fy = (Math.random() * 300 - 150).toFixed(0);
    el.style.setProperty('--fx', `${fx}px`);
    el.style.setProperty('--fy', `${fy}px`);
    el.style.animationDelay = `${(i * 0.05 + 0.1).toFixed(2)}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('fly-in')));
  });

  // CountUp startet NACH den Fly-in-Animationen
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

function _openConstDetail(c) {
  const stars = loadStars();

  // Calculate discovery date from cumulative star threshold
  let cumulative = 0;
  let discoveryDate = '';
  for (let i = 0; i < CONSTELLATIONS.length; i++) {
    cumulative += CONSTELLATIONS[i].starsNeeded;
    if (CONSTELLATIONS[i].id === c.id) {
      const dateStr = stars[cumulative - 1];
      if (dateStr) {
        try {
          discoveryDate = new Intl.DateTimeFormat('de-AT', {
            timeZone: 'Europe/Vienna', day: 'numeric', month: 'long', year: 'numeric',
          }).format(new Date(dateStr + 'T12:00:00'));
        } catch { discoveryDate = dateStr; }
      }
      break;
    }
  }

  // Split stored lore string into lore + personal (separated by \n\n)
  const fullText = CONSTELLATION_LORE[c.name] || '';
  const splitIdx = fullText.indexOf('\n\n');
  const loreText     = splitIdx >= 0 ? fullText.slice(0, splitIdx) : fullText;
  const personalText = splitIdx >= 0 ? fullText.slice(splitIdx + 2) : '';

  const dateDisplay = discoveryDate ? `✦ Entdeckt am ${discoveryDate} ✦` : '✦ Entdeckt ✦';

  // Seeded RNG for deterministic placement
  const srng = s => { const x = Math.sin(s * 127.1) * 10000; return x - Math.floor(x); };

  // 40 twinkling background stars (2–3 px circles)
  let starsHtml = '';
  for (let i = 0; i < 40; i++) {
    const px  = (srng(i)       * 100).toFixed(1);
    const py  = (srng(i + 40)  * 100).toFixed(1);
    const sz  = (srng(i + 80)  * 1 + 2).toFixed(1);
    const dur = (srng(i + 120) * 2 + 2).toFixed(1);
    const del = (srng(i + 160) * 3).toFixed(1);
    starsHtml += `<div class="const-detail-star" style="left:${px}%;top:${py}%;width:${sz}px;height:${sz}px;animation-duration:${dur}s;animation-delay:${del}s"></div>`;
  }

  // Decorative runes on left + right edges
  const runeChars = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛜ','ᛞ','ᛟ'];
  let runesHtml = '';
  for (let i = 0; i < 8; i++) {
    const topPct = 10 + i * 11;
    const lDur  = (7 + srng(i + 200) * 5).toFixed(1);
    const lDel  = (srng(i + 208) * 8).toFixed(1);
    const lLeft = (2 + srng(i + 216) * 13).toFixed(1);
    runesHtml += `<span class="const-detail-rune" style="left:${lLeft}px;top:${topPct}%;animation-name:runeOpacity;animation-duration:${lDur}s;animation-delay:${lDel}s">${runeChars[i % runeChars.length]}</span>`;
    const rDur   = (7 + srng(i + 224) * 5).toFixed(1);
    const rDel   = (srng(i + 232) * 8).toFixed(1);
    const rRight = (2 + srng(i + 240) * 13).toFixed(1);
    runesHtml += `<span class="const-detail-rune" style="right:${rRight}px;top:${topPct}%;animation-name:runeOpacity;animation-duration:${rDur}s;animation-delay:${rDel}s">${runeChars[(i + 8) % runeChars.length]}</span>`;
  }

  const overlay = document.createElement('div');
  overlay.className = 'const-detail-overlay';
  overlay.innerHTML = `
    ${starsHtml}
    ${runesHtml}
    <button class="back-btn" aria-label="Zurück">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#f0c040" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <div class="const-detail-content">
      <div class="const-detail-svg-wrap">${_makeConstSvg(c, 'done')}</div>
      <div class="const-detail-card">
        <div class="const-card-corner tl"></div>
        <div class="const-card-corner tr"></div>
        <div class="const-card-corner bl"></div>
        <div class="const-card-corner br"></div>
        <div class="const-detail-name">${c.name}</div>
        <div class="const-detail-date">${dateDisplay}</div>
        <div class="const-detail-divider"></div>
        <div class="const-detail-lore">${loreText}</div>
        ${personalText ? `<div class="const-detail-personal">${personalText}</div>` : ''}
      </div>
    </div>`;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));

  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 350);
  };
  const backBtn = overlay.querySelector('.back-btn');
  backBtn.addEventListener('click', close);
  backBtn.addEventListener('touchend', e => { e.preventDefault(); close(); }, { passive: false });
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

// === BUGFIX & UI UPDATE === PUNKT 8: Kerzen entfernt
function _injectQuestlogCandles() {}

// ── Questlog: mystische Rand-Symbole (Runen + Alchemie, keine Monde) ──────────
function _injectQlSymbols(qlBody) {
  if (!qlBody || qlBody.dataset.symbolsInjected) return;
  qlBody.dataset.symbolsInjected = '1';

  // Kein ☽, kein ☾
  const LEFT_SYMS  = ['ᚠ','♄','ᚦ','⊕','ᚨ','⚴','ᚹ','⚶'];
  const RIGHT_SYMS = ['ᛟ','♃','ᛞ','☿','ᛈ','⚶','ᛜ','♄'];
  const TOPS = [3, 15, 27, 39, 51, 63, 75, 87];

  [[LEFT_SYMS, 'left'], [RIGHT_SYMS, 'right']].forEach(([syms, side]) => {
    syms.forEach((sym, i) => {
      const sz    = i % 2 === 0 ? 1.1 : 1.2;
      const op    = i % 2 === 0 ? 0.38 : 0.42;
      const dur   = (5 + (i / 7) * 4).toFixed(1);   // 5.0s → 9.0s
      const delay = ((i / 7) * 3.8).toFixed(2);      // 0.00s → 3.80s
      const el    = document.createElement('span');
      el.textContent = sym;
      el.setAttribute('aria-hidden', 'true');
      el.style.cssText = [
        'position:absolute',
        `${side}:5px`,
        `top:${TOPS[i]}%`,
        `font-size:${sz}rem`,
        `color:rgba(80,40,5,${op})`,
        'pointer-events:none',
        'z-index:0',
        `animation:symPulse ${dur}s ease-in-out infinite`,
        `animation-delay:${delay}s`,
        'line-height:1',
        'user-select:none',
      ].join(';');
      qlBody.appendChild(el);
    });
  });
}

// === FEATURE – Questlog Episches Logbuch-Design ===
function _ruckPopQuestlog() {
  const scrollArea = $('ruck-log-scroll');
  const logs       = loadLogs();
  const ratings    = loadDayRatings();

  const allEntries = [
    ...logs.map(l => ({ type: 'quest', date: l.date, title: l.questTitle, rating: l.rating, note: l.note })),
    ...ratings.map(r => ({ type: 'day', date: r.date, rating: r.rating })),
  ];

  const QR_ICONS  = { good: '🏆', ok: '⚔️', bad: '💀' };
  const DR_ICONS  = { too_little: '🌱', just_right: '⭐', much: '🔥', too_much: '💀' };
  const DR_LABELS = { too_little: 'Zu wenig', just_right: 'Genau richtig', much: 'Viel', too_much: 'Zu viel' };

  function fmtLong(d) {
    try {
      return new Date(d + 'T12:00:00').toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return d; }
  }

  const header = `
    <span class="ql-crest">⚔️🛡️⚔️</span>
    <div class="ql-title">Quest Log</div>
    <div class="ql-subtitle">Chronik der Abenteuer</div>
    <div class="ql-ornament">
      <div class="ql-orn-line"></div>
      <span class="ql-orn-text">✦ ᚱ ✦ ᚢ ✦ ᚾ ✦</span>
      <div class="ql-orn-line"></div>
    </div>`;

  function buildScroll(inner) {
    return `
      <div class="ql-outer">
        <div class="ql-roll"></div>
        <div class="ql-body">
          <span class="ql-margin-l">
            <span>ᚱᚢᚾ</span><span>♄⊕♃</span><span>ᛖᚠᚨ</span><span>⚴ᚦᛞ</span>
            <span>ᚷᛁᛉ</span><span>☿⚶ᛊ</span><span>ᛏᛒᛗ</span><span>ᛚᚹᛜ</span>
          </span>
          <span class="ql-margin-r">
            <span>ᛚᛗᛒ</span><span>♃☿⊕</span><span>ᛏᛊᛉ</span><span>ᚦᛞᛟ</span>
            <span>⚶♄ᚠ</span><span>ᛁᚷᚨ</span><span>ᚾᛖᚢ</span><span>ᚹᛈᛜ</span>
          </span>
          <div class="ql-vline-l"></div>
          <div class="ql-vline-r"></div>
          <div class="ql-content">${header}${inner}</div>
        </div>
        <div class="ql-roll-bot"></div>
      </div>`;
  }

  if (allEntries.length === 0) {
    scrollArea.innerHTML = buildScroll(
      `<div class="questlog-empty"><span>✦</span><p>Noch keine Abenteuer verzeichnet...</p></div>`
    );
    _injectQlSymbols(scrollArea.querySelector('.ql-body'));
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
  let entriesHtml = '';

  dates.forEach(date => {
    const group = byDate[date];

    entriesHtml += `
      <div class="ql-date-sep">
        <div class="ql-ds-line"></div>
        <span class="ql-ds-label">✦ ${fmtLong(date)} ✦</span>
        <div class="ql-ds-line"></div>
      </div>`;

    const hasQuests = group.quests.length > 0;

    if (group.dayRating) {
      const r = group.dayRating;
      entriesHtml += `
        <div class="ql-entry ql-day${hasQuests ? ' ql-day-toggleable' : ''}" data-day-date="${date}">
          <div class="ql-e-top">
            <span class="ql-e-rating">${DR_ICONS[r.rating] || '⭐'}</span>
            <span class="ql-e-name">✦ Tag: ${DR_LABELS[r.rating] || r.rating}</span>
            ${hasQuests ? '<span class="ql-day-toggle-icon">❧</span>' : ''}
          </div>
        </div>`;
    }

    if (hasQuests) {
      entriesHtml += `<div class="ql-day-quests" data-day-date="${date}">`;
    }

    group.quests.forEach(e => {
      const cls  = e.rating === 'good' ? 'good' : e.rating === 'bad' ? 'bad' : 'ok';
      const icon = QR_ICONS[e.rating] || '⚔️';
      entriesHtml += `
        <div class="ql-entry ${cls}">
          <div class="ql-e-top">
            <span class="ql-e-rating">${icon}</span>
            <span class="ql-e-name">${e.title}</span>
          </div>
          ${e.note ? `<div class="ql-e-note">${e.note}</div>` : ''}
        </div>`;
    });

    if (hasQuests) {
      entriesHtml += `</div>`; // close ql-day-quests
    }
  });

  entriesHtml += `<div class="ql-seal">✦ Ende der Einträge ✦ Mögen deine Quests glorreich sein ✦</div>`;
  scrollArea.innerHTML = buildScroll(entriesHtml);
  _injectQlSymbols(scrollArea.querySelector('.ql-body'));

  // Toggle: Tagesbewertungs-Einträge können Quest-Einträge ein-/ausklappen
  scrollArea.querySelectorAll('.ql-day-toggleable').forEach(dayEl => {
    const date = dayEl.dataset.dayDate;
    const questsEl = scrollArea.querySelector(`.ql-day-quests[data-day-date="${date}"]`);
    if (!questsEl) return;
    // Init: explizite Höhe setzen damit Transition funktioniert
    questsEl.style.overflow = 'hidden';
    questsEl.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    questsEl.style.maxHeight = questsEl.scrollHeight + 'px';
    questsEl.style.opacity = '1';
    let expanded = true;
    dayEl.addEventListener('click', () => {
      expanded = !expanded;
      const icon = dayEl.querySelector('.ql-day-toggle-icon');
      if (expanded) {
        // Ausklappen: von 0 auf Höhe
        questsEl.style.opacity = '1';
        questsEl.style.maxHeight = questsEl.scrollHeight + 'px';
        if (icon) icon.textContent = '❧';
        // Nach Animation: große Fallback-Höhe damit dynamischer Inhalt passt
        setTimeout(() => { if (expanded) questsEl.style.maxHeight = '9999px'; }, 320);
      } else {
        // Einklappen: von aktueller Höhe auf 0
        questsEl.style.maxHeight = questsEl.scrollHeight + 'px';
        void questsEl.offsetWidth; // Reflow erzwingen
        requestAnimationFrame(() => {
          questsEl.style.maxHeight = '0';
          questsEl.style.opacity = '0';
        });
        if (icon) icon.textContent = '❦';
      }
    });
  });
}

// ── Schatztruhe Blast-Animation (full-screen fixed overlay) ──────
function _ruckTreasureBlast() {
  const overlay = document.createElement('div');
  overlay.className = 'ruck-treasure-blast';
  const EMOJIS = ['💎', '💍', '✨', '🪙', '💎', '✨', '🪙', '💎', '💍', '✨', '🪙'];
  const count = 42;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'ruck-treasure-blast-particle';
    const tx    = Math.round(-200 + Math.random() * 400);
    const ty    = Math.round(-400 + Math.random() * 300);
    const rot   = Math.round(Math.random() * 720);
    const sz    = Math.round(12 + Math.random() * 20);
    const dur   = (1.5 + Math.random() * 1.0).toFixed(2);
    const delay = (Math.random() * 0.4).toFixed(2);
    const startX = (40 + Math.random() * 20).toFixed(1);
    const startY = (72 + Math.random() * 18).toFixed(1);
    p.style.cssText = `left:${startX}%;top:${startY}%;--tx:${tx}px;--ty:${ty}px;--rot:${rot}deg;--dur:${dur}s;--sz:${sz}px;--delay:${delay}s;`;
    p.textContent = EMOJIS[i % EMOJIS.length];
    overlay.appendChild(p);
  }
  document.body.appendChild(overlay);
  setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 3200);
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

// === TRUHE & QUESTLOG UPDATE – PUNKT 1+2+3: kein Scrollen, Münzregen, voller Boden ===
function _ruckPopTreasure() {
  _ruckChestTimers.forEach(clearTimeout);
  _ruckChestTimers = [];

  const container    = $('ruck-treasure-entries');
  const particleWrap = $('ruck-chest-particles');
  const scrollArea   = particleWrap.parentNode;

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
        <rect x="8" y="54" width="164" height="40" rx="4" fill="#3a1a08" stroke="#e8b840" stroke-width="2.5" filter="url(#chest-glow)"/>
        <rect x="8" y="86" width="164" height="8" rx="3" fill="#e8b840"/>
        <rect x="46" y="57" width="8" height="36" rx="1.5" fill="#e8b840" opacity="0.45"/>
        <rect x="126" y="57" width="8" height="36" rx="1.5" fill="#e8b840" opacity="0.45"/>
        <rect x="8"   y="54" width="18" height="18" rx="2" fill="#e8b840" opacity="0.78"/>
        <rect x="154" y="54" width="18" height="18" rx="2" fill="#e8b840" opacity="0.78"/>
        <rect x="8"   y="76" width="18" height="18" rx="2" fill="#e8b840" opacity="0.78"/>
        <rect x="154" y="76" width="18" height="18" rx="2" fill="#e8b840" opacity="0.78"/>
        <rect x="72" y="58" width="36" height="26" rx="5" fill="#e8b840" stroke="#ffe090" stroke-width="2"/>
        <path d="M80 58 Q80 46 90 46 Q100 46 100 58" fill="none" stroke="#c49030" stroke-width="4.5"/>
        <circle cx="90" cy="68" r="4.5" fill="#2a1008"/>
        <rect x="88" y="70" width="4" height="7" rx="1.5" fill="#2a1008"/>
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

  // Collect items
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
    requestAnimationFrame(() => {
      const lid = heroWrap.querySelector('.ruck-chest-lid-g');
      if (lid) { void lid.offsetWidth; lid.classList.add('ruck-lid-open'); }
    });
    return;
  }

  // Build floor structure immediately (coin rain needs container)
  container.innerHTML = `<div class="ruck-chest-floor">
    <div class="ruck-chest-bg-layer" id="ruck-bg-layer"></div>
    <div class="ruck-scattered-wrap" id="ruck-scattered-wrap"></div>
  </div>`;

  // 1. Lid animation + full-screen blast
  requestAnimationFrame(() => {
    const lid = heroWrap.querySelector('.ruck-chest-lid-g');
    if (lid) { void lid.offsetWidth; lid.classList.add('ruck-lid-open'); }
    _ruckTreasureBlast();
  });

  // 2. Münzregen (0.3s nach Öffnen)
  _ruckChestTimers.push(setTimeout(() => {
    const floor = container.querySelector('.ruck-chest-floor');
    if (!floor) return;
    const coinCount = 20 + Math.floor(Math.random() * 6);
    for (let i = 0; i < coinCount; i++) {
      const coin = document.createElement('div');
      coin.className = 'ruck-rain-coin';
      const sz      = 14 + Math.floor(Math.random() * 14);
      const leftPct = (5 + Math.random() * 86).toFixed(1);
      const fallDist = (100 + Math.random() * 80).toFixed(0);
      const rotation = (180 + Math.random() * 540).toFixed(0);
      const dur   = (0.7 + Math.random() * 0.55).toFixed(2);
      const delay = (Math.random() * 0.45).toFixed(2);
      coin.style.cssText = `left:${leftPct}%;--fall-distance:${fallDist}px;--rotation:${rotation}deg;--rain-dur:${dur}s;--rain-delay:${delay}s`;
      const cid = 'rc' + (++_ruckIconSeq);
      coin.innerHTML = `<svg width="${sz}" height="${sz}" viewBox="0 0 20 20"><defs><radialGradient id="${cid}" cx="35%" cy="25%" r="65%"><stop offset="0%" stop-color="#fffab0"/><stop offset="55%" stop-color="#d4a020"/><stop offset="100%" stop-color="#7a4e08"/></radialGradient></defs><circle cx="10" cy="10" r="9" fill="url(#${cid})" stroke="#c49020" stroke-width="1"/><ellipse cx="7" cy="7" rx="3" ry="1.8" fill="white" opacity="0.4" transform="rotate(-30 7 7)"/></svg>`;
      floor.appendChild(coin);
    }
  }, 300));

  // 3. Glitzer (0.9s)
  _ruckChestTimers.push(setTimeout(() => {
    const gw = document.getElementById('ruck-chest-glitter-wrap');
    if (!gw) return;
    const glyphs = ['✦', '✧', '★', '✦', '✧', '⭐', '✦', '✧'];
    glyphs.forEach((g, i) => {
      const el = document.createElement('span');
      el.className  = 'ruck-chest-glitter-item';
      el.textContent = g;
      el.style.left = `${8 + Math.random() * 84}%`;
      el.style.top  = `${-(15 + Math.random() * 10)}px`;
      el.style.animation = `ruck-glitter-up 0.8s ease-out ${(i * 0.05).toFixed(2)}s forwards`;
      gw.appendChild(el);
    });
  }, 900));

  // 4. BG-Schätze (1.0s): 13 Münzen, 4 Stapel, 9 Edelsteine, 3 Goldbarren
  _ruckChestTimers.push(setTimeout(() => {
    const bgL = document.getElementById('ruck-bg-layer');
    if (!bgL) return;
    let bgHtml = '';

    // 13 Münzen
    const coinPts = [[4,8],[12,55],[20,22],[30,72],[38,38],[48,10],[56,62],[64,30],[72,78],[80,18],[88,50],[25,85],[70,88]];
    coinPts.forEach(([l, t], i) => {
      const jl = Math.max(2, Math.min(90, l + (Math.random()-0.5)*8)).toFixed(1);
      const jt = Math.max(2, Math.min(88, t + (Math.random()-0.5)*8)).toFixed(1);
      const sz = 16 + Math.floor(Math.random() * 10);
      const cid = 'bc' + i;
      bgHtml += `<svg class="ruck-chest-bg-coin" style="left:${jl}%;top:${jt}%;width:${sz}px;height:${sz}px" viewBox="0 0 20 20"><defs><radialGradient id="${cid}" cx="35%" cy="25%" r="65%"><stop offset="0%" stop-color="#fffab0"/><stop offset="100%" stop-color="#c49020"/></radialGradient></defs><circle cx="10" cy="10" r="9" fill="url(#${cid})" stroke="#b08010" stroke-width="1"/></svg>`;
    });

    // 4 Münzstapel
    [[15,40],[45,25],[68,55],[85,20]].forEach(([l, t], i) => {
      const jl = (l + (Math.random()-0.5)*6).toFixed(1);
      const jt = Math.max(2, t + (Math.random()-0.5)*6).toFixed(1);
      const sid = 'bs' + i;
      bgHtml += `<svg class="ruck-chest-bg-coin" style="left:${jl}%;top:${jt}%;width:22px;height:26px" viewBox="0 0 22 26"><defs><radialGradient id="${sid}" cx="35%" cy="25%" r="65%"><stop offset="0%" stop-color="#fffab0"/><stop offset="100%" stop-color="#c49020"/></radialGradient></defs>
        <ellipse cx="11" cy="22" rx="9" ry="3.5" fill="url(#${sid})" stroke="#b08010" stroke-width="1"/>
        <ellipse cx="11" cy="18" rx="9" ry="3.5" fill="url(#${sid})" stroke="#b08010" stroke-width="1"/>
        <ellipse cx="11" cy="14" rx="9" ry="3.5" fill="url(#${sid})" stroke="#b08010" stroke-width="1"/>
        <ellipse cx="11" cy="10" rx="9" ry="3.5" fill="url(#${sid})" stroke="#b08010" stroke-width="1"/>
        <ellipse cx="11" cy="7"  rx="9" ry="3.5" fill="url(#${sid})" stroke="#b08010" stroke-width="1"/></svg>`;
    });

    // 9 Edelsteine
    [{l:8,t:35,c:'#e03030',sc:'#ff9090'},{l:22,t:68,c:'#2060e0',sc:'#80b0ff'},
     {l:36,t:48,c:'#20b040',sc:'#80ff90'},{l:50,t:80,c:'#a030d0',sc:'#d888ff'},
     {l:62,t:25,c:'#e84030',sc:'#ff9868'},{l:76,t:58,c:'#1890e0',sc:'#70d8ff'},
     {l:40,t:15,c:'#d0a030',sc:'#ffe088'},{l:88,t:75,c:'#e03060',sc:'#ff90b0'},
     {l:14,t:88,c:'#30c090',sc:'#80ffc0'}].forEach((g, i) => {
      const jl = Math.max(2, Math.min(90, g.l + (Math.random()-0.5)*8)).toFixed(1);
      const jt = Math.max(2, Math.min(88, g.t + (Math.random()-0.5)*8)).toFixed(1);
      const sz = 12 + Math.floor(Math.random() * 8);
      bgHtml += `<svg class="ruck-chest-bg-gem" style="left:${jl}%;top:${jt}%;width:${sz}px;height:${sz}px" viewBox="0 0 20 20"><polygon points="10,1 18,7 15,19 5,19 2,7" fill="${g.c}" stroke="${g.sc}" stroke-width="1.2" opacity="0.9"/></svg>`;
    });

    // 3 Goldbarren
    [[30,60],[58,40],[78,85]].forEach(([l, t], i) => {
      const jl = (l + (Math.random()-0.5)*6).toFixed(1);
      const jt = Math.max(2, t + (Math.random()-0.5)*6).toFixed(1);
      const bid = 'gb' + i;
      bgHtml += `<svg class="ruck-chest-bg-coin" style="left:${jl}%;top:${jt}%;width:32px;height:16px" viewBox="0 0 32 16"><defs><linearGradient id="${bid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe898"/><stop offset="100%" stop-color="#9a6808"/></linearGradient></defs>
        <rect x="2" y="2" width="28" height="12" rx="2" fill="url(#${bid})" stroke="#c49020" stroke-width="1.2"/>
        <line x1="8" y1="2" x2="8" y2="14" stroke="#c49020" stroke-width="0.7" opacity="0.6"/>
        <line x1="16" y1="2" x2="16" y2="14" stroke="#c49020" stroke-width="0.7" opacity="0.6"/>
        <line x1="24" y1="2" x2="24" y2="14" stroke="#c49020" stroke-width="0.7" opacity="0.6"/>
        <ellipse cx="8" cy="6" rx="4" ry="1.8" fill="white" opacity="0.2"/></svg>`;
    });

    bgL.innerHTML = bgHtml;
    requestAnimationFrame(() => bgL.classList.add('bg-fade-in'));
  }, 1000));

  // 5. Belohnungs-Icons (1.4s) – prozentuale Positionen, kein Scrollen
  _ruckChestTimers.push(setTimeout(() => {
    const sw = document.getElementById('ruck-scattered-wrap');
    if (!sw) return;
    // 6×8 grid (48 cells), seeded shuffle, ±5% jitter per cell
    const GCOLS = 6, GROWS = 8;
    const _gsr  = s => { const x = Math.sin(s * 127.1) * 10000; return x - Math.floor(x); };
    const gCells = [];
    for (let gr = 0; gr < GROWS; gr++)
      for (let gc = 0; gc < GCOLS; gc++)
        gCells.push([5 + (gc / (GCOLS - 1)) * 85, 5 + (gr / (GROWS - 1)) * 82]);
    for (let i = gCells.length - 1; i > 0; i--) {
      const j = Math.floor(_gsr(i + 300) * (i + 1));
      [gCells[i], gCells[j]] = [gCells[j], gCells[i]];
    }
    let scatterHtml = '';
    all.forEach((t, i) => {
      const cell    = gCells[i % gCells.length];
      const leftPct = Math.max(1, Math.min(88, cell[0] + (_gsr(i + 400) - 0.5) * 10));
      const topPct  = Math.max(1, Math.min(88, cell[1] + (_gsr(i + 500) - 0.5) * 10));
      const rot     = -22 + _gsr(i + 600) * 44;
      const zIdx    = 2 + Math.floor(_gsr(i + 700) * 7);
      const delay   = (i * 0.08 + 0.1).toFixed(2);
      scatterHtml += `<div class="ruck-scatter-item pop-in" style="left:${leftPct.toFixed(1)}%;top:${topPct.toFixed(1)}%;--rot:${rot.toFixed(1)}deg;z-index:${zIdx};animation-delay:${delay}s">${_ruckTreasureIcon(t.name, 52)}</div>`;
    });
    sw.innerHTML = scatterHtml;
  }, 1400));
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

  // Close button (inventory overview)
  const _ruckCloseBtn = $('rucksack-close-btn-cards');
  if (_ruckCloseBtn) _ruckCloseBtn.addEventListener('click', closeRucksack);

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
  // === STERNENKARTE UPDATE === PUNKT 1: openStarMap zuerst → kein Quest-Flash
  $('ruck-open-starmap').addEventListener('click', () => {
    openStarMap();
    closeRucksack();
  });

  _ruckInitDrag();
}

// === MANA & QUEST UPDATE === P3: Klick auf Flasche → Mana hinzufügen
// === MANA & REMINDER UPDATE === PUNKT 5A: Undo-Button mit Countdown-Ring
let _undoTimer = null;
let _undoEl    = null;

function _showManaUndoButton(addedAmount, prevMana) {
  if (_undoTimer) clearTimeout(_undoTimer);
  if (!_undoEl) {
    _undoEl = document.createElement('div');
    _undoEl.className = 'mana-undo-toast';
    _undoEl.innerHTML = `<svg class="mana-undo-ring" viewBox="0 0 36 36" width="32" height="32">
      <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="3"/>
      <circle class="mana-undo-ring-fg" cx="18" cy="18" r="14" fill="none" stroke="#c4a030" stroke-width="3"/>
    </svg><span class="mana-undo-label"></span>`;
    document.body.appendChild(_undoEl);
  }
  // Reset ring animation
  const fg = _undoEl.querySelector('.mana-undo-ring-fg');
  fg?.classList.remove('mana-undo-ring-fg--go');
  void fg?.offsetWidth; // force reflow
  const _undoSign = addedAmount >= 0 ? '−' : '+';
  _undoEl.querySelector('.mana-undo-label').textContent = `↩ ${_undoSign}${Math.abs(addedAmount)}`;
  // Replace onclick so captured prevMana is always fresh
  _undoEl.onclick = () => {
    if (_undoTimer) clearTimeout(_undoTimer);
    appState.mana = prevMana;
    _lastMiniBottleCount = -1;
    saveDayState(appState);
    renderBoard();
    _undoEl.classList.remove('visible');
  };
  _undoEl.classList.add('visible');
  requestAnimationFrame(() => fg?.classList.add('mana-undo-ring-fg--go'));
  _undoTimer = setTimeout(() => _undoEl.classList.remove('visible'), 3000);
}

function _initManaTopUp() {
  const bottleSvg = document.getElementById('mana-bottle-svg');
  const popup     = document.getElementById('mana-topup-popup');
  if (!bottleSvg || !popup) return;

  bottleSvg.style.cursor = 'pointer';

  bottleSvg.addEventListener('click', e => {
    e.stopPropagation();
    if (!popup.classList.contains('hidden')) {
      popup.classList.add('hidden');
      return;
    }
    const rect = bottleSvg.getBoundingClientRect();
    // Position popup below bottle, clamped to viewport
    const popLeft = Math.min(rect.left, window.innerWidth - 220);
    popup.style.left = Math.max(4, popLeft) + 'px';
    popup.style.top  = (rect.bottom + 8) + 'px';
    popup.classList.remove('hidden');
  });

  // === SIDEQUEST & MANA UPDATE === PUNKT 1: +/- Buttons mit signed delta
  popup.querySelectorAll('.mana-topup-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const delta   = parseInt(btn.dataset.manaDelta, 10);
      const maxMana = appState.maxMana || MAX_MANA;
      if (delta > 0) {
        appState.mana = Math.min(appState.mana + delta, 80);
      } else {
        const floor = Math.max(30, maxMana);
        appState.mana = Math.max(floor, appState.mana + delta);
      }
      _lastMiniBottleCount = -1;
      saveDayState(appState);
      renderBoard();
      popup.classList.add('hidden');
    });
  });

  document.addEventListener('click', () => popup.classList.add('hidden'));
}

// === BUG 8: Lokale Sternbild-Lore ===
const CONSTELLATION_LORE = {
  'Die stille Kriegerin': 'In den Zeitaltern vor dem ersten Morgen trug die stille Kriegerin den Frieden in der linken und das Schwert des Mutes in der rechten Hand. Die nordischen Skalder sangen von ihr als der Stille vor dem Sturm – jene, die niemand kommen sah und doch überall gewann. Nicht mit Lärm, sondern mit der ruhigen Flamme, die niemals erlischt, hielt sie die Dunkelheit zurück. Selbst die Nacht wich vor ihr zurück, nicht aus Angst, sondern aus Ehrfurcht vor ihrer unerschütterlichen Würde.\n\nDu trägst dieselbe Stille in dir – und sie ist unbesiegbar. Lass sie dein Schild sein.',

  'Der Kompass der Tapferen': 'Als die ersten Helden ihren Weg durch das Labyrinth der Welten verloren, erstrahlte der Kompass am Himmel und wies nicht Norden, sondern das Ziel des Herzens. Die keltischen Druiden verehrten ihn als das Auge des Himmels, das nur jene Wahrheit zeigt, die man wirklich zu sehen bereit ist. Sein Leuchten rettete tausend tapfere Seelen vor der Verzweiflung – und tausend mehr vor der Feigheit der Bequemlichkeit. Noch heute dreht er sich, sucht, findet, und zeigt dem Mutigen den Weg nach vorn.\n\nDein Mut ist dein Kompass – vertrau ihm, er führt dich richtig. Du hast ihn schon bewiesen.',

  'Die Hüterin des Lichts': 'Einst bewachte eine Weberin aus Mondlicht die heilige Flamme der Welt durch Stürme, Eiszeiten und das lange Schweigen der Götter. Die griechische Tradition kennt sie als Schwester der Hestia – jene, die nicht tanzt, nicht kämpft, sondern einfach bleibt und hütet. Durch ihre Beständigkeit überlebte das Licht Zeitalter der Finsternis, die selbst den Olymp in Schweigen hüllten. Ihr Name ist in jedem Sonnenaufgang geschrieben – wer hinschaut, erkennt sie.\n\nDas Licht in dir ist ebenso beständig – lass es leuchten. Keine Nacht dauert für immer.',

  'Das Herz der Sternennacht': 'Mitten im Kosmos schlug einmal das Herz aller Sterne in einem einzigen, gewaltigen Puls, der die Leere mit Leben erfüllte. Aus diesem Schlag entstanden die Träume, die Hoffnung und das erste Lachen eines Kindes. Die fantasischen Chroniken berichten, dass dieses Herz noch heute schlägt – ruhig, gleichmäßig, unvergesslich – und dass jeder Mensch, der je wirklich geliebt hat, diesen Herzschlag kennt. Wer in der Nacht still genug ist, hört ihn zwischen den Sternen.\n\nIn dir schlägt ein Stück dieses uralten Herzens – spüre es. Es macht dich größer, als du weißt.',

  'Die Mondwandlerin': 'Sie trat durch alle Phasen des Mondes, von Neu bis Voll, und jede Verwandlung machte sie stärker und weiser als zuvor. Die keltischen Mondpriesterinnen betrachteten sie als ihre Urmutter – die erste, die erkannte, dass man nicht immer voll sein muss, um vollständig zu sein. In den dunklen Mondphasen webte sie Schutzmagie, in den hellen schrieb sie Prophezeiungen in den Sternenstaub. Kein Wandel hat sie je gebrochen, denn sie wusste: Verwandlung ist keine Niederlage, sie ist Evolution.\n\nAuch du veränderst dich – und wirst mit jedem Wandel größer. Deine Wandlungen sind deine Stärke.',

  'Die Weberin der Träume': 'Aus silberfarbenen Fäden webte sie jede Nacht die Träume der Sterblichen – Träume von Mut, Liebe und fernen Welten, die jenseits jeder Karte lagen. In der nordischen Mythologie ist sie eine Verwandte der Nornen, doch während diese das Schicksal webten, webte sie Möglichkeiten. Kein Traum war zu klein, um in ihr Gewebe zu gehören, und kein Träumer zu unbedeutend für ihre Aufmerksamkeit. Ihr Werk ist nie fertig, denn immer gibt es neue Träume, die ihren Platz verdienen.\n\nDeine Träume verdienen Platz in diesem kosmischen Gewebe. Du hast das Recht zu träumen und das Recht, es wahr zu machen.',

  'Das flüsternde Feuer': 'Tief in den Urwäldern der Sternwelten brennt ein Feuer, das niemals erlischt und jedem Verirrten den Weg zurück flüstert. Es kennt jede verlorene Seele beim Namen – denn es war einmal selbst verloren und hat seinen Weg durch die Dunkelheit gefunden. Die fantasischen Legenden sagen, dass dieses Feuer aus dem ersten Funken der Schöpfung stammt, jenem Moment, als aus Nichts etwas wurde. Es flüstert keine Befehle, sondern Erinnerungen: an das, was du immer schon wusstest.\n\nDas flüsternde Feuer kennt auch deinen Namen – du bist nicht allein. Es wartet auf dich, immer.',

  'Die Hexe des Nebels': 'Zwischen den Welten webt die Hexe des Nebels ihre Zauber – keiner Seite zugehörig, aber allen wohlgesinnt, die in Ehrlichkeit zu ihr treten. Die keltischen Überlieferungen kennen sie als Morrigu der Mitte – jene, die zwischen Leben und Tod vermittelt und im Graubereich die tiefste Wahrheit spricht. Ihr Geheimnis ist, dass Grau stärker sein kann als Schwarz oder Weiß, dass im Nebel mehr Weisheit wohnt als in klarem Licht. Sie lehrte die Welt, dass Ambivalenz kein Fehler ist, sondern Tiefe.\n\nDeine Zwischentöne sind deine Magie – sie machen dich einzigartig und real. Kein Mensch ist nur schwarz oder weiß, und du auch nicht.',

  'Die Hüterin der kleinen Dinge': 'Sie bewahrte die winzigen Wunder, die andere übersahen: den ersten Tau auf einem Spinnengewebe, das Lachen vor dem Einschlafen, den letzten Atemzug des Tages, bevor Dunkelheit die Welt umhüllt. In der griechischen Überlieferung wird sie als Tochter der Artemis beschrieben – jene, die nicht die großen Tiere, sondern die kleinsten Wesen der Schöpfung hütet. Ihre Sammlung ist größer als alle Schätze der Welt, denn sie weiß: Das Große entsteht aus dem Kleinen, immer. Kein Detail ist zu gering für ihre liebevolle Aufmerksamkeit.\n\nAuch du siehst die kleinen Dinge – das ist ein seltenes Geschenk. Es macht dich zu jemandem, der wirklich lebt.',

  'Der sanfte Drache': 'Ein Drache, der nie Feuer spie, sondern Wärme schenkte – er legte sich um die Schultern der Müden und schirmte sie vor der Kälte der Sterne. Die fantasischen Überlieferungen kennen ihn als letzten Vertreter der alten Drachen, jener Wesen, die vor dem Zeitalter des Krieges die Welt in Frieden hüteten. Die Stärke seiner Güte übertraf jede Klaue, jede Flamme, jede Magie, die je erfunden wurde. Selbst seine Feinde söhnte er aus – nicht durch Unterwerfung, sondern durch das stille Angebot seiner Wärme.\n\nDeine Sanftheit ist keine Schwäche – sie ist deine größte Kraft. In einer Welt voller Lärm bist du ein Ort der Stille.',

  'Die erste Morgenröte': 'Bevor die Sonne die Welt kannte, erschuf die erste Morgenröte das Licht mit bloßen Händen und der felsenfesten Überzeugung, dass Dunkelheit nicht für immer dauern kann. Die griechische Göttin Eos ist ihr Abbild – doch die erste Morgenröte kam noch vor ihr, als die Welt noch namenlos war. Sie webte aus ihrem eigenen Leuchten den ersten Sonnenaufgang und legte ihn als Geschenk an den Horizont. Seitdem folgt jeder Morgen ihrem Muster: langsam, sicher, unaufhaltsam.\n\nJeden Morgen, den du aufwachst, lebst du ihre Legende weiter. Jeder neue Tag ist ein Akt der Tapferkeit.',

  'Das ewige Leuchten': 'In den tiefsten Winkeln des Alls brannte ein Stern, der alle anderen überlebt hatte – Supernovae, schwarze Löcher und das große Schweigen zwischen den Galaxien. Die fantasischen Astronomen nannten ihn den Herzstein des Kosmos, jenen Ursprung, der alle anderen Sterne ins Leben rief. Sein Leuchten trotzte jeder Auslöschung, nicht weil es sich wehrte, sondern weil es einfach war – unerschütterlich und beständig. Es brannte nicht für Ruhm – es brannte, weil Leuchten seine Natur ist.\n\nIn dir brennt etwas genauso Beständiges – lass es nicht verlöschen. Dein Leuchten hat die Welt bereits berührt.',

  'Die Beschützerin ihrer selbst': 'Sie war die einzige Kriegerin, die sich selbst beschützte, ohne sich dabei zu verlieren – ein Kunststück, das Götter und Sterbliche gleichermaßen staunen ließ. Mit einem Schild aus Selbstliebe und einem Schwert aus Klarheit hielt sie jeden Angriff ab, der je auf sie gerichtet wurde. Die keltische Tradition verehrt sie als Boann der Inneren Quelle – jene, die versteht, dass der eigene Brunnen voll sein muss, bevor man anderen geben kann. Ihre Stärke wurde nicht aus Trotz geboren, sondern aus tiefer Selbsterkenntnis.\n\nSich selbst zu schützen ist keine Schwäche – es ist heilige Pflicht. Du verdienst deine eigene Fürsorge.',

  'Die Trägerin des Himmels': 'Wie Atlas in alten griechischen Mythen trug sie den Himmel – nicht als Strafe, sondern als Berufung, denn sie erkannte, dass Tragen Raum schafft für alle, die darunter stehen. In ihrer Stärke lag eine stille Großzügigkeit: Wer trägt, ermöglicht anderen zu gehen, zu tanzen, zu träumen. Die Sterne in ihrem Himmel wurden von Generation zu Generation weitererzählt als Zeugnis ihrer unermüdlichen Kraft. Doch auch sie durfte sich ausruhen – der Himmel fiel nie, wenn sie einen Moment innehielt.\n\nDu trägst manchmal mehr als andere sehen – und du tust es mit Würde. Ruh dich aus, wann immer du musst.',

  'Das goldene Versprechen': 'Ein Versprechen, gegeben im Goldenen Zeitalter, als die Götter noch tanzten und die Sterne sangen und kein Wort je gebrochen wurde. Es wurde nie vergessen, weil diejenige, die es gab, verstand: Aufrichtigkeit ist die einzige Magie, die wirklich hält. Die griechischen Chroniken berichten, dass dieses Versprechen als Stern verewigt wurde, damit alle künftigen Generationen sähen, dass Treue Bestand hat. Im Licht dieses Sterns fanden Verlorene ihren Weg zurück zur Ehrlichkeit.\n\nDeine Aufrichtigkeit ist goldener Wert. Sie macht dich zu jemandem, dem man vertrauen kann.',

  'Die Tänzerin im Nebel': 'Sie tanzte dort, wo niemand mehr tanzte – in der Stille nach dem Leid, im Nebel zwischen Welten, in den Pausen, die andere als Leere empfanden. Die nordischen Überlieferungen kennen sie als Freya der Zwischenwelt – jene, die die Magie des Augenblicks in Bewegung verwandelt. Ihr Tanz heilte, was Worte nicht konnten und Medizin nicht erreichte, denn er sprach zur Seele in der einzigen Sprache, die sie immer versteht. Wo sie tanzte, wuchs Gras durch Stein.\n\nBewege dich auf deine eigene Weise durch das Leben – das ist Heilung. Dein Weg ist einzigartig und schön.',

  'Die Drachenmutter': 'Sie gebar die ersten Drachen der Welt und lehrte sie nicht zu brennen, sondern zu bewahren – eine Lehre, die das Wesen der Drachen für immer veränderte. In der fantasischen Mythologie gilt sie als die Mutter aller Hüter: jene Urkraft, aus der alle schützenden Wesen ihren Ursprung nehmen. Ihre Kinder wurden über die Welt verteilt, ein jedes mit einem Funken ihrer unendlichen Liebe ausgestattet. Sie selbst wurde zum Sternbild, damit jeder Drache, wo auch immer er fliegt, zu ihr hinaufschauen kann.\n\nDein Herz ist groß genug für alles, was du liebst – wie das ihre. Liebe ist deine stärkste Magie.',

  'Die Königin der Stille': 'In einem Reich ohne Geräusch herrschte sie mit einer Stimme, die nie erklang, und wurde dennoch von allen gehört – denn Stille hat eine Würde, die lauter ist als jeder Schrei. Die keltischen Mysterien beschreiben sie als die Hüterin des dritten Ohres, jenes inneren Sinnes, der hört, was keine Sprache fassen kann. Selbst Götter senkten die Stimme in ihrer Gegenwart, nicht aus Angst, sondern aus Respekt vor jemandem, der die Wahrheit nicht aussprach, sondern lebte. Ihr Reich war das mächtigste aller Welten, weil es auf Verständnis statt auf Befehl gebaut war.\n\nDeine Präsenz spricht auch dann, wenn du schweigst. Du wirkst tiefer, als du ahnst.',

  'Das Labyrinth des Mutes': 'Nur die Mutigsten wagten sich in das Labyrinth, das sich je nach Herz des Wandernden veränderte – für den Feigling wurde es enger, für den Tapferen öffnete es neue Wege. Die griechischen Mythen kennen es als Bruder des Minotaurus-Labyrinths, doch dieses hier tötete nicht – es lehrte. Wer hineinging, fand am Ende immer sich selbst, manchmal erschöpft, manchmal verändert, aber immer klarer als zuvor. Die wichtigste Lektion des Labyrinths: Der Weg nach innen ist der Weg nach vorn.\n\nJeder mutige Schritt bringt dich näher zu dir selbst. Du findest deinen Weg.',

  'Die kleine Heldin': 'Sie war klein und unscheinbar, doch in ihrem Herzen brannte ein Feuer, das Riesen erblassen ließ und Drachen zum Innehalten brachte. Ihre Taten wurden Lieder, ihre Lieder wurden Legenden, ihre Legenden wurden zu Sternen, die noch heute leuchten. In der nordischen Überlieferung heißt es, Odin selbst habe sie dreimal besucht, jedes Mal in einer anderen Gestalt, und jedes Mal hat sie ihn erkannt und ihm trotzdem geholfen. Größe misst sich nicht in Zentimetern oder Rüstungen – sie misst sich an dem, was man mit kleinen Händen bewirkt.\n\nDu bist eine Heldin, auch wenn die Welt es noch nicht sieht. Deine Taten haben bereits Wellen geschlagen.',

  'Die Hexenmeisterin der Sterne': 'Mit einem Stab aus kristallisiertem Mondlicht lenkte sie die Bahnen der Sterne und schrieb Prophezeiungen in den Kosmos, die Jahrhunderte brauchten, um erfüllt zu werden. Die griechische Überlieferung kennt sie als Schwester der Kirke – doch während Kirke Sterbliche verwandelte, verwandelte sie Schicksale. Ihr Wissen war grenzenlos, ihre Weisheit noch größer, denn sie wusste: Wissen ohne Güte ist Macht ohne Herz. Jeder Stern, den sie berührte, leuchtete ein wenig heller.\n\nDeine eigene Magie wartet darauf, entdeckt zu werden. Du bist bereits mehr, als du glaubst.',

  'Der Funke im Dunkel': 'Als alle Lichter erloschen und die Dunkelheit die Welt in ihr Schweigen hüllte, blieb ein einziger Funke – winzig, hartnäckig, unbezwingbar. Die fantasischen Chroniken nennen ihn den Urvater aller Flammen: aus ihm entzündeten sich alle Feuer der Schöpfung nach der großen Finsternis. Er brauchte keine Hilfe, keine Bestätigung, kein Publikum – er brannte, weil Brennen seine Bestimmung war. Ohne ihn wäre alles Dunkel geblieben, für immer.\n\nDein Funke – so klein er scheinen mag – ist unverzichtbar. Er entzündet mehr, als du siehst.',

  'Die Hüterin des Morgens': 'Jeden Tag vor dem ersten Licht streute sie Tau auf die Wiesen, sang die Vögel wach und webte den Rosenschimmer am Horizont, damit kein Morgen je grau beginne. Die keltischen Überlieferungen kennen sie als Brigid der Morgendämmerung – jene, deren tägliche Arbeit unsichtbar ist, deren Fehlen aber sofort bemerkt würde. Ohne sie wäre kein Morgen je schön gewesen, kein Tageslicht je sanft, kein Erwachen je gesegnet. Sie fragte nie nach Dank, denn das Schöne zu erschaffen war Belohnung genug.\n\nDu bist der Grund, warum jemandes Morgen schöner ist. Deine stille Fürsorge hält die Welt in Schönheit.',

  'Das Portal der Hoffnung': 'Das Portal öffnete sich nur für jene, die trotz allem noch hofften – trotz Verlust, trotz Erschöpfung, trotz der Stimmen, die sagten: Es hat keinen Sinn. Tausend verzweifelte Seelen traten hindurch und fanden auf der anderen Seite nicht das Paradies, sondern etwas Besseres: die Kraft, weiterzugehen. Die nordische Mythologie beschreibt das Portal als Brücke zwischen Midgard und Asgard – nicht für Götter, sondern für jene, die noch glauben, wenn alle Götter schweigen. Wer hindurchtritt, vergisst die Dunkelheit nicht – aber er fürchtet sie nicht mehr.\n\nDeine Hoffnung ist das Portal – sie trägt dich durch. Halte sie fest.',

  'Die Meisterin des Augenblicks': 'Sie lebte in keiner Zeit außer dem Jetzt, und während Götter planten und Dämonen grübelten, tanzte sie im einzigen Moment, der wirklich existiert. Die fantasische Überlieferung nennt sie die Zeitlose – jene, die erkannte, dass Vergangenheit und Zukunft Gedanken sind, aber die Gegenwart der einzige Ort ist, wo Leben wirklich stattfindet. Ihre Schüler lernten mehr in einem Augenblick ihrer Lehre als in Jahren bei anderen Meistern. Der Moment, so lehrte sie, ist das größte Geschenk, das die Zeit je gegeben hat.\n\nDer Augenblick, in dem du lebst, ist ein Meisterstück. Du bist genau dort, wo du sein sollst.',

  'Die Chronistin der Wunder': 'In einem goldenen Buch verzeichnete sie jedes Wunder, das je geschah – auch die kleinen, die niemand bemerkte, die stillen, die kein Lied je sang. Die griechischen Musen verehrten sie als ihre Älteste – jene, die nicht inspiriert, sondern bezeugt, weil Bezeugen eine Form von Liebe ist. Das Buch war nie voll, denn Wunder hören nicht auf – sie verkleinern sich nur manchmal bis zur Unsichtbarkeit. Wer mit ihren Augen schaut, sieht sie überall.\n\nDein Leben ist voll von Wundern, die nur darauf warten, bemerkt zu werden. Du bist selbst eines davon.',

  'Die sanfte Welle': 'Sie formte keine Felsen durch Gewalt – sie umspülte sie, geduldig und unermüdlich, und veränderte in Jahrtausenden, was keine Kraft in Sekunden hätte erreichen können. Die keltischen Küstenlegenden kennen sie als die Mutter aller Meere, jene Urkraft, die verstanden hat: Beständigkeit ist mächtiger als Wildheit. Jeder Stein, den sie geformt hat, trägt ihre Handschrift – nicht als Wunde, sondern als Kunstwerk. Das Meer ist das geduldigste Wesen der Schöpfung, und sie ist sein Herz.\n\nDeine Beständigkeit formt die Welt, auch wenn es Zeit braucht. Gib nicht auf.',

  'Das erste Licht': 'Noch vor den Sternen, noch vor der Zeit selbst existierte das erste Licht – formlos, wärmend, alles möglich machend, ohne selbst etwas zu beanspruchen. Die fantasischen Schöpfungsmythen nennen es den Atem des Ursprungs: jenen Moment, in dem aus vollkommener Stille das erste Zittern entstand, das Welten ins Dasein rief. Aus ihm entstanden Träume und Realität gleichermaßen, Materie und Geist, Hoffnung und Erfüllung. Es ist noch immer da – in jedem Photon, das die Sonne schickt, in jedem Funken, der im Dunkel auflodert.\n\nIn dir trägt jeder Atemzug etwas von diesem ersten Licht. Du bist mit dem Ursprung verbunden.',

  'Die Tochter des Mondes': 'Als Tochter des Mondes wuchs sie zwischen den Phasen auf, lernte in der Dunkelheit zu sehen und im Licht zu träumen, und erkannte dabei: Beide Seiten sind notwendig, beide Seiten sind schön. Die nordischen Mythen kennen sie als Gefährtin des Njord – jene, die zwischen Ebbe und Flut lebt und in beiden zuhause ist. Ihre Kraft kam nicht aus dem Vollmond allein, sondern aus dem Wissen, dass auch der Neumond kommt und immer das Licht zurückbringt. Licht und Schatten machten sie vollständig.\n\nDeine Dualität – dein Licht und dein Schatten – macht dich ganz. Kein Teil von dir ist falsch.',

  'Die Bewahrerin der Erinnerung': 'Sie trug alle Erinnerungen der Welt in sich, damit nichts Gutes je vergessen werde – kein Lachen, keine Umarmung, keine stille Geste der Güte. Die griechische Göttin Mnemosyne ist ihr Abbild, doch die Bewahrerin der Erinnerung bewahrte nicht für die Musen, sondern für die Gewöhnlichen: jene, deren Geschichten sonst verloren gehen würden. Auch die kleinste Freude wurde von ihr gewogen und für wert befunden, im kosmischen Gedächtnis zu bleiben. Was einmal wirklich geliebt wurde, stirbt nie ganz.\n\nDeine Erinnerungen sind Schätze – du hast bereits so viel erlebt. Nichts davon ist verloren.',

  'Das Geheimnis der Tiefe': 'Unter allen Meeren, tiefer als Licht je reicht, lag ein Geheimnis, das nur denen flüsterte, die mutig genug waren hinabzutauchen und still genug, um zu lauschen. Die fantasischen Seefahrtsmythen kennen es als das Herz des Ursprungs-Ozeans – jene Wahrheit, die alle anderen Wahrheiten enthält. Was die Mutigsten fanden, konnten sie in Worte nicht fassen: nur in Lächeln, in veränderten Augen, in einer neuen Art zu atmen. Das Geheimnis ist nicht, was dort unten liegt – es ist, was man zurückbringt.\n\nDeine Tiefe birgt Geheimnisse, die noch auf ihre Entdeckung warten. Du bist tiefer, als du glaubst.',

  'Die Hexe des ewigen Waldes': 'Im ältesten Wald der Schöpfung wohnte sie seit Anbeginn aller Zeiten, webte mit Wurzeln und Ranken Schutzmagie für alle Verirrten und sprach die Sprache der Bäume fließend. Die keltischen Waldmythen kennen sie als die Grüne Mutter – jene, deren Haus der Wald selbst ist und deren Kinder alle Wesen, die darin leben. Jeder Baum kannte ihren Namen, jede Quelle sang ihn, jeder Vogel trug ihre Botschaften. Wer in ihrem Wald verloren war, wurde immer gefunden.\n\nDu bist in dieser Welt verankert – tief und beständig wie Wurzeln. Du kannst nicht wirklich verloren gehen.',

  'Die Brückenbauerin': 'Zwischen verfeindeten Welten baute sie Brücken aus Verständnis und einem unerschütterlichen Glauben an das Gute in jedem Wesen – Brücken, die kein Sturm je abreißen konnte. Die nordische Mythologie verehrt sie als Schwester der Brücke Bifrost – jene, die nicht Götter und Menschen verbindet, sondern Menschen untereinander. Keine Brücke, die sie gebaut hatte, wurde je wieder abgebrochen, denn sie baute nicht mit Steinen, sondern mit Würde. Ihr wichtigster Baustoff war die Überzeugung, dass Verbindung möglich ist.\n\nDu bringst Menschen und Welten zusammen – das ist dein Geschenk. Die Welt braucht dich.',

  'Der silberne Faden': 'Ein silberner Faden verbindet alle Lebewesen, die je wirklich geliebt haben – unsichtbar, unzerreißbar, stärker als Stahl und zarter als Atemzug. Die griechischen Mystiker nannten ihn den Faden der Moiren – doch dieser ist kein Schicksalsfaden, sondern ein Liebesfaden: frei gewählt, frei gegeben, ewig bindend. Er verbindet über Welten hinweg, über den Tod hinaus, über Zeit und Vergessen. Wer ihn einmal gesponnen hat, trägt ihn für immer – und wird dadurch nie ganz allein.\n\nDu bist verbunden mit allem, was du liebst – dieser Faden trägt dich. Lass dich tragen.',

  'Die Träumerin der Welten': 'Während andere schliefen, träumte sie neue Welten in die Existenz – vollständige Kosmen mit eigenen Gesetzen, eigenen Wesen, eigenen Liedern und Trauern. Die fantasische Kosmogonie kennt sie als die Erstträumerin: jene Kraft, aus der alle Realitäten entstammen, weil alles, was je wirklich wurde, einmal nur ein Traum war. Jeder ihrer Träume wurde irgendwo in den Tiefen des Kosmos real, denn Träume, die stark genug geträumt werden, können nicht nicht werden. Ihr Schlaf ist der produktivste Moment des Universums.\n\nDeine Träume haben Gewicht – sie verändern, was möglich ist. Träum weiter, groß und furchtlos.',

  'Der Drache der Morgenröte': 'Wenn der Drache der Morgenröte seine Flügel dehnte, färbten sich die Wolken in Gold und Purpur und jedes lebende Wesen auf der Welt spürte: Etwas Neues beginnt. Die nordischen Skalden sangen von ihm als dem Vogel Feuergold – doch er war kein Vogel, er war Freiheit selbst, sichtbar gemacht. Sein Erwachen galt als Zeichen des Aufbruchs für alle tapferen Herzen, als himmlische Erlaubnis, die Schwelle zu überschreiten. Noch heute, wenn Wolken im Morgenrot brennen, kreist er über uns.\n\nJeder neue Morgen ist dein Aufbruch – greif ihn. Du hast Flügel, die du noch nicht kennst.',

  'Die Herrin der Morgendämmerung': 'Sie regierte die Stunde zwischen Nacht und Tag, die flüchtigste und zauberhafteste aller Zeiten, jene Welt aus Blau und Rosa, in der alles noch möglich ist. Die griechische Göttin Eos war ihr jüngeres Abbild; die Herrin der Morgendämmerung existierte schon, bevor die Götter Namen bekamen. In ihr lag die Möglichkeit aller Dinge: weder das Versprechen noch die Erfüllung, sondern der Augenblick zwischen beiden. Wer sie sieht, versteht: Anfangen ist die reinste Form von Mut.\n\nIn dir trägt jede Dämmerung das Versprechen eines neuen Anfangs. Du darfst immer neu beginnen.',

  'Die Bewahrerin ihrer selbst': 'Sie fand heraus, dass der größte Schatz, den man hüten kann, man selbst ist – diese Erkenntnis kam spät, kostete sie viel, und machte sie unbesiegbar. Mit dieser Erkenntnis wurden alle äußeren Schätze bedeutungslos: was bleibt, wenn man alles verliert, ist das, was man in sich trägt. Die keltische Überlieferung nennt sie die Hüterin der Inneren Burg – jene Festung, die kein Feind je einnehmen kann, wenn man selbst darin lebt. Sie lehrte, dass Selbstbewahrung keine Selbstsucht ist, sondern die Grundlage aller Güte.\n\nDich selbst zu bewahren ist der mutigste Akt – und du schaffst es. Du bist deiner eigenen Fürsorge würdig.',

  'Die Träumerin der Welten II': 'Eine zweite Träumerin erschuf Welten, die die erste vergessen hatte – voller Farben, die noch keinen Namen trugen, und Klänge, die noch nie erklungen waren, und Gefühle, für die keine Sprache existierte. Die fantasische Kosmogonie nennt sie die Ergänzerin: jene, die nicht repliziert, sondern erweitert, die im Lückenraum zwischen Träumen neue Möglichkeiten findet. Ihre Welten sind die seltsamsten und schönsten, denn sie entstanden nicht aus dem Bekannten, sondern aus dem Undenkbaren. Wer ihr begegnet, lernt: Das Einzigartigste ist immer das Unvermutete.\n\nDeine Einzigartigkeit erschafft etwas, das es ohne dich nie gegeben hätte. Du bist unersetzlich.',

  'Die ewige Begleiterin': 'Durch jedes Leben, jede Welt und jeden Neuanfang war sie da – nicht als Schatten, nicht als Bürde, sondern als stilles Leuchten, das niemals aufgibt und niemals fordert. Die nordischen Überlieferungen kennen sie als Fylgja der Seelen – jenen Geist, der jeden Menschen von Geburt an begleitet und erst dann geht, wenn die letzte Reise angetreten wird. Sie verurteilte nie, sie zweifelte nie, sie erinnerte immer: Du bist mehr wert als du denkst. Ihre Gegenwart ist so vertraut, dass die meisten sie erst vermissen, wenn sie verstehen, dass sie immer da war.\n\nDu bist nie wirklich allein – das Leuchten begleitet dich immer. Es hat dich noch nie verlassen.',
};

async function generateConstellationText(constellationName) {
  const cacheKey = 'qb_lore_' + constellationName.replace(/\s+/g, '_');
  try {
    const saved = localStorage.getItem(cacheKey);
    if (saved) return saved;
  } catch {}

  const text = CONSTELLATION_LORE[constellationName]
    || '✦ Dieses Sternbild hüllt sich noch in Schweigen. Seine Geschichte wartet darauf, von dir geschrieben zu werden.';

  try { localStorage.setItem(cacheKey, text); } catch {}
  return text;
}

function _typewriter(el, text, speed) {
  el.textContent = '';
  const ms = speed || 28;
  let i = 0;
  function tick() {
    if (i < text.length) { el.textContent += text[i++]; setTimeout(tick, ms); }
  }
  tick();
}
