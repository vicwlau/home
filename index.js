
const intro_1 = `development journal`;
const intro_2 = 'by: victor lau';

document.querySelector('.introduction-1').textContent = intro_1;
document.querySelector('.introduction-name').textContent = intro_2;


var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = 800;
c.width = 1200;

//chinese characters - taken from the unicode charset
var words = ["0","1"];
//converting the string into an array of single characters


var font_size = 35;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = 1; 

//drawing the characters
function draw()
{
   var grd = ctx.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, "white");
    grd.addColorStop(1, "rgba(100,100,100,0.6)");
	
    //Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgba(255, 255, 255, .15)";
	ctx.fillRect(0, 0, c.width, c.height);
	
	ctx.fillStyle = grd; //green text
    //use Noto Sans SC for chinese characters
	ctx.font = font_size + "px Noto Sans SC";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{
		//a random chinese character to print
		var text = words[Math.floor(Math.random()*words.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size);
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > c.height && Math.random() > 0.975)
			drops[i] = 0;
		
		//incrementing Y coordinate
		drops[i] += 1;
	}
}

setInterval(() => {
    setTimeout(draw, 1700);
}, 33);
