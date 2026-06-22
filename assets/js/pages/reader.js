/* ============================================================
   次元书屋 · 阅读器逻辑
   章节加载 + 阅读设置 + 进度保存 + 目录导航
   ============================================================ */

/* ---------- 全局状态 ---------- */
let currentNovel = null;
let currentChapter = 1;
let totalChapters = 1;
let scrollMode = 'scroll';
let fullNovels = []; // 从 novels.json 加载的完整数据

/* ---------- 初始化 ---------- */
(function init() {
  const params = new URLSearchParams(location.search);
  const novelId = parseInt(params.get('id')) || 1;
  const chapter = parseInt(params.get('ch')) || 1;

  // 先加载 novels.json 获取完整数据
  fetch('../assets/data/novels.json')
    .then(r => r.json())
    .then(data => {
      fullNovels = data;
      currentNovel = data.find(n => n.id === novelId) || data[0];
      totalChapters = currentNovel.chapters;

      // 优先使用 URL 参数中的章节，否则从进度恢复
      let startCh = chapter;
      if (startCh === 1) {
        const progress = Storage.get('readProgress') || {};
        const readChapters = progress[currentNovel.id] || [];
        if (readChapters.length > 0) {
          startCh = Math.max(...readChapters);
        }
      }
      currentChapter = Math.min(Math.max(startCh, 1), totalChapters);

      document.getElementById('novelTitle').textContent = currentNovel.title;
      document.title = '📖 ' + currentNovel.title + ' · 次元书屋';
      loadSettings();
      renderCatalog();
      loadChapter(currentChapter);
      updateProgress();
      bindScroll();
      bindBackTop();
      saveHistory(currentNovel.id, currentChapter);
      updateBookshelfBtn();
    })
    .catch(() => {
      // 降级：使用基础数据
      currentNovel = { id: novelId, title: '加载中...', chapters: 100, author: '' };
      totalChapters = 100;
      currentChapter = Math.min(Math.max(chapter, 1), totalChapters);
      document.getElementById('novelTitle').textContent = currentNovel.title;
      loadSettings();
      renderCatalog();
      loadChapter(currentChapter);
    });
})();

/* ---------- 章节内容生成（基于小说风格，每章不同） ---------- */
function generateChapterContent(novel, ch) {
  const seed = (novel.id * 7919 + ch * 104729) % 1000000007; // 伪随机种子
  const rng = () => {
    let s = seed;
    return () => {
      s = (s * 1103515245 + 12345) % 2147483647;
      return s / 2147483647;
    };
  }();

  const tags = novel.tags || ['异世界'];
  const title = novel.title;
  const desc = novel.desc || '';
  const author = novel.author || '';

  // 不同风格的故事段落模板
  const style = getNovelStyle(novel, tags);

  const paragraphCount = 10 + Math.floor(rng() * 8); // 10-17段
  const paragraphs = [];

  for (let i = 0; i < paragraphCount; i++) {
    const paraType = rng() < 0.3 ? 'dialog' : rng() < 0.6 ? 'action' : 'description';
    paragraphs.push(generateParagraph(style, paraType, ch, i, rng, title, tags));
  }

  // 章节标题根据章号和小说风格生成
  const chapterTitle = generateChapterTitle(style, ch, rng, title);

  return { title: chapterTitle, paragraphs };
}

function getNovelStyle(novel, tags) {
  const t = tags.join('');
  if (t.includes('异世界') || t.includes('转生')) return 'isekai';
  if (t.includes('校园') || t.includes('恋爱') || t.includes('青春')) return 'romance';
  if (t.includes('科幻') || t.includes('时间旅行')) return 'scifi';
  if (t.includes('战斗') || t.includes('冒险') || t.includes('战争')) return 'battle';
  if (t.includes('悬疑') || t.includes('智斗')) return 'mystery';
  if (t.includes('治愈') || t.includes('日常')) return 'sliceoflife';
  if (t.includes('奇幻') || t.includes('魔法')) return 'fantasy';
  if (t.includes('暗黑') || t.includes('复仇')) return 'dark';
  return 'general';
}

