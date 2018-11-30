function Bird(){
	this.y = height/2;
	this.height = 0;
	this.x = width/2;
	this.gravity = 0.2;
	this.yvelocity = 0;
	this.xvelocity = 0;
	this.angle = 0;
	this.direction = 0;
	this.frame = 3600000;
	this.const = 5;
	this.spin = 0;
	this.health = 450;
	this.lose = 0;
	this.strength = 55;

	this.show = function(){
		fill(51, 204, 255);
		translate(this.x, this.height);
		rotate(this.angle);
		triangle(-15, 15, 15, 15, 0, -15);
		if (boost == 1){
			this.frame += this.spin;
			fill(0, 255, 0);
			stroke(255, 255, 0);
			strokeWeight(2);
			line(-10, 16, -10, 22);
			line(-5, 16, -5, 20);
			line(0, 16, 0, 24);
			line(5, 16, 5, 20);
			line(10, 16, 10, 22);
			stroke(0);
			strokeWeight(1);
		}
		else {
			fill(255, 0, 0);
		}
		triangle(-15, 15, 15, 15, 0, 5);

		//background
		translate(0, 0);
		rotate(-this.angle);
		translate(-this.x, -this.y);
		fill(255, 120, 0, 180);
		strokeWeight(0);
	}

this.up = function(){
	this.yvelocity = this.gravity*this.strength*sin(this.direction-90);
	this.xvelocity = this.gravity*this.strength*sin(this.direction);
	if (this.direction < 180){
		this.spin = (this.direction)/this.const;
	}
	else{
		this.spin = -(360-this.direction)/this.const;
	}
}

this.update = function(){
		this.yvelocity += this.gravity;
		this.y += this.yvelocity;
		this.x += this.xvelocity;
		//actual height
		this.height = this.y - y;
		this.angle = this.frame%360;
		this.frame += this.spin;

		if (this.height > height-5){
			this.height = height-5;
			this.yvelocity = 0;
			this.health = 0;
		}

		if (this.x < 0){
			this.x = width;
		}

		if (this.x > width){
			this.x = 0;
		}

		if (this.health <1){
			this.lose = 1;
			if(score[0] > highScore)
				highScore = score[0];
			background(0);
			fill(255, 0, 0, 80);
			rect(0, 0, width, height);
			fill(255);
			textSize(38);
			hmm = ["Nup", "Nope", "Try again", ":("];
			textAlign(CENTER);
			text(random(hmm), width/2, height/2);
			textAlign(LEFT);


			if(score[0] > int(getCookie("s2"))){
				document.cookie = "s2=" + score[0].toString() + ";path=/";
				document.cookie = "h2=" + score[1].toString() + ";path=/";
			}
			if(score[1] > int(getCookie("h3"))){
				document.cookie = "h3=" + score[1].toString() + ";path=/";
				document.cookie = "s3=" + score[0].toString() + ";path=/";
			}
			document.cookie = "s1=" + getCookie("s2") + ";path=/";
			document.cookie = "h1=" + getCookie("h3") + ";path=/";
			noLoop();
		}
	}
}

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getYear() + 100);
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=..";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function ReadCookie()
 {
		var allcookies = document.cookie;
		document.write ("All Cookies : " + allcookies );

		// Get all the cookies pairs in an array
		cookiearray = allcookies.split(';');

		// Now take key value pair out of this array
		for(var i=0; i<cookiearray.length; i++){
			 name = cookiearray[i].split('=')[0];
			 value = cookiearray[i].split('=')[1];
			 document.write ("Key is : " + name + " and Value is : " + value);
		}
 }
