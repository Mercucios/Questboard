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

const REWARD_DESCRIPTIONS = {
  'Goldmünze':              'Geprägt im Feuer der Drachen',
  'Silbermünze':            'Blank poliert wie der Mond',
  'Bronzemünze':            'Geprägt aus altem Erz',
  'Eisenmünze':             'Hart wie der Wille des Kriegers',
  'Feuerstein':             'Funken des ersten Feuers',
  'Karneol':                'Stein des Mutes und der Kraft',
  'Citrin':                 'Sonnenstein der Händler',
  'Meeresperle':            'Aus den Tiefen des Ozeans',
  'Silberbarren':           'Reines Silber aus den Bergen',
  'Silberdolch':            'Scharf wie ein Eishauch',
  'Mithrilmünze':           'Seltenste aller Münzen',
  'Citrin-Geode':           'Sonne im Stein gefangen',
  'Rosenquarz-Geode':       'Stein der sanften Kräfte',
  'Aquamarin-Geode':        'Kristallisiertes Meerwasser',
  'Lavendel-Geode':         'Duft der Magie darin gefroren',
  'Meerschuppe':            'Von einem Wasserwesen gefallen',
  'Smaragdschliff':         'Meisterhaft geschliffener Stein',
  'Manakristall':           'Kristallisierte Magie',
  'Sternensplitter':        'Gefallen in einer stillen Nacht',
  'Mondstein':              'Erschaffen aus Mondlicht',
  'Rubin':                  'Flamme die nie erlischt',
  'Smaragd':                'Grün wie der ewige Wald',
  'Saphir':                 'Aus den Tiefen der Erde',
  'Amethyst':               'Stein der Weissagung',
  'Opal':                   'Tausend Farben in einem Stein',
  'Amethyst-Geode':         'Violette Kristallhöhle',
  'Smaragd-Geode':          'Herz des Waldgeistes',
  'Saphir-Geode':           'Blaue Kristallwunderkammer',
  'Rubin-Geode':            'Feuer im Stein',
  'Golddolch':              'Geschmiedet von Elfenhand',
  'Goldbarren':             '999 Au — reinsetes Gold',
  'Goldamulett':            'Trägt alten Schutzzauber',
  'Saphiramulett':          'Führt seinen Träger sicher heim',
  'Abyssstein':             'Licht aus der Tiefsee',
  'Diamant':                'Unvergängliche Reinheit',
  'Rosa Diamant':           'Einzigartiger Herzenstein',
  'Obsidian-Geode':         'Vulkanisches Glas im Innern',
  'Kristallkugel':          'Zeigt was kommen wird',
  'Pokal':                  'Symbol größter Leistung',
  'Drachenschuppe rot':     'Noch warm von der Flamme',
  'Drachenschuppe schwarz': 'Hart wie Dämonenstahl',
  'Drachenzahn':            'Gezogen aus lebendem Drachen',
  'Schattenkristall':       'Geformt aus reiner Dunkelheit',
  'Greifen-Kralle':         'Schärfer als jedes Schwert',
  'Drachen-Kralle':         'Stärker als Burgmauern',
  'Phönixfeder':            'Aus dem Feuer wiedergeboren',
  'Einhorn-Horn':           'Reinste Magie der Welt',
  'Drachenschuppe grün':    'Jahrtausend alte Magie darin',
  'Drachenei':              'Ein neues Leben schlummert darin',
};

