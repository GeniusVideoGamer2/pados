const youtubeChannel = {
  name: 'GameX T U R K',
  category: 'YouTube',
  language: 'Turkish',
  source: 'https://www.youtube.com/@GameX_T_U_R_K/videos',
  note: 'YouTube channel videos (internet required)',
  sourceLabel: 'YouTube channel',
  type: 'youtube',
  embed: 'https://www.youtube.com/embed?listType=user_uploads&list=GameX_T_U_R_K'
};

const starterChannels = [
  youtubeChannel,
  { name: 'TRT 1', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT 2', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kanal D', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Show TV', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'ATV', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Star TV', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'NOW', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TV8', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kanal 7', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT Haber', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'CNN Türk', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'NTV', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Habertürk', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'A Haber', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TGRT Haber', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT Spor', category: 'Sports', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT Belgesel', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'A Spor', category: 'Sports', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Sports TV', category: 'Sports', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'beIN SPORTS 1', category: 'Sports', language: 'Turkish', source: '', note: 'No public internet stream available; official Digiturk subscription stream required' },
  { name: 'beIN SPORTS 2', category: 'Sports', language: 'Turkish', source: '', note: 'No public internet stream available; official Digiturk subscription stream required' },
  { name: 'beIN SPORTS 3', category: 'Sports', language: 'Turkish', source: '', note: 'No public internet stream available; official Digiturk subscription stream required' },
  { name: 'beIN SPORTS 4', category: 'Sports', language: 'Turkish', source: '', note: 'No public internet stream available; official Digiturk subscription stream required' },
  { name: 'beIN SPORTS 5', category: 'Sports', language: 'Turkish', source: '', note: 'No public internet stream available; official Digiturk subscription stream required' },
  { name: 'beIN SPORTS MAX 1', category: 'Sports', language: 'Turkish', source: '', note: 'No public internet stream available; official Digiturk subscription stream required' },
  { name: 'beIN SPORTS MAX 2', category: 'Sports', language: 'Turkish', source: '', note: 'No public internet stream available; official Digiturk subscription stream required' },
  { name: 'beIN SPORTS HABER', category: 'Sports', language: 'Turkish', source: '', note: 'Official public stream URL required' },
  { name: 'beIN SPORTS XTRA', category: 'Sports', language: 'English', source: '', note: 'Free public internet live stream' },
  { name: 'beIN SPORTS XTRA en Español', category: 'Sports', language: 'Spanish', source: '', note: 'Free public internet live stream' },
  { name: 'TRT Çocuk', category: 'Kids', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Minika Çocuk', category: 'Kids', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Minika GO', category: 'Kids', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kral Pop TV', category: 'Music', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Dream Türk', category: 'Music', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT Müzik', category: 'Music', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: '24 TV', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Beyaz TV', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Tele 1', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Halk TV', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Bloomberg HT', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Ülke TV', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kanal B', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Flash Haber', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TV 100', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Ekotürk', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT Avaz', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT Türk', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT World', category: 'News', language: 'English', source: '', note: 'Official stream URL required' },
  { name: 'Kanal 24', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Dost TV', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Semerkand TV', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kon TV', category: 'Local', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kanal 26', category: 'Local', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kayseri TV', category: 'Local', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Çay TV', category: 'Local', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kanal Urfa', category: 'Local', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Bengütürk TV', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Akit TV', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Ulusal Kanal', category: 'News', language: 'Turkish', source: '', note: 'Official stream URL required' }
];

const publicStreamOverrides = {
  'TRT 1': 'https://tv-trt1.medya.trt.com.tr/master.m3u8',
  'TRT 2': 'https://tv-trt2.medya.trt.com.tr/master.m3u8',
  'TRT Haber': 'https://tv-trthaber.medya.trt.com.tr/master.m3u8',
  'TRT Spor': 'https://tv-trtspor1.medya.trt.com.tr/master.m3u8',
  'TRT Çocuk': 'https://tv-trtcocuk.medya.trt.com.tr/master.m3u8',
  'TRT Müzik': 'https://tv-trtmuzik.medya.trt.com.tr/master.m3u8',
  'TRT World': 'https://tv-trtworld.medya.trt.com.tr/master.m3u8',
  'beIN SPORTS XTRA': 'https://bein-xtra-bein.amagi.tv/playlist.m3u8',
  'beIN SPORTS XTRA en Español': 'https://bein-esp-klowdtv.amagi.tv/playlist.m3u8'
};

starterChannels.forEach((channel) => {
  const stream = publicStreamOverrides[channel.name];
  if (!stream) return;
  channel.source = stream;
  channel.note = channel.name.startsWith('beIN SPORTS XTRA') ? 'Free public internet HLS stream' : 'Public internet HLS stream';
  channel.sourceLabel = channel.name.startsWith('beIN SPORTS XTRA') ? 'beIN SPORTS XTRA public FAST stream' : 'TRT public web stream';
});

const remotePlaylists = [{ label: 'IPTV-Org Turkey public playlist', url: 'https://iptv-org.github.io/iptv/countries/tr.m3u' }];
const state = { channels: [...starterChannels], favorites: new Set(JSON.parse(localStorage.getItem('turksatFavorites') || '[]')), filter: 'all', query: '', selectedChannel: null };
const channelList = document.querySelector('#channel-list');
const channelTemplate = document.querySelector('#channel-template');
const channelCount = document.querySelector('#channel-count');
const searchInput = document.querySelector('#channel-search');
const chips = document.querySelectorAll('.chip');
const player = document.querySelector('#tv-player');
const youtubePanel = document.querySelector('#youtube-panel');
const youtubeOpenButton = document.querySelector('#youtube-open-button');
const playerEmpty = document.querySelector('#player-empty');
const playerTitle = document.querySelector('#player-title');
const channelMeta = document.querySelector('#channel-meta');
const streamForm = document.querySelector('#stream-form');
const streamName = document.querySelector('#stream-name');
const streamUrl = document.querySelector('#stream-url');
const playlistForm = document.querySelector('#playlist-form');
const playlistFile = document.querySelector('#playlist-file');
const favoriteButton = document.querySelector('#favorite-button');
const remotePlaylistButton = document.querySelector('#remote-playlist-button');
const remotePlaylistStatus = document.querySelector('#remote-playlist-status');
const signalLabel = document.querySelector('#signal-label');
const playerCard = document.querySelector('.player-card');
const previousChannelButton = document.querySelector('#previous-channel-button');
const nextChannelButton = document.querySelector('#next-channel-button');
const volumeUpButton = document.querySelector('#volume-up-button');
const volumeDownButton = document.querySelector('#volume-down-button');
const fullscreenButton = document.querySelector('#fullscreen-button');
let hlsInstance = null;

function normalize(value) { return value.toLocaleLowerCase('tr-TR'); }
function getVisibleChannels() {
  const query = normalize(state.query.trim());
  return state.channels.filter((channel) => {
    const searchable = normalize(`${channel.name} ${channel.category} ${channel.language} ${channel.note || ''}`);
    return (state.filter === 'all' || channel.category === state.filter) && (!query || searchable.includes(query));
  });
}
function getInitials(name) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr-TR'); }
function setSignal(message) { signalLabel.textContent = message; }
function renderChannels() {
  const visibleChannels = getVisibleChannels();
  channelList.replaceChildren();
  channelCount.textContent = `${visibleChannels.length}/${state.channels.length}`;
  visibleChannels.forEach((channel) => {
    const item = channelTemplate.content.firstElementChild.cloneNode(true);
    item.dataset.name = channel.name;
    item.classList.toggle('is-selected', state.selectedChannel?.name === channel.name);
    item.querySelector('.channel-logo').textContent = getInitials(channel.name);
    item.querySelector('strong').textContent = channel.name;
    item.querySelector('small').textContent = `${channel.language} • ${channel.note || 'Ready to play'}`;
    item.querySelector('.channel-badge').textContent = channel.category;
    item.addEventListener('click', () => selectChannel(channel));
    channelList.append(item);
  });
}
function playSource(source) {
  if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null; }
  if (source.includes('.m3u8') && window.Hls?.isSupported()) {
    hlsInstance = new window.Hls();
    hlsInstance.loadSource(source);
    hlsInstance.attachMedia(player);
    return;
  }
  player.src = source;
  player.load();
}
function clearPlayer() {
  if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null; }
  player.removeAttribute('src');
  player.load();
}

