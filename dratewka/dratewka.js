class Location {
    constructor(description, image, color, x, y, directions){
        this.description = description
        this.image = image
        this.color = color
        this.directions = directions
        this.x = x
        this.y = y
        this.items = []
    }
}

class Item {
    constructor(id, display_name, type, item_name){
        this.id = id
        this.display_name = display_name
        this.type = type
        this.name = item_name
    }
}

map = {
    all_items: [],
    location_list: [],
    current_location: 27,
    current_location_object: null,
    sheep_items_used: 0,
    dragon_killed: 0,
    V_or_G_on: 0,

    init_game: function(){
        game_div.style.visibility = "visible"
        game_div.style.display = "block"
        this.make_location()
        this.make_items()
        this.get_current_location()
        this.render_location()
        this.focus_input()
        this.add_enter_submission()
    },

    make_location: function(){
        let length = locations.length
        
        for (let i = 0; i < length; i++){
            
            let location = new Location(locations[i].description, locations[i].img, locations[i].color, locations[i].x, locations[i].y, locations[i].directions)
            this.location_list.push(location)
        
            if(location.x == 7 && location.y == 4){
                this.location_list.push("nie ma takiej lokacji")
                this.location_list.push("nie ma takiej lokacji")
                this.location_list.push("nie ma takiej lokacji")
            }
            if(location.x == 7 && location.y == 5){
                this.location_list.push("nie ma takiej lokacji")
                this.location_list.push("nie ma takiej lokacji")
                this.location_list.push("nie ma takiej lokacji")
            }
        }


    },

    make_items: function(){
        for(i in items){
            let item = new Item(items[i].id, items[i].display_name, items[i].type, items[i].name)

            this.place_item(item)
            this.all_items.push(item)
        }
    },

    place_item: function(item){
        if(item.id == 31){
            //13 - YX
            let location_position = 2
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 27){
            //15 - YX
            let location_position = 4
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 14){
            //17 - YX
            let location_position = 6
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 10){
            //23 - YX
            let location_position = 9
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 18){
            //27 - YX
            let location_position = 13
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 32){
            //32 - YX
            let location_position = 15
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 21){
            //44 - YX
            let location_position = 24
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 33){
            //55 - YX
            let location_position = 32
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 24){
            //64 - YX
            let location_position = 38
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
    },

    get_current_location: function(){
        let x = player.x
        let y = player.y

        this.current_location = (y-1)*7 + x-1
        this.current_location_object = this.location_list[this.current_location]
    },

    render_location: function(){
        this.remove_previous_location()

        let description = this.current_location_object.description
        let color = this.current_location_object.color
        let img = this.current_location_object.image

        let description_element = document.createElement('h2')
        description_element.textContent = description

        let img_element = document.createElement('img')
        img_element.setAttribute('src', `./img/${img}`)
        img_element.style.backgroundColor = color

        //let img_compass = document.createElement('img')
        let img_compass = document.createElement('div')
        img_compass.style.backgroundImage = 'url(./img/kompas.bmp)'
        img_compass.style.width = "300px"
        img_compass.style.height = "150px"
        img_compass.style.backgroundPosition = "center"
        img_compass.style.backgroundRepeat = "no-repeat"
        img_compass.style.backgroundSize = "cover"

        //img_compass.setAttribute('src', `./img/kompas.bmp`)
        img_compass.style.top = "100px"
        img_compass.style.border = "0px"
        img_compass.style.position = "absolute"
        img_compass.style.display = "inline-block"
        

        let north = document.createElement('img')
        north.setAttribute('src', `./img/N.png`)
        north.style.width = "30px"
        north.style.height = "20px"
        north.style.border = "0px"
        north.style.position = "absolute"
        north.style.left = "120px"
        north.style.top = "-10px"
        north.style.marginTop = "0px"

        let south = document.createElement('img')
        south.setAttribute('src', `./img/S.png`)
        south.style.width = "30px"
        south.style.height = "30px"
        south.style.border = "0px"
        south.style.position = "absolute"
        south.style.left = "135px"
        south.style.top = "130px"
        south.style.marginTop = "0px"

        let east = document.createElement('img')
        east.setAttribute('src', `./img/E.png`)
        east.style.width = "30px"
        east.style.height = "30px"
        east.style.border = "0px"
        east.style.position = "absolute"
        east.style.left = "260px"
        east.style.top = "30px"
        east.style.marginTop = "0px"

        let west = document.createElement('img')
        west.setAttribute('src', `./img/W.png`)
        west.style.width = "30px"
        west.style.height = "30px"
        west.style.border = "0px"
        west.style.position = "absolute"
        west.style.left = "0px"
        west.style.top = "30px"
        west.style.marginTop = "0px"
        

        for(const dir of map.current_location_object.directions){
            switch(dir){
                case "west":
                    img_compass.append(west)
                    break
                case "east":
                    img_compass.append(east)
                    break
                case "south":
                    img_compass.append(south)
                    break
                case "north":
                    img_compass.append(north)
                    break
                
            }
        }
        



        let directions_element = document.createElement('h2')
        //make a function that identifies attribute - directions_to_go in locations object 
        directions_element.textContent = "You can go: "
        for(let i in this.current_location_object.directions){
            directions_element.textContent += this.current_location_object.directions[i].toUpperCase()
            if(i == this.current_location_object.directions.length - 1){
                directions_element.textContent += "  "
            }
            else{
                directions_element.textContent += ",  "
            }
        }

        let items_visible_element = document.createElement('h2')
        if(this.current_location_object.items.length == 0){
            items_visible_element.textContent = "You see nothing"
        }
        else{
            items_visible_element.textContent = "You see:"
            for(let i in this.current_location_object.items){
                items_visible_element.textContent += this.current_location_object.items[i].display_name
                if(i == this.current_location_object.items.length - 1){
                    items_visible_element.textContent += " "
                }
                else{
                    items_visible_element.textContent += ", "
                }
            }
        }

        let player_items_element = document.createElement('h2')
        
        if(player.items.length == 0){
            player_items_element.textContent = "You are carrying nothing"
        }
        else{
            player_items_element.textContent = "You carry: "

            for(let i in player.items){

                player_items_element.textContent += player.items[i].display_name
                if(i == player.items.length - 1){
                    player_items_element.textContent += " "
                }
                else{
                    player_items_element.textContent += ", "
                }
            }
        }

        content.append(description_element)
        content.append(img_element)
        content.append(img_compass)

        let directions_see_carry = document.createElement('div')
        directions_see_carry.setAttribute('id', "additional_info")
        content.append(directions_see_carry)

        directions_see_carry.append(directions_element)
        directions_see_carry.append(items_visible_element)
        directions_see_carry.append(player_items_element)
    },

    remove_previous_location: function(){
        let content_list = content.children
        let length = content_list.length
        console.log(content_list)

        if(length > 0){
            for(let i = length - 1; i >= 0; i--){
                content_list[i].remove()
            }
        }
        
    },

    focus_input: function(){
        document.addEventListener('click', function(){
            input.focus()
        })
        document.addEventListener('keydown', function(){
            input.focus()
            input.value = input.value.toUpperCase()
        })
        document.addEventListener('keyup', function(){
            input.value = input.value.toUpperCase()
        })
    },

    add_enter_submission: function(){
        document.addEventListener('keydown', function(e){
            let code = e.code
            console.log(code)

            if(code == "Enter" || code == "NumpadEnter"){
                map.command = input.value
                
                console.log(map.command)
                map.item_command_handler()

                map.command = map.command.toLowerCase()
                //needs to wait for 3 seconds
                map.map_movement_handler()

                window.setTimeout(function(){
                    input.value = ""

                    if(map.V_or_G_on != 1){
                        map.get_current_location()
                        map.render_location()
                    }                    
                }, 2000)

                
                
            }
        })
    },

    item_command_handler: function(){
        console.log(this.current_location_object.items.length)

        if((map.command.includes("drop ") || (map.command[0] == "D" && map.command[1] == " ") || map.command.includes("DROP ")) && this.current_location_object.items.length >= 3){
            map.timeout_dots("There are already too many items on the ground\n")
        }
        else if(map.command.includes("drop ") || (map.command[0] == "D" && map.command[1] == " ") || map.command.includes("DROP ")){
            
            let item_name
            if(map.command[0] == "D" && map.command[1] == " "){
                item_name = map.command.substring(2, map.command.length)
            }
            else{
                item_name = map.command.substring(5, map.command.length)
            }

            console.log(item_name)

            let dropped_item
            if(player.items.length > 0){
                for(let index in player.items){
                    if(player.items[index].name == item_name){
                        dropped_item = player.items[index]

                        player.items.splice(index, 1)
                        this.current_location_object.items.push(dropped_item)
                        map.timeout_dots(`You've dropped ${dropped_item.display_name}\n`)
                    }
                }

                if(dropped_item == undefined){
                    map.timeout_dots("You do not have such an item\n")
                }
                
            }
            else if(player.items.length == 0){
                map.timeout_dots("You do not carry any items\n")
            }
            else if(dropped_item == undefined){
                map.timeout_dots("You do not have such an item\n")
            }
        }
        else if((map.command.includes("take ") || (map.command[0] == "T" && map.command[1] == " ") || map.command.includes("TAKE ")) && player.items.length == 1){
            map.timeout_dots("You can't carry more items\n")
        }
        else if(map.command.includes("take ") || (map.command[0] == "T" && map.command[1] == " ") || map.command.includes("TAKE ")){
           
            let item_name
            if(map.command[0] == "T" && map.command[1] == " "){
                item_name = map.command.substring(2, map.command.length)
            }
            else{
                item_name =  map.command.substring(5, map.command.length)
            }

            item_name = item_name.trim()

            console.log(this.current_location_object.items.length > 0)

            if(this.current_location_object.items.length > 0){

                for(let index in this.current_location_object.items){

                    console.log(this.current_location_object.items[index].name == item_name, item_name, this.current_location_object.items[index].name)

                    let taken_item
                    if(this.current_location_object.items[index].name == item_name){
                        taken_item = this.current_location_object.items[index]

                        this.current_location_object.items.splice(index, 1)
                        player.items.push(taken_item)
                        map.timeout_dots(`You picked up ${taken_item.display_name}`)
                    }
                    else{
                        map.timeout_dots(`there is not an item like that ${taken_item.display_name}`)
                    }
                }
                // map.timeout_dots(`You picked up ${taken_item}`)
            }


            else{
                map.timeout_dots("There are no items to take\n")
            }
        }

        else if(map.command.includes("use ") || (map.command[0] == "U" && map.command[1] == " ") || map.command.includes("USE ")){
            let item_name = map.command.substring(4, map.command.length)
            item_name = item_name.trim()

            let x = this.current_location_object.x
            let y = this.current_location_object.y

            let location_number = (y-1)*7 + x-1
            let result_item;


            if(location_number == 33 && player.items[0].id == 10){
                result_item = this.return_item_of_given_id(11)

                player.items.shift()
                player.items.push(result_item)
                map.timeout_dots("You opened a tool shed and took an axe\n")
            }
            else if(location_number == 41 && player.items[0].id == 11){
                result_item = this.return_item_of_given_id(12)
                console.log(result_item)

                player.items.shift()
                player.items.push(result_item)
                map.timeout_dots("You cut sticks for sheeplegs\n")
            }
            else if(location_number == 23 && player.items[0].id == 12){
                result_item = this.return_item_of_given_id(13)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
                map.timeout_dots("You prepared legs for your fake sheep\n") 
            }
            else if(location_number == 17 && player.items[0].id == 14){
                result_item = this.return_item_of_given_id(15)

                player.items.shift()
                player.items.push(result_item)
                map.timeout_dots("The tavern owner paid you money\n")
            }
            else if(location_number == 20 && player.items[0].id == 15){
                result_item = this.return_item_of_given_id(16)

                player.items.shift()
                player.items.push(result_item)
                map.timeout_dots("The cooper sold you a new barrel\n")
            }
            else if(location_number == 23 && player.items[0].id == 16){
                result_item = this.return_item_of_given_id(17)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
                map.timeout_dots("You made a nice sheeptrunk\n")
            }
            else if(location_number == 19 && player.items[0].id == 18){
                result_item = this.return_item_of_given_id(19)

                player.items.shift()
                player.items.push(result_item)
                map.timeout_dots("The butcher gave you wool\n")
            }
            else if(location_number == 23 && player.items[0].id == 19){
                result_item = this.return_item_of_given_id(20)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
                map.timeout_dots("You prepared skin for your fake sheep\n")
            }
            else if(location_number == 34 && player.items[0].id == 21){
                result_item = this.return_item_of_given_id(22)

                player.items.shift()
                player.items.push(result_item)
                map.timeout_dots("You used your tools to make a rag\n")
            }
            else if(location_number == 23 && player.items[0].id == 22){
                result_item = this.return_item_of_given_id(23)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
                
                map.timeout_dots("You made a fake sheephead\n")
            }
            else if(location_number == 0 && player.items[0].id == 24){
                result_item = this.return_item_of_given_id(25)

                player.items.shift()
                player.items.push(result_item)
                informations.innerText = "You are digging..."
                window.setTimeout(function(){
                    informations.innerText += "\nand digging..."
                }, 600)
                window.setTimeout(function(){
                    informations.innerText += "\n That's enough sulfur for you\n"
                }, 1200)
                
            }
            else if(location_number == 23 && player.items[0].id == 25){
                result_item = this.return_item_of_given_id(26)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
                map.timeout_dots("You prepared a solid poison\n")
            }
            else if(location_number == 7 && player.items[0].id == 27){
                result_item = this.return_item_of_given_id(28)

                player.items.shift()
                player.items.push(result_item)
                map.timeout_dots("You got a bucket full of tar\n")
            }
            else if(location_number == 23 && player.items[0].id == 28){
                result_item = this.return_item_of_given_id(29)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
                map.timeout_dots("You prepared a liquid poison\n")
            }
            else if(location_number == 23 && player.items[0].id == 37){
                result_item = this.return_item_of_given_id(30)

                this.dragon_killed = 1

                player.items.shift()
                this.current_location_object.items.push(result_item)

                informations.innerText = "The dragon noticed your gift..."
                window.setTimeout(function(){
                    informations.innerText += "\nThe dragon ate your sheep..."
                }, 600)
                window.setTimeout(function(){
                    informations.innerText += "\n AND DIED!!!"

                    map.location_list[map.current_location].image = "dead.bmp"
                    
                    map.render_location()
                }, 1200)


            }
            else if(location_number == 23 && player.items[0].id == 33 && this.dragon_killed == 1){
                result_item = this.return_item_of_given_id(34)

                player.items.shift()
                player.items.push(result_item)
                map.timeout_dots("You cut a piece of dragon's skin\n")
            } 
            else if(location_number == 34 && player.items[0].id == 34){
                result_item = this.return_item_of_given_id(35)

                player.items.shift()
                this.current_location_object.items.push(result_item)
                map.timeout_dots("You used your tools to make shoes\n")
            }
            else if(location_number == 21 && player.items[0].id == 35){
                result_item = this.return_item_of_given_id(36)

                player.items.shift()
                this.current_location_object.items.push(result_item)
                map.timeout_dots("The King is impressed by your shoes\n")

                window.setTimeout(function(){
                    this.ending_screen()
                }, 1600)
            }
            
            else{
                informations.innerText = "nothing happened...\n"
            }
   
            if(this.sheep_items_used == 6){
                this.current_location_object.items = []

                this.sheep_items_used += 1

                result_item = this.return_item_of_given_id(37)
                player.items.push(result_item)
                map.timeout_dots("Your fake sheep is full of poison and ready to be eaten by the dragon\n")
            }  
            
            
        }
        else if((map.command[0] == "V" && map.command[1] == " ") || map.command.includes("VOCABULARY")){
            map.V_or_G_on = 1

            let additional_info = document.getElementById('additional_info')
            additional_info.style.visibility = "hidden"
            
            input.style.visibility = "hidden"
            what_now.textContent = ""

            informations.innerText = ""
            informations.innerText += "NORTH or N, SOUTH or S"
            informations.innerText += "\nWEST or W, EAST or E"
            informations.innerText += "\nTAKE (object) or T (object)"
            informations.innerText += "\nDROP (object) or D (object)"
            informations.innerText += "\nUSE (object) or U (object)"
            informations.innerText += "\nGOSSIPS or G, VOCABULARY or V"
            informations.innerText += "\nPress any key"

            window.setTimeout(function(){
                window.addEventListener('keydown', map.wait_for_key)
            }, 300)           
        }
        else if((map.command[0] == "G" && map.command[1] == " ") || map.command.includes("GOSSIPS")){
            map.V_or_G_on = 1

            let additional_info = document.getElementById('additional_info')
            additional_info.style.visibility = "hidden"
            
            input.style.visibility = "hidden"
            what_now.textContent = ""

            informations.innerText = ""
            informations.innerText += "The  woodcutter lost  his home key..."
            informations.innerText += "\nThe butcher likes fruit... The cooper"
            informations.innerText += "\nis greedy... Dratewka plans to make a"
            informations.innerText += "\npoisoned  bait for the dragon...  The"
            informations.innerText += "\ntavern owner is buying food  from the"
            informations.innerText += "\npickers... Making a rag from a bag..."
            informations.innerText += "\nPress any key"
            //informations.textContent = ""  <---- it works 

            window.setTimeout(function(){
                window.addEventListener('keydown', map.wait_for_key)
            }, 300)
        }
        else {
            map.timeout_dots("there is no such a command\nto check what you can type in or do: VOCABULARY (V) or GOSSIPS (G)\n")
        }
        
    },

    timeout_dots: function(text){
        window.setTimeout(function(){
            informations.innerText += "\n."
        }, 400)
        window.setTimeout(function(){
            informations.innerText += "."
        }, 800)
        window.setTimeout(function(){
            informations.innerText += "."
        }, 1200)

        window.setTimeout(function(){
            informations.innerText += text
        }, 1600)
    },

    ending_screen: function(){

        let FREDI_FNAF = new Audio('./img/win_music.mp3')
        FREDI_FNAF.play()

        let play_music = setInterval(function(){
            let FREDI_FNAF = new Audio('./img/win_music.mp3')
            FREDI_FNAF.play()
        }, 11000)


        let children = game_div.children
        console.log(children)
        for(let i = children.length-1; i>=0; i--){
            children[i].remove()
        }
    
        let x = setInterval(() => {
            console.log(i)
            let slider = document.createElement('div')
            slider.style.animationName = "you_won"
            slider.style.animationDuration = "2s"
            slider.style.position = "absolute"
            slider.style.animationIterationCount = "infinite"
            slider.textContent = "YOU WON!"

            let x = Math.random() * window.innerWidth * 0.9
            let y = Math.random() * window.innerHeight 
            
            slider.style.top = `${y}px`
            slider.style.left = `${x}px`

            game_div.append(slider)
        }, 100)
    
    },

    return_item_of_given_id: function(item_id){
        for(let i in this.all_items){
            if(this.all_items[i].id == item_id){
                return this.all_items[i]
            }
        }
    },

    wait_for_key: function(){
        let additional_info = document.getElementById('additional_info')
        additional_info.style.visibility = "visible"

        input.style.visibility = "visible"
        what_now.textContent = "what now?"

        informations.textContent = ""
        map.V_or_G_on = 0

        window.removeEventListener('keydown', map.wait_for_key)
    },

    map_movement_handler: function(){
        if(this.command == "east" || this.command == "e"){
            if(player.x < 7 && (this.check_directions_available() == true)){
                
                //informations.textContent = "You are going east..."
                let what_now = document.getElementById('what_now')
                let input = document.getElementById('input')
                input.style.visibility = "hidden"
                what_now.textContent = ""

                window.setTimeout(function(){
                    informations.textContent = "You are going east."
                }, 400)
                window.setTimeout(function(){
                    informations.textContent = "You are going east.."
                }, 800)
                window.setTimeout(function(){
                    informations.textContent = "You are going east..."
                }, 1200)
                window.setTimeout(function(){
                    informations.textContent = ""
                    player.x += 1
                    input.style.visibility = "visible"
                    what_now.textContent = "what now?"
                }, 1600)
                
            }
            else{
                informations.textContent = "You can't go that way (east)"
            }
        }

        else if(this.command == "west" || this.command == "w"){
            console.log(this.check_directions_available())

            if(player.x > 1  && (this.check_directions_available() == true)){
                if(!(player.y > 4 && player.x - 1 < 4)){

                    if(map.current_location == 23 && map.dragon_killed == 0){
                        map.timeout_dots("You can't go that way\n")
                        window.setTimeout(function(){
                            informations.innerText += "\n"
                            map.timeout_dots("The dragon sleeps in a cave!\n")
                        }, 1600)
                        
                    }
                    else{
                        let what_now = document.getElementById('what_now')
                        let input = document.getElementById('input')
                        input.style.visibility = "hidden"
                        what_now.textContent = ""
        
                        window.setTimeout(function(){
                            informations.textContent = "You are going west."
                        }, 400)
                        window.setTimeout(function(){
                            informations.textContent = "You are going west.."
                        }, 800)
                        window.setTimeout(function(){
                            informations.textContent = "You are going west..."
                        }, 1200)
                        window.setTimeout(function(){
                            informations.textContent = ""
                            player.x -= 1
                            input.style.visibility = "visible"
                            what_now.textContent = "what now?"
                        }, 1600)
                    }   
                }
                else{
                    informations.textContent = "You can't go that way (west)"
                }
            }
            else{
                informations.textContent = "You can't go that way (west)"
            }
        }

        else if(this.command == "north" || this.command == "n"){
            if(player.y > 1 && (this.check_directions_available() == true)){
                
                let what_now = document.getElementById('what_now')
                let input = document.getElementById('input')
                input.style.visibility = "hidden"
                what_now.textContent = ""

                window.setTimeout(function(){
                    informations.textContent = "You are going north."
                }, 400)
                window.setTimeout(function(){
                    informations.textContent = "You are going north.."
                }, 800)
                window.setTimeout(function(){
                    informations.textContent = "You are going north..."
                }, 1200)
                window.setTimeout(function(){
                    informations.textContent = ""
                    player.y -= 1
                    input.style.visibility = "visible"
                    what_now.textContent = "what now?"
                }, 1600)

            }
            else{
                informations.textContent = "You can't go that way (north)"
            }
        }

        else if(this.command == "south" || this.command == "s"){
            if(player.y < 6 && (this.check_directions_available() == true)){
                if(!((player.y+1 == 5 || player.y+1 == 6) && player.x < 4)){
                    
                    let what_now = document.getElementById('what_now')
                    let input = document.getElementById('input')
                    input.style.visibility = "hidden"
                    what_now.textContent = ""

                    window.setTimeout(function(){
                        informations.textContent = "You are going south."
                    }, 400)
                    window.setTimeout(function(){
                        informations.textContent = "You are going south.."
                    }, 800)
                    window.setTimeout(function(){
                        informations.textContent = "You are going south..."
                    }, 1200)
                    window.setTimeout(function(){
                        informations.textContent = ""
                        player.y += 1
                        input.style.visibility = "visible"
                        what_now.textContent = "what now?"
                    }, 1600)
                    
                }
                else{
                    informations.textContent = "You can't go that way (south)"
                }
            }
            else{
                informations.textContent = "You can't go that way (south)"
            }
        }
    },

    check_directions_available: function(){
        let command = map.command

        if(command == "s"){
            command = "south"
        }
        else if(command == "n"){
            command = "north"
        }
        else if(command == "w"){
            command = "west"
        }
        else if(command == "e"){
            command = "east"
        }

        directions_list = this.current_location_object.directions

        if(directions_list.indexOf(command) != -1){
            return true
        }
        else{
            return false
        }
    }

}

player = {
    x: 7,
    y: 4,
    items: []
} 

let clicks = 0
let starting_img = document.getElementById('game_start_image')
let play_audio = new Audio("./img/muzyka.mp3")
play_audio.play()

window.addEventListener('click', start)


function start(){
    starting_img.setAttribute('src', "./img/description_screen1.jpg")

    if(clicks == 1){
        starting_img.setAttribute('src', "./img/description_screen2.jpg")
    }
    else if(clicks == 2){
        starting_img.remove()
        play_audio.pause()

        map.init_game()
    }
    clicks += 1
}