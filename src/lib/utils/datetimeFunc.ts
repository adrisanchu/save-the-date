export type DiffTime = {
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

export type DiffTimeStr = {
	months: string;
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
};

/**
 * Calculates the countdown time between two given dates, within the same year.
 *
 * @param {Date} startDate - The start date of the countdown.
 * @param {Date} endDate - The end date of the countdown.
 * @return {Object} An object containing the countdown time in months, days, hours, minutes and seconds.
 */
export function countdownTimer(startDate: Date, endDate: Date): DiffTimeStr {
	if (startDate > endDate) {
		// unable to calculate a date difference
		return {
			months: '00',
			days: '00',
			hours: '00',
			minutes: '00',
			seconds: '00'
		};
	}

	if (startDate.getFullYear() !== endDate.getFullYear()) {
		// different years!
		// unable to calculate a date difference
		return {
			months: '00',
			days: '00',
			hours: '00',
			minutes: '00',
			seconds: '00'
		};
	}

	// Calculate the distance between now and the count down date
	const diffTime = endDate.getTime() - startDate.getTime();
	// Distance in days
	let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	// Days per month, from January to December
	let diffMonths = 0;
	const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Adjust the number of months and days accordingly
	for (let i = startDate.getMonth(); i <= endDate.getMonth(); i++) {
		if (diffDays >= daysPerMonth[i]) {
			diffMonths += 1;
			diffDays -= daysPerMonth[i];
		}
	}

	// Time calculations for hours, minutes and seconds
	const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
	const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

	return {
		months: ('0' + diffMonths).slice(-2),
		days: ('0' + diffDays).slice(-2),
		hours: ('0' + diffHours).slice(-2),
		minutes: ('0' + diffMinutes).slice(-2),
		seconds: ('0' + diffSeconds).slice(-2)
	};
}
