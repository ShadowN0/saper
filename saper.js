class TileObj {
    constructor(bomb, flag, x, y, length_of_row, height_of_col, visible_tile){
        this.bomb = bomb
        this.flag = flag
        this.x = x
        this.y = y
        this.row_len = length_of_row
        this.col_height = height_of_col
        this.visible_tile = visible_tile
        this.uncovered = 0
    }

    danger(){
        let mines_around = 0

        for(let n = -1; n<2; n++){    
            if(this.y+n > -1 && this.y+n < this.col_height){
                for(let i = -1; i<2; i++){
                    if(this.x+i > -1 && this.x+i < this.row_len){
                        mines_around += board.tiles[(this.x + i + ((this.y + n)*this.row_len))].bomb
                    }
                }
            }
        }

        return mines_around
    }

    make_danger_property(){
        this.mines_around = this.danger()
    }

    map_tiles_around(){
        let tiles_around = [] 

        for(let n = -1; n<2; n++){    
            if(this.y+n > -1 && this.y+n < this.col_height){
                for(let i = -1; i<2; i++){
                    if(this.x+i > -1 && this.x+i < this.row_len){
                        tiles_around.push(board.tiles[(this.x + i + ((this.y + n)*this.row_len))])
                    }
                }
            }
        }
        return tiles_around
    }


}

