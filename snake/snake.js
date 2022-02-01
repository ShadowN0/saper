class Board {
    constructor(map_width, map_height){
        this.width = map_width
        this.height = map_height
        this.fields_array = []
        this.tiles_on_board = [] // divs that are representation of fields array
        this.snake = []
        this.snake_head = 0
        this.apples = [] //indexes of apples
        this.not_spawned_apples = [] //indexes of not spawned apples
        this.mv_direction_interval
        this.active_direction
        this.eat  // should be equal to '= this.eat_apple()'
        this.stop_apple_spawn = 0
    }

    generate_field(){
        let array_2d = []
        for(let d2 = 0; d2 < this.height; d2++){
            let dim_2 = []
            for(let i = 0; i < this.width; i++){
                dim_2.push(0)
            }
            array_2d.push(dim_2)
        }

        return array_2d
    }

    set_arr_field(){
        this.fields_array = this.generate_field()
    }

    
    render(){
        
        //render field to the screen
        for(let row = 0; row < this.height; row++){
            let row_div = document.createElement('div')
            
            for(let col = 0; col < this.width; col++){
                let col_div = document.createElement('div')
                col_div.classList.add('tile')
                row_div.append(col_div)

                this.tiles_on_board.push(col_div)
            }
            game_div.append(row_div)
        }
    }

    create_snake_head(){
        let cords = this.randomize_start_position()
        let position = cords[0] + cords[1] * this.width
        this.snake_head = position
        this.snake.push(position)

        let head = this.tiles_on_board[position]
        head.style.backgroundColor = 'DarkOrange'

    }
    
    randomize_start_position(){
        //init x and y position of starting element
        let x = Math.floor(Math.random() * this.width)
        let y = Math.floor(Math.random() * this.height)

        let coordinates = []
        coordinates.push(x)
        coordinates.push(y)
        return coordinates
    }

    refresh_snake(){

        //console.log(this.tiles_on_board[this.snake[this.snake.length - 1]])
        //takes the last colored tile, which number is stored in last index of this.snake, and changes it to background color
        this.tiles_on_board[this.snake[this.snake.length - 1]].style.backgroundColor = 'rgb(11, 77, 6)'
        //removes the last element of snake, because it's no longer a part of it
        this.snake.pop()
    }

    render_snake(){
        let head_pos = this.snake_head

        //moves snake head to a newer position
        this.snake.unshift(head_pos)
        this.tiles_on_board[this.snake[0]].style.backgroundImage = ''
        this.tiles_on_board[this.snake[0]].style.backgroundColor = 'DarkOrange'
    }
    
    handle_keypress(board){
        document.addEventListener('keypress', function(e){
            let _this = board
            let key = e.code
            //console.log(key)
            
            //this handles all of the movement and inputs
            _this.movement_handler(_this, key)
        })
    }

    movement_handler(_this, key){
        
        if(key != _this.active_direction){
            clearInterval(_this.mv_direction_interval)
            _this.movement_direction_set(key, _this)
        } 
    }

    movement_direction_set(key, _this){
        if((key == "KeyA" && _this.active_direction == "KeyD") || (key == "KeyD" && _this.active_direction == "KeyA") || (key == "KeyW" && _this.active_direction == "KeyS") || (key == "KeyS" && _this.active_direction == "KeyW")){
            clearInterval(_this.mv_direction_interval)
            alert('zajebałeś mordą w siebie')
            _this.handle_keypress = 0
            _this.movement_handler = function(){
                console.log('you lost, stop trying')
            }
            _this.stop_apple_spawn = 1 
            return
        }

        switch(key){
            case 'KeyA':
                //it's just _this.refresh_and_render_snake(_this, -1) done every 1 second                
                _this.active_direction = 'KeyA'
                _this.mv_direction_interval = setInterval(_this.refresh_and_render_snake, 200, _this, -1)
                
                break

            case 'KeyS':  
                //it's just _this.refresh_and_render_snake(_this, _this.width) done every 1 second                
                _this.active_direction = 'KeyS'
                _this.mv_direction_interval = setInterval(_this.refresh_and_render_snake, 200, _this, _this.width)
       
                break

            case 'KeyD':
                 //it's just _this.refresh_and_render_snake(_this, 1) done every 1 second                
                 _this.active_direction = 'KeyD'
                _this.mv_direction_interval = setInterval(_this.refresh_and_render_snake, 200, _this, 1)
            
                break

            case 'KeyW':
                _this.active_direction = 'KeyW'
                _this.mv_direction_interval = setInterval(_this.refresh_and_render_snake, 200, _this, -_this.width)

                break
                
                default:
                //it's just _this.refresh_and_render_snake(_this, -_this.width) done every 1 second   
                clearInterval(_this.mv_direction_interval)             
                console.log('bruh')
        }
    }

    refresh_and_render_snake(_this, snake_head_pos_offset){

        _this.eat_apple()
        let new_snake_element = _this.snake_head
        if(_this.eat == true){   
            //push new element to the snake array
            _this.snake.push(new_snake_element)
            
            //offset the new head position and render it on screen
            if(_this.detect_collision(_this.snake_head + snake_head_pos_offset) == false){
                clearInterval(_this.mv_direction_interval)
                alert('zajebałeś mordą w ścianę')
                _this.handle_keypress = 0
                _this.movement_handler = function(){
                    console.log('you lost, stop trying')
                }
                _this.stop_apple_spawn = 1 
                return
            }

            _this.snake_head += snake_head_pos_offset
            _this.render_snake()
            
            //delete last element witout coloring to prevent visual bugs
            _this.snake.pop()
        }
        else{
            //delete last element and decolor it, and then offset new_head, add it to array and color tile of it's index
            _this.refresh_snake()

            if(_this.detect_collision(_this.snake_head + snake_head_pos_offset) == false){
                clearInterval(_this.mv_direction_interval)
                alert('zajebałeś mordą w ścianę')
                _this.handle_keypress = 0
                _this.movement_handler = function(){
                    console.log('you lost, stop trying')
                }
                _this.stop_apple_spawn = 1 
                return
            }

            _this.snake_head += snake_head_pos_offset
            _this.render_snake()
        }
    }

    eat_apple(){
        let index_of_eating = this.apples.indexOf(this.snake_head)
        console.log(index_of_eating, this.apples[index_of_eating])
        //it means that there is a collision between head and apple at index == index_of_eating
        if(index_of_eating != -1){
            //console.log(_this.apples)
            
            this.apples.splice(index_of_eating, 1)
            //console.log(_this.apples)
            this.eat =  true
            return
        }

        this.eat = false
    }

    spawn_apple(){
        
        //search for empty spot on map and after that add this position to apples array
        let search_for_spot = true
        let cords 
        let position

        while(search_for_spot){
            cords = this.randomize_start_position()
            position = cords[0] + cords[1] * this.width

            if(this.apples.length == this.tiles_on_board.length - this.snake.length){
                //console.log(this.apples.length, this.tiles_on_board.length, this.snake.length)
                break
            }

            if(this.snake.indexOf(position) == -1 && this.apples.indexOf(position) == -1){
                search_for_spot = false 
                this.apples.push(position)
                this.not_spawned_apples.push(position)
                //console.log('added apple index')
            }
    
        }
        
        
    }

    render_apple(_this){
        if(_this.stop_apple_spawn ==  1){
            return
        }
        //object must be passed, because of the change of context (sees this as a window)

        //adds apple's position to this.apple property
        _this.spawn_apple()
        
        //this colors tile which corresponds to the apple index
        if(_this.not_spawned_apples.length != 0){
            //console.log('apple spawned!')
            let last_tile = _this.not_spawned_apples[_this.not_spawned_apples.length - 1]
            
            _this.tiles_on_board[last_tile].style.backgroundImage = "url('imgs/apple.png')"
            _this.not_spawned_apples.pop()
            
        }
        else{
            //console.log('there is no apple to spawn')
        }

    }

    // set_collision_with_map(){
    //     let borders = []

    //     let border_top = []
    //     let border_bottom = []
    //     let border_right = []
    //     let border_left = []
    //     //top bottom right left
        
    //     //append top and bottom rows to borders[]
    //     for(let row = 0; row < this.width; row++){
    //         border_top.push(row)
    //         border_bottom.push(row + (this.height - 1) * this.width)
    //     }
        
    //     for(let col = 0; col < this.height; col++){
    //         border_left.push(col * this.width)
    //         border_right.push(col * this.width + this.width - 1)
    //     }

    //     borders.push(border_top, border_bottom, border_right, border_left)
    //     this.borders = borders
    // }

    detect_collision(future_head_pos){
       
        if(future_head_pos >= this.width*this.height  || future_head_pos < 0){
            return false
        }

        if(((future_head_pos%this.width == this.snake_head%this.width + this.width - 1) || (future_head_pos%this.width == this.snake_head%this.width - this.width + 1)) && (future_head_pos == this.snake_head+1 || future_head_pos == this.snake_head-1)){
            console.log(future_head_pos, this.snake_head)
            return false
        }

        if(this.snake.indexOf(future_head_pos) != -1){
            return false
        }
        
        return true
    }

}


let game_div = document.getElementById('game_div')

//create instance of a game
let board = new Board(20, 15)
console.log(board)

//make array of zeroes and render it to screen
board.set_arr_field()
board.render()
console.table(board.fields_array)

//sets this.borders
//board.set_collision_with_map()

//randomize starting position
board.create_snake_head()

//keypress handler
board.handle_keypress(board)

//spawns and renders apple once every x time
let spawner = setInterval(board.render_apple, 3000, board)
