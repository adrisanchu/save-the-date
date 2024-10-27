import type { Timestamp } from 'firebase/firestore';

/**
 * Possible check statuses
 */
type CheckStatus = 'pending' | 'accepted' | 'to review';

/**
 * Whether something was checked by an admin
 */
export type Checked = {
	by: string; // admin id
	at: Timestamp; // Firestore timestamp
	status: CheckStatus;
	comment?: string; // admin comment
};

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
	createdAt: Timestamp; // Firestore timestamp
	modifiedAt?: Timestamp; // Firestore timestamp
	checked?: Checked; // whether the survey was checked by an admin
};

export type LegalDetails = {
	name: string;
	id: string;
	address: string;
};