function generateChapterTitle(style, ch, rng, title) {
  const prefixes = {
    isekai: ['异世界の', '新たな', '旅立ちの', '邂逅の', '覚醒の', '運命の', '未知なる', '転生の'],
    romance: ['桜色の', '隣の', '雨の', '放課後の', '初恋の', '告白の', '約束の', '思い出の'],
    scifi: ['時空の', '次元の', '量子の', '未来の', '記憶の', '接続の', '変位の', '輪廻の'],
    battle: ['激闘の', '覚醒の', '戦火の', '逆襲の', '最終の', '決戦の', '覇道の', '覚悟の'],
    mystery: ['謎の', '暗闇の', '真実の', '影の', '追跡の', '迷宮の', '告発の', '逆説の'],
    sliceoflife: ['朝の', 'お昼の', '夕暮れの', '星空の', '微風の', '日常の', '甘味の', '秋の'],
    fantasy: ['精霊の', '古の', '魔法の', '聖域の', '祝福の', '契約の', '禁呪の', '伝承の'],
    dark: ['血の', '絶望の', '復讐の', '深淵の', '終焉の', '呪いの', '断罪の', '怨嗟の'],
    general: ['第', '新章', '幕間', '余韻', '序章', '転換', '波乱', '静謐']
  };
  const pre = prefixes[style] || prefixes.general;
  const prefix = pre[Math.floor(rng() * pre.length)];

  const suffixes = {
    isekai: ['朝', '冒険', '出会い', '試練', '仲間', '力', '世界', '選択'],
    romance: ['時間', '距離', '気持ち', '言葉', '笑顔', '手紙', '放課後', '約束'],
    scifi: ['実験', 'データ', '異常', '世界線', '再会', '警告', '記憶', '起動'],
    battle: ['前線', '敵陣', '決意', '限界', '覚悟', '勝利', '敗北', '生存'],
    mystery: ['手がかり', '証言', '密室', '動機', '真犯人', '罠', '秘密', '結末'],
    sliceoflife: ['珈琲', '散歩', '読書', '昼寝', '料理', '風鈴', '雲', '夕焼け'],
    fantasy: ['書', '杖', '森', '泉', '塔', '使い魔', '結界', '預言'],
    dark: ['夜', '傷', '嘘', '罪', '心臓', '再生', '焔', '契約'],
    general: ['章', '幕', '話', '頁', '刻', '間', '場', '景']
  };
  const suf = suffixes[style] || suffixes.general;
  const suffix = suf[Math.floor(rng() * suf.length)];

  return `${prefix}${suffix} — 第${ch}章`;
}

