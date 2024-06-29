import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Survey } from '$lib/typesNew';

const itemName: string = 'surveys';

const defaultStoreValue: Survey[] = [];
const initialStoreValue = browser
	? window.localStorage.getItem(itemName)
		? (JSON.parse(window.localStorage.getItem(itemName) as string) as Survey[])
		: defaultStoreValue
	: defaultStoreValue;

const surveys = writable<Survey[]>(initialStoreValue);

if (typeof localStorage !== 'undefined') {
	surveys.subscribe((value) => localStorage.surveys = JSON.stringify(value));
}

export default surveys;
