/* ============================================================
   次元书屋 · 书架逻辑
   加载书架数据 + 继续阅读 + 移除操作
   ============================================================ */

const NOVELS_MAP = {
  1: { title: '无职转生', author: '理不尽な孫の手', cover: '../assets/images/covers/01.jpg', chapters: 264 },
  2: { title: '刀剑神域', author: '川原礫', cover: '../assets/images/covers/02.jpg', chapters: 276 },
  3: { title: '转生史莱姆', author: '伏瀬', cover: '../assets/images/covers/03.jpg', chapters: 304 },
  4: { title: '实力至上主义教室', author: '衣笠彰梧', cover: '../assets/images/covers/04.jpg', chapters: 205 },
  5: { title: '魔法禁书目录', author: '鎌池和馬', cover: '../assets/images/covers/05.jpg', chapters: 503 },
  6: { title: '我的青春恋爱物语果然有问题', author: '渡航', cover: '../assets/images/covers/06.jpg', chapters: 148 },
  7: { title: '路人女主的养成方法', author: '丸戸史明', cover: '../assets/images/covers/07.jpg', chapters: 131 },
  8: { title: '命运石之门', author: '林直孝', cover: '../assets/images/covers/08.jpg', chapters: 92 },
  9: { title: 'No Game No Life', author: '榎宮祐', cover: '../assets/images/covers/09.jpg', chapters: 116 },
  10: { title: '为美好的世界献上祝福', author: '暁なつめ', cover: '../assets/images/covers/10.jpg', chapters: 172 },
  11: { title: 'Re:从零开始的异世界生活', author: '長月達平', cover: '../assets/images/covers/11.jpg', chapters: 242 },
  12: { title: '葬送的芙莉莲', author: '山田鐘人', cover: '../assets/images/covers/12.jpg', chapters: 138 },
  13: { title: '86-不存在的战区', author: '安里アサト', cover: '../assets/images/covers/13.jpg', chapters: 133 },
  14: { title: '狼与香辛料', author: '支倉凍砂', cover: '../assets/images/covers/14.jpg', chapters: 202 },
  15: { title: '文学少女', author: '野村美月', cover: '../assets/images/covers/15.jpg', chapters: 89 },
  16: { title: '奇诺之旅', author: '時雨沢恵一', cover: '../assets/images/covers/16.jpg', chapters: 168 },
  17: { title: '物语系列', author: '西尾維新', cover: '../assets/images/covers/17.jpg', chapters: 326 },
  18: { title: '笨蛋测试召唤兽', author: '井上堅二', cover: '../assets/images/covers/18.jpg', chapters: 127 },
  19: { title: '凉宫春日的忧郁', author: '谷川流', cover: '../assets/images/covers/19.jpg', chapters: 128 },
  20: { title: '不正经的魔术讲师与禁忌教典', author: '羊太郎', cover: '../assets/images/covers/20.jpg', chapters: 246 }
};

(function init() {
  const shelfIds = Storage.get('bookshelf') || [];
  const history = Storage.get('readHistory') || [];
  const progress = Storage.get('readProgress') || {};

  // 继续阅读区
  const latest = history[0];
  if (latest) {
    const n = NOVELS_MAP[latest.id];
    if (n) {
      document.getElementById('continueReading').innerHTML = `
        <img class="continue-cover" src="${n.cover}" alt="${n.title}">
        <div class="continue-info">
          <h3>📖 继续阅读</h3>
          <div class="continue-ch">${n.title} · 第${latest.chapter}章</div>
          <a class="continue-btn" href="reader.html?id=${latest.id}&ch=${latest.chapter}">继续阅读 →</a>
        </div>
      `;
    }
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

  grid.innerHTML = shelfIds.map(id => {
    const n = NOVELS_MAP[id] || NOVELS_MAP[1];
    const ch = progress[id] ? progress[id].length : 0;
    const pct = Math.round((ch / n.chapters) * 100);
    return `
      <div class="shelf-card">
        <div class="cover-wrap" onclick="location.href='reader.html?id=${id}&ch=${Math.max(ch, 1)}'" style="cursor:pointer">
          <img src="${n.cover}" alt="${n.title}" loading="lazy">
        </div>
        <div class="shelf-info">
          <h4>${n.title}</h4>
          <div class="author">${n.author}</div>
          <div class="shelf-progress"><span style="width:${pct}%"></span></div>
        </div>
        <div class="shelf-actions">
          <button onclick="location.href='reader.html?id=${id}&ch=${Math.max(ch, 1)}'">阅读</button>
          <button class="btn-del" onclick="removeFromShelf(${id})">移除</button>
        </div>
      </div>`;
  }).join('');
})();

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
