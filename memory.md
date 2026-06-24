# 🧠 Memory · 次元书屋项目记忆库

> 作用：每次新对话开启时，Kimi 必须**首先阅读此文件**，确保工作连续性。  
> 更新规则：每次重大修改后，由 Kimi 或用户更新此文件。  
> 位置：`D:\PythonFile\HTML\test for first html\memory.md`  
> 最后更新：2026-06-23

> **v1.5 社区功能已完成：评论系统 + 书单/专题 + 更新日历 + 排行榜**

---

## 📋 工作原则（必须遵守）

1. **每次对项目的修改需记录在 CHANGELOG 日志中**  
   → `docs/CHANGELOG.md` 或根目录 `CHANGELOG.md`，记录时间、内容、影响范围。

2. **按 Plan 实施，除非用户明确修改**  
   → `Plan.md` 是项目总路线图，包含功能规划、版本路线图、文件架构。未经用户同意，不偏离计划。

3. **每次新对话，Kimi 先阅读并接管 Memory**  
   → 这是本文件。新对话开启时，首先 `Read` 此文件，了解项目当前状态和待办事项。

4. **GitHub 学习知识写入 Obsidian**  
   → `D:\Backup\Documents\Obsidian Vault\github学习.md`，持续补充 GitHub 相关经验。

---

## 🎯 项目基本信息

| 项目 | 内容 |
|------|------|
| **项目名称** | LightFun（次元书屋） |
| **仓库** | `https://github.com/Kilikey/LightFun` |
| **当前版本** | `v1.5.0` |
| **技术栈** | HTML + CSS + JavaScript（纯前端，渐进式架构） |
| **开发周期** | 1个月+ |
| **目标** | 对标 wenku8/真白萌的轻小说在线阅读平台 |

---

## 📂 关键文件位置

| 文件 | 路径 | 说明 |
|------|------|------|
| **记忆文件** | `memory.md` | 本文件，工作连续性核心 |
| **项目总规划** | `Plan.md` | 功能规划、路线图、架构设计 |
| **修改日志** | `docs/CHANGELOG.md` | 所有修改记录 |
| **登录入口** | `index.html` | 用户登录页（张三/123456） |
| **注册页** | `register.html` | 新用户注册，与登录页联动 |
| **文库首页** | `pages/library.html` | 核心页面，100部轻小说展示，含筛选器 |
| **阅读器** | `pages/reader.html` | 章节阅读、设置、进度、目录 |
| **书架** | `pages/bookshelf.html` | 收藏管理、继续阅读、阅读进度条 |
| **个人中心** | `pages/user.html` | 阅读历史、评分、统计、编辑头像昵称 |
| **排行榜** | `pages/ranking.html` | 5大榜单 + 历年「这本轻小说真厉害」 |
| **更新日历** | `pages/update-calendar.html` | 一周七天日历，展示连载更新分配 |
| **书单/专题** | `pages/booklists.html` | 官方书单 + 用户自建书单 |
| **公共数据** | `assets/js/data/novels.js` | 100部轻小说数据（所有页面共享） |
| **数据文件** | `assets/data/novels.json` | JSON 格式数据，100部轻小说 |
| **基础样式** | `assets/css/base.css` | CSS变量、重置、浮动装饰、入场动画 |
| **布局骨架** | `assets/css/layout.css` | 导航栏、页脚、section布局 |
| **文库样式** | `assets/css/pages/library.css` | 轮播、网格、模态框、筛选器、排行等 |
| **阅读器样式** | `assets/css/pages/reader.css` | 工具栏、目录、设置、阅读区 |
| **书架样式** | `assets/css/pages/bookshelf.css` | 书架网格、继续阅读、空状态 |
| **用户样式** | `assets/css/pages/user.css` | 用户卡片、统计、历史、评分 |
| **全局状态** | `assets/js/core/state.js` | LocalStorage状态管理，支持订阅/发布 |
| **用户组件** | `assets/js/components/user-init.js` | 全局用户头像/昵称渲染 + 编辑模态框 |
| **评论组件** | `assets/js/components/comments.js` | 作品评论 + 章节评论（本章说） |
| **数据请求** | `assets/js/core/api.js` | 数据层（当前fetch JSON） |
| **工具函数** | `assets/js/utils/` | storage、formatter、dom、validator |
| **组件** | `assets/js/components/` | toast、modal等 |
| **文库逻辑** | `assets/js/pages/library.js` | 轮播、搜索、筛选器、模态框、评分 |
| **阅读器逻辑** | `assets/js/pages/reader.js` | 章节、设置、进度、目录、8种风格生成 |
| **书架逻辑** | `assets/js/pages/bookshelf.js` | 书架渲染、移除、继续阅读 |
| **用户逻辑** | `assets/js/pages/user.js` | 统计、历史、评分、偏好 |
| **排行榜逻辑** | `assets/js/pages/ranking.js` | 5大榜单、历年榜单、用户评分覆盖 |
| **更新日历逻辑** | `assets/js/pages/update-calendar.js` | 日历渲染、更新分配、统计条 |
| **书单逻辑** | `assets/js/pages/booklists.js` | 官方书单、用户创建、书单详情 |
| **GitHub学习** | `D:\Backup\Documents\Obsidian Vault\github学习.md` | 推送经验、命令速查 |

