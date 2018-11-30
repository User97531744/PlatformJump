//cookies
//initialised cookies;
/*
document.cookie = "s1=0;path=/";
document.cookie = "s2=0;path=/";
document.cookie = "s3=0;path=/";
document.cookie = "h1=0;path=/";
document.cookie = "h2=0;path=/";
document.cookie = "h3=0;path=/";
*/
var bird;
var txt = 0;
var highScore = 0;
var frame;
var angle = 0
var boost = 0;
var intro = 0;
energy = 1040;
lightning = -1;
var platforms = [];
var drawtrack = [0, 0, 0, 0];
var y = 0;
var makeline = 1;
//[height, jumps]
this.score = [0, 0];
//to store height of character
var climb = 0
//to track number of jumps
var jumps = 0;
var deviation = 0;

function setup() {
	//createCanvas(displayWidth/window.devicePixelRatio-10, displayHeight/window.devicePixelRatio - 82);
	createCanvas(displayWidth -10, displayHeight - 82);
	reset();
}

function reset() {
	angle = 0
	tracker = frameCount +10;
	boost = 0;
	deviation = 0;
	energy = 1040;
	platforms = [];
	drawtrack = [0, 0, 0, 0];
	y = 0;
	//[height, jumps]
	this.score = [0, 0];
	bird = new Bird();
	l = new spark();
	platforms.push(new platform([0, width], [height-30, height-30], 1));
	frame = frameCount;
	angleMode(DEGREES);
	bird.lose = 0;
	loop();
}

function draw(){
	colorMode(HSB, 127);
	background((-y/13.3%155), (-y/10.3)%255, (-y/14.23)%255);
	colorMode(RGB, 127);

	if (keyIsDown(32)){
		boost = 1;
	}
	bird.update();

	for(i = 0; i < platforms.length; i++)
		platforms[i].show();

	bird.show();


	//pan up
	if(bird.y < (y+height)-height*0.75)
		y += bird.yvelocity;
	//delete old platforms
	if(platforms.length > 0){
		if(platforms[0].y[0] > this.y + height)
			platforms.shift();
	}
	score[0] = Math.round(y*-1/10);
	textSize(35);

	colorMode(HSB, 127);
	fill((-y/13.3+27)%155, (-y/10.3+127)%255, (-y/14.23+127)%255);
	text(score[0], 20, 50+y);
	text(score[1], 20, 95+y);
	textSize(15);
	text("Height", 20, 20+y);
	text("Jumps", 20, 65+y);
	textSize(38);

	colorMode(RGB, 127);

	text(getCookie("s1"), 20, 80+y);
	text(getCookie("h1"), 20, 100+y);
	text(getCookie("s2"), 20, 120+y);
	text(getCookie("h2"), 20, 140+y);
	text(getCookie("s3"), 20, 160+y);
	text(getCookie("h3"), 20, 180+y);

	if(lightning == 1)
		l.update();

	//for controlling line length when energy low
	if(makeline == 1){
		temp = abs(distance(drawtrack[0], drawtrack[1], mouseX, mouseY+y));
		if(energy < temp){
			ratio = energy/temp;
			drawtrack[2] = drawtrack[0] + (mouseX - drawtrack[0]) * ratio;
			drawtrack[3] = drawtrack[1] + (mouseY+y - drawtrack[1]) * ratio;
		}
		else{
			drawtrack[2] = mouseX;
			drawtrack[3] = mouseY+y;
		}
		makeLine();
	}

	strokeWeight(7);
	stroke(255);
	line(width/2, height/20+y, 15*width/16, height/20+y);
	strokeWeight(5);
	stroke(255-energy/4, energy/4, 0);
	line(width/2+(7*width/16*(1040-energy)/1040), height/20+y, 15*width/16, height/20+y);
	stroke(0);
	strokeWeight(0);

	if(energy < 1040){
		energy+= 2;
	}

	textAlign(CENTER);
	textSize(18);
	text("DEVIATION", 12.5*width/15, height/10+y);
	text(deviation, 12.5*width/15, height/7.5+y);
	textAlign(LEFT);
	text("BEST", width/2, height/10+y);
	text(highScore, width/2, height/7.5+y);
	textSize(38);
	if(deviation < 0){
		drawArrow(13.5*width/15, height/8.8, 10, [255, 50]);
		drawArrow(11.5*width/15, height/8.8+10, -10, [0, 255, 0]);
	}
	else if(deviation > 0){
		drawArrow(13.5*width/15, height/8.8, 10, [0, 255, 0]);
		drawArrow(11.5*width/15, height/8.8+10, -10, [255, 50]);
	}
	else{
		drawArrow(13.5*width/15, height/8.8, 10, [255, 50]);
		drawArrow(11.5*width/15, height/8.8+10, -10, [255, 50]);
	}


//deviation
	if(score[0] > 150){
		if(int(random(7)) == 2)
			deviation += int(random(-3, 3));
		if(frameCount % 100 == 0){
			deviation = int(random((-score[0]+200)/20, (score[0]-200)/20));
		}
	  if(deviation > 80)
	    deviation = 80;
	  else if(deviation < -80)
	    deviation = -80;
	}

	boost = 0;
}

function mousePressed(){
	if(bird.lose == 1){
		reset();
	}
	makeline = 1;
	drawtrack[0] = mouseX;
	drawtrack[1] = mouseY+y;
	//doesnt really do anything, just precaution
	drawtrack[2] = mouseX;
	drawtrack[3] = mouseY+y;
}

function makeLine(){
	strokeWeight(5);
	stroke(255);
	line(drawtrack[0], drawtrack[1], drawtrack[2], drawtrack[3]);
	stroke(0);
	strokeWeight(0);
}

function mouseReleased() {
	if(mouseX < width/15 && mouseY < height/20)
		lightning *= -1;
	makeline = 0;
	if(tracker < frameCount){
		temp = distance(drawtrack[0], drawtrack[1], drawtrack[2], drawtrack[3]);

		if(drawtrack[0] < drawtrack[2]){
			platforms.push(new platform([drawtrack[0], drawtrack[2]], [drawtrack[1], drawtrack[3]]));
		}
		else {
			platforms.push(new platform([drawtrack[2], drawtrack[0]], [drawtrack[3], drawtrack[1]]));
		}

		if(temp > 0)
			energy -= temp;
		else {
			energy += temp
		}
	}
}

function drawArrow(xx = 0, yy = 0, s = 50, col){
	colorMode(RGB, 127);
	fill(col);
	beginShape();
	strokeWeight(0);
  vertex(xx, yy+y);
  vertex(xx, yy+s+y);
  vertex(xx+s, yy+s+y);
  vertex(xx+s, yy+s*1.3+y);
  vertex(xx+s*2, yy+s/2+y);
  vertex(xx+s, yy-s*0.3+y);
  vertex(xx+s, yy+y);
	vertex(xx, yy+y);
  endShape();
	strokeWeight(1);
}

function distance(x1, y1, x2, y2){
	return 2*sqrt((x2-x1)*(x2-x1) + (y1-y2)*(y1-y2));
}
