# 📋 文件修改记录 · 轻小说文库项目

> 项目路径：`D:\PythonFile\HTML\test for first html\`  
> 修改日期：2026-06-15  
> 最后更新：2026-06-16

---

## 更新记录

### 2026-06-16 — 批量功能开发（v1.0.0 → v1.1.0）

本次对话完成 5 个核心模块，从 v1.0.0 升级至 **v1.1.0**。

| 任务 | 状态 | 文件 |
|------|------|------|
| P0 拆分 library.html | ✅ | `library.css` + `library.js` + 重构 `library.html` |
| P1 阅读器页面 | ✅ | `reader.html` + `reader.css` + `reader.js` |
| P2 书架功能 | ✅ | `bookshelf.html` + `bookshelf.css` + `bookshelf.js` |
| P3 注册页 | ✅ | `register.html` |
| P4 个人中心 + 评分 | ✅ | `user.html` + `user.css` + `user.js` + 评分系统 |

---

### 一、删除文件

**`pages/Home.html` — 三体介绍页**
- 原因：与轻小说项目定位不符
- 影响：无，无其他页面引用

---

### 二、P0 — 拆分 library.html 内联代码

| 操作 | 原位置 | 新位置 | 内容 |
|------|--------|--------|------|
| 提取 CSS | `library.html` `<style>` 标签（325行） | `assets/css/pages/library.css` | 轮播、网格、排行、更新、标签、模态框、响应式 |
| 提取 JS | `library.html` `<script>` 标签（283行） | `assets/js/pages/library.js` | 数据、轮播、渲染、搜索、模态框、书架入口 |
| 重构 HTML | `library.html` 内联混合 | `library.html` 纯结构 | 引用外链 CSS + JS，新增导航链接（书架、我的） |
| 新增功能 | — | `library.js` | `startReading()` 跳转阅读器、`addToBookshelf()` 加入书架、交互式 5 星评分 |

---

### 三、P1 — 阅读器页面 `pages/reader.html`

**页面**：`reader.html` + `reader.css` + `reader.js`

**功能模块**：
| 模块 | 说明 |
|------|------|
| 📖 章节内容 | 占位生成中文段落，含分割线 |
| 📑 章节目录 | 左侧抽屉，高亮当前章节，显示已读标记 |
| ⚙️ 阅读设置 | 字体大小（14-28px）、行间距（1.2-2.5）、背景主题（浅色/羊皮纸/夜间/护眼）、翻页方式（滚动/分页） |
| ←→ 翻页导航 | 上一章/下一章按钮、点击左右边缘、键盘方向键、触摸滑动 |
| 📊 进度条 | 底部滚动进度百分比，实时更新 |
| 🔖 进度保存 | `readProgress` LocalStorage 记录已读章节 |
| 📚 阅读历史 | `readHistory` LocalStorage 记录最近阅读 |
| ⬆️ 返回顶部 | 滚动超400px显示 |

**技术实现**：
- `URLSearchParams` 获取 `?id=1&ch=1`
- 阅读设置持久化到 `readerSettings` LocalStorage
- 进度/历史通过 `Storage` 工具封装读写
- 主题切换通过 `data-theme` attribute 驱动 CSS 变量

---

### 四、P2 — 书架页面 `pages/bookshelf.html`

**页面**：`bookshelf.html` + `bookshelf.css` + `bookshelf.js`

**功能模块**：
| 模块 | 说明 |
|------|------|
| 📖 继续阅读 | 顶部卡片展示最近阅读的小说，一键跳转上次章节 |
| 📚 书架网格 | 展示收藏的小说，带阅读进度条（已读章节/总章节） |
| 🗑️ 移除 | 每本书架卡片可移除 |
| 🚪 空状态 | 书架为空时引导去文库 |

**数据流**：
- 书架 ID 列表：`Storage.get('bookshelf')`
- 阅读进度：`Storage.get('readProgress')`
- 阅读历史：`Storage.get('readHistory')`

---

### 五、P3 — 注册页 `register.html`

**位置**：根目录 `register.html`（与 `index.html` 同级）

**功能**：
| 项目 | 说明 |
|------|------|
| 🎨 风格 | 与登录页统一毛玻璃 + 粉紫渐变 |
| 🔐 表单 | 用户名、密码、确认密码 |
| ✅ 验证 | 用户名≥2字符、密码≥6位、两次一致 |
| 💾 存储 | 注册信息写入 `localStorage.db_users` |
| 🔗 跳转 | 注册成功 → 跳转 `index.html` 登录 |

---

### 六、P4 — 个人中心 + 评分系统

**页面**：`user.html` + `user.css` + `user.js`

**功能模块**：
| 模块 | 说明 |
|------|------|
| 👤 用户卡片 | 头像、昵称、签名 |
| 📊 统计面板 | 已读作品、已读章节、书架收藏、已评分（4项） |
| 📖 阅读历史 | 最近10条阅读记录，点击跳转阅读器 |
| ⭐ 我的评分 | 展示已评分的小说列表，显示星级和分数 |
| ⚙️ 阅读偏好 | 显示当前字体大小、行间距、主题、翻页方式，快捷入口到阅读器 |
| 🗑️ 清空历史 | 确认对话框后清空 `readHistory` + `readProgress` |

**评分系统**（嵌入 `library.js` 模态框）：
| 项目 | 说明 |
|------|------|
| 位置 | 作品详情模态框中"我的评分"区域 |
| 交互 | 鼠标悬停预览星级，点击确定评分（1-5星） |
| 存储 | `Storage.set('ratings', { 1: 5, 2: 4, ... })` |
| 展示 | `user.html` 评分列表中显示星级和分数 |

---

## 七、文件结构总览（v1.1.0）

```
D:\PythonFile\HTML\test for first html\
├── index.html              ← 登录入口（张三/123456）
├── register.html           ← 注册页
├── Plan.md                 ← 项目总规划
├── memory.md               ← 工作记忆库
├── style.css               ← 旧版废弃样式
│
├── pages/
│   ├── library.html        ← 文库首页（外链架构）
│   ├── reader.html         ← 阅读器
│   ├── bookshelf.html      ← 我的书架
│   └── user.html           ← 个人中心
│
├── assets/
│   ├── css/
│   │   ├── base.css        ← 基础样式系统
│   │   ├── layout.css      ← 导航栏、页脚、布局骨架
│   │   └── pages/
│   │       ├── library.css ← 文库首页样式
│   │       ├── reader.css  ← 阅读器样式
│   │       ├── bookshelf.css ← 书架样式
│   │       └── user.css    ← 个人中心样式
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── state.js    ← 全局状态管理
│   │   │   └── api.js      ← 数据请求层
│   │   ├── components/
│   │   │   └── toast.js    ← Toast 提示组件
│   │   ├── utils/
│   │   │   ├── storage.js  ← LocalStorage 封装
│   │   │   ├── formatter.js ← 格式化工具（星星、日期等）
│   │   │   └── dom.js      ← DOM 操作工具
│   │   └── pages/
│   │       ├── library.js  ← 文库首页逻辑（含评分）
│   │       ├── reader.js   ← 阅读器逻辑
│   │       ├── bookshelf.js ← 书架逻辑
│   │       └── user.js     ← 个人中心逻辑
│   │
│   ├── data/
│   │   └── novels.json     ← 20部轻小说数据
│   └── images/
│       ├── covers/
│       │   └── 01.jpg ~ 20.jpg
│       └── IMG_20260409_223616.jpg
│
├── docs/
│   └── CHANGELOG.md        ← 本修改记录
│
└── .git/                     ← Git 仓库
```

## 八、LocalStorage 数据键说明

| 键 | 说明 | 类型 |
|----|------|------|
| `user` | 当前登录用户 | Object `{ name, avatar }` |
| `db_users` | 注册用户列表 | Array `[{ name, pass, createdAt }]` |
| `bookshelf` | 书架收藏的小说 ID | Array `[1, 2, 3]` |
| `readProgress` | 各小说已读章节 | Object `{ "1": [1,2,3], "2": [1] }` |
| `readHistory` | 阅读历史记录 | Array `[{ id, chapter, title, time }]` |
| `ratings` | 用户评分 | Object `{ "1": 5, "2": 4 }` |
| `readerSettings` | 阅读器偏好设置 | Object `{ fontSize, lineHeight, theme, scrollMode }` |

---

## 九、页面导航关系

```
index.html ──登录──→ library.html
  ↑                      │
register.html            ├──点击作品→ reader.html?id=X
  │                      │            │
  └──注册成功跳转        ├──书架      ├──上一章/下一章
                         │   ↓        ├──章节目录
                         ├──bookshelf.html ├──阅读设置
                         │   │            │
                         ├──user.html     ├──进度保存
                             │            └──返回 library
                             ├──继续阅读
                             ├──阅读历史
                             └──我的评分
```
