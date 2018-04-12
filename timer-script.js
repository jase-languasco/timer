/**************
* Initialize HTML
**************/

let timer = document.getElementById('timer');

let timerContainer = document.createElement('div');
timerContainer.id = 'timer-container';

let upperControls = document.createElement('div');
upperControls.className = 'upper-controls';

let twentyMin = document.createElement('button');
twentyMin.className = 'twenty-minute quick-set button';
twentyMin.innerHTML = '20 min';
//twentyMin.innerHTML = '<image src="http://www.pngmart.com/files/1/Tomato-Clip-Art-Cartoon-PNG.png" height="20px"; width="20px">'
twentyMin.dataset.time = '20m';

let fiveMin = document.createElement('button');
fiveMin.className = 'five-minute quick-set button';
fiveMin.innerHTML = '5 min';
fiveMin.dataset.time = '05m';

upperControls.appendChild(twentyMin);
upperControls.appendChild(fiveMin);
timerContainer.appendChild(upperControls);

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

let startButton = document.createElement('button');
startButton.id = 'start-button';
startButton.className = 'button control-button';
startButton.innerHTML = 'Start';

let resetButton = document.createElement('button');
resetButton.id = 'reset-button';
resetButton.className = 'button control-button';
resetButton.innerHTML = 'Reset';

timerControls.appendChild(startButton);
timerControls.appendChild(resetButton);

timerContainer.appendChild(timeSection);
timerContainer.appendChild(timerControls);

timer.appendChild(timerContainer);

/***********
* Setup App
***********/

let digits = {'secondOne': null, 'secondTwo': null, 'minuteOne': null, 'minuteTwo': null, 'hourOne': null, 'hourTwo': null};
let cursorId;
let countDownId;
let clockRunning = false;
let audio = new Audio('times-up.mp3');

/************
* Functions
************/
	
// initialize timer to type in digits
const initTimer = () => {
	
	if (clockRunning) return;
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
	endTimer();
	hourOne.innerHTML = hourTwo.innerHTML = minuteOne.innerHTML = minuteTwo.innerHTML = secondOne.innerHTML = secondTwo.innerHTML = 0;
	digits.secondOne = digits.secondTwo = digits.minuteOne = digits.minuteTwo = digits.hourOne = digits.hourTwo = null;
}

// start timer
const startTimer = () => {
	let seconds = parseInt(secondTwo.innerHTML + secondOne.innerHTML);
	let minutes = parseInt(minuteTwo.innerHTML + minuteOne.innerHTML);
	let hours = parseInt(hourTwo.innerHTML + hourOne.innerHTML);
	
	// shouldn't be able to click start if everything is set to zero or if the clock has already been started
	if (!clockRunning && (seconds > 0 || minutes > 0 || hours > 0)) {
		endBlinkingCursor();
		clockRunning = true;

		if (hours === 99 && minutes === 99 && seconds === 99) {
			// if the clock is maxed out we'll leave hours alone and set minutes and seconds to the appropriate time
			displayTime(59, 'second');
			displayTime(59, 'minute');
		}
		else {
			if (seconds > 59) {
				let extraMinutes = Math.floor(seconds/59);
				seconds -= (extraMinutes * 59);
				minutes += extraMinutes;
				displayTime(seconds, 'second');
				displayTime(minutes, 'minute');
			}

			if (minutes > 59) {
				let extraHours = Math.floor(minutes/59);
				minutes -= (extraHours * 59);
				hours += extraHours;
				if (hours > 99) hours = 99;
				displayTime(minutes, 'minute');
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
		endTimer();
		return;
	}

	countDownId = setTimeout(countDown, 1000);
}

const endTimer = () => {
	clockRunning = false;
	endBlinkingCursor();
	clearTimeout(countDownId);
}

const startBlinkingCursor = () => {
	if (!cursorId) {
		timeSection.style.color = 'grey';
		cursorId = setInterval(function () {
			if (secondOne.style.borderRight === '0.02em solid white') secondOne.style.borderRight = '.02em solid grey';
			else secondOne.style.borderRight = '.02em solid white';

		}, 250);
	}
}

const endBlinkingCursor = () => {
	clearInterval(cursorId);
	secondOne.style.borderRight = '.02em solid white';
	timeSection.style.color = 'black';
	cursorId = undefined;
}

/********
* Execute
*********/

// quick set button
let quickSetButtons = document.getElementsByClassName('quick-set');

for (let i = 0; i < quickSetButtons.length; i++) {
	quickSetButtons[i].onclick = () => {
		let quickTime = quickSetButtons[i].dataset.time.split('');
		switch (quickTime[2]) {
			case 's':
				displayTime(parseInt(quickTime[0]+quickTime[1]), 'second');
				break;
			case 'm':
				displayTime(parseInt(quickTime[0]+quickTime[1]), 'minute');
				break;
			case 'h':
				displayTime(parseInt(quickTime[0]+quickTime[1]), 'hour');
				break;
			default:
				break;
		}
	};
}

// reset everything back to zero
resetButton.onclick = resetTimer;

// start the clock
startButton.onclick = startTimer;

// initilize the clock and add keyup event
timeSection.onclick = initTimer;

