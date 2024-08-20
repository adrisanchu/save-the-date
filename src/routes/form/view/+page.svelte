<script lang="ts">
	import { Undo2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import db from '$lib/db/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { base } from '$app/paths';
	import { sleepTrigger } from '$lib/utils/sleepFunc';
	import type { Survey, Invite } from '$lib/types';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import InviteCardSubmitted from '$lib/components/InviteCardSubmitted.svelte';

	let status: string = 'pending';
	let survey: Survey;
	let mainInvite: Invite;
	let invites: Invite[] = [];

	const getInvite = async (id: string) => {
		const docSnap = await getDoc(doc(db, 'invites', id));
		if (docSnap.exists()) {
			return docSnap.data() as Invite;
		} else {
			// docSnap.data() will be undefined in this case
			console.error('No invite found for id: ', id);
			throw new Error(`The document with id: "${id}" does not exist!`);
		}
	};

	const getSurvey = async () => {
		const formId = new URLSearchParams(window.location.search).get('id') || '';
		const docRef = doc(db, 'surveys', formId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			// add id to firestore object
			return { ...docSnap.data(), id: formId } as Survey;
		} else {
			// docSnap.data() will be undefined in this case
			throw new Error(`The document with id: "${formId}" does not exist!`);
		}
	};

	const fetchData = async () => {
		sleepTrigger(2500).then(() => {
			getSurvey()
				.then((data) => {
					console.log('Promise resolved!');
					console.log('Data: ', data);
					survey = data;

					if (survey.invites.length > 0) {
						// populate invites array
						survey.invites.forEach((id) => {
							getInvite(id).then((inv) => {
								if (inv.type == 'main') {
									mainInvite = inv;
									console.log('main invite data: ', mainInvite);
								} else {
									invites = [...invites, inv];
								}
							});
						});
					}
					status = 'success';
					console.log('status: ', status);
				})
				.catch((err) => {
					console.error('Err: ', err);
					status = 'error';
				});
		});
	};

	onMount(() => {
		console.log('Client ready');
		console.log('status: ', status);

		fetchData();
	});
</script>

<div class="flex flex-col">
	<div class="mb-4 ml-6 flex justify-between pt-20">
		<h2 id="form" class="h2">
			{#if status == 'error'}
				Formulario no encontrado
			{:else if status == 'pending'}
				Cargando...
			{:else if status == 'success'}
				Formulario de Asistencia
				<br />
				<span class="variant-filled chip">{survey.id || ''}</span>
			{/if}
		</h2>
		<div class="mr-5">
			<a href="{base}/form" class="variant-filled btn-icon btn-icon-sm h-8 w-8 font-bold">
				<Undo2 size={20} />
			</a>
		</div>
	</div>

	{#if status == 'pending'}
		<div class="flex flex-wrap items-center justify-center">
			<section class="card container mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
			<section class="card container mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
			<section class="card container mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
		</div>
	{/if}

	{#if survey}
		<div class="flex flex-wrap items-center justify-center">
			{#if mainInvite}
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
			{/if}

			{#if invites && invites.length > 0}
				<div class="card container mx-4 mb-2 space-y-4 p-4">
					<h3 class="h3">Acompañantes:</h3>
					{#each invites as invite (invite.id)}
						<InviteCardSubmitted {invite} />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
