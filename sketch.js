var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var bgimg;
var feed, lastFed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bgimg=loadImage("tree-and-bush-behind-the-fence-scene-vector.jpg")
}

function setup() {
  database=firebase.database()
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  
  dog=createSprite(700,330,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed Dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(bgimg);
  foodObj.display();

  fedtime = database.ref('FeedTime');
  fedtime.on("value",function(data){
    lastFed = data.val();
  });

  
 
  textSize(20)
  fill("brown")
  stroke("brown")
  strokeWeight(2)
  if(lastFed>=12){
    text("Last Fed: "+ lastFed %12 + "PM",310,30 )
  }
  else if(lastFed === 0){
    text("Last Fed 12AM ", 310,30)
  }
  else{
    text("Last Fed:   " + lastFed + "AM",310,30)
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()

  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
