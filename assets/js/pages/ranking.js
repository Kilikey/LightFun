/* ============================================================
   次元书屋 · 排行榜逻辑
   5大榜单 + 历年「这本轻小说真厉害」2015-2026
   ============================================================ */


/* ---------- 标题到 ID 的映射（用于历年榜单跳转） ---------- */
function findNovelIdByTitle(title) {
  // 直接匹配
  const direct = NOVELS.find(n => n.title === title);
  if (direct) return direct.id;
  // 部分匹配（历年榜单中有些标题包含作品名在括号内）
  const partial = NOVELS.find(n => title.includes(n.title));
  if (partial) return partial.id;
  // 特殊映射
  const specialMap = {
    '桐人（刀剑神域）': 2,
    'abec（插画师）': 2,
    '御坂美琴（魔法禁书目录）': 5,
    '灰村清孝（插画师）': 5,
    '上条当麻（魔法禁书目录）': 5,
    '轻井泽惠（实力至上主义教室）': 4,
    '椎名真昼（邻家天使）': 37,
    'OVERLORD（不死者之王）': 21,
    'OVERLORD': 21,
    '龙王的工作！': 50,
    '龙王的工作': 50,
    '食锈末世录': 49,
    '七魔剑支配天下': 48,
    'Unnamed Memory': 48,
    '佐佐木与文鸟小哔': 1,
    '小书痴的下克上': 3,
    '欢迎来到实力至上主义的教室': 4,
    '实力至上主义的教室': 4,
    '欢迎来到实力至上主义教室': 4,
    '弹珠汽水瓶里的千岁同学': 6,
    '千岁同学': 6,
    '关于邻家的天使大人': 37,
    '邻家天使': 37,
    '不时轻声地以俄语遮羞的邻座艾莉同学': 38,
    '艾莉同学': 38,
    '败犬女主太多了': 39,
    '败犬女主': 39,
    '义妹生活': 42,
    '叹息的亡灵好想退隐': 44,
    '叹息的亡灵': 44,
    '间谍教室': 43,
    '在地下城寻求邂逅是否搞错了什么': 22,
    '地错': 22,
    '契约之吻': 47,
    '侦探已经死了': 43,
    ' bathtub生活': 30,
    '浴缸生活': 30,
    'Stella Step': 40,
    '与不是女友的你，做超过恋人的事': 41,
    '一周一次买下同班同学': 42,
    '白色帝国': 5,
    '献给你的故事': 6,
    '纵星辰陨落，你仍将歌唱': 7,
    '【悲报】大小姐系底边迷宫主播': 8,
    '玩乐关系': 38,
    '关于邻家的天使大人不知不觉把我惯成了废人这档子事': 37,
    '区区转生无法填补心中的空缺': 39,
    'δ和γ的理学部笔记系列': 40,
    '告别余香': 41,
    '这里是，终末停滞委员会。': 42,
    '药屋少女的呢喃': 43,
    '是谁杀死了勇者': 44,
    '靠死亡游戏混饭吃': 45,
    '与奔向透明夜晚的你的不可见恋爱': 37,
    '我们的「阅读理解」出错了': 39,
  };
  return specialMap[title] || null;
}