function generateParagraph(style, type, ch, idx, rng, title, tags) {
  const templates = {
    isekai: {
      dialog: [
        '「……这里是哪里？我记得刚才明明还在……」环顾四周，完全陌生的景色让人不由得屏住了呼吸。',
        '「看来，这就是所谓的『异世界』了吧。」我喃喃自语，心中既兴奋又不安。',
        '「喂！那边的人！你看起来不像是本地人，是从哪里来的？」一个陌生的声音从背后传来。',
        '「别担心，只要你在这个世界，总会有办法的。」她微笑着说道，语气中带着让人安心的力量。',
        '「这就是我的……新力量？」看着手掌中浮现的光芒，一种难以置信的感觉涌上心头。'
      ],
      action: [
        '深吸一口气，迈出了在这个世界的第一步。脚下的草地柔软而真实，空气中弥漫着魔法的气息。',
        '拔出腰间的剑，面对着前所未见的魔物。心跳加速，但手中的剑却稳如磐石。',
        '快速翻阅着脑海中的知识，大贤者的提示在视野边缘闪烁。必须找到这个敌人的弱点。',
        '纵身一跃，避开了袭来的魔法攻击。尘土飞扬中，看到了敌人隐藏在阴影中的真身。',
        '举起双手，咏唱着尚未熟练的咒语。魔力在体内流动，一种前所未有的力量感席卷全身。'
      ],
      description: [
        '夕阳将异世界的天空染成紫金色。远处的山脉连绵起伏，仿佛沉睡的巨龙。',
        '森林深处的泉水清澈见底，周围生长着从未见过的发光植物。微风吹过，带起一片荧光。',
        '城镇的街道由石板铺就，两旁是木质结构的建筑。商贩的吆喝声和冒险者的谈笑声交织在一起。',
        '王城高耸入云，白色的城墙上刻满了古老的符文。据说那是千年前大魔法时代的遗迹。',
        '夜空中的月亮比地球的大三倍，繁星以不同的规律排列。据说这里的星辰会影响魔力的流动。'
      ]
    },
    romance: {
      dialog: [
        '「……那个，我、我不是故意的！」慌乱中说出的话，却换来对方一个意味深长的微笑。',
        '「雨还在下呢，要一起撑伞吗？」她递过来的伞柄上，还带着她手心的温度。',
        '「为什么总是在这种时候碰到你？」嘴上虽然这么说，但嘴角却不自觉地翘了起来。',
        '「今天的便当……是我做的。不、不嫌弃的话，请尝尝看。」声音越来越小，脸颊却越来越红。',
        '「放学后，在天台等我。有……有话想对你说。」说完就跑掉了，只留下一个慌慌张张的背影。'
      ],
      action: [
        '匆忙地将散落一地的笔记本捡起来，却不小心碰到了她的手。触电般的感觉让两人都愣了一下。',
        '在图书馆的角落，翻着同一本书。两个人的肩膀不知何时靠在了一起，谁也没有移开。',
        '放学后的教室里，只剩下夕阳和两个人。窗外的樱花随风飘落，落在打开的笔记本上。',
        '她递过来的咖啡还冒着热气。第一次发现，原来她的手指这么纤细，指甲剪得整整齐齐。',
        '在站台上等待着同一班车。距离很近，能闻到她头发上淡淡的洗发水香味。'
      ],
      description: [
        '樱花飘落的坡道上，春天的气息扑面而来。粉色的花瓣落在肩头，又被风吹走。',
        '放学后的教室沐浴在夕阳的余晖中。窗外的蝉鸣渐渐响起，宣告着夏天的到来。',
        '雨滴顺着窗玻璃滑落，在窗外形成了模糊的水幕。教室内安静得能听见彼此的呼吸。',
        '夜晚的街道被路灯染成暖黄色。两个人的影子被拉得很长，偶尔重叠在一起。',
        '初雪悄悄地覆盖了校园。白色的世界中，两个人并肩走在被踩出小径的操场上。'
      ]
    },
    scifi: {
      dialog: [
        '「世界线变动率……0.523401%。还在可控范围内。」盯着屏幕上的数字，心中却无法平静。',
        '「如果这封邮件能改变过去，那么现在的我还存在吗？」这个问题没有答案，只有不断闪烁的光标。',
        '「实验数据出现了异常波动。等等，这不是普通的噪声，这是……信息？」',
        '「警告：检测到时间悖论。建议在60秒内修正，否则因果律将开始崩溃。」冰冷的机械音在耳边响起。',
        '「原来如此。并不是我回到了过去，而是过去来到了现在。」这个认知让人不寒而栗。'
      ],
      action: [
        '手指在键盘上飞快地敲击，一行行代码在屏幕上闪过。时间紧迫，必须在系统崩溃前完成修复。',
        '调整了时间机器的参数，深吸一口气按下了启动按钮。世界在瞬间扭曲，然后重组。',
        '戴上VR设备，眼前的世界瞬间变成了数据流。在虚拟与现实的边界，寻找着隐藏的真相。',
        '观察着实验室中的量子态粒子。它在观测的瞬间坍缩，而在观测前却同时存在于所有位置。',
        '破译着从未来传来的加密信息。每一个字符都像是拼图的碎片，逐渐拼凑出一个惊人的真相。'
      ],
      description: [
        '实验室中充满了蓝光，各种仪器发出规律的滴答声。墙上的电子钟显示着精确到毫秒的时间。',
        '城市的夜景由无数数据流构成。每一条光线都是信息的传递，每一个人都是网络中的节点。',
        '时间机器的核心是一个发光的球体，周围环绕着不断旋转的金属环。据说那是维度折叠的边界。',
        '窗外的世界突然静止了。雨滴悬停在空中，飞鸟定格在展翅的瞬间。时间，被暂停了。',
        '星空中的某颗星星突然闪烁了一下，然后以肉眼可见的速度改变着位置。那不是自然的运动。'
      ]
    },
    battle: {
      dialog: [
        '「来吧！让我看看你到底有多少本事！」握紧武器，全身的肌肉都绷紧到了极致。',
        '「……你很强。但我，绝不会在这里倒下！」抹去嘴角的血迹，重新摆好了战斗姿态。',
        '「这一击，我会赌上一切。」话音落下，体内的力量开始不受控制地暴走。',
        '「你的攻击模式，我已经看穿了。」冷静地分析着对手的动作，寻找着那唯一的破绽。',
        '「为了守护重要的人，我必须赢。无论如何，都必须赢！」'
      ],
      action: [
        '剑与剑的碰撞迸发出耀眼的火花。巨大的冲击力让手臂发麻，但眼神却更加锐利。',
        '侧身闪过袭来的攻击，顺势反击。刀刃划破空气，发出尖锐的呼啸声。',
        '腾空而起，将魔力注入武器。剑身泛起光芒，以雷霆万钧之势劈向敌人。',
        '在千钧一发之际翻滚躲避，原先站立的地方已经被轰出了一个大坑。',
        '发动了隐藏已久的秘技。身体被光芒包围，速度和力量都提升了数倍。'
      ],
      description: [
        '战场上的风带着血腥味。远处传来战鼓声，宣告着新一轮攻势的开始。',
        '魔法与钢铁交织的战场上，硝烟弥漫。残破的旗帜在风中猎猎作响。',
        '竞技场中央，两个人的对峙让整个空间都充满了压迫感。观众席上鸦雀无声。',
        '深夜的森林中，月光透过树叶的缝隙洒下斑驳的光影。这是最适合暗杀的舞台。',
        '燃烧的城堡中，火焰吞噬了一切。在热浪中，唯一能听见的只有心跳声和呼吸声。'
      ]
    },
    mystery: {
      dialog: [
        '「这个证据……说明凶手在说谎。」指着现场的一个细节，所有人的目光都集中了过来。',
        '「密室？不，那不过是精心设计的心理陷阱。」推了推眼镜，嘴角露出一丝自信的微笑。',
        '「如果A是真的，那么B就必须是假的。但B已经被证实了……矛盾出现了。」',
        '「你忽略了最重要的一点：动机。」这句话让对方脸上的表情瞬间僵硬。',
        '「真相，往往藏在最不起眼的地方。」'
      ],
      action: [
        '仔细地检查着现场的每一个角落。被翻动的书架、打翻的茶杯、墙上的划痕——每一个细节都是线索。',
        '在脑海中复盘着所有人的证词。时间、地点、动机、不在场证明——拼图正在一块一块地拼凑。',
        '突然想到了什么，快步走向窗边。被风吹动的窗帘，说明案发时窗户是开着的。',
        '翻阅着旧日的报纸，寻找着看似无关的事件。突然，一个熟悉的名字跳入了眼帘。',
        '将所有线索写在黑板上，用线连接着彼此关联的信息。一个清晰的脉络逐渐浮现。'
      ],
      description: [
        '深夜的图书馆里，只有几盏台灯发出昏黄的光。书页翻动的声音在寂静中格外清晰。',
        '雨夜的街道上，路灯的光芒被雨水折射成模糊的光斑。凶案现场被黄色的警戒线包围。',
        '老旧的洋馆中，木板发出嘎吱嘎吱的声响。墙上的肖像画仿佛在注视着每一个来访者。',
        '废弃的工厂中，锈迹斑斑的机器沉默地伫立着。风吹过破碎的窗户，发出呜咽般的声音。',
        '浓雾笼罩的码头，只有远处灯塔的光芒若隐若现。海浪拍打着岸边的声音，掩盖了一切。'
      ]
    },
    sliceoflife: {
      dialog: [
        '「今天吃什么好呢？便利店的新品好像不错……」盯着手机上的菜单，陷入了选择困难。',
        '「周末去那家新开的咖啡馆吧？听说他们的拿铁很好喝。」她兴致勃勃地说着。',
        '「作业还没写完呢，你就别玩手机了。」虽然嘴上这么说，但眼睛却不自觉地瞟了过去。',
        '「这个蛋糕……是亲手做的吗？！」看着眼前精心装饰的甜点，惊讶地说不出话来。',
        '「明天也一起上学吧？反正同路。」轻轻的一句话，却让心跳漏了一拍。'
      ],
      action: [
        '泡了一杯热茶，窝在沙发里翻开新买的书。窗外下着雨，正是最适合阅读的天气。',
        '在厨房笨拙地切着菜，锅里的汤咕嘟咕嘟地冒着泡。虽然卖相一般，但闻起来很香。',
        '抱着猫坐在窗台上，看着夕阳慢慢沉入地平线。猫咪发出满足的呼噜声。',
        '在超市的货架间徘徊，比较着不同品牌的零食。最后把它们都放进了购物车——全都要。',
        '打扫房间时发现了一个旧盒子。里面装满了照片、门票和便签，每一样都是珍贵的回忆。'
      ],
      description: [
        '清晨的阳光透过窗帘洒进房间，在地板上投下温暖的光斑。新的一天开始了。',
        '午后的公园中，孩子们在草地上追逐嬉戏。长椅上的老人悠闲地喂着鸽子。',
        '傍晚的天空被染成橘红色，云朵的边缘镶着金边。下班的人群在站台上等待着回家的列车。',
        '夜晚的便利店里，明亮的灯光让人感到安心。收银台的阿姨微笑着打着招呼。',
        '秋天的校园里，银杏叶铺满了道路。踩上去发出沙沙的声响，像是秋天的脚步声。'
      ]
    },
    fantasy: {
      dialog: [
        '「这个魔法阵……是古代精灵语！快，按照我说的顺序注入魔力！」',
        '「龙族的语言？我怎么会听得懂……等等，我体内的血在沸腾，这是……觉醒？！」',
        '「森林深处的泉水拥有治愈一切的力量，但守护者不会轻易让人通过。」',
        '「传说中的圣剑就在这座神殿的深处。但是，只有被选中的人才能拔出来。」',
        '「契约已经成立。从今天起，你就是我的使魔了——虽然说反了也行。」'
      ],
      action: [
        '咏唱着古老的咒语，指尖凝聚出冰蓝色的光芒。随着最后一个音节的落下，寒冰之枪射向敌人。',
        '骑在狮鹫的背上，翱翔于云层之上。俯瞰大地，群山如波涛般起伏。',
        '潜入精灵的古代遗迹，解开一个个魔法封印。墙壁上的符文随着脚步依次亮起。',
        '将圣水洒在伤口上，温暖的治愈之力流入体内。伤口愈合的同时，疲惫也一扫而空。',
        '与龙签订了契约。巨大的龙瞳凝视着渺小的自己，那目光中却带着古老的智慧。'
      ],
      description: [
        '精灵的森林中，古老的树木高耸入云。树干上缠绕着发光的藤蔓，如同流淌的星河。',
        '龙巢深处的宝藏堆积如山，金币和宝石在龙息的光芒中闪烁着夺目的光彩。',
        '魔法学院的大厅中，漂浮着无数发光的咒语书。书页在无风的情况下自动翻动着。',
        '漂浮的空中岛屿被彩虹桥连接着。瀑布从岛屿边缘倾泻而下，落入下方无尽的云海。',
        '远古的遗迹中，巨大的魔法水晶散发着柔和的光芒。据说那是世界魔力的源泉。'
      ]
    },
    dark: {
      dialog: [
        '「痛苦吗？那就对了。记住这种感觉，这是你曾经施加给别人的。」',
        '「正义？那只是弱者的借口。在这个世界，力量就是一切。」',
        '「杀了我？你做不到的。因为你还没有绝望到可以放弃一切的地步。」',
        '「复仇的火焰燃烧殆尽之后，剩下的只有灰烬……和空虚。」',
        '「你以为你了解我？不，你看到的只是我想让你看到的。」'
      ],
      action: [
        '黑暗的力量从体内涌出，如同黑色的火焰般吞噬着周围的一切。理智在逐渐远去。',
        '手中的匕首毫不犹豫地刺出。温热的液体溅在脸上，却没有任何情感波动。',
        '在废墟中艰难地爬行，每一步都伴随着剧烈的疼痛。但眼中的光芒从未熄灭。',
        '发动了禁忌的法术。代价是折寿，但只要能消灭眼前的敌人，一切都不重要。',
        '站在尸山血海之上，俯视着曾经不可一世的敌人。嘴角勾起一抹冰冷的弧度。'
      ],
      description: [
        '永夜的城市被血色月光笼罩。街道上空无一人，只有乌鸦的叫声回荡在废墟之间。',
        '地下深处的大牢中，潮湿的空气弥漫着腐烂的味道。铁链摩擦的声音在黑暗中格外刺耳。',
        '燃烧殆尽的王宫中，断裂的柱子和倒塌的穹顶诉说着曾经的辉煌。现在只剩灰烬。',
        '深渊的边缘，往下看只能看到无尽的黑暗。据说掉下去的人，永远不会到达底部。',
        '暴风雪席卷的荒原上，一座孤独的城堡矗立在风雪中。窗户里透出微弱的、不自然的红光。'
      ]
    },
    general: {
      dialog: [
        '「这就是……真相吗？」声音颤抖着，不愿相信眼前的事实。',
        '「不管发生什么，我都会陪着你。这不是承诺，而是事实。」',
        '「选择吧。没有正确选项，只有你必须承担后果的那个。」',
        '「你以为我在乎吗？我早就已经……什么都不在乎了。」',
        '「谢谢。这句话，我迟到了太久才说出口。」'
      ],
      action: [
        '整理着思绪，将所有的线索在脑海中重新排列。一定有什么被忽略了，一定。',
        '迈出了决定性的一步。前方是未知的道路，后退是熟悉的牢笼。没有犹豫的余地。',
        '将手中的信折好，放入口袋。这封信将改变一切，也可能什么都不改变。',
        '仰望着星空，寻找着属于自己的那颗。虽然不知道是哪一颗，但一定在那里。',
        '关上了身后的门，也关上了过去的一章。前方有新的故事在等待。'
      ],
      description: [
        '这是一个宁静的夜晚。远处的山峦在月光下勾勒出柔和的轮廓，如梦似幻。',
        '城市的喧嚣在远处回响，但这里却安静得能听见自己的心跳。',
        '风带来了远方的气息。那是自由的味道，也是未知的味道。',
        '时间在这个地方仿佛流动得格外缓慢。每一秒都充满了无限的可能性。',
        '光影交错间，现实与虚幻的边界变得模糊。也许，两者并没有那么分明的界限。'
      ]
    }
  };

  const styleData = templates[style] || templates.general;
  const pool = styleData[type] || styleData.description;
  const base = pool[Math.floor(rng() * pool.length)];

  // 根据章节号和段落索引做微小变化，让每章不同
  const modifiers = ['。', '……', '。', '，', '。'];
  const mod = modifiers[idx % modifiers.length];
  return base.replace(/。$/, mod);
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
  // 重置本章已读标记（用于滚动自动标记）
  chapterReadMarked = false;

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
  const totalRead = readChapters.length;
  const pct = totalChapters > 0 ? Math.round((totalRead / totalChapters) * 100) : 0;
  const lastRead = totalRead > 0 ? Math.max(...readChapters) : 0;

  // 目录头部：阅读进度 + 继续阅读
  const headerHtml = `
    <div class="catalog-progress-header" style="padding: 1rem 1.5rem; border-bottom: 1px solid rgba(176,124,216,0.08); background: rgba(176,124,216,0.04);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
        <span style="font-size:0.8rem;font-weight:600;">📖 阅读进度</span>
        <span style="font-size:0.75rem;color:var(--text-muted);">${totalRead} / ${totalChapters} 章 (${pct}%)</span>
      </div>
      <div style="height:4px;background:rgba(176,124,216,0.1);border-radius:2px;overflow:hidden;margin-bottom:0.5rem;">
        <span style="display:block;height:100%;width:${pct}%;background:linear-gradient(90deg,var(--color-secondary),var(--color-primary-light));border-radius:2px;transition:width 0.5s ease;"></span>
      </div>
      ${lastRead > 0 ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.4rem;">上次读到：第${lastRead}章</div>` : ''}
      ${lastRead > 0 && lastRead < totalChapters ? `<button onclick="loadChapter(${lastRead + 1});toggleCatalog();" style="width:100%;padding:0.5rem;border-radius:10px;border:1px solid rgba(176,124,216,0.2);background:linear-gradient(135deg,var(--color-secondary),var(--color-primary-light));color:#fff;font-size:0.8rem;font-family:inherit;cursor:pointer;transition:all 0.2s ease;">▶ 继续阅读第${lastRead + 1}章</button>` : ''}
    </div>
  `;

  let html = headerHtml;
  for (let i = 1; i <= totalChapters; i++) {
    const isRead = readChapters.includes(i);
    html += `
      <div class="catalog-item ${i === currentChapter ? 'active' : ''} ${isRead ? 'read' : ''}" data-ch="${i}" onclick="loadChapter(${i}); toggleCatalog();">
        <span>第${i}章</span>
        ${isRead ? '<span class="read-mark">✓</span>' : ''}
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
    // 打开目录后自动滚动到当前章节
    setTimeout(() => {
      const active = drawer.querySelector('.catalog-item.active');
      if (active) {
        active.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 350);
  }
}