function getPlayableChannels() {
  return state.channels.filter((channel) => channel.source);
}

function toggleYoutubePanel(channel) {
  const isYoutube = channel?.type === 'youtube';
  youtubePanel.classList.toggle('is-hidden', !isYoutube);
  player.classList.toggle('is-hidden', isYoutube);
  if (isYoutube) youtubeOpenButton.href = channel.source;
}

function selectAdjacentChannel(direction) {
  const playableChannels = getPlayableChannels();
  if (!playableChannels.length) {
    setSignal('No streams');
    return;
  }

  const currentIndex = Math.max(0, playableChannels.findIndex((channel) => channel.name === state.selectedChannel?.name));
  const nextIndex = (currentIndex + direction + playableChannels.length) % playableChannels.length;
  selectChannel(playableChannels[nextIndex]);
}

function adjustPlayerVolume(delta) {
  player.muted = false;
  player.volume = Math.min(1, Math.max(0, player.volume + delta));
  setSignal(`Volume ${Math.round(player.volume * 100)}%`);
}

function syncFullscreenState() {
  const isFullscreen = document.fullscreenElement === playerCard;
  playerCard.classList.toggle('is-fullscreen', isFullscreen);
  fullscreenButton.textContent = isFullscreen ? '⛶ Exit full screen' : '⛶ Full screen';
  fullscreenButton.setAttribute('aria-pressed', String(isFullscreen));
}

