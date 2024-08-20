const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
export const sleepTrigger = async (miliseconds: number) => {
	await sleep(miliseconds);
};
