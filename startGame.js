game.newLoopFromConstructor('startGame', function(){
game.setFPS(60);


var score = 0;
var scoreText = game.newTextObject({
  text : score,
  x : 10,
  y : 10,
  size : 20,
  color : 'blue',
  padding : 20,
  fillColor : '#FFCFCF',
});
platformer.onCellCollision = function (player, cell) {
    if(cell.file == "Textures/Stars/starGold.png"){
        score += 10;
        platformer.del(cell);
    } else if(cell.file == "Textures/Stars/starSilver.png") {
        score += 5;
        platformer.del(cell);
    } else {
        score += 1;
        platformer.del(cell);
        
    }
};
    
    
var randomBackgroundDecoration = 0;
var sizeBackground=256,x,y, backGorund=[];
var backgroundDecoration = [];
var randomPosition = 0;
for(x = 0; x<20; x++){
    for(y = 0; y<10; y++){
        randomBackgroundDecoration = Math.floor(Math.random() * 6);
        randomPosition = Math.floor(Math.random() * 100);
        if(randomBackgroundDecoration == 1) {
            backgroundDecoration.push(
                game.newImageObject({
                    file : 'Textures/Other/Cats Eyes.png', 
                      x : x * sizeBackground + randomPosition, 
                      y : y * sizeBackground + randomPosition, 
                      w : sizeBackground - 200, 
                      h : sizeBackground - 200
                })
            )
        } else if(randomBackgroundDecoration == 2) {
            backgroundDecoration.push(
                game.newImageObject({
                    file : 'Textures/Other/Flare.png', 
                      x : x * sizeBackground + randomPosition, 
                      y : y * sizeBackground + randomPosition, 
                      w : sizeBackground - 100, 
                      h : sizeBackground - 100
                })
            )
        }
        backGorund.push(
            game.newImageObject( { 
              file : 'Textures/Other/Far Background.png', 
              x : x * sizeBackground, 
              y : y * sizeBackground, 
              w : sizeBackground, 
              h : sizeBackground
            })
            )
        }
}

//Player
var playerStand = game.newAnimationObject( { 
      animation : tiles.newImage("Textures/player/spangebob.gif").getAnimation(0, 5, 35.69, 45, 9), 
      x : x, 
      y : y, 
      w : 41, 
      h : 45, 
      delay: 5,
      visible : true 
    }),
playerMove = game.newAnimationObject( { 
      animation : tiles.newImage("Textures/player/spangebob.gif").getAnimation(0, 110, 40, 45, 10), 
      x : 0, 
      y : 0, 
      w : 41, 
      h : 45, 
      delay: 1,
      visible : false
    }),
playerJump = game.newAnimationObject( { 
      animation : tiles.newImage("Textures/player/spangebob.gif").getAnimation(0, 280, 40.90, 50, 8), 
      x : 0, 
      y : 0, 
      w : 52, 
      h : 45, 
      delay: 7,
      visible : false
    }),
playerAttack = game.newAnimationObject( {
      animation : tiles.newImage("Textures/player/spangebob.gif").getAnimation(218, 215, 48.33, 50, 1),
      x : 0, 
      y : 0, 
      w : 48.33, 
      h : 45, 
      delay: 7,
      visible : false
});


    
var player = game.newRectObject({
    x : 700,
    y : 1900,
    w : 40,
    h : 40,
});

    
//var wolf = game.newRectObject({
//    x : 1000,
//    y : 1900,
//    w : 40,
//    h : 40,
//    fillColor : 'red'
//});
    

    
player.speed = point(0, 0);
var enemyMove = true;

    
    
//Map    
var map = {
    width : 128,
    height : 128,
    level : [
        '  10023 102023        102023 13',
        '             13 1023      13',
        '                            1023',
        '        10202023 13 102023     13',
        '      13                    13 1023',
        '    13   13 1023 13',
        '    1023           102023   1023',
        '            1023         13',
        '           13    13 102023',
        '       102023',
        '     1023  13  13 1023 13 102023',
        '        1020202023        1023',
        '      13           1023 13',
        '       13  13',
        '    1020202023',
        '              13 1023 102023',
        '      102023            12023',
        '     102023  102023 1020202023'
    ]

};
var walls = [];
var ground = [];

var starsMap = {
    size: 38,
    level : [
        '    g g    s b          b b   g',
        '                  s          ',
        '                               s',
        '          b s b       s s  ',
        '                                 bb',
        '     b    s   bb ',
        '     s              b b b    g',
        '             g',
        '            s     g   b bbs',
        '         s b b',
        '      g bb  s   g  bb       s s s',
        '         s  b  b s    b      g',
        '                  g   b  s',
        '       bb  bb',
        '    g     s   b',
        '                  s  gg    b',
        '        b  s            s   b',
        '       b  b    bbbs g    b b g'
    ]
}

var enemisMap = {
    size: 38,
    level : [
        '  1www3 1wwww3        10w023 13',
        '             13 1w23      13',
        '                            1w23',
        '        10w02w23 13 10ww23     13',
        '      13                    13 10w3',
        '    13   13 1023 13',
        '    1w23           10w0w3   1023',
        '            1w23         13',
        '           13    13 10ww23',
        '       10ww23',
        '     1w23  13  13 1023 13 102w23',
        '        1w20ww20w3        1ww3',
        '      13           10w3 13',
        '       13  13',
        '    10w0w020w3',
        '              1  1023 1w20w3',
        '      1w2w 3            12w23',
        '     102023  10ww2w 10w0w02w23'
    ]
}

var enemys = [];

OOP.forArr(starsMap.level, function (string, y){
    OOP.forArr(string, function (el, x){
        if(!el || el == ' ') return;
        if(el == 'g'){
        platformer.addCell(game.newImageObject({
                file : "Textures/Stars/starGold.png",
                x : x * map.width,
                y : y * map.height - 70,
                w : starsMap.size,
                h : starsMap.size,
            }));
        }
        if(el == 'b'){
        platformer.addCell(game.newImageObject({
            file : "Textures/Stars/starBronze.png",
                x : x * map.width,
                y : y * map.height - 70,
                w : starsMap.size,
                h : starsMap.size,
            }));
        }
        if(el == 's'){
        platformer.addCell(game.newImageObject({
            file : "Textures/Stars/starSilver.png",
                x : x * map.width,
                y : y * map.height - 70,
                w : starsMap.size,
                h : starsMap.size,
            }));
        }
    });
});
//Enemys
OOP.forArr(enemisMap.level, function (string, y){
    OOP.forArr(string, function (el, x){
        if(!el || el == ' ') return;
        if(el == 'w'){
        enemys.push(game.newAnimationObject({
              animation : tiles.newImage("Textures/Enemy/wolf.png").getAnimation(320, 96, 64, 30, 5),
              x : x * map.width,
              y : y * map.height - 20,
              w : 64, 
              h : 30, 
              delay: 10,
              userData: {
                  enemyMove: true
              }
            }));
        };
    });
});


    
OOP.forArr(map.level, function (string, y){
    OOP.forArr(string, function (el, x){
        if(!el || el == ' ') return;
        walls.push(game.newRectObject({
            x : x * map.width + 20,
            y : y * map.height + 10,
            w : map.width - 40,
            h : map.height - 127,
           })); 
        if(el == '0') {
        ground.push(game.newImageObject( { 
            file : "Textures/Walls/Wall 2 NE.png",
                x : x * map.width,
                y : y * map.height,
                w : map.width,
                h : map.height, 
            }));
        ground.push(game.newImageObject( { 
            file : "Textures/Walls/Wall 2 SE.png",
                x : x * map.width,
                y : y * map.height + 128,
                w : map.width,
                h : map.height, 
            }));
        }
        if(el == '1') {
        ground.push(game.newImageObject( { 
            file : "Textures/Walls/Wall 1 NW.png",
                x : x * map.width,
                y : y * map.height,
                w : map.width,
                h : map.height, 
            }));
        ground.push(game.newImageObject( { 
            file : "Textures/Walls/Wall 1 SW.png",
                x : x * map.width,
                y : y * map.height + 128,
                w : map.width,
                h : map.height, 
            }));
            }

        if(el == '2') {
        ground.push(game.newImageObject( { 
            file : "Textures/Walls/Wall 2 NW.png",
                x : x * map.width,
                y : y * map.height,
                w : map.width,
                h : map.height, 
            }));
        ground.push(game.newImageObject( { 
            file : "Textures/Walls/Wall 2 SW.png",
                x : x * map.width,
                y : y * map.height + 128,
                w : map.width,
                h : map.height, 
            }));
            
            }

        if(el == '3') {
        ground.push(game.newImageObject( { 
            file : "Textures/Walls/Wall 1 NE.png",
                x : x * map.width,
                y : y * map.height,
                w : map.width,
                h : map.height, 
            }));
        ground.push(game.newImageObject( { 
            file : "Textures/Walls/Wall 1 SE.png",
                x : x * map.width,
                y : y * map.height + 128,
                w : map.width,
                h : map.height, 
            }));
        }


    });
});
platformer.setPlayer(player);
platformer.addAction(player);
player.maxSpeed = point(1, 6);
for(var i = 0; i < enemys.length; i++) {
    var randomMove = Math.floor(Math.random() * 2);
    if(randomMove == 0) {
        enemys[i].speed = 50;
    } else {
        enemys[i].speed = 50;
    }
}
    
this.update = function() {
game.clear();


//Controll
if(key.isDown('D') || key.isDown('RIGHT')) {
    if(player.speed.y < 0 || player.speed.y > 0 && player.speed.y != 0.2) {
            player.speed.x = 3;
            playerStand.setVisible(false);
            playerJump.setVisible(true);
            playerMove.setVisible(false);
        }else if (key.isDown("SHIFT")) {
            player.speed.x = 5;
            playerStand.setVisible(false);
            playerJump.setVisible(false);
            playerMove.setVisible(true);
            playerStand.setFlip(0, 0);
            playerJump.setFlip(0, 0);
            playerMove.setFlip(0, 0);
        }else {
    player.speed.x = 3;
    playerStand.setFlip(0, 0);
    playerJump.setFlip(0, 0);
    playerMove.setFlip(0, 0);
    playerAttack.setFlip(0, 0);
    playerStand.setVisible(false);
    playerJump.setVisible(false);
    playerMove.setVisible(true);
            }
} else if (key.isDown('A') || key.isDown('LEFT')) {
        if(player.speed.y < 0 || player.speed.y > 0 && player.speed.y != 0.2) {
            player.speed.x = -3;
            playerStand.setVisible(false);
            playerJump.setVisible(true);
            playerMove.setVisible(false);
        } else if (key.isDown("SHIFT")) {
            player.speed.x = -5;
            playerStand.setVisible(false);
            playerJump.setVisible(false);
            playerMove.setVisible(true);
            playerStand.setFlip(1, 0);
            playerJump.setFlip(1, 0);
            playerMove.setFlip(1, 0);
            log(key.getKeyList())
        }
    else {
    player.speed.x = -3;
    playerStand.setFlip(1, 0);
    playerJump.setFlip(1, 0);
    playerMove.setFlip(1, 0);
    playerAttack.setFlip(1, 0);
    playerStand.setVisible(false);
    playerJump.setVisible(false);
    playerMove.setVisible(true);
            }
} else if(player.speed.y == 0) {
    player.speed.x = 0;
    playerStand.setVisible(true);
    playerJump.setVisible(false);
    playerMove.setVisible(false);
    playerAttack.setVisible(false);
};
    
if(key.isDown('SPACE')) {
   if(!player.speed.y < 0 || !player.speed.y > 0 && player.speed.y != 0.2 && player.speed.x == 0) {
    playerStand.setVisible(false);
    playerJump.setVisible(false);
    playerMove.setVisible(false);
    playerAttack.setVisible(true);
        for(var i = 0; i < enemys.length; i++) {
            log(enemys[i].y +'enemy');
            log(player.y);
            if((enemys[i].x <= player.x + 60 || enemys[i].x <= player.x - 60) && (enemys[i].y == player.y + 10)) {
                enemys.splice(i, 1);
            } 
        }
   }
}
//else if(key.isDown('SHIFT') && key.isDown('SPACE') && key.isDown) {
//    playerStand.setVisible(false);
//    playerJump.setVisible(false);
//    playerMove.setVisible(false);
//    playerAttack.setVisible(true);
//    log(player.speed.x)
//};
    
for(var i = 0; i < enemys.length; i++) {

    var getRandomSpeed = Math.ceil(Math.random() * 2.5)
    if(enemys[i].enemyMove == true){
    enemys[i].x += getRandomSpeed;
    } else {
    enemys[i].x -= getRandomSpeed;
    }
    if(enemys[i].isStaticIntersect(player)) {
        document.location.reload();
        log(1);
    }
}
    
for(var j = 0; j < ground.length; j++) {
    for(var i = 0; i < enemys.length; i++) {
        if(ground[j].isStaticIntersect(enemys[i]) && enemys[i].y < ground[j].y && ground[j].file == "Textures/Walls/Wall 1 NE.png") {
            enemys[i].enemyMove = false;
            enemys[i].setFlip(1, 0);
        } else if(ground[j].isStaticIntersect(enemys[i]) && enemys[i].y < ground[j].y && ground[j].file == "Textures/Walls/Wall 1 NW.png") {
            enemys[i].enemyMove = true;
            enemys[i].setFlip(0, 0);
        }
    }
}

player.speed.y += 0.2;
OOP.drawArr(backGorund);
OOP.drawArr(backgroundDecoration);
OOP.drawArr(ground);

OOP.drawArr(walls, function(el) {
    if(el.isInCameraStatic()){
        if(el.isStaticIntersect(player) && player.speed.y > 0) {
                if(key.isDown('W') || key.isDown('UP')) {
                        if(key.isDown('SHIFT') && key.isDown('A')) {
                            player.speed.y = -9;
                            player.speed.x = -5;
                            playerStand.setVisible(false);
                            playerJump.setVisible(true);
                            playerMove.setVisible(false);
                            log(1);
                        } else {
                            player.speed.y = -9;
                            playerStand.setVisible(false);
                            playerJump.setVisible(true);
                            playerMove.setVisible(false);
                        }

                }else if(key.isDown('S' || key.isDown('DOWN'))) {
                    player.speed.y = 2;
                    player.y = el.y + player.h - player.h;
                }else {
                    player.y = el.y - player.h;
                    player.speed.y = 0;
                }
            };
    };


});
OOP.drawArr(enemys);
scoreText.x = player.x - 500;
scoreText.y = player.y - 250;
playerStand.x = player.x;
playerStand.y = player.y;
playerMove.x = player.x;
playerMove.y = player.y;
playerJump.x = player.x;
playerJump.y = player.y;
playerAttack.x = player.x;
playerAttack.y = player.y;
playerStand.draw();
playerMove.draw();
playerJump.draw();
playerAttack.draw();
player.draw();
    
//Camera
camera.follow(player, 10);

if(player.speed.y) {
    player.y += player.speed.y;
}
if(player.speed.x) {
    player.x += player.speed.x;
}
platformer.update();
brush.drawTextS({
    y : 35,
    text : 'SCORE: ' + score,
    size : 30,
    color : 'white'
});
//console.log(key.getKeyList());

};   
});


//function StartGame() {
//    
////Images backGround
//
//
//var startGame = new StartGame();
//
//game.newLoopFromClassObject('startGame', new StartGame());