




function retangularColition({retangle1,retangle2}){

    return(
     retangle1.attackBox.position.x + retangle1.attackBox.width >= retangle2.position.x && retangle1.attackBox.position.x <= retangle2.position.x + retangle2.width && retangle1.attackBox.position.y + retangle1.attackBox.height >= retangle2.position.y && retangle1.attackBox.position.y <= retangle2.position.y + retangle2.height
    )}
 let timer=100
 let timeId  
 function determinateWinner({player,enemy,timeId}){
     clearTimeout(timeId)
     document.querySelector('#displayText').style.display='flex';
         if(player.health===enemy.health){
            document.querySelector('#displayText').innerHTML='Tie'
            document.querySelector('#displayText').style.display='flex'}
     
     
         else if(player.health>enemy.health){
             document.querySelector('#displayText').innerHTML='Player 1 wins'
            document.querySelector('#displayText').style.display='flex'
     
         }
         else if(enemy.health>player.health){
             document.querySelector('#displayText').innerHTML='Player 2 wins'
            document.querySelector('#displayText').style.display='flex'
     
         }
     }
 
 
 function timeControl(){
     if(timer>0){
        timeId= setTimeout(timeControl,1000)
         timer--
         document.querySelector('#timer').innerHTML=timer
     }
     if(timer===0){
         
         determinateWinner({player,enemy,timeId})
     }
 
     
 }  
 