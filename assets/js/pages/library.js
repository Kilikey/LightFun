/* ============================================================
   次元书屋 · 文库首页逻辑
   数据 + 轮播 + 更新列表 + 排行 + 搜索 + 模态框
   ============================================================ */

const NOVELS = [
  { id:1, title:'无职转生', author:'理不尽な孫の手', cover:'../covers/01.jpg',
    desc:'34岁无职处男被赶出家门后车祸身亡，转生到剑与魔法的异世界。这次他下定决心要「这次一定要认真活下去」！从婴儿开始的异世界人生，一部关于成长与救赎的宏大史诗。',
    tags:['异世界','转生','冒险','奇幻'], chapters:264, status:'completed', score:9.1,
    update:'2小时前', updateCh:'第264章 最终章', rank:1 },
  { id:2, title:'刀剑神域', author:'川原礫', cover:'../covers/02.jpg',
    desc:'2022年，完全潜行型VRMMORPG「Sword Art Online」正式上线。然而玩家们却发现无法登出，死亡已不再是游戏里的虚拟体验——在游戏里死亡就等于真正死亡。',
    tags:['VRMMO','科幻','战斗','冒险'], chapters:276, status:'ongoing', score:9.0,
    update:'5小时前', updateCh:'第276章 新篇章', rank:2 },
  { id:3, title:'转生史莱姆', author:'伏瀬', cover:'../covers/03.jpg',
    desc:'上班族三上悟被刺身亡后转生到异世界成为一只史莱姆。拥有独特的技能「大贤者」和「捕食者」，在这个充满魔物的世界开启了建立魔物联邦的传奇之旅。',
    tags:['异世界','转生','建国','奇幻'], chapters:304, status:'ongoing', score:9.1,
    update:'昨天', updateCh:'第304章 魔王觉醒', rank:3 },
  { id:4, title:'实力至上主义教室', author:'衣笠彰梧', cover:'../covers/04.jpg',
    desc:'在几乎100%升学·就业率的全国首屈一指的名门学校·高度育成高中，那里是唯有优秀者才能受到优待的「实力至上主义」的学园。被分配到最底层的D班的绫小路清隆开始改变这个班级。',
    tags:['校园','智斗','心理','学园'], chapters:205, status:'ongoing', score:8.9,
    update:'1天前', updateCh:'第205章 期末试验', rank:4 },
  { id:5, title:'魔法禁书目录', author:'鎌池和馬', cover:'../covers/05.jpg',
    desc:'学园都市是一个拥有超能力开发机构的巨大都市。住在学生宿舍的高中生·上条当麻遇到了在教会阳台晾衣服的修女·茵蒂克丝。她自称脑海中有着「禁书目录」——十万三千册的魔法知识。科学与魔法交织的故事就此开幕。',
    tags:['科幻','魔法','学园','超能力'], chapters:503, status:'ongoing', score:9.0,
    update:'3天前', updateCh:'新约第22卷', rank:5 },
  { id:6, title:'我的青春恋爱物语果然有问题', author:'渡航', cover:'../covers/06.jpg',
    desc:'高中生比企谷八幡是一个性格孤僻的「孤零零综合症」患者。在生活指导老师平冢静的推荐下加入了「奉仕部」，与校内第一美少女雪之下雪乃以及其他成员一同展开了一段充满误解与成长的青春物语。',
    tags:['校园','恋爱','青春','日常'], chapters:148, status:'completed', score:8.8,
    update:'完结', updateCh:'第148章 真物', rank:6 },
  { id:7, title:'路人女主的养成方法', author:'丸戸史明', cover:'../covers/07.jpg',
    desc:'春假里，御宅族高中生安艺伦也在樱花坡道上邂逅了少女加藤惠。为了制作以惠为女主角的美少女游戏，伦也召集了同人游戏社团「Blessing Software」，开始了波澜万丈的同人游戏制作之旅。',
    tags:['校园','恋爱','喜剧','制作'], chapters:131, status:'completed', score:8.6,
    update:'完结', updateCh:'After篇', rank:7 },
  { id:8, title:'命运石之门', author:'林直孝', cover:'../covers/08.jpg',
    desc:'自称疯狂科学家·凤凰院凶真的冈部伦太郎，偶然发现了可以向过去发送电子邮件的「时间机器」。然而，改变过去的每个小小举动，都在引发着无法预料的世界线变动。',
    tags:['科幻','时间旅行','悬疑','科学'], chapters:92, status:'completed', score:9.2,
    update:'完结', updateCh:'第92章 命运石之门', rank:8 },
  { id:9, title:'No Game No Life', author:'榎宮祐', cover:'../covers/09.jpg',
    desc:'天才玩家兄妹·空与白，在网络上是不败的都市传说。某天，他们被自称「神」的少年召唤到禁止一切暴力、一切由游戏决定的世界「迪司博德」。在十六种族并存的异世界，兄妹二人开始挑战神明。',
    tags:['异世界','智斗','游戏','奇幻'], chapters:116, status:'ongoing', score:9.0,
    update:'2天前', updateCh:'第116章 新篇章', rank:9 },
  { id:10, title:'为美好的世界献上祝福', author:'暁なつめ', cover:'../covers/10.jpg',
    desc:'死宅高中生佐藤和真在交通事故中……本应如此死去，却在醒来时眼前有一位自称女神的美少女。「欸，你要不要去异世界？可以带一样你喜欢的东西去哦。」和真选择了阿克娅本人。充满欢笑与绝望的异世界生活开始了。',
    tags:['异世界','转生','搞笑','冒险'], chapters:172, status:'ongoing', score:8.7,
    update:'昨天', updateCh:'第172章 日常', rank:10 },
  { id:11, title:'Re:从零开始的异世界生活', author:'長月達平', cover:'../covers/11.jpg',
    desc:'走出便利商店的普通高中生菜月昴，突然被召唤到异世界。在获得了「死亡回归」的能力后——每次死亡都会回溯时间——昴必须凭借一次次的重来拯救重要的人们。',
    tags:['异世界','轮回','悬疑','冒险'], chapters:242, status:'ongoing', score:9.1,
    update:'3小时前', updateCh:'第242章 圣域篇', rank:11 },
  { id:12, title:'葬送的芙莉莲', author:'山田鐘人', cover:'../covers/12.jpg',
    desc:'勇者辛美尔一行人在打倒魔王之后凯旋。但在寿命悠久的精灵魔法使芙莉莲眼中，短短十年的冒险只是一瞬。在辛美尔离世后，芙莉莲踏上了理解人心与生命意义的旅途。',
    tags:['奇幻','治愈','冒险','人生'], chapters:138, status:'ongoing', score:9.3,
    update:'1天前', updateCh:'第138章 回忆之旅', rank:12 },
  { id:13, title:'86-不存在的战区', author:'安里アサト', cover:'../covers/13.jpg',
    desc:'圣玛格诺利亚共和国，被命名为「86」的区划中生活的少年少女们，每天都在驾驶着「无人」无人机进行战斗。辛耶·诺赞是他们的队长。而来自共和国侧的「指挥管制官」蕾娜，决心改变他们的命运。',
    tags:['科幻','战争','机甲','人性'], chapters:133, status:'ongoing', score:9.1,
    update:'4天前', updateCh:'第133章 最终章', rank:13 },
  { id:14, title:'狼与香辛料', author:'支倉凍砂', cover:'../covers/14.jpg',
    desc:'四处流浪的旅行商人克拉福·劳伦斯，在某天发现货车上藏着一个长着狼耳与狼尾的少女。自称丰收之神·贤狼赫萝的她，提议与劳伦斯一同北上回到故乡。一段温馨而精明的经商之旅开始了。',
    tags:['奇幻','经商','旅行','治愈'], chapters:202, status:'completed', score:8.9,
    update:'完结', updateCh:'第202章 终章', rank:14 },
  { id:15, title:'文学少女', author:'野村美月', cover:'../covers/15.jpg',
    desc:'高中二年级的井上心叶，曾是少年作家的他因为某个创伤而放弃了写作。在某个放学后的图书馆天台，他遇到了以吞噬故事为生的「文学少女」天野远子。她总是缠着心叶写故事，从此展开了围绕文学的青春群像剧。',
    tags:['校园','文学','青春','治愈'], chapters:89, status:'completed', score:8.8,
    update:'完结', updateCh:'第89章 终章', rank:15 },
  { id:16, title:'奇诺之旅', author:'時雨沢恵一', cover:'../covers/16.jpg',
    desc:'旅行者奇诺与会说话的摩托车赫尔墨斯，在形形色色的国度之间旅行。每个国家都有不同的风俗与法律，有的温柔、有的残酷、有的荒诞。一部关于旅途与思索的寓言式短篇集。',
    tags:['旅行','寓言','哲学','奇幻'], chapters:168, status:'ongoing', score:8.7,
    update:'1周前', updateCh:'第168章 新的国度', rank:16 },
  { id:17, title:'物语系列', author:'西尾維新', cover:'../covers/17.jpg',
    desc:'高中三年级的阿良良木历，在某天遇到了倒在血泊中的少女——同学战场原黑仪。她有着不为人知的秘密：没有重量。历被卷入了各种「怪异」事件之中，一场充满对话与战斗的物语开始了。',
    tags:['怪异','校园','对话','悬疑'], chapters:326, status:'ongoing', score:9.0,
    update:'昨天', updateCh:'怪物季第12章', rank:17 },
  { id:18, title:'笨蛋测试召唤兽', author:'井上堅二', cover:'../covers/18.jpg',
    desc:'文月学园的F班——被称为「笨蛋集团」的最差班级。但与普通学校不同的是，这里有着根据考试成绩召唤「召唤兽」进行战斗的特殊系统。F班的笨蛋们为了夺回教室和资源，向A班发起了挑战。',
    tags:['校园','搞笑','战斗','喜剧'], chapters:127, status:'completed', score:8.4,
    update:'完结', updateCh:'第127章 毕业', rank:18 },
  { id:19, title:'凉宫春日的忧郁', author:'谷川流', cover:'../covers/19.jpg',
    desc:'「我对普通的人类没有兴趣。你们之中要是有外星人、未来人、异世界来的人、超能力者，就尽管来找我吧！」——开学典礼上宣告这番惊人言论的凉宫春日。被卷入她的世界的阿虚，发现她所说的一切都是真的。',
    tags:['校园','科幻','日常','超自然'], chapters:128, status:'ongoing', score:8.7,
    update:'长期休载', updateCh:'第128章 惊愕', rank:19 },
  { id:20, title:'不正经的魔术讲师与禁忌教典', author:'羊太郎', cover:'../covers/20.jpg',
    desc:'阿尔扎诺帝国魔术学院，来了一位新讲师——格伦·雷达斯。他看起来懒散、不负责任，被学生们称为「不正经的魔术讲师」。然而在学院遭遇危机时，他却展现出令人惊异的真正实力。',
    tags:['学园','魔法','战斗','喜剧'], chapters:246, status:'ongoing', score:8.5,
    update:'2天前', updateCh:'第246章 帝国内乱', rank:20 },
  { id:21, title:'Isekai Mofumofu Café', author:'Punichan', cover:'../covers/21.jpg',
    desc:'冒险、奇幻的世界，Isekai Mofumofu Café的日常。在这个看似平凡的设定中，隐藏着不平凡的命运转折。每一次选择，都将影响最终的结局。',
    tags:['冒险','奇幻'], chapters:238, status:'ongoing', score:9.4,
    update:'4天前', updateCh:'第236章', rank:21 },
  { id:22, title:'Zenmetsu End wo Shinimonogurui de Kaihi shita. Party ga Yanda.', author:'kodamazon', cover:'../covers/22.jpg',
    desc:'这是一个关于战斗、奇幻的故事。在Zenmetsu End wo Shinimonogurui de Kaihi shita. Party ga Yanda.的世界中，主角面对种种挑战与命运，逐渐成长为独当一面的存在。友情、勇气与信念交织，谱写一段令人难忘的篇章。',
    tags:['战斗','奇幻'], chapters:109, status:'ongoing', score:8.5,
    update:'2小时前', updateCh:'外传第107章', rank:22 },
  { id:23, title:'Mukashi Yuusha de Ima wa Hone', author:'Pairan', cover:'../covers/23.jpg',
    desc:'战斗、冒险的世界，Mukashi Yuusha de Ima wa Hone的日常。在这个看似平凡的设定中，隐藏着不平凡的命运转折。每一次选择，都将影响最终的结局。',
    tags:['战斗','冒险','搞笑','奇幻'], chapters:40, status:'completed', score:9.4,
    update:'完结', updateCh:'第40章 终章', rank:23 },
  { id:24, title:'Souken no Yugami Tachi', author:'NOCO', cover:'../covers/24.jpg',
    desc:'在奇幻的背景下，一段Souken no Yugami Tachi的旅程悄然展开。主人公凭借坚韧的意志，跨越重重障碍，最终找到属于自己的答案。',
    tags:['奇幻'], chapters:205, status:'ongoing', score:9.0,
    update:'5小时前', updateCh:'短篇第202章', rank:24 },
  { id:25, title:'Koori no Koushaku to Itsuwari no Hanayome', author:'Mizushima, Shinobu', cover:'../covers/25.jpg',
    desc:'恋爱的世界充满了未知与奇迹。主角在Koori no Koushaku to Itsuwari no Hanayome中不断探索，发现了隐藏在表象之下的真相。一场改变命运的冒险就此开始。',
    tags:['恋爱'], chapters:6, status:'completed', score:8.6,
    update:'完结', updateCh:'第6章 终章', rank:25 },
  { id:26, title:'Around 40 Kenja no Isekai Seikatsu Nikki Zero: Swords & Sorceries World', author:'Johndee', cover:'../covers/26.jpg',
    desc:'这是一个发生在战斗、奇幻的故事。在Around 40 Kenja no Isekai Seikatsu Nikki Zero: Swords & Sorceries World的舞台上，少年少女们以各自的信念与意志，书写着属于他们的青春与传奇。',
    tags:['战斗','奇幻'], chapters:244, status:'ongoing', score:8.4,
    update:'昨天', updateCh:'第239章 新章', rank:26 },
  { id:27, title:'Genjuuou no Shinzou', author:'Oki, Mamiya', cover:'../covers/27.jpg',
    desc:'这是一个关于超自然的故事。在Genjuuou no Shinzou的世界中，主角面对种种挑战与命运，逐渐成长为独当一面的存在。友情、勇气与信念交织，谱写一段令人难忘的篇章。',
    tags:['超自然'], chapters:15, status:'completed', score:7.9,
    update:'完结', updateCh:'第15章 终章', rank:27 },
  { id:28, title:'Katakoi Mitsugetsu', author:'Tachibana, Kaoru', cover:'../covers/28.jpg',
    desc:'这是一个关于奇幻的故事。在Katakoi Mitsugetsu的世界中，主角面对种种挑战与命运，逐渐成长为独当一面的存在。友情、勇气与信念交织，谱写一段令人难忘的篇章。',
    tags:['奇幻'], chapters:141, status:'completed', score:8.2,
    update:'完结', updateCh:'第141章 终章', rank:28 },
  { id:29, title:'Dragon Quest: Dai no Daibouken - Sorezore no Michi', author:'Sanjou, Riku', cover:'../covers/29.jpg',
    desc:'战斗、冒险的世界充满了未知与奇迹。主角在Dragon Quest: Dai no Daibouken - Sorezore no Michi中不断探索，发现了隐藏在表象之下的真相。一场改变命运的冒险就此开始。',
    tags:['战斗','冒险','奇幻'], chapters:5, status:'completed', score:8.8,
    update:'完结', updateCh:'第5章 终章', rank:29 },
  { id:30, title:'Shousetsu Nisoku Hokou', author:'akka', cover:'../covers/30.jpg',
    desc:'这是一个发生在剧情、奇幻的故事。在Shousetsu Nisoku Hokou的舞台上，少年少女们以各自的信念与意志，书写着属于他们的青春与传奇。',
    tags:['剧情','奇幻','科幻'], chapters:323, status:'completed', score:8.1,
    update:'完结', updateCh:'第323章 终章', rank:30 },
  { id:31, title:'Natsume Souseki Fantasia', author:'Morikura, En', cover:'../covers/31.jpg',
    desc:'剧情的世界充满了未知与奇迹。主角在Natsume Souseki Fantasia中不断探索，发现了隐藏在表象之下的真相。一场改变命运的冒险就此开始。',
    tags:['剧情'], chapters:142, status:'ongoing', score:8.5,
    update:'2小时前', updateCh:'新篇章', rank:31 },
  { id:32, title:'Ninja to Gokudou: Engine Heart Love', author:'Kondou, Shinsuke', cover:'../covers/32.jpg',
    desc:'在战斗的设定下，一段Ninja to Gokudou: Engine Heart Love的物语缓缓展开。命运的齿轮开始转动，过去的秘密与未来的希望交织在一起。',
    tags:['战斗'], chapters:16, status:'completed', score:8.5,
    update:'完结', updateCh:'第16章 终章', rank:32 },
  { id:33, title:'Akatsuki no Majutsushi wa Tsuki ni You', author:'Naruse, Yamabuki', cover:'../covers/33.jpg',
    desc:'奇幻的世界充满了未知与奇迹。主角在Akatsuki no Majutsushi wa Tsuki ni You中不断探索，发现了隐藏在表象之下的真相。一场改变命运的冒险就此开始。',
    tags:['奇幻'], chapters:230, status:'completed', score:8.6,
    update:'完结', updateCh:'第230章 终章', rank:33 },
  { id:34, title:'Tekisei Saikyoushu ga Ore ni Icha Love shitagaru Okaasan ni Nattan desu ga?!', author:'Tyu-moji', cover:'../covers/34.jpg',
    desc:'战斗、奇幻的世界危机四伏，但主角并未退缩。在Tekisei Saikyoushu ga Ore ni Icha Love shitagaru Okaasan ni Nattan desu ga?!的旅途中，结识了重要的伙伴，也遭遇了强大的敌人。',
    tags:['战斗','奇幻'], chapters:8, status:'completed', score:9.4,
    update:'完结', updateCh:'第8章 终章', rank:34 },
  { id:35, title:'Chain Chronicle Colorless', author:'toi8', cover:'../covers/35.jpg',
    desc:'这是一个关于奇幻的故事。在Chain Chronicle Colorless的世界中，主角面对种种挑战与命运，逐渐成长为独当一面的存在。友情、勇气与信念交织，谱写一段令人难忘的篇章。',
    tags:['奇幻'], chapters:329, status:'completed', score:8.6,
    update:'完结', updateCh:'第329章 终章', rank:35 },
  { id:36, title:'Iede Ojousama no Maid Seikatsu', author:'Mizushima, Shinobu', cover:'../covers/36.jpg',
    desc:'奇幻、冒险的世界充满了未知与奇迹。主角在Iede Ojousama no Maid Seikatsu中不断探索，发现了隐藏在表象之下的真相。一场改变命运的冒险就此开始。',
    tags:['奇幻','冒险'], chapters:210, status:'completed', score:9.2,
    update:'完结', updateCh:'第210章 终章', rank:36 },
  { id:37, title:'Himegimi wa Dansou no Hanayome', author:'Suzukawa, Makoto', cover:'../covers/37.jpg',
    desc:'奇幻、冒险的世界危机四伏，但主角并未退缩。在Himegimi wa Dansou no Hanayome的旅途中，结识了重要的伙伴，也遭遇了强大的敌人。',
    tags:['奇幻','冒险'], chapters:167, status:'completed', score:7.6,
    update:'完结', updateCh:'第167章 终章', rank:37 },
  { id:38, title:'Kindan Shitei de Breakthrough: Yuusha no Musuko ga Maou no Deshi de Nani ga Warui', author:'Ryuutetsu', cover:'../covers/38.jpg',
    desc:'战斗、冒险的世界危机四伏，但主角并未退缩。在Kindan Shitei de Breakthrough: Yuusha no Musuko ga Maou no Deshi de Nani ga Warui的旅途中，结识了重要的伙伴，也遭遇了强大的敌人。',
    tags:['战斗','冒险','搞笑','奇幻'], chapters:20, status:'completed', score:8.9,
    update:'完结', updateCh:'第20章 终章', rank:38 },
  { id:39, title:'Chikyuu Saigo no Zombie: Night with the Living Dead', author:'Hatomi, Sta', cover:'../covers/39.jpg',
    desc:'这是一个发生在冒险、剧情的故事。在Chikyuu Saigo no Zombie: Night with the Living Dead的舞台上，少年少女们以各自的信念与意志，书写着属于他们的青春与传奇。',
    tags:['冒险','剧情'], chapters:220, status:'completed', score:8.5,
    update:'完结', updateCh:'第220章 终章', rank:39 },
  { id:40, title:'Make a Girl: Episode 0', author:'Ikeda, Akiya', cover:'../covers/40.jpg',
    desc:'这是一个发生在科幻的故事。在Make a Girl: Episode 0的舞台上，少年少女们以各自的信念与意志，书写着属于他们的青春与传奇。',
    tags:['科幻'], chapters:14, status:'completed', score:7.8,
    update:'完结', updateCh:'第14章 终章', rank:40 },
  { id:41, title:'Kanojo demo Nai Onnanoko ga Shinya Niji ni Chaahan Tsukuri ni Kuru Hanashi', author:'Michizou', cover:'../covers/41.jpg',
    desc:'搞笑、恋爱的世界充满了未知与奇迹。主角在Kanojo demo Nai Onnanoko ga Shinya Niji ni Chaahan Tsukuri ni Kuru Hanashi中不断探索，发现了隐藏在表象之下的真相。一场改变命运的冒险就此开始。',
    tags:['搞笑','恋爱'], chapters:345, status:'ongoing', score:8.2,
    update:'2天前', updateCh:'短篇第342章', rank:41 },
  { id:42, title:'Kyoufu no Maou Heika datta noni Hanayome Kyuuun ga Tomarimasen!', author:'DUO BRAND.', cover:'../covers/42.jpg',
    desc:'在奇幻、恋爱的背景下，一段Kyoufu no Maou Heika datta noni Hanayome Kyuuun ga Tomarimasen!的旅程悄然展开。主人公凭借坚韧的意志，跨越重重障碍，最终找到属于自己的答案。',
    tags:['奇幻','恋爱'], chapters:8, status:'completed', score:9.2,
    update:'完结', updateCh:'第8章 终章', rank:42 },
  { id:43, title:'Assassin no Tamago ni Tensei shita: Saikyou Gedou no Shounen wa, Ikinokoru Tame ni Shudan wo Erabanai', author:'Shinsora', cover:'../covers/43.jpg',
    desc:'这是一个关于战斗、奇幻与Assassin no Tamago ni Tensei shita: Saikyou Gedou no Shounen wa, Ikinokoru Tame ni Shudan wo Erabanai的故事。在命运的洪流中，每个人都在寻找自己的位置。坚持初心，方能抵达终点。',
    tags:['战斗','奇幻'], chapters:295, status:'ongoing', score:9.0,
    update:'5小时前', updateCh:'新篇章', rank:43 },
  { id:44, title:'Tenjou Tenge Seitokai Prifaes', author:'Sugii, Hikaru', cover:'../covers/44.jpg',
    desc:'这是一个发生在悬疑、恋爱的故事。在Tenjou Tenge Seitokai Prifaes的舞台上，少年少女们以各自的信念与意志，书写着属于他们的青春与传奇。',
    tags:['悬疑','恋爱'], chapters:198, status:'ongoing', score:8.1,
    update:'5小时前', updateCh:'第196章', rank:44 },
  { id:45, title:'Shousetsu-ban Make a Girl: Make Myself', author:'Poligon.', cover:'../covers/45.jpg',
    desc:'科幻的世界，Shousetsu-ban Make a Girl: Make Myself的日常。在这个看似平凡的设定中，隐藏着不平凡的命运转折。每一次选择，都将影响最终的结局。',
    tags:['科幻'], chapters:7, status:'completed', score:8.5,
    update:'完结', updateCh:'第7章 终章', rank:45 },
  { id:46, title:'Tensei Kusushi wa Hiru made Netai', author:'Kuga', cover:'../covers/46.jpg',
    desc:'这是一个关于奇幻与Tensei Kusushi wa Hiru made Netai的故事。在命运的洪流中，每个人都在寻找自己的位置。坚持初心，方能抵达终点。',
    tags:['奇幻'], chapters:238, status:'ongoing', score:8.5,
    update:'2天前', updateCh:'新篇章', rank:46 },
  { id:47, title:'Shin Sakura Taisen the Novel: Hizakura no Koro', author:'Mugi, Ayumu', cover:'../covers/47.jpg',
    desc:'这是一个关于战斗、冒险与Shin Sakura Taisen the Novel: Hizakura no Koro的故事。在命运的洪流中，每个人都在寻找自己的位置。坚持初心，方能抵达终点。',
    tags:['战斗','冒险','科幻'], chapters:6, status:'completed', score:7.8,
    update:'完结', updateCh:'第6章 终章', rank:47 },
  { id:48, title:'Oretachi Igai wa Nyuushitsu Fuka!', author:'Umezawa, Hana', cover:'../covers/48.jpg',
    desc:'在奇幻、冒险的设定下，一段Oretachi Igai wa Nyuushitsu Fuka!的物语缓缓展开。命运的齿轮开始转动，过去的秘密与未来的希望交织在一起。',
    tags:['奇幻','冒险'], chapters:199, status:'completed', score:8.2,
    update:'完结', updateCh:'第199章 终章', rank:48 },
  { id:49, title:'Nandaka Thrill to Suspense', author:'Maruya, Kae', cover:'../covers/49.jpg',
    desc:'在奇幻、冒险的背景下，一段Nandaka Thrill to Suspense的旅程悄然展开。主人公凭借坚韧的意志，跨越重重障碍，最终找到属于自己的答案。',
    tags:['奇幻','冒险'], chapters:173, status:'completed', score:8.9,
    update:'完结', updateCh:'第173章 终章', rank:49 },
  { id:50, title:'Tokyo Boys Revolution', author:'Ooya, Kazumi', cover:'../covers/50.jpg',
    desc:'在奇幻、冒险的背景下，一段Tokyo Boys Revolution的旅程悄然展开。主人公凭借坚韧的意志，跨越重重障碍，最终找到属于自己的答案。',
    tags:['奇幻','冒险'], chapters:292, status:'completed', score:8.4,
    update:'完结', updateCh:'第292章 终章', rank:50 }
];

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
  renderNovelGrid(NOVELS);
  renderTags();

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
  const filtered = q ? NOVELS.filter(n => n.title.includes(q) || n.author.includes(q)) : NOVELS;
  renderNovelGrid(filtered);
}
function renderNovelGrid(list) {
  const el = document.getElementById('novelGrid');
  document.getElementById('novelCount').textContent = '共 ' + list.length + ' 部';
  el.innerHTML = list.map(n => `
    <div class="novel-card" onclick="openModal(${n.id})">
      <div class="cover-wrap">
        <img src="${n.cover}" alt="${n.title}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="novel-info">
        <h4>${n.title}</h4>
        <div class="author">${n.author}</div>
        <span class="status ${n.status==='completed'?'completed':''}">${n.status==='completed'?'✅ 完结':'📖 连载中'}</span>
      </div>
    </div>`).join('');
}

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
  const el = document.getElementById('modalBody');
  el.innerHTML = `
    <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
    <div class="m-info">
      <h2>${n.title}</h2>
      <div class="m-author">✎ ${n.author}</div>
      <div class="m-tags">${n.tags.map(t=>'<span>#'+t+'</span>').join('')}</div>
      <div class="m-desc">${n.desc}</div>
      <div class="m-chapters">📖 共 ${n.chapters} 章 · ${n.status==='completed'?'✅ 已完结':'🔄 连载中'}<br>⭐ ${Formatter.renderStars(n.score)} ${n.score}</div>
      <div class="m-rating" style="margin-top:1rem;">
        <span style="font-size:0.8rem;color:rgba(61,61,74,0.4);margin-right:0.5rem;">我的评分:</span>
        <span class="rate-stars" id="rateStars" style="cursor:pointer;font-size:1.1rem;color:var(--color-gold);" onmouseleave="renderRateStars(${id},${myRating})">
          ${renderRateStarsHtml(id, myRating)}
        </span>
        <span id="rateScore" style="font-size:0.75rem;color:var(--text-muted);margin-left:0.3rem;">${myRating ? myRating + '星' : '未评分'}</span>
      </div>
      <div style="margin-top:1rem;">
        <button class="read-btn" onclick="startReading(${n.id})">开始阅读</button>
        <button class="read-btn" style="margin-left:0.5rem;background:linear-gradient(135deg,#f5b342,#f5a0b8);" onclick="addToBookshelf(${n.id})">❤️ 加入书架</button>
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
  window.location.href = 'reader.html?id=' + id;
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
