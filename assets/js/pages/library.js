/* ============================================================
   次元书屋 · 文库首页逻辑
   数据 + 轮播 + 更新列表 + 排行 + 搜索 + 模态框
   ============================================================ */


const FEATURED = [NOVELS[0], NOVELS[1], NOVELS[10], NOVELS[11], NOVELS[4]];
let curSlide = 0, slideTimer;

/* ---------- 初始化 ---------- */
(function(){
  const dotsEl = document.getElementById('carouselDots');
  FEATURED.forEach((_,i) => {
    const d = document.createElement('span');
    d.addEventListener('click', ()=>{ goSlide(i); resetSlideTimer(); });
    dotsEl.appendChild(d);
  });

  for(let i=0;i<FEATURED.length;i++) renderSlide(i);
  goSlide(0);
  resetSlideTimer();

  renderUpdates();
  renderRank();
  renderNewBooks();
  renderFilterTags();
  renderNovelGrid(NOVELS);
  renderTags();
  bindFilterEvents();

  const els = document.querySelectorAll('.a-l,.a-r,.a-b,.a-zb');
  if(els.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('a-visible');
      });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
  }

  // 异步加载 novels.json 作为未来验证
  try {
    fetch('../assets/data/novels.json')
      .then(r => r.json())
      .then(data => console.log('📚 novels.json 验证通过，共', data.length, '条'))
      .catch(() => {});
  } catch(e) {}

  // 检测 URL 搜索参数，自动填入并执行搜索
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    document.getElementById('searchInput').value = q;
    filterNovels();
    document.getElementById('allNovels').scrollIntoView({ behavior: 'smooth' });
  }
})();

/* ---------- 轮播 ---------- */
function renderSlide(idx) {
  const n = FEATURED[idx];
  const slide = document.getElementById('slide' + idx);
  if(!slide || !n) return;
  slide.innerHTML = `
    <div class="slide-bg" style="background-image:url('${n.cover}')"></div>
    <div class="slide-overlay"></div>
    <div class="slide-content">
      <img class="slide-cover" src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
      <div class="slide-text">
        <h2>${n.title}</h2>
        <div class="author">✎ ${n.author}</div>
        <div class="desc">${n.desc}</div>
        <div class="tags">${n.tags.map(t=>'<span>#'+t+'</span>').join('')}</div>
      </div>
    </div>`;
}

function goSlide(n) {
  document.querySelectorAll('.carousel-slide').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.carousel-dots span').forEach(d=>d.classList.remove('active'));
  curSlide = ((n % FEATURED.length) + FEATURED.length) % FEATURED.length;
  document.getElementById('slide'+curSlide).classList.add('active');
  document.querySelectorAll('.carousel-dots span')[curSlide].classList.add('active');
}
function changeSlide(dir) { goSlide(curSlide+dir); resetSlideTimer(); }
function resetSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goSlide(curSlide+1), 5000);
}

/* ---------- 更新列表 ---------- */
function renderUpdates() {
  const el = document.getElementById('updateList');
  const sorted = [...NOVELS].filter(n => n.update !== '完结' && n.update !== '长期休载' && n.update !== '1周前').sort((a,b) => {
    const order = {'2小时前':0,'3小时前':1,'5小时前':2,'昨天':3,'1天前':4,'2天前':5,'3天前':6,'4天前':7};
    return (order[a.update]||99) - (order[b.update]||99);
  }).slice(0, 8);
  el.innerHTML = sorted.map(n => `
    <div class="update-item" onclick="openModal(${n.id})">
      <img class="u-cover" src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
      <div class="u-info">
        <div class="u-title">${n.title}</div>
        <div class="u-chapter">📖 ${n.updateCh || '新章节'}</div>
      </div>
      <div class="u-time">${n.update}</div>
    </div>`).join('');
}

