document.getElementById("start_saper").addEventListener("click", saper_start)
let rows
let cols
let co_teraz = 0
let tab_mines
let odwiedzone
document.addEventListener("keydown", function (event) {         // zmiana trybu odkopywanie/oflagowywanie i kolorków
    if (event.keyCode == 32) {
        if (co_teraz == 0) {
            co_teraz = 1
            document.getElementById("main_saper").style.border = "solid 30px #ff0000";
        } else {
            co_teraz = 0
            document.getElementById("main_saper").style.border = "solid 30px #00ff00";
        }
    }
})



function Mine(mine_i, mine_j, boom, cyferka) {
    this.mine_i = mine_i;
    this.mine_j = mine_j;
    this.boom = boom;
    this.cyferka = cyferka
}

function teraz_najgorsze(i, j) {

    for (adj_i = -1; adj_i <= 1; adj_i++) {     //ale ja mondry sam to wymyslieem 100% true
        for (adj_j = -1; adj_j <= 1; adj_j++) {
            if (adj_i + i >= 0 && adj_i + i <= rows - 1 && adj_j + j >= 0 && adj_j + j <= cols - 1) {
                lacznie_cyferka += parseInt(tab_mines[i + adj_i][j + adj_j].boom)
            } else {
            }
        }
    }
    tab_mines[i][j].cyferka = lacznie_cyferka




}
function oho_mine(i, j) {        //kiedy mina kliknięta
    if (tab_mines[i][j].boom == 1) {
        // alert("U died")
        console.log("DED")
        return;
    } else {
        teraz_najgorsze(i, j)
    }

    return;
}

function losuj_liczbe(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function saper_start() {        //zaczyna nową grę


    cols = document.getElementById("inpt_col").value
    rows = document.getElementById("inpt_row").value
    let mines = document.getElementById("inpt_mines").value
    let mines_now = mines

    if ((cols >= 40 || cols <= 10) || (rows >= 30 || rows <= 10) || (mines >= 60 || mines <= 25)) {
        alert("PODAJ POPRAWNE WARTOŚCI: \nkolumny 10-30, wiersze 10-40 miny 25-60")
        return;
    }

    let main_saper = document.getElementById("main_saper")
    let saper_tabela_text = ""
    tab_mines = new Array(rows)
    odwiedzone = new Array(rows)

    let streak = 0
    for (i = 0; i < rows; i++) {          //generowanie tabli razem z minami
        saper_tabela_text += " <tr> "
        tab_mines[i] = new Array(cols)
        odwiedzone[i] = new Array(cols)
        for (j = 0; j < cols; j++) {
            saper_tabela_text += " <td onclick='oho_mine(" + i + ", " + j + ")'></td> "

            let randomowa = losuj_liczbe(0, 10)
            if (mines_now > 0) {
                if (streak == 1) {
                    if (randomowa < 6) {
                        tab_mines[i][j] = new Mine(i, j, 1, null)
                        mines_now--
                    } else {
                        tab_mines[i][j] = new Mine(i, j, 0, null)
                    }
                } else if (streak == 2) {
                    if (randomowa < 4) {
                        tab_mines[i][j] = new Mine(i, j, 1, null)
                        mines_now--
                    } else {
                        tab_mines[i][j] = new Mine(i, j, 0, null)
                    }
                } else {
                    if (randomowa < 2) {
                        tab_mines[i][j] = new Mine(i, j, 1, null)
                        mines_now--
                    } else {
                        tab_mines[i][j] = new Mine(i, j, 0, null)
                    }
                }
            }
        }
        saper_tabela_text += " </tr> "
    }
    main_saper.innerHTML = saper_tabela_text

    while (mines_now > 0) {           // ewentualne uzupełnianie min
        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                if (tab_mines[i][j].boom == 0 && mines_now > 0) {
                    let randomowa = losuj_liczbe(0, 10)
                    if (randomowa < 4) {
                        tab_mines[i][j].boom = 1
                        mines_now--
                    }
                }
            }

        }
    }

    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            for (adj_i = -1; adj_i <= 1; adj_i++) {     //ale ja mondry sam to wymyslieem 100% true
                for (adj_j = -1; adj_j <= 1; adj_j++) {
                    if (adj_i + i >= 0 && adj_i + i <= rows - 1 && adj_j + j >= 0 && adj_j + j <= cols - 1) {
                        lacznie_cyferka += parseInt(tab_mines[i + adj_i][j + adj_j].boom)
                    }
                }
            }
            tab_mines[i][j].cyferka = lacznie_cyferka
        }
    }

    return;
}