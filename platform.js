function platform(xx, yy, init = 0){
  angleMode(DEGREES);
  this.x = xx;
  this.y = yy;
  this.w = xx[1] - xx[0];
  this.h = yy[0] - yy[1];
  this.touch = 0;
  this.angle = -atan(this.h/this.w) + deviation;
  if(this.angle > 80)
    this.angle = 80;
  else if(this.angle < -80)
    this.angle = -80;


	this.show = function(){
    fill(0,255,0);
    if(bird.x+15 > this.x[0] && bird.x-15 < this.x[0]+this.w){
      this.ratio = (bird.x-this.x[0])/this.w;
      if(bird.y+15 > (this.y[0]-this.ratio*this.h) && bird.y-15 < (this.y[0]-this.ratio*this.h) && bird.yvelocity > 0){
        //bird.y = this.y[0]-15;
        bird.direction = this.angle;
        bird.up();
        this.touch = 7;
        if(init == 0)
          score[1] ++;
      }
    }
    if(init == 1){
      rect(xx[0], yy[0]-y, width, height);
      this.angle = 0;
    }
    else{
      strokeWeight(5);
      stroke(255);
      if(this.touch > 0){
        this.touch --;
        stroke(51, 204, 255);
      }
      line(this.x[0], this.y[0]-y, this.x[1], this.y[1]-y);
      stroke(0);
      strokeWeight(0);
    }
    fill(50);

    this.angle = -atan(this.h/this.w) + deviation;
    if(this.angle > 80)
      this.angle = 80;
    else if(this.angle < -80)
      this.angle = -80;
  }
}
