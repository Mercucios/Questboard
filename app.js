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
  'sehr-gut':       { regularCount: 7, maxCost: 10, restCount: 1 },
  'gut':            { regularCount: 5, maxCost: 10, restCount: 2 },
  'okay':           { regularCount: 4, maxCost:  3, restCount: 3 },
  'schlecht':       { regularCount: 3, maxCost:  2, restCount: 4 },
  'nur-ueberleben': { regularCount: 2, maxCost:  1, restCount: 5 },
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

// ── Quest selection ───────────────────────────────────────────────────────────

function selectQuests(allQuests, mood) {
  if (mood === 'nur-ueberleben') {
    const rests = shuffle(allQuests.filter(q => q.rest));
    return {
      quests: rests.map(q => ({ ...q, done: false })),
      pool:   [],
    };
  }

  const cfg     = MOOD_CONFIG[mood];
  const regular = shuffle(allQuests.filter(q => !q.rest && q.mana <= cfg.maxCost))
    .slice(0, cfg.regularCount);
  const rest    = shuffle(allQuests.filter(q => q.rest))
    .slice(0, cfg.restCount);

  const selected      = [...regular, ...rest];
  const selectedNames = new Set(selected.map(q => q.name));
  const pool          = allQuests.filter(q => !selectedNames.has(q.name));

  return {
    quests: selected.map(q => ({ ...q, done: false })),
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
  const canAfford  = q.mana === 0 || mana >= q.mana;
  const canSwap    = appState.pool.length > 0;
  const card = document.createElement('div');
  card.className = `quest-card${q.rest ? ' rest-card' : ''}`;

  const costHtml = q.mana > 0
    ? `<span class="quest-cost">${Array(q.mana).fill('<span class="gem-dot gem-dot--xs" style="--gem-color:#4a9eff"></span>').join('')}</span>`
    : `<span class="quest-rest-tag">Rast</span>`;

  card.innerHTML = `
    <div class="quest-info">
      <div class="quest-name">${q.name}</div>
      <div class="quest-meta">
        <span class="quest-category">${q.category}</span>
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
  if (appState.pool.length === 0) return;
  const idx = appState.quests.findIndex(q => q.name === name && !q.done);
  if (idx === -1) return;

  const poolIdx  = Math.floor(Math.random() * appState.pool.length);
  const incoming = { ...appState.pool[poolIdx], done: false };
  const outgoing = appState.quests[idx];

  appState.pool.splice(poolIdx, 1);
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

function openStarMap() {
  const starCount = loadStars().length;
  const info = getConstellationInfo(starCount);
  const c = info.constellation;
  const allDone = info.earned >= c.stars.length;

  if (starCount === 0) {
    $('starmap-total').textContent = 'Noch keine Sterne — du schaffst das!';
  } else if (info.allComplete) {
    $('starmap-total').textContent = `${starCount} tapfere Tage · Alle Sternbilder entdeckt ✦`;
  } else {
    const label = starCount === 1 ? 'tapferer Tag' : 'tapfere Tage';
    $('starmap-total').textContent = allDone
      ? `${starCount} ${label} · ${c.name} ✦`
      : `${starCount} ${label} · ${c.name} (${info.earned}/${c.starsNeeded})`;
  }

  $('popup-starmap').classList.remove('hidden');
  if (starMapAnimFrame) { cancelAnimationFrame(starMapAnimFrame); starMapAnimFrame = null; }
  startStarMapAnimation(starCount);
}

// ── Star map canvas ───────────────────────────────────────────────────────────

function startStarMapAnimation(starCount) {
  const canvas = $('starmap-canvas');
  const ctx    = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const info          = getConstellationInfo(starCount);
  const c             = info.constellation;
  const earnedInConst = Math.min(info.earned, c.stars.length);
  const allStarsEarned = earnedInConst >= c.stars.length;

  const srng = s => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
  const bgStars = Array.from({ length: 180 }, (_, i) => ({
    x:     srng(i * 1.1  + 0.3) * W,
    y:     srng(i * 2.3  + 0.7) * H,
    r:     srng(i * 3.7  + 1.2) * 1.5 + 0.3,
    phase: srng(i * 5.1  + 0.9) * Math.PI * 2,
    speed: srng(i * 7.3  + 2.1) * 0.8 + 0.4,
  }));

  const cStars = c.stars.map(s => ({ x: s.x * W, y: s.y * H }));

  const DELAY    = 700;
  const LINE_DUR = 380;
  const TITLE_DUR = 900;
  const linesEndTime = allStarsEarned ? DELAY + c.lines.length * LINE_DUR : 0;

  let startTime = null;

  function frame(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#06060e';
    ctx.fillRect(0, 0, W, H);

    // Twinkling background stars
    for (const bs of bgStars) {
      const alpha = 0.04 + (Math.sin((now / 1000) * bs.speed + bs.phase) * 0.5 + 0.5) * 0.18;
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(bs.x, bs.y, bs.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (starCount > 0) {
      // Constellation lines with draw animation
      if (allStarsEarned && elapsed > DELAY) {
        for (let li = 0; li < c.lines.length; li++) {
          const lineStart = DELAY + li * LINE_DUR;
          if (elapsed < lineStart) break;
          const progress = Math.min(1, (elapsed - lineStart) / LINE_DUR);
          const [ai, bi] = c.lines[li];
          const a = cStars[ai], b = cStars[bi];
          ctx.strokeStyle = 'rgba(160,100,255,0.45)';
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress);
          ctx.stroke();
        }
      }

      // Constellation stars
      for (let si = 0; si < c.stars.length; si++) {
        const p = cStars[si];
        if (si < earnedInConst) {
          const pulse  = Math.sin(now / 800 + si * 1.3) * 0.5 + 0.5;
          const glowR  = 10 + pulse * 6;
          const grd    = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grd.addColorStop(0,   'rgba(200,160,255,0.85)');
          grd.addColorStop(0.4, 'rgba(160,100,255,0.4)');
          grd.addColorStop(1,   'rgba(120,60,255,0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ecdaff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(130,80,180,0.22)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Constellation title fade-in after lines finish
      if (allStarsEarned && elapsed > linesEndTime) {
        const alpha = Math.min(1, (elapsed - linesEndTime) / TITLE_DUR);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = '#c8a0ff';
        ctx.font        = '13px Cinzel, serif';
        ctx.textAlign   = 'center';
        ctx.fillText(c.name, W / 2, H - 10);
        ctx.restore();
      }
    }

    starMapAnimFrame = requestAnimationFrame(frame);
  }

  starMapAnimFrame = requestAnimationFrame(frame);
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {

  $('date-display').textContent = new Date().toLocaleDateString('de-AT', {
    timeZone: 'Europe/Vienna', weekday: 'long', day: 'numeric', month: 'long',
  });

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
}

document.addEventListener('DOMContentLoaded', init);
