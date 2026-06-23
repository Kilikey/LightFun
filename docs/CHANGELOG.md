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

---

## 十、v1.1.0 → v1.5.0 批量优化与新功能（2026-06-16 ~ 2026-06-23）

从 v1.1.0 到 v1.5.0 期间，完成了大量细节优化、3个核心新页面、数据重构与扩展。

### 新增页面

| 页面 | 文件 | 说明 |
|------|------|------|
| 排行榜 | `pages/ranking.html` + `ranking.css` + `ranking.js` | 5大榜单（综合/热门/新作/完结/高分）+ 历年「这本轻小说真厉害」2015-2026，用户评分覆盖静态分数 |
| 更新日历 | `pages/update-calendar.html` + `update-calendar.js` | 一周七天日历视图，连载中轻小说按稳定哈希分配更新时间，今日高亮，统计条（本周更新/连载中/今日更新） |

### 数据重构与扩展

| 任务 | 内容 |
|------|------|
| 数据扩展至100部 | `novels.json` 新增50部经典轻小说（id 51-100），涵盖约会大作战、Overlord、Fate系列、科学超电磁炮、龙与虎、空之境界、全职高手等 |
| 公共数据提取 | 创建 `assets/js/data/novels.js`，所有页面（library/ranking/bookshelf/user）统一引用，移除 library.js 和 ranking.js 中的硬编码 NOVELS 数组 |
| 封面路径调整 | novels.js 中 cover 路径统一为 `../covers/XX.jpg`，与页面相对路径一致 |

### 文库筛选器（library.html + library.js + library.css）

| 维度 | 选项 |
|------|------|
| 状态 | 全部 / 连载中 / 已完结 |
| 评分 | 全部 / 9.0+ / 8.0+ / 7.0+ |
| 排序 | 默认 / 评分 / 更新 / 章节数 |
| 标签 | Top 20 热门标签，支持多选交集筛选 |

- 筛选与搜索关键词可叠加过滤，实时更新结果
- 新增 `filter-bar` / `filter-row` / `filter-btn` / `tag-chip` 样式

### 33+ 项细节优化（归纳）

**阅读器体验**
- 8种风格化章节内容生成（根据标签自动匹配：异世界/科幻/校园/奇幻/悬疑/战斗/日常/恋爱）
- 章节目录显示「阅读进度」头部统计
- 自动滚动到当前章节
- 95%滚动自动标记已读
- 阅读时间估算（基于字数）
- 读完最后一章显示「已读完」提示
- 字体选择（Noto Sans SC / 思源宋体 / 霞鹜文楷）
- 分页模式下禁止目录抽屉
- 动态页面标题（📖 小说名 · 次元书屋）

**全局交互**
- 导航栏统一搜索框（所有页面支持跨页搜索，自动跳转文库）
- 用户头像/昵称全局渲染（`user-init.js`），所有页面一致
- 编辑头像昵称模态框（30个预设emoji + 图片上传）
- 登录页与注册页联动（登录→「还没有账号？去注册」，注册→「已有账号？去登录」）
- 页面入场动画系统（a-t/a-b/a-l/a-r/a-zb + IntersectionObserver）

**UI/UX**
- Favicon 动态注入（不同页面不同emoji）
- 自定义滚动条（毛玻璃风格）
- 标签云集（Tags 云大小按频次分布）
- 搜索面板（建议/历史/热门搜索）
- 阅读器设置面板毛玻璃优化

**数据与逻辑**
- 书架同步（加入书架时自动保存阅读进度）
- 评分影响排行榜（公式：displayScore = userRating ? 6.5 + rating×0.7 : staticScore）
- 排名页「我的评分」单独标签页
- 阅读进度恢复（打开阅读器自动跳到上次章节）
- 历史记录保存带小说标题

### 文件结构变更（v1.5.0）

```
D:\PythonFile\HTML\test for first html\
├── index.html                  ← 登录入口
├── register.html               ← 注册页（与登录联动）
├── Plan.md                     ← 项目总规划（爬虫数据获取方案）
├── memory.md                   ← 工作记忆库（本文件）
│
├── pages/
│   ├── library.html            ← 文库首页（含筛选器）
│   ├── reader.html             ← 阅读器（8种风格章节）
│   ├── bookshelf.html          ← 我的书架
│   ├── user.html               ← 个人中心（编辑头像昵称）
│   ├── ranking.html            ← 排行榜（5大榜单+历年）
│   └── update-calendar.html    ← 更新日历
│
├── assets/
│   ├── css/
│   │   ├── base.css            ← 基础样式 + 动画
│   │   ├── layout.css          ← 导航栏、页脚、布局
│   │   └── pages/
│   │       ├── library.css     ← 文库（含筛选器样式）
│   │       ├── reader.css      ← 阅读器
│   │       ├── bookshelf.css   ← 书架
│   │       ├── user.css        ← 个人中心
│   │       └── ranking.css     ← 排行榜
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── state.js        ← 全局状态管理（订阅/发布）
│   │   │   └── api.js          ← 数据请求层
│   │   ├── components/
│   │   │   ├── toast.js        ← Toast 提示
│   │   │   └── user-init.js    ← 全局用户组件（头像/昵称/编辑）
│   │   ├── utils/
│   │   │   ├── storage.js      ← LocalStorage 封装
│   │   │   ├── formatter.js    ← 格式化工具
│   │   │   └── dom.js          ← DOM 操作
│   │   ├── data/
│   │   │   └── novels.js       ← 100部公共数据（所有页面共享）
│   │   └── pages/
│   │       ├── library.js      ← 文库（筛选器+搜索+评分）
│   │       ├── reader.js       ← 阅读器（8种风格+设置）
│   │       ├── bookshelf.js    ← 书架
│   │       ├── user.js         ← 个人中心
│   │       ├── ranking.js      ← 排行榜
│   │       └── update-calendar.js ← 更新日历
│   │
│   ├── data/
│   │   └── novels.json         ← 100部轻小说 JSON 数据
│   └── covers/
│       └── 01.jpg ~ 100.jpg    ← 封面图
│
├── docs/
│   └── CHANGELOG.md            ← 本修改记录
│
└── .git/                       ← Git 仓库，v1.5.0 已推送
```

### LocalStorage 数据键（v1.5.0）

| 键 | 说明 | 类型 |
|----|------|------|
| `user` | 当前登录用户 | Object `{ name, avatar }` |
| `db_users` | 注册用户列表 | Array `[{ name, pass, createdAt }]` |
| `bookshelf` | 书架收藏的小说 ID | Array `[1, 2, 3]` |
| `readProgress` | 各小说已读章节 | Object `{ "1": [1,2,3], "2": [1] }` |
| `readHistory` | 阅读历史记录 | Array `[{ id, chapter, title, time }]` |
| `ratings` | 用户评分 | Object `{ "1": 5, "2": 4 }` |
| `readerSettings` | 阅读器偏好设置 | Object `{ fontSize, lineHeight, theme, fontFamily, scrollMode }` |
| `searchHistory` | 搜索历史 | Array `['关键词1', '关键词2']` |
| `app_state` | 全局应用状态 | Object（State.data 序列化） |
