/* ============================================================
   次元书屋 · 更新日历逻辑
   将连载中的轻小说按周分配，展示每日更新
   ============================================================ */

(function() {
  const DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const DAY_EMOJIS = ['🌙', '🔥', '⭐', '💧', '⚡', '🌸', '🌞'];

  // 获取今天是星期几 (0=周日, 1=周一...)
  const todayIdx = new Date().getDay();

  // 把连载中的小说分配到7天
  function assignUpdates() {
    const updates = DAYS.map(() => []);

    NOVELS.forEach(n => {
      // 只显示连载中且不是长期休刊的小说
      if (n.status !== 'ongoing') return;
      if (n.update === '长期休刊') return;
      if (n.update === '完结') return;

      // 使用 id 稳定哈希到星期几
      const dayIndex = ((n.id * 13 + n.title.length * 3) % 7);
      updates[dayIndex].push(n);
    });

    // 每天按 rank 排序
    updates.forEach(day => day.sort((a, b) => a.rank - b.rank));

    return updates;
  }

  function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const updates = assignUpdates();

    let totalUpdates = 0;
    let todayUpdates = 0;

    DAYS.forEach((dayName, i) => {
      const dayList = updates[i];
      totalUpdates += dayList.length;
      if (i === todayIdx) todayUpdates = dayList.length;

      const card = document.createElement('div');
      card.className = 'day-card' + (i === todayIdx ? ' today' : '');

      const isRest = dayList.length === 0;
      const badgeClass = isRest ? 'day-badge rest' : 'day-badge';
      const badgeText = isRest ? '休刊' : `${dayList.length}部`;

      let listHtml = '';
      if (dayList.length === 0) {
        listHtml = `<div class="empty-day">🍵 暂无更新</div>`;
      } else {
        listHtml = `<div class="day-updates">` +
          dayList.slice(0, 8).map(n => `
            <a class="update-item a-r" href="reader.html?id=${n.id}&ch=${n.chapters}">
              <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
              <div class="update-info">
                <div class="title">${n.title}</div>
                <div class="chapter">${n.updateCh || '最新章'}</div>
                <div class="time">${n.update || '近期更新'}</div>
              </div>
            </a>
          `).join('') +
          (dayList.length > 8 ? `<div style="text-align:center;font-size:0.75rem;color:var(--text-muted);margin-top:0.3rem;">+${dayList.length - 8} 部</div>` : '') +
          `</div>`;
      }

      card.innerHTML = `
        <div class="day-title">
          <span>${DAY_EMOJIS[i]}</span>
          <span>${dayName}</span>
          <span class="${badgeClass}">${badgeText}</span>
        </div>
        ${listHtml}
      `;

      grid.appendChild(card);
    });

    // 更新统计
    const ongoingCount = NOVELS.filter(n => n.status === 'ongoing' && n.update !== '长期休刊').length;
    document.getElementById('statTotal').textContent = totalUpdates;
    document.getElementById('statOngoing').textContent = ongoingCount;
    document.getElementById('statToday').textContent = todayUpdates;
  }

  // 初始化动画
  function initAnimations() {
    const els = document.querySelectorAll('.a-t, .a-b, .a-l, .a-r');
    if (els.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('a-visible');
        });
      }, { threshold: 0.1 });
      els.forEach(el => observer.observe(el));
    }
  }

  renderCalendar();
  initAnimations();
})();
