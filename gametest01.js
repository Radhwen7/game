//width and height for the cell 

$(document).ready(function(){
  //to make a function available after the document is loaded.

  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  //the function that you use to get access to the canvas tags 2D drawing functions
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  
  
  var cw = 10;
  var d;
  var food;
  var score;
   var level;
  
  //creation of snake : i chose to create array for the snake 
  var snake_array
  
  function creation()
  {
    //we start with setting the direction
    d = "right";
    create_snake();
    create_food(); //Now we can see the food particle
    //finally lets display the score
    score = 0;
     level = 1;
    
    //Lets move the snake now using a timer which will trigger the paint function
    //every 60ms
    if(typeof game_loop != "undefined") clearInterval(game_loop);
    //clears the interval which has been set by setInterval() function before that
    game_loop = setInterval(paint, 100);
  }
  creation();
  
  function create_snake()
  {
    //this will be the length of the snake 
    var length = 15; 
    snake_array = []
    for(var i = length-1; i>=0; i--)
    {
     
      snake_array.push({x: i, y:0});
      //creation of horizontal snake 
    }
  }
  
  //Lets create the food now
  function create_food()
  {
    food = {
      x: Math.round(Math.random()*(w-cw)/cw), 
      y: Math.round(Math.random()*(h-cw)/cw), 
    };
    //This will create a cell with x/y between 0-44
    //Because there are 45(450/10) positions accross the rows and columns
  }
  
  //Lets paint the snake now
  function paint()
  {
    //we need to paint every frame
    //Lets paint the canvas now
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);
    
    //this will make the snake move.
    
    var nx = snake_array[0].x;
    var ny = snake_array[0].y;
    //head position
    //We will increment it to get the new head position
    //now we'll add directions
    if(d == "right") nx++;
    else if(d == "left") nx--;
    else if(d == "up") ny--;
    else if(d == "down") ny++;
    
   
    //restart the game code
  
    //if the head hit the wall it restart 
    if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
    {
      //restart game
      creation();
      //Lets organize the code a bit now.
      return;
    }
    
    //this code will make the snake eat food 
    //and the tail does'nt get food 

    if(nx == food.x && ny == food.y)
    {
      var tail = {x: nx, y: ny};
      score++;
       
      //Create new food
      create_food();
    }
    else
    {
      var tail = snake_array.pop(); //pops the last cell
      tail.x = nx; tail.y = ny;
    }
    
    
    snake_array.unshift(tail); //put the tail at first 
    //we have to loop in the array of snake 
    
    for(var i = 0; i < snake_array.length; i++)
    {
      var c = snake_array[i];
      //Lets paint 10px wide cells
      paint_cell(c.x, c.y, "blue");
    }
    
    //food painting 
    paint_cell(food.x, food.y, "green");
    //Lets paint the score
    var score_text = "Score: " + score;
     var level_text = "Level: " + level;
    ctx.fillText(score_text, 5, h-5);
     ctx.fillText(level_text, 60, h-5);
  }
  
  //Lets first create a generic function to paint cells
  function paint_cell(x, y, color)
  {
    ctx.fillStyle = color;
    ctx.fillRect(x*cw, y*cw, cw, cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cw, y*cw, cw, cw);
  }
  
  function check_collision(x, y, array)
  {
    //This function will check if the provided x/y coordinates exist
    //in an array of cells or not
    for(var i = 0; i < array.length; i++)
    {
      if(array[i].x == x && array[i].y == y)
       return true;
    }
    return false;
  }
  
  //controls
  $(document).keydown(function(e){
    var key = e.which;
    //We will add another clause to prevent reverse gear
    if(key == "37" && d != "right") d = "left";
    else if(key == "38" && d != "down") d = "up";
    else if(key == "39" && d != "left") d = "right";
    else if(key == "40" && d != "up") d = "down";
   
  })
  
  
  
  
  
  
  
})