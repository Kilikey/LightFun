# 📋 文件修改记录 · 轻小说文库项目

> 项目路径：`D:\PythonFile\HTML\test for first html\`
> 修改日期：2026-06-15

---

## 一、新增文件

### 1️⃣ library.html — 轻小说文库主页面

**描述：** 仿 wenku8.net 的轻小说在线文库首页，包含完整的浏览、搜索、筛选功能。

**功能模块：**
| 模块 | 说明 |
|------|------|
| 🎠 顶部导航栏 | Logo + 导航链接 + 搜索框 + 用户信息 |
| 🖼️ Hero 轮播 Banner | 5部推荐轻小说自动轮播，支持点击切换 |
| 📬 今日更新 | 按更新时间排序的最近更新列表 |
| 🔥 热门排行 | 按评分排序的 Top 6 轻小说排行 |
| 🆕 新书上架 | 6部精选轻小说网格展示 |
| 🏷️ Tags 云集 | 20个标签，点击可筛选对应分类作品 |
| 📚 全部作品 | 20部轻小说完整网格，支持搜索过滤 |
| 🖼️ 详情模态框 | 点击任一轻小说弹出详情卡片 |
| 🦶 Footer | 页脚链接 + 退出登录 |

**技术实现：**
- 单 HTML 文件（CSS + JS 内嵌）
- 20部轻小说数据内置于 JS 数组，含封面路径、作者、简介、标签、评分等
- 实时搜索过滤（按标题/作者）
- 标签云点击筛选
- 轮播自动切换 + 手动控制
- 毛玻璃 UI 风格 + 粉紫渐变二次元配色
- 响应式布局

---

### 2️⃣ covers/ — 轻小说封面图片目录

**描述：** 从 MyAnimeList CDN 下载的 20 张轻小说封面图。

| 文件名 | 轻小说 | 图片URL |
|--------|--------|---------|
| 01.jpg | 无职转生 | `https://cdn.myanimelist.net/images/manga/2/181049.jpg` |
| 02.jpg | 刀剑神域 | `https://cdn.myanimelist.net/images/manga/2/280994.jpg` |
| 03.jpg | 转生史莱姆 | `https://cdn.myanimelist.net/images/manga/3/167639.jpg` |
| 04.jpg | 实力至上主义教室 | `https://cdn.myanimelist.net/images/manga/2/177958.jpg` |
| 05.jpg | 魔法禁书目录 | `https://cdn.myanimelist.net/images/manga/3/176880.jpg` |
| 06.jpg | 我的青春恋爱物语果然有问题 | `https://cdn.myanimelist.net/images/manga/1/122461.jpg` |
| 07.jpg | 路人女主的养成方法 | `https://cdn.myanimelist.net/images/manga/3/145019.jpg` |
| 08.jpg | 命运石之门 | `https://cdn.myanimelist.net/images/manga/1/121341.jpg` |
| 09.jpg | No Game No Life | `https://cdn.myanimelist.net/images/manga/2/188186.jpg` |
| 10.jpg | 为美好的世界献上祝福 | `https://cdn.myanimelist.net/images/manga/1/174932.jpg` |
| 11.jpg | Re:从零开始的异世界生活 | `https://cdn.myanimelist.net/images/manga/1/129447.jpg` |
| 12.jpg | 葬送的芙莉莲 | `https://cdn.myanimelist.net/images/manga/3/232121.jpg` |
| 13.jpg | 86-不存在的战区 | `https://cdn.myanimelist.net/images/manga/3/194315.jpg` |
| 14.jpg | 狼与香辛料 | `https://cdn.myanimelist.net/images/manga/2/153860.jpg` |
| 15.jpg | 文学少女 | `https://cdn.myanimelist.net/images/manga/3/302207.jpg` |
| 16.jpg | 奇诺之旅 | `https://cdn.myanimelist.net/images/manga/2/333085.jpg` |
| 17.jpg | 物语系列 | `https://cdn.myanimelist.net/images/manga/2/279887.jpg` |
| 18.jpg | 笨蛋测试召唤兽 | `https://cdn.myanimelist.net/images/manga/1/153247.jpg` |
| 19.jpg | 凉宫春日的忧郁 | `https://cdn.myanimelist.net/images/manga/1/186142.jpg` |
| 20.jpg | 不正经的魔术讲师与禁忌教典 | `https://cdn.myanimelist.net/images/manga/1/167611.jpg` |

---

## 二、修改文件

### 1️⃣ index.html — 登录页面 (已修改)

**修改内容：**
| 项目 | 原版 | 新版 |
|------|------|------|
| 🎨 整体风格 | 蓝灰商务风 | 粉紫渐变动漫风 |
| 🌸 浮动装饰 | 无 | 添加 🌸🎀⭐🍡 漂浮动画 |
| 🖼️ 登录卡片 | 纯白底色 | 毛玻璃半透明效果 |
| 🎯 标题 | 深蓝色 `登录` | 粉紫渐变 `✦ 登录` |
| 🔤 字体 | system-ui | Quicksand + Noto Sans SC |
| 🎨 按钮 | 深蓝色 | 粉紫渐变 + hover弹起 |
| 🔲 输入框 | 蓝色边框 | 紫色圆角 + 聚焦光晕 |
| 🖼️ 头像 | hover 微缩放 | hover 旋转缩放 |
| 🔗 登录跳转 | 仅演示 Toast | **实际跳转至 library.html** |
| 🎬 入场动画 | 无 | 滚动触发飞入动画 |

---

### 2️⃣ Home.html — 三体介绍页面 (已修改)

**修改内容：**
| 项目 | 原版 | 新版 |
|------|------|------|
| 🎨 整体风格 | 引用外部 style.css | 内嵌粉紫动漫风 |
| 🌌 浮动装饰 | 无 | 添加 🌌⭐🪐🌠✨🌙 宇宙风装饰 |
| 📦 主容器 | 无卡片样式 | 磨砂玻璃圆角卡片 |
| 🎯 标题 | 纯色标题 | 粉紫蓝渐变大标题 |
| 🔤 字体 | sans-serif | Quicksand + Noto Sans SC |
| 🎨 退出按钮 | 无样式原始按钮 | 粉紫渐变圆角按钮 |
| 🦶 结语 | 无 | 添加 "给岁月以文明" 金句脚注 |
| 🎬 入场动画 | 无 | 滚动触发飞入动画 |

---

## 三、文件结构总览

```
D:\PythonFile\HTML\test for first html\
├── index.html          ← 登录入口 (粉紫动漫风格)
├── library.html        ★ 新增 — 轻小说文库主页面
├── Home.html           ← 三体介绍页 (粉紫动漫风格)
├── style.css           ← 旧版样式 (不再被引用)
├── CHANGELOG.md        ★ 新增 — 本修改记录文档
├── IMG_20260409_223616.jpg  ← 登录页头像
└── covers/             ★ 新增 — 20张轻小说封面
    ├── 01.jpg ~ 20.jpg
```

## 四、使用流程

```
┌──────────────┐     登录成功      ┌──────────────────┐
│  index.html  │ ──────────────→  │  library.html     │
│  (登录页面)   │                   │  (轻小说文库首页)  │
│  张三/123456  │                   │                   │
└──────────────┘                   │  · 浏览全部作品   │
        ↑                          │  · 搜索/筛选      │
        │  退出登录                 │  · 查看详情       │
        └──────────────────────────┘                   │
                                    └──────────────────┘
```
