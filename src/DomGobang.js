import Gobang from './Gobang'

export default class DomGobang extends Gobang {
    initBoard() {
        const { board, boardWidth, boardHeight, props } = this
        const { padding, size } = props

        board.style.cssText = `width:${boardWidth}px;height:${boardHeight}px;padding:${padding}px;box-sizing: border-box;`

        const fragment = document.createDocumentFragment()

        for (let i = 0; i < size - 1; i++) {
            const col = document.createElement('div')
            col.className = 'col'
            for (let j = 0; j < size - 1; j++) {
                const cell = document.createElement('div')
                cell.className = 'cell'
                col.appendChild(cell)
            }
            fragment.appendChild(col)
        }

        board.appendChild(fragment)
        const chesses = this.chesses = document.createElement('div')
        chesses.style.cssText = 'position:absolute;top:0;left:0px;'
        board.appendChild(chesses)
    }
    clearChess() {
        this.board.removeChild(this.chesses)
        const chesses = this.chesses = document.createElement('div')
        chesses.style.cssText = 'position:absolute;top:0;left:0px;'
        this.board.appendChild(chesses)
    }
    renderChess({i, j, isBlack}) {
        const { width, padding } = this.props
        const chess = document.createElement('div')

        const gradient = isBlack ?
            'background-image: radial-gradient(circle at 15px 15px, #636766, #0a0a0a);' :
            'background-image: radial-gradient(circle at 15px 15px, #f9f9f9, #d1d1d1);'

        let cssText = `position:absolute;left:${i * 30 + padding}px;top:${j * 30 + padding}px;width:${width - 2 * 2}px;height:${width - 2 * 2}px;border-radius:50%;transform: translate(-50%, -50%);`
        cssText += gradient
        chess.style.cssText = cssText

        this.chesses.appendChild(chess)
    }
}