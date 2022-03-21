const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;



var blink,eat,sad;

let engine;
let world;
var ground;
var backgroundimg,fruitimg,rabbitimg,bunny,button;
function preload(){
  backgroundimg = loadImage("background.png")
  fruitimg = loadImage("melon.png")
  rabbitimg = loadImage("Rabbit-01.png")

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")

  blink.playing=true
  eat.playing=true
  sad.playing=true
  sad.looping=false
  eat.looping=false
}


function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  bunny = createSprite(250,600,100,100)
  //bunny.addImage(rabbitimg)
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")
  bunny.scale=0.2
  blink.frameDelay=12

console.log(bunny.x)
rope = new Rope(6,{x:245,y:30})
var fruit_options={
  density:0.001
}

fruit = Bodies.circle(300,300,15,fruit_options)
Matter.Composite.add(rope.body,fruit)
button = createImg("cut_button.png")
button.position(200,30)
button.size(50,50)
button.mouseClicked(drop)
link = new Link(rope,fruit)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
}

function draw() 
{
  background(51);
  image(backgroundimg,width/2,height/2,500,700)
  ground.show();
  rope.show();
 
  Engine.update(engine);
  

  if(fruit!=null){
    image(fruitimg,fruit.position.x,fruit.position.y,60,60)


  }

  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eating")
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("crying",sad)
  }
 drawSprites()
   
}

function drop(){
  rope.break()
  link.detach()
  link= null

}

function collide(body,sprite){
  if(body!=null){
    var D = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(D<=80){
      World.remove(engine.world,fruit)
      fruit=null
      return true
    }
    else{
      return false
    }

  }
}
