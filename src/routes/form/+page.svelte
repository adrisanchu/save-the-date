<script lang="ts">
	import SurveyCard from '$lib/components/SurveyCard.svelte';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import { goto } from '$app/navigation';
	import { db } from '$lib/db/firebase';
	import surveys from '$lib/stores/surveys';
	import { doc, getDoc } from 'firebase/firestore';
	import { base } from '$app/paths';
	import type { Survey } from '$lib/types';
	import { sleepTrigger } from '$lib/utils/sleepFunc';

	let searchCode: string = '';
	const localSurveys: Survey[] = [];

	const searchStatus = {
		missing: false,
		error: false,
		networkError: false
	};

	$: if (!searchCode) {
		// reset default values
		searchStatus.missing = false;
		searchStatus.error = false;
		searchStatus.networkError = false;
	}

	/**
	 * Find a survey based on the input field
	 */
	async function findSurvey() {
		if (searchCode) {
			// find the code on the server
			const docRef = doc(db, 'surveys', searchCode);
			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					// navigate to the page
					goto(`${base}/form/view?id=${searchCode}`);
				} else {
					console.error('No such document!');
					// TODO: display an error
					searchStatus.error = true;
				}
			} catch (err) {
				searchStatus.networkError = true;
				console.error('Error fetching user data:', err);
				return;
			}
		} else {
			// code is missing!
			searchStatus.missing = true;
		}
	}

	/**
	 * Fetch all surveys based on localStorage IDs
	 */
	async function fetchLocalSurveys() {
		await sleepTrigger(2000);
		for (let i = 0; i < $surveys.length; i++) {
			const surveyId = $surveys[i];
			// get the survey from firebase
			const docRef = doc(db, 'surveys', surveyId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				// add to localSurveys
				localSurveys.push({ ...(docSnap.data() as Survey), id: surveyId });
			}
		}
	}
</script>

<div class="flex flex-col">
	<h2 id="form" class="h2 mb-4 ml-6 pt-20">Confirmación de asistencia</h2>
	<div class="mx-4 flex flex-col justify-center md:mx-auto">
		<a class="variant-filled btn ml-2 font-bold" href="{base}/form/new">Nuevo Formulario</a>
		<div class="separator my-4"><span class="text-surface-900">O bien...</span></div>
		<p class="mb-2 flex justify-center">Consulta tu formulario (si ya lo rellenaste)</p>
		<div class="input-group input-group-divider grid-cols-4">
			<input
				type="search"
				class="input col-span-3"
				class:input-error={(!searchCode && searchStatus?.missing) ||
					searchStatus?.error ||
					searchStatus?.networkError}
				placeholder="Código de formulario"
				bind:value={searchCode}
			/>
			<button type="button" class="variant-filled font-bold" on:click={findSurvey}>Buscar</button>
		</div>
		{#if searchStatus?.error && searchCode}
			<p class="mx-3 mt-2 text-xs text-error-500">Código no encontrado!</p>
		{/if}
		{#if searchStatus?.networkError && searchCode}
			<p class="mx-3 mt-2 text-xs text-error-500">Error de red: Comprueba tu conexión a Internet</p>
		{/if}
		{#if searchStatus?.missing && !searchCode}
			<p class="mx-3 mt-2 text-xs text-error-500">Introduce un código que buscar!</p>
		{/if}
	</div>
	<div class="mx-4 mt-12 md:mx-auto">
		{#if $surveys.length > 0}
			{#await fetchLocalSurveys()}
				<div class="flex flex-wrap items-center justify-center">
					<section class="card container mx-4 mb-2 space-y-4 p-4">
						<Placeholder animated={true} />
					</section>
					<section class="card container mx-4 mb-2 space-y-4 p-4">
						<Placeholder animated={true} />
					</section>
				</div>
			{:then data}
				{#if localSurveys.length > 0}
					<h4 class="h4 mb-2">Formularios completados previamente:</h4>
					<div class="card container mb-4 px-4 py-1">
						{#each localSurveys as survey, i (i)}
							<SurveyCard {survey} />
							{#if i !== localSurveys.length - 1}
								<hr class="!border-t-2" />
							{/if}
						{/each}
					</div>
				{/if}
			{/await}
		{/if}
	</div>
</div>

<style>
	.separator {
		display: flex;
		align-items: center;
		text-align: center;
	}

	.separator::before,
	.separator::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid rgba(var(--color-surface-800));
	}

	.separator:not(:empty)::before {
		margin-right: 0.25em;
	}

	.separator:not(:empty)::after {
		margin-left: 0.25em;
	}
</style>
