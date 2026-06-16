/* ============================================================
   次元书屋 · 阅读器逻辑
   章节加载 + 阅读设置 + 进度保存 + 目录导航
   ============================================================ */

/* ---------- 基础数据 ---------- */
const NOVELS_META = [
  { id:1, title:'无职转生', chapters:264 },
  { id:2, title:'刀剑神域', chapters:276 },
  { id:3, title:'转生史莱姆', chapters:304 },
  { id:4, title:'实力至上主义教室', chapters:205 },
  { id:5, title:'魔法禁书目录', chapters:503 },
  { id:6, title:'我的青春恋爱物语果然有问题', chapters:148 },
  { id:7, title:'路人女主的养成方法', chapters:131 },
  { id:8, title:'命运石之门', chapters:92 },
  { id:9, title:'No Game No Life', chapters:116 },
  { id:10, title:'为美好的世界献上祝福', chapters:172 },
  { id:11, title:'Re:从零开始的异世界生活', chapters:242 },
  { id:12, title:'葬送的芙莉莲', chapters:138 },
  { id:13, title:'86-不存在的战区', chapters:133 },
  { id:14, title:'狼与香辛料', chapters:202 },
  { id:15, title:'文学少女', chapters:89 },
  { id:16, title:'奇诺之旅', chapters:168 },
  { id:17, title:'物语系列', chapters:326 },
  { id:18, title:'笨蛋测试召唤兽', chapters:127 },
  { id:19, title:'凉宫春日的忧郁', chapters:128 },
  { id:20, title:'不正经的魔术讲师与禁忌教典', chapters:246 }
];

const PLACEHOLDER_PARAGRAPHS = [
  '这是故事的一个转折点。主角在经历了重重困难之后，终于迎来了新的机遇。命运的齿轮开始转动，前方的道路依然充满未知，但内心的信念从未动摇。',
  '风从窗外吹进来，带着一丝凉意。四周的景色在视野中逐渐模糊，脑海中浮现出过往的种种片段。那些曾经以为无法跨越的障碍，如今想来也不过如此。',
  '「所以说，这就是你的答案吗？」对方的眼神中带着复杂的情绪，有失望，也有期待。这个问题没有标准答案，重要的是选择之后的道路。',
  '时间在这一刻仿佛静止了。所有声音都远去，只剩下心跳声在胸腔中回响。这或许是最后一次机会，必须做出正确的判断。',
  '回想起来，一切的开始不过是一个微不足道的决定。正是那个看似无关紧要的选择，将人生引向了完全不同的方向。命运往往就藏在这些细节之中。',
  '周围的人群熙熙攘攘，每个人都在为自己的目标奔波。在这喧嚣之中，却有一个声音格外清晰——那是来自内心深处的呼唤。',
  '夕阳将天空染成金红色，远处传来悠扬的钟声。这样宁静的时刻让人不禁思考，到底什么才是生命中真正重要的东西。',
  '雨淅淅沥沥地下着，敲打着窗棂。雨天总是让人多愁善感，却也正是在这样的氛围中，最容易产生灵感。新的计划在心中逐渐成形。',
  '翻开旧日的笔记，泛黄的纸页上记录着青涩的梦想。虽然有些已经实现，有些已经放弃，但每一页都承载着不可替代的回忆。',
  '「无论如何，我不会放弃。」这句话虽然简单，却蕴含着巨大的力量。只要还有一口气在，就要继续向前，这就是生存的意志。',
  '夜空中繁星点点，每一颗星辰都代表着一种可能性。宇宙的浩瀚让人渺小，但也正因如此，才更要在有限的时间里创造无限的价值。',
  '街道两旁的樱花树正在盛开，粉色的花瓣随风飘落。春天是万物复苏的季节，也是最适合重新开始的时刻。'
];

/* ---------- 全局状态 ---------- */
let currentNovel = null;
let currentChapter = 1;
let totalChapters = 1;
let scrollMode = 'scroll';

