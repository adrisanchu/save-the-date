<script lang="ts">
	import SurveyCard from '$lib/components/SurveyCard.svelte';
	import { goto } from '$app/navigation';
	import db from '$lib/db/firebase';
	import surveys from '$lib/stores/surveys';
	import { doc, getDoc } from 'firebase/firestore';
	import { base } from '$app/paths';

	let searchCode: string = '';

	/**
	 * Find a survey based on the input field
	 */
	async function findSurvey() {
		if (searchCode) {
			// find the code on the server
			const docRef = doc(db, 'surveys', searchCode);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				// navigate to the page
				goto(`${base}/form/view?id=${searchCode}`);
			} else {
				console.error('No such document!');
				// TODO: display an error
			}
		}
	}
</script>

<div class="flex flex-col">
	<h2 id="form" class="h2 mb-4 ml-6 pt-20">Confirmación de asistencia</h2>
	<div class="mx-4 flex flex-col justify-center space-y-6 md:mx-auto">
		<a class="variant-filled btn ml-2 font-bold" href="{base}/form/new">Nuevo Formulario</a>
		<div class="separator"><span class="text-surface-900">O bien...</span></div>
		<div class="input-group input-group-divider grid-cols-4">
			<input
				type="search"
				class="input col-span-3"
				placeholder="Código de formulario"
				bind:value={searchCode}
			/>
			<button type="button" class="variant-filled font-bold" on:click={findSurvey}>Buscar</button>
		</div>
	</div>
	{#if $surveys.length > 0}
		<div class="mx-4 md:mx-auto">
			<h4 class="h4 mb-4 mt-16">Formularios completados previamente:</h4>
			<div class="card container p-4">
				{#each $surveys as survey, i (i)}
					<SurveyCard {survey} />
					{#if i !== $surveys.length - 1}
						<hr class="!border-t-2" />
					{/if}
				{/each}
			</div>
		</div>
	{/if}
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
