function mousePosition() {};  //return an array with mouse X and Y positions
function eyePosition() {};    //return an array with eye position relative to screen [r, l, t, b]
function eyeSize() {};        //return an array with eye width and height
function eyeMovement () {};   //return pupil position (x, y) relative to mouse position

let rightEye = document.querySelector('#right-eye');
let rightPupil = document.querySelector('#right-pupil');
let leftEye = document.querySelector('#left-eye');
let leftPupil = document.querySelector('#left-pupil');

window.addEventListener('mousemove', function() {

	let rightCoordinates = eyeMovement(1/8, rightEye);    //mouse position and pupil posistion
	let rpp = [rightCoordinates[2], -rightCoordinates[3]];          //pupil position (x, y)
	let rmp = [rightCoordinates[0], rightCoordinates[1]];          //mouse position (cx, cy)

	let leftCoordinates = eyeMovement(1/8, leftEye);    //mouse position and pupil posistion
	let lpp = [leftCoordinates[2], -leftCoordinates[3]];          //pupil position (x, y)
	let lmp = [leftCoordinates[0], leftCoordinates[1]];          //mouse position (cx, cy)

	rightPupil.style.transform = `translate(${rpp[0]}px, ${rpp[1]}px)`;
	leftPupil.style.transform = `translate(${lpp[0]}px, ${lpp[1]}px)`;

});

function mousePosition(event) {
	let cx = event.clientX;
	let cy = event.clientY;
	let coordinates = [cx, cy]

	return coordinates;
}

function eyePosition(eye) {
	let r = eye.getBoundingClientRect().right;   
	let l = eye.getBoundingClientRect().left;
	let t = eye.getBoundingClientRect().top;  
	let b = eye.getBoundingClientRect().bottom;
	let position = [r, l, t, b];

	return position;
}

function eyeSize(r, l, t, b) {
	//eye width and height
	let ew = r - l  //to get width of any eye size
	let eh = t - b  //to get height of any eye size
	let eyeSize = [ew, eh]

	return eyeSize;
}

function eyeMovement(r, eye) {   //r = radius size relative to eye size (1/8 or 1/2 of eye size)
	//mouse position relative to screen
	let mouseCoordinates = mousePosition(event);
	let mX = mouseCoordinates[0];
	let mY = mouseCoordinates[1];

	//eye position
	let ep = eyePosition(eye);

	//eye size
	let size = eyeSize(ep[0], ep[1], ep[2], ep[3]);
	let ew = size[0];
	let eh = size[1];

	//mouse position relative to eye center
	let cX = mX - (ep[0] - ew/2); //ep[0] - ew/2 = right position - half eye width
	let cY = (ep[2] - eh/2)  - mY;  //ep[2] - eh/2 = top position - half eye height

	//circle trajectory that pupil will follow
	let tg = Math.atan2(cY, cX);            //gets new mouse position tangent in radians
	let radius = r * ew;                    //radius of pupil's circle trajectory
	let X = Math.cos(tg) * radius;          //new mouse X coordinate
	let Y = Math.sin(tg) * radius;         //nem mouse Y coordinate

	//return mouse position and pupil position
	return [cX, cY, X, Y];
};