/* ---------- 初始化 ---------- */
(function init() {
  const params = new URLSearchParams(location.search);
  const novelId = parseInt(params.get('id')) || 1;
  const chapter = parseInt(params.get('ch')) || 1;

  currentNovel = NOVELS_META.find(n => n.id === novelId) || NOVELS_META[0];
  totalChapters = currentNovel.chapters;
  currentChapter = Math.min(Math.max(chapter, 1), totalChapters);

  document.getElementById('novelTitle').textContent = currentNovel.title;

  loadSettings();
  renderCatalog();
  loadChapter(currentChapter);
  updateProgress();
  bindScroll();
  bindBackTop();

  // 保存阅读历史
  saveHistory(novelId, currentChapter);

  // 尝试加载完整小说数据
  try {
    fetch('../assets/data/novels.json')
      .then(r => r.json())
      .then(data => {
        const full = data.find(n => n.id === novelId);
        if (full) {
          currentNovel = { ...currentNovel, ...full };
          document.getElementById('novelTitle').textContent = currentNovel.title;
          renderCatalog();
        }
      }).catch(() => {});
  } catch(e) {}
})();

/* ---------- 章节内容生成 ---------- */
function generateChapterContent(novel, ch) {
  const title = `第${ch}章`;
  const paragraphs = [];
  const count = 8 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    paragraphs.push(PLACEHOLDER_PARAGRAPHS[(i + ch * 3) % PLACEHOLDER_PARAGRAPHS.length]);
  }
  return { title, paragraphs };
}

