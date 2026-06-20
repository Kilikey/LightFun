/* ============================================================
   次元书屋 · 排行榜逻辑
   5大榜单 + 历年「这本轻小说真厉害」2015-2026
   ============================================================ */

const NOVELS = [
  { id:1, title:'无职转生', author:'理不尽な孫の手', cover:'../covers/01.jpg', desc:'34岁无职处男被赶出家门后车祸身亡，转生到剑与魔法的异世界。从婴儿开始的异世界人生，一部关于成长与救赎的宏大史诗。', tags:['异世界','转生','冒险','奇幻'], chapters:264, status:'completed', score:9.1 },
  { id:2, title:'刀剑神域', author:'川原礫', cover:'../covers/02.jpg', desc:'2022年，完全潜行型VRMMORPG「Sword Art Online」正式上线。然而玩家们却发现无法登出，死亡已不再是游戏里的虚拟体验。', tags:['VRMMO','科幻','战斗','冒险'], chapters:276, status:'ongoing', score:9.0 },
  { id:3, title:'转生史莱姆', author:'伏瀬', cover:'../covers/03.jpg', desc:'上班族三上悟被刺身亡后转生到异世界成为一只史莱姆。拥有独特的技能「大贤者」和「捕食者」，开启了建立魔物联邦的传奇之旅。', tags:['异世界','转生','建国','奇幻'], chapters:304, status:'ongoing', score:9.1 },
  { id:4, title:'实力至上主义教室', author:'衣笠彰梧', cover:'../covers/04.jpg', desc:'在高度育成高中，唯有优秀者才能受到优待的「实力至上主义」的学园。被分配到最底层的D班的绫小路清隆开始改变这个班级。', tags:['校园','智斗','心理','学园'], chapters:205, status:'ongoing', score:8.9 },
  { id:5, title:'魔法禁书目录', author:'鎌池和馬', cover:'../covers/05.jpg', desc:'学园都市是一个拥有超能力开发机构的巨大都市。高中生上条当麻遇到了自称脑海中有着「禁书目录」的修女·茵蒂克丝。科学与魔法交织的故事。', tags:['科幻','魔法','学园','超能力'], chapters:503, status:'ongoing', score:9.0 },
  { id:6, title:'我的青春恋爱物语果然有问题', author:'渡航', cover:'../covers/06.jpg', desc:'高中生比企谷八幡是一个性格孤僻的「孤零零综合症」患者。在生活指导老师的推荐下加入了「奉仕部」，与雪之下雪乃展开青春物语。', tags:['校园','恋爱','青春','日常'], chapters:148, status:'completed', score:8.8 },
  { id:7, title:'路人女主的养成方法', author:'丸戸史明', cover:'../covers/07.jpg', desc:'御宅族高中生安艺伦也在樱花坡道上邂逅了少女加藤惠。为了制作美少女游戏，召集了同人游戏社团「Blessing Software」。', tags:['校园','恋爱','喜剧','制作'], chapters:131, status:'completed', score:8.6 },
  { id:8, title:'命运石之门', author:'林直孝', cover:'../covers/08.jpg', desc:'自称疯狂科学家·凤凰院凶真的冈部伦太郎，偶然发现了可以向过去发送电子邮件的「时间机器」。改变过去引发世界线变动。', tags:['科幻','时间旅行','悬疑','科学'], chapters:92, status:'completed', score:9.2 },
  { id:9, title:'No Game No Life', author:'榎宮祐', cover:'../covers/09.jpg', desc:'天才玩家兄妹·空与白，在网络上是不败的都市传说。被自称「神」的少年召唤到一切由游戏决定的世界「迪司博德」。', tags:['异世界','智斗','游戏','奇幻'], chapters:116, status:'ongoing', score:9.0 },
  { id:10, title:'为美好的世界献上祝福', author:'暁なつめ', cover:'../covers/10.jpg', desc:'死宅高中生佐藤和真在交通事故中死去，眼前有一位自称女神的美少女。和真选择了阿克娅本人，充满欢笑与绝望的异世界生活开始了。', tags:['异世界','转生','搞笑','冒险'], chapters:172, status:'ongoing', score:8.7 },
  { id:11, title:'Re:从零开始的异世界生活', author:'長月達平', cover:'../covers/11.jpg', desc:'普通高中生菜月昴，突然被召唤到异世界。获得了「死亡回归」的能力——每次死亡都会回溯时间——必须凭借一次次的重来拯救重要的人们。', tags:['异世界','轮回','悬疑','冒险'], chapters:242, status:'ongoing', score:9.1 },
  { id:12, title:'葬送的芙莉莲', author:'山田鐘人', cover:'../covers/12.jpg', desc:'勇者辛美尔一行人打倒魔王之后凯旋。在辛美尔离世后，寿命悠久的精灵魔法使芙莉莲踏上了理解人心与生命意义的旅途。', tags:['奇幻','治愈','冒险','人生'], chapters:138, status:'ongoing', score:9.3 },
  { id:13, title:'86-不存在的战区', author:'安里アサト', cover:'../covers/13.jpg', desc:'圣玛格诺利亚共和国，被命名为「86」的区划中生活的少年少女们，每天都在驾驶「无人」无人机战斗。指挥管制官蕾娜决心改变他们的命运。', tags:['科幻','战争','机甲','人性'], chapters:133, status:'ongoing', score:9.1 },
  { id:14, title:'狼与香辛料', author:'支倉凍砂', cover:'../covers/14.jpg', desc:'旅行商人克拉福·劳伦斯，在货车上发现长着狼耳与狼尾的少女。自称丰收之神·贤狼赫萝的她，提议与劳伦斯一同北上。', tags:['奇幻','经商','旅行','治愈'], chapters:202, status:'completed', score:8.9 },
  { id:15, title:'文学少女', author:'野村美月', cover:'../covers/15.jpg', desc:'井上心叶曾是少年作家，因创伤而放弃写作。在天台遇到了以吞噬故事为生的「文学少女」天野远子。围绕文学的青春群像剧。', tags:['校园','文学','青春','治愈'], chapters:89, status:'completed', score:8.8 },
  { id:16, title:'奇诺之旅', author:'時雨沢恵一', cover:'../covers/16.jpg', desc:'旅行者奇诺与会说话的摩托车赫尔墨斯，在形形色色的国度之间旅行。每个国家都有不同的风俗与法律，一部寓言式短篇集。', tags:['旅行','寓言','哲学','奇幻'], chapters:168, status:'ongoing', score:8.7 },
  { id:17, title:'物语系列', author:'西尾維新', cover:'../covers/17.jpg', desc:'高中三年级的阿良良木历，遇到了倒在血泊中的同学战场原黑仪。她有着不为人知的秘密：没有重量。被卷入各种「怪异」事件。', tags:['怪异','校园','对话','悬疑'], chapters:326, status:'ongoing', score:9.0 },
  { id:18, title:'笨蛋测试召唤兽', author:'井上堅二', cover:'../covers/18.jpg', desc:'文月学园F班——被称为「笨蛋集团」的最差班级。根据考试成绩召唤「召唤兽」进行战斗，笨蛋们向A班发起挑战。', tags:['校园','搞笑','战斗','喜剧'], chapters:127, status:'completed', score:8.4 },
  { id:19, title:'凉宫春日的忧郁', author:'谷川流', cover:'../covers/19.jpg', desc:'「我对普通的人类没有兴趣！」——开学典礼上宣告这番言论的凉宫春日。被卷入她的世界的阿虚，发现她所说的一切都是真的。', tags:['校园','科幻','日常','超自然'], chapters:128, status:'ongoing', score:8.7 },
  { id:20, title:'不正经的魔术讲师与禁忌教典', author:'羊太郎', cover:'../covers/20.jpg', desc:'阿尔扎诺帝国魔术学院，来了新讲师格伦·雷达斯。被学生们称为「不正经的魔术讲师」，然而在学院遭遇危机时展现真正实力。', tags:['学园','魔法','战斗','喜剧'], chapters:246, status:'ongoing', score:8.5 },
  { id:21, title:'不死者之王', author:'Maruyama, Kugane', cover:'../covers/21.jpg', desc:'作为异世界暗黑奇幻的代表作，「Overlord」讲述了一个顶尖玩家在游戏停服后滞留在虚拟世界，以不死者之王安兹·乌尔·恭的身份君临天下的故事。', tags:['异世界','暗黑','奇幻','王者'], chapters:225, status:'ongoing', score:8.6 },
  { id:22, title:'在地下城寻求邂逅是否搞错了什么', author:'Yasuda, Suzuhito', cover:'../covers/22.jpg', desc:'迷宫都市欧拉丽，少年贝尔·克朗尼为了成为英雄，在地下城中寻求邂逅。遇到「憧憬」的剑姬艾丝，开始了以冒险者为目标的日子。', tags:['奇幻','冒险','战斗','神代'], chapters:153, status:'ongoing', score:8.3 },
  { id:23, title:'幼女战记', author:'Shinotsuki, Shinobu', cover:'../covers/23.jpg', desc:'精英上班族在推人下地铁后被推下月台，转生为异世界的幼女谭雅。以冷酷的头脑和幼小身躯，在战火纷飞的异世界以战争为生存手段。', tags:['战争','奇幻','军事','转生'], chapters:108, status:'ongoing', score:8.4 },
  { id:24, title:'想要成为影之实力者', author:'Touzai', cover:'../covers/24.jpg', desc:'少年希德憧憬着「影之实力者」这一存在，转生到异世界后，他真的成为了暗中操纵世界的暗影组织的首领。中二病最强的异世界喜剧。', tags:['异世界','战斗','搞笑','中二'], chapters:121, status:'ongoing', score:8.5 },
  { id:25, title:'魔女之旅', author:'Azure', cover:'../covers/25.jpg', desc:'灰发魔女伊蕾娜，在各式各样的国度之间旅行。每个国家都有不同的故事，温柔、残酷、荒诞……一部旅途与思索的寓言集。', tags:['奇幻','旅行','日常','治愈'], chapters:110, status:'ongoing', score:8.3 },
  { id:26, title:'盾之勇者成名录', author:'Aneko, Yusagi', cover:'../covers/26.jpg', desc:'大学生岩谷尚文被召唤到异世界，成为四圣勇者之一的「盾之勇者」。但刚一开局就被公主陷害，失去一切，从绝望中重新站起。', tags:['异世界','冒险','战斗','复仇'], chapters:127, status:'ongoing', score:7.9 },
  { id:27, title:'哥布林杀手', author:'Kannatsuki, Noboru', cover:'../covers/27.jpg', desc:'「我不拯救世界，我只杀哥布林。」一名只接哥布林任务的银等级冒险者。凭借经验与执念，对哥布林赶尽杀绝的黑暗奇幻故事。', tags:['奇幻','战斗','黑暗','冒险'], chapters:267, status:'ongoing', score:7.8 },
  { id:28, title:'平凡职业造就世界最强', author:'TakayaKi', cover:'../covers/28.jpg', desc:'被同学背叛而掉入深渊的异世界召唤者南云始，在绝望中获得了「炼成」的魔法。从世界最弱，走向世界最强的逆袭故事。', tags:['异世界','战斗','后宫','逆袭'], chapters:250, status:'ongoing', score:7.7 },
  { id:29, title:'带着智能手机闯荡异世界', author:'Usatsuka, Eiji', cover:'../covers/29.jpg', desc:'神明的失误导致望月冬夜死去，作为补偿让他在异世界复活，并保留了智能手机。用现代科技和魔法在异世界轻松生活的故事。', tags:['异世界','冒险','后宫','日常'], chapters:129, status:'ongoing', score:7.4 },
  { id:30, title:'爆肝工程师的异世界狂想曲', author:'Ainana, Hiro', cover:'../covers/30.jpg', desc:'程序员佐藤在爆肝加班后，发现自己在异世界醒来。带着满级技能，在异世界一边享受美食一边旅行的轻松冒险故事。', tags:['异世界','冒险','日常','美食'], chapters:136, status:'ongoing', score:7.5 },
  { id:31, title:'贤者之孙', author:'Kikuchi, Seiji', cover:'../covers/31.jpg', desc:'少年西恩在意外中被贤者梅林救下，并被抚养长大。继承了梅林和梅莉达的全部魔法知识，却不知常识为何物。', tags:['异世界','魔法','战斗','学园'], chapters:246, status:'ongoing', score:7.2 },
  { id:32, title:'重来吧，魔王大人！', author:'Ogata, Kouji', cover:'../covers/32.jpg', desc:'游戏运营者九内伯斗被召唤到异世界，成为了魔王。然而他的行事作风却像是一个「好大叔」，在异世界开始了经营之旅。', tags:['异世界','搞笑','奇幻','经营'], chapters:254, status:'ongoing', score:7.3 },
  { id:33, title:'被卷入了勇者召唤事件却发现异世界很和平', author:'Johndee', cover:'../covers/33.jpg', desc:'被卷入勇者召唤的普通人，却发现异世界异常和平。没有魔王、没有战争，只有温馨的日常和异种族文化交流。治愈系异世界。', tags:['异世界','治愈','日常','美食'], chapters:92, status:'completed', score:8.7 },
  { id:34, title:'世界顶尖的暗杀者转生为异世界贵族', author:'Reia', cover:'../covers/34.jpg', desc:'世界顶尖的暗杀者退休后被组织背叛，转生到异世界成为贵族。接受女神委托，在异世界继续暗杀者的工作。', tags:['异世界','战斗','暗杀','魔法'], chapters:145, status:'ongoing', score:7.3 },
  { id:35, title:'乙女游戏世界对路人角色很不友好', author:'Mishima, Yomu', cover:'../covers/35.jpg', desc:'转生到乙女游戏世界，主角却是一个路人角色。在这个对路人极度不友好的世界里，利用前世知识逆转命运。', tags:['异世界','校园','喜剧','逆袭'], chapters:207, status:'completed', score:7.9 },
  { id:36, title:'转生恶役只好拔除破灭旗标', author:'Hidaka, Nami', cover:'../covers/36.jpg', desc:'公爵千金卡塔莉娜转生为乙女游戏中的反派角色。为了避开被流放或处刑的悲惨结局，开始拔除破灭flag。', tags:['异世界','校园','恋爱','喜剧'], chapters:276, status:'ongoing', score:7.9 },
  { id:37, title:'关于我在无意间被隔壁的天使变成废柴这件事', author:'Kazutake, Hazano', cover:'../covers/37.jpg', desc:'独居高中生藤宫周，隔壁住着学校第一美少女椎名真昼。从雨天借伞开始，真昼开始照顾周的饮食起居，温暖恋爱喜剧。', tags:['校园','恋爱','日常','治愈'], chapters:137, status:'ongoing', score:8.5 },
  { id:38, title:'不时轻声地以俄语遮羞的邻座艾莉同学', author:'Momoco', cover:'../covers/38.jpg', desc:'久世政近的邻座是艾莉莎·米哈伊罗夫娜·九条。艾莉以为政近不懂俄语，经常用俄语娇羞地表达真心。然而政近其实听得懂。', tags:['校园','恋爱','喜剧','日常'], chapters:254, status:'ongoing', score:8.1 },
  { id:39, title:'败犬女主太多了', author:'Imigimuru', cover:'../covers/39.jpg', desc:'温水和彦是班级中不起眼的背景人物。他目睹了人气女生八奈见杏菜被甩的场景，以此为契机，众多「败犬」女主汇聚到他的日常中。', tags:['校园','恋爱','喜剧','青春'], chapters:111, status:'ongoing', score:8.4 },
  { id:40, title:'满怀美梦的少年是现实主义者', author:'Saba, Mizore', cover:'../covers/40.jpg', desc:'一直暗恋着夏川爱华的一之濑悠斗，某天突然梦醒。从暗恋的幻想中清醒，开始以现实主义的态度面对青春的恋爱故事。', tags:['校园','恋爱','日常','青春'], chapters:168, status:'ongoing', score:7.2 },
  { id:41, title:'位于恋爱光谱极端的我们', author:'Nagaoka, Makiko', cover:'../covers/41.jpg', desc:'经验为零的女高中生与经验颇丰的男高中生，在恋爱光谱的两端相遇。从互相否定到逐渐理解，一段真实的青春恋爱。', tags:['校园','恋爱','青春','日常'], chapters:266, status:'ongoing', score:7.3 },
  { id:42, title:'义妹生活', author:'Mikawa, Ghost', cover:'../covers/42.jpg', desc:'高中生浅村悠太和突然出现的义妹绫濑沙季开始了同居生活。两人约定互不干涉、保持礼貌的距离，但距离逐渐拉近。', tags:['校园','恋爱','日常','治愈'], chapters:257, status:'ongoing', score:8.2 },
  { id:43, title:'间谍教室', author:'Tomari', cover:'../covers/43.jpg', desc:'世界最强的间谍「火焰」克劳斯，接到任务培育新的间谍。他的学生是一群问题少女，在间谍教室中展开激烈的特训。', tags:['战斗','悬疑','校园','谍战'], chapters:111, status:'ongoing', score:7.7 },
  { id:44, title:'叹息的亡灵好想退隐', author:'Tsukikage', cover:'../covers/44.jpg', desc:'被公认为最强探索者的利兹·莱茵福尔特，其实只想退休。然而她的队伍成员们越来越强，她不得不一直作为队长站在前线。', tags:['奇幻','冒险','战斗','喜剧'], chapters:205, status:'ongoing', score:7.5 },
  { id:45, title:'处刑少女的生存之道', author:'Nilitsu', cover:'../covers/45.jpg', desc:'处刑人玛瑙的任务是杀死来自日本的异世界转生者。然而她在执行任务时，遇到了一个特殊的转生者——灯里。', tags:['奇幻','战斗','悬疑','百合'], chapters:118, status:'ongoing', score:7.4 },
  { id:46, title:'金装的维尔梅', author:'Hachimoku, Mei', cover:'../covers/46.jpg', desc:'魔法学院学生阿鲁特为了通过召唤术考试，意外召唤出了被封印的恶魔维尔梅。她要求阿鲁特提供「魔力」，方式是亲吻。', tags:['校园','魔法','恋爱','喜剧'], chapters:7, status:'completed', score:8.3 },
  { id:47, title:'契约之吻', author:'Nomura, Mizuki', cover:'../covers/47.jpg', desc:'在恶魔横行的世界里，绪方修与恶魔少女木更签订了契约。为了找回失去的记忆和恋人，他们共同战斗的科幻恋爱故事。', tags:['科幻','恋爱','战斗','恶魔'], chapters:5, status:'completed', score:9.4 },
  { id:48, title:'魔王学院的不适任者', author:'Shizuma, Yoshinori', cover:'../covers/48.jpg', desc:'转生为魔王转世的阿诺斯，进入魔王学院。然而学院不承认他的实力，被贴上「不适任者」的标签，开启反转之路。', tags:['奇幻','战斗','学园','逆袭'], chapters:164, status:'completed', score:7.7 },
  { id:49, title:'因为不是真正的伙伴而被逐出勇者队伍', author:'Yasumo', cover:'../covers/49.jpg', desc:'辅助职业雷德被勇者队伍逐出。他决定到边境开药店，过上悠闲的生活。然而他的药水效果超群，不知不觉名声大噪。', tags:['异世界','治愈','日常','经营'], chapters:194, status:'ongoing', score:7.3 },
  { id:50, title:'回复术士的重启人生', author:'Shiokonbu', cover:'../covers/50.jpg', desc:'凯亚尔被公主芙列雅利用后抛弃。他在濒死之际获得了回复术士的「回复」能力，并发动了「时间倒流」——回到4年前，开始复仇。', tags:['异世界','战斗','黑暗','复仇'], chapters:189, status:'ongoing', score:6.6 }
];

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
    return `
      <div class="top3-card" onclick="showToast('📖 ${n.title}')">
        <div class="top3-rank ${medal}">${n.rank}</div>
        <img src="${n.cover}" alt="${n.title}" onerror="this.src='../covers/01.jpg'">
        <div class="top3-title">${n.title}</div>
        <div class="top3-author">${n.author}</div>
      </div>`;
  }).join('');

  const list = data.list.map(n => `
    <div class="rank-item-full" onclick="showToast('📖 ${n.title}')">
      <div class="rank-num-full">${n.rank}</div>
      <img src="${n.cover}" alt="${n.title}" onerror="this.src='../covers/01.jpg'" style="width:36px;height:50px">
      <div class="rf-info">
        <div class="rf-title">${n.title}</div>
        <div class="rf-author">${n.author}</div>
      </div>
    </div>
  `).join('');

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
