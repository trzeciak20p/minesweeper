document.getElementById("start_saper").addEventListener("click", saper_start)
let rows
let cols
let mines
let co_teraz = 0      // 0 - odkopywanie/ 1 - oflagowywanie
let tab_mines
let odwiedzone      //odwiedzone pola
let ile_odwiedzone
let flagi       // oflagowane pola
const main_saper = document.getElementById("main_saper")

document.addEventListener("keydown", function (event) {         // zmiana trybu odkopywanie/oflagowywanie i kolorków
    if (event.keyCode == 32) {          //spacja nie zjeżdża stroną w dół
        event.preventDefault()
    }
    if (event.keyCode == 32 && co_teraz != 2) {
        if (co_teraz == 0) {
            co_teraz = 1
            main_saper.style.border = "solid 30px #0000ff";
        } else {
            co_teraz = 0
            main_saper.style.border = "solid 30px #00ff00";
        }
    }
})
main_saper.addEventListener("contextmenu", function (event) { //prawy przycisk myszy nie otwiera context menu
    event.preventDefault() 
})


function oflagowywanie(i, j){       //oflagowywanie prawym przyciskiem myszy
    if (co_teraz != 2) {    
        if (co_teraz == 0) {          
            co_teraz = 1
            oho_mine(i,j)
            co_teraz = 0
        } else {
            oho_mine(i, j)          
        }
    }
}

function Mine(mine_i, mine_j, boom, cyferka) {
    this.mine_i = mine_i;
    this.mine_j = mine_j;
    this.boom = boom;
    this.cyferka = cyferka
}

document.querySelector("#popdown .d_button").addEventListener("click", function(){
    document.getElementById("popdown").style.display = "none"
})
function alert_ale_lepszy(text){        //popup
    document.getElementById("popdown").style.display = "flex"
    document.querySelector("#popdown span").innerHTML = text

}

function win(){         //wygrana obviously
    main_saper.style.border = "solid 30px #ffff00";
    co_teraz = 2
    alert_ale_lepszy("WYGRAŁEŚ B)")
}

function teraz_najgorsze(i, j) {
    
    
    if (odwiedzone[i][j] != true && tab_mines[i][j].boom != 1 && flagi[i][j] == 0) {
        odwiedzone[i][j] = true
        ile_odwiedzone++
        if(ile_odwiedzone >= cols * rows - mines){      //sprawdzanie czy gracz nie wygrał
            win()
        }
            now_tr = document.getElementById("i" + i + "j" + j)
            now_tr.setAttribute("class", "odwiedzone")
            switch (tab_mines[i][j].cyferka){       //zmiana na cyferkę
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
                    
            }

        if (tab_mines[i][j].cyferka == 0) {         //odkrywanie pobliskich pól (nie dokładne)
            for (adj_i = -1; adj_i <= 1; adj_i++) {     //ale ja mondry sam to wymyslieem 100% true
                for (adj_j = 1; adj_j >= -1; adj_j--) {
                    if (adj_i + i >= 0 && adj_i + i <= rows - 1 && adj_j + j >= 0 && adj_j + j <= cols - 1) {
                        teraz_najgorsze(i + adj_i, j + adj_j)
                    }
                }
            }
        }
        
    }

}

function oho_mine(i, j) {        //kiedy mina kliknięta
    
    if(co_teraz == 0){
        if (tab_mines[i][j].boom == 1) {
            document.getElementById("i" + i + "j" + j).setAttribute("style", "background-image: url('img/mine.png');")
            document.getElementById("i" + i + "j" + j).setAttribute("style", "background-color: #fff")
            main_saper.style.border = "solid 30px #ff0000";
            co_teraz = 2
            alert_ale_lepszy("PRZEGRAŁEŚ")
        } else {        
            flagi[i][j] = 0         //rever kolejność ?                 
            teraz_najgorsze(i, j)
        }
    }else if(co_teraz == 1){
        if(flagi[i][j] == 0){
            if(odwiedzone[i][j] != true){
                document.getElementById("i" + i + "j" + j).setAttribute("style", "background-image: url('img/flag.png');")
                flagi[i][j] = 1
            }
        }else{
            document.getElementById("i" + i + "j" + j).setAttribute("style", "background-image: none;")
                flagi[i][j] = 0
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

    if ( cols > 30 || cols < 10 || rows > 30 || rows < 10 || mines > 90 || mines < 15 ) {
        alert_ale_lepszy("PODAJ POPRAWNE WARTOŚCI: <br/> kolumny 10-30 &nbsp&nbsp wiersze 10-30 &nbsp&nbsp miny 15-90")
        return;
    }

    ile_odwiedzone = 0
    co_teraz = 0
    main_saper.style.border = "solid 30px #00ff00";

    
    let saper_tabela_text = ""
    tab_mines = new Array(rows)

    odwiedzone = new Array(rows)
    flagi = new Array(rows)

    let streak = 0
    for (i = 0; i < rows; i++) {          //generowanie tabli razem z minami
        saper_tabela_text += " <tr> "
        tab_mines[i] = new Array(cols)
        odwiedzone[i] = new Array(cols)
        flagi[i] = new Array(cols)
        for (j = 0; j < cols; j++) {

            saper_tabela_text += " <td id='i"+i+"j"+j+"' onclick='oho_mine(" + i + ", " + j + ")' oncontextmenu='oflagowywanie(" + i + ", " + j + ")' ></td> "
            flagi[i][j] = 0
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

            } else {
                tab_mines[i][j] = new Mine(i, j, 0, null)
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
            for (adj_i = -1; adj_i <= 1; adj_i++) {     
                for (adj_j = -1; adj_j <= 1; adj_j++) {
                    if (adj_i + i >= 0 && adj_i + i <= rows - 1 && adj_j + j >= 0 && adj_j + j <= cols - 1) {
                        tab_mines[i][j].cyferka += tab_mines[i+adj_i][j+adj_j].boom
                        
                    }
                }
            }
        }
    }

    return;
}