/* ---------- 排行 ---------- */
function renderRank() {
  const el = document.getElementById('rankList');
  const sorted = [...NOVELS].sort((a,b) => b.score - a.score).slice(0, 6);
  el.innerHTML = sorted.map((n,i) => `
    <div class="rank-item" onclick="openModal(${n.id})">
      <div class="rank-num ${i<3?'top3':''}">${i+1}</div>
      <img class="r-cover" src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
      <div class="r-info">
        <div class="r-title">${n.title}</div>
        <div class="r-score"><span class="stars">${Formatter.renderStars(n.score)}</span> ${n.score}</div>
      </div>
    </div>`).join('');
}

/* ---------- 新书上架 ---------- */
function renderNewBooks() {
  const el = document.getElementById('newBooksGrid');
  const newBooks = [NOVELS[13], NOVELS[18], NOVELS[15], NOVELS[16], NOVELS[19], NOVELS[12]];
  el.innerHTML = newBooks.map(n => `
    <div class="novel-card" onclick="openModal(${n.id})">
      <div class="cover-wrap">
        <img src="${n.cover}" alt="${n.title}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="novel-info">
        <h4>${n.title}</h4>
        <div class="author">${n.author}</div>
        <span class="status">${n.status==='completed'?'✅ 完结':'📖 连载中'}</span>
      </div>
    </div>`).join('');
}

/* ---------- 全部作品 / 搜索 ---------- */
function filterNovels() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!q) {
    renderNovelGrid(NOVELS);
    document.getElementById('searchClear').style.display = 'none';
    return;
  }
  document.getElementById('searchClear').style.display = 'flex';
  const results = searchNovels(q);
  renderNovelGrid(results, q);
  saveSearchHistory(q);
}

function searchNovels(q) {
  const scored = NOVELS.map(n => {
    let score = 0;
    const qt = q.toLowerCase();
    const title = n.title.toLowerCase();
    const author = n.author.toLowerCase();
    const desc = n.desc.toLowerCase();
    const tags = n.tags.map(t => t.toLowerCase());

    // 标题匹配（权重最高）
    if (title === qt) score += 100;
    else if (title.startsWith(qt)) score += 80;
    else if (title.includes(qt)) score += 60;

    // 作者匹配
    if (author === qt) score += 70;
    else if (author.startsWith(qt)) score += 50;
    else if (author.includes(qt)) score += 40;

    // 标签匹配
    tags.forEach(t => {
      if (t === qt) score += 45;
      else if (t.includes(qt)) score += 30;
    });

    // 简介匹配
    if (desc.includes(qt)) score += 15;

    return { novel: n, score: score, novelScore: n.score };
  }).filter(item => item.score > 0);

  // 按搜索相关性排序，相同则按作品评分排序
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.novelScore - a.novelScore;
  });

  return scored.map(item => item.novel);
}