/* ---------- 阅读设置 ---------- */
function loadSettings() {
  const settings = Storage.get('readerSettings') || {};
  const fontSize = settings.fontSize || 18;
  const lineHeight = settings.lineHeight || 1.8;
  const theme = settings.theme || 'light';
  const fontFamily = settings.fontFamily || 'sans';
  scrollMode = settings.scrollMode || 'scroll';

  setFontSize(fontSize);
  setLineHeight(lineHeight);
  setTheme(theme);
  setFontFamily(fontFamily, false);
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

const FONT_MAP = {
  sans: "'Noto Sans SC', 'Quicksand', sans-serif",
  serif: "'Noto Serif SC', 'SimSun', 'STSong', serif",
  kai: "'KaiTi', 'STKaiti', '楷体', serif"
};
function setFontFamily(family, shouldSave = true) {
  const el = document.getElementById('chapterText');
  el.style.fontFamily = FONT_MAP[family] || FONT_MAP.sans;
  document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('btnFont' + (family.charAt(0).toUpperCase() + family.slice(1)));
  if (btn) btn.classList.add('active');
  if (shouldSave) saveSettings();
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
    fontFamily: getCurrentFontFamily(),
    scrollMode: scrollMode
  };
  Storage.set('readerSettings', settings);
}

function getCurrentFontFamily() {
  const computed = window.getComputedStyle(document.getElementById('chapterText')).fontFamily;
  if (computed.includes('KaiTi') || computed.includes('STKaiti') || computed.includes('楷体')) return 'kai';
  if (computed.includes('Serif') || computed.includes('SimSun') || computed.includes('STSong')) return 'serif';
  return 'sans';
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
let chapterReadMarked = false;
function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  document.getElementById('progressFill').style.width = scrollPct + '%';
  // 显示章节进度，tooltip 显示页面阅读进度
  const pt = document.getElementById('progressText');
  pt.textContent = `${currentChapter} / ${totalChapters}`;
  pt.title = `本章阅读进度 ${scrollPct}%`;
  // 滚动到95%以上自动标记本章为已读
  if (scrollPct >= 95 && !chapterReadMarked && currentNovel) {
    const progress = Storage.get('readProgress') || {};
    if (!progress[currentNovel.id]) progress[currentNovel.id] = [];
    if (!progress[currentNovel.id].includes(currentChapter)) {
      progress[currentNovel.id].push(currentChapter);
      Storage.set('readProgress', progress);
      chapterReadMarked = true;
      // 更新目录显示
      renderCatalog();
    }
  }
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
  chapterReadMarked = false;
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

/* ---------- 加入书架 ---------- */
function addCurrentToBookshelf() {
  if (!currentNovel) return;
  const bs = Storage.get('bookshelf') || [];
  if (!bs.includes(currentNovel.id)) {
    bs.push(currentNovel.id);
    Storage.set('bookshelf', bs);
    showToast('❤️ 已加入书架');
    updateBookshelfBtn();
  } else {
    showToast('💡 该书已在书架中');
  }
}

function updateBookshelfBtn() {
  const btn = document.getElementById('btnBookshelf');
  if (!btn || !currentNovel) return;
  const bs = Storage.get('bookshelf') || [];
  if (bs.includes(currentNovel.id)) {
    btn.textContent = '✅ 已收藏';
    btn.style.color = '#e86a92';
  } else {
    btn.textContent = '❤️ 书架';
    btn.style.color = '';
  }
}

/* ---------- 返回 ---------- */
function goBack() {
  window.location.href = 'library.html';
}
