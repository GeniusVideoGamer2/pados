const modes = [
  { name: 'Neon Expanse Battle', detail: 'Solo drop, crates, storm gates, 24 bot rivals.' },
  { name: 'LAN PvP Arena', detail: 'Same-network room code for friendly private duels.' },
  { name: 'Training Range', detail: 'Practice recoil, scopes, reloads, and movement.' },
  { name: 'Crate Rush', detail: 'Search chests for fictional weapons and energy ammo.' }
];

const guns = [
  { name: 'Viper AR', type: 'Assault rifle', damage: 31, rate: '720 RPM', ammo: 30, look: 'teal polymer body, holo rail, short barrel' },
  { name: 'Mesa DMR', type: 'Marksman', damage: 58, rate: '280 RPM', ammo: 12, look: 'sand frame, long scope, angular stock' },
  { name: 'Comet SMG', type: 'SMG', damage: 22, rate: '960 RPM', ammo: 40, look: 'compact purple shell, glowing magazine' },
  { name: 'Bulwark Shotgun', type: 'Shotgun', damage: 85, rate: '90 RPM', ammo: 6, look: 'wide chrome receiver, pump grip' },
  { name: 'Northstar Sniper', type: 'Sniper', damage: 95, rate: '45 RPM', ammo: 5, look: 'white carbon barrel, blue scope lens' },
  { name: 'Pulse Pistol', type: 'Sidearm', damage: 18, rate: '480 RPM', ammo: 15, look: 'small black frame, orange energy sights' }
];

const state = {
  profile: JSON.parse(localStorage.getItem('asaProfile') || 'null'),
  query: '', selectedGun: guns[0], ammo: 30, reserve: 90, hp: 100, wins: Number(localStorage.getItem('asaWins') || 0),
  infinite: false, scoped: false, yaw: 0, playerX: 0, playerZ: 0, bots: []
};

const $ = (selector) => document.querySelector(selector);
const startScreen = $('#start-screen');
const loadingScreen = $('#loading-screen');
const gameScreen = $('#game-screen');
const modeList = $('#mode-list');
const modeTemplate = $('#mode-template');
const gunList = $('#gun-list');
const gunTemplate = $('#gun-template');
const canvas = $('#arena-canvas');
const ctx = canvas.getContext('2d');

function saveProfile() { localStorage.setItem('asaProfile', JSON.stringify(state.profile)); }
function syncProfileUi() {
  $('#hud-name').textContent = state.profile?.name || 'Rookie';
  $('#wins').textContent = `Wins ${state.wins}`;
  $('#profile-status').textContent = state.profile ? `Signed in as ${state.profile.name}. Cloud sync hook prepared for Google Play services.` : 'Stats save locally now and are ready for Google cloud sync integration.';
}

function renderModes() {
  const query = state.query.toLowerCase();
  modeList.replaceChildren();
  modes.filter((mode) => `${mode.name} ${mode.detail}`.toLowerCase().includes(query)).forEach((mode) => {
    const node = modeTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector('strong').textContent = mode.name;
    node.querySelector('small').textContent = mode.detail;
    node.addEventListener('click', () => mode.name.includes('LAN') ? startGame(true) : startGame(false));
    modeList.append(node);
  });
}

function renderGuns() {
  gunList.replaceChildren();
  guns.forEach((gun) => {
    const node = gunTemplate.content.firstElementChild.cloneNode(true);
    node.classList.toggle('is-active', gun.name === state.selectedGun.name);
    node.querySelector('.gun-model').style.setProperty('--gun-color', gun.name.includes('Comet') ? '#a855f7' : gun.name.includes('Northstar') ? '#e0f2fe' : gun.name.includes('Bulwark') ? '#f97316' : '#22d3ee');
    node.querySelector('strong').textContent = gun.name;
    node.querySelector('small').textContent = `${gun.type} • DMG ${gun.damage} • ${gun.rate} • ${gun.look}`;
    node.addEventListener('click', () => { state.selectedGun = gun; state.ammo = gun.ammo; updateHud(`${gun.name} equipped.`); renderGuns(); });
    gunList.append(node);
  });
}

function updateHud(message) {
  $('#health').textContent = `HP ${state.hp}`;
  $('#ammo').textContent = state.infinite ? 'Ammo ∞' : `Ammo ${state.ammo}/${state.reserve}`;
  $('#hit-feed').textContent = message;
}

