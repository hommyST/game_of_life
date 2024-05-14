/**@type {HTMLDivElement} */
const board = document.querySelector('.container')
const startBtn = document.querySelector('#start')

const DIM = 50
const SPEED = 2

let boardArr = []
let prevBoardArr = []

let prevTime = 0
let isMouse = false

init()

board.addEventListener('mousedown', ev => {
  isMouse = true
})
board.addEventListener('mouseleave', ev => {
  isMouse = false
})
window.addEventListener('mouseup', ev => {
  isMouse = false
})
board.addEventListener('mousemove', ev => {
  if (isMouse === false) return
  const target = ev.target
  const index = +target.dataset.index
  if (isNaN(index)) return
  
  if (target.classList.contains('dead')) {
    boardArr[index] = 1
    target.className = 'live'
  } else if (target.classList.contains('live')) {
    boardArr[index] = 0
    target.className = 'dead'
  }
})
startBtn.addEventListener('click', () => {
  requestAnimationFrame(loop)
})

function init() {
  board.style.setProperty('--_dim', DIM)

  for (let i = 0; i < DIM * DIM; i++) {
    boardArr[i] = 0
  }

  for (let i = 0; i < 200; i++) {
    let index = Math.floor(Math.random() * DIM * DIM)
    boardArr[index] = 1
  }

  render()
  // requestAnimationFrame(loop)
  // gameLogic()
}

function loop(time) {
  requestAnimationFrame(loop)
  const prevTimeSec = (time - prevTime) / 1000
  if (prevTimeSec < 1 / SPEED) return
  prevTime = time

  gameLogic()
  render()
}

function render() {
  board.innerHTML = ''
  
  for (let y = 0; y < DIM; y++) {
    for (let x = 0; x < DIM; x++) {
      let index = getIndex(x, y)
      let state = boardArr[index]

      const cell = document.createElement('div')
      cell.draggable = false
      cell.style['grid-column-start'] = x + 1
      cell.style['grid-row-start'] = y + 1
      cell.dataset.index = index

      if (state === 1) cell.classList.add('live')
      else cell.classList.add('dead')

      board.append(cell)
    }
  }
}



function gameLogic() {
  prevBoardArr = boardArr.slice()

  for (let y = 0; y < DIM; y++) {
    for (let x = 0; x < DIM; x++) {
      let index = getIndex(x, y)
      let state = prevBoardArr[index]

      handleCell({x, y, index, state})
    }
  }



  function handleCell(options) {
    const {x, y, index, state} = options

    let liveNeighbors = 0

    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        if (i === 0 && j === 0) continue
        if (prevBoardArr[getIndex(x + j, y + i)] === 1) liveNeighbors++
      }
    }


    // Rules
    if (liveNeighbors > 3) boardArr[index] = 0
    else if (liveNeighbors < 2) boardArr[index] = 0
    else if (state === 1 && (liveNeighbors === 3 || liveNeighbors === 2)) boardArr[index] = 1
    else if (state === 0 && liveNeighbors === 3) boardArr[index] = 1
  }
}

function getIndex(x, y) {
  return x + y * DIM
}