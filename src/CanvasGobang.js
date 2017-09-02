import Gobang from './Gobang'

export default class CanvasGobang extends Gobang {
    initBoard() {
        const { board, boardWidth, boardHeight } = this
        const ratio = window.devicePixelRatio
        const ctx = this.ctx = board.getContext('2d')

        board.width = boardWidth * ratio
        board.height = boardHeight * ratio
        ctx.scale(ratio, ratio)

        board.style.cssText = `width:${boardWidth}px;height:${boardHeight}px;box-shadow: -2px -2px 2px #efefef, 5px 5px 5px #b9b9b9;`
        this.clearChess()
    }
    clearChess() {
        const { ctx, boardWidth, boardHeight, props } = this
        const { width, padding, size } = props

        ctx.clearRect(0, 0, boardWidth, boardHeight)

        for (let i = 0; i < size; i++) {
            // 画纵轴
            ctx.beginPath()
            ctx.moveTo(padding + width * i, padding)
            ctx.lineTo(padding + width * i, boardHeight - padding)
            ctx.closePath()
            ctx.stroke()

            // 画横轴
            ctx.beginPath()
            ctx.moveTo(padding, padding + width * i)
            ctx.lineTo(boardWidth - padding, padding + width * i)
            ctx.closePath()
            ctx.stroke()
        }
    }
    renderChess({ i, j, isBlack }) {
        const { ctx, props } = this
        const { padding, width } = props
        const x = padding + width * i
        const y = padding + width * j
        const offset = 2
        const r = ~~(width / 2) - offset

        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.closePath()

        const gradient = ctx.createRadialGradient(x, y, r, x + offset, y - offset, 0)
        if (isBlack) {
            gradient.addColorStop(0, '#0a0a0a')
            gradient.addColorStop(1, '#636766')
        }
        else {
            gradient.addColorStop(0, '#d1d1d1')
            gradient.addColorStop(1, '#f9f9f9')
        }
        ctx.fillStyle = gradient

        ctx.fill()
    }
}