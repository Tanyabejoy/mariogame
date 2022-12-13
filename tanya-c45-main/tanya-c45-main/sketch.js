var mario,marioImg;
var ground,groundImg;
var cloud1, cloud2
var cloudgroup
var ob1, ob2
var obgroup
var bullet, bulletimg, bulletgroup

function preload(){
 marioImg=loadAnimation("assets/mario/mario1.png","assets/mario/mario2.png","assets/mario/mario3.png","assets/mario/mario4.png","assets/mario/mario5.png","assets/mario/mario6.png","assets/mario/mario7.png","assets/mario/mario8.png","assets/mario/mario9.png","assets/mario/mario10.png","assets/mario/mario11.png","assets/mario/mario12.png");
 groundImg=loadImage("assets/ground.png")
 cloud1 = loadImage("assets/cloud1.png")
 cloud2 = loadImage("assets/cloud2.png")
 ob1 = loadImage("assets/obstacle1.png")
 ob2 = loadImage("assets/obstacle2.png")
 bullet = loadImage("assets/bullet.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  mario=createSprite(100,height-280);
  mario.addAnimation("running",marioImg);
  mario.scale=0.2;

  ground=createSprite(width/2,height-50,width,100);
  ground.addImage(groundImg);
  cloudgroup=new Group ()
  obgroup=new Group ()
  bulletgroup=new Group()


}

function draw() {
  background("lightblue");
  if(keyDown("space")&&mario.y>height/2){
    mario.velocityY=-10;
  }
  mario.velocityY+=0.8;
  ground.velocityX=-4;
  if(ground.x<width/4){
    ground.x=ground.width/2;
  }
  spawnobs()
 spawnclouds()
 if(keyDown("t")){
  throwbullet()
 }
 for(var i=0;i<bulletgroup.length;i++){
  for(var j=0;j<obgroup.length;j++){
    if(bulletgroup.get(i).isTouching(obgroup.get(j))){
      bulletgroup.get(i).destroy()
      obgroup.get(i).destroy()

    }
  }
 }
 mario.collide(ground);
  drawSprites();
}

function spawnclouds ()
{
  if(frameCount%80===0){
    var cloud=createSprite(width,100)
    var x = Math.round(random(1,2))
    if(x==1){
      cloud.addImage(cloud1)
    }
    else{
      cloud.addImage(cloud2)
    }
    cloud.velocityX=-4
    cloud.y=Math.round(random(100,height/2))
    cloud.scale=0.3
    cloud.lifetime = 800
    mario.depth=cloud.depth+1
    cloudgroup.add(cloud)
  }
}

function spawnobs ()
{
  if(frameCount%100===0){
    var ob=createSprite(width, height-220)
    var x = Math.round(random(1,2))
    if(x==1){
      ob.addImage(ob1)
    }
    else{
      ob.addImage(ob2)
      ob.y = height-235
    }
    ob.velocityX=-4
    ob.scale=0.2
    ob.lifetime = 800
    mario.depth=ob.depth+1
    obgroup.add(ob)
  }
}

function throwbullet(){
  bullet=createSprite(70,240,10,40)
  bullet.addImage(bulletimg)
bullet.rotation=-30
bullet.velocityY=1
bullet.scale=0.1
bullet.x=mario.x
bullet.y=mario.y
bullet.velocityX=6
bullet.lifetime=80
bulletgroup.add(bullet)


}
