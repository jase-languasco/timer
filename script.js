/**************
* Initialize HTML
**************/

let timer = document.getElementById('timer');

let timeSection = document.createElement('div');
timeSection.id = 'time-section';

let hourTwo = document.createElement('span');
hourTwo.id = 'hour-two';
hourTwo.className = 'digit';
hourTwo.innerHTML = 0;
timeSection.appendChild(hourTwo);

let hourOne = document.createElement('span');
hourOne.id = 'hour-one';
hourOne.className = 'digit';
hourOne.innerHTML = 0;
timeSection.appendChild(hourOne);

let h = document.createElement('span');
h.className = 'time';
h.innerHTML = 'h';
timeSection.appendChild(h);

let minuteTwo = document.createElement('span');
minuteTwo.id = 'minute-two';
minuteTwo.className = 'digit';
minuteTwo.innerHTML = 0;
timeSection.appendChild(minuteTwo);

let minuteOne = document.createElement('span');
minuteOne.id = 'minute-one';
minuteOne.className = 'digit';
minuteOne.innerHTML = 0;
timeSection.appendChild(minuteOne);

let m = document.createElement('span');
m.className = 'time';
m.innerHTML = 'm';
timeSection.appendChild(m);

let secondTwo = document.createElement('span');
secondTwo.id = 'second-two';
secondTwo.className = 'digit';
secondTwo.innerHTML = 0;
timeSection.appendChild(secondTwo);

let secondOne = document.createElement('span');
secondOne.id = 'second-one';
secondOne.className = 'digit';
secondOne.style.borderRight = '.02em solid white'
secondOne.innerHTML = 0;
timeSection.appendChild(secondOne);

let s = document.createElement('span');
s.className = 'time';
s.innerHTML = 's';
timeSection.appendChild(s);

let timerControls = document.createElement('div');
timerControls.id = 'control-section';

let startButtonContainer = document.createElement('span');
startButtonContainer.className = 'button-container';

let startButton = document.createElement('button');
startButton.id = 'start-button';
startButton.className = 'button';
startButton.innerHTML = 'Start';

startButtonContainer.appendChild(startButton);

let resetButtonContainer = document.createElement('span');
resetButtonContainer.className = 'button-container';

let resetButton = document.createElement('button');
resetButton.id = 'reset-button';
resetButton.className = 'button';
resetButton.innerHTML = 'Reset';

resetButtonContainer.appendChild(resetButton);

timerControls.appendChild(startButtonContainer);
timerControls.appendChild(resetButtonContainer);

timer.appendChild(timeSection);
timer.appendChild(timerControls);

/***********
* Setup Program
***********/

let digits = {'secondOne': null, 'secondTwo': null, 'minuteOne': null, 'minuteTwo': null, 'hourOne': null, 'hourTwo': null};
let cursorId;
let clockRunning = false;
let audio = new Audio('times-up.mp3');

/************
* Functions
************/
	
// initialize timer to type in digits
const initTimer = () => {
	
	startBlinkingCursor();
	
	const keyCodes = { 48: 0, 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9 };

	document.onkeyup = (key) => {
		if (key.which == 8) {
			if (parseInt(hourTwo.innerHTML) !== 0) {
				hourTwo.innerHTML = 0;
				digits.hourTwo = null;
			}
			else if (parseInt(hourOne.innerHTML) !== 0) {
				hourOne.innerHTML = 0;
				digits.hourOne = null;
			}
			else if (parseInt(minuteTwo.innerHTML) !== 0) {
				minuteTwo.innerHTML = 0;
				digits.minuteTwo = null;
			}
			else if (parseInt(minuteOne.innerHTML) !== 0) {
				minuteOne.innerHTML = 0;
				digits.minuteOne = null;
			}
			else if (parseInt(secondTwo.innerHTML) !== 0) {
				secondTwo.innerHTML = 0;
				digits.secondTwo = null;
			}
			else if (parseInt(secondOne.innerHTML) !== 0) {
				secondOne.innerHTML = 0;
				digits.secondOne = null;
			}
		}
		else if (keyCodes[key.which] !== undefined) {

			if (digits.secondOne == null) {
				secondOne.innerHTML = keyCodes[key.which];
				
				digits.secondOne = keyCodes[key.which];
			}
			else if (digits.secondTwo == null) {
				secondTwo.innerHTML = secondOne.innerHTML;
				secondOne.innerHTML = keyCodes[key.which];

				digits.secondTwo = digits.secondOne;
				digits.secondOne = keyCodes[key.which];
			}
			else if (digits.minuteOne == null) {
				minuteOne.innerHTML = secondTwo.innerHTML;
				secondTwo.innerHTML = secondOne.innerHTML;
				secondOne.innerHTML = keyCodes[key.which];

				digits.minuteOne = digits.secondTwo;
				digits.secondTwo = digits.secondOne;
				digits.secondOne = keyCodes[key.which];
			}
			else if (digits.minuteTwo == null) {
				minuteTwo.innerHTML = minuteOne.innerHTML;
				minuteOne.innerHTML = secondTwo.innerHTML;
				secondTwo.innerHTML = secondOne.innerHTML;
				secondOne.innerHTML = keyCodes[key.which];

				digits.minuteTwo = digits.minuteOne;
				digits.minuteOne = digits.secondTwo;
				digits.secondTwo = digits.secondOne;
				digits.secondOne = keyCodes[key.which];
			}
			else if (digits.hourOne == null) {
				hourOne.innerHTML = minuteTwo.innerHTML;
				minuteTwo.innerHTML = minuteOne.innerHTML;
				minuteOne.innerHTML = secondTwo.innerHTML;
				secondOne.innerHTML = keyCodes[key.which];

				digits.hourOne = digits.minuteTwo;
				digits.minuteTwo = digits.minuteOne;
				digits.minuteOne = digits.secondTwo;
				digits.secondTwo = digits.secondOne;
				digits.secondOne = keyCodes[key.which];
			}
			else if (digits.hourTwo == null) {
				hourTwo.innerHTML = hourOne.innerHTML;
				hourOne.innerHTML = minuteTwo.innerHTML;
				minuteTwo.innerHTML = minuteOne.innerHTML;
				minuteOne.innerHTML = secondTwo.innerHTML;
				secondTwo.innerHTML = secondOne.innerHTML;
				secondOne.innerHTML = keyCodes[key.which];

				digits.hourTwo = digits.hourOne;
				digits.hourOne = digits.minuteTwo;
				digits.minuteTwo = digits.minuteOne;
				digits.minuteOne = digits.secondTwo;
				digits.secondTwo = digits.secondOne;
				digits.secondOne = keyCodes[key.which];
			}
			else {
				hourTwo.innerHTML = hourOne.innerHTML;
				hourOne.innerHTML = minuteTwo.innerHTML;
				minuteTwo.innerHTML = minuteOne.innerHTML;
				minuteOne.innerHTML = secondTwo.innerHTML;
				secondTwo.innerHTML = secondOne.innerHTML;
				secondOne.innerHTML = keyCodes[key.which];

				digits.hourTwo = digits.hourOne;
				digits.hourOne = digits.minuteTwo;
				digits.minuteTwo = digits.minuteOne;
				digits.minuteOne = digits.secondTwo;
				digits.secondTwo = digits.secondOne;
				digits.secondOne = keyCodes[key.which];						
			}
		}
	}
}

