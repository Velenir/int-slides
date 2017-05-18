const range = document.querySelector(".range");
const input = range.querySelector(".range__input");

input.addEventListener("change", function() {
	console.log(this.value);
	range.style.setProperty("--offset", this.value - 1);
});