const REWARDS = [
  { name: 'Goldmünze',              rarity: 'common',    restOnly: false },
  { name: 'Silbermünze',            rarity: 'common',    restOnly: false },
  { name: 'Bronzemünze',            rarity: 'common',    restOnly: false },
  { name: 'Eisenmünze',             rarity: 'common',    restOnly: false },
  { name: 'Feuerstein',             rarity: 'common',    restOnly: false },
  { name: 'Karneol',                rarity: 'common',    restOnly: false },
  { name: 'Citrin',                 rarity: 'common',    restOnly: false },
  { name: 'Meeresperle',            rarity: 'common',    restOnly: false },
  { name: 'Silberbarren',           rarity: 'common',    restOnly: false },
  { name: 'Silberdolch',            rarity: 'common',    restOnly: false },
  { name: 'Mithrilmünze',           rarity: 'uncommon',  restOnly: false },
  { name: 'Citrin-Geode',           rarity: 'uncommon',  restOnly: false },
  { name: 'Rosenquarz-Geode',       rarity: 'uncommon',  restOnly: false },
  { name: 'Aquamarin-Geode',        rarity: 'uncommon',  restOnly: false },
  { name: 'Lavendel-Geode',         rarity: 'uncommon',  restOnly: false },
  { name: 'Meerschuppe',            rarity: 'uncommon',  restOnly: false },
  { name: 'Smaragdschliff',         rarity: 'uncommon',  restOnly: false },
  { name: 'Manakristall',           rarity: 'uncommon',  restOnly: false },
  { name: 'Sternensplitter',        rarity: 'uncommon',  restOnly: true  },
  { name: 'Mondstein',              rarity: 'uncommon',  restOnly: true  },
  { name: 'Rubin',                  rarity: 'rare',      restOnly: false },
  { name: 'Smaragd',                rarity: 'rare',      restOnly: false },
  { name: 'Saphir',                 rarity: 'rare',      restOnly: false },
  { name: 'Amethyst',               rarity: 'rare',      restOnly: false },
  { name: 'Opal',                   rarity: 'rare',      restOnly: false },
  { name: 'Amethyst-Geode',         rarity: 'rare',      restOnly: false },
  { name: 'Smaragd-Geode',          rarity: 'rare',      restOnly: false },
  { name: 'Saphir-Geode',           rarity: 'rare',      restOnly: false },
  { name: 'Rubin-Geode',            rarity: 'rare',      restOnly: false },
  { name: 'Golddolch',              rarity: 'rare',      restOnly: false },
  { name: 'Goldbarren',             rarity: 'rare',      restOnly: false },
  { name: 'Goldamulett',            rarity: 'rare',      restOnly: false },
  { name: 'Saphiramulett',          rarity: 'rare',      restOnly: false },
  { name: 'Abyssstein',             rarity: 'rare',      restOnly: false },
  { name: 'Diamant',                rarity: 'epic',      restOnly: false },
  { name: 'Rosa Diamant',           rarity: 'epic',      restOnly: false },
  { name: 'Obsidian-Geode',         rarity: 'epic',      restOnly: false },
  { name: 'Kristallkugel',          rarity: 'epic',      restOnly: false },
  { name: 'Pokal',                  rarity: 'epic',      restOnly: false },
  { name: 'Drachenschuppe rot',     rarity: 'epic',      restOnly: false },
  { name: 'Drachenschuppe schwarz', rarity: 'epic',      restOnly: false },
  { name: 'Drachenzahn',            rarity: 'epic',      restOnly: false },
  { name: 'Schattenkristall',       rarity: 'epic',      restOnly: false },
  { name: 'Greifen-Kralle',         rarity: 'epic',      restOnly: false },
  { name: 'Drachen-Kralle',         rarity: 'epic',      restOnly: false },
  { name: 'Phönixfeder',            rarity: 'legendary', restOnly: false },
  { name: 'Einhorn-Horn',           rarity: 'legendary', restOnly: false },
  { name: 'Drachenschuppe grün',    rarity: 'legendary', restOnly: false },
  { name: 'Drachenei',              rarity: 'legendary', restOnly: false },
];
const REWARD_ICON_MAP = {
  'rubin': 'Rubin', 'smaragd': 'Smaragd', 'saphir': 'Saphir', 'amethyst': 'Amethyst',
  'geode': 'Amethyst-Geode', 'goldnugget': 'Goldbarren', 'zaubertrank': 'Manakristall',
  'drachenschuppe': 'Drachenschuppe grün', 'phoenixfeder': 'Phönixfeder',
  'mondstein': 'Mondstein', 'krone': 'Goldpokal', 'drachenzahn': 'Drachenzahn',
  'goldmuenze': 'Goldmünze', 'schluessel': 'Sternensplitter', 'kristallkugel': 'Kristallkugel',
  'zauberstab': 'Schattenkristall'
};
function getRandomReward(type) {
  const isRest = (type === 'rest');
  const pool = isRest
    ? REWARDS
    : REWARDS.filter(r => !r.restOnly);

  const weights = { common: 50, uncommon: 28, rare: 15, epic: 6, legendary: 1 };
  const weighted = [];
  pool.forEach(r => {
    const w = weights[r.rarity] || 1;
    for (let i = 0; i < w; i++) weighted.push(r);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
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

let _ruckIconSeq = 0;
function _ruckTreasureIcon(name, size) {
  const u = 'ri' + (++_ruckIconSeq);
  const s = size || 52;
  const W = `width="${s}" height="${s}" viewBox="0 0 54 54"`;
  const F = `<filter id="${u}f"><feDropShadow dx="1.5" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.65)"/></filter>`;
  const flt = `filter="url(#${u}f)"`;

  const wrap = c => `<svg ${W} xmlns="http://www.w3.org/2000/svg">${c}</svg>`;

  const rg = (id, cx, cy, r, stops) =>
    `<radialGradient id="${u}${id}" cx="${cx}%" cy="${cy}%" r="${r}%">${stops.map(([o,c]) => `<stop offset="${o}%" stop-color="${c}"/>`).join('')}</radialGradient>`;

  const lg = (id, x1, y1, x2, y2, stops) =>
    `<linearGradient id="${u}${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o,c]) => `<stop offset="${o}%" stop-color="${c}"/>`).join('')}</linearGradient>`;

  const coin = (c1, c2, c3, sym = '✦', sc = '#504000') => wrap(
    `<defs>${F}${rg('a',35,25,68,[[0,c1],[40,c2],[100,c3]])}</defs>` +
    `<circle cx="27" cy="27" r="22" fill="url(#${u}a)" stroke="${c2}" stroke-width="1.5" ${flt}/>` +
    `<circle cx="27" cy="27" r="16" fill="none" stroke="${c2}" stroke-width="0.7" opacity="0.5"/>` +
    `<text x="27" y="32" text-anchor="middle" font-size="14" fill="${sc}" opacity="0.85">${sym}</text>` +
    `<ellipse cx="18" cy="18" rx="7" ry="3.5" fill="white" opacity="0.4" transform="rotate(-25 18 18)"/>`
  );

  const gem6 = (c1, c2, c3, strokeC) => wrap(
    `<defs>${F}${rg('a',32,22,75,[[0,c1],[35,c2],[100,c3]])}</defs>` +
    `<polygon points="27,5 43,15 43,39 27,49 11,39 11,15" fill="url(#${u}a)" stroke="${strokeC}" stroke-width="0.5" ${flt}/>` +
    `<polygon points="27,5 41,13 41,35 27,43 13,35 13,13" fill="white" opacity="0.1"/>` +
    `<ellipse cx="18" cy="16" rx="6.5" ry="3.5" fill="white" opacity="0.45" transform="rotate(-20 18 16)"/>`
  );

  const gem5 = (c1, c2, c3) => wrap(
    `<defs>${F}${rg('a',32,22,75,[[0,c1],[35,c2],[100,c3]])}</defs>` +
    `<polygon points="27,5 45,18 40,42 14,42 9,18" fill="url(#${u}a)" ${flt}/>` +
    `<polygon points="27,5 41,16 37,38 17,38 13,16" fill="white" opacity="0.1"/>` +
    `<ellipse cx="18" cy="15" rx="6" ry="3.5" fill="white" opacity="0.45" transform="rotate(-20 18 15)"/>`
  );

  const geode = (c1, c2, strokeC) => wrap(
    `<defs>${F}</defs>` +
    `<ellipse cx="27" cy="30" rx="22" ry="18" fill="#7a6040" stroke="#5a3818" stroke-width="1.5" ${flt}/>` +
    `<ellipse cx="27" cy="28" rx="17" ry="14" fill="#08021a"/>` +
    `<polygon points="16,28 13,20 20,27" fill="${c1}" stroke="${strokeC}" stroke-width="0.5"/>` +
    `<polygon points="21,25 19,14 24,24" fill="${c2}" stroke="${strokeC}" stroke-width="0.5"/>` +
    `<polygon points="27,24 26,12 30,24" fill="${c1}" stroke="${strokeC}" stroke-width="0.5"/>` +
    `<polygon points="33,25 35,14 30,24" fill="${c2}" stroke="${strokeC}" stroke-width="0.5"/>` +
    `<polygon points="38,28 41,20 34,27" fill="${c1}" stroke="${strokeC}" stroke-width="0.5"/>` +
    `<ellipse cx="16" cy="20" rx="5.5" ry="2.5" fill="white" opacity="0.22" transform="rotate(-20 16 20)"/>`
  );

  const scale = (c1, c2, strokeC, tipC) => wrap(
    `<defs>${F}${rg('a',32,22,68,[[0,c1],[40,c2],[100,c2]])}</defs>` +
    `<path d="M27 7 Q37 17 38 30 Q38 44 27 48 Q16 44 16 30 Q16 17 27 7Z" fill="url(#${u}a)" stroke="${strokeC}" stroke-width="1" ${flt}/>` +
    `<path d="M27 7 L24 12 L27 10 L30 12 Z" fill="${tipC}" opacity="0.85"/>` +
    `<line x1="27" y1="9" x2="27" y2="46" stroke="rgba(255,255,255,0.18)" stroke-width="1.8"/>` +
    `<path d="M18 24 Q27 22 36 24" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>` +
    `<path d="M17 32 Q27 30 37 32" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>` +
    `<ellipse cx="18" cy="18" rx="5.5" ry="3" fill="white" opacity="0.35" transform="rotate(-10 18 18)"/>`
  );

  const ingot = (c1, c2, c3) => wrap(
    `<defs>${F}${lg('a','0','0','0','1',[[0,c1],[50,c2],[100,c3]])}</defs>` +
    `<rect x="8" y="17" width="38" height="20" rx="4" fill="url(#${u}a)" stroke="${c2}" stroke-width="1.2" ${flt}/>` +
    `<line x1="17" y1="17" x2="17" y2="37" stroke="${c2}" stroke-width="0.6" opacity="0.5"/>` +
    `<line x1="27" y1="17" x2="27" y2="37" stroke="${c2}" stroke-width="0.6" opacity="0.5"/>` +
    `<line x1="37" y1="17" x2="37" y2="37" stroke="${c2}" stroke-width="0.6" opacity="0.5"/>` +
    `<ellipse cx="16" cy="24" rx="5" ry="2.5" fill="white" opacity="0.28" transform="rotate(-10 16 24)"/>`
  );

  const claw = (c1, c2, glow) => wrap(
    `<defs>${F}${lg('a','0','0','1','1',[[0,c1],[55,c2],[100,c2]])}</defs>` +
    `<path d="M18 44 Q10 31 13 15 Q15 9 20 11 Q22 17 17 29 Q20 38 22 44 Z" fill="url(#${u}a)" stroke="${c2}" stroke-width="0.6" ${flt}/>` +
    `<path d="M27 46 Q24 30 25 11 Q26 6 28 6 Q30 9 29 23 Q29 36 30 46 Z" fill="url(#${u}a)" stroke="${c2}" stroke-width="0.6"/>` +
    `<path d="M36 44 Q44 31 41 15 Q39 9 34 11 Q32 17 37 29 Q34 38 32 44 Z" fill="url(#${u}a)" stroke="${c2}" stroke-width="0.6"/>` +
    `<path d="M19 44 Q22 48 27 49 Q32 48 35 44 L32 44 Q30 47 27 47 Q24 47 22 44 Z" fill="${c2}" opacity="0.8"/>` +
    `<ellipse cx="13" cy="18" rx="2.5" ry="5" fill="${glow}" opacity="0.3" transform="rotate(-15 13 18)"/>`
  );

  const icons = {
    // ── MÜNZEN ─────────────────────────────────────────────────────────
    'Goldmünze':    () => coin('#fffab0','#e4b030','#503808'),
    'Silbermünze':  () => coin('#f0f4ff','#c0c8e0','#404860','✦','#404860'),
    'Bronzemünze':  () => coin('#ffe8b0','#c87030','#4a2000','✦','#4a2000'),
    'Mithrilmünze': () => wrap(
      `<defs>${F}${rg('a',32,25,68,[[0,'#d8f0ff'],[35,'#60a8e0'],[70,'#1840a0'],[100,'#08103c']])}</defs>` +
      `<circle cx="27" cy="27" r="22" fill="url(#${u}a)" stroke="#80c0ff" stroke-width="1.5" ${flt}/>` +
      `<circle cx="27" cy="27" r="16" fill="none" stroke="#80c0ff" stroke-width="0.7" opacity="0.5"/>` +
      `<text x="27" y="32" text-anchor="middle" font-size="11" fill="#c0e8ff" opacity="0.9">ᛗ</text>` +
      `<ellipse cx="18" cy="18" rx="7" ry="3.5" fill="white" opacity="0.5" transform="rotate(-25 18 18)"/>`
    ),
    'Eisenmünze':   () => coin('#d8d8d8','#909090','#303030','✦','#303030'),

    // ── EDELSTEINE ─────────────────────────────────────────────────────
    'Rubin':    () => gem6('#ff9aaa','#e81e38','#500008','#ff6070'),
    'Smaragd':  () => gem6('#90ffaa','#12a852','#012a10','#50d870'),
    'Saphir':   () => gem5('#90d0ff','#1848d8','#040e50'),
    'Amethyst': () => gem6('#e8a0ff','#7820c8','#1e0448','#c060ff'),
    'Diamant':  () => wrap(
      `<defs>${F}${rg('a',32,22,70,[[0,'#f8f8ff'],[30,'#c8d8f8'],[65,'#8090c0'],[100,'#303060']])}</defs>` +
      `<polygon points="27,4 44,17 38,46 16,46 10,17" fill="url(#${u}a)" ${flt}/>` +
      `<polygon points="27,4 40,14 36,26 18,26 14,14" fill="white" opacity="0.2"/>` +
      `<line x1="27" y1="4" x2="16" y2="46" stroke="rgba(200,210,255,0.15)" stroke-width="1"/>` +
      `<line x1="27" y1="4" x2="38" y2="46" stroke="rgba(200,210,255,0.15)" stroke-width="1"/>` +
      `<ellipse cx="19" cy="15" rx="6" ry="3" fill="white" opacity="0.55" transform="rotate(-20 19 15)"/>`
    ),
    'Citrin':         () => gem6('#ffe868','#d08010','#503000','#e8a030'),
    'Opal':           () => wrap(
      `<defs>${F}${rg('a',40,35,65,[[0,'#f8f0ff'],[25,'#b0c8f8'],[55,'#80d8c0'],[100,'#504878']])}</defs>` +
      `<ellipse cx="27" cy="27" rx="20" ry="18" fill="url(#${u}a)" stroke="#c0b0e0" stroke-width="1" ${flt}/>` +
      `<ellipse cx="20" cy="21" rx="5" ry="3" fill="rgba(255,200,255,0.35)" transform="rotate(-20 20 21)"/>` +
      `<ellipse cx="33" cy="31" rx="4.5" ry="2.5" fill="rgba(140,255,200,0.3)" transform="rotate(15 33 31)"/>` +
      `<ellipse cx="18" cy="17" rx="6" ry="3" fill="white" opacity="0.4" transform="rotate(-25 18 17)"/>`
    ),
    'Karneol':        () => wrap(
      `<defs>${F}${rg('a',32,22,70,[[0,'#ffa878'],[35,'#e84020'],[70,'#a01808'],[100,'#380600']])}</defs>` +
      `<ellipse cx="27" cy="27" rx="20" ry="18" fill="url(#${u}a)" stroke="#e06030" stroke-width="1" ${flt}/>` +
      `<ellipse cx="18" cy="19" rx="7" ry="4" fill="white" opacity="0.4" transform="rotate(-20 18 19)"/>`
    ),
    'Smaragdschliff': () => wrap(
      `<defs>${F}${rg('a',32,22,70,[[0,'#90ffb0'],[30,'#12b852'],[65,'#047030'],[100,'#011e10']])}</defs>` +
      `<polygon points="14,13 40,13 46,21 46,33 40,41 14,41 8,33 8,21" fill="url(#${u}a)" ${flt}/>` +
      `<polygon points="14,13 40,13 44,20 44,34 40,41 14,41 10,34 10,20" fill="none" stroke="#60d880" stroke-width="0.6" opacity="0.4"/>` +
      `<ellipse cx="18" cy="20" rx="7" ry="4" fill="white" opacity="0.4" transform="rotate(-15 18 20)"/>`
    ),
    'Rosa Diamant':   () => wrap(
      `<defs>${F}${rg('a',32,22,70,[[0,'#ffe0f0'],[30,'#f080b8'],[65,'#b83080'],[100,'#500030']])}</defs>` +
      `<polygon points="27,4 44,17 38,46 16,46 10,17" fill="url(#${u}a)" ${flt}/>` +
      `<polygon points="27,4 40,14 36,26 18,26 14,14" fill="rgba(255,200,235,0.22)"/>` +
      `<ellipse cx="19" cy="15" rx="6" ry="3" fill="white" opacity="0.5" transform="rotate(-20 19 15)"/>`
    ),

    // ── GEODEN ─────────────────────────────────────────────────────────
    'Amethyst-Geode':   () => geode('#c060ff','#9030d0','#e0a0ff'),
    'Smaragd-Geode':    () => geode('#40d870','#10a840','#80ffb0'),
    'Saphir-Geode':     () => geode('#4090ff','#1050d0','#80c0ff'),
    'Citrin-Geode':     () => geode('#e8b020','#c08010','#ffe068'),
    'Rubin-Geode':      () => geode('#e82030','#a01018','#ff8090'),
    'Rosenquarz-Geode': () => geode('#f0a8c0','#d06090','#ffd0e8'),
    'Obsidian-Geode':   () => wrap(
      `<defs>${F}</defs>` +
      `<ellipse cx="27" cy="30" rx="22" ry="18" fill="#2a1020" stroke="#8040a0" stroke-width="1.5" ${flt}/>` +
      `<ellipse cx="27" cy="28" rx="17" ry="14" fill="#04000a"/>` +
      `<polygon points="16,28 13,20 20,27" fill="#a060d0" stroke="#c080ff" stroke-width="0.5"/>` +
      `<polygon points="21,25 19,14 24,24" fill="#600040" stroke="#c040a0" stroke-width="0.5"/>` +
      `<polygon points="27,24 26,12 30,24" fill="#180018" stroke="#8000a0" stroke-width="0.5"/>` +
      `<polygon points="33,25 35,14 30,24" fill="#600040" stroke="#c040a0" stroke-width="0.5"/>` +
      `<polygon points="38,28 41,20 34,27" fill="#a060d0" stroke="#c080ff" stroke-width="0.5"/>` +
      `<ellipse cx="16" cy="20" rx="5.5" ry="2.5" fill="white" opacity="0.18" transform="rotate(-20 16 20)"/>`
    ),
    'Aquamarin-Geode':  () => geode('#40d0c0','#0890a0','#80ffe0'),
    'Lavendel-Geode':   () => geode('#d0a0ff','#9060d0','#e8c8ff'),

    // ── DOLCHE ─────────────────────────────────────────────────────────
    'Silberdolch': () => wrap(
      `<defs>${F}${rg('a',30,22,70,[[0,'#e8f0f8'],[40,'#b0b8c8'],[100,'#505868']])}${rg('b',40,30,60,[[0,'#5a5a6a'],[100,'#2a2a3a']])}</defs>` +
      `<polygon points="12,12 15,9 42,38 40,41 38,40" fill="url(#${u}a)" ${flt}/>` +
      `<line x1="14" y1="12" x2="40" y2="38" stroke="rgba(255,255,255,0.35)" stroke-width="1.2"/>` +
      `<ellipse cx="31" cy="25" rx="8" ry="3.5" fill="#b0b8c8" stroke="#e8f0f8" stroke-width="0.8" transform="rotate(45 31 25)"/>` +
      `<path d="M35 29 Q46 42 44 47 Q41 49 39 46 L28 35 Z" fill="url(#${u}b)" stroke="#5a5a6a" stroke-width="0.8"/>` +
      `<circle cx="43" cy="45" r="4" fill="#b0b8c8" stroke="#e8f0f8" stroke-width="0.8"/>`
    ),
    'Golddolch': () => wrap(
      `<defs>${F}${rg('a',30,22,70,[[0,'#ffe898'],[40,'#c89020'],[100,'#7a4e08']])}${rg('b',40,30,60,[[0,'#8a5010'],[100,'#4a2800']])}</defs>` +
      `<polygon points="12,12 15,9 42,38 40,41 38,40" fill="url(#${u}a)" ${flt}/>` +
      `<line x1="14" y1="12" x2="40" y2="38" stroke="rgba(255,255,200,0.4)" stroke-width="1.2"/>` +
      `<ellipse cx="31" cy="25" rx="8" ry="3.5" fill="#c89020" stroke="#ffe898" stroke-width="0.8" transform="rotate(45 31 25)"/>` +
      `<path d="M35 29 Q46 42 44 47 Q41 49 39 46 L28 35 Z" fill="url(#${u}b)" stroke="#8a5010" stroke-width="0.8"/>` +
      `<circle cx="43" cy="45" r="4" fill="#c89020" stroke="#ffe898" stroke-width="0.8"/>`
    ),

    // ── BARREN ─────────────────────────────────────────────────────────
    'Goldbarren':   () => ingot('#ffe898','#c89020','#7a4e08'),
    'Silberbarren': () => ingot('#f0f4ff','#b0b8c8','#505868'),

    // ── POKALE ─────────────────────────────────────────────────────────
    'Pokal': () => wrap(
      `<defs>${F}${lg('a','0','0','0','1',[[0,'#e8c870'],[50,'#c09828'],[100,'#5a3800']])}</defs>` +
      `<path d="M16 11 Q12 24 16 34 Q20 44 27 46 Q34 44 38 34 Q42 24 38 11 Z" fill="url(#${u}a)" stroke="#d4b040" stroke-width="1.2" ${flt}/>` +
      `<path d="M16 15 Q8 17 8 24 Q8 31 16 31" fill="none" stroke="url(#${u}a)" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M38 15 Q46 17 46 24 Q46 31 38 31" fill="none" stroke="url(#${u}a)" stroke-width="4" stroke-linecap="round"/>` +
      `<rect x="20" y="46" width="14" height="4" rx="2" fill="url(#${u}a)" stroke="#d4b040" stroke-width="1"/>` +
      `<rect x="16" y="49" width="22" height="4" rx="2" fill="url(#${u}a)" stroke="#d4b040" stroke-width="1"/>` +
      `<text x="27" y="31" text-anchor="middle" font-size="12" fill="#ffe080" opacity="0.8">★</text>` +
      `<ellipse cx="20" cy="18" rx="4.5" ry="7" fill="white" opacity="0.2" transform="rotate(-10 20 18)"/>`
    ),
    'Goldpokal': () => wrap(
      `<defs>${F}${lg('a','0','0','0','1',[[0,'#ffe898'],[35,'#f0c040'],[65,'#c09028'],[100,'#5a3800']])}</defs>` +
      `<path d="M16 10 Q12 24 16 34 Q20 45 27 47 Q34 45 38 34 Q42 24 38 10 Z" fill="url(#${u}a)" stroke="#f0c040" stroke-width="1.5" ${flt}/>` +
      `<path d="M16 14 Q8 16 8 24 Q8 32 16 32" fill="none" stroke="url(#${u}a)" stroke-width="4.5" stroke-linecap="round"/>` +
      `<path d="M38 14 Q46 16 46 24 Q46 32 38 32" fill="none" stroke="url(#${u}a)" stroke-width="4.5" stroke-linecap="round"/>` +
      `<rect x="21" y="47" width="12" height="4" rx="2" fill="url(#${u}a)" stroke="#f0c040" stroke-width="1"/>` +
      `<rect x="17" y="50" width="20" height="3.5" rx="2" fill="url(#${u}a)" stroke="#f0c040" stroke-width="1"/>` +
      `<path d="M23 20 L24 13 L27 21 L30 13 L31 20 L27 18 Z" fill="#ffe080" opacity="0.9"/>` +
      `<ellipse cx="21" cy="17" rx="4.5" ry="7" fill="white" opacity="0.18" transform="rotate(-10 21 17)"/>`
    ),

    // ── AMULETTE ───────────────────────────────────────────────────────
    'Goldamulett': () => wrap(
      `<defs>${F}${rg('a',32,22,68,[[0,'#ffe898'],[35,'#d4a030'],[70,'#9a6808'],[100,'#4a2c00']])}</defs>` +
      `<polygon points="27,5 30,17 41,17 32,24 35,34 27,28 19,34 22,24 13,17 24,17" fill="url(#${u}a)" stroke="#f0c040" stroke-width="0.8" ${flt}/>` +
      `<circle cx="27" cy="20" r="5.5" fill="url(#${u}a)" stroke="#f0c040" stroke-width="0.8" opacity="0.85"/>` +
      `<text x="27" y="24" text-anchor="middle" font-size="7" fill="#ffe080">✦</text>` +
      `<ellipse cx="20" cy="12" rx="4" ry="2" fill="white" opacity="0.35" transform="rotate(-20 20 12)"/>`
    ),
    'Saphiramulett': () => wrap(
      `<defs>${F}${rg('a',32,22,68,[[0,'#ffe898'],[35,'#d4a030'],[70,'#9a6808'],[100,'#4a2c00']])}${rg('b',32,22,68,[[0,'#90d0ff'],[35,'#1848d8'],[100,'#040e50']])}</defs>` +
      `<polygon points="27,5 30,17 41,17 32,24 35,34 27,28 19,34 22,24 13,17 24,17" fill="url(#${u}a)" stroke="#f0c040" stroke-width="0.8" ${flt}/>` +
      `<circle cx="27" cy="20" r="5.5" fill="url(#${u}b)" stroke="#80b0ff" stroke-width="0.8"/>` +
      `<ellipse cx="24" cy="17" rx="2.5" ry="1.5" fill="white" opacity="0.45"/>` +
      `<ellipse cx="20" cy="12" rx="4" ry="2" fill="white" opacity="0.3" transform="rotate(-20 20 12)"/>`
    ),

    // ── KUGEL / PERLE ──────────────────────────────────────────────────
    'Kristallkugel': () => wrap(
      `<defs>${F}${rg('a',32,22,70,[[0,'#b080f0'],[35,'#3010a0'],[70,'#140460'],[100,'#04010e']])}${rg('b',28,20,45,[[0,'rgba(230,210,255,0.55)'],[100,'rgba(230,210,255,0)']])}</defs>` +
      `<circle cx="27" cy="24" r="20" fill="url(#${u}a)" ${flt}/>` +
      `<circle cx="27" cy="24" r="20" fill="url(#${u}b)"/>` +
      `<ellipse cx="27" cy="24" rx="16" ry="6" fill="none" stroke="#b070ff" stroke-width="0.7" opacity="0.4"/>` +
      `<ellipse cx="27" cy="24" rx="6" ry="16" fill="none" stroke="#b070ff" stroke-width="0.7" opacity="0.4"/>` +
      `<ellipse cx="18" cy="15" rx="7" ry="3.5" fill="white" opacity="0.45" transform="rotate(-25 18 15)"/>` +
      `<rect x="19" y="43" width="16" height="5" rx="2.5" fill="#28104a" stroke="#5020a0" stroke-width="0.8"/>`
    ),
    'Meeresperle': () => wrap(
      `<defs>${F}${rg('a',38,25,65,[[0,'#f8f8ff'],[25,'#d0e8f8'],[55,'#8ab0d0'],[100,'#304860']])}</defs>` +
      `<path d="M14 32 Q10 20 20 12 Q27 6 34 12 Q44 20 40 32 Q36 40 27 42 Q18 40 14 32Z" fill="#b8d0b0" stroke="#80a060" stroke-width="1" ${flt}/>` +
      `<path d="M15 31 Q14 24 20 18" fill="none" stroke="#a0b890" stroke-width="1" opacity="0.6"/>` +
      `<path d="M39 31 Q40 24 34 18" fill="none" stroke="#a0b890" stroke-width="1" opacity="0.6"/>` +
      `<circle cx="27" cy="28" r="10" fill="url(#${u}a)" stroke="#a0b8c8" stroke-width="0.8"/>` +
      `<ellipse cx="22" cy="23" rx="5" ry="3" fill="white" opacity="0.5" transform="rotate(-20 22 23)"/>`
    ),

    // ── PHÖNIXFEDER ────────────────────────────────────────────────────
    'Phönixfeder': () => wrap(
      `<defs>${F}${lg('a','0.2','0','0.8','1',[[0,'#ffe878'],[35,'#f06818'],[70,'#c02010'],[100,'#600008']])}</defs>` +
      `<path d="M27 5 Q35 11 38 20 Q42 29 36 35 Q32 39 27 41 Q22 39 20 35 Q16 29 18 20 Q20 11 27 5Z" fill="url(#${u}a)" ${flt}/>` +
      `<line x1="27" y1="7" x2="27" y2="39" stroke="#ffe890" stroke-width="1.2" opacity="0.5"/>` +
      `<line x1="27" y1="14" x2="18" y2="24" stroke="#ffe890" stroke-width="0.7" opacity="0.28"/>` +
      `<line x1="27" y1="18" x2="36" y2="27" stroke="#ffe890" stroke-width="0.7" opacity="0.28"/>` +
      `<ellipse cx="20" cy="14" rx="5.5" ry="2.5" fill="white" opacity="0.42" transform="rotate(-30 20 14)"/>` +
      `<path d="M24 41 L27 50 L30 41 Q28 44 27 44 Q26 44 24 41Z" fill="#f06818" opacity="0.7"/>`
    ),

    // ── DRACHENSCHUPPEN ────────────────────────────────────────────────
    'Drachenschuppe grün':    () => scale('#80ffa0','#0ea058','#1aaa58','#20c850'),
    'Drachenschuppe rot':     () => scale('#ffa080','#e02020','#d03020','#ff5030'),
    'Drachenschuppe schwarz': () => wrap(
      `<defs>${F}${rg('a',32,22,68,[[0,'#808090'],[35,'#303040'],[70,'#181820'],[100,'#040408']])}</defs>` +
      `<path d="M27 7 Q37 17 38 30 Q38 44 27 48 Q16 44 16 30 Q16 17 27 7Z" fill="url(#${u}a)" stroke="#5050a0" stroke-width="1" ${flt}/>` +
      `<path d="M27 7 L24 12 L27 10 L30 12 Z" fill="#6060c0" opacity="0.8"/>` +
      `<line x1="27" y1="9" x2="27" y2="46" stroke="rgba(100,100,180,0.25)" stroke-width="1.8"/>` +
      `<path d="M18 24 Q27 22 36 24" fill="none" stroke="rgba(100,100,160,0.3)" stroke-width="1"/>` +
      `<path d="M17 32 Q27 30 37 32" fill="none" stroke="rgba(100,100,160,0.3)" stroke-width="1"/>` +
      `<ellipse cx="18" cy="18" rx="5.5" ry="3" fill="rgba(150,150,200,0.3)" transform="rotate(-10 18 18)"/>`
    ),
    'Meerschuppe': () => scale('#80fff0','#0090a0','#00c0b0','#40e8d0'),

    // ── DRACHENZAHN ────────────────────────────────────────────────────
    'Drachenzahn': () => wrap(
      `<defs>${F}${lg('a','0.2','0','0.8','1',[[0,'#f4ecd8'],[40,'#d0b880'],[75,'#9a7848'],[100,'#5a4220']])}</defs>` +
      `<path d="M27 5 Q33 12 34 24 Q35 36 27 44 Q19 36 20 24 Q21 12 27 5Z" fill="url(#${u}a)" stroke="#a88850" stroke-width="1" ${flt}/>` +
      `<line x1="27" y1="7" x2="27" y2="42" stroke="rgba(255,255,220,0.3)" stroke-width="1.5"/>` +
      `<ellipse cx="20" cy="16" rx="5" ry="2.5" fill="white" opacity="0.4" transform="rotate(-20 20 16)"/>`
    ),

    // ── EINHORN-HORN ───────────────────────────────────────────────────
    'Einhorn-Horn': () => wrap(
      `<defs>${F}${lg('a','0','0','1','1',[[0,'#fff0ff'],[35,'#e8b0f8'],[70,'#9040c8'],[100,'#4008a0']])}</defs>` +
      `<polygon points="27,5 34,48 20,48" fill="url(#${u}a)" stroke="#d080ff" stroke-width="0.8" ${flt}/>` +
      `<path d="M24,44 Q26,32 25,22 Q26,14 27,7" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.8"/>` +
      `<path d="M30,44 Q28,32 29,22 Q28,14 27,7" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/>` +
      `<ellipse cx="21" cy="40" rx="4" ry="2" fill="white" opacity="0.28" transform="rotate(10 21 40)"/>`
    ),

    // ── MANAKRISTALL ───────────────────────────────────────────────────
    'Manakristall': () => wrap(
      `<defs>${F}${rg('a',32,22,70,[[0,'#a0e0ff'],[30,'#2060d0'],[65,'#0838a0'],[100,'#020e40']])}</defs>` +
      `<polygon points="27,5 35,14 35,40 27,49 19,40 19,14" fill="url(#${u}a)" stroke="#4090ff" stroke-width="0.8" ${flt}/>` +
      `<polygon points="27,12 32,18 32,36 27,42 22,36 22,18" fill="rgba(100,200,255,0.25)"/>` +
      `<circle cx="27" cy="27" r="4" fill="rgba(100,180,255,0.5)"/>` +
      `<ellipse cx="21" cy="19" rx="4" ry="6" fill="white" opacity="0.4" transform="rotate(15 21 19)"/>`
    ),

    // ── ABYSSSTEIN ─────────────────────────────────────────────────────
    'Abyssstein': () => wrap(
      `<defs>${F}</defs>` +
      `<ellipse cx="27" cy="27" rx="21" ry="21" fill="#04000c" stroke="#4010a0" stroke-width="1.5" ${flt}/>` +
      `<ellipse cx="27" cy="27" rx="15" ry="15" fill="#080018" stroke="#6010c0" stroke-width="0.8"/>` +
      `<text x="27" y="32" text-anchor="middle" font-size="16" fill="#8020e0" opacity="0.9">✦</text>` +
      `<circle cx="27" cy="27" r="5" fill="rgba(100,0,200,0.55)"/>` +
      `<ellipse cx="19" cy="18" rx="5.5" ry="2.5" fill="rgba(160,100,255,0.3)" transform="rotate(-25 19 18)"/>`
    ),

    // ── SCHATTENKRISTALL ───────────────────────────────────────────────
    'Schattenkristall': () => wrap(
      `<defs>${F}${rg('a',32,22,70,[[0,'#c0a0d0'],[30,'#401060'],[65,'#180830'],[100,'#060010']])}</defs>` +
      `<polygon points="27,4 37,14 40,30 32,46 22,46 14,30 17,14" fill="url(#${u}a)" stroke="#7030a0" stroke-width="0.8" ${flt}/>` +
      `<polygon points="27,10 34,18 36,28 30,40 24,40 18,28 20,18" fill="rgba(80,20,120,0.4)"/>` +
      `<ellipse cx="19" cy="17" rx="5.5" ry="3" fill="rgba(200,150,255,0.3)" transform="rotate(-15 19 17)"/>`
    ),

    // ── KRALLEN ────────────────────────────────────────────────────────
    'Greifen-Kralle': () => claw('#c8c0b0','#706050','rgba(255,255,200,0.25)'),
    'Drachen-Kralle': () => claw('#d06030','#802010','rgba(255,180,100,0.3)'),

    // ── STEINE ─────────────────────────────────────────────────────────
    'Feuerstein': () => wrap(
      `<defs>${F}${rg('a',40,30,65,[[0,'#ffe060'],[25,'#f08010'],[55,'#d03010'],[100,'#600810']])}</defs>` +
      `<ellipse cx="27" cy="27" rx="20" ry="20" fill="url(#${u}a)" stroke="#e06020" stroke-width="1" ${flt}/>` +
      `<ellipse cx="27" cy="27" rx="12" ry="12" fill="rgba(255,200,80,0.4)"/>` +
      `<circle cx="27" cy="27" r="5" fill="rgba(255,240,100,0.6)"/>` +
      `<ellipse cx="18" cy="18" rx="6.5" ry="3.5" fill="white" opacity="0.45" transform="rotate(-25 18 18)"/>`
    ),
    'Mondstein': () => wrap(
      `<defs>${F}${rg('a',32,22,70,[[0,'#f4f4ff'],[30,'#c0c8e8'],[65,'#8088b8'],[100,'#404870']])}</defs>` +
      `<ellipse cx="27" cy="27" rx="20" ry="22" fill="url(#${u}a)" stroke="#a0a8c8" stroke-width="1" ${flt}/>` +
      `<ellipse cx="21" cy="20" rx="6" ry="3" fill="white" opacity="0.4"/>` +
      `<ellipse cx="25" cy="30" rx="5" ry="2.5" fill="white" opacity="0.25"/>` +
      `<ellipse cx="32" cy="23" rx="4" ry="2" fill="rgba(90,90,160,0.35)"/>` +
      `<ellipse cx="16" cy="13" rx="5" ry="2.5" fill="white" opacity="0.5" transform="rotate(-15 16 13)"/>`
    ),
    'Sternensplitter': () => wrap(
      `<defs>${F}${rg('a',35,25,65,[[0,'#fffff0'],[25,'#f0e860'],[55,'#c0a020'],[100,'#604800']])}</defs>` +
      `<polygon points="27,4 31,17 44,14 35,24 48,28 35,32 42,44 28,36 24,50 20,36 6,44 14,32 2,28 17,24 6,14 23,17" fill="url(#${u}a)" stroke="#e0c030" stroke-width="0.6" ${flt}/>` +
      `<ellipse cx="20" cy="16" rx="5" ry="2.5" fill="white" opacity="0.5" transform="rotate(-20 20 16)"/>`
    ),
    'Drachenei': () => wrap(
      `<defs>${F}${rg('a',35,30,65,[[0,'#d0e8a0'],[30,'#7ab040'],[60,'#4a7820'],[100,'#182808']])}</defs>` +
      `<ellipse cx="27" cy="30" rx="18" ry="22" fill="url(#${u}a)" stroke="#6a9830" stroke-width="1.2" ${flt}/>` +
      `<ellipse cx="20" cy="22" rx="6" ry="4" fill="rgba(100,160,40,0.35)" stroke="rgba(80,130,30,0.5)" stroke-width="0.5"/>` +
      `<ellipse cx="32" cy="22" rx="6" ry="4" fill="rgba(100,160,40,0.35)" stroke="rgba(80,130,30,0.5)" stroke-width="0.5"/>` +
      `<ellipse cx="20" cy="34" rx="6" ry="4" fill="rgba(100,160,40,0.35)" stroke="rgba(80,130,30,0.5)" stroke-width="0.5"/>` +
      `<ellipse cx="32" cy="34" rx="6" ry="4" fill="rgba(100,160,40,0.35)" stroke="rgba(80,130,30,0.5)" stroke-width="0.5"/>` +
      `<ellipse cx="26" cy="28" rx="6" ry="4" fill="rgba(120,180,50,0.3)" stroke="rgba(80,130,30,0.5)" stroke-width="0.5"/>` +
      `<ellipse cx="20" cy="16" rx="7" ry="4" fill="white" opacity="0.3" transform="rotate(-15 20 16)"/>` +
      `<path d="M27 8 L25 16 L28 20 L26 26" fill="none" stroke="rgba(255,220,100,0.5)" stroke-width="1.2" stroke-linecap="round"/>`
    ),
  };

  // ── LOOKUP ────────────────────────────────────────────────────────


  const fn = icons[name];
  if (!fn) {
    return wrap(`<defs><radialGradient id="${u}x" cx="35%" cy="25%" r="70%"><stop offset="0%" stop-color="#d0a0ff"/><stop offset="100%" stop-color="#400080"/></radialGradient></defs><polygon points="27,5 43,15 43,39 27,49 11,39 11,15" fill="url(#${u}x)"/>`);
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

  const _rewardDisplayName = (reward && typeof reward === 'object')
    ? reward.name
    : ((reward && REWARD_ICON_MAP[reward]) || reward || '???');
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
      if (appState.quests.length !== before) saveDayState(appState);
  }
  // Sidequests (questboard_sidequests)
  try {
    const all      = JSON.parse(localStorage.getItem(STORE_SIDEQUESTS)) || [];
    const filtered = all.filter(sq => String(sq.id) !== id);
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

function showRewardPopup(reward) {
  if (!reward || !reward.name) return;
  const r = typeof reward === 'object' ? reward : { name: reward, rarity: 'common' };

  const badge = $('reward-rarity-badge');
  if (badge) {
    badge.textContent =
      r.rarity === 'legendary' ? '✦ Legendär'     :
      r.rarity === 'epic'      ? '◆ Episch'        :
      r.rarity === 'rare'      ? '◆ Selten'        :
      r.rarity === 'uncommon'  ? '◆ Ungewöhnlich'  :
                                 '◆ Gewöhnlich';
    badge.className = 'reward-rarity-badge rarity-' + r.rarity;
  }

  const iconEl = $('reward-item-icon');
  if (iconEl) iconEl.innerHTML = _ruckTreasureIcon(r.name, 72);

  const nameEl = $('reward-item-name');
  if (nameEl) nameEl.textContent = r.name;

  const descEl = $('reward-item-desc');
  if (descEl) descEl.textContent = REWARD_DESCRIPTIONS[r.name] || '';

  const popup = $('popup-reward');
  popup.className = 'overlay reward-popup-' + r.rarity;
  popup.classList.remove('hidden');

  if (r.rarity === 'epic' || r.rarity === 'legendary') {
    _spawnRewardParticles(r.rarity);
  }
}

function _spawnRewardParticles(rarity) {
  const container = $('reward-particles');
  if (!container) return;
  container.innerHTML = '';
  const colors = rarity === 'legendary'
    ? ['#f0c040','#ffdd80','#ffd060','#ffee88']
    : ['#cc66ff','#aa44ff','#dd88ff','#ff88ff'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'reward-particle';
    p.style.cssText =
      `left:${(10 + Math.random() * 80).toFixed(1)}%;` +
      `top:${(60 + Math.random() * 30).toFixed(1)}%;` +
      `background:${colors[i % colors.length]};` +
      `width:${(2 + Math.random() * 4).toFixed(1)}px;` +
      `height:${(2 + Math.random() * 4).toFixed(1)}px;` +
      `animation-delay:${(Math.random() * 1.5).toFixed(2)}s;` +
      `animation-duration:${(1.5 + Math.random()).toFixed(2)}s;`;
    container.appendChild(p);
  }
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
  document.querySelector('.star-msg').textContent = starReactions[Math.floor(Math.random() * starReactions.length)];
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

  // Stern-Popup: ganzer Screen schließt per Tap
  $('popup-star').addEventListener('click', () => {
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

    if (pending.reward && typeof pending.reward === 'object') {
      showRewardPopup(pending.reward);
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

function rucksackSaveTreasures(all) {
  localStorage.setItem(STORE_TREASURES, JSON.stringify(all));
}

function rucksackRecordTreasure(questTitle, treasure, type) {
  const all = rucksackLoadTreasures();
  all.push({
    date:      todayStr(),
    questTitle,
    name:      treasure.name,
    color:     treasure.color,
    special:   treasure.special || null,
    type,
    left:      (4 + Math.random() * 82).toFixed(1),
    top:       (4 + Math.random() * 82).toFixed(1),
    rot:       (Math.random() * 30 - 15).toFixed(1),
  });
  rucksackSaveTreasures(all);
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
function renderEntdecktTab(compNParam) {
  const compN = (compNParam !== undefined && compNParam !== null) ? compNParam : 0;

  let container = document.getElementById('const-view-entdeckt');
  if (!container) container = document.querySelector('.tel-pane-found');
  if (!container) return;

  container.innerHTML = '';

  const discovered = CONSTELLATIONS.filter((c, i) => i < compN);

  if (discovered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'tel-empty-found';
    empty.innerHTML = 'Noch keine Sternbilder entdeckt.<br><small style="color:rgba(255,255,255,0.3);font-size:0.65rem">Sammle ' + (CONSTELLATIONS[0]?.starsNeeded ?? 5) + ' Sterne für das erste Sternbild</small>';
    container.appendChild(empty);
    return;
  }

  const allStars = loadStars();
  let cumulative = 0;
  const unlockDates = {};
  for (let i = 0; i < discovered.length; i++) {
    cumulative += CONSTELLATIONS[i].starsNeeded;
    const dateStr = allStars[cumulative - 1] || allStars[allStars.length - 1] || '';
    if (dateStr) {
      try {
        unlockDates[discovered[i].name] = new Intl.DateTimeFormat('de-AT', {
          timeZone: 'Europe/Vienna', day: 'numeric', month: 'long', year: 'numeric',
        }).format(new Date(dateStr + 'T12:00:00'));
      } catch { unlockDates[discovered[i].name] = dateStr; }
    }
  }

  discovered.forEach(function(c) {
    var item = document.createElement('div');
    item.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(30,15,60,0.85);border:1px solid rgba(160,100,255,0.3);border-radius:12px;margin-bottom:8px;cursor:pointer;width:100%;box-sizing:border-box;-webkit-tap-highlight-color:transparent';

    var svgWrap = document.createElement('div');
    svgWrap.style.cssText = 'flex-shrink:0;pointer-events:none';
    svgWrap.innerHTML = _makeConstSvg(c, 'done');

    var infoDiv = document.createElement('div');
    infoDiv.style.cssText = 'flex:1;pointer-events:none;min-width:0';
    var dateLabel = unlockDates[c.name] ? '<div style="font-size:0.6rem;color:rgba(180,140,255,0.45);margin-top:2px">✦ Entdeckt am ' + unlockDates[c.name] + ' ✦</div>' : '';
    infoDiv.innerHTML = '<div style="font-family:Cinzel,serif;font-size:1rem;font-weight:700;color:#e0c8ff">' + c.name + '</div>' + dateLabel;

    var arrow = document.createElement('div');
    arrow.style.cssText = 'color:rgba(196,160,48,0.4);font-size:1rem;flex-shrink:0;pointer-events:none';
    arrow.textContent = '›';

    item.appendChild(svgWrap);
    item.appendChild(infoDiv);
    item.appendChild(arrow);

    item.addEventListener('click', function() { _openConstDetail(c); });
    container.appendChild(item);
  });
}// ── Entdeckt-Tab: discovered constellations list with tap-to-expand lore ──────
function renderDiscoveredConstellations(paneFoundEl) {
  if (!paneFoundEl) return;
  paneFoundEl.innerHTML = '';

  const starCount = loadStars().length;
  const info = getConstellationInfo(starCount);
  const compN = info.allComplete ? CONSTELLATIONS.length : info.completedCount;
  const discovered = CONSTELLATIONS.filter((c, i) => i < compN);

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
      if (tab.dataset.tab === 'found') renderEntdecktTab(compN);
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
  renderEntdecktTab(compN);

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

function _attachItemDrag(item, idx, allItems, floorEl) {
  let dragStartX = 0, dragStartY = 0;
  let dragOffX = 0, dragOffY = 0;
  let dragging = false, hasMoved = false;

  function clamp(v, mn, mx) { return Math.max(mn, Math.min(mx, v)); }

  function computePos(clientX, clientY) {
    const r  = floorEl.getBoundingClientRect();
    const lp = clamp((clientX - r.left  - dragOffX) / r.width  * 100, 2, 88);
    const tp = clamp((clientY - r.top   - dragOffY) / r.height * 100, 2, 88);
    return { lp, tp };
  }

  function startDrag(clientX, clientY) {
    const r  = floorEl.getBoundingClientRect();
    dragOffX   = clientX - r.left  - parseFloat(item.style.left)  / 100 * r.width;
    dragOffY   = clientY - r.top   - parseFloat(item.style.top)   / 100 * r.height;
    dragStartX = clientX;
    dragStartY = clientY;
    dragging   = true;
    hasMoved   = false;
  }

  function applyPos(clientX, clientY) {
    const { lp, tp } = computePos(clientX, clientY);
    item.style.left = lp.toFixed(1) + '%';
    item.style.top  = tp.toFixed(1) + '%';
    return { lp, tp };
  }

  function finishDrag(clientX, clientY) {
    if (!dragging) return;
    dragging = false;
    item.classList.remove('dragging');
    if (hasMoved) {
      const { lp, tp } = applyPos(clientX, clientY);
      allItems[idx].left = lp.toFixed(1);
      allItems[idx].top  = tp.toFixed(1);
      rucksackSaveTreasures(allItems);
    } else {
      showTreasureItemName(item.dataset.name);
    }
  }

  // Touch
  item.addEventListener('touchstart', e => {
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  item.addEventListener('touchmove', e => {
    if (!dragging) return;
    const t = e.touches[0];
    if (!hasMoved && Math.hypot(t.clientX - dragStartX, t.clientY - dragStartY) < 5) return;
    e.preventDefault();
    hasMoved = true;
    item.classList.add('dragging');
    applyPos(t.clientX, t.clientY);
  }, { passive: false });

  item.addEventListener('touchend', e => {
    finishDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }, { passive: true });

  item.addEventListener('touchcancel', () => {
    dragging = false;
    item.classList.remove('dragging');
  }, { passive: true });

  // Mouse
  item.addEventListener('mousedown', e => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
    const onMove = mv => {
      if (!dragging) return;
      if (!hasMoved && Math.hypot(mv.clientX - dragStartX, mv.clientY - dragStartY) < 5) return;
      hasMoved = true;
      item.classList.add('dragging');
      applyPos(mv.clientX, mv.clientY);
    };
    const onUp = up => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      finishDrag(up.clientX, up.clientY);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

function showTreasureItemName(name) {
  const popup = document.getElementById('ruck-item-popup');
  if (!popup) return;
  const rwObj  = REWARDS.find(r => r.name === name);
  const rarity = rwObj ? rwObj.rarity : 'common';
  const desc   = REWARD_DESCRIPTIONS[name] || '';
  const badge  =
    rarity === 'legendary' ? '✦ Legendär'    :
    rarity === 'epic'      ? '◆ Episch'       :
    rarity === 'rare'      ? '◆ Selten'       :
    rarity === 'uncommon'  ? '◆ Ungewöhnlich' :
                             '◆ Gewöhnlich';
  popup.innerHTML = `<div class="ritp-inner rarity-bg-${rarity}">
    <span class="ritp-runes">ᚱ ᚢ ᚾ</span>
    <span class="ritp-badge rarity-${rarity}">${badge}</span>
    <span class="ritp-name">✦ ${name} ✦</span>
    <span class="ritp-desc">${desc}</span>
    <span class="ritp-runes">ᛖ ᚾ ᚠ</span>
  </div>`;
  popup.classList.add('visible');
  popup.onclick = () => popup.classList.remove('visible');
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

  // Ensure every item has fixed position + rotation; assign once for old/extra items
  let _posNeedsSave = false;
  all.forEach(t => {
    if (t.left == null || t.top == null) {
      t.left = (4 + Math.random() * 82).toFixed(1);
      t.top  = (4 + Math.random() * 82).toFixed(1);
      _posNeedsSave = true;
    }
    if (t.rot == null) {
      t.rot = (Math.random() * 30 - 15).toFixed(1);
      _posNeedsSave = true;
    }
  });
  if (_posNeedsSave) rucksackSaveTreasures(all);

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

  // Insert detailed wood floor SVG as first element
  (function() {
    const floorEl = container.querySelector('.ruck-chest-floor');
    const floorSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    floorSvg.setAttribute('viewBox','0 0 380 500');
    floorSvg.setAttribute('preserveAspectRatio','xMidYMid slice');
    floorSvg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none';
    floorSvg.innerHTML = `<defs>
  <linearGradient id="fp1" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#1e0a02"/>
    <stop offset="8%" stop-color="#3c1e0a"/>
    <stop offset="22%" stop-color="#5a3214"/>
    <stop offset="38%" stop-color="#4e2a0e"/>
    <stop offset="52%" stop-color="#603818"/>
    <stop offset="68%" stop-color="#523010"/>
    <stop offset="82%" stop-color="#5e3818"/>
    <stop offset="100%" stop-color="#2a1206"/>
  </linearGradient>
  <linearGradient id="fp2" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#240e04"/>
    <stop offset="12%" stop-color="#4a2810"/>
    <stop offset="30%" stop-color="#583215"/>
    <stop offset="48%" stop-color="#4c280e"/>
    <stop offset="65%" stop-color="#623c1c"/>
    <stop offset="85%" stop-color="#503010"/>
    <stop offset="100%" stop-color="#2e1406"/>
  </linearGradient>
  <linearGradient id="fp3" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#200c04"/>
    <stop offset="15%" stop-color="#522e12"/>
    <stop offset="32%" stop-color="#5e3818"/>
    <stop offset="50%" stop-color="#503010"/>
    <stop offset="70%" stop-color="#5a3414"/>
    <stop offset="90%" stop-color="#4a2a0e"/>
    <stop offset="100%" stop-color="#261004"/>
  </linearGradient>
  <linearGradient id="fp4" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#1c0a02"/>
    <stop offset="10%" stop-color="#3e2008"/>
    <stop offset="28%" stop-color="#543014"/>
    <stop offset="45%" stop-color="#4a2810"/>
    <stop offset="62%" stop-color="#5c3618"/>
    <stop offset="80%" stop-color="#4e2c10"/>
    <stop offset="100%" stop-color="#281206"/>
  </linearGradient>
  <linearGradient id="fp5" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#220e04"/>
    <stop offset="14%" stop-color="#4c2a10"/>
    <stop offset="35%" stop-color="#5a3414"/>
    <stop offset="55%" stop-color="#4e2c0e"/>
    <stop offset="72%" stop-color="#5e3818"/>
    <stop offset="90%" stop-color="#4a2808"/>
    <stop offset="100%" stop-color="#2c1206"/>
  </linearGradient>
  <radialGradient id="fng" cx="35%" cy="30%">
    <stop offset="0%" stop-color="#f8e888"/>
    <stop offset="30%" stop-color="#d4a018"/>
    <stop offset="65%" stop-color="#9a7010"/>
    <stop offset="100%" stop-color="#4a3008"/>
  </radialGradient>
  <radialGradient id="fng2" cx="35%" cy="30%">
    <stop offset="0%" stop-color="#e8d878"/>
    <stop offset="40%" stop-color="#b08010"/>
    <stop offset="100%" stop-color="#3a2208"/>
  </radialGradient>
  <linearGradient id="fbl" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#f0d848"/>
    <stop offset="25%" stop-color="#d4a018"/>
    <stop offset="55%" stop-color="#9a7210"/>
    <stop offset="100%" stop-color="#4a3008"/>
  </linearGradient>
  <linearGradient id="fbl2" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#e8c830"/>
    <stop offset="50%" stop-color="#b08818"/>
    <stop offset="100%" stop-color="#5a3c08"/>
  </linearGradient>
  <linearGradient id="fsl" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.75"/>
    <stop offset="60%" stop-color="#000000" stop-opacity="0.15"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="fsr" x1="100%" y1="0%" x2="0%" y2="0%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.70"/>
    <stop offset="60%" stop-color="#000000" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="fst" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.80"/>
    <stop offset="55%" stop-color="#000000" stop-opacity="0.20"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="fsb" x1="0%" y1="100%" x2="0%" y2="0%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.65"/>
    <stop offset="50%" stop-color="#000000" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="fhl" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="ffg" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
    <stop offset="50%" stop-color="#000000" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="ffg2" x1="0%" y1="100%" x2="0%" y2="0%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </linearGradient>
</defs>
<rect x="0" y="0" width="380" height="500" fill="#0e0502"/>
<rect x="4" y="4" width="372" height="492" rx="6" fill="none" stroke="#6a4208" stroke-width="8"/>
<rect x="4" y="4" width="372" height="492" rx="6" fill="none" stroke="#c89010" stroke-width="4"/>
<rect x="4" y="4" width="372" height="492" rx="6" fill="none" stroke="#f0d840" stroke-width="1.5"/>
<rect x="12" y="12" width="356" height="91" fill="url(#fp1)"/>
<path d="M12 26 Q60 22 120 27 Q180 32 240 26 Q300 20 356 24" stroke="#1a0804" stroke-width="1.2" fill="none" opacity="0.55"/>
<path d="M12 34 Q50 30 110 36 Q175 42 230 35 Q285 28 356 33" stroke="#140602" stroke-width="0.8" fill="none" opacity="0.45"/>
<path d="M12 44 Q80 40 145 46 Q200 52 265 44 Q315 37 356 42" stroke="#1a0804" stroke-width="1.0" fill="none" opacity="0.5"/>
<path d="M12 56 Q70 52 130 58 Q195 64 255 57 Q310 50 356 54" stroke="#120602" stroke-width="0.7" fill="none" opacity="0.4"/>
<path d="M12 68 Q85 64 150 70 Q210 76 270 68 Q320 61 356 66" stroke="#1a0804" stroke-width="0.9" fill="none" opacity="0.45"/>
<path d="M12 80 Q65 76 125 82 Q190 88 248 81 Q305 74 356 78" stroke="#140602" stroke-width="0.7" fill="none" opacity="0.4"/>
<ellipse cx="295" cy="56" rx="18" ry="11" fill="#0e0402" opacity="0.7"/>
<ellipse cx="295" cy="56" rx="13" ry="7" fill="#080200" opacity="0.8"/>
<ellipse cx="293" cy="54" rx="5" ry="3" fill="#120604" opacity="0.5"/>
<path d="M277 52 Q295 46 313 52 M277 60 Q295 66 313 60" stroke="#180804" stroke-width="0.6" fill="none" opacity="0.5"/>
<rect x="12" y="12" width="356" height="30" fill="url(#fhl)"/>
<rect x="12" y="102" width="356" height="6" fill="#060200"/>
<rect x="12" y="102" width="356" height="3" fill="url(#ffg)"/>
<rect x="12" y="105" width="356" height="3" fill="url(#ffg2)"/>
<rect x="12" y="108" width="356" height="90" fill="url(#fp2)"/>
<path d="M12 122 Q75 118 140 124 Q200 130 260 122 Q315 115 356 120" stroke="#1a0804" stroke-width="1.1" fill="none" opacity="0.5"/>
<path d="M12 134 Q55 130 115 136 Q180 142 242 135 Q300 128 356 132" stroke="#140602" stroke-width="0.8" fill="none" opacity="0.45"/>
<path d="M12 148 Q80 144 145 150 Q205 156 268 148 Q318 141 356 146" stroke="#1a0804" stroke-width="1.0" fill="none" opacity="0.5"/>
<path d="M12 160 Q65 157 128 163 Q195 169 255 161 Q312 154 356 158" stroke="#120602" stroke-width="0.7" fill="none" opacity="0.4"/>
<path d="M12 174 Q90 170 155 176 Q215 182 275 174 Q322 167 356 172" stroke="#1a0804" stroke-width="0.9" fill="none" opacity="0.45"/>
<path d="M12 186 Q70 183 130 189 Q196 195 256 187 Q310 180 356 184" stroke="#140602" stroke-width="0.7" fill="none" opacity="0.4"/>
<rect x="12" y="108" width="356" height="25" fill="url(#fhl)"/>
<rect x="12" y="197" width="356" height="6" fill="#060200"/>
<rect x="12" y="197" width="356" height="3" fill="url(#ffg)"/>
<rect x="12" y="200" width="356" height="3" fill="url(#ffg2)"/>
<rect x="12" y="203" width="356" height="90" fill="url(#fp3)"/>
<path d="M12 217 Q70 213 135 219 Q198 225 258 217 Q312 210 356 215" stroke="#1a0804" stroke-width="1.1" fill="none" opacity="0.5"/>
<path d="M12 230 Q80 226 145 232 Q205 238 265 230 Q318 223 356 228" stroke="#140602" stroke-width="0.8" fill="none" opacity="0.45"/>
<path d="M12 244 Q60 240 125 246 Q190 252 250 244 Q308 237 356 242" stroke="#1a0804" stroke-width="1.0" fill="none" opacity="0.5"/>
<path d="M12 258 Q85 254 150 260 Q210 266 272 258 Q320 251 356 256" stroke="#120602" stroke-width="0.7" fill="none" opacity="0.4"/>
<path d="M12 272 Q75 268 138 274 Q200 280 262 272 Q316 265 356 270" stroke="#1a0804" stroke-width="0.9" fill="none" opacity="0.45"/>
<path d="M12 284 Q65 281 130 287 Q196 293 256 285 Q312 278 356 282" stroke="#140602" stroke-width="0.7" fill="none" opacity="0.4"/>
<ellipse cx="95" cy="252" rx="22" ry="13" fill="#0a0300" opacity="0.72"/>
<ellipse cx="95" cy="252" rx="16" ry="8.5" fill="#060100" opacity="0.82"/>
<ellipse cx="93" cy="250" rx="6" ry="3.5" fill="#100504" opacity="0.5"/>
<path d="M73 248 Q95 241 117 248 M73 256 Q95 263 117 256" stroke="#180804" stroke-width="0.6" fill="none" opacity="0.5"/>
<ellipse cx="318" cy="268" rx="9" ry="6" fill="#0a0300" opacity="0.65"/>
<ellipse cx="318" cy="268" rx="5" ry="3.5" fill="#060100" opacity="0.75"/>
<rect x="12" y="203" width="356" height="25" fill="url(#fhl)"/>
<rect x="12" y="292" width="356" height="6" fill="#060200"/>
<rect x="12" y="292" width="356" height="3" fill="url(#ffg)"/>
<rect x="12" y="295" width="356" height="3" fill="url(#ffg2)"/>
<rect x="12" y="298" width="356" height="90" fill="url(#fp4)"/>
<path d="M12 312 Q80 308 145 314 Q205 320 265 312 Q318 305 356 310" stroke="#1a0804" stroke-width="1.1" fill="none" opacity="0.5"/>
<path d="M12 326 Q65 322 128 328 Q192 334 252 326 Q308 319 356 324" stroke="#140602" stroke-width="0.8" fill="none" opacity="0.45"/>
<path d="M12 340 Q75 336 140 342 Q200 348 262 340 Q315 333 356 338" stroke="#1a0804" stroke-width="1.0" fill="none" opacity="0.5"/>
<path d="M12 354 Q85 350 150 356 Q210 362 272 354 Q320 347 356 352" stroke="#120602" stroke-width="0.7" fill="none" opacity="0.4"/>
<path d="M12 368 Q70 364 135 370 Q198 376 258 368 Q312 361 356 366" stroke="#1a0804" stroke-width="0.9" fill="none" opacity="0.45"/>
<path d="M12 380 Q80 377 145 383 Q205 389 265 381 Q318 374 356 378" stroke="#140602" stroke-width="0.7" fill="none" opacity="0.4"/>
<rect x="12" y="298" width="356" height="25" fill="url(#fhl)"/>
<rect x="12" y="387" width="356" height="6" fill="#060200"/>
<rect x="12" y="387" width="356" height="3" fill="url(#ffg)"/>
<rect x="12" y="390" width="356" height="3" fill="url(#ffg2)"/>
<rect x="12" y="393" width="356" height="95" fill="url(#fp5)"/>
<path d="M12 408 Q70 404 135 410 Q198 416 258 408 Q312 401 356 406" stroke="#1a0804" stroke-width="1.1" fill="none" opacity="0.5"/>
<path d="M12 422 Q80 418 145 424 Q205 430 265 422 Q318 415 356 420" stroke="#140602" stroke-width="0.8" fill="none" opacity="0.45"/>
<path d="M12 436 Q65 432 130 438 Q196 444 256 436 Q310 429 356 434" stroke="#1a0804" stroke-width="1.0" fill="none" opacity="0.5"/>
<path d="M12 450 Q85 446 150 452 Q210 458 272 450 Q320 443 356 448" stroke="#120602" stroke-width="0.7" fill="none" opacity="0.4"/>
<path d="M12 464 Q75 461 138 467 Q200 473 262 465 Q316 458 356 462" stroke="#1a0804" stroke-width="0.9" fill="none" opacity="0.45"/>
<path d="M12 476 Q65 473 128 479 Q196 485 256 477 Q312 470 356 474" stroke="#140602" stroke-width="0.7" fill="none" opacity="0.4"/>
<ellipse cx="200" cy="445" rx="14" ry="8" fill="#0a0300" opacity="0.65"/>
<ellipse cx="200" cy="445" rx="9" ry="5" fill="#060100" opacity="0.75"/>
<rect x="12" y="393" width="356" height="25" fill="url(#fhl)"/>
<circle cx="38" cy="104" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="38" cy="104" r="5" fill="url(#fng)" stroke="#c89010" stroke-width="1"/><circle cx="38" cy="104" r="2.5" fill="#f0e060" opacity="0.55"/><circle cx="38" cy="104" r="1" fill="white" opacity="0.3"/>
<circle cx="152" cy="104" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="152" cy="104" r="5" fill="url(#fng2)" stroke="#c89010" stroke-width="1"/><circle cx="152" cy="104" r="2.5" fill="#f0e060" opacity="0.5"/><circle cx="152" cy="104" r="1" fill="white" opacity="0.3"/>
<circle cx="228" cy="104" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="228" cy="104" r="5" fill="url(#fng)" stroke="#c89010" stroke-width="1"/><circle cx="228" cy="104" r="2.5" fill="#f0e060" opacity="0.55"/><circle cx="228" cy="104" r="1" fill="white" opacity="0.3"/>
<circle cx="342" cy="104" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="342" cy="104" r="5" fill="url(#fng2)" stroke="#c89010" stroke-width="1"/><circle cx="342" cy="104" r="2.5" fill="#f0e060" opacity="0.5"/><circle cx="342" cy="104" r="1" fill="white" opacity="0.3"/>
<circle cx="38" cy="199" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="38" cy="199" r="5" fill="url(#fng)" stroke="#c89010" stroke-width="1"/><circle cx="38" cy="199" r="2.5" fill="#f0e060" opacity="0.55"/><circle cx="38" cy="199" r="1" fill="white" opacity="0.3"/>
<circle cx="152" cy="199" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="152" cy="199" r="5" fill="url(#fng2)" stroke="#c89010" stroke-width="1"/><circle cx="152" cy="199" r="2.5" fill="#f0e060" opacity="0.5"/><circle cx="152" cy="199" r="1" fill="white" opacity="0.3"/>
<circle cx="228" cy="199" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="228" cy="199" r="5" fill="url(#fng)" stroke="#c89010" stroke-width="1"/><circle cx="228" cy="199" r="2.5" fill="#f0e060" opacity="0.55"/><circle cx="228" cy="199" r="1" fill="white" opacity="0.3"/>
<circle cx="342" cy="199" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="342" cy="199" r="5" fill="url(#fng2)" stroke="#c89010" stroke-width="1"/><circle cx="342" cy="199" r="2.5" fill="#f0e060" opacity="0.5"/><circle cx="342" cy="199" r="1" fill="white" opacity="0.3"/>
<circle cx="38" cy="294" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="38" cy="294" r="5" fill="url(#fng)" stroke="#c89010" stroke-width="1"/><circle cx="38" cy="294" r="2.5" fill="#f0e060" opacity="0.55"/><circle cx="38" cy="294" r="1" fill="white" opacity="0.3"/>
<circle cx="152" cy="294" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="152" cy="294" r="5" fill="url(#fng2)" stroke="#c89010" stroke-width="1"/><circle cx="152" cy="294" r="2.5" fill="#f0e060" opacity="0.5"/><circle cx="152" cy="294" r="1" fill="white" opacity="0.3"/>
<circle cx="228" cy="294" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="228" cy="294" r="5" fill="url(#fng)" stroke="#c89010" stroke-width="1"/><circle cx="228" cy="294" r="2.5" fill="#f0e060" opacity="0.55"/><circle cx="228" cy="294" r="1" fill="white" opacity="0.3"/>
<circle cx="342" cy="294" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="342" cy="294" r="5" fill="url(#fng2)" stroke="#c89010" stroke-width="1"/><circle cx="342" cy="294" r="2.5" fill="#f0e060" opacity="0.5"/><circle cx="342" cy="294" r="1" fill="white" opacity="0.3"/>
<circle cx="38" cy="389" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="38" cy="389" r="5" fill="url(#fng)" stroke="#c89010" stroke-width="1"/><circle cx="38" cy="389" r="2.5" fill="#f0e060" opacity="0.55"/><circle cx="38" cy="389" r="1" fill="white" opacity="0.3"/>
<circle cx="152" cy="389" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="152" cy="389" r="5" fill="url(#fng2)" stroke="#c89010" stroke-width="1"/><circle cx="152" cy="389" r="2.5" fill="#f0e060" opacity="0.5"/><circle cx="152" cy="389" r="1" fill="white" opacity="0.3"/>
<circle cx="228" cy="389" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="228" cy="389" r="5" fill="url(#fng)" stroke="#c89010" stroke-width="1"/><circle cx="228" cy="389" r="2.5" fill="#f0e060" opacity="0.55"/><circle cx="228" cy="389" r="1" fill="white" opacity="0.3"/>
<circle cx="342" cy="389" r="6.5" fill="#1a0c02" stroke="#6a4408" stroke-width="0.8"/><circle cx="342" cy="389" r="5" fill="url(#fng2)" stroke="#c89010" stroke-width="1"/><circle cx="342" cy="389" r="2.5" fill="#f0e060" opacity="0.5"/><circle cx="342" cy="389" r="1" fill="white" opacity="0.3"/>
<path d="M12 12 L72 12 L72 20 L20 20 L20 72 L12 72 Z" fill="url(#fbl)" stroke="#7a5808" stroke-width="1"/>
<path d="M12 12 L72 12 L72 20 L20 20 L20 72 L12 72 Z" fill="none" stroke="#f0d040" stroke-width="0.8" opacity="0.5"/>
<rect x="20" y="12" width="52" height="4" rx="1" fill="url(#fbl2)"/>
<rect x="12" y="20" width="4" height="52" rx="1" fill="url(#fbl2)"/>
<circle cx="44" cy="44" r="10" fill="#0e0602" stroke="#7a5808" stroke-width="1.2"/>
<circle cx="44" cy="44" r="7.5" fill="url(#fng)"/>
<circle cx="44" cy="44" r="4" fill="#f8e860" opacity="0.5"/>
<circle cx="42" cy="42" r="1.5" fill="white" opacity="0.35"/>
<path d="M368 12 L308 12 L308 20 L360 20 L360 72 L368 72 Z" fill="url(#fbl)" stroke="#7a5808" stroke-width="1"/>
<path d="M368 12 L308 12 L308 20 L360 20 L360 72 L368 72 Z" fill="none" stroke="#f0d040" stroke-width="0.8" opacity="0.5"/>
<rect x="308" y="12" width="52" height="4" rx="1" fill="url(#fbl2)"/>
<rect x="364" y="20" width="4" height="52" rx="1" fill="url(#fbl2)"/>
<circle cx="336" cy="44" r="10" fill="#0e0602" stroke="#7a5808" stroke-width="1.2"/>
<circle cx="336" cy="44" r="7.5" fill="url(#fng)"/>
<circle cx="336" cy="44" r="4" fill="#f8e860" opacity="0.5"/>
<circle cx="334" cy="42" r="1.5" fill="white" opacity="0.35"/>
<path d="M12 488 L72 488 L72 480 L20 480 L20 428 L12 428 Z" fill="url(#fbl)" stroke="#7a5808" stroke-width="1"/>
<path d="M12 488 L72 488 L72 480 L20 480 L20 428 L12 428 Z" fill="none" stroke="#f0d040" stroke-width="0.8" opacity="0.5"/>
<rect x="20" y="484" width="52" height="4" rx="1" fill="url(#fbl2)"/>
<rect x="12" y="428" width="4" height="52" rx="1" fill="url(#fbl2)"/>
<circle cx="44" cy="456" r="10" fill="#0e0602" stroke="#7a5808" stroke-width="1.2"/>
<circle cx="44" cy="456" r="7.5" fill="url(#fng2)"/>
<circle cx="44" cy="456" r="4" fill="#f8e860" opacity="0.5"/>
<circle cx="42" cy="454" r="1.5" fill="white" opacity="0.35"/>
<path d="M368 488 L308 488 L308 480 L360 480 L360 428 L368 428 Z" fill="url(#fbl)" stroke="#7a5808" stroke-width="1"/>
<path d="M368 488 L308 488 L308 480 L360 480 L360 428 L368 428 Z" fill="none" stroke="#f0d040" stroke-width="0.8" opacity="0.5"/>
<rect x="308" y="484" width="52" height="4" rx="1" fill="url(#fbl2)"/>
<rect x="364" y="428" width="4" height="52" rx="1" fill="url(#fbl2)"/>
<circle cx="336" cy="456" r="10" fill="#0e0602" stroke="#7a5808" stroke-width="1.2"/>
<circle cx="336" cy="456" r="7.5" fill="url(#fng2)"/>
<circle cx="336" cy="456" r="4" fill="#f8e860" opacity="0.5"/>
<circle cx="334" cy="454" r="1.5" fill="white" opacity="0.35"/>
<rect x="12" y="12" width="80" height="476" fill="url(#fsl)"/>
<rect x="288" y="12" width="80" height="476" fill="url(#fsr)"/>
<rect x="12" y="12" width="356" height="80" fill="url(#fst)"/>
<rect x="12" y="420" width="356" height="68" fill="url(#fsb)"/>
<rect x="18" y="18" width="344" height="464" rx="2" fill="none" stroke="#8a6010" stroke-width="1.5"/>
<rect x="20" y="20" width="340" height="460" rx="2" fill="none" stroke="#f0d040" stroke-width="0.7" opacity="0.4"/>`;
    floorEl.insertBefore(floorSvg, floorEl.firstChild);
  })();

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

  // 5. Belohnungs-Icons (1.4s) – fixe persistierte Positionen
  _ruckChestTimers.push(setTimeout(() => {
    const sw = document.getElementById('ruck-scattered-wrap');
    if (!sw) return;
    const _gsr = s => { const x = Math.sin(s * 127.1) * 10000; return x - Math.floor(x); };
    let scatterHtml = '';
    all.forEach((t, i) => {
      const rot     = t.rot != null ? parseFloat(t.rot) : (-22 + _gsr(i + 600) * 44);
      const zIdx    = 2 + Math.floor(_gsr(i + 700) * 7);
      const delay   = (i * 0.08 + 0.1).toFixed(2);
      const rwObj   = REWARDS.find(r => r.name === t.name);
      const rarity  = rwObj ? rwObj.rarity : 'common';
      scatterHtml += `<div class="ruck-scatter-item pop-in" data-name="${t.name}" data-idx="${i}" data-rarity="${rarity}" style="left:${t.left}%;top:${t.top}%;--rot:${rot.toFixed(1)}deg;z-index:${zIdx};animation-delay:${delay}s">${_ruckTreasureIcon(t.name, 52)}</div>`;
    });
    sw.innerHTML = scatterHtml;

    // Popup overlay
    const floorEl = sw.parentNode;
    if (floorEl && !floorEl.querySelector('#ruck-item-popup')) {
      const popupEl = document.createElement('div');
      popupEl.id = 'ruck-item-popup';
      floorEl.appendChild(popupEl);
    }
    // Attach drag+tap handlers to each item
    sw.querySelectorAll('.ruck-scatter-item').forEach(item => {
      _attachItemDrag(item, parseInt(item.dataset.idx, 10), all, floorEl);
    });
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
