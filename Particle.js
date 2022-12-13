class Particle {
    constructor(x, y, type){
        this.x = x 
        this.y = y 
        this.type = type 
        this.creationTime = Date.now()
        this.lifetime = this.randLifetime()
        this.mvVector = this.movementDirection()
        this.dead = false
        this.startingLifetime
        this.randColor()
        this.randSize()
    }

    randLifetime(){
        let lifetime = Math.random() * 4000
        this.startingLifetime = lifetime
        return lifetime
    }

    movementDirection(){
        let angle = Math.round(Math.random()*360)
        let dx = Math.sin(angle)
        let dy = -Math.cos(angle)
        let mvVector = {
            dx:dx, 
            dy:dy
        }

        return mvVector 
    }   

    randSize(){
        this.width = Math.random()*10
        this.height = Math.random()*10
    }

    randColor(){
        let r = Math.floor(Math.random()*255.99)
        let g = Math.floor(Math.random()*255.99)
        let b = Math.floor(Math.random()*255.99)
        let a = 1

        this.r = r 
        this.g = g 
        this.b = b
        this.a = a

        this.color = `{rgba(${r}, ${g}, ${b}, ${a})}`
    }

    alphaFade(){
        this.a = this.a * this.lifetime/this.startingLifetime
        this.color = `{rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})}` 
    }

    render(ctx){
        this.alphaFade()
        const VELOCITY = 10*Math.random()

        this.x += this.mvVector.dx*VELOCITY
        this.y += this.mvVector.dy*VELOCITY

        ctx.globalAlpha = this.a
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)

        this.lifetime -= Date.now() - this.creationTime
        if(this.lifetime < 0) this.dead = true
    }   
}

class ParticleRenderer{
    constructor(){
        this.particles = []
        this.start = false
    }

    renderParticles(ctx){
        for(let i=this.particles.length-1; 0 < i; i--){
            this.particles[i].render(ctx)
            if(this.particles[i].dead == true) this.particles.splice(i, 1)
        }
    }

    addParticle(particle){
        this.particles.push(particle)
    }
}