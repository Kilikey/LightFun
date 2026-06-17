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
  21: { title: '不死者之王', author: 'Maruyama, Kugane', cover: '../covers/21.jpg', chapters: 225 },
  22: { title: '在地下城寻求邂逅是否搞错了什么', author: 'Yasuda, Suzuhito', cover: '../covers/22.jpg', chapters: 153 },
  23: { title: '幼女战记', author: 'Shinotsuki, Shinobu', cover: '../covers/23.jpg', chapters: 108 },
  24: { title: '想要成为影之实力者', author: 'Touzai', cover: '../covers/24.jpg', chapters: 121 },
  25: { title: '魔女之旅', author: 'Azure', cover: '../covers/25.jpg', chapters: 110 },
  26: { title: '盾之勇者成名录', author: 'Aneko, Yusagi', cover: '../covers/26.jpg', chapters: 127 },
  27: { title: '哥布林杀手', author: 'Kannatsuki, Noboru', cover: '../covers/27.jpg', chapters: 267 },
  28: { title: '平凡职业造就世界最强', author: 'TakayaKi', cover: '../covers/28.jpg', chapters: 250 },
  29: { title: '带着智能手机闯荡异世界', author: 'Usatsuka, Eiji', cover: '../covers/29.jpg', chapters: 129 },
  30: { title: '爆肝工程师的异世界狂想曲', author: 'Ainana, Hiro', cover: '../covers/30.jpg', chapters: 136 },
  31: { title: '贤者之孙', author: 'Kikuchi, Seiji', cover: '../covers/31.jpg', chapters: 246 },
  32: { title: '重来吧，魔王大人！', author: 'Ogata, Kouji', cover: '../covers/32.jpg', chapters: 254 },
  33: { title: '被卷入了勇者召唤事件却发现异世界很和平', author: 'Johndee', cover: '../covers/33.jpg', chapters: 92 },
  34: { title: '世界顶尖的暗杀者转生为异世界贵族', author: 'Reia', cover: '../covers/34.jpg', chapters: 145 },
  35: { title: '乙女游戏世界对路人角色很不友好', author: 'Mishima, Yomu', cover: '../covers/35.jpg', chapters: 207 },
  36: { title: '转生恶役只好拔除破灭旗标', author: 'Hidaka, Nami', cover: '../covers/36.jpg', chapters: 276 },
  37: { title: '关于我在无意间被隔壁的天使变成废柴这件事', author: 'Kazutake, Hazano', cover: '../covers/37.jpg', chapters: 137 },
  38: { title: '不时轻声地以俄语遮羞的邻座艾莉同学', author: 'Momoco', cover: '../covers/38.jpg', chapters: 254 },
  39: { title: '败犬女主太多了', author: 'Imigimuru', cover: '../covers/39.jpg', chapters: 111 },
  40: { title: '满怀美梦的少年是现实主义者', author: 'Saba, Mizore', cover: '../covers/40.jpg', chapters: 168 },
  41: { title: '位于恋爱光谱极端的我们', author: 'Nagaoka, Makiko', cover: '../covers/41.jpg', chapters: 266 },
  42: { title: '义妹生活', author: 'Mikawa, Ghost', cover: '../covers/42.jpg', chapters: 257 },
  43: { title: '间谍教室', author: 'Tomari', cover: '../covers/43.jpg', chapters: 111 },
  44: { title: '叹息的亡灵好想退隐', author: 'Tsukikage', cover: '../covers/44.jpg', chapters: 205 },
  45: { title: '处刑少女的生存之道', author: 'Nilitsu', cover: '../covers/45.jpg', chapters: 118 },
  46: { title: '金装的维尔梅', author: 'Hachimoku, Mei', cover: '../covers/46.jpg', chapters: 7 },
  47: { title: '契约之吻', author: 'Nomura, Mizuki', cover: '../covers/47.jpg', chapters: 5 },
  48: { title: '魔王学院的不适任者', author: 'Shizuma, Yoshinori', cover: '../covers/48.jpg', chapters: 164 },
  49: { title: '因为不是真正的伙伴而被逐出勇者队伍', author: 'Yasumo', cover: '../covers/49.jpg', chapters: 194 },
  50: { title: '回复术士的重启人生', author: 'Shiokonbu', cover: '../covers/50.jpg', chapters: 189 },
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
