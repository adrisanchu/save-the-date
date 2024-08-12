export type DiffTime = {
	months?: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

export type DiffTimeStr = {
	months?: string;
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
};

/**
 * Calculates the countdown time between two given dates.
 *
 * @param {Date} startDate - The start date of the countdown.
 * @param {Date} endDate - The end date of the countdown.
 * @return {Object} An object containing the countdown time in months, days, hours, minutes and seconds.
 */
export function countdownTimer(startDate: Date, endDate: Date): DiffTimeStr {
	// Calculate the distance between now and the count down date
	const diffTime = endDate.getTime() - startDate.getTime();
	// Distance in days
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	// Distance in months
	const diffMonths = Math.floor(diffDays / 30);
	// Substract the remaining days
	const diffDaysInMonth = diffDays % 30;

	// Time calculations for hours, minutes and seconds
	const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
	const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

	return {
		months: ('0' + diffMonths).slice(-2),
		days: ('0' + diffDaysInMonth).slice(-2),
		hours: ('0' + diffHours).slice(-2),
		minutes: ('0' + diffMinutes).slice(-2),
		seconds: ('0' + diffSeconds).slice(-2)
	};
}
