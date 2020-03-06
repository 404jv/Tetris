function drawBoard() {
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol]

            drawSquare(currentRow, currentCol, currentSquareColor)
        }
    }

    scoreElement.innerHTML = score
    speedElement.innerHTML = speed
    recordElement.innerHTML = record

}

function drawSquare(y, x, color) { // Pegar o eixo y e x, e setar uma cor escolhida
    ctx.fillStyle = color
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ)

    if (color == defaultColor) {
        ctx.strokeStyle = defaultBorder
    }

    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ)
}

function randomPiece() {
    const randomPieceNumber = Math.floor(Math.random() * PIECES.length)

    return new Piece(
        PIECES[randomPieceNumber][0],
        PIECES[randomPieceNumber][1],
    )
}

function drop() {
    const now = Date.now()
    const delta = now - dropStart

    if (delta > speed) {
        piece.moveDown()
        dropStart = Date.now()
    }

    requestAnimationFrame(drop)
}

function CONTROL(event) {

    if (!canMove) {
        return false
    }

    const moveFunctions = {
        ArrowLeft() {
            piece.moveLeft()
        },
        ArrowRight() {
            piece.moveRigth()
        },
        ArrowUp() {
            piece.rotate()
        }, 
        ArrowDown() {
            piece.moveDown()
        },
    }

    const movePiece = moveFunctions[event.code]
    movePiece()
}

function updateRowandScore(row) {
    canMove = false
    for (let y = row; y > 1; y--) {
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            removeRow(y, currentCol)
        }
    }

    for (let currentCol = 0; currentCol < COL; currentCol++) {
        board[0][currentCol] = defaultColor
    }

    score += 10 // Fazer uma função de adicionar o +10 de forma animada

    if (score > record) {
        newRecord(score)
        renderMessage()
    }

    if (speed > 100) {
        speed -= 20
    }
    canMove = true
}

function removeRow(rowToRemove, colToRemove) {
    board[rowToRemove][colToRemove] = board[rowToRemove -1][colToRemove]
}

function gameOver() { 
    messageElement.style.backgroundColor = "#FF2800"
    
    messageElement.innerHTML = `<p>Game Over</p>`

    messageElement.addEventListener("click", resetGame)
}

function resetGame() {
    removeMessage()
    speed = 500
    score = 0

    board = []

    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        board[currentRow] = []
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            board[currentRow][currentCol] = defaultColor
        }
    }

    piece = randomPiece()
    drawBoard()
}

function newRecord(rec) {
    record = rec
    
    messageElement.style.backgroundColor = "#4169E1"

    messageElement.innerHTML = `<p>New record!</p>`

    setTimeout(removeMessage, 2000)
}

function removeMessage() {
    messageElement.innerHTML = ""
    messageElement.style.padding = ""
    messageElement.style.borderRadius = ""
    messageElement.style.border = ""
}

function renderMessage() {
    messageElement.style.padding = "5px 20px 20px 20px"
    messageElement.style.borderRadius = "10px"
    messageElement.style.border = "2px solid black"
}


