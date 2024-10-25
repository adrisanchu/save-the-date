import { db } from '$lib/db/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import type { Survey, Invite } from '$lib/types';

/**
 * Gets all invites from the firestore
 * @returns {Promise<Invite[]>} A promise resolving with an array of Invite objects
 */
export const getInvites = async (): Promise<Invite[]> => {
	const querySnapshot = await getDocs(collection(db, 'invites'));
	const docs: Invite[] = [];
	querySnapshot.forEach((doc) => {
		docs.push(doc.data() as Invite);
	});
	return docs;
};

/**
 * Get an invite from firestore
 * @param id The invite id
 * @throws {Error} if the invite does not exist
 * @returns {Promise<Invite>} A promise resolving with the invite
 */
export const getInvite = async (id: string): Promise<Invite> => {
	const docSnap = await getDoc(doc(db, 'invites', id));
	if (docSnap.exists()) {
		return docSnap.data() as Invite;
	} else {
		// docSnap.data() will be undefined in this case
		console.error('No invite found for id: ', id);
		throw new Error(`The document with id: "${id}" does not exist!`);
	}
};

/**
 * Gets a survey from firestore
 * @param id The survey id
 * @throws {Error} if the survey does not exist
 * @returns {Promise<Survey>} A promise resolving with the survey
 */
export const getSurvey = async (id: string): Promise<Survey> => {
	const surveyRef = doc(db, 'surveys', id);
	const surveySnapshot = await getDoc(surveyRef);
	if (surveySnapshot.exists()) {
		return { ...surveySnapshot.data(), id } as Survey;
	} else {
		throw new Error(`The document with id: "${id}" does not exist!`);
	}
};
