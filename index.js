const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1020;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.8

 
const backgroud=new Sprite({
    position:{
        x:0,
        y:0
    },
   imageSrc:'./img/background.png'
})
const shop=new Sprite({
    position:{
        x:700,
        y:224
    },
   imageSrc:'./img/shop.png',
   scale:2,
   frameMax:6
}

)



const player = new Fighter({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    color:'blue',
    offset:{
      x:0,
      y:0
    },
    imageSrc:'./img/samuraiMack/idle.png',
    frameMax:8,
    scale:3,
    offset:{
        x:200,
        y:220
    },
    sprites:{
        idles:{
            imageSrc:'./img/samuraiMack/idle.png',
            frameMax:8
        },
        run:{
            imageSrc:'./img/samuraiMack/run.png',
            frameMax:8
        },
        jump:{
            imageSrc:'./img/samuraiMack/jump.png',
            frameMax:2
        },
        fall:{
            imageSrc:'./img/samuraiMack/fall.png',
            frameMax:2

        },
        Attack1:{
            imageSrc:'./img/samuraiMack/Attack1.png',
            frameMax:6
        }
        ,
        takeHit:{
            imageSrc:'./img/samuraiMack/take hit.png',
            frameMax:4
        },
        death:{
            imageSrc:'./img/samuraiMack/death.png',
            frameMax:6
        },
    },
    attackBox:{
        offset:{
            x:80,
            y:10
        },
        width:200,
        height:50
    }
})

const enemy = new Fighter({
    position: { x: 400, y: 100 },
    velocity: { x: 0, y: 0 },
    color:'red',
    offset:{
        x:40,
        y:0
      },
      imageSrc:'./img/kenji/idle.png',
      frameMax:8,
      scale:3,
      offset:{
          x:200,
          y:235
      },
      sprites:{
          idles:{
              imageSrc:'./img/kenji/idle.png',
              frameMax:4
          },
          run:{
              imageSrc:'./img/kenji/run.png',
              frameMax:8
          },
          jump:{
              imageSrc:'./img/kenji/jump.png',
              frameMax:2
          },
          fall:{
              imageSrc:'./img/kenji/fall.png',
              frameMax:2
  
          },
          Attack1:{
              imageSrc:'./img/kenji/Attack1.png',
              frameMax:4
          },
        takeHit:{
            imageSrc:'./img/kenji/take hit.png',
            frameMax:3
        },
        death:{
            imageSrc:'./img/kenji/death.png',
            frameMax:7
        },
        },
          attackBox:{
              offset:{
                  x:-240,
                  y:10
              },
              width:240,
              height:50
          }
       
})
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }
}



timeControl()
function animation() {
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    backgroud.update();
    shop.update();
    player.update();
    enemy.update();
    

    player.velocity.x = 0;
    enemy.velocity.x=0;

    //timer control

    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        
        player.velocity.x = -5;
        player.switchSprite('run')
    }
    else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')

    }
    else {
        player.switchSprite('idles')

    }
    if(player.velocity.y<0){
        player.switchSprite('jump')
    }
    else if(player.velocity.y>0){
        player.switchSprite('fall')
    }
    //enemy movement

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run')

    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')

    }
    else{
        enemy.switchSprite('idles')
    }
    if(enemy.velocity.y<0){
        enemy.switchSprite('jump')
    }
    else if(enemy.velocity.y>0){
        enemy.switchSprite('fall')
    }
    //detet collision
    if( retangularColition({retangle1:player,retangle2:enemy}) &&player.isAttacking && player.framesCurrent === 4){
        enemy.takeHit()
        player.isAttacking=false;
        
        document.querySelector('#enemyHealth').style.width=enemy.health +'%'
        
    }
    if(player.isAttacking&player.framesCurrent===4){
        player.isAttacking=false
    }
    if( retangularColition({retangle1:enemy,retangle2:player}) &&enemy.isAttacking&& enemy.framesCurrent===2 ){
        console.log('enemy attacSucces');
        
        player.takeHit();
        enemy.isAttacking=false
      


        


        document.querySelector('#playerHealth').style.width=player.health +'%'

        //end game basead on health

        if(enemy.isAttacking&&enemy.framesCurrent===2){
            enemy.isAttacking=false
        }
        
        
    }
    if(enemy.health<=0 || player.health <=0){
        determinateWinner({player,enemy,timeId})
    }



}
animation();


window.addEventListener('keydown', (event) => {
    if(!player.dead) {
    console.log(event.key);
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;

        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;

        case 'w':
            player.velocity.y = -10
            break;
        case 'c':
            player.attack()
            break;
        case 'Shift':
            enemy.attack();
            break
        //arrow

        

    }}
    if(!enemy.dead){
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -10;
            
            break
    }

}}
);
//keyup quando não estiver pressionando tecla nenhuma
window.addEventListener('keyup', (event) => {


    switch (event.key) {
        case 'd':
            keys.d.pressed = false;

            break;
        case 'a':
            keys.a.pressed = false;

            break;

    }
    //enemy

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;

            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;

            break;

    }
})