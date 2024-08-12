<script lang="ts">
	import db from '$lib/db/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import type { Survey, Invite } from '$lib/types';
	import { page } from '$app/stores';
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import InviteCardSubmitted from '$lib/components/InviteCardSubmitted.svelte';

	let survey: Survey;
	let mainInvite: Invite;
	let invites: Invite[] = [];

	const docRef = doc(db, 'surveys', $page.params.formId);

	const getInvite = async (id: string) => {
		const docSnap = await getDoc(doc(db, 'invites', id));
		if (docSnap.exists()) {
			return docSnap.data() as Invite;
		} else {
			// docSnap.data() will be undefined in this case
			console.error('No invite found for id: ', id);
			return {} as Invite;
		}
	};

	const getSurvey = async () => {
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			survey = docSnap.data() as Survey;
			if (survey.invites.length > 0) {
				// populate invites array
				survey.invites.forEach((id) => {
					getInvite(id).then((invite) => {
						if (invite.type == 'main') {
							mainInvite = invite;
						} else {
							invites = [...invites, invite];
						}
					});
				});
			}
		} else {
			// docSnap.data() will be undefined in this case
			console.error('No such document!');
		}
	};

	const surveyPromise = getSurvey();
</script>

<div class="flex flex-col">
	<h2 id="form" class="h2 mb-4 ml-6 pt-20">
		Formulario de Asistencia
		<span class="variant-filled chip">{$page.params.formId}</span>
	</h2>

	{#if mainInvite}
		<div class="flex flex-wrap items-center justify-center">
			<div class="card container mx-4 mb-2 space-y-4 p-4">
				<h3 class="h3">Datos personales:</h3>
				<InviteCardSubmitted invite={mainInvite} />
			</div>

			<div class="card container mx-4 mb-2 space-y-4 p-4">
				<h3 class="h3">Asistencia y transporte:</h3>
				<!-- confirm -->
				<div>
					<BoolSelector
						disabled={true}
						label={'¿Vas a venir a la boda?'}
						value={mainInvite?.assistance}
						yesLabel={'Sí'}
						noLabel={'No'}
					/>
				</div>
				{#if mainInvite.bus}
					<!-- bus -->
					<div class="mt-2 flex justify-start space-x-8">
						<div class="flex flex-col items-center">
							<BoolSelector
								disabled={true}
								label={'¿Bus de ida?'}
								value={mainInvite?.bus.busGo}
								yesLabel={'Sí'}
								noLabel={'No'}
							/>
						</div>

						<span class="divider-vertical h-16" />
						<div class="flex flex-col items-center">
							<BoolSelector
								disabled={true}
								label={'¿Bus de vuelta?'}
								value={mainInvite?.bus.busReturn}
								yesLabel={'Sí'}
								noLabel={'No'}
							/>
						</div>
					</div>
					{#if 'busReturnEarly' in mainInvite.bus && mainInvite.bus.busReturnEarly !== undefined}
						<div class="mt-2 flex flex-col">
							<BoolSelector
								disabled={true}
								layout="vertical"
								label={'Si pudieras elegir un bus de vuelta...'}
								value={mainInvite?.bus?.busReturnEarly}
								yesLabel={'Cogería el más temprano (21:30)'}
								noLabel={'¡El último que haya!'}
							/>
						</div>
					{/if}
				{/if}
			</div>

			<div class="card container mx-4 mb-2 space-y-4 p-4">
				<h3 class="h3">Acompañantes:</h3>
				{#each invites as invite, idx (invite.id)}
					<InviteCardSubmitted {invite} />
				{/each}
			</div>
		</div>
	{/if}
</div>
