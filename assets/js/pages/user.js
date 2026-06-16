/* ============================================================
   次元书屋 · 个人中心逻辑
   统计 + 阅读历史 + 评分 + 阅读偏好
   ============================================================ */

const NOVELS_MAP = {
  1: { title: '无职转生', cover: '../assets/images/covers/01.jpg' },
  2: { title: '刀剑神域', cover: '../assets/images/covers/02.jpg' },
  3: { title: '转生史莱姆', cover: '../assets/images/covers/03.jpg' },
  4: { title: '实力至上主义教室', cover: '../assets/images/covers/04.jpg' },
  5: { title: '魔法禁书目录', cover: '../assets/images/covers/05.jpg' },
  6: { title: '我的青春恋爱物语果然有问题', cover: '../assets/images/covers/06.jpg' },
  7: { title: '路人女主的养成方法', cover: '../assets/images/covers/07.jpg' },
  8: { title: '命运石之门', cover: '../assets/images/covers/08.jpg' },
  9: { title: 'No Game No Life', cover: '../assets/images/covers/09.jpg' },
  10: { title: '为美好的世界献上祝福', cover: '../assets/images/covers/10.jpg' },
  11: { title: 'Re:从零开始的异世界生活', cover: '../assets/images/covers/11.jpg' },
  12: { title: '葬送的芙莉莲', cover: '../assets/images/covers/12.jpg' },
  13: { title: '86-不存在的战区', cover: '../assets/images/covers/13.jpg' },
  14: { title: '狼与香辛料', cover: '../assets/images/covers/14.jpg' },
  15: { title: '文学少女', cover: '../assets/images/covers/15.jpg' },
  16: { title: '奇诺之旅', cover: '../assets/images/covers/16.jpg' },
  17: { title: '物语系列', cover: '../assets/images/covers/17.jpg' },
  18: { title: '笨蛋测试召唤兽', cover: '../assets/images/covers/18.jpg' },
  19: { title: '凉宫春日的忧郁', cover: '../assets/images/covers/19.jpg' },
  20: { title: '不正经的魔术讲师与禁忌教典', cover: '../assets/images/covers/20.jpg' }
};

const THEME_NAME = { light: '浅色', sepia: '羊皮纸', dark: '夜间', green: '护眼' };
const MODE_NAME = { scroll: '滚动', page: '分页' };

(function init() {
  const history = Storage.get('readHistory') || [];
  const progress = Storage.get('readProgress') || {};
  const shelf = Storage.get('bookshelf') || [];
  const ratings = Storage.get('ratings') || {};
  const settings = Storage.get('readerSettings') || {};

  // 统计
  const uniqueBooks = [...new Set(history.map(h => h.id))].length;
  const totalChapters = Object.values(progress).reduce((sum, arr) => sum + arr.length, 0);
  const ratingCount = Object.keys(ratings).length;

  document.getElementById('statBooks').textContent = uniqueBooks;
  document.getElementById('statChapters').textContent = totalChapters;
  document.getElementById('statShelf').textContent = shelf.length;
  document.getElementById('statRatings').textContent = ratingCount;

  // 阅读历史
  const historyList = document.getElementById('historyList');
  const emptyHistory = document.getElementById('emptyHistory');
  if (history.length === 0) {
    historyList.style.display = 'none';
    emptyHistory.style.display = 'block';
  } else {
    historyList.innerHTML = history.slice(0, 10).map(h => {
      const n = NOVELS_MAP[h.id] || NOVELS_MAP[1];
      const time = Formatter.timeAgo ? Formatter.timeAgo(h.time) : timeAgo(h.time);
      return `
        <div class="history-item" onclick="location.href='reader.html?id=${h.id}&ch=${h.chapter}'">
          <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
          <div class="h-info">
            <div class="h-title">${n.title}</div>
            <div class="h-chapter">📖 第${h.chapter}章</div>
          </div>
          <div class="h-time">${time}</div>
        </div>`;
    }).join('');
  }

  // 评分记录
  const ratingList = document.getElementById('ratingList');
  const emptyRating = document.getElementById('emptyRating');
  const ratingIds = Object.keys(ratings);
  if (ratingIds.length === 0) {
    ratingList.style.display = 'none';
    emptyRating.style.display = 'block';
  } else {
    ratingList.innerHTML = ratingIds.map(id => {
      const n = NOVELS_MAP[id] || NOVELS_MAP[1];
      const score = ratings[id];
      const stars = '★'.repeat(score) + '☆'.repeat(5 - score);
      return `
        <div class="rating-item" onclick="location.href='reader.html?id=${id}'">
          <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
          <div class="r-info">
            <div class="r-title">${n.title}</div>
            <span class="r-stars">${stars}</span>
            <span class="r-score">${score}.0</span>
          </div>
        </div>`;
    }).join('');
  }

  // 阅读偏好
  document.getElementById('prefFontSize').textContent = (settings.fontSize || 18) + 'px';
  document.getElementById('prefLineHeight').textContent = (settings.lineHeight || 1.8).toFixed(1);
  document.getElementById('prefTheme').textContent = THEME_NAME[settings.theme || 'light'] || '浅色';
  document.getElementById('prefScrollMode').textContent = MODE_NAME[settings.scrollMode || 'scroll'] || '滚动';
})();

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return '刚刚';
  if (diff < 3600) return Math.floor(diff / 60) + '分钟前';
  if (diff < 86400) return Math.floor(diff / 3600) + '小时前';
  if (diff < 604800) return Math.floor(diff / 86400) + '天前';
  return new Date(ts).toLocaleDateString('zh-CN');
}

function clearHistory() {
  if (!confirm('确定要清空所有阅读历史吗？')) return;
  Storage.remove('readHistory');
  Storage.remove('readProgress');
  showToast('🗑️ 阅读历史已清空');
  setTimeout(() => location.reload(), 400);
}