function renderNovelGrid(list, highlightQuery) {
  const el = document.getElementById('novelGrid');
  document.getElementById('novelCount').textContent = '共 ' + list.length + ' 部';

  let sortBar = '';
  if (highlightQuery && list.length > 0) {
    sortBar = `
      <div class="search-sort-bar" id="searchSortBar">
        <label>排序:</label>
        <button class="search-sort-btn active" onclick="sortSearchResults('relevance')" id="sort-relevance">相关度</button>
        <button class="search-sort-btn" onclick="sortSearchResults('score')" id="sort-score">评分</button>
        <button class="search-sort-btn" onclick="sortSearchResults('chapters')" id="sort-chapters">章节数</button>
      </div>`;
  }

  el.innerHTML = sortBar + list.map(n => {
    let title = n.title;
    let author = n.author;
    if (highlightQuery) {
      const q = highlightQuery.toLowerCase();
      const re = new RegExp(`(${escapeRegExp(q)})`, 'gi');
      title = title.replace(re, '<span class="highlight">$1</span>');
      author = author.replace(re, '<span class="highlight">$1</span>');
    }
    return `
      <div class="novel-card" onclick="openModal(${n.id})">
        <div class="cover-wrap">
          <img src="${n.cover}" alt="${n.title}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="novel-info">
          <h4>${title}</h4>
          <div class="author">${author}</div>
          <span class="status ${n.status==='completed'?'completed':''}">${n.status==='completed'?'✅ 完结':'📖 连载中'}</span>
        </div>
      </div>`;
  }).join('');
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let currentSearchResults = [];
let currentSearchQuery = '';

function sortSearchResults(by) {
  document.querySelectorAll('.search-sort-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sort-' + by).classList.add('active');

  let sorted = [...currentSearchResults];
  if (by === 'score') {
    sorted.sort((a, b) => b.score - a.score);
  } else if (by === 'chapters') {
    sorted.sort((a, b) => b.chapters - a.chapters);
  } else {
    // 相关度 - 重新计算
    sorted = searchNovels(currentSearchQuery);
  }
  renderNovelGrid(sorted, currentSearchQuery);
}

/* ---------- 搜索防抖 ---------- */
let searchDebounceTimer = null;
function handleSearchInput() {
  const q = document.getElementById('searchInput').value.trim();
  currentSearchQuery = q;
  currentSearchResults = q ? searchNovels(q) : [];

  if (q) {
    document.getElementById('searchClear').style.display = 'flex';
    renderSearchSuggestions(q);
    document.getElementById('searchSuggestions').style.display = 'block';
    document.getElementById('searchHistory').style.display = 'none';
    document.getElementById('searchHot').style.display = 'none';
    // 防抖自动搜索：停止输入 400ms 后自动执行
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      filterNovels();
    }, 400);
  } else {
    document.getElementById('searchClear').style.display = 'none';
    document.getElementById('searchSuggestions').style.display = 'none';
    renderSearchHistory();
    renderHotSearch();
    document.getElementById('searchHistory').style.display = 'block';
    document.getElementById('searchHot').style.display = 'block';
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    renderNovelGrid(NOVELS);
    document.getElementById('novelCount').textContent = '共 ' + NOVELS.length + ' 部';
  }
  showSearchPanel();
}

function handleSearchKey(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    filterNovels();
    hideSearchPanel();
    // 滚动到全部作品区域
    document.getElementById('allNovels').scrollIntoView({ behavior: 'smooth' });
  } else if (e.key === 'Escape') {
    hideSearchPanel();
  }
}

function showSearchPanel() {
  document.getElementById('searchPanel').classList.add('show');
  if (!document.getElementById('searchInput').value.trim()) {
    renderSearchHistory();
    renderHotSearch();
    document.getElementById('searchHistory').style.display = 'block';
    document.getElementById('searchHot').style.display = 'block';
  }
}

function hideSearchPanel() {
  document.getElementById('searchPanel').classList.remove('show');
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').style.display = 'none';
  renderNovelGrid(NOVELS);
  document.getElementById('novelCount').textContent = '共 ' + NOVELS.length + ' 部';
  hideSearchPanel();
  handleSearchInput();
}

/* ---------- 搜索历史 ---------- */
function saveSearchHistory(q) {
  if (!q) return;
  const history = Storage.get('searchHistory') || [];
  const idx = history.indexOf(q);
  if (idx >= 0) history.splice(idx, 1);
  history.unshift(q);
  if (history.length > 20) history.length = 20;
  Storage.set('searchHistory', history);
}

