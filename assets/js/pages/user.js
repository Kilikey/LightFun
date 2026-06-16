/* ============================================================
   次元书屋 · 个人中心逻辑
   统计 + 阅读历史 + 评分 + 阅读偏好
   ============================================================ */

const NOVELS_MAP = {
  1: { title: '无职转生', cover: '../covers/01.jpg' },
  2: { title: '刀剑神域', cover: '../covers/02.jpg' },
  3: { title: '转生史莱姆', cover: '../covers/03.jpg' },
  4: { title: '实力至上主义教室', cover: '../covers/04.jpg' },
  5: { title: '魔法禁书目录', cover: '../covers/05.jpg' },
  6: { title: '我的青春恋爱物语果然有问题', cover: '../covers/06.jpg' },
  7: { title: '路人女主的养成方法', cover: '../covers/07.jpg' },
  8: { title: '命运石之门', cover: '../covers/08.jpg' },
  9: { title: 'No Game No Life', cover: '../covers/09.jpg' },
  10: { title: '为美好的世界献上祝福', cover: '../covers/10.jpg' },
  11: { title: 'Re:从零开始的异世界生活', cover: '../covers/11.jpg' },
  12: { title: '葬送的芙莉莲', cover: '../covers/12.jpg' },
  13: { title: '86-不存在的战区', cover: '../covers/13.jpg' },
  14: { title: '狼与香辛料', cover: '../covers/14.jpg' },
  15: { title: '文学少女', cover: '../covers/15.jpg' },
  16: { title: '奇诺之旅', cover: '../covers/16.jpg' },
  17: { title: '物语系列', cover: '../covers/17.jpg' },
  18: { title: '笨蛋测试召唤兽', cover: '../covers/18.jpg' },
  19: { title: '凉宫春日的忧郁', cover: '../covers/19.jpg' },
  20: { title: '不正经的魔术讲师与禁忌教典', cover: '../covers/20.jpg' },
  21: { title: 'Isekai Mofumofu Café', cover: '../covers/21.jpg' },
  22: { title: 'Zenmetsu End wo Shinimonogurui de Kaihi shita. Party ga Yanda.', cover: '../covers/22.jpg' },
  23: { title: 'Mukashi Yuusha de Ima wa Hone', cover: '../covers/23.jpg' },
  24: { title: 'Souken no Yugami Tachi', cover: '../covers/24.jpg' },
  25: { title: 'Koori no Koushaku to Itsuwari no Hanayome', cover: '../covers/25.jpg' },
  26: { title: 'Around 40 Kenja no Isekai Seikatsu Nikki Zero: Swords & Sorceries World', cover: '../covers/26.jpg' },
  27: { title: 'Genjuuou no Shinzou', cover: '../covers/27.jpg' },
  28: { title: 'Katakoi Mitsugetsu', cover: '../covers/28.jpg' },
  29: { title: 'Dragon Quest: Dai no Daibouken - Sorezore no Michi', cover: '../covers/29.jpg' },
  30: { title: 'Shousetsu Nisoku Hokou', cover: '../covers/30.jpg' },
  31: { title: 'Natsume Souseki Fantasia', cover: '../covers/31.jpg' },
  32: { title: 'Ninja to Gokudou: Engine Heart Love', cover: '../covers/32.jpg' },
  33: { title: 'Akatsuki no Majutsushi wa Tsuki ni You', cover: '../covers/33.jpg' },
  34: { title: 'Tekisei Saikyoushu ga Ore ni Icha Love shitagaru Okaasan ni Nattan desu ga?!', cover: '../covers/34.jpg' },
  35: { title: 'Chain Chronicle Colorless', cover: '../covers/35.jpg' },
  36: { title: 'Iede Ojousama no Maid Seikatsu', cover: '../covers/36.jpg' },
  37: { title: 'Himegimi wa Dansou no Hanayome', cover: '../covers/37.jpg' },
  38: { title: 'Kindan Shitei de Breakthrough: Yuusha no Musuko ga Maou no Deshi de Nani ga Warui', cover: '../covers/38.jpg' },
  39: { title: 'Chikyuu Saigo no Zombie: Night with the Living Dead', cover: '../covers/39.jpg' },
  40: { title: 'Make a Girl: Episode 0', cover: '../covers/40.jpg' },
  41: { title: 'Kanojo demo Nai Onnanoko ga Shinya Niji ni Chaahan Tsukuri ni Kuru Hanashi', cover: '../covers/41.jpg' },
  42: { title: 'Kyoufu no Maou Heika datta noni Hanayome Kyuuun ga Tomarimasen!', cover: '../covers/42.jpg' },
  43: { title: 'Assassin no Tamago ni Tensei shita: Saikyou Gedou no Shounen wa, Ikinokoru Tame ni Shudan wo Erabanai', cover: '../covers/43.jpg' },
  44: { title: 'Tenjou Tenge Seitokai Prifaes', cover: '../covers/44.jpg' },
  45: { title: 'Shousetsu-ban Make a Girl: Make Myself', cover: '../covers/45.jpg' },
  46: { title: 'Tensei Kusushi wa Hiru made Netai', cover: '../covers/46.jpg' },
  47: { title: 'Shin Sakura Taisen the Novel: Hizakura no Koro', cover: '../covers/47.jpg' },
  48: { title: 'Oretachi Igai wa Nyuushitsu Fuka!', cover: '../covers/48.jpg' },
  49: { title: 'Nandaka Thrill to Suspense', cover: '../covers/49.jpg' },
  50: { title: 'Tokyo Boys Revolution', cover: '../covers/50.jpg' }
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
