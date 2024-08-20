import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const itemName: string = 'surveys';

const defaultStoreValue: string[] = [];
const initialStoreValue = browser
	? window.localStorage.getItem(itemName)
		? (JSON.parse(window.localStorage.getItem(itemName) as string) as string[])
		: defaultStoreValue
	: defaultStoreValue;

const surveys = writable<string[]>(initialStoreValue);

if (typeof localStorage !== 'undefined') {
	surveys.subscribe((value) => (localStorage.surveys = JSON.stringify(value)));
}

export default surveys;