function startGame(lan = false) {
  startScreen.hidden = true; loadingScreen.hidden = false;
  $('#loading-tip').textContent = lan ? 'Opening same-network PvP arena room…' : 'Dropping crates and spawning training rivals…';
  setTimeout(() => {
    loadingScreen.hidden = true; gameScreen.hidden = false;
    $('#room-code').textContent = lan ? `LAN room ASA-${Math.floor(1000 + Math.random() * 9000)}` : 'Solo training';
    state.bots = Array.from({ length: lan ? 3 : 8 }, (_, i) => ({ x: Math.random() * 900 - 450, z: Math.random() * 500 + 180, hp: 100, name: lan ? `LAN Player ${i + 1}` : `Drone ${i + 1}` }));
    renderGuns(); updateHud('Match started. No blood: hits use shield sparks only.'); draw();
  }, 1300);
}

function draw() {
  if (gameScreen.hidden) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, '#10194a'); sky.addColorStop(0.58, '#16213f'); sky.addColorStop(1, '#07111f');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(125, 211, 252, .35)'; ctx.lineWidth = 2;
  for (let i = -8; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(canvas.width / 2 + i * 90 - state.yaw * 2, 420); ctx.lineTo(canvas.width / 2 + i * 190 - state.yaw * 8, 720); ctx.stroke(); }
  for (let y = 440; y < 720; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke(); }
  ctx.fillStyle = '#0f766e'; ctx.fillRect(150 - state.yaw, 330, 180, 110); ctx.fillStyle = '#334155'; ctx.fillRect(770 - state.yaw * .6, 280, 260, 160);
  state.bots.forEach((bot) => { const sx = 640 + bot.x * .35 - state.yaw * 3; const sy = 390 + bot.z * .12; ctx.fillStyle = 'rgba(248,113,113,.9)'; ctx.fillRect(sx - 16, sy - 48, 32, 48); ctx.fillStyle = '#e2e8f0'; ctx.fillText(bot.name, sx - 28, sy - 56); });
  drawWeapon(); requestAnimationFrame(draw);
}

function drawWeapon() {
  ctx.save(); ctx.translate(state.scoped ? 590 : 760, state.scoped ? 510 : 560); ctx.rotate(-0.08);
  ctx.fillStyle = '#111827'; ctx.fillRect(0, 0, 300, 42); ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent'); ctx.fillRect(30, -18, 155, 24); ctx.fillStyle = '#38bdf8'; ctx.fillRect(210, -12, 62, 14); ctx.fillStyle = '#020617'; ctx.fillRect(105, 42, 52, 70); ctx.restore();
  if (state.scoped) { ctx.strokeStyle = 'rgba(226,232,240,.8)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(640, 360, 132, 0, Math.PI * 2); ctx.moveTo(508, 360); ctx.lineTo(772, 360); ctx.moveTo(640, 228); ctx.lineTo(640, 492); ctx.stroke(); }
}

$('#google-login').addEventListener('click', () => { $('#name-row').hidden = false; $('#player-name').focus(); });
$('#save-name').addEventListener('click', () => { const name = $('#player-name').value.trim(); if (!name) return; state.profile = { name, provider: 'google-demo', createdAt: new Date().toISOString() }; saveProfile(); syncProfileUi(); $('#name-row').hidden = true; });
$('#game-search').addEventListener('input', (event) => { state.query = event.target.value; renderModes(); });
$('#search-button').addEventListener('click', renderModes);
$('#play-button').addEventListener('click', () => startGame(false));
$('#arena-button').addEventListener('click', () => startGame(true));
$('#exit-game').addEventListener('click', () => { gameScreen.hidden = true; startScreen.hidden = false; });
$('#infinite-ammo').addEventListener('click', () => { state.infinite = !state.infinite; updateHud(state.infinite ? 'Infinite ammo enabled for sandbox testing.' : 'Infinite ammo disabled.'); });
$('#scope-button').addEventListener('click', () => { state.scoped = !state.scoped; updateHud(state.scoped ? 'Scope view on.' : 'Hip-fire view.'); });
$('#reload-button').addEventListener('click', () => { const need = state.selectedGun.ammo - state.ammo; const take = Math.min(need, state.reserve); state.ammo += take; state.reserve -= take; updateHud(take ? 'Reloaded energy magazine.' : 'No reserve ammo. Search crates.'); });
$('#fire-button').addEventListener('click', () => { if (!state.infinite && state.ammo <= 0) return updateHud('Empty. Reload or find ammo.'); if (!state.infinite) state.ammo -= 1; const target = state.bots.find((bot) => bot.hp > 0); if (target) { target.hp -= state.selectedGun.damage; if (target.hp <= 0) { state.wins += 1; localStorage.setItem('asaWins', state.wins); state.bots = state.bots.filter((bot) => bot !== target); updateHud(`${target.name} tagged with shield sparks. No blood effect.`); } else updateHud(`${target.name} shield hit for ${state.selectedGun.damage}.`); } else updateHud('Shot fired into the arena.'); syncProfileUi(); });
canvas.addEventListener('pointermove', (event) => { if (event.buttons) state.yaw += event.movementX || 0; });

if (state.profile) syncProfileUi();
renderModes();
