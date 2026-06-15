/* ============================================================
   次元书屋 · 格式化工具 (formatter.js)
   作用：评分星星、日期、文本截断等通用格式化
   ============================================================ */

const Formatter = {
  /**
   * 评分 → 星星字符串
   * @param {number} score 0~10，保留1位小数
   * @returns {string} 如 "★★★★★☆"
   */
  renderStars(score) {
    const s = Math.min(10, Math.max(0, score));
    const full = Math.floor(s / 2);
    const half = (s / 2 - full) >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(5 - full - half);
  },

  /**
   * 文本截断
   * @param {string} text
   * @param {number} maxLen
   * @returns {string}
   */
  truncate(text, maxLen = 100) {
    if (!text || text.length <= maxLen) return text;
    return text.slice(0, maxLen) + '...';
  },

  /**
   * 日期格式化
   * @param {string|Date} date
   * @returns {string}
   */
  formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
};
