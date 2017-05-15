function Menu() {
    
var start = game.newTextObject({
    text: 'Start game',
    size: 30,
    color: '#ffffff'
});


    this.draw = function() {
        game.clear();
        start.draw();
    };
    this.update = function() {
        if(mouse.isPeekObject('LEFT', start)){
            game.setLoop('startGame');
            mouse.exitMouseControl();
        }
        joystick.on('btnUp:press', function () {
		    game.setLoop('startGame');
        });
        }
};
var menu = new Menu();

game.newLoop('menu', function() {
    
menu.draw();
menu.update();
    
});