/* ---------- 历年「这本轻小说真厉害」榜单数据 ---------- */
const YEARLY_RANKS = {
  2026: {
    top: [
      { rank:1, title:'玩乐关系', author:'葵关南', cover:'../covers/38.jpg' },
      { rank:2, title:'关于邻家的天使大人不知不觉把我惯成了废人这档子事', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:3, title:'败犬女主太多了', author:'雨森焚火', cover:'../covers/39.jpg' },
    ],
    list: [
      { rank:4, title:'不时轻声地以俄语遮羞的邻座艾莉同学', author:'燦々SUN', cover:'../covers/38.jpg' },
      { rank:5, title:'区区转生无法填补心中的空缺', author:'ニテーロン', cover:'../covers/39.jpg' },
      { rank:6, title:'δ和γ的理学部笔记系列', author:'逆井卓馬', cover:'../covers/40.jpg' },
      { rank:7, title:'告别余香', author:'立川浦浦', cover:'../covers/41.jpg' },
      { rank:8, title:'这里是，终末停滞委员会。', author:'逢缘奇演', cover:'../covers/42.jpg' },
      { rank:9, title:'药屋少女的呢喃', author:'日向夏', cover:'../covers/43.jpg' },
      { rank:10, title:'在地下城寻求邂逅是否搞错了什么', author:'大森藤野', cover:'../covers/22.jpg' },
    ]
  },
  2025: {
    top: [
      { rank:1, title:'败犬女主太多了', author:'雨森焚火', cover:'../covers/39.jpg' },
      { rank:2, title:'是谁杀死了勇者', author:'駄犬', cover:'../covers/44.jpg' },
      { rank:3, title:'不时轻声地以俄语遮羞的邻座艾莉同学', author:'燦々SUN', cover:'../covers/38.jpg' },
    ],
    list: [
      { rank:4, title:'这里是，终末停滞委员会。', author:'逢缘奇演', cover:'../covers/42.jpg' },
      { rank:5, title:'关于邻家的天使大人不知不觉把我惯成了废人这档子事', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:6, title:'白色帝国', author:'犬村小六', cover:'../covers/45.jpg' },
      { rank:7, title:'献给你的故事', author:'森日向', cover:'../covers/46.jpg' },
      { rank:8, title:'义妹生活', author:'三河ごーすと', cover:'../covers/42.jpg' },
      { rank:9, title:'纵星辰陨落，你仍将歌唱', author:'長山久龍', cover:'../covers/47.jpg' },
      { rank:10, title:'【悲报】大小姐系底边迷宫主播', author:'赤城大空', cover:'../covers/48.jpg' },
    ]
  },
  2024: {
    top: [
      { rank:1, title:'关于邻家的天使大人不知不觉把我惯成了废人这档子事', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:2, title:'靠死亡游戏混饭吃', author:'鹈饲有志', cover:'../covers/49.jpg' },
      { rank:3, title:'不时轻声地以俄语遮羞的邻座艾莉同学', author:'燦々SUN', cover:'../covers/38.jpg' },
    ],
    list: [
      { rank:4, title:'浴缸生活', author:'四季大雅', cover:'../covers/50.jpg' },
      { rank:5, title:'与奔向透明夜晚的你的不可见恋爱', author:'志馬なにがし', cover:'../covers/37.jpg' },
      { rank:6, title:'Stella Step', author:'林星悟', cover:'../covers/38.jpg' },
      { rank:7, title:'我们的「阅读理解」出错了', author:'水镜月圣', cover:'../covers/39.jpg' },
      { rank:8, title:'与不是女友的你，做超过恋人的事', author:'持崎汤叶', cover:'../covers/40.jpg' },
      { rank:9, title:'一周一次买下同班同学', author:'羽田宇佐', cover:'../covers/41.jpg' },
      { rank:10, title:'侦探已经死了', author:'二语十', cover:'../covers/42.jpg' },
    ]
  },
  2023: {
    top: [
      { rank:1, title:'欢迎来到实力至上主义的教室', author:'衣笠彰梧', cover:'../covers/04.jpg' },
      { rank:2, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:3, title:'弹珠汽水瓶里的千岁同学', author:'裕梦', cover:'../covers/44.jpg' },
    ],
    list: [
      { rank:4, title:'关于邻家的天使大人', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:5, title:'不时轻声地以俄语遮羞的邻座艾莉同学', author:'燦々SUN', cover:'../covers/38.jpg' },
      { rank:6, title:'败犬女主太多了', author:'雨森焚火', cover:'../covers/39.jpg' },
      { rank:7, title:'义妹生活', author:'三河ごーすと', cover:'../covers/42.jpg' },
      { rank:8, title:'间谍教室', author:'竹町', cover:'../covers/43.jpg' },
      { rank:9, title:'在地下城寻求邂逅是否搞错了什么', author:'大森藤野', cover:'../covers/22.jpg' },
      { rank:10, title:'叹息的亡灵好想退隐', author:'槻影', cover:'../covers/44.jpg' },
    ]
  },
  2022: {
    top: [
      { rank:1, title:'佐佐木与文鸟小哔', author:'Buncololi', cover:'../covers/45.jpg' },
      { rank:2, title:'椎名真昼（邻家天使）', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:3, title:'弹珠汽水瓶里的千岁同学', author:'裕梦', cover:'../covers/44.jpg' },
    ],
    list: [
      { rank:4, title:'欢迎来到实力至上主义的教室', author:'衣笠彰梧', cover:'../covers/04.jpg' },
      { rank:5, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:6, title:'关于邻家的天使大人', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:7, title:'不时轻声地以俄语遮羞的邻座艾莉同学', author:'燦々SUN', cover:'../covers/38.jpg' },
      { rank:8, title:'败犬女主太多了', author:'雨森焚火', cover:'../covers/39.jpg' },
      { rank:9, title:'在地下城寻求邂逅是否搞错了什么', author:'大森藤野', cover:'../covers/22.jpg' },
      { rank:10, title:'义妹生活', author:'三河ごーすと', cover:'../covers/42.jpg' },
    ]
  },
  2021: {
    top: [
      { rank:1, title:'弹珠汽水瓶里的千岁同学', author:'裕梦', cover:'../covers/44.jpg' },
      { rank:2, title:'异修罗', author:'珪素', cover:'../covers/45.jpg' },
      { rank:3, title:'知世俊作', author:'知世俊作', cover:'../covers/46.jpg' },
    ],
    list: [
      { rank:4, title:'佐佐木与文鸟小哔', author:'Buncololi', cover:'../covers/45.jpg' },
      { rank:5, title:'椎名真昼（邻家天使）', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:6, title:'欢迎来到实力至上主义的教室', author:'衣笠彰梧', cover:'../covers/04.jpg' },
      { rank:7, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:8, title:'关于邻家的天使大人', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:9, title:'不时轻声地以俄语遮羞的邻座艾莉同学', author:'燦々SUN', cover:'../covers/38.jpg' },
      { rank:10, title:'败犬女主太多了', author:'雨森焚火', cover:'../covers/39.jpg' },
    ]
  },
  2020: {
    top: [
      { rank:1, title:'七魔剑支配天下', author:'宇野朴人', cover:'../covers/47.jpg' },
      { rank:2, title:'Unnamed Memory', author:'古宫九时', cover:'../covers/48.jpg' },
      { rank:3, title:'轻井泽惠（实力至上主义教室）', author:'衣笠彰梧', cover:'../covers/04.jpg' },
    ],
    list: [
      { rank:4, title:'弹珠汽水瓶里的千岁同学', author:'裕梦', cover:'../covers/44.jpg' },
      { rank:5, title:'佐佐木与文鸟小哔', author:'Buncololi', cover:'../covers/45.jpg' },
      { rank:6, title:'椎名真昼（邻家天使）', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:7, title:'欢迎来到实力至上主义的教室', author:'衣笠彰梧', cover:'../covers/04.jpg' },
      { rank:8, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:9, title:'关于邻家的天使大人', author:'佐伯さん', cover:'../covers/37.jpg' },
      { rank:10, title:'不时轻声地以俄语遮羞的邻座艾莉同学', author:'燦々SUN', cover:'../covers/38.jpg' },
    ]
  },
  2019: {
    top: [
      { rank:1, title:'食锈末世录', author:'瘤久保慎司', cover:'../covers/49.jpg' },
      { rank:2, title:'上条当麻（魔法禁书目录）', author:'鎌池和馬', cover:'../covers/05.jpg' },
      { rank:3, title:'しらび（插画师）', author:'しらび', cover:'../covers/50.jpg' },
    ],
    list: [
      { rank:4, title:'七魔剑支配天下', author:'宇野朴人', cover:'../covers/47.jpg' },
      { rank:5, title:'Unnamed Memory', author:'古宫九时', cover:'../covers/48.jpg' },
      { rank:6, title:'弹珠汽水瓶里的千岁同学', author:'裕梦', cover:'../covers/44.jpg' },
      { rank:7, title:'佐佐木与文鸟小哔', author:'Buncololi', cover:'../covers/45.jpg' },
      { rank:8, title:'欢迎来到实力至上主义的教室', author:'衣笠彰梧', cover:'../covers/04.jpg' },
      { rank:9, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:10, title:'关于邻家的天使大人', author:'佐伯さん', cover:'../covers/37.jpg' },
    ]
  },
  2018: {
    top: [
      { rank:1, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:2, title:'桐人（刀剑神域）', author:'川原礫', cover:'../covers/02.jpg' },
      { rank:3, title:'abec（插画师）', author:'abec', cover:'../covers/02.jpg' },
    ],
    list: [
      { rank:4, title:'食锈末世录', author:'瘤久保慎司', cover:'../covers/49.jpg' },
      { rank:5, title:'七魔剑支配天下', author:'宇野朴人', cover:'../covers/47.jpg' },
      { rank:6, title:'Unnamed Memory', author:'古宫九时', cover:'../covers/48.jpg' },
      { rank:7, title:'弹珠汽水瓶里的千岁同学', author:'裕梦', cover:'../covers/44.jpg' },
      { rank:8, title:'佐佐木与文鸟小哔', author:'Buncololi', cover:'../covers/45.jpg' },
      { rank:9, title:'欢迎来到实力至上主义的教室', author:'衣笠彰梧', cover:'../covers/04.jpg' },
      { rank:10, title:'关于邻家的天使大人', author:'佐伯さん', cover:'../covers/37.jpg' },
    ]
  },
  2017: {
    top: [
      { rank:1, title:'龙王的工作！', author:'白鸟士郎', cover:'../covers/50.jpg' },
      { rank:2, title:'OVERLORD（不死者之王）', author:'丸山くがね', cover:'../covers/21.jpg' },
      { rank:3, title:'上条当麻（魔法禁书目录）', author:'鎌池和馬', cover:'../covers/05.jpg' },
    ],
    list: [
      { rank:4, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:5, title:'桐人（刀剑神域）', author:'川原礫', cover:'../covers/02.jpg' },
      { rank:6, title:'食锈末世录', author:'瘤久保慎司', cover:'../covers/49.jpg' },
      { rank:7, title:'七魔剑支配天下', author:'宇野朴人', cover:'../covers/47.jpg' },
      { rank:8, title:'Unnamed Memory', author:'古宫九时', cover:'../covers/48.jpg' },
      { rank:9, title:'弹珠汽水瓶里的千岁同学', author:'裕梦', cover:'../covers/44.jpg' },
      { rank:10, title:'佐佐木与文鸟小哔', author:'Buncololi', cover:'../covers/45.jpg' },
    ]
  },
  2016: {
    top: [
      { rank:1, title:'OVERLORD（不死者之王）', author:'丸山くがね', cover:'../covers/21.jpg' },
      { rank:2, title:'御坂美琴（魔法禁书目录）', author:'鎌池和馬', cover:'../covers/05.jpg' },
      { rank:3, title:'灰村清孝（插画师）', author:'灰村清孝', cover:'../covers/05.jpg' },
    ],
    list: [
      { rank:4, title:'龙王的工作！', author:'白鸟士郎', cover:'../covers/50.jpg' },
      { rank:5, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:6, title:'桐人（刀剑神域）', author:'川原礫', cover:'../covers/02.jpg' },
      { rank:7, title:'食锈末世录', author:'瘤久保慎司', cover:'../covers/49.jpg' },
      { rank:8, title:'七魔剑支配天下', author:'宇野朴人', cover:'../covers/47.jpg' },
      { rank:9, title:'Unnamed Memory', author:'古宫九时', cover:'../covers/48.jpg' },
      { rank:10, title:'弹珠汽水瓶里的千岁同学', author:'裕梦', cover:'../covers/44.jpg' },
    ]
  },
  2015: {
    top: [
      { rank:1, title:'我的青春恋爱物语果然有问题', author:'渡航', cover:'../covers/06.jpg' },
      { rank:2, title:'雪之下雪乃（春物）', author:'渡航', cover:'../covers/06.jpg' },
      { rank:3, title:'ぽんかん⑧（插画师）', author:'ぽんかん⑧', cover:'../covers/06.jpg' },
    ],
    list: [
      { rank:4, title:'OVERLORD', author:'丸山くがね', cover:'../covers/21.jpg' },
      { rank:5, title:'御坂美琴（魔禁）', author:'鎌池和馬', cover:'../covers/05.jpg' },
      { rank:6, title:'龙王的工作！', author:'白鸟士郎', cover:'../covers/50.jpg' },
      { rank:7, title:'小书痴的下克上', author:'香月美夜', cover:'../covers/43.jpg' },
      { rank:8, title:'桐人（刀剑神域）', author:'川原礫', cover:'../covers/02.jpg' },
      { rank:9, title:'食锈末世录', author:'瘤久保慎司', cover:'../covers/49.jpg' },
      { rank:10, title:'七魔剑支配天下', author:'宇野朴人', cover:'../covers/47.jpg' },
    ]
  }
};

