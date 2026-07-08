const HOME_URL = 'new_tab.html';
const ISTEK_AI_URL = 'https://geniusvideogamer2.github.io/pados/';

const tabs = [
  { id: crypto.randomUUID(), title: 'Yeni Sekme', url: HOME_URL, locked: false },
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
const searchButton = document.querySelector('#search-button');
const geminiModeButton = document.querySelector('#gemini-mode-button');
const geminiAnswer = document.querySelector('#gemini-answer');
let geminiMode = false;

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
  if (url === HOME_URL || url.endsWith('/new_tab.html')) return 'Yeni Sekme';
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

async function askGemini(question) {
  const prompt = question.trim();
  if (!prompt) {
    geminiAnswer.textContent = 'Type a question for Gemini AI.';
    return;
  }
  geminiAnswer.textContent = 'Gemini AI is thinking…';
  if (window.IstekGemini?.ask) {
    window.IstekGemini.ask(prompt);
    return;
  }
  geminiAnswer.textContent = 'Gemini AI is available inside the Android app when GEMINI_API_KEY is configured. Searching Google instead.';
  navigateActiveTab(createSearchUrl(prompt));
}

function setGeminiMode(enabled) {
  geminiMode = enabled;
  geminiModeButton.setAttribute('aria-pressed', String(enabled));
  geminiModeButton.classList.toggle('is-active', enabled);
  searchButton.textContent = enabled ? 'Ask Gemini' : 'Search Google';
  addressInput.placeholder = enabled ? 'Ask Gemini AI anything' : 'Search Google or type a website address';
}

window.receiveGeminiAnswer = (answer) => {
  geminiAnswer.textContent = answer || 'Gemini AI returned an empty answer.';
};

addressForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (geminiMode) {
    askGemini(addressInput.value);
    return;
  }
  navigateActiveTab(createSearchUrl(addressInput.value));
});

heroSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  navigateActiveTab(createSearchUrl(heroSearchInput.value));
});

geminiModeButton.addEventListener('click', () => setGeminiMode(!geminiMode));
newTabButton.addEventListener('click', () => addTab(HOME_URL));
document.querySelectorAll('[data-quick]').forEach((button) => button.addEventListener('click', () => navigateActiveTab(button.dataset.quick)));

window.istekBrowser = { newPage: addTab, goToIstekAi: () => activateTab(tabs[1].id), search: (query) => navigateActiveTab(createSearchUrl(query)) };
activateTab(activeTabId);
