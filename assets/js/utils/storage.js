/* ============================================================
   次元书屋 · LocalStorage 封装 (storage.js)
   作用：统一读写本地存储，自动序列化/反序列化，加前缀防冲突
   ============================================================ */

const Storage = {
  prefix: 'db_',

  get(key) {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('[Storage] get failed:', key, e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('[Storage] set failed:', key, e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  },

  clear() {
    localStorage.clear();
  },

  keys() {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(this.prefix))
      .map(k => k.slice(this.prefix.length));
  }
};