/* ---------- 初始化 ---------- */
let currentTab = 'hot';
let currentYear = 2026;
let userRatings = {};

(function init() {
  // 加载用户评分
  userRatings = Storage.get('ratings') || {};
  renderTab('hot');
  renderYearSelector();
  renderYearRank(2026);
})();

/* ---------- 标签切换 ---------- */
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  renderTab(tab);
}

function renderTab(tab) {
  const panel = document.getElementById('rankPanel');
  let list = [];
  let title = '';

  // 合并用户评分
  const novelsWithRating = [...NOVELS].map(n => ({
    ...n,
    displayScore: userRatings[n.id] ? (6.5 + userRatings[n.id] * 0.7).toFixed(1) : n.score
  }));

  switch(tab) {
    case 'hot':
      list = novelsWithRating.sort((a, b) => b.displayScore - a.displayScore).slice(0, 20);
      title = '🔥 最高热度榜 — 全站评分最高的20部轻小说';
      break;
    case 'new':
      // 新云榜：2024-2025年的热门新作（id 37-50 + 一些高分的）
      list = novelsWithRating.filter(n => n.id >= 37 || (n.id >= 21 && n.displayScore >= 8.5))
        .sort((a, b) => b.displayScore - a.displayScore).slice(0, 20);
      title = '✨ 新云榜 — 近年的热门新作推荐';
      break;
    case 'year':
      // 今年热度：2025年榜单作品
      list = novelsWithRating.filter(n =>
        ['败犬女主太多了','不时轻声地以俄语遮羞的邻座艾莉同学','关于邻家的天使大人','义妹生活','叹息的亡灵好想退隐','间谍教室'].includes(n.title)
      ).sort((a, b) => b.displayScore - a.displayScore);
      // 补充一些高分作品
      const extra = novelsWithRating.filter(n => n.displayScore >= 8.5 && !list.includes(n)).slice(0, 10);
      list = [...list, ...extra].slice(0, 20);
      title = '📅 2025年度热度榜 — 今年最火爆的轻小说';
      break;
    case 'month':
      // 本月热度：连载中的近期更新作品
      list = novelsWithRating.filter(n => n.status === 'ongoing')
        .sort((a, b) => b.displayScore - a.displayScore).slice(0, 20);
      title = '📆 本月连载热度 — 正在连载中的热门作品';
      break;
    case 'mine':
      // 我的评分：用户已评分的作品
      const ratedIds = Object.keys(userRatings).map(Number);
      list = novelsWithRating.filter(n => ratedIds.includes(n.id))
        .sort((a, b) => userRatings[b.id] - userRatings[a.id]);
      title = '⭐ 我的评分 — 你已评分的' + list.length + '部轻小说';
      break;
  }

  panel.innerHTML = `
    <div class="rank-intro">${title}</div>
    <div class="rank-list-full">${list.map((n, i) => renderRankItem(n, i + 1)).join('')}</div>
  `;
}

