import { db } from '$lib/db/firebase';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	writeBatch,
	updateDoc,
	serverTimestamp
} from 'firebase/firestore';
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
 * Gets all surveys from the firestore
 * @returns {Promise<Survey[]>} A promise resolving with an array of Survey objects
 */
export const getSurveys = async (): Promise<Survey[]> => {
	const querySnapshot = await getDocs(collection(db, 'surveys'));
	const docs: Survey[] = [];
	querySnapshot.forEach((doc) => {
		docs.push({ ...doc.data(), id: doc.id } as Survey);
	});
	return docs;
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

/**
 * Deletes a survey from firestore along with its invites
 * @param id The survey id
 * @throws {Error} if the survey does not exist
 * @returns {Promise<void>} A promise resolving when the deletion is complete
 */
export const deleteSurvey = async (id: string): Promise<void> => {
	// Start batch
	const batch = writeBatch(db);
	const surveyRef = doc(db, 'surveys', id);
	// Get the current survey
	const docSnap = await getDoc(surveyRef);

	if (docSnap.exists()) {
		// If any invites exist, delete them
		if (docSnap.data().invites && docSnap.data().invites.length > 0) {
			docSnap.data().invites.forEach((inviteId: string) => {
				const inviteRef = doc(db, 'invites', inviteId);
				batch.delete(inviteRef);
			});
		}
		// Delete the survey after the invites
		batch.delete(surveyRef);

		// Execute batch
		return batch.commit();
	} else {
		throw new Error(`The survey with id: "${id}" does not exist!`);
	}
};

/**
 * Updates a survey in firestore
 * @param survey The survey object with updated data
 * @throws {Error} if the survey id is undefined
 * @returns {Promise<void>} A promise resolving when the update is complete
 */
export const updateSurvey = async (survey: Survey): Promise<void> => {
	if (survey.id === undefined) {
		throw new Error('Survey id is undefined');
	}
	const surveyRef = doc(db, 'surveys', survey.id);

	await updateDoc(surveyRef, {
		...survey,
		modifiedAt: serverTimestamp()
	});
};
