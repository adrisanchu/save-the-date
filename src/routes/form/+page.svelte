<script lang="ts">
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
				goto(`${base}/form/${searchCode}`);
			} else {
				console.log('No such document!');
				// display an error
			}
		}
	}
</script>

<div class="flex flex-col">
	<h2 id="form" class="ml-6 h2 pt-20 mb-4">Confirmación de asistencia</h2>
	<div class="mx-auto flex flex-col space-y-6 justify-center">
		<a class="ml-2 font-bold btn variant-filled" href="{base}/form/new">Nuevo Formulario</a>
		<div class="separator"><span class="text-surface-900">O bien...</span></div>
		<div class="flex">
			<input type="text" class="input" placeholder="Código de formulario" bind:value={searchCode} />
			<button type="button" class="ml-2 font-bold btn variant-filled" on:click={findSurvey}>
				Buscar...
			</button>
		</div>
		{#if $surveys.length > 0}
			<div class="container card p-4 my-2">
				<p>Formularios completados previamente:</p>
				{#each $surveys as survey, i (survey)}
					<section class="my-2">
						<div class="flex space-x-2">
							<span>Nombre:</span>
							<p class="text-surface-900 font-semibold">{survey.name} {survey.surname}</p>
						</div>
						<div class="flex space-x-2">
							<span>Email:</span>
							<p class="text-surface-900 font-semibold">{survey.email}</p>
						</div>
						<div class="flex space-x-2">
							<span>Asistencia:</span>
							<p class="text-surface-900 font-semibold">{survey.assistance ? 'Sí' : 'No'}</p>
						</div>
					</section>
					{#if i !== $surveys.length - 1}
						<hr class="!border-t-2" />
					{/if}
				{/each}
			</div>
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