function renderSearchHistory() {
  const history = Storage.get('searchHistory') || [];
  const el = document.getElementById('historyList');
  if (history.length === 0) {
    document.getElementById('searchHistory').style.display = 'none';
    return;
  }
  document.getElementById('searchHistory').style.display = 'block';
  el.innerHTML = `<div class="search-tag-list">${history.map(h =>
    `<span class="search-tag history" onclick="applySearch('${h.replace(/'/g, "\\'")}')">${h}</span>`
  ).join('')}</div>`;
}

function clearSearchHistory() {
  Storage.remove('searchHistory');
  renderSearchHistory();
  event.stopPropagation();
}

function applySearch(q) {
  document.getElementById('searchInput').value = q;
  filterNovels();
  hideSearchPanel();
  document.getElementById('allNovels').scrollIntoView({ behavior: 'smooth' });
}

/* ---------- 热门搜索 ---------- */
const HOT_SEARCHES = [
  '异世界', '校园', '恋爱', '奇幻', '战斗',
  '败犬女主', '邻家天使', '毛妹', '影之实力者', '地错',
  '转生', '治愈', '日常', '悬疑', '科幻'
];

function renderHotSearch() {
  const el = document.getElementById('hotSearchList');
  el.innerHTML = `<div class="search-tag-list">${HOT_SEARCHES.map(h =>
    `<span class="search-tag hot" onclick="applySearch('${h.replace(/'/g, "\\'")}')">${h}</span>`
  ).join('')}</div>`;
}

/* ---------- 搜索建议 ---------- */
function renderSearchSuggestions(q) {
  const results = searchNovels(q).slice(0, 8);
  const el = document.getElementById('suggestionList');
  const qt = q.toLowerCase();
  const re = new RegExp(`(${escapeRegExp(qt)})`, 'gi');

  el.innerHTML = results.map(n => {
    let title = n.title.replace(re, '<span class="highlight">$1</span>');
    let author = n.author.replace(re, '<span class="highlight">$1</span>');
    let matchType = '';
    if (n.title.toLowerCase().includes(qt)) matchType = '标题';
    else if (n.author.toLowerCase().includes(qt)) matchType = '作者';
    else if (n.tags.some(t => t.toLowerCase().includes(qt))) matchType = '标签';
    else matchType = '简介';

    return `
      <div class="search-suggestion-item" onclick="applySearch('${n.title.replace(/'/g, "\\'")}')">
        <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
        <div class="sg-info">
          <div class="sg-title">${title}</div>
          <div class="sg-author">${author}</div>
        </div>
        <span class="sg-match">${matchType}</span>
      </div>`;
  }).join('');
}

// 点击外部关闭搜索面板
document.addEventListener('click', function(e) {
  const wrap = document.querySelector('.search-wrap');
  if (wrap && !wrap.contains(e.target)) {
    hideSearchPanel();
  }
});

/* ---------- Tags ---------- */
function renderTags() {
  const allTags = [
    {name:'异世界',size:5}, {name:'转生',size:4}, {name:'校园',size:4},
    {name:'科幻',size:4}, {name:'奇幻',size:5}, {name:'冒险',size:3},
    {name:'恋爱',size:3}, {name:'搞笑',size:3}, {name:'战斗',size:3},
    {name:'治愈',size:3}, {name:'悬疑',size:2}, {name:'智斗',size:2},
    {name:'人生',size:2}, {name:'日常',size:3}, {name:'魔法',size:4},
    {name:'战争',size:2}, {name:'机甲',size:2}, {name:'旅行',size:2},
    {name:'时间旅行',size:1}, {name:'学园',size:3}, {name:'心理',size:1}
  ];
  const el = document.getElementById('tagCloud');
  el.innerHTML = allTags.map(t => `<a class="tag s${t.size}" onclick="filterByTag('${t.name}')">${t.name}</a>`).join('');
}
function filterByTag(tag) {
  const filtered = NOVELS.filter(n => n.tags.includes(tag));
  renderNovelGrid(filtered);
  document.getElementById('searchInput').value = '';
  showToast('🏷️ 筛选: ' + tag + ' (' + filtered.length + '部)');
}

/* ---------- 模态框 ---------- */
function openModal(id) {
  const n = NOVELS.find(n => n.id === id);
  if(!n) return;
  const ratings = Storage.get('ratings') || {};
  const myRating = ratings[id] || 0;
  const progress = Storage.get('readProgress') || {};
  const readChapters = progress[id] || [];
  const totalRead = readChapters.length;
  const readPct = totalRead > 0 ? Math.round((totalRead / n.chapters) * 100) : 0;
  const lastRead = totalRead > 0 ? Math.max(...readChapters) : 0;
  const isOnShelf = (Storage.get('bookshelf') || []).includes(id);
  const el = document.getElementById('modalBody');
  el.innerHTML = `
    <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
    <div class="m-info">
      <h2>${n.title}</h2>
      <div class="m-author">✎ ${n.author}</div>
      <div class="m-tags">${n.tags.map(t=>'#'+t).join(' ')}</div>
      <div class="m-desc">${n.desc}</div>
      <div class="m-chapters">📖 共 ${n.chapters} 章 · ${n.status==='completed'?'✅ 已完结':'🔄 连载中'}<br>⭐ ${Formatter.renderStars(n.score)} ${n.score}</div>
      ${totalRead > 0 ? `
        <div class="m-read-progress" style="margin-top:0.8rem;padding:0.6rem 1rem;background:rgba(176,124,216,0.06);border-radius:12px;border:1px solid rgba(176,124,216,0.1);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
            <span style="font-size:0.8rem;font-weight:500;">📖 阅读进度</span>
            <span style="font-size:0.75rem;color:var(--text-muted);">${totalRead} / ${n.chapters} 章 (${readPct}%)</span>
          </div>
          <div style="height:4px;background:rgba(176,124,216,0.1);border-radius:2px;overflow:hidden;">
            <span style="display:block;height:100%;width:${readPct}%;background:linear-gradient(90deg,var(--color-secondary),var(--color-primary-light));border-radius:2px;"></span>
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.3rem;">上次读到：第${lastRead}章</div>
        </div>
      ` : ''}
      <div class="m-rating" style="margin-top:1rem;">
        <span style="font-size:0.8rem;color:rgba(61,61,74,0.4);margin-right:0.5rem;">我的评分:</span>
        <span class="rate-stars" id="rateStars" style="cursor:pointer;font-size:1.1rem;color:var(--color-gold);" onmouseleave="renderRateStars(${id},${myRating})">
          ${renderRateStarsHtml(id, myRating)}
        </span>
        <span id="rateScore" style="font-size:0.75rem;color:var(--text-muted);margin-left:0.3rem;">${myRating ? myRating + '星' : '未评分'}</span>
      </div>
      <div style="margin-top:1rem;">
        <button class="read-btn" onclick="startReading(${n.id})">${totalRead > 0 ? '▶ 继续阅读' : '开始阅读'}</button>
        <button class="read-btn" style="margin-left:0.5rem;background:linear-gradient(135deg,#f5b342,#f5a0b8);" onclick="addToBookshelf(${n.id})">${isOnShelf ? '✅ 已在书架' : '❤️ 加入书架'}</button>
      </div>
    </div>`;
  document.getElementById('modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function renderRateStarsHtml(id, current) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<span onmouseover="previewRateStars(${id},${i})" onclick="setRating(${id},${i})" style="display:inline-block;padding:0 2px;">${i <= current ? '★' : '☆'}</span>`;
  }
  return html;
}

