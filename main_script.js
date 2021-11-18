document.getElementById("start_saper").addEventListener("click", saper_start)
let rows
let cols
let mines
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



function Mine(mine_i, mine_j, boom, cyferka, flaga) {
    this.mine_i = mine_i;
    this.mine_j = mine_j;
    this.boom = boom;
    this.cyferka = cyferka
    this.flaga = flaga
}

function teraz_najgorsze(i, j) {

    
    if (odwiedzone[j][i] != true && tab_mines[j][i].boom != 1 && !tab_mines[j][i].flaga) {

        odwiedzone[j][i] = true
        now_tr = document.getElementById("i" + i + "j" + j)
        now_tr.setAttribute("class", "odwiedzone")
        switch (tab_mines[j][i].cyferka){
            case 1:
                now_tr.setAttribute("style", "background-image: url('img/1.png');")
                break;
            case 2:
                now_tr.setAttribute("style", "background-image: url('img/2.png');")
                break;
            case 3:
                now_tr.setAttribute("style", "background-image: url('img/3.png');")
                break;
            case 4:
                now_tr.setAttribute("style", "background-image: url('img/4.png');")
                break;
            case 5:
                now_tr.setAttribute("style", "background-image: url('img/5.png');")
                break;
            case 6:
                now_tr.setAttribute("style", "background-image: url('img/6.png');")
                break;
            case 7:
                now_tr.setAttribute("style", "background-image: url('img/7.png');")
                break;
            case 8:
                now_tr.setAttribute("style", "background-image: url('img/8.png');")
                break;
            default:
                now_tr.setAttribute("style", "background-color: red;")
        }
        ile_odwiedzone = 0
        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                if(odwiedzone[i][j] > 0){
                    ile_odwiedzone++
                }

            }
        }
        if(ile_odwiedzone == cols * rows - mines){
            alert("WYGRAŁEŚ JEJ")
        }

        if (tab_mines[i][j].cyferka == 0) {  
            for (adj_i = -1; adj_i <= 1; adj_i++) {     //ale ja mondry sam to wymyslieem 100% true
                for (adj_j = -1; adj_j <= 1; adj_j++) {
                    if (adj_i + i >= 0 && adj_i + i <= rows - 1 && adj_j + j >= 0 && adj_j + j <= cols - 1) {
                        teraz_najgorsze(i + adj_i, j + adj_j)
                    }
                }
            }
        }

        
    }

    // if(tab_mines[j + adj_j][i + adj_j].cyferka == 0){
    //     document.getElementById("i" + i+adj_i + "j" + j+adj_j)
    // }

}
function oho_mine(i, j) {        //kiedy mina kliknięta
    if(co_teraz == 0){
        if (tab_mines[i][j].boom == 1) {
            // alert("U died")
            console.log("DED")
        } else {
            teraz_najgorsze(i, j)
        }
    }else{
        if(!tab_mines[i][j].flaga && odwiedzone == 0){
            document.getElementById("i" + i + "j" + j).setAttribute("style", "background-image: url('img/flag.png');")
            tab_mines[i][j].flaga = true
        }else if(odwiedzone[i][j] > 0){
            document.getElementById("i" + i + "j" + j).setAttribute("style", "background-image: none;")
            tab_mines[i][j].flaga = flase
        }
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
    mines = document.getElementById("inpt_mines").value
    let mines_now = mines

    if ( cols > 30 || cols < 10 || rows > 40 || rows < 10 || mines > 60 || mines < 25 ) {
        alert("PODAJ POPRAWNE WARTOŚCI: \n kolumny 10-30, wiersze 10-40 miny 25-60")
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
            

            saper_tabela_text += " <td id='i"+i+"j"+j+"' onclick='oho_mine(" + i + ", " + j + ")' ></td> "

            let randomowa = losuj_liczbe(0, 10)
            if (mines_now > 0) {
                if (streak == 1) {
                    if (randomowa < 6) {
                        tab_mines[i][j] = new Mine(i, j, 1, null, false)
                        mines_now--
                    } else {
                        tab_mines[i][j] = new Mine(i, j, 0, null, false)
                    }
                } else if (streak == 2) {
                    if (randomowa < 4) {
                        tab_mines[i][j] = new Mine(i, j, 1, null, false)
                        mines_now--
                    } else {
                        tab_mines[i][j] = new Mine(i, j, 0, null, false)
                    }
                } else {
                    if (randomowa < 2) {
                        tab_mines[i][j] = new Mine(i, j, 1, null, false)
                        mines_now--
                    } else {
                        tab_mines[i][j] = new Mine(i, j, 0, null, false)
                    }
                }

            } else {
                tab_mines[i][j] = new Mine(i, j, 0, null, false)
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
    let aaa = 0
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            aaa += tab_mines[i][j].boom
        }
    }
    
    console.log(aaa)
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {

            for (adj_i = -1; adj_i <= 1; adj_i++) {     //ale ja mondry sam to wymyslieem 100% true                
                for (adj_j = -1; adj_j <= 1; adj_j++) {
                    if (adj_i + i >= 0 && adj_i + i <= rows - 1 && adj_j + j >= 0 && adj_j + j <= cols - 1) {
                        if(tab_mines[i+adj_i][j+adj_j].boom == 1){
                            tab_mines[i][j].cyferka += 1
                        }
                        // tab_mines[i][j].cyferka += tab_mines[i+adj_i][j+adj_j].boom
                        console.log(i+adj_i, j+adj_j, tab_mines[i+adj_i][j+adj_j].boom)
                    }
                }
            }
            console.log("----",tab_mines[i][j].cyferka)
        }
    }
    console.log(mines)

    return;
}