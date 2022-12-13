class Star {
    constructor(x, y, r){
        this.x = x
        this.y = y 
        this.r = r 
        this.setColor()
        this.setTwinkle()
    }

    setTwinkle(){
        let tw = Math.random()/5
        this.twinkling = tw
    }

    setColor(){
        let alpha = Math.random() + 0.5
        if (alpha > 1) alpha = 1 
        let color_distinction = Math.random()*105

        let r = 150 + color_distinction*Math.random()
        let g = 150 + color_distinction*Math.random()
        let b = 150 + color_distinction*Math.random()

        this.color = `rgba(${r}, ${g}, ${b}, ${alpha})`
        // this.color = `rgba(234,255,233, ${alpha})`
    }

    render(){
        ctx.beginPath()
        if(this.r <= 0) this.r = 0.4
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false)
        ctx.shadowBlur = 10
        ctx.shadowColor = 'white'
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()

        this.move()
    }

    move(){
        this.x -= 1
        this.y -= 1

        if(this.x < -5){
            this.x += canvas.width+5 
        }
        if(this.y < -5){
            this.y += canvas.height+5
        }
    }

    twinkle(){       
        this.r += this.twinkling
        
        if(this.r > 4 || this.r < 0.4){
            this.twinkling = -this.twinkling
        }

    }
}


let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let root = document.getElementById('main-container')
let star_list = []
fill_background()
initStarList()

let animation = setInterval(RenderAll, 10)


function initStarList(){
    for(let i=0; i<150; i++){
        create_star()
    }
}

function correct_star_position(x_ratio, y_ratio){
    for(let i in star_list){
        star_list[i].x = star_list[i].x*x_ratio
        star_list[i].y = star_list[i].y*y_ratio
    }
}

function fill_background(){
    ctx.fillStyle = 'rgb(26, 24, 24)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function RenderAll(){
    ctx.globalAlpha = 1
    fill_background()
    for(let i in star_list){
        star_list[i].render()
        star_list[i].twinkle()
    }
    particleRenderer.renderParticles(ctx)
}

function create_star(){
    let x = Math.random()*canvas.width 
    let y = Math.random()*canvas.height
    let r = Math.random()*2 + 0.2
    let str = new Star(x, y, r)

    star_list.push(str)
}

window.addEventListener('resize', resize)
function resize(){
    let x_ratio = window.innerWidth/canvas.width
    let y_ratio = window.innerHeight/canvas.height

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    correct_star_position(x_ratio, y_ratio)
    fill_background()
    RenderAll()    
}

let particleRenderer = new ParticleRenderer()
window.addEventListener('click', sparkles)
function sparkles(e){
    let x = e.clientX
    let y = e.clientY

    createParticles(x,y)
}

function createParticles(x, y){
    if (particleRenderer.particles.length > 100) return 

    let amount = Math.floor(Math.random()*30 + 20)
    for(let i=0; i<amount; i++){
        let particle = new Particle(x, y, 'hover')
        particleRenderer.addParticle(particle)
    }
}