function previewRateStars(id, score) {
  const el = document.getElementById('rateStars');
  if (!el) return;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<span style="display:inline-block;padding:0 2px;">${i <= score ? '★' : '☆'}</span>`;
  }
  el.innerHTML = html;
  const scoreEl = document.getElementById('rateScore');
  if (scoreEl) scoreEl.textContent = score + '星';
}

function setRating(id, score) {
  const ratings = Storage.get('ratings') || {};
  ratings[id] = score;
  Storage.set('ratings', ratings);
  showToast('⭐ 已评分 ' + score + ' 星');
  const el = document.getElementById('rateStars');
  if (el) el.innerHTML = renderRateStarsHtml(id, score);
  const scoreEl = document.getElementById('rateScore');
  if (scoreEl) scoreEl.textContent = score + '星';
  renderRateStars(id, score);
}

function renderRateStars(id, score) {
  const el = document.getElementById('rateStars');
  if (!el) return;
  el.innerHTML = renderRateStarsHtml(id, score);
  const scoreEl = document.getElementById('rateScore');
  if (scoreEl) scoreEl.textContent = score ? score + '星' : '未评分';
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  document.body.style.overflow = '';
}

/* ---------- 书架/阅读入口 ---------- */
function startReading(id) {
  const progress = Storage.get('readProgress') || {};
  const readChapters = progress[id] || [];
  let ch = 1;
  if (readChapters.length > 0) {
    ch = Math.max(...readChapters);
  }
  window.location.href = `reader.html?id=${id}&ch=${ch}`;
}
function addToBookshelf(id) {
  const bs = Storage.get('bookshelf') || [];
  if (!bs.includes(id)) {
    bs.push(id);
    Storage.set('bookshelf', bs);
    showToast('❤️ 已加入书架');
  } else {
    showToast('💡 该书已在书架中');
  }
}

/* ---------- 事件绑定 ---------- */
document.getElementById('modal').addEventListener('click', function(e) {
  if(e.target === this) closeModal();
});
document.addEventListener('keydown', function(e) {
  if(e.key === 'Escape') closeModal();
});

/* ---------- 筛选器 ---------- */
let activeFilters = { status: 'all', score: 'all', sort: 'default', tags: new Set() };

function renderFilterTags() {
  const tagCounts = {};
  NOVELS.forEach(n => {
    n.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; });
  });
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 20);
  const el = document.getElementById('filterTagList');
  if (!el) return;
  el.innerHTML = sortedTags.map(([tag, count]) =>
    `<button class="tag-chip" data-tag="${tag.replace(/'/g, "\\'")}">${tag} <small style="opacity:.5">${count}</small></button>`
  ).join('');
}