const board = {
    initiate : function(x,y,bombs){
        this.x = x
        this.y = y
        this.bombs = bombs
        this.tiles = []
        this.bomb_pos_taken = []
        this.highscores = []
    },

    generate : function(){
        // console.log(this) zwraca obiekt
        let game_div = document.getElementById('game_div')
        
        for(let row = 0; row < this.y; row++){
            let row_div = document.createElement('div')

            for(let col = 0; col < this.x; col++){
                let blank_img = document.createElement('img')
                blank_img.setAttribute('src', 'imgs/klepa.png')
                blank_img.classList.add('img')

                let col_div = document.createElement('div')
                col_div.classList.add('tile')
                col_div.append(blank_img)

                row_div.append(col_div)

                //tworzenie listy obiektów
                let tile = new TileObj(0, 0, col, row, this.x, this.y, col_div)
                this.tiles.push(tile)
                //tworzenie listy obiektów
            }
            game_div.append(row_div)
        } 
        //setting bombs
        let amount_of_tiles = this.tiles.length
        let random_tile = Math.floor(Math.random() * amount_of_tiles)
        this.bomb_pos_taken.push(random_tile)
        console.log(random_tile)

        this.set_bombs(this.bombs-1)

        for(let i = 0; i<this.bomb_pos_taken.length; i++){
            this.tiles[this.bomb_pos_taken[i]].bomb = 1
        }
    },

    set_bombs : function(bombs){  
        if(bombs == 0){
            console.log("koniec")
            return 0
        }
        else{
            let amount_of_tiles = this.tiles.length
            let random_tile = Math.floor(Math.random() * amount_of_tiles)
            console.log("to jest random tile --->", random_tile)
            //random number generated
    
            for(let i = 0; i<this.bomb_pos_taken.length; i++){
                if(this.bomb_pos_taken[i] == random_tile){
                    console.log("przedwczesnie", this.bomb_pos_taken[i], "---to-jest-random-tile-->", random_tile)
                    return this.set_bombs(bombs)
                }
            }

            this.bomb_pos_taken.push(random_tile)
            console.log("tutaj jest rekurencja z -1")
            return this.set_bombs(bombs-1)           
        } 
    },

    check_uncovered_tiles : function(){
        let uncovered_tiles = 0

        for(let tile_index = 0; tile_index < this.tiles.length; tile_index++){
            if(this.tiles[tile_index].uncovered == 1){
                uncovered_tiles += 1
            }
        }

        if(uncovered_tiles == this.tiles.length-this.bombs){
            return true
        }

        return false
    },

    initiate_field: function(e){
        e.preventDefault()
        timer_started = 0
        let input_x = document.getElementById('x_input').value
        let input_y = document.getElementById('y_input').value
        let input_bombs = document.getElementById('bombs_input').value
        if((input_bombs > 2 || (input_x > 1 && input_y > 1)) && (input_bombs < input_x*input_y)){
            if(game_div.children.length != 0){
                for(let child = game_div.children.length-1; child > -1; child--){
                game_div.children[child].remove()
                }
                try {
                    clearInterval(clock_tick)
                }catch{
                    console.log("the timer was already cleared")
                }
                game_div.addEventListener('click', board.check_bomb)
            }
        
            time.textContent = "Time - 00:00"
            bombs_left_text.textContent = "Bombs left: " + input_bombs
    
            board.initiate(input_x, input_y, input_bombs)
            //let form = document.getElementById('handleform')
            //form.parentNode.removeChild(form)

            board.generate()
            board.mine_radar()
            board.flags_on()
            console.log(board)
        }
        else{
            alert("podaj bardziej sensowne wartości")
        }
    },

    mine_radar : function(){
        for(let t = 0; t<board.tiles.length; t++){
            board.tiles[t].make_danger_property()
        }
    },

    check_bomb : function(e){
        if(timer_started == 0){
            timer_started = 1 
            board.start_clock()
        }
    
        console.log(e.target.parentNode);  // to get the element
        let clicked = e.target.parentNode
        let current_tile
    
        for(let i = 0; i<board.tiles.length; i++){
            if(clicked === board.tiles[i].visible_tile){
                current_tile = board.tiles[i]
                console.log(current_tile)
            }
        }
        board.bomb_control(current_tile)
    },

    flags_on : function(){
        for(let len = 0; len<board.tiles.length; len++){
            board.tiles[len].visible_tile.addEventListener('contextmenu', board.set_flag)
        }
    },

    set_flag : function(e){
        if(timer_started == 0){
            timer_started = 1 
            board.start_clock()
        }
        console.log(e.target.parentNode, "right clicked");  // to get the element
        let clicked = e.target.parentNode
        let current_tile
        
        for(let i = 0; i<board.tiles.length; i++){
            if(clicked === board.tiles[i].visible_tile){
                current_tile = board.tiles[i]
                console.log(current_tile)
            }
        }
    
        if(current_tile.flag == 0){
            current_tile.flag = 1
            board.flag_control(current_tile)
        }
        else{
            current_tile.flag = 0
            board.flag_control(current_tile)
        }
    },

    flag_control : function(tile){
        console.log(tile)
        let img = tile.visible_tile.children[0]
        let flags_set = 0
    
        for(let i = 0; i<board.tiles.length; i++){
            if(board.tiles[i].flag == 1){
                flags_set += 1
            }
        }
    
        
        if(tile.flag == 0){
            img.setAttribute('src', 'imgs/klepa.png') 
        }
        else{
            img.setAttribute('src', 'imgs/flaga.png')
        }
    
        bombs_left_text.textContent = "Bombs (probably) left: " + (board.bombs - flags_set)
        if(flags_set == 0){
            bombs_left_text.textContent = "Bombs left: " + (board.bombs - flags_set)
        }
    },

    bomb_control : function(tile){
        let img = tile.visible_tile.children[0]
        console.log(tile, img, "to jest tile i img")
    
        if(tile.bomb == 1){
            img.setAttribute('src', 'imgs/bomb.png')
            board.game_over(tile.x, tile.y)
        }
        else{
            switch(tile.mines_around){
                case 1:
                    img.setAttribute('src', 'imgs/jeden.png')
                    tile.uncovered = 1
                    break
                case 2:
                    img.setAttribute('src', 'imgs/dwa.png')
                    tile.uncovered = 1
                    break
                case 3:
                    img.setAttribute('src', 'imgs/trzy.png')
                    tile.uncovered = 1
                    break
                case 4:
                    img.setAttribute('src', 'imgs/cztery.png')
                    tile.uncovered = 1
                    break
                case 5:
                    img.setAttribute('src', 'imgs/piec.png')
                    tile.uncovered = 1
                    break
                case 6:
                    img.setAttribute('src', 'imgs/szesc.png')
                    tile.uncovered = 1
                    break
                case 7:
                    img.setAttribute('src', 'imgs/siedem.png')
                    tile.uncovered = 1
                    break
                case 8:
                    img.setAttribute('src', 'imgs/osiem.png')
                    tile.uncovered = 1
                    break
    
                default: //zero bombs around this tile, need to uncover values on tiles that are also zeroes (have 0 mines around them) 
                    img.setAttribute('src', 'imgs/zero.png')
                    let around = tile.map_tiles_around()                    
                    
                    for(let obj = 0; obj<around.length; obj++){
                        if(around[obj].bomb == 0 && around[obj].uncovered == 0){
                            tile.uncovered = 1
                            board.bomb_control(around[obj])
                        }
                    }
                    break
            }
        }
        tile.visible_tile.removeEventListener('contextmenu', board.set_flag)
    
        board.check_win_condition()
    },

    //it takes position of bomb that made you lose the game
    game_over : function(pos_x, pos_y){
        clearInterval(clock_tick)
        let tiles = board.tiles             

        for(let i = 0; i<tiles.length; i++){
            if((tiles[i].x != pos_x || tiles[i].y != pos_y) && tiles[i].bomb == 1){
                let img = tiles[i].visible_tile.children[0]                     //img is tile.visible_tile.children[0] ---- that means that it's html img element inside of this tile obj
                img.setAttribute('src', 'imgs/pbomb.png')
            }
        }

        game_div.removeEventListener('click', board.check_bomb)
        alert("Przegrałeś!")
    },

    set_cookie_record : function(){
        alert("Zwycięstwo!")

        //cookie expiration date
        const daysToExpire = new Date(2147483647 * 1000).toUTCString()

        let time_scored = time_data.innerText       
        let game_format = board.x + 'x' + board.y + 'y' + board.bombs + 'b'
        let nickname = prompt('Podaj swój nick by zapisać lokalnie wynik!')
        console.log(time_scored)

        document.cookie = nickname + '=' + time_scored + '=' + game_format + '; expires=' + daysToExpire
        console.log(document.cookie)
    },

    read_cookies : function(){
        //nickname -- time -- game format
        let data_array = this.parse_cookies()
        let format_array = []

        for(let format = 0; format<data_array.length; format++){
            let split_data_node = data_array[format][2]
            format_array.push(split_data_node)
        }

        unique_format_array = format_array.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })

        for(let types = 0; types<unique_format_array.length; types++){
            let div = document.createElement('div')
            console.log('UNIQUE FORMAT ARRAY', unique_format_array)
            let name = document.createElement('h2')
            name.textContent = "--- || game format " + unique_format_array[types] +" || ---"
            div.append(name)
            
            for(let score = 0; score<data_array.length; score++){
                if(data_array[score][2] == unique_format_array[types]){
                    let vis_score_data = data_array[score]
                    let element = document.createElement('p')
                    element.textContent = "||" + vis_score_data + "||"
                    div.append(element)
                }
            }
            console.log("APPENDED DIV")
            top_scores.append(div)
        }
    },

    parse_cookies : function(){
        let cookies = decodeURIComponent(document.cookie);
        cookies = cookies.split(';')
        records = []
        correct_order = []
        correct_record_order = []

        for(let record = 0; record<cookies.length; record++){
            let name_score_format = cookies[record].split('=')
            if(name_score_format.length == 3){
                records.push(name_score_format)
            }          
        }

        for(let time = 0; time<records.length; time++){
            let record = records[time][1]
            let sec_mili = record.split(':')
            
            //0 seconds, 1 miliseconds
            sec_mili[0] = parseInt(sec_mili[0])
            sec_mili[1] = parseInt(sec_mili[1])


            let value = sec_mili[0]*100 + sec_mili[1]
            correct_order.push(value)
        }
        
        correct_order = correct_order.sort(
            function(a, b){
                return a-b
            })

        console.log(correct_order, "to jest correct order")
        

        for(let val = 0; val<correct_order.length; val++){
            for(let index = 0; index<correct_order.length; index++){
                let record = records[index][1]
                let sec_mili = record.split(':')
                
                //0 seconds, 1 miliseconds
                sec_mili[0] = parseInt(sec_mili[0])
                sec_mili[1] = parseInt(sec_mili[1])
                let value = sec_mili[0]*100 + sec_mili[1]            
                
                if(correct_order[val] == value){
                    console.log(correct_order[val], value, "tak")
                    correct_record_order.push(records[index])
                }
            }

        }

        return(correct_record_order)
    },

    check_win_condition : function(){
        if(board.check_uncovered_tiles() == true){
            clearInterval(clock_tick)

            for(let i = 0; i<board.tiles.length; i++){
                if(board.tiles[i].bomb == 1){
                    let img = board.tiles[i].visible_tile.children[0]
                    img.setAttribute('src', 'imgs/flaga.png')
                }
            }
    
            game_div.removeEventListener('click', board.check_bomb)            
            board.set_cookie_record()
            for(let top = top_scores.children.length-1; top > -1; top--){
                top_scores.children[top].remove()
            }
            board.read_cookies()
        }
    },

    start_clock : function(){
        let first_tick_milliseconds = Date.now()
        
        
        clock_tick = setInterval(board.time_passed, 5, first_tick_milliseconds)
    },

    time_passed : function(first_tick_milliseconds){
        let now = Date.now()
    
        //time since start in milliseconds
        let delta_time = now - first_tick_milliseconds
    
        let seconds = Math.floor(delta_time/1000)
        let milliseconds = Math.floor(delta_time/10) - seconds*100
    
    
        time_data.textContent = seconds + ':' + milliseconds
        time.textContent = "Time <---> " + seconds + " : " + milliseconds
    }
    

}


///////////////////////////////////////////////////////////this-is-game-code///////////////////////////////////////////////////////////////
let bombs_left_text = document.getElementById('bombs_left')
let time = document.getElementById('time')
let time_data = document.getElementById('time_data')
let top_scores = document.getElementById('top_scores')
let submit_bt = document.getElementById('submit_button')

window.addEventListener('contextmenu', function(e){
    e.preventDefault()
})

board.read_cookies()
submit_bt.addEventListener('click', board.initiate_field)

game_div.addEventListener('click', board.check_bomb)
///////////////////////////////////////////////////////////this-is-game-code///////////////////////////////////////////////////////////////
