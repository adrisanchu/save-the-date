export type Invite = {
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

export type Survey = {
	name: string;
	surname: string;
	email: string;
	assistance: boolean;
	allergies?: string[]; // list of strings matching allergy accessors
	otherAllergies?: string;
	invites?: Invite[];
};
