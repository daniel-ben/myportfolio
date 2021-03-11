let menu = document.querySelector('.menu');
let menu_icon = document.querySelector(".menu-icon");

let click = false;

menu_icon.addEventListener('click', function() {
	if (click) {
		menu.style.opacity = 0;
		click = false;
	}
	
	else {
		menu.style.opacity = 1;
		click = true;
	}
})
