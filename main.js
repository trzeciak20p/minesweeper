// HTML elements
const playfield = document.getElementsByTagName("main")[0]
// Global variables
let game_time

const scenarios = [["easy", 10, 8, 10], ["medium", 18, 14, 40], ["hard", 24, 20, 100]]

class Mine{
    
    static mines
    
    constructor(){
        
    }

    static clearMines(rows, columns){
        for(i = 0; i < rows; i++){
            mines[i] = new Array(columns)
            for(j = 0; j < columns; j++){
                mines[i][j] = false
            }
        }
    }


}

function alert(text){


}

function gameLost(){
    played_time = game_time - Date.now()
}

function newGame(){
    let rows_c = 10
    let columns_c = 10
    let mines_c = 10
    let minesquantity = false

    // Setting starting values
    mines = new Array(rows_c)
    
    game_time = Date.now()
    
    if(minesquantity){ checkMinesQuantity(rows_c, columns_c, mines_c) }
    
    generateTiles(rows_c, columns_c)
    generateMines(rows_c, columns_c, mines_c)
    updateAdjacent(rows_c, columns_c)
}

function checkMinesQuantity(rows, columns, mines){
    if(rows * columns / mines > 10){
        alert("You are above recomended mines density")
    }else if(rows * columns / mines < 5){
        alert("You are below recomended mines density")
    }
}

function generateTiles(rows, columns){   
    for(let i = 0; i < rows; i++){
        let row = document.createElement("TR")    
        for(let j = 0; j < columns; j++){ 
            let tile = document.createElement("TD")
            tile.setAttribute("class", "tile")
            tile.addEventListener("click", () => {tileClicked(i, j)})
            row.appendChild(tile)
        }
        playfield.appendChild(row)
    }
}

function generateMines(rows, columns, mines_count){
    while(mines_count > 0){
        j = Math.floor(Math.random() * columns);
        i = Math.floor(Math.random() * rows);
        if(!mines[i][j]){
            mines[i][j] = true
            mines_count--
            document.querySelectorAll("main tr")[i].querySelectorAll("td")[j].innerText = 1
        }
    }
}

function updateAdjacent(rows, columns){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){ 
            let mines_around = 0
            for (adj_i = -1; adj_i <= 1; adj_i++) {     
                for (adj_j = -1; adj_j <= 1; adj_j++) {
                    if (adj_i + i >= 0 && adj_i + i <= rows - 1 && adj_j + j >= 0 && adj_j + j <= columns - 1 ) {
                        mines_around += mines[adj_i][adj_j] 
                        
                    }
                }
            }
            document.querySelectorAll("main tr")[i].querySelectorAll("td")[j].setAttribute("around", mines_around)
        }
    }
}

function tileClicked(i, j){
    if(mines[i][j]){
        gameLost()
        return;
    }




}

newGame()