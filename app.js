const starterChannels = [
  { name: 'TRT 1', category: 'National', language: 'Turkish', source: '', note: 'Official stream URL required' },
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
  { name: 'A Spor', category: 'Sports', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Sports TV', category: 'Sports', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'TRT Çocuk', category: 'Kids', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Minika Çocuk', category: 'Kids', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Minika GO', category: 'Kids', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Kral Pop TV', category: 'Music', language: 'Turkish', source: '', note: 'Official stream URL required' },
  { name: 'Dream Türk', category: 'Music', language: 'Turkish', source: '', note: 'Official stream URL required' },
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

const state = {
  channels: [...starterChannels],
  favorites: new Set(JSON.parse(localStorage.getItem('turksatFavorites') || '[]')),
  filter: 'all',
  query: '',
  selectedChannel: null
};

const channelList = document.querySelector('#channel-list');
const channelTemplate = document.querySelector('#channel-template');
const channelCount = document.querySelector('#channel-count');
const searchInput = document.querySelector('#channel-search');
const chips = document.querySelectorAll('.chip');
const player = document.querySelector('#tv-player');
const playerEmpty = document.querySelector('#player-empty');
const playerTitle = document.querySelector('#player-title');
const channelMeta = document.querySelector('#channel-meta');
const streamForm = document.querySelector('#stream-form');
const streamName = document.querySelector('#stream-name');
const streamUrl = document.querySelector('#stream-url');
const playlistForm = document.querySelector('#playlist-form');
const playlistFile = document.querySelector('#playlist-file');
const favoriteButton = document.querySelector('#favorite-button');
const signalLabel = document.querySelector('#signal-label');
let hlsInstance = null;

function normalize(value) {
  return value.toLocaleLowerCase('tr-TR');
}

function getVisibleChannels() {
  const query = normalize(state.query.trim());
  return state.channels.filter((channel) => {
    const matchesFilter = state.filter === 'all' || channel.category === state.filter;
    const searchable = normalize(`${channel.name} ${channel.category} ${channel.language} ${channel.note || ''}`);
    return matchesFilter && (!query || searchable.includes(query));
  });
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toLocaleUpperCase('tr-TR');
}

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

function setSignal(message) {
  signalLabel.textContent = message;
}

function playSource(source) {
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

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
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }
  player.removeAttribute('src');
  player.load();
}

function selectChannel(channel) {
  state.selectedChannel = channel;
  playerTitle.textContent = channel.name;
  channelMeta.textContent = `${channel.category} • ${channel.language} • ${channel.source ? 'Live stream loaded' : 'Paste or import an official stream URL to watch.'}`;
  favoriteButton.disabled = false;
  favoriteButton.setAttribute('aria-pressed', String(state.favorites.has(channel.name)));
  favoriteButton.textContent = state.favorites.has(channel.name) ? '★ Favorite' : '☆ Favorite';

  if (channel.source) {
    playSource(channel.source);
    playerEmpty.classList.add('is-hidden');
    setSignal('Streaming');
  } else {
    clearPlayer();
    playerEmpty.classList.remove('is-hidden');
    setSignal('Needs URL');
  }

  renderChannels();
}

function upsertChannel(channel) {
  const existingIndex = state.channels.findIndex((item) => item.name === channel.name);
  if (existingIndex >= 0) {
    state.channels[existingIndex] = { ...state.channels[existingIndex], ...channel };
    return state.channels[existingIndex];
  }

  state.channels.unshift(channel);
  return channel;
}

function parseM3U(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const imported = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith('#EXTINF')) continue;

    const name = line.split(',').pop()?.trim() || `Imported channel ${imported.length + 1}`;
    const groupMatch = line.match(/group-title="([^"]+)"/i);
    const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
    const source = lines[index + 1]?.startsWith('#') ? '' : lines[index + 1];

    if (source) {
      imported.push({
        name,
        category: groupMatch?.[1] || 'Imported',
        language: 'Playlist',
        logo: logoMatch?.[1] || '',
        source,
        note: 'Imported legal stream'
      });
    }
  }

  return imported;
}

searchInput.addEventListener('input', (event) => {
  state.query = event.target.value;
  renderChannels();
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('is-active'));
    chip.classList.add('is-active');
    state.filter = chip.dataset.filter;
    renderChannels();
  });
});

streamForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const channel = upsertChannel({
    name: streamName.value.trim() || 'Custom live stream',
    category: 'Imported',
    language: 'Custom',
    source: streamUrl.value.trim(),
    note: 'Manual stream URL'
  });
  renderChannels();
  selectChannel(channel);
  streamForm.reset();
});

playlistForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = playlistFile.files?.[0];
  if (!file) {
    setSignal('Choose file');
    return;
  }

  const text = await file.text();
  const imported = parseM3U(text);
  imported.forEach(upsertChannel);
  renderChannels();
  setSignal(imported.length ? `${imported.length} added` : 'No streams found');
  if (imported[0]) selectChannel(imported[0]);
  playlistForm.reset();
});

favoriteButton.addEventListener('click', () => {
  if (!state.selectedChannel) return;

  if (state.favorites.has(state.selectedChannel.name)) {
    state.favorites.delete(state.selectedChannel.name);
  } else {
    state.favorites.add(state.selectedChannel.name);
  }

  localStorage.setItem('turksatFavorites', JSON.stringify([...state.favorites]));
  selectChannel(state.selectedChannel);
});

player.addEventListener('error', () => {
  setSignal('Stream error');
  channelMeta.textContent = 'The stream could not be played by this browser. Check that the URL is legal, online, and CORS-enabled.';
});

favoriteButton.disabled = true;
renderChannels();
