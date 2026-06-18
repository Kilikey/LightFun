/* ============================================================
   次元书屋 · 全局状态管理 (state.js)
   作用：集中管理应用状态，支持订阅/发布，自动持久化到 LocalStorage
   ============================================================ */

const State = {
  data: {
    user: { name: '张三', avatar: null },          // 当前登录用户 {name, avatar}
    theme: 'default',    // 当前主题
    bookshelf: [],       // 书架 [{novelId, chapterId, timestamp}]
    history: [],         // 阅读历史 [{novelId, chapterId, progress, timestamp}]
    settings: {          // 阅读偏好
      fontSize: 16,
      lineHeight: 1.8,
      bgColor: '#fdf6f0',
      fontFamily: 'Noto Sans SC',
      pageMode: 'scroll'   // scroll | page
    }
  },

  listeners: {},

  init() {
    const saved = Storage.get('app_state');
    if (saved) {
      this.data = { ...this.data, ...saved };
    }
  },

  get(key) {
    return this.data[key];
  },

  set(key, value) {
    this.data[key] = value;
    this.emit(key, value);
    Storage.set('app_state', this.data);
  },

  update(key, updater) {
    const current = this.data[key];
    const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
    this.set(key, next);
  },

  on(key, fn) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(fn);
    // 立即触发一次当前值，方便初始化
    fn(this.data[key]);
  },

  emit(key, value) {
    const list = this.listeners[key] || [];
    list.forEach(fn => fn(value));
  }
};

// 初始化时从存储恢复
State.init();
