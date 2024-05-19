<script lang="ts">
	import db from '$lib/db/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import type { Survey } from '$lib/types';
	import { page } from '$app/stores';

	console.log('id: ');

	const docRef = doc(db, 'surveys', $page.params.formId);

	const getSurvey = async () => {
		const docSnap = await getDoc(docRef);
		console.log('doc: ', docSnap);

		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data());
			return docSnap.data() as Survey;
		} else {
			// docSnap.data() will be undefined in this case
			console.log('No such document!');
		}
	};

	const surveyPromise = getSurvey();
</script>

<div class="flex flex-col">
	<h2 id="form" class="ml-6 h2 pt-20 mb-4">Formulario {$page.params.formId}</h2>

	{#await surveyPromise}
		<p>...cargando formulario...</p>
	{:then data}
		<p>promesa resuelta con {data?.name}, {data?.surname}</p>
	{/await}
</div>
