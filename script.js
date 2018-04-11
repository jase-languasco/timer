let digits = {'secondOne': null, 'secondTwo': null, 'minuteOne': null, 'minuteTwo': null, 'hourOne': null, 'hourTwo': null};

let hourOne = document.getElementById('hour-one');
let hourTwo = document.getElementById('hour-two');
let minuteOne = document.getElementById('minute-one');
let minuteTwo = document.getElementById('minute-two');
let secondOne = document.getElementById('second-one');
let secondTwo = document.getElementById('second-two');

let clockRunning = false;
let audio = new Audio('times-up.mp3');

const keyCodes = { 48: 0, 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9 };

// inintialize the timer

let timers = document.getElementsByClassName('timer');

for (let i = 0; i < timers.length; i ++) { 
	timers[i].innerHTML =
	`<div id="timer">
		<div id="time-section">
			<span class="digit" id="hour-two">0</span>
			<span class="digit" id="hour-one">0</span>
			<span class="time">h</span>
			<span class="digit" id="minute-two">0</span>
			<span class="digit" id="minute-one">0</span>
			<span class="time">m</span>
			<span class="digit" id="second-two">0</span>
			<span class="digit" id="second-one">0</span>
			<span class="time">s</span>
		</div>
		<div id="control-section">
			<span class="button-container"><button id="start-stop-button">Start</button></span>
			<span class="button-container"><button id="reset-button">Reset</button></span>
		</div>
	</div>`;
}


// reset everything back to zero
document.getElementById('reset-button').onclick = () => {
	clockRunning = false;
	audio.pause();
	hourOne.innerHTML = hourTwo.innerHTML = minuteOne.innerHTML = minuteTwo.innerHTML = secondOne.innerHTML = secondTwo.innerHTML = 0;
	digits.secondOne = digits.secondTwo = digits.minuteOne = digits.minuteTwo = digits.hourOne = digits.hourTwo = 0;
};

// start the clock
document.getElementById('start-stop-button').onclick = () => {

	let seconds = parseInt(secondTwo.innerHTML + secondOne.innerHTML);
	let minutes = parseInt(minuteTwo.innerHTML + minuteOne.innerHTML);
	let hours = parseInt(hourTwo.innerHTML + hourOne.innerHTML);
	
	if (!clockRunning) {
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
		clockRunning = true;
	}
}

// initilize the clock and add keyup event
document.getElementById('time-section').onclick = () => {
	//visual effect when clicking on the timer to indicate the ability to edit
	timer.style.color = 'grey';
	secondOne.style.borderRight = '.02em solid grey';

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
};

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
	
	if (seconds === 0 && minutes === 0 && hours === 0) {
		audio.play();
		return;
	}

	if (seconds > 0) displayTime(seconds, 'second', '--');
	else if (minutes > 0) {
		displayTime(minutes, 'minute', '--');
		displayTime(59, 'second');
	}
	else if (hours > 0) {
		displayTime(hours, 'hour', '--');
		displayTime(59, 'minute');
	}

	setTimeout(countDown, 1000);
}