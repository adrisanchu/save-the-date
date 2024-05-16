type User = {
	id: string;
	name: string;
	surname: string;
	email?: string;
};

export type Invite = User & {
	type: string; // main, couple, child, other
	age?: number; // for children
	allergies?: string[]; // list of strings matching allergy accessors
	otherAllergies?: string;
};

export type Survey = {
	id?: string; // firebase id
	createdAt: string; // ISO date string
	createdBy: User; // the user who filled the form
	assistance: boolean; // common for all invites within the survey
};

// If assistance is true...
export type ConfirmedSurvey = Survey & {
	invites: Invite[]; // at least one: the main invite (the one filling the form!)
	busGo: boolean; // common for all invites
	busReturn: boolean; // common for all invites
};

export type InviteOld = {
	id: string;
	type: string; // couple, child, other
	age?: number; // for children
	name: string;
	surname?: string;
	allergies?: string[]; // list of strings matching allergy accessors
	otherAllergies?: string;
};

export type Allergy = {
	accessor: string;
	name: string;
	checked: boolean;
};

export type SurveyOld = {
	name: string;
	surname: string;
	email: string;
	assistance: boolean;
	allergies?: string[]; // list of strings matching allergy accessors
	otherAllergies?: string;
	invites?: Invite[];
};
