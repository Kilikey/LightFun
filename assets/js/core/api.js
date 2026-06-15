/* ============================================================
   次元书屋 · 数据请求层 (api.js)
   作用：封装所有数据获取逻辑，当前读取 JSON 文件，未来可替换为后端 API
   ============================================================ */

const API = {
  baseDataPath: 'assets/data/',

  /**
   * 获取所有作品列表
   * @returns {Promise<Array>}
   */
  async getNovels() {
    const res = await fetch(this.baseDataPath + 'novels.json');
    return res.json();
  },

  /**
   * 获取单部作品详情
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  async getNovel(id) {
    const novels = await this.getNovels();
    return novels.find(n => n.id === id) || null;
  },

  /**
   * 获取章节内容（占位，后续接入）
   * @param {number} novelId
   * @param {number} chapterId
   * @returns {Promise<Object|null>}
   */
  async getChapter(novelId, chapterId) {
    const path = `${this.baseDataPath}chapters/${String(novelId).padStart(3,'0')}/${String(chapterId).padStart(3,'0')}.json`;
    try {
      const res = await fetch(path);
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }
};
