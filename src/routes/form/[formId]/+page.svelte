<script lang="ts">
	import db from '$lib/db/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import type { Survey } from '$lib/types';
	import { page } from '$app/stores';
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import InviteCard from '$lib/components/InviteCard.svelte';

	console.log('id: ');
	let survey: Survey;

	const docRef = doc(db, 'surveys', $page.params.formId);

	const getSurvey = async () => {
		console.log('Loading...');
		const docSnap = await getDoc(docRef);
		console.log('doc: ', docSnap);

		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data());
			survey = docSnap.data() as Survey;
		} else {
			// docSnap.data() will be undefined in this case
			console.log('No such document!');
		}
	};

	const surveyPromise = getSurvey();
</script>

<div class="flex flex-col">
	<h2 id="form" class="ml-6 h2 pt-20 mb-4">Formulario {$page.params.formId}</h2>

	{#if survey}
		<div class="flex justify-center items-center flex-wrap">
			<div class="container card p-4 mx-4 mb-2 space-y-4">
				<span>Datos personales:</span>
				<!-- name -->
				<div>
					<span>Nombre *</span>
					<p class="text-surface-900 font-semibold">{survey?.name}</p>
				</div>

				<!-- surname -->
				<div>
					<span>Apellido/s *</span>
					<p class="text-surface-900 font-semibold">{survey?.surname}</p>
				</div>

				<!-- email -->
				<div>
					<span>Correo electrónico (opcional)</span>
					<p class="text-surface-900 font-semibold">{survey?.email}</p>
				</div>

				<!-- confirm -->
				<div>
					<BoolSelector
						disabled={true}
						label={'¿Vas a venir a la boda?'}
						value={survey?.assistance || false}
						yesLabel={'Sí'}
						noLabel={'No'}
						on:true={() => (survey.assistance = survey?.assistance || true)}
						on:false={() => (survey.assistance = survey?.assistance || false)}
					/>
				</div>
				<!-- +X -->
				{#if survey.invites}
					<div class="space-y-2">
						{#each survey.invites as invite, idx (invite.id)}
							<InviteCard num={idx + 1} {invite} on:remove={() => {}} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
