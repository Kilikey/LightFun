/* ============================================================
   次元书屋 · 全局用户头像/昵称初始化 (user-init.js)
   作用：页面加载时自动渲染导航栏头像/昵称，绑定编辑弹窗
   ============================================================ */

(function() {
  const PRESET_AVATARS = [
    '🌸', '🎀', '✨', '🌙', '📖', '🐱', '🦊', '🐰', '🐻', '🐼',
    '🐨', '🐯', '🦁', '🐺', '🐧', '🐦', '🦉', '🦋', '🌹', '🍀',
    '🍁', '❄️', '🔥', '💧', '⚡', '💎', '⭐', '🌈', '🎵', '🎨',
  ];

  const BG_COLORS = [
    '#b07cd8', '#f5a0b8', '#e86a92', '#6ab0e8', '#4caf50',
    '#ff9800', '#9c27b0', '#3f51b5', '#009688', '#795548',
  ];

  function getUser() {
    return State.get('user') || { name: '张三', avatar: null };
  }

  function saveUser(user) {
    State.set('user', user);
  }

  function getInitial(name) {
    return name ? name.charAt(0) : '?';
  }

  function renderNavUser() {
    document.querySelectorAll('.nav-user').forEach(el => {
      const user = getUser();
      const hasAvatar = user.avatar && user.avatar.startsWith('data:image');
      const isPreset = user.avatar && !user.avatar.startsWith('data:image') && user.avatar.length <= 4;

      el.style.cursor = 'pointer';
      el.title = '点击修改头像和昵称';
      el.innerHTML = '';

      const avatarWrap = document.createElement('span');
      avatarWrap.className = 'avatar';
      if (hasAvatar) {
        avatarWrap.style.background = 'transparent';
        avatarWrap.style.overflow = 'hidden';
        avatarWrap.innerHTML = `<img src="${user.avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
      } else if (isPreset) {
        avatarWrap.style.background = BG_COLORS[user.name.length % BG_COLORS.length];
        avatarWrap.textContent = user.avatar;
        avatarWrap.style.fontSize = '1rem';
      } else {
        avatarWrap.textContent = getInitial(user.name);
      }
      el.appendChild(avatarWrap);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = user.name;
      el.appendChild(nameSpan);

      el.onclick = openEditModal;
    });

    // 用户页面的大头像也同步更新
    document.querySelectorAll('.user-avatar').forEach(el => {
      const user = getUser();
      const hasAvatar = user.avatar && user.avatar.startsWith('data:image');
      const isPreset = user.avatar && !user.avatar.startsWith('data:image') && user.avatar.length <= 4;

      if (hasAvatar) {
        el.style.background = 'transparent';
        el.innerHTML = `<img src="${user.avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
      } else if (isPreset) {
        el.style.background = BG_COLORS[user.name.length % BG_COLORS.length];
        el.textContent = user.avatar;
        el.style.fontSize = '2.5rem';
      } else {
        el.style.background = 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))';
        el.textContent = getInitial(user.name);
        el.style.fontSize = '2.5rem';
      }
    });

    // 用户页面的昵称也同步
    document.querySelectorAll('.user-info h2').forEach(el => {
      const user = getUser();
      el.textContent = user.name;
    });
  }

  function openEditModal() {
    let modal = document.getElementById('userEditModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'userEditModal';
      modal.className = 'user-edit-modal';
      modal.innerHTML = `
        <div class="user-edit-overlay" onclick="closeUserEditModal()"></div>
        <div class="user-edit-panel">
          <div class="user-edit-header">
            <h3>👤 修改头像和昵称</h3>
            <button class="user-edit-close" onclick="closeUserEditModal()">✕</button>
          </div>
          <div class="user-edit-body">
            <div class="edit-field">
              <label>昵称</label>
              <input type="text" id="editNickname" maxlength="12" placeholder="输入昵称">
            </div>
            <div class="edit-field">
              <label>头像</label>
              <div class="avatar-preview-wrap">
                <div class="avatar-preview" id="avatarPreview"></div>
              </div>
              <div class="preset-avatars" id="presetAvatars"></div>
              <div class="avatar-upload">
                <input type="file" id="avatarFileInput" accept="image/*" style="display:none">
                <button class="upload-btn" onclick="document.getElementById('avatarFileInput').click()">
                  📤 上传本地图片
                </button>
              </div>
            </div>
          </div>
          <div class="user-edit-footer">
            <button class="btn-secondary" onclick="closeUserEditModal()">取消</button>
            <button class="btn-primary" onclick="saveUserEdit()">保存</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // 文件上传监听
      document.getElementById('avatarFileInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
          showToast('请选择图片文件');
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          showToast('图片大小不能超过 2MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = function(ev) {
          tempAvatar = ev.target.result;
          updatePreview();
        };
        reader.readAsDataURL(file);
      });
    }

    const user = getUser();
    document.getElementById('editNickname').value = user.name;
    tempAvatar = user.avatar;
    renderPresetAvatars();
    updatePreview();
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
  }

  let tempAvatar = null;

  function renderPresetAvatars() {
    const el = document.getElementById('presetAvatars');
    el.innerHTML = PRESET_AVATARS.map(a => `
      <span class="preset-avatar ${tempAvatar === a ? 'selected' : ''}"
            onclick="selectPresetAvatar('${a}')"
            style="background:${BG_COLORS[a.charCodeAt(0) % BG_COLORS.length]}">${a}</span>
    `).join('') + `
      <span class="preset-avatar ${!tempAvatar || tempAvatar.startsWith('data:image') ? 'selected' : ''}"
            onclick="selectPresetAvatar(null)"
            style="background:linear-gradient(135deg, var(--color-secondary), var(--color-primary));font-size:0.75rem;">文字</span>
    `;
  }

  function updatePreview() {
    const user = getUser();
    const name = document.getElementById('editNickname').value || user.name;
    const preview = document.getElementById('avatarPreview');
    const hasAvatar = tempAvatar && tempAvatar.startsWith('data:image');
    const isPreset = tempAvatar && !tempAvatar.startsWith('data:image') && tempAvatar.length <= 4;

    if (hasAvatar) {
      preview.style.background = 'transparent';
      preview.innerHTML = `<img src="${tempAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    } else if (isPreset) {
      preview.style.background = BG_COLORS[name.length % BG_COLORS.length];
      preview.innerHTML = '';
      preview.textContent = tempAvatar;
      preview.style.fontSize = '2.5rem';
    } else {
      preview.style.background = 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))';
      preview.innerHTML = '';
      preview.textContent = getInitial(name);
      preview.style.fontSize = '2.5rem';
    }
  }

  // 暴露到全局
  window.selectPresetAvatar = function(avatar) {
    tempAvatar = avatar;
    renderPresetAvatars();
    updatePreview();
  };

  window.closeUserEditModal = function() {
    const modal = document.getElementById('userEditModal');
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
  };

  window.saveUserEdit = function() {
    const name = document.getElementById('editNickname').value.trim();
    if (!name) {
      showToast('昵称不能为空');
      return;
    }
    saveUser({ name: name, avatar: tempAvatar });
    renderNavUser();
    closeUserEditModal();
    showToast('✅ 已保存');
  };

  // 昵称输入实时更新预览
  document.addEventListener('input', function(e) {
    if (e.target.id === 'editNickname') {
      updatePreview();
    }
  });

  // 初始化
  renderNavUser();

  // 监听 State 变化，实时更新
  State.on('user', function() {
    renderNavUser();
  });
})();

/* ============================================================
   跨页面搜索跳转 (handleNavSearch)
   ============================================================ */
window.handleNavSearch = function(event) {
  if (event.key === 'Enter') {
    const query = event.target.value.trim();
    if (query) {
      window.location.href = './library.html?q=' + encodeURIComponent(query);
    }
  }
};
