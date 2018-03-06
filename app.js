var canvas = document.querySelector('canvas');

//define
canvas.width= window.innerWidth;
canvas.height = window.innerHeight;

//context
var c=canvas.getContext('2d');


/*
for(var i=0; i<700; i++){
  var x= Math.random() * window.innerWidth;
  var y= Math.random() * window.innerHeight;
  var r= Math.random() * 5;
// circle
  c.beginPath();

  c.arc(x, y, r, 0, Math.PI*2,false);
  c.strokeStyle= 'rgba(225,225,225, 0.7)';
  c.stroke();

} */

var mouse= {
  x: undefined,
  y: undefined,
}

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

window.addEventListener('mousemove', function(event){
  mouse.x= event.x;
  mouse.y = event.y;
});

function Circle(x, y, dx, dy, r){
  this.x= x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.minR=r;

  // draw
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0 , Math.PI*2, false);
    c.strokeStyle = 'rgba(225, 225, 225, 0.2)';
    c.stroke();
  }

  //move
  this.update = function(){
    this.x += this.dx;
    this.y += this.dy;

    //interaction
    if(mouse.x -this.x < 70 && mouse.x - this.x> -70 && mouse.y -this.y < 70 && mouse.y - this.y> -70){
      if(this.r<8){

        this.r = r*10;
      }

    }
    else{
      this.r = this.minR;
    }


// set limits
  if(this.x>innerWidth-this.r || this.x<0){
    this.dx= -this.dx;
  }
  if(this.y>innerHeight-this.r || this.y<0){
    this.dy= -this.dy;
  }
    this.draw();
  }

}

var circleArray = [];
function init(){
  for(var i= 0; i<400; i++){

    var x= Math.random() * (window.innerWidth/3);
    var y= Math.random() * (window.innerHeight/3);
    var r= Math.random() * 7 + 1;
    var dx = (Math.random() - 0.5) * 5 ;
    var dy = (Math.random() - 0.5) * 5 ;
    circleArray.push(new Circle(x, y, dx, dy, r));

  }
}


function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for(var j =0; j<circleArray.length; j++){
    circleArray[j].update();
  }


}

animate();
init();

console.log(canvas);