function bindFilterEvents() {
  document.querySelectorAll('.filter-options[data-filter]').forEach(group => {
    const type = group.dataset.filter;
    group.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilters[type] = btn.dataset.value;
        applyFilters();
      });
    });
  });

  const tagList = document.getElementById('filterTagList');
  if (tagList) {
    tagList.addEventListener('click', (e) => {
      const chip = e.target.closest('.tag-chip');
      if (!chip) return;
      const tag = chip.dataset.tag;
      if (activeFilters.tags.has(tag)) {
        activeFilters.tags.delete(tag);
        chip.classList.remove('active');
      } else {
        activeFilters.tags.add(tag);
        chip.classList.add('active');
      }
      applyFilters();
    });
  }
}

function applyFilters() {
  let results = [...NOVELS];

  // 状态筛选
  if (activeFilters.status !== 'all') {
    results = results.filter(n => n.status === activeFilters.status);
  }

  // 评分筛选
  if (activeFilters.score !== 'all') {
    const minScore = parseFloat(activeFilters.score);
    results = results.filter(n => n.score >= minScore);
  }

  // 标签筛选
  if (activeFilters.tags.size > 0) {
    results = results.filter(n => {
      return Array.from(activeFilters.tags).every(tag => n.tags.includes(tag));
    });
  }

  // 排序
  if (activeFilters.sort === 'score') {
    results.sort((a, b) => b.score - a.score);
  } else if (activeFilters.sort === 'chapters') {
    results.sort((a, b) => b.chapters - a.chapters);
  } else if (activeFilters.sort === 'update') {
    const updateWeight = {
      '2小时前': 100, '5小时前': 95, '昨天': 90, '1天前': 85, '2天前': 80,
      '3天前': 75, '4天前': 70, '5天前': 65, '6天前': 60, '1周前': 50,
      '完结': 10, '长期休刊': 5
    };
    results.sort((a, b) => (updateWeight[b.update] || 0) - (updateWeight[a.update] || 0));
  }

  renderNovelGrid(results);
  document.getElementById('novelCount').textContent = '共 ' + results.length + ' 部';
}

/* ---------- 覆盖原有的 filterNovels，使其与筛选器共存 ---------- */
const _origFilterNovels = filterNovels;
filterNovels = function() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!q) {
    applyFilters();
    document.getElementById('searchClear').style.display = 'none';
    return;
  }
  document.getElementById('searchClear').style.display = 'flex';
  let results = searchNovels(q);

  // 搜索时也要应用筛选器
  if (activeFilters.status !== 'all') {
    results = results.filter(n => n.status === activeFilters.status);
  }
  if (activeFilters.score !== 'all') {
    const minScore = parseFloat(activeFilters.score);
    results = results.filter(n => n.score >= minScore);
  }
  if (activeFilters.tags.size > 0) {
    results = results.filter(n => {
      return Array.from(activeFilters.tags).every(tag => n.tags.includes(tag));
    });
  }

  renderNovelGrid(results, q);
  saveSearchHistory(q);
};
