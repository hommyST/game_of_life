const board = document.querySelector('.container')

const dim = 50

let boardArr = []
let prevBoardArr = []



init()

function init() {
  board.style.setProperty('--_dim', dim)

  for (let i = 0; i < dim * dim; i++) {
    boardArr[ i ] = 0
    prevBoardArr[ i ] = 0
  }
  
  render()
}


function render() {
  board.innerHTML = ''
  
  for (let y = 0; y < dim; y++) {
    for (let x = 0; x < dim; x++) {
      let index = x + y * dim
      let state = boardArr[index]

      const cell = document.createElement('div')
      cell.style['grid-column-start'] = x + 1
      cell.style['grid-row-start'] = y + 1

      if (state === 1) cell.classList.add('live')
      else cell.classList.add('dead')

      board.append(cell)
    }
  }
}