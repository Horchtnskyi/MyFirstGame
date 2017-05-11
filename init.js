var pjs = new PointJS('2D', 400, 400);
pjs.system.initFullPage();
var platformer = new PlatformerJS(pjs);
//platformer.optMode = true;
//platformer.useDeltaTime = true;

var log = pjs.system.log;
var game = pjs.game;
var point = pjs.vector.point;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;

var mouse = pjs.mouseControl.initMouseControl();

var key = pjs.keyControl.initKeyControl();

var tiles = pjs.tiles;
pjs.system.setTitle('Spange BOBE');
