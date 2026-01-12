let board
let originalPuzzle
let solution

function checkRow(board, row, num){
    for (let col = 0; col < 9; col ++){
        if (board[row][col] === num
        ){
            return false;
        }
    }
    return true
}
function checkCol(board, col, num){
    for (let row = 0; row < 9; row ++){
        if (board[row][col] === num
        ){
            return false;
        }
    }
    return true
}
function checkBlock(board, row, col, num){
    const startRow = Math.floor(row/3) * 3;
    const startCol = Math.floor(col/3) * 3;
    

    for (let r = 0; r < 3; r++){
        for (let c = 0; c < 3; c++){
            if (board[startRow + r][startCol + c] === num){
                return false
            }
        }
    }
    return true
}

function isSafe(board, row, col, num) {
    return (
        checkRow(board, row, num) &&
        checkCol(board, col, num) &&
        checkBlock(board, row, col, num)
    );
}
function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i +1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function fillPuzzle(board){
    for (let row = 0; row < 9; row ++){
        for (let col = 0; col < 9; col ++){
            
            if (board[row][col] === 0){
                const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

                for (const num of numbers){
                    if (isSafe(board, row, col, num)){
                        board[row][col] = num;
                        if(fillPuzzle(board)){
                            return true
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
let solutionCounter

function countSolutions(board){
    for (let row = 0; row < 9; row ++){
        for (let col = 0; col < 9; col++){

            if (board[row][col] === 0){
                for (let num = 1; num <= 9; num++){
                    if (isSafe(board, row, col, num)){
                        board[row][col] = num;
                        
                        countSolutions(board);

                        board[row][col] = 0
                    }
                }
                return;
            }
        }
    }
    solutionCounter++;
}
function createPuzzle(solvedBoard, holesToMake){
    let puzzleBoard = solvedBoard.map(row => row.slice());

    let positions = [];
    for (let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            positions.push([r, c])
        }
    }
    shuffle(positions);

    let holesMade = 0;
    for (const [row, col] of positions){
        if (holesMade >= holesToMake) break;
        let savedValue = puzzleBoard[row][col];
        puzzleBoard[row][col] = 0;
        solutionCounter = 0;
        countSolutions(puzzleBoard.map(row => row.slice()));
        if (solutionCounter !== 1){
            puzzleBoard[row][col] = savedValue;
        } else{
            holesMade ++;
        }
    }
    return puzzleBoard;
}

function checkWinCondition(){
    for (let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            if (board[r][c] === 0){
                return;
            }
        }
    } 
    let isCorrect = true;
    for (let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            if (board[r][c] !== solution[r][c]){
                isCorrect = false;
                break;
            }
        }
    }
    if (isCorrect){
        setTimeout(() =>{
            alert("Felicidades, resolviste el sudoku!!!");
        },100);
    }else{
        alert("El tablero está lleno, pero hay errores. Revisá tus numeros.");
    }
}
function updateDOM(){
    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col++){
            const cellElement = document.getElementById(`cell-${row}-${col}`);
            const value = board[row][col];

            cellElement.classList.remove('pre-filled', 'selected');

            cellElement.textContent = value === 0 ? "": value;

            if (originalPuzzle[row][col] !== 0){
                cellElement.classList.add('pre-filled');
            }
            if (selectedCell && selectedCell.row === row && selectedCell.col === col){
                cellElement.classList.add('selected')
            }
        }
    }
}

let selectedCell = null;
function setupEventListeners(){
    const boardElement = document.getElementById('sudoku-board');
    const hiddenInput = document.getElementById('hidden-input');


    boardElement.addEventListener('click', function(event){
        const target = event.target.closest('.cell');
        if (!target) return;

        const parts = target.id.split('-');
        const row = parseInt (parts[1]);
        const col = parseInt(parts[2]);

        selectedCell = { row, col };
        updateDOM();

        if (originalPuzzle[row][col] === 0){
            hiddenInput.value = '';
            hiddenInput.focus();
        }
    });

    hiddenInput.addEventListener('input', function(event){
        if(!selectedCell) return;
        const { row, col} = selectedCell;

        const val = parseInt(event.target.value);

        if (val >=1 && val <= 9){
            board[row][col] = val;
            updateDOM();
            checkWinCondition();

            hiddenInput.value = '';
        }else{
            hiddenInput.value = '';
        }
    })

    document.addEventListener('keydown', function(event){
        if (!selectedCell) return;
        const { row, col } = selectedCell;

        if (originalPuzzle[row][col] !== 0) return;

        if (event.key >= '1' && event.key <= '9'){
            const num = parseInt(event.key);;

            board [row][col] = num;

            updateDOM();
            checkWinCondition();
        }
        else if (event.key === 'Backspace' || event.key === 'Delete'){
            board [row][col] = 0;
            updateDOM();
        }
    });
}
function setupControlButtons(){
    document.getElementById('solve-button').addEventListener('click', () =>{
        fillPuzzle(board);
        updateDOM();
        checkWinCondition();
    });
    document.getElementById('clear-button').addEventListener('click', ()=>{
        board = originalPuzzle.map(row => row.slice());
        updateDOM();
    });
    document.getElementById('new-game-button').addEventListener('click', () => {
        if(confirm("Querés generar un nuevo juego? Se perderá el progreso actual.")){
            startNewGame();
        }
    });
}
function startNewGame(){
    const boardElement = document.getElementById('sudoku-board');
    boardElement.innerHTML = '';

    selectedCell = null;

    createGridDOM()

    let solvedBoard = Array(9).fill(0).map(()=> Array(9).fill(0));
    fillPuzzle(solvedBoard);
    solution = solvedBoard;

    originalPuzzle = createPuzzle(solvedBoard, 40);
    board = originalPuzzle.map (row => row.slice());

    updateDOM();
}
function init(){
    setupEventListeners();
    setupControlButtons();

    startNewGame();
}

function createGridDOM(){
    const boardElement = document.getElementById('sudoku-board');

    for (let i = 0; i < 9; i++){
        const boxElement = document.createElement('div');
        boxElement.classList.add('box')

        for (let j = 0; j < 9; j++){
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        
        const row = Math.floor(i/3)*3 + Math.floor(j/3);
        const col = (i%3) * 3 + (j%3);

        cellElement.id = `cell-${row}-${col}`;

        boxElement.appendChild(cellElement);
    }
    boardElement.appendChild(boxElement)
    }
    
}

window.onload = init