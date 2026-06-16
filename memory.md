# 🧠 Memory · 次元书屋项目记忆库

> 作用：每次新对话开启时，Kimi 必须**首先阅读此文件**，确保工作连续性。  
> 更新规则：每次重大修改后，由 Kimi 或用户更新此文件。  
> 位置：`D:\PythonFile\HTML\test for first html\memory.md`  
> 最后更新：2026-06-16

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
| **当前版本** | `v1.1.0` |
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
| **注册页** | `register.html` | 新用户注册 |
| **文库首页** | `pages/library.html` | 核心页面，20部轻小说展示 |
| **阅读器** | `pages/reader.html` | 章节阅读、设置、进度 |
| **书架** | `pages/bookshelf.html` | 收藏管理、继续阅读 |
| **个人中心** | `pages/user.html` | 阅读历史、评分、统计 |
| **数据文件** | `assets/data/novels.json` | 20部轻小说数据 |
| **基础样式** | `assets/css/base.css` | CSS变量、重置、浮动装饰、入场动画 |
| **布局骨架** | `assets/css/layout.css` | 导航栏、页脚、section布局 |
| **文库样式** | `assets/css/pages/library.css` | 轮播、网格、模态框、排行等 |
| **阅读器样式** | `assets/css/pages/reader.css` | 工具栏、目录、设置、阅读区 |
| **书架样式** | `assets/css/pages/bookshelf.css` | 书架网格、继续阅读、空状态 |
| **用户样式** | `assets/css/pages/user.css` | 用户卡片、统计、历史、评分 |
| **全局状态** | `assets/js/core/state.js` | LocalStorage状态管理 |
| **数据请求** | `assets/js/core/api.js` | 数据层（当前fetch JSON） |
| **工具函数** | `assets/js/utils/` | storage、formatter、dom、validator |
| **组件** | `assets/js/components/` | toast、modal等 |
| **文库逻辑** | `assets/js/pages/library.js` | 轮播、搜索、模态框、评分 |
| **阅读器逻辑** | `assets/js/pages/reader.js` | 章节、设置、进度、目录 |
| **书架逻辑** | `assets/js/pages/bookshelf.js` | 书架渲染、移除、继续阅读 |
| **用户逻辑** | `assets/js/pages/user.js` | 统计、历史、评分、偏好 |
| **GitHub学习** | `D:\Backup\Documents\Obsidian Vault\github学习.md` | 推送经验、命令速查 |

---

## 📊 当前项目状态（v1.1.0）

### 已完成
- [x] 登录页（index.html）— 毛玻璃风格，张三/123456
- [x] 注册页（register.html）— 与登录页统一风格，LocalStorage 存储用户
- [x] 文库首页（library.html）— 轮播、更新、排行、新书、标签、搜索、模态框
- [x] 阅读器（reader.html）— 章节目录、字体/背景/行间距调节、分页/滚动、阅读进度、键盘/触摸翻页
- [x] 书架（bookshelf.html）— 继续阅读、书架网格、阅读进度条、移除功能
- [x] 个人中心（user.html）— 阅读统计、阅读历史、评分记录、阅读偏好展示
- [x] 评分系统 — 模态框中5星评分，LocalStorage 存储
- [x] 20部轻小说数据 + 封面图
- [x] 模块化文件架构（base.css + layout.css + 页面级 CSS/JS 拆分）
- [x] 数据从硬编码迁移到 novels.json
- [x] GitHub 仓库 `Kilikey/LightFun` 已创建，v1.0.0 已推送
- [x] SSH 密钥已配置，代理端口 7897，后续推送无障碍

### 待办（按 Plan.md 路线图）
- [x] **v0.2 架构重构**：`library.html` 已拆分为 `library.css` + `library.js`
- [x] **v0.5 阅读器**：`reader.html` 已上线
- [x] **v1.0 用户功能**：书架/收藏、阅读历史、个人中心、评分、注册页 ✅ 完成
- [ ] **v1.5 社区**：评论、排行榜、书单/专题、更新日历
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
| 标签 | `v1.0.0` | `git tag` |

---

## 📝 上次对话工作内容（2026-06-16）

1. **删除 Home.html** — 三体介绍页与项目定位不符，已移除
2. **P0 拆分 library.html** — 内联 325 行 CSS → `assets/css/pages/library.css`，内联 283 行 JS → `assets/js/pages/library.js`，library.html 改为纯 HTML 结构引用外链
3. **P1 新建阅读器 reader.html** — 含 `reader.css` + `reader.js`：章节目录抽屉、字体大小/行间距/背景主题/翻页方式设置、阅读进度保存、上一章/下一章导航、键盘左右键翻页、触摸滑动翻页、点击边缘翻页、返回顶部按钮
4. **P2 书架 bookshelf.html** — 含 `bookshelf.css` + `bookshelf.js`：继续阅读区、书架网格（带阅读进度条）、移除功能、空状态引导
5. **P3 注册页 register.html** — 与登录页统一毛玻璃风格，用户名/密码/确认密码验证，LocalStorage 存储注册用户，注册成功后跳转登录页
6. **P4 个人中心 user.html** — 含 `user.css` + `user.js`：用户卡片、统计面板（已读作品/章节/书架/评分）、阅读历史列表、评分记录、阅读偏好展示、清空历史功能
7. **评分系统** — 在 library.js 模态框中添加交互式 5 星评分，存储在 `ratings` LocalStorage 键中，user.html 中展示评分记录
8. **更新 CHANGELOG.md** — 记录本次所有变更
9. **更新 memory.md** — 更新版本号、文件列表、待办状态

---

## 🚀 下次对话建议开启方向

1. **排行榜页面** — `pages/ranking.html`：日榜/周榜/月榜/总榜
2. **评论系统** — 作品评论、章节评论（本章说）
3. **更新日历** — `pages/update-calendar.html`：显示每日上新
4. **书单/专题** — 用户自建书单、官方专题
5. **其他** — 用户指定

---

## 🧠 核心设计原则（不变）

| 原则 | 说明 |
|------|------|
| **数据分离** | 硬编码 JS → JSON 文件 → 未来后端 API |
| **样式分离** | 内联 `<style>` → 外链 CSS，按组件/页面拆分 |
| **逻辑分离** | 内联 `<script>` → 外链 JS，按职责拆分 |
| **组件复用** | 统一 nav.js + nav.html 模板，一改全站生效 |
| **状态管理** | 统一 `state.js` + `storage.js` 封装 LocalStorage |
| **渐进增强** | 纯前端 → 接框架 → 接后端，每步都有可用版本 |

---

> *"给岁月以文明，而不是给文明以岁月。"*  
> —— 先阅读记忆，再开展工作。每次对话都走得稳，项目才能走得远。
