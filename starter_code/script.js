window.onload = function(){
  document.getElementById('start-button').onclick=function(){
    start();
  }

  


  
  function start(){
    myGameArea.start();
    
  }

  
}



var canvas= document.getElementById('gameArea');
//var ctx= canvas.getContext('2d');

var myObstacles =[];

var myGameArea={
  canvas: document.getElementById('gameArea') ,
  context:this.canvas.getContext('2d'),
  frames:0,
  start:function(){
    console.log(this.canvas);
    this.interval=setInterval(updateCanvas,20);
    
  },
  clear: function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
  },
  stop: function(){
    clearInterval(this.interval);
    paintEnd();
  },
  score:function(){
    var points= Math.floor(this.frames/4);
    this.context.font= "18px serif";
    this.context.fillStyle="white";
    this.context.fillText("Score: "+ points,80,400);
  }

}
function paintEnd(){
  var ctx =myGameArea.context;
  var points=Math.floor(myGameArea.frames/4);
  ctx.clearRect(0,0,myGameArea.canvas.width,myGameArea.canvas.height);
  ctx.fillStyle='black';
  ctx.fillRect(0,0,myGameArea.canvas.width,myGameArea.canvas.height);
  ctx.font = "30px serif";
  ctx.fillStyle ="red";
  ctx.fillText("Game Over!",120,300);
  ctx.fillStyle="white";
  ctx.fillText("Your final score",120,330);
  ctx.fillText(points,200,360);
}
function updateObstacles(){

  for(i=0;i< myObstacles.length;i++){
    myObstacles[i].y += 5;
    myObstacles[i].update();
  }
  myGameArea.frames += 4;
  if(myGameArea.frames %200 ===0){
    var y=0;
    var minWidth= 20;
    var maxWidth =300;
    var width = Math.floor(
      Math.random() *(maxWidth - minWidth+1)+minWidth
    );
    var minX=0;
    var maxX=250;
    var x= Math.floor(
      Math.random() *(maxX -minX +1)+minX
    );
    myObstacles.push(new Components(width,30,"red",x,y));
  }
}

class Components{
  constructor(width,height,color,x,y){
    this.width=width;
    this.height=height;
    this.color=color;
    this.x=x;
    this.y=y;
  }
  update(){
    var ctx = myGameArea.context;
    ctx.fillStyle= this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
  left(){
    return this.x;
  }
  right(){
    return this.x + this.width;
  }
  top(){
    return this.y;
  }
  bottom(){
    return this.y + this.height;
  }
}

function updateCanvas(){
  myGameArea.clear();
  paintBackground();
  car.newPos();
  car.update();

  updateObstacles();
  myGameArea.score();
  checkGameOver();
  
}

//myGameArea.start();
function paintBackground(){
    var ctx= myGameArea.context;
   ctx.fillStyle='green';
    ctx.fillRect(0,0,400,500);
    ctx.fillStyle='grey';
    ctx.fillRect(40,0,320,500);
    ctx.strokeStyle='white';
    ctx.lineWidth=20;
    ctx.strokeRect(60,-20,280,800);
    ctx.save();
   ctx.beginPath();
    ctx.lineWidth=5;
    ctx.setLineDash([25,9]);
    ctx.moveTo(200,0);
    ctx.lineTo(200,500);
    ctx.stroke();
    ctx.closePath();
    ctx.restore()
  }


  class Car{
    constructor(width,height,x,y){
      this.width =width;
      this.height= height;
      this.x=x;
      this.y=y;
      this.speedX=0;
      this.speedY=0;
    }
    update(){
      var img=  new Image();
      var ctx= myGameArea.context;
      
      img.src ="./images/car.png"
       ctx.drawImage(img,this.x,this.y,this.width,this.height);
    }
    newPos(){
      this.x += this.speedX;

    }
    left(){
      return this.x;
    }
    right(){
      return this.x + this.width;
    }
    top(){
      return this.y;
    }
    bottom(){
      return this.y + this.height;
    }
    crashWith(obstacle){
      return !(
        this.bottom()<obstacle.top()||
        this.top() > obstacle.bottom()||
        this.right() < obstacle.left()||
        this.left()>obstacle.right()
        )
    }
  }

  function checkGameOver(){
    var crashed = myObstacles.some(function(obstacle){
      return car.crashWith(obstacle);
    });
    if(crashed){
      myGameArea.stop();
    }
  }

  document.onkeydown = function(e){
    switch (e.keyCode){
      case 37:
        car.speedX -= 6;
        break;
      case 39:
        car.speedX += 6;
        break;
    }
  }

  document.onkeyup = function(e){
    car.speedX=0;
  }
  
  var car = new Car(50,75,170,400);

paintBackground();

 