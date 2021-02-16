class Game{
constructor(){

}

GetState(){
    var gameStateref=dataBase.ref('gameState')
    gameStateref.on('value',function(data){
        gameState=data.val()
    })
}
update(state){
    dataBase.ref('/').update({
        gameState:state
    })
}
async start(){
    if(gameState===0){
        player=new Player()
        var playercountref=await dataBase.ref('playerCount').once('value')
        if(playercountref.exists()){
            playerCount=playercountref.val()
            player.getCount()
        }
        form=new Form()
        form.display()
    }
    car1=createSprite(100,200)
    car2=createSprite(300,200)
    car3=createSprite(500,200)
    car4=createSprite(700,200)
    cars=[car1,car2,car3,car4]
}
play(){
    form.hide()
    textSize(30)
    text('GAMESTART',120,100)
    Player.getPlayerInfo()
    if(allPlayers!==undefined){
        var index=0,x=0,y
        for(var plr in allPlayers){
           index=index+1
           x=x+200
           y=displayHeight-allPlayers[plr].distance
           cars[index-1].x=x
           cars[index-1].y=y
           if(index===player.index){
               cars[index-1].shapeColor='Red'
            camera.position.x=displayWidth/2
            camera.position.y=cars[index-1].y
           }

        }
    }
    if(keyIsDown(UP_ARROW)&&player.index!==null){
        player.distance+=10
        player.update();
    }
     drawSprites();

}
}