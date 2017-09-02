# 五子棋

## 查看方式

打开 dist/index.html 文件即可

## 实现功能

* 悔棋功能
* 撤销悔棋功能
* 人机对战功能

## 灵活性

Gobang 类负责主要的逻辑，CanvasGobang 类实现 `initBoard`、`clearChess`、`renderChess` 方法，负责在 Canvas 下的绘制绘制棋盘、清除棋子、绘制棋子逻辑。
如果需要切换成 DOM 实现，则是需要实现 DOM 的 `initBoard`、`clearChess`、`renderChess` 方法即可。
