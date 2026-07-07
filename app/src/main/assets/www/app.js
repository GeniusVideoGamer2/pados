const HOME_URL = 'https://www.google.com/search?q=ISTEK';
const ISTEK_AI_URL = 'https://geniusvideogamer2.github.io/pados/';

const tabs = [
  { id: crypto.randomUUID(), title: 'Google', url: HOME_URL, locked: false },
  { id: crypto.randomUUID(), title: 'İstek AI', url: ISTEK_AI_URL, locked: true }
];

let activeTabId = tabs[0].id;
const tabStrip = document.querySelector('#tab-strip');
const frame = document.querySelector('#browser-frame');
const addressForm = document.querySelector('#address-form');
const addressInput = document.querySelector('#address-input');
const heroSearchForm = document.querySelector('#hero-search-form');
const heroSearchInput = document.querySelector('#hero-search-input');
const newTabButton = document.querySelector('#new-tab-button');

function createSearchUrl(value) {
  const text = value.trim();
  if (!text) return HOME_URL;
  const hasScheme = /^https?:\/\//i.test(text);
  const looksLikeSite = /\.[a-z]{2,}(\/|$)/i.test(text) || /^localhost(:\d+)?/i.test(text);
  if (hasScheme) return text;
  if (looksLikeSite) return `https://${text}`;
  return `https://www.google.com/search?q=${encodeURIComponent(text)}`;
}

function getActiveTab() {
  return tabs.find((tab) => tab.id === activeTabId) || tabs[0];
}

function titleForUrl(url) {
  if (url === ISTEK_AI_URL) return 'İstek AI';
  if (url.includes('google.com/search')) return 'Google';
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'Page'; }
}

function renderTabs() {
  tabStrip.replaceChildren();
  tabs.forEach((tab, index) => {
    const button = document.createElement('button');
    button.className = `tab glass-button${tab.id === activeTabId ? ' is-active' : ''}`;
    button.type = 'button';
    button.innerHTML = `<span>${index + 1}. ${tab.title}</span>${tab.locked ? '<small>always open</small>' : '<b aria-hidden="true">×</b>'}`;
    button.addEventListener('click', (event) => {
      if (event.target.tagName === 'B') {
        closeTab(tab.id);
        return;
      }
      activateTab(tab.id);
    });
    tabStrip.append(button);
  });
}

function activateTab(id) {
  activeTabId = id;
  const tab = getActiveTab();
  frame.src = tab.url;
  addressInput.value = tab.url;
  renderTabs();
}

function navigateActiveTab(url) {
  const tab = getActiveTab();
  tab.url = url;
  tab.title = titleForUrl(url);
  activateTab(tab.id);
}

function addTab(url = HOME_URL) {
  const tab = { id: crypto.randomUUID(), title: titleForUrl(url), url, locked: false };
  tabs.push(tab);
  activateTab(tab.id);
}

function closeTab(id) {
  const index = tabs.findIndex((tab) => tab.id === id);
  if (index < 0 || tabs[index].locked || tabs.length <= 2) return;
  tabs.splice(index, 1);
  if (activeTabId === id) activateTab(tabs[Math.max(0, index - 1)].id);
  else renderTabs();
}

addressForm.addEventListener('submit', (event) => {
  event.preventDefault();
  navigateActiveTab(createSearchUrl(addressInput.value));
});

heroSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  navigateActiveTab(createSearchUrl(heroSearchInput.value));
});

newTabButton.addEventListener('click', () => addTab('https://www.google.com/search?q=ISTEK'));
document.querySelectorAll('[data-quick]').forEach((button) => button.addEventListener('click', () => navigateActiveTab(button.dataset.quick)));

window.istekBrowser = { newPage: addTab, goToIstekAi: () => activateTab(tabs[1].id), search: (query) => navigateActiveTab(createSearchUrl(query)) };
activateTab(activeTabId);
