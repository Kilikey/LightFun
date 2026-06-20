/* ============================================================
   次元书屋 · 书架逻辑
   加载书架数据 + 继续阅读 + 移除操作
   ============================================================ */

let NOVELS_MAP = {};

function initBookshelf() {
  fetch('../assets/data/novels.json')
    .then(r => r.json())
    .then(data => {
      NOVELS_MAP = {};
      data.forEach(n => {
        NOVELS_MAP[n.id] = { title: n.title, author: n.author, cover: n.cover, chapters: n.chapters };
      });
      renderBookshelf();
    })
    .catch(() => renderBookshelf());
}

function renderBookshelf() {
  const shelfIds = Storage.get('bookshelf') || [];
  const history = Storage.get('readHistory') || [];
  const progress = Storage.get('readProgress') || {};

  // 继续阅读区
  const latest = history[0];
  if (latest && NOVELS_MAP[latest.id]) {
    const n = NOVELS_MAP[latest.id];
    document.getElementById('continueReading').innerHTML = `
      <img class="continue-cover" src="${n.cover}" alt="${n.title}">
      <div class="continue-info">
        <h3>📖 继续阅读</h3>
        <div class="continue-ch">${n.title} · 第${latest.chapter}章</div>
        <a class="continue-btn" href="reader.html?id=${latest.id}&ch=${latest.chapter}">继续阅读 →</a>
      </div>
    `;
  } else {
    document.getElementById('continueReading').style.display = 'none';
  }

  // 书架网格
  const grid = document.getElementById('shelfGrid');
  const empty = document.getElementById('emptyState');
  document.getElementById('shelfCount').textContent = '共 ' + shelfIds.length + ' 本';

  if (shelfIds.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  empty.style.display = 'none';

  grid.innerHTML = shelfIds.map(id => {
    const n = NOVELS_MAP[id] || { title: '未知', author: '', cover: '../covers/01.jpg', chapters: 1 };
    const ch = progress[id] ? progress[id].length : 0;
    const pct = Math.round((ch / n.chapters) * 100);
    // 获取最后阅读章节，用于继续阅读
    const lastRead = progress[id] && progress[id].length > 0 ? Math.max(...progress[id]) : 1;
    return `
      <div class="shelf-card">
        <div class="cover-wrap" onclick="location.href='reader.html?id=${id}&ch=${lastRead}'" style="cursor:pointer">
          <img src="${n.cover}" alt="${n.title}" loading="lazy">
        </div>
        <div class="shelf-info">
          <h4>${n.title}</h4>
          <div class="author">${n.author}</div>
          <div class="shelf-progress"><span style="width:${pct}%"></span></div>
          <div class="shelf-progress-text">已读 ${ch}/${n.chapters} 章 (${pct}%)</div>
        </div>
        <div class="shelf-actions">
          <button onclick="location.href='reader.html?id=${id}&ch=${lastRead}'">阅读</button>
          <button class="btn-del" onclick="removeFromShelf(${id})">移除</button>
        </div>
      </div>`;
  }).join('');
}

function removeFromShelf(id) {
  const bs = Storage.get('bookshelf') || [];
  const idx = bs.indexOf(id);
  if (idx >= 0) {
    bs.splice(idx, 1);
    Storage.set('bookshelf', bs);
    showToast('🗑️ 已从书架移除');
    setTimeout(() => location.reload(), 400);
  }
}

initBookshelf();
