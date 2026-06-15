/* ============================================================
   次元书屋 · Toast 提示组件 (toast.js)
   作用：全站统一的消息提示，自动创建/销毁 DOM
   ============================================================ */

const Toast = {
  el: null,
  timer: null,

  _ensure() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.id = 'toast';
    this.el.style.cssText = `
      position: fixed;
      top: 1.2rem;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      padding: 0.7rem 1.8rem;
      border-radius: 100px;
      background: rgba(40,30,50,0.85);
      backdrop-filter: blur(16px);
      color: #fff;
      font-size: 0.9rem;
      z-index: 999;
      opacity: 0;
      transition: all 0.35s cubic-bezier(.34,1.56,.64,1);
      pointer-events: none;
      white-space: nowrap;
      border: 1px solid rgba(255,255,255,0.1);
      font-family: var(--font-sans);
    `;
    document.body.appendChild(this.el);
  },

  show(msg, duration = 2500) {
    this._ensure();
    clearTimeout(this.timer);
    this.el.textContent = msg;
    this.el.style.opacity = '1';
    this.el.style.transform = 'translateX(-50%) translateY(0)';
    this.timer = setTimeout(() => this.hide(), duration);
  },

  hide() {
    if (!this.el) return;
    this.el.style.opacity = '0';
    this.el.style.transform = 'translateX(-50%) translateY(-20px)';
  }
};

// 兼容旧版全局 showToast 调用
window.showToast = (msg) => Toast.show(msg);