// reset everything back to zero
const resetTimer = () => {
	endBlinkingCursor(cursorId);
	clockRunning = false;
	//audio.pause();
	hourOne.innerHTML = hourTwo.innerHTML = minuteOne.innerHTML = minuteTwo.innerHTML = secondOne.innerHTML = secondTwo.innerHTML = 0;
	digits.secondOne = digits.secondTwo = digits.minuteOne = digits.minuteTwo = digits.hourOne = digits.hourTwo = 0;
}

// start timer
const startTimer = () => {
	let seconds = parseInt(secondTwo.innerHTML + secondOne.innerHTML);
	let minutes = parseInt(minuteTwo.innerHTML + minuteOne.innerHTML);
	let hours = parseInt(hourTwo.innerHTML + hourOne.innerHTML);
	
	if (!clockRunning) {
		clockRunning = true;
		timer.style.color = '#000';
		secondOne.style.border = 'none';

		if (hours === 99 && minutes === 99 && seconds === 99) {
			// if the clock is maxed out we'll leave hours alone and set minutes and seconds to the appropriate time
			displayTime(59, 'second');
			displayTime(59, 'minute');
		}
		else {
			if (seconds > 59) {
				let amountOfTime = seconds;
				let extraMinutes = Math.floor(amountOfTime/59);
				seconds = amountOfTime - (extraMinutes * 59);
				displayTime(seconds, 'second');
				displayTime(extraMinutes, 'minute');
			}

			if (minutes > 59) {
				let amountOfTime = minutes;
				let extraHours = Math.floor(amountOfTime/59);
				minutes = amountOfTime - (extraHours * 59);
				hours += extraHours;
				if (hours > 99) hours = 99;
				displayTime(hours, 'hour');
			}
		}

		countDown();
	}
}

// convert time into display
const displayTime = (amountOfTime, unitOfTime, direction=null) => {	
	if (direction === '--') amountOfTime --;
	else if (direction === '++') amountOfTime ++;

	let numbers = amountOfTime.toString().split('');
	
	if (numbers.length == 1) {
		numbers[1] = numbers[0];
		numbers[0] = 0;
	}

	switch (unitOfTime) {
		case 'second':
			secondTwo.innerHTML = numbers[0];
			secondOne.innerHTML = numbers[1];
			break;
		case 'minute':
			minuteTwo.innerHTML = numbers[0];
			minuteOne.innerHTML = numbers[1];
			break;
		case 'hour':
			hourTwo.innerHTML = numbers[0];
			hourOne.innerHTML = numbers[1];
			break;
		default:
			break;
	}
	return;
}

const countDown = () => {
	let seconds = parseInt(secondTwo.innerHTML + secondOne.innerHTML);
	let minutes = parseInt(minuteTwo.innerHTML + minuteOne.innerHTML);
	let hours = parseInt(hourTwo.innerHTML + hourOne.innerHTML);

	if (seconds > 0) displayTime(seconds, 'second', '--');
	else if (minutes > 0) {
		displayTime(minutes, 'minute', '--');
		displayTime(59, 'second');
	}
	else if (hours > 0) {
		displayTime(hours, 'hour', '--');
		displayTime(59, 'minute');
	}

	seconds = parseInt(secondTwo.innerHTML + secondOne.innerHTML);
	minutes = parseInt(minuteTwo.innerHTML + minuteOne.innerHTML);
	hours = parseInt(hourTwo.innerHTML + hourOne.innerHTML);

	if (seconds === 0 && minutes === 0 && hours === 0) {
		audio.play();
		return;
	}

	setTimeout(countDown, 1000);
}

const startBlinkingCursor = () => {
	if (!cursorId) {
		cursorId = setInterval(function () {
			if (secondOne.style.borderRight === '0.02em solid white') secondOne.style.borderRight = '.02em solid grey';
			else secondOne.style.borderRight = '.02em solid white';

		}, 250);
	}
}

const endBlinkingCursor = (id) => {
	clearInterval(id);
}

// reset everything back to zero
resetButton.onclick = resetTimer;

// start the clock
startButton.onclick = startTimer;

// initilize the clock and add keyup event
timeSection.onclick = initTimer;

