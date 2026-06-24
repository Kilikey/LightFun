/* ============================================================
   次元书屋 · 书单页面逻辑
   官方书单 + 用户自建书单
   ============================================================ */

(function() {
  // 初始化官方书单
  function initOfficialLists() {
    const saved = Storage.get('db_booklists');
    if (saved && saved.length > 0) return saved;

    const official = [
      {
        id: 'official_1',
        title: '🌟 异世界转生必看',
        desc: '从无名小卒到世界最强的逆袭之路，每部都是异世界题材的巅峰之作。',
        novels: [1, 3, 11, 10, 21, 24, 52, 53, 62, 72],
        type: 'official',
        createdAt: new Date().toISOString(),
        author: '次元书屋'
      },
      {
        id: 'official_2',
        title: '💕 校园恋爱经典',
        desc: '青春、恋爱、日常——那些让人心动的校园物语。',
        novels: [6, 7, 37, 38, 39, 40, 41, 42, 65, 74],
        type: 'official',
        createdAt: new Date().toISOString(),
        author: '次元书屋'
      },
      {
        id: 'official_3',
        title: '🚀 科幻神作',
        desc: '超越时空的想象，探索未来的边界。',
        novels: [2, 5, 8, 13, 66, 67, 68, 69, 70, 83],
        type: 'official',
        createdAt: new Date().toISOString(),
        author: '次元书屋'
      },
      {
        id: 'official_4',
        title: '⚔️ 战斗热血',
        desc: '剑与魔法、枪与机甲——为荣耀而战。',
        novels: [2, 4, 9, 12, 14, 21, 22, 53, 56, 57, 71],
        type: 'official',
        createdAt: new Date().toISOString(),
        author: '次元书屋'
      },
      {
        id: 'official_5',
        title: '🌙 黑暗悬疑',
        desc: '迷雾重重的世界，真相往往令人意想不到。',
        novels: [8, 17, 67, 68, 69, 70, 81, 87, 88],
        type: 'official',
        createdAt: new Date().toISOString(),
        author: '次元书屋'
      },
      {
        id: 'official_6',
        title: '🌸 治愈日常',
        desc: '温暖人心的故事，在平凡中发现美好。',
        novels: [14, 15, 16, 54, 73, 78, 89, 90],
        type: 'official',
        createdAt: new Date().toISOString(),
        author: '次元书屋'
      }
    ];
    Storage.set('db_booklists', official);
    return official;
  }

  // 获取所有书单
  function getAllLists() {
    return Storage.get('db_booklists') || initOfficialLists();
  }

  // 渲染书单卡片
  function renderBooklistCard(list) {
    const novels = list.novels.map(id => NOVELS.find(n => n.id === id)).filter(Boolean);
    const covers = novels.slice(0, 4).map(n => n.cover);
    const coverHtml = covers.length
      ? covers.map(c => `<img src="${c}" alt="" onerror="this.style.display='none'">`).join('')
      : '<div style="width:60px;height:80px;border-radius:6px;background:rgba(176,124,216,0.1);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">📚</div>';

    return `
      <div class="booklist-card a-b" onclick="openBooklistDetail('${list.id}')">
        <div class="cover-strip">${coverHtml}</div>
        <div class="bl-info">
          <div class="bl-title">${list.title}</div>
          <div class="bl-desc">${list.desc || ''}</div>
          <div class="bl-meta">
            <span>📖 ${novels.length} 部作品</span>
            <span class="bl-tag">${list.type === 'official' ? '🏅 官方' : '💼 我的'}</span>
          </div>
        </div>
      </div>
    `;
  }

  // 渲染书单列表
  function renderLists() {
    const all = getAllLists();
    const official = all.filter(l => l.type === 'official');
    const user = all.filter(l => l.type === 'user');

    document.getElementById('officialLists').innerHTML = official.map(renderBooklistCard).join('');

    const userEl = document.getElementById('userLists');
    const emptyEl = document.getElementById('emptyUserLists');
    if (user.length === 0) {
      userEl.innerHTML = '';
      emptyEl.style.display = 'block';
    } else {
      emptyEl.style.display = 'none';
      userEl.innerHTML = user.map(renderBooklistCard).join('');
    }
  }

  // 打开书单详情
  window.openBooklistDetail = function(id) {
    const all = getAllLists();
    const list = all.find(l => l.id === id);
    if (!list) return;

    const novels = list.novels.map(nid => NOVELS.find(n => n.id === nid)).filter(Boolean);
    const el = document.getElementById('modalBody');
    el.innerHTML = `
      <div style="flex:1;">
        <h2 style="font-size:1.4rem;font-weight:600;margin-bottom:0.3rem;">${list.title}</h2>
        <div style="font-size:0.85rem;color:rgba(61,61,74,0.4);margin-bottom:0.8rem;">${list.author} · 📖 ${novels.length} 部作品</div>
        <div style="font-size:0.9rem;color:rgba(61,61,74,0.6);line-height:1.7;margin-bottom:1rem;">${list.desc || ''}</div>
        <div class="bl-detail-novels">
          ${novels.map(n => `
            <div class="novel-item" onclick="window.location.href='reader.html?id=${n.id}&ch=1'">
              <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
              <div class="title">${n.title}</div>
            </div>
          `).join('')}
        </div>
        ${list.type === 'user' ? `
          <div style="margin-top:1.5rem;text-align:center;">
            <button onclick="deleteBooklist('${list.id}')" style="padding:0.5rem 1.5rem;border-radius:100px;border:1.5px solid rgba(244,67,54,0.3);background:rgba(244,67,54,0.05);color:#f44336;font-size:0.85rem;font-family:inherit;cursor:pointer;transition:all 0.2s;">🗑️ 删除书单</button>
          </div>
        ` : ''}
      </div>
    `;
    document.getElementById('modal').classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  // 打开创建书单模态框
  window.openCreateModal = function() {
    const el = document.getElementById('modalBody');
    el.innerHTML = `
      <div style="flex:1;">
        <h2 style="font-size:1.4rem;font-weight:600;margin-bottom:1rem;">➕ 创建书单</h2>
        <div class="create-form">
          <div>
            <label>书单名称</label>
            <input type="text" id="createTitle" placeholder="给你的书单起个名字" maxlength="30">
          </div>
          <div>
            <label>书单描述</label>
            <textarea id="createDesc" placeholder="简单描述一下这个书单..." maxlength="200"></textarea>
          </div>
          <div>
            <label>选择作品（可多选）</label>
            <div class="novel-select-list" id="novelSelectList"></div>
          </div>
          <div style="text-align:center;margin-top:1rem;">
            <button onclick="submitCreateBooklist()" style="padding:0.6rem 2rem;border-radius:100px;border:none;background:linear-gradient(135deg,var(--color-secondary),var(--color-primary-light));color:#fff;font-size:0.9rem;font-weight:500;font-family:inherit;cursor:pointer;transition:all 0.2s;">✅ 创建</button>
          </div>
        </div>
      </div>
    `;

    // 渲染小说选择列表
    const selectList = document.getElementById('novelSelectList');
    selectList.innerHTML = NOVELS.map(n => `
      <div class="novel-select-item" data-id="${n.id}" onclick="toggleSelectNovel(this, ${n.id})">
        <img src="${n.cover}" alt="${n.title}" onerror="this.style.display='none'">
        <div class="title">${n.title}</div>
      </div>
    `).join('');

    document.getElementById('modal').classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  // 切换小说选择
  let selectedNovels = new Set();
  window.toggleSelectNovel = function(el, id) {
    if (selectedNovels.has(id)) {
      selectedNovels.delete(id);
      el.classList.remove('selected');
    } else {
      selectedNovels.add(id);
      el.classList.add('selected');
    }
  };

  // 提交创建书单
  window.submitCreateBooklist = function() {
    const title = document.getElementById('createTitle').value.trim();
    const desc = document.getElementById('createDesc').value.trim();
    if (!title) return showToast('请输入书单名称');
    if (selectedNovels.size === 0) return showToast('请至少选择一部作品');

    const user = State.get('user') || { name: '张三' };
    const all = getAllLists();
    all.push({
      id: 'user_' + Date.now(),
      title,
      desc,
      novels: Array.from(selectedNovels),
      type: 'user',
      createdAt: new Date().toISOString(),
      author: user.name
    });
    Storage.set('db_booklists', all);
    selectedNovels.clear();
    showToast('📚 书单创建成功');
    closeModal();
    renderLists();
  };

  // 删除书单
  window.deleteBooklist = function(id) {
    if (!confirm('确定要删除这个书单吗？')) return;
    const all = getAllLists().filter(l => l.id !== id);
    Storage.set('db_booklists', all);
    showToast('🗑️ 书单已删除');
    closeModal();
    renderLists();
  };

  // 关闭模态框
  window.closeModal = function() {
    document.getElementById('modal').classList.remove('show');
    document.body.style.overflow = '';
  };

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

  // 事件绑定
  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // 初始化
  renderLists();
  initAnimations();
})();
