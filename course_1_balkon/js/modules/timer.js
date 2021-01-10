const timer = (id, deadline) => {

	const addZero = (num) => {
		if (num <= 9) {
			return '0' + num;
		}
		else {
			return num;
		}
	}

	const getTimeRemaining = (endtime) => {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			days = Math.floor((t / (1000 * 60 * 60 * 24)));
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	};

	const setClock = (selectorObj, endtime) => {
		const timer = document.querySelector(selectorObj.parent),
			days = timer.querySelector(selectorObj.days),
			hours = timer.querySelector(selectorObj.hours),
			minutes = timer.querySelector(selectorObj.minutes),
			seconds = timer.querySelector(selectorObj.seconds),
			timeInterval = setInterval(updateClock, 1000);
		updateClock();
		
		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.textContent = addZero(t.days);
			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if (t.total <= 0) {
				days.textContent = '00';
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
				clearInterval(timeInterval);
			}

		}
	}

	setClock(id, deadline);
};

export default timer;