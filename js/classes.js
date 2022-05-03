class Sprite {
    constructor({ position, imageSrc, scale = 1, frameMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frameMax = frameMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.frameHold = 3;
        this.offset = offset
    }
    draw() {
        c.drawImage(this.image, this.framesCurrent * (this.image.width / this.frameMax), 0, this.image.width / this.frameMax, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y, (this.image.width / this.frameMax) * this.scale, this.image.height * this.scale)
    }
    animateFrame() {
        this.framesElapsed++

        if (this.framesElapsed % this.frameHold === 0) {
            if (this.framesCurrent < this.frameMax - 1) {
                this.framesCurrent++
            }
            else {
                this.framesCurrent = 0
            }
        }
    }
    update() {
        this.draw();
        this.animateFrame();

    }


}



class Fighter extends Sprite {
    constructor({ position, velocity, color = 'red', scale = 1, frameMax = 1, imageSrc, offset = { x: 0, y: 0 }, sprites, attackBox={offset:{},width:undefined,height:undefined} }) {
        super(
            {
                position,
                imageSrc,
                scale,
                frameMax,
                offset


            }
        )

        this.velocity = velocity;
        this.height = 150
        this.health = 100
        this.lastKey
        this.width = 50;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset:attackBox.offset,
            width: attackBox.width,
            height: attackBox.height

        },
            this.color = color
        this.isAttacking;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.frameHold = 3;
        this.sprites = sprites;
        this.dead=false;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }

    update() {
        this.draw()
        if(!this.dead)this.animateFrame();
      

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y +this.attackBox.offset.y

        //c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 93) {
            this.velocity.y = 0
        }
        else {
            this.velocity.y += gravity;
        }
    }
    attack() {
        this.switchSprite('Attack1')

        this.isAttacking = true
      
    }
    takeHit(){
        
        this.health -= 20
        if(this.health<=0){
            this.switchSprite('death')
        } else this.switchSprite('takeHit')
    }
    //o personongem vai atacar e 10mms ele vai parar de atacar

    switchSprite(sprite) {
        if(this.image=== this.sprites.death.image){
            if(this.framesCurrent===this.sprites.death.frameMax -1)
            this.dead=true
            return
        }
        

        if(this.image===this.sprites.Attack1.image && this.framesCurrent <this.sprites.Attack1.frameMax - 1)
        return
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.frameMax -1)
         return
        switch (sprite) {
            case 'idles':
                if (this.image !== this.sprites.idles.image) {
                    this.image = this.sprites.idles.image
                    this.frameMax = this.sprites.idles.frameMax
                    this.framesCurrent=0.

                }

                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.frameMax = this.sprites.run.frameMax
                    this.framesCurrent = 0


                }

                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {


                    this.frameMax = this.sprites.jump.frameMax
                    this.image = this.sprites.jump.image
                    this.framesCurrent = 0
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {

                    this.image = this.sprites.fall.image
                    this.frameMax = this.sprites.fall.frameMax
                    this.framesCurrent = 0
                }
                break

                case 'Attack1':
                if (this.image !== this.sprites.Attack1.image) {

                    this.image = this.sprites.Attack1.image
                    this.frameMax = this.sprites.Attack1.frameMax
                    this.framesCurrent = 0
                }
                
               break;
               case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {

                    this.image = this.sprites.takeHit.image
                    this.frameMax = this.sprites.takeHit.frameMax
                    this.framesCurrent = 0
                }
                
               break

               case 'death':
                if (this.image !== this.sprites.death.image) {

                    this.image = this.sprites.death.image
                    this.frameMax = this.sprites.death.frameMax
                    this.framesCurrent = 0
                }
                
               break
        }
    }

}