function renderRankItem(n, rank) {
  const rankClass = rank === 1 ? 'top1' : rank === 2 ? 'top2' : rank === 3 ? 'top3' : '';
  const tags = n.tags.slice(0, 2).map(t => `<span class="rf-tag">${t}</span>`).join('');
  const hasUserRating = userRatings[n.id];
  const scoreDisplay = hasUserRating
    ? `<span style="color:var(--color-gold)">${n.displayScore}</span> <span style="font-size:0.7rem;color:var(--text-muted)">(你评${userRatings[n.id]}星)</span>`
    : n.displayScore;
  return `
    <div class="rank-item-full" onclick="location.href='reader.html?id=${n.id}'">
      <div class="rank-num-full ${rankClass}">${rank}</div>
      <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
      <div class="rf-info">
        <div class="rf-title">${n.title}</div>
        <div class="rf-author">${n.author}</div>
      </div>
      <div class="rf-meta">
        <span class="stars">${Formatter.renderStars(n.displayScore)}</span> ${scoreDisplay}
        ${tags}
        <span>📖 ${n.chapters}章</span>
      </div>
    </div>`;
}

/* ---------- 历年榜单 ---------- */
function renderYearSelector() {
  const el = document.getElementById('yearSelector');
  const years = Object.keys(YEARLY_RANKS).sort((a, b) => b - a);
  el.innerHTML = years.map(y =>
    `<button class="year-btn ${y == currentYear ? 'active' : ''}" onclick="switchYear(${y})">${y}</button>`
  ).join('');
}

