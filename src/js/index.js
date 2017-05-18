const slide1 = document.querySelector(".slide--1");
const range = slide1.querySelector(".range");
const input = range.querySelector(".range__input");

input.addEventListener("change", function() {
	console.log(this.value);
	range.style.setProperty("--offset", this.value - 1);
});


const pill = slide1.querySelector(".pill");
const pillStyle = pill.style;
let {left: pillStartLeft, top: pillStartTop} = getComputedStyle(pill);
pillStartLeft = parseInt(pillStartLeft);
pillStartTop = parseInt(pillStartTop);

pillStyle.left = pillStartLeft + "px";
pillStyle.top = pillStartTop + "px";

pill.addEventListener("touchstart", touchStart);

pill.addEventListener("touchmove", touchMove);

pill.addEventListener("touchend", touchEnd);


const pillTracking = {};


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


const gramps = slide1.querySelector(".gramps");
const grampsSad = gramps.querySelector(".gramps--sad");

function healGramps(el) {
	if(el === grampsSad) {
		gramps.classList.add("gramps--healed");
		pill.classList.add("pill--out");
	}
}


const arrows = document.querySelectorAll(".nav");
const slides = document.querySelector(".slides");

arrows[0].addEventListener("click", (e) => {
	e.preventDefault();
	slides.classList.remove("slides--locked");
});

arrows[1].addEventListener("click", (e) => {
	e.preventDefault();
	lockData();
	slides.classList.add("slides--locked");
});


const checks = slide1.querySelectorAll(".check-button__checkbox");

const slide2 = document.querySelector(".slide--2");
const range2 = slide2.querySelector(".range");
const input2 = range2.querySelector(".range__input");
const pill2 = slide2.querySelector(".pill");
const gramps2 = slide2.querySelector(".gramps");
const checks2 = slide2.querySelectorAll(".check-button__checkbox");

function lockData() {
	range2.style.setProperty("--offset", input.value - 1);
	input2.value = input.value;
	
	Object.assign(pill2.style, pill.style);
	pill2.classList.toggle("hidden", pill.classList.contains("pill--out"));
	
	gramps2.className = gramps.className;
	
	for(let i = 0, len = checks.length; i < len; ++i) {
		checks2[i].checked = checks[i].checked;
	}
}