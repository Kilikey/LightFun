/* ============================================================
   次元书屋 · 评论组件 (comments.js)
   支持作品评论 + 章节评论（本章说）
   ============================================================ */

const Comments = {
  // 获取作品评论
  getNovelComments(novelId) {
    const all = Storage.get('db_comments') || {};
    return all[novelId] || [];
  },

  // 获取章节评论
  getChapterComments(novelId, chapter) {
    const all = Storage.get('db_chapter_comments') || {};
    return all[`${novelId}-${chapter}`] || [];
  },

  // 添加作品评论
  addNovelComment(novelId, content) {
    const user = State.get('user') || { name: '张三', avatar: null };
    const all = Storage.get('db_comments') || {};
    if (!all[novelId]) all[novelId] = [];
    all[novelId].push({
      id: Date.now(),
      user: user.name,
      avatar: user.avatar,
      content: content.trim(),
      time: new Date().toISOString(),
      likes: 0
    });
    Storage.set('db_comments', all);
    return all[novelId];
  },

  // 添加章节评论
  addChapterComment(novelId, chapter, content) {
    const user = State.get('user') || { name: '张三', avatar: null };
    const all = Storage.get('db_chapter_comments') || {};
    const key = `${novelId}-${chapter}`;
    if (!all[key]) all[key] = [];
    all[key].push({
      id: Date.now(),
      user: user.name,
      avatar: user.avatar,
      content: content.trim(),
      time: new Date().toISOString(),
      likes: 0
    });
    Storage.set('db_chapter_comments', all);
    return all[key];
  },

  // 点赞评论
  likeComment(novelId, commentId, isChapter, chapter) {
    const key = isChapter ? `${novelId}-${chapter}` : novelId;
    const storageKey = isChapter ? 'db_chapter_comments' : 'db_comments';
    const all = Storage.get(storageKey) || {};
    const list = all[key] || [];
    const c = list.find(item => item.id === commentId);
    if (c) {
      c.likes = (c.likes || 0) + 1;
      Storage.set(storageKey, all);
    }
    return list;
  },

  // 生成评论列表 HTML
  renderList(comments, type, novelId, chapter) {
    if (!comments.length) {
      return `<div style="text-align:center;padding:1.5rem;color:var(--text-muted);font-size:0.85rem;">💭 暂无评论，来抢沙发吧！</div>`;
    }
    return comments.map(c => {
      const avatar = c.avatar || c.user.charAt(0);
      const isEmoji = c.avatar && c.avatar.length <= 2;
      const timeStr = Formatter.timeAgo ? Formatter.timeAgo(c.time) : c.time.slice(0, 10);
      return `
        <div class="comment-item" style="display:flex;gap:0.7rem;padding:0.7rem 0;border-bottom:1px solid rgba(0,0,0,0.04);">
          <div class="comment-avatar" style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--color-secondary),var(--color-primary-light));display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.85rem;font-weight:600;flex-shrink:0;">
            ${isEmoji ? avatar : avatar}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.2rem;">
              <span style="font-size:0.8rem;font-weight:600;color:var(--text-main);">${c.user}</span>
              <span style="font-size:0.7rem;color:var(--text-muted);">${timeStr}</span>
            </div>
            <div style="font-size:0.85rem;color:rgba(61,61,74,0.75);line-height:1.6;word-break:break-word;">${this.escapeHtml(c.content)}</div>
            <div style="margin-top:0.3rem;">
              <button class="comment-like-btn" onclick="Comments.handleLike(${novelId}, ${c.id}, ${type === 'chapter'}, ${chapter || 0})" style="background:none;border:none;color:var(--text-muted);font-size:0.75rem;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:0.2rem;padding:0.2rem 0.4rem;border-radius:8px;transition:all 0.2s;">
                <span>👍</span> <span>${c.likes || 0}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // 生成评论输入框 HTML
  renderInput(type, novelId, chapter) {
    const placeholder = type === 'chapter' ? '💬 发表本章说...' : '💬 发表作品评论...';
    const fn = type === 'chapter' ? `Comments.submitChapter(${novelId}, ${chapter || 0})` : `Comments.submitNovel(${novelId})`;
    return `
      <div class="comment-input-wrap" style="display:flex;gap:0.6rem;margin-top:0.5rem;padding:0.8rem;background:rgba(255,255,255,0.5);border-radius:12px;border:1px solid rgba(176,124,216,0.1);">
        <input type="text" id="commentInput_${type}_${novelId}_${chapter || 0}" placeholder="${placeholder}" style="flex:1;padding:0.5rem 0.8rem;border:1.5px solid rgba(176,124,216,0.15);border-radius:10px;background:rgba(255,255,255,0.6);font-family:inherit;font-size:0.85rem;color:var(--text-main);outline:none;transition:border-color 0.2s;" onkeydown="if(event.key==='Enter')${fn}">
        <button onclick="${fn}" style="padding:0.5rem 1.2rem;border:none;border-radius:10px;background:linear-gradient(135deg,var(--color-secondary),var(--color-primary-light));color:#fff;font-size:0.8rem;font-weight:500;cursor:pointer;font-family:inherit;transition:transform 0.2s;">发送</button>
      </div>
    `;
  },

  // 生成完整评论区域 HTML
  renderSection(type, novelId, chapter) {
    const comments = type === 'chapter'
      ? this.getChapterComments(novelId, chapter)
      : this.getNovelComments(novelId);
    const title = type === 'chapter' ? '💬 本章说' : '💬 作品评论';
    return `
      <div class="comment-section" style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid rgba(0,0,0,0.06);">
        <div style="font-size:1rem;font-weight:600;color:var(--text-main);margin-bottom:0.8rem;">${title} <span style="font-size:0.75rem;color:var(--text-muted);font-weight:400;">(${comments.length})</span></div>
        ${this.renderInput(type, novelId, chapter)}
        <div class="comment-list" id="commentList_${type}_${novelId}_${chapter || 0}" style="margin-top:0.5rem;">
          ${this.renderList(comments, type, novelId, chapter)}
        </div>
      </div>
    `;
  },

  // 提交作品评论
  submitNovel(novelId) {
    const input = document.getElementById(`commentInput_novel_${novelId}_0`);
    if (!input) return;
    const content = input.value.trim();
    if (!content) return showToast('请输入评论内容');
    if (content.length > 500) return showToast('评论最多500字');
    this.addNovelComment(novelId, content);
    input.value = '';
    showToast('💬 评论已发表');
    this.refreshList('novel', novelId, 0);
  },

  // 提交章节评论
  submitChapter(novelId, chapter) {
    const input = document.getElementById(`commentInput_chapter_${novelId}_${chapter}`);
    if (!input) return;
    const content = input.value.trim();
    if (!content) return showToast('请输入评论内容');
    if (content.length > 500) return showToast('评论最多500字');
    this.addChapterComment(novelId, chapter, content);
    input.value = '';
    showToast('💬 本章说已发表');
    this.refreshList('chapter', novelId, chapter);
  },

  // 刷新评论列表
  refreshList(type, novelId, chapter) {
    const listEl = document.getElementById(`commentList_${type}_${novelId}_${chapter || 0}`);
    if (!listEl) return;
    const comments = type === 'chapter'
      ? this.getChapterComments(novelId, chapter)
      : this.getNovelComments(novelId);
    listEl.innerHTML = this.renderList(comments, type, novelId, chapter);
  },

  // 处理点赞
  handleLike(novelId, commentId, isChapter, chapter) {
    this.likeComment(novelId, commentId, isChapter, chapter);
    showToast('👍 已点赞');
    this.refreshList(isChapter ? 'chapter' : 'novel', novelId, chapter);
  },

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};