---

## 📊 当前项目状态（v1.5.0）

### 已完成
- [x] 登录页（index.html）— 毛玻璃风格，张三/123456
- [x] 注册页（register.html）— 与登录页统一风格，联动跳转（登录→注册，注册→登录）
- [x] 文库首页（library.html）— 轮播、更新、排行、新书、标签、搜索、模态框、**筛选器（状态/评分/排序/标签）**
- [x] 阅读器（reader.html）— 章节目录、字体/背景/行间距调节、分页/滚动、阅读进度、键盘/触摸翻页、**8种风格章节生成**
- [x] 书架（bookshelf.html）— 继续阅读、书架网格、阅读进度条、移除功能
- [x] 个人中心（user.html）— 阅读统计、阅读历史、评分记录、阅读偏好、**编辑头像昵称（30个预设emoji+图片上传）**
- [x] 排行榜（ranking.html）— 5大榜单 + 历年「这本轻小说真厉害」2015-2026，用户评分覆盖静态分数
- [x] 更新日历（update-calendar.html）— 一周七天日历，连载中轻小说按哈希分配更新时间
- [x] **评论系统** — 作品评论（library模态框）+ 章节评论/本章说（reader底部），可发表、点赞
- [x] **书单/专题** — `booklists.html`：6个官方预设书单 + 用户自建书单，多选作品、详情展示
- [x] 评分系统 — 模态框中5星评分，LocalStorage 存储，影响排行榜显示分数
- [x] **100部轻小说数据** — novels.json + novels.js 公共数据文件，所有页面共享
- [x] 模块化文件架构（base.css + layout.css + 页面级 CSS/JS 拆分）
- [x] **公共数据提取** — 硬编码 JS 数组 → `assets/js/data/novels.js` 统一引用
- [x] GitHub 仓库 `Kilikey/LightFun` 已创建，v1.5.0 已推送
- [x] SSH 密钥已配置，代理端口 7897，后续推送无障碍
- [x] 33+ 细节优化：跨页搜索、字体选择、夜间模式、自动标记已读、阅读时间估算、排名「我的评分」标签、读完提示、favicon、自定义滚动条、页面入场动画、登录注册联动等

### 待办（按 Plan.md 路线图）
- [x] **v1.5 社区**：评论✅、书单/专题✅、排行榜✅、更新日历✅
- [ ] **v2.0 运营**：后台管理、推荐位管理、数据统计
- [ ] **v3.0 高级**：暗黑模式、PWA、离线阅读、付费系统

---

## 🔧 技术配置备忘

| 配置项 | 当前值 | 位置 |
|--------|--------|------|
| Git 代理 | `http://127.0.0.1:7897` | `git config --global` |
| 远程地址 | `git@github.com:Kilikey/LightFun.git` | `git remote -v` |
| SSH 密钥 | `~/.ssh/id_ed25519` | GitHub Settings → SSH Keys |
| SSH 端口 | 443（走 `ssh.github.com`） | `~/.ssh/config` |
| 分支 | `main` | `git branch` |
| 标签 | `v1.5.0` | `git tag` |

---

## 📝 上次对话工作内容（2026-06-23）

1. **数据扩展至100部** — novels.json 新增50部经典轻小说（id 51-100）
2. **创建更新日历页面** — `pages/update-calendar.html` + `update-calendar.js`
3. **数据重构** — 提取 `assets/js/data/novels.js` 公共数据文件，所有页面统一引用
4. **导航栏统一** — 所有页面添加「更新」入口
5. **文库筛选器** — 状态/评分/排序/标签四维筛选
6. **评论系统** — `assets/js/components/comments.js`：作品评论（library模态框）+ 章节评论/本章说（reader底部），支持发表、点赞
7. **书单/专题** — `pages/booklists.html` + `booklists.js`：6个官方预设书单（异世界/校园/科幻/战斗/黑暗/治愈），用户可创建自定义书单，多选作品，支持删除
8. **导航栏再次统一** — 所有页面添加「书单」入口，7个页面导航完全一致

---

## 🚀 下次对话建议开启方向

1. **v2.0 运营** — 后台管理面板、数据可视化
2. **响应式优化** — 移动端适配、页面加载性能
3. **暗黑模式** — 全局主题切换，PWA 支持
4. **其他** — 用户指定

---

## 🧠 核心设计原则（不变）

| 原则 | 说明 |
|------|------|
| **数据分离** | 硬编码 JS → JSON 文件 → 未来后端 API |
| **样式分离** | 内联 `<style>` → 外链 CSS，按组件/页面拆分 |
| **逻辑分离** | 内联 `<script>` → 外链 JS，按职责拆分 |
| **组件复用** | 统一 `user-init.js` 全局用户组件，一改全站生效 |
| **状态管理** | 统一 `state.js` + `storage.js` 封装 LocalStorage |
| **渐进增强** | 纯前端 → 接框架 → 接后端，每步都有可用版本 |

---

> *"给岁月以文明，而不是给文明以岁月。"*  
> —— 先阅读记忆，再开展工作。每次对话都走得稳，项目才能走得远。
