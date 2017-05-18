const range = document.querySelector(".range");
const input = range.querySelector(".range__input");

input.addEventListener("change", function() {
	console.log(this.value);
	range.style.setProperty("--offset", this.value - 1);
});


const pill = document.querySelector(".pill");
const pillStyle = pill.style;
let {left: pillStartLeft, top: pillStartTop} = getComputedStyle(pill);
pillStartLeft = parseInt(pillStartLeft);
pillStartTop = parseInt(pillStartTop);

pillStyle.left = pillStartLeft + "px";
pillStyle.top = pillStartTop + "px";

pill.addEventListener("touchstart", touchStart);
pill.addEventListener("mousedown", touchStart);

pill.addEventListener("touchmove", touchMove);
pill.addEventListener("mousemove", touchMove);

pill.addEventListener("touchend", touchEnd);
pill.addEventListener("mouseup", touchEnd);


let pillTracking = {};


function touchStart(e) {
	pillTracking.startX = parseInt(pillStyle.left);
	pillTracking.startY = parseInt(pillStyle.top);
	console.log("TOUCHSTART");
	const pillTouch = e.changedTouches[0];
	pillTracking.x = pillTouch.clientX;
	pillTracking.y = pillTouch.clientY;
}
function touchMove(e) {
	console.log("TOUCHMOVE");
	const pillTouch = e.changedTouches[0];
	
	const dx = Math.floor(pillTracking.x - pillTouch.clientX);
	const dy = Math.floor(pillTracking.y - pillTouch.clientY);
	console.log(dx, dy);
	
	pillStyle.left = pillTracking.startX - dx + "px";
	pillStyle.top = pillTracking.startY - dy + "px";
}
function touchEnd() {
	console.log("TOUCHEND");

	const {left: x, top: y} = pill.getBoundingClientRect();
	const underTouch = document.elementFromPoint(x, y);
	
	console.log(underTouch);
	healGramps(underTouch);
}


const gramps = document.querySelector(".gramps");
const grampsSad = gramps.querySelector(".gramps--sad");

function healGramps(el) {
	if(el === grampsSad) {
		gramps.classList.add("gramps--healed");
		pill.classList.add("pill--out");
	}
}