function switchYear(year) {
  currentYear = year;
  document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderYearRank(year);
}

function renderYearRank(year) {
  const el = document.getElementById('yearRankContent');
  const data = YEARLY_RANKS[year];
  if (!data) {
    el.innerHTML = '<div class="empty-mini">暂无数据</div>';
    return;
  }

  const top3 = data.top.map((n, i) => {
    const medal = i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze';
    const novelId = findNovelIdByTitle(n.title);
    const clickAction = novelId ? `onclick="location.href='reader.html?id=${novelId}'" style="cursor:pointer"` : '';
    return `
      <div class="top3-card" ${clickAction}>
        <div class="top3-rank ${medal}">${n.rank}</div>
        <img src="${n.cover}" alt="${n.title}" onerror="this.src='../covers/01.jpg'">
        <div class="top3-title">${n.title}</div>
        <div class="top3-author">${n.author}</div>
      </div>`;
  }).join('');

  const list = data.list.map(n => {
    const novelId = findNovelIdByTitle(n.title);
    const clickAction = novelId ? `onclick="location.href='reader.html?id=${novelId}'" style="cursor:pointer"` : '';
    return `
      <div class="rank-item-full" ${clickAction}>
        <div class="rank-num-full">${n.rank}</div>
        <img src="${n.cover}" alt="${n.title}" onerror="this.src='../covers/01.jpg'" style="width:36px;height:50px">
        <div class="rf-info">
          <div class="rf-title">${n.title}</div>
          <div class="rf-author">${n.author}</div>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="year-card">
      <div class="year-card-header">
        <h3>🏆 这本轻小说真厉害！${year}</h3>
        <span class="year-badge">年度 Top 10</span>
      </div>
      <div class="year-top3">${top3}</div>
      <div class="year-list-mini">${list}</div>
    </div>
  `;
}
