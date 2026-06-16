/* ============================================================
   次元书屋 · 书架逻辑
   加载书架数据 + 继续阅读 + 移除操作
   ============================================================ */

const NOVELS_MAP = {
  1: { title: '无职转生', author: '理不尽な孫の手', cover: '../covers/01.jpg', chapters: 264 },
  2: { title: '刀剑神域', author: '川原礫', cover: '../covers/02.jpg', chapters: 276 },
  3: { title: '转生史莱姆', author: '伏瀬', cover: '../covers/03.jpg', chapters: 304 },
  4: { title: '实力至上主义教室', author: '衣笠彰梧', cover: '../covers/04.jpg', chapters: 205 },
  5: { title: '魔法禁书目录', author: '鎌池和馬', cover: '../covers/05.jpg', chapters: 503 },
  6: { title: '我的青春恋爱物语果然有问题', author: '渡航', cover: '../covers/06.jpg', chapters: 148 },
  7: { title: '路人女主的养成方法', author: '丸戸史明', cover: '../covers/07.jpg', chapters: 131 },
  8: { title: '命运石之门', author: '林直孝', cover: '../covers/08.jpg', chapters: 92 },
  9: { title: 'No Game No Life', author: '榎宮祐', cover: '../covers/09.jpg', chapters: 116 },
  10: { title: '为美好的世界献上祝福', author: '暁なつめ', cover: '../covers/10.jpg', chapters: 172 },
  11: { title: 'Re:从零开始的异世界生活', author: '長月達平', cover: '../covers/11.jpg', chapters: 242 },
  12: { title: '葬送的芙莉莲', author: '山田鐘人', cover: '../covers/12.jpg', chapters: 138 },
  13: { title: '86-不存在的战区', author: '安里アサト', cover: '../covers/13.jpg', chapters: 133 },
  14: { title: '狼与香辛料', author: '支倉凍砂', cover: '../covers/14.jpg', chapters: 202 },
  15: { title: '文学少女', author: '野村美月', cover: '../covers/15.jpg', chapters: 89 },
  16: { title: '奇诺之旅', author: '時雨沢恵一', cover: '../covers/16.jpg', chapters: 168 },
  17: { title: '物语系列', author: '西尾維新', cover: '../covers/17.jpg', chapters: 326 },
  18: { title: '笨蛋测试召唤兽', author: '井上堅二', cover: '../covers/18.jpg', chapters: 127 },
  19: { title: '凉宫春日的忧郁', author: '谷川流', cover: '../covers/19.jpg', chapters: 128 },
  20: { title: '不正经的魔术讲师与禁忌教典', author: '羊太郎', cover: '../covers/20.jpg', chapters: 246 },
  21: { title: 'Isekai Mofumofu Café', author: 'Punichan', cover: '../covers/21.jpg', chapters: 238 },
  22: { title: 'Zenmetsu End wo Shinimonogurui de Kaihi shita. Party ga Yanda.', author: 'kodamazon', cover: '../covers/22.jpg', chapters: 109 },
  23: { title: 'Mukashi Yuusha de Ima wa Hone', author: 'Pairan', cover: '../covers/23.jpg', chapters: 40 },
  24: { title: 'Souken no Yugami Tachi', author: 'NOCO', cover: '../covers/24.jpg', chapters: 205 },
  25: { title: 'Koori no Koushaku to Itsuwari no Hanayome', author: 'Mizushima, Shinobu', cover: '../covers/25.jpg', chapters: 6 },
  26: { title: 'Around 40 Kenja no Isekai Seikatsu Nikki Zero: Swords & Sorceries World', author: 'Johndee', cover: '../covers/26.jpg', chapters: 244 },
  27: { title: 'Genjuuou no Shinzou', author: 'Oki, Mamiya', cover: '../covers/27.jpg', chapters: 15 },
  28: { title: 'Katakoi Mitsugetsu', author: 'Tachibana, Kaoru', cover: '../covers/28.jpg', chapters: 141 },
  29: { title: 'Dragon Quest: Dai no Daibouken - Sorezore no Michi', author: 'Sanjou, Riku', cover: '../covers/29.jpg', chapters: 5 },
  30: { title: 'Shousetsu Nisoku Hokou', author: 'akka', cover: '../covers/30.jpg', chapters: 323 },
  31: { title: 'Natsume Souseki Fantasia', author: 'Morikura, En', cover: '../covers/31.jpg', chapters: 142 },
  32: { title: 'Ninja to Gokudou: Engine Heart Love', author: 'Kondou, Shinsuke', cover: '../covers/32.jpg', chapters: 16 },
  33: { title: 'Akatsuki no Majutsushi wa Tsuki ni You', author: 'Naruse, Yamabuki', cover: '../covers/33.jpg', chapters: 230 },
  34: { title: 'Tekisei Saikyoushu ga Ore ni Icha Love shitagaru Okaasan ni Nattan desu ga?!', author: 'Tyu-moji', cover: '../covers/34.jpg', chapters: 8 },
  35: { title: 'Chain Chronicle Colorless', author: 'toi8', cover: '../covers/35.jpg', chapters: 329 },
  36: { title: 'Iede Ojousama no Maid Seikatsu', author: 'Mizushima, Shinobu', cover: '../covers/36.jpg', chapters: 210 },
  37: { title: 'Himegimi wa Dansou no Hanayome', author: 'Suzukawa, Makoto', cover: '../covers/37.jpg', chapters: 167 },
  38: { title: 'Kindan Shitei de Breakthrough: Yuusha no Musuko ga Maou no Deshi de Nani ga Warui', author: 'Ryuutetsu', cover: '../covers/38.jpg', chapters: 20 },
  39: { title: 'Chikyuu Saigo no Zombie: Night with the Living Dead', author: 'Hatomi, Sta', cover: '../covers/39.jpg', chapters: 220 },
  40: { title: 'Make a Girl: Episode 0', author: 'Ikeda, Akiya', cover: '../covers/40.jpg', chapters: 14 },
  41: { title: 'Kanojo demo Nai Onnanoko ga Shinya Niji ni Chaahan Tsukuri ni Kuru Hanashi', author: 'Michizou', cover: '../covers/41.jpg', chapters: 345 },
  42: { title: 'Kyoufu no Maou Heika datta noni Hanayome Kyuuun ga Tomarimasen!', author: 'DUO BRAND.', cover: '../covers/42.jpg', chapters: 8 },
  43: { title: 'Assassin no Tamago ni Tensei shita: Saikyou Gedou no Shounen wa, Ikinokoru Tame ni Shudan wo Erabanai', author: 'Shinsora', cover: '../covers/43.jpg', chapters: 295 },
  44: { title: 'Tenjou Tenge Seitokai Prifaes', author: 'Sugii, Hikaru', cover: '../covers/44.jpg', chapters: 198 },
  45: { title: 'Shousetsu-ban Make a Girl: Make Myself', author: 'Poligon.', cover: '../covers/45.jpg', chapters: 7 },
  46: { title: 'Tensei Kusushi wa Hiru made Netai', author: 'Kuga', cover: '../covers/46.jpg', chapters: 238 },
  47: { title: 'Shin Sakura Taisen the Novel: Hizakura no Koro', author: 'Mugi, Ayumu', cover: '../covers/47.jpg', chapters: 6 },
  48: { title: 'Oretachi Igai wa Nyuushitsu Fuka!', author: 'Umezawa, Hana', cover: '../covers/48.jpg', chapters: 199 },
  49: { title: 'Nandaka Thrill to Suspense', author: 'Maruya, Kae', cover: '../covers/49.jpg', chapters: 173 },
  50: { title: 'Tokyo Boys Revolution', author: 'Ooya, Kazumi', cover: '../covers/50.jpg', chapters: 292 }
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
