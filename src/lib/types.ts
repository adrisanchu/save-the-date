import type { FieldValue } from 'firebase/firestore';

/**
 * Basic User information
 */
export type User = {
	id: string; // firebase id
	name: string;
	surname: string;
	email?: string;
};

/**
 * A person assisting to the event
 * (data prepared by the client)
 */
export type InviteClientData = User & {
	type: string; // main, couple, child, other
	age?: number; // for children
	allergies?: string[]; // list of strings matching allergy accessors
	otherAllergies?: string;
};

export type BusOptions = {
	busGo: boolean;
	busReturn: boolean;
};

export type BusOptionsWithReturn = BusOptions & {
	busReturnEarly: boolean;
};

/**
 * A person assiting to the event
 * (if assistance = true)
 */
export type Invite = InviteClientData & {
	surveyId: string;
	assistance: boolean;
	bus?: BusOptions | BusOptionsWithReturn;
};

export type Allergy = {
	accessor: string;
	name: string;
	checked: boolean;
};

export type SurveyClientData = {
	createdBy: User; // the user who filled the form
	invites: string[]; // a list of user ids included within the survey
};

/**
 * A form submitted by a single User
 */
export type Survey = SurveyClientData & {
	id?: string;
	createdAt: FieldValue; // ISO date string
};

export type LegalDetails = {
	name: string;
	id: string;
	address: string;
};