function loadChapter(ch) {
  if (ch < 1) ch = 1;
  if (ch > totalChapters) ch = totalChapters;
  currentChapter = ch;

  const content = generateChapterContent(currentNovel, ch);
  const chapterInfo = document.getElementById('chapterInfo');
  const chapterText = document.getElementById('chapterText');

  chapterInfo.innerHTML = `
    <h1>${content.title}</h1>
    <div class="chapter-meta">${currentNovel.title} · ${currentNovel.author || '未知作者'}</div>
  `;

  chapterText.innerHTML = content.paragraphs.map((p, i) => {
    if (i === Math.floor(content.paragraphs.length / 2)) {
      return `<p>${p}</p><div class="divider">* * *</div>`;
    }
    return `<p>${p}</p>`;
  }).join('');

  // 更新目录高亮
  document.querySelectorAll('.catalog-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.querySelector(`.catalog-item[data-ch="${ch}"]`);
  if (activeItem) activeItem.classList.add('active');

  // 更新按钮状态
  document.getElementById('btnPrev').disabled = ch <= 1;
  document.getElementById('btnNext').disabled = ch >= totalChapters;

  // 保存进度
  saveProgress(currentNovel.id, ch);
  saveHistory(currentNovel.id, ch);

  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevChapter() {
  if (currentChapter > 1) loadChapter(currentChapter - 1);
}
function nextChapter() {
  if (currentChapter < totalChapters) loadChapter(currentChapter + 1);
}

/* ---------- 章节目录 ---------- */
function renderCatalog() {
  const list = document.getElementById('catalogList');
  const progress = Storage.get('readProgress') || {};
  const readChapters = progress[currentNovel.id] || [];

  let html = '';
  for (let i = 1; i <= totalChapters; i++) {
    const isRead = readChapters.includes(i);
    html += `
      <div class="catalog-item ${i === currentChapter ? 'active' : ''}" data-ch="${i}" onclick="loadChapter(${i}); toggleCatalog();">
        <span>第${i}章</span>
        ${isRead ? '<span class="read-mark">已读</span>' : ''}
      </div>`;
  }
  list.innerHTML = html;
}

function toggleCatalog() {
  const drawer = document.getElementById('catalogDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
  } else {
    drawer.classList.add('open');
    overlay.classList.add('show');
  }
}

/* ---------- 阅读设置 ---------- */
function loadSettings() {
  const settings = Storage.get('readerSettings') || {};
  const fontSize = settings.fontSize || 18;
  const lineHeight = settings.lineHeight || 1.8;
  const theme = settings.theme || 'light';
  scrollMode = settings.scrollMode || 'scroll';

  setFontSize(fontSize);
  setLineHeight(lineHeight);
  setTheme(theme);
  setScrollMode(scrollMode);
}

function changeFontSize(delta) {
  const el = document.getElementById('chapterText');
  const current = parseFloat(window.getComputedStyle(el).fontSize);
  const newSize = Math.min(Math.max(current + delta, 14), 28);
  setFontSize(newSize);
  saveSettings();
}
function setFontSize(size) {
  document.getElementById('chapterText').style.fontSize = size + 'px';
  document.getElementById('fontSizeVal').textContent = Math.round(size);
}

function changeLineHeight(delta) {
  const el = document.getElementById('chapterText');
  const current = parseFloat(window.getComputedStyle(el).lineHeight);
  // lineHeight might be 'normal' or a number; handle carefully
  const computed = window.getComputedStyle(el).lineHeight;
  let base = parseFloat(computed);
  if (isNaN(base)) base = 1.8;
  const newVal = Math.min(Math.max(parseFloat((base + delta).toFixed(1)), 1.2), 2.5);
  setLineHeight(newVal);
  saveSettings();
}
function setLineHeight(val) {
  document.getElementById('chapterText').style.lineHeight = val;
  document.getElementById('lineHeightVal').textContent = val.toFixed(1);
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-dot').forEach(d => d.classList.toggle('active', d.dataset.theme === theme));
  saveSettings();
}

function setScrollMode(mode) {
  scrollMode = mode;
  document.getElementById('btnScroll').classList.toggle('active', mode === 'scroll');
  document.getElementById('btnPage').classList.toggle('active', mode === 'page');
  saveSettings();
}

function toggleSettings() {
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    overlay.classList.remove('show');
  } else {
    panel.classList.add('open');
    overlay.classList.add('show');
  }
}

function saveSettings() {
  const el = document.getElementById('chapterText');
  const settings = {
    fontSize: parseFloat(window.getComputedStyle(el).fontSize),
    lineHeight: parseFloat(window.getComputedStyle(el).lineHeight) || 1.8,
    theme: document.body.getAttribute('data-theme') || 'light',
    scrollMode: scrollMode
  };
  Storage.set('readerSettings', settings);
}

/* ---------- 进度保存 ---------- */
function saveProgress(novelId, ch) {
  const progress = Storage.get('readProgress') || {};
  if (!progress[novelId]) progress[novelId] = [];
  if (!progress[novelId].includes(ch)) progress[novelId].push(ch);
  Storage.set('readProgress', progress);
}

function saveHistory(novelId, ch) {
  const history = Storage.get('readHistory') || [];
  const idx = history.findIndex(h => h.id === novelId);
  const entry = { id: novelId, chapter: ch, title: currentNovel.title, time: Date.now() };
  if (idx >= 0) history.splice(idx, 1);
  history.unshift(entry);
  if (history.length > 50) history.length = 50;
  Storage.set('readHistory', history);
}

/* ---------- 滚动进度 ---------- */
function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = pct + '%';
}
function bindScroll() {
  window.addEventListener('scroll', () => {
    updateProgress();
    const backTop = document.getElementById('backTop');
    if (window.scrollY > 400) backTop.classList.add('show');
    else backTop.classList.remove('show');
  });
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- 键盘/触摸 ---------- */
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevChapter();
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') nextChapter();
  if (e.key === 'Escape') {
    document.getElementById('catalogDrawer').classList.remove('open');
    document.getElementById('settingsPanel').classList.remove('open');
    document.querySelectorAll('.drawer-overlay').forEach(o => o.classList.remove('show'));
  }
});

let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 60) {
    if (dx < 0) nextChapter();
    else prevChapter();
  }
});

/* ---------- 返回 ---------- */
function goBack() {
  window.location.href = 'library.html';
}