async function togglePlayerFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await playerCard.requestFullscreen();
  } catch (error) {
    playerCard.classList.toggle('is-fullscreen');
    const isFullscreen = playerCard.classList.contains('is-fullscreen');
    fullscreenButton.textContent = isFullscreen ? '⛶ Exit full screen' : '⛶ Full screen';
    fullscreenButton.setAttribute('aria-pressed', String(isFullscreen));
  }
}
function selectChannel(channel) {
  state.selectedChannel = channel;
  playerTitle.textContent = channel.name;
  toggleYoutubePanel(channel);
  const streamStatus = channel.type === 'youtube' ? 'Open the internet channel page to see every uploaded video.' : channel.source ? `Live stream loaded${channel.sourceLabel ? ` from ${channel.sourceLabel}` : ''}` : 'Paste, import, or fetch an official/public stream URL to watch.';
  channelMeta.textContent = `${channel.category} • ${channel.language} • ${streamStatus}`;
  favoriteButton.disabled = false;
  favoriteButton.setAttribute('aria-pressed', String(state.favorites.has(channel.name)));
  favoriteButton.textContent = state.favorites.has(channel.name) ? '★ Favorite' : '☆ Favorite';
  if (channel.type === 'youtube') { clearPlayer(); playerEmpty.classList.add('is-hidden'); setSignal(navigator.onLine ? 'YouTube ready' : 'Offline'); }
  else if (channel.source) { playSource(channel.source); playerEmpty.classList.add('is-hidden'); setSignal('Streaming'); }
  else { clearPlayer(); playerEmpty.classList.remove('is-hidden'); setSignal('Needs URL'); }
  renderChannels();
}
function upsertChannel(channel) {
  const existingIndex = state.channels.findIndex((item) => item.name === channel.name);
  if (existingIndex >= 0) { state.channels[existingIndex] = { ...state.channels[existingIndex], ...channel }; return state.channels[existingIndex]; }
  state.channels.unshift(channel);
  return channel;
}
function getM3UAttribute(line, attribute) {
  const quoted = line.match(new RegExp(`${attribute}="([^"]+)"`, 'i'));
  if (quoted) return quoted[1];
  const unquoted = line.match(new RegExp(`${attribute}=([^\\s,]+)`, 'i'));
  return unquoted?.[1] || '';
}
function parseM3U(text, defaults = {}) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const imported = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith('#EXTINF')) continue;
    const name = line.split(',').pop()?.trim() || `Imported channel ${imported.length + 1}`;
    const groupTitle = getM3UAttribute(line, 'group-title');
    const logo = getM3UAttribute(line, 'tvg-logo');
    let source = '';
    for (let sourceIndex = index + 1; sourceIndex < lines.length; sourceIndex += 1) {
      if (lines[sourceIndex].startsWith('#EXTINF')) break;
      if (lines[sourceIndex].startsWith('#')) continue;
      source = lines[sourceIndex];
      break;
    }
    if (source) imported.push({ name, category: groupTitle || defaults.category || 'Imported', language: defaults.language || 'Playlist', logo, source, note: defaults.note || 'Imported legal stream', sourceLabel: defaults.sourceLabel || 'M3U playlist' });
  }
  return imported;
}
searchInput.addEventListener('input', (event) => { state.query = event.target.value; renderChannels(); });
chips.forEach((chip) => chip.addEventListener('click', () => { chips.forEach((item) => item.classList.remove('is-active')); chip.classList.add('is-active'); state.filter = chip.dataset.filter; renderChannels(); }));
streamForm.addEventListener('submit', (event) => { event.preventDefault(); const channel = upsertChannel({ name: streamName.value.trim() || 'Custom live stream', category: 'Imported', language: 'Custom', source: streamUrl.value.trim(), note: 'Manual stream URL' }); renderChannels(); selectChannel(channel); streamForm.reset(); });
async function loadRemotePlaylists() {
  remotePlaylistButton.disabled = true;
  remotePlaylistStatus.textContent = 'Loading public internet streams…';
  setSignal('Loading web');
  try {
    const importedGroups = await Promise.all(remotePlaylists.map(async (playlist) => {
      const response = await fetch(playlist.url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`${playlist.label} returned ${response.status}`);
      return parseM3U(await response.text(), { category: 'Internet TV', language: 'Turkish', note: `Public internet stream from ${playlist.label}`, sourceLabel: playlist.label });
    }));
    const imported = importedGroups.flat();
    imported.forEach(upsertChannel);
    renderChannels();
    remotePlaylistStatus.textContent = imported.length ? `Added/updated ${imported.length} public internet streams.` : 'No playable streams were found in the public playlist.';
    setSignal(imported.length ? `${imported.length} web` : 'No streams');
    if (imported[0]) selectChannel(imported[0]);
  } catch (error) {
    remotePlaylistStatus.textContent = `Could not load streams: ${error.message}. Try again later or paste an M3U URL manually.`;
    setSignal('Web load error');
  } finally { remotePlaylistButton.disabled = false; }
}
playlistForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = playlistFile.files?.[0];
  if (!file) { setSignal('Choose file'); return; }
  const imported = parseM3U(await file.text());
  imported.forEach(upsertChannel);
  renderChannels();
  setSignal(imported.length ? `${imported.length} added` : 'No streams found');
  if (imported[0]) selectChannel(imported[0]);
  playlistForm.reset();
});
remotePlaylistButton.addEventListener('click', loadRemotePlaylists);
previousChannelButton.addEventListener('click', () => selectAdjacentChannel(-1));
nextChannelButton.addEventListener('click', () => selectAdjacentChannel(1));
volumeUpButton.addEventListener('click', () => adjustPlayerVolume(0.1));
volumeDownButton.addEventListener('click', () => adjustPlayerVolume(-0.1));
fullscreenButton.addEventListener('click', togglePlayerFullscreen);
document.addEventListener('fullscreenchange', syncFullscreenState);
window.turksatPlayerControls = {
  nextChannel: () => selectAdjacentChannel(1),
  previousChannel: () => selectAdjacentChannel(-1),
  volumeUp: () => adjustPlayerVolume(0.1),
  volumeDown: () => adjustPlayerVolume(-0.1),
  toggleFullscreen: togglePlayerFullscreen
};
favoriteButton.addEventListener('click', () => {
  if (!state.selectedChannel) return;
  if (state.favorites.has(state.selectedChannel.name)) state.favorites.delete(state.selectedChannel.name); else state.favorites.add(state.selectedChannel.name);
  localStorage.setItem('turksatFavorites', JSON.stringify([...state.favorites]));
  selectChannel(state.selectedChannel);
});
player.addEventListener('error', () => { setSignal('Stream error'); channelMeta.textContent = 'The stream could not be played by this browser. Check that the URL is legal, online, and CORS-enabled.'; });
favoriteButton.disabled = true;
renderChannels();
