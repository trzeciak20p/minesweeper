const playfield = document.getElementsByTagName("main")[0]


const scenarios = [["easy", 10, 8, 10], ["medium", 18, 14, 40], ["hard", 24, 20, 100]]

function alert(text){

}

function newGame(){
    let rows_c = 10
    let columns_c = 10
    let mines_c = 10
    let minesquantity = false
    
    if(minesquantity){ checkMinesQuantity(rows_c, columns_c, mines_c) }
    
    generateTiles(rows_c, columns_c)
    let mines = generateMines(rows_c, columns_c)
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
            row.appendChild(tile)
        }
        playfield.appendChild(row)
    }
}

function generateMines(rows, columns){




    return mines;
}



