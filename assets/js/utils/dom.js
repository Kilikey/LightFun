/* ============================================================
   次元书屋 · DOM 工具 (dom.js)
   作用：选择器封装、事件委托、模板加载、创建元素
   ============================================================ */

const DOM = {
  qs(selector, parent = document) {
    return parent.querySelector(selector);
  },

  qsa(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  },

  /**
   * 事件委托
   * @param {Element} parent 父容器
   * @param {string} event 事件名
   * @param {string} selector 子元素选择器
   * @param {Function} handler
   */
  on(parent, event, selector, handler) {
    parent.addEventListener(event, e => {
      const target = e.target.closest(selector);
      if (target) handler.call(target, e, target);
    });
  },

  /**
   * 加载 HTML 模板并插入到目标元素
   * @param {string} url 模板文件路径
   * @param {Element|string} target 目标元素或选择器
   * @returns {Promise<string>} 模板内容
   */
  async loadTemplate(url, target) {
    const res = await fetch(url);
    const html = await res.text();
    const el = typeof target === 'string' ? this.qs(target) : target;
    if (el) el.innerHTML = html;
    return html;
  },

  /**
   * 创建元素并设置属性/内容
   * @param {string} tag
   * @param {Object} attrs
   * @param {string} text
   * @returns {Element}
   */
  create(tag, attrs = {}, text = '') {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    if (text) el.textContent = text;
    return el;
  }
};
