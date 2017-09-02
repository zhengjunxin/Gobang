/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasGobang_js__ = __webpack_require__(1);
new __WEBPACK_IMPORTED_MODULE_0__CanvasGobang_js__["a" /* default */]({board:'.board',undo:'.undo',redo:'.redo',robot:'.robot'});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Gobang__ = __webpack_require__(2);
class CanvasGobang extends __WEBPACK_IMPORTED_MODULE_0__Gobang__["a" /* default */]{initBoard(){const{board,boardWidth,boardHeight}=this;const ratio=window.devicePixelRatio;const ctx=this.ctx=board.getContext('2d');board.width=boardWidth*ratio;board.height=boardHeight*ratio;ctx.scale(ratio,ratio);board.style.cssText=`width:${boardWidth}px;height:${boardHeight}px;box-shadow: -2px -2px 2px #efefef, 5px 5px 5px #b9b9b9;`;this.clearChess();}clearChess(){const{ctx,boardWidth,boardHeight,props}=this;const{width,padding,size}=props;ctx.clearRect(0,0,boardWidth,boardHeight);for(let i=0;i<size;i++){// 画纵轴
ctx.beginPath();ctx.moveTo(padding+width*i,padding);ctx.lineTo(padding+width*i,boardHeight-padding);ctx.closePath();ctx.stroke();// 画横轴
ctx.beginPath();ctx.moveTo(padding,padding+width*i);ctx.lineTo(boardWidth-padding,padding+width*i);ctx.closePath();ctx.stroke();}}renderChess({i,j,isBlack}){const{ctx,props}=this;const{padding,width}=props;const x=padding+width*i;const y=padding+width*j;const offset=2;const r=~~(width/2)-offset;ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);ctx.closePath();const gradient=ctx.createRadialGradient(x,y,r,x+offset,y-offset,0);if(isBlack){gradient.addColorStop(0,'#0a0a0a');gradient.addColorStop(1,'#636766');}else{gradient.addColorStop(0,'#d1d1d1');gradient.addColorStop(1,'#f9f9f9');}ctx.fillStyle=gradient;ctx.fill();}}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasGobang;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const $=selector=>document.querySelector(selector);const array2hash=(array,keyGen)=>array.reduce((acc,item)=>{const key=keyGen(item);acc[key]=item;return acc;},{});const nth=(array,n=0)=>{let result=undefined;if(array&&array.length){const index=~~n;result=array[index<0?array.length+index:index];}return result;};class Gobang{constructor(props){this.board=typeof props.board==='string'?$(props.board):props.board;this.board.addEventListener('click',this._onClick.bind(this));this.undo=typeof props.undo==='string'?$(props.undo):props.undo;this.undo.addEventListener('click',this._onUndo.bind(this));this.redo=typeof props.redo==='string'?$(props.redo):props.redo;this.redo.addEventListener('click',this._onRedo.bind(this));this.robot=typeof props.robot==='string'?$(props.robot):props.robot;this.robot.addEventListener('click',this._onRobot.bind(this));const defaultProps={padding:15,width:30,size:15};this.props=Object.assign({},defaultProps,props);this.boardWidth=this.props.padding*2+this.props.width*(this.props.size-1);this.boardHeight=this.props.padding*2+this.props.width*(this.props.size-1);this.over=false;this.isBlack=true;this.steps=[];this.undos=[];this.line=5;this.robotOn=true;this.initBoard();this._initWins();this.boundRect=this.board.getBoundingClientRect();}_initWins(){const{line,props}=this;const{size}=props;const wins=[];let count=0;// 纵线
for(let i=0;i<size;i++){for(let j=0;j<=size-line;j++){for(let k=0;k<line;k++){wins[count]=(wins[count]||[]).concat({i:i,j:j+k});}count++;}}// 横线
for(let i=0;i<=size-line;i++){for(let j=0;j<size;j++){for(let k=0;k<line;k++){wins[count]=(wins[count]||[]).concat({i:i+k,j:j});}count++;}}// 对角
for(let i=0;i<=size-line;i++){for(let j=0;j<=size-line;j++){for(let k=0;k<line;k++){wins[count]=(wins[count]||[]).concat({i:i+k,j:j+k});}count++;}}// 反对角
for(let i=0;i<=size-line;i++){for(let j=line-1;j<size;j++){for(let k=0;k<line;k++){wins[count]=(wins[count]||[]).concat({i:i+k,j:j-k});}count++;}}this.wins=wins;}_onClick(e){const{over,steps,props,undos,isBlack,boundRect}=this;const{left,top}=boundRect;const{padding,width}=props;if(over){return;}if(undos.length){undos.length=0;}const{clientX,clientY}=e;const x=Math.abs(clientX-left-padding);const y=Math.abs(clientY-top-padding);const i=Math.round(x/width);const j=Math.round(y/width);if(steps.find(step=>step.i===i&&step.j===j)){console.warn('此处已经有子了');return;}const nextSteps=steps.concat({i,j,isBlack});this._setSteps(nextSteps);}_computerAI(){const{wins,steps,props,isBlack}=this;const{size}=props;const blackScore=[];const whiteScore=[];let max=0;// AI 最佳落子的位置
let u=0;let v=0;const blackWin=this._calWin(true);const whiteWin=this._calWin(false);// 初始化每个点的得分
for(let i=0;i<size;i++){blackScore[i]=[];whiteScore[i]=[];for(let j=0;j<size;j++){blackScore[i][j]=0;whiteScore[i][j]=0;}}// 遍历棋盘的所有位置
for(let i=0;i<size;i++){for(let j=0;j<size;j++){// 对于可以下的位置(i, j)
// 计算下在该位置，能获得多少分
if(!this._getBoard(steps)[i][j]){for(let k=0;k<wins.length;k++){if(wins[k].find(win=>win.i===i&&win.j===j)){// 黑棋得分累加
if(blackWin[k]===1){blackScore[i][j]+=200;}else if(blackWin[k]===2){blackScore[i][j]+=400;}else if(blackWin[k]===3){blackScore[i][j]+=2000;}else if(blackWin[k]===4){blackScore[i][j]+=10000;}// 白棋得分累加
if(whiteWin[k]===1){whiteScore[i][j]+=220;}else if(whiteWin[k]===2){whiteScore[i][j]+=420;}else if(whiteWin[k]===3){whiteScore[i][j]+=2200;}else if(whiteWin[k]===4){whiteScore[i][j]+=20000;}}}if(blackScore[i][j]>max){max=blackScore[i][j];u=i;v=j;}else if(blackScore[i][j]===max){if(whiteScore[i][j]>whiteScore[u][v]){u=i;v=j;}}if(whiteScore[i][j]>max){max=whiteScore[i][j];u=i;v=j;}else if(whiteScore[i][j]===max){if(blackScore[i][j]>blackScore[u][v]){u=i;v=j;}}}}}const nextSteps=steps.concat({i:u,j:v,isBlack});this._setSteps(nextSteps);}_onUndo(){const{steps,undos,over}=this;if(over||steps.length<2){return;}undos.push(nth(steps,-2));this._setSteps(steps.slice(0,-2));}_onRedo(){const{undos,steps}=this;if(!undos.length){return;}const undo=undos.pop();const nextSteps=steps.concat(undo);this._setSteps(nextSteps);}_calWin(isBlack){const{steps,wins}=this;const result={};const groupSteps=steps.filter(step=>step.isBlack===isBlack);for(let i=0;i<groupSteps.length;i++){const step=groupSteps[i];for(let k=0;k<this.wins.length;k++){if(wins[k].find(win=>win.i===step.i&&win.j===step.j)){result[k]=result[k]?result[k]+1:1;}}}return result;}_hasWin(wins){return Object.keys(wins).some(key=>wins[key]===this.line);}_getBoard(steps){const{size}=this.props;const chessBoard=[];const hash=array2hash(steps,step=>`${step.i}-${step.j}`);for(let i=0;i<size;i++){chessBoard[i]=[];for(let j=0;j<size;j++){chessBoard[i][j]=!!hash[`${i}-${j}`];}}return chessBoard;}_setSteps(nextSteps){if(nextSteps.length>this.steps.length){const lastStep=nth(nextSteps,-1);this.renderChess(lastStep);}else{this.clearChess();nextSteps.forEach(step=>this.renderChess(step));}this.steps=nextSteps;this._checkStatus();}_checkStatus(){const{steps,robotOn}=this;const lastStep=nth(steps,-1);if(!lastStep){return;}if(this._hasWin(this._calWin(lastStep.isBlack))){setTimeout(()=>{window.alert(`${lastStep.isBlack?'黑方':'白方'} 胜`);},0);this.over=true;}if(!this.over){this.isBlack=!lastStep.isBlack;if(!this.isBlack&&robotOn){this._computerAI();}}}_onRobot(e){this.robotOn=e.target.checked;if(this.robotOn&&!this.isBlack){this._computerAI();}}}
/* harmony export (immutable) */ __webpack_exports__["a"] = Gobang;


/***/ })
/******/ ]);