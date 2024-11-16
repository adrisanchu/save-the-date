<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { updateSurvey } from '$lib/db/api';
	import { serverTimestamp } from 'firebase/firestore';
	import type { Survey } from '$lib/types';
	import type { Timestamp } from 'firebase/firestore';
	import SurveyCard from '$lib/components/SurveyCard.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	export let surveys: Survey[];

	let pending: Survey[] = [];
	let toReview: Survey[] = [];
	let accepted: Survey[] = [];

	$: {
		// Separate surveys into pending and reviewed lists
		pending = surveys.filter(
			(survey) => !('checked' in survey) || survey.checked?.status === 'pending'
		);
		toReview = surveys.filter(
			(survey) => 'checked' in survey && survey.checked?.status === 'to review'
		);
		accepted = surveys.filter(
			(survey) => 'checked' in survey && survey.checked?.status === 'accepted'
		);
	}

	const handleSurveyClick = (survey: Survey) => {
		if (!$user) {
			// user doesn't have the permission!
			return;
		}
		// Update the survey's status to "reviewed"
		survey.checked = {
			...survey.checked,
			by: $user.email || '',
			at: serverTimestamp() as Timestamp,
			status: 'accepted'
		};

		updateSurvey(survey);
		console.log('reviewed!', survey);

		// Move the survey from the pending to the reviewed list
		pending = pending.filter((i) => i.id !== survey.id);
		accepted = [...accepted, survey];
	};
</script>

<div>
	<p class="m-2">Formularios registrados:</p>
	<section class="card m-2 p-2 shadow-lg">
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="summary"
					><h3 class="font-semibold text-surface-900">
						Pendiente de revisión: {pending.length}
					</h3></svelte:fragment
				>
				<svelte:fragment slot="content">
					<ul>
						{#each pending as survey, i (survey.id)}
							<li class="p-1 transition duration-200 ease-in-out">
								<SurveyCard {survey} on:classify={() => handleSurveyClick(survey)} />
								{#if i !== pending.length - 1}
									<hr class="mt-4 !border-t-2" />
								{/if}
							</li>
						{/each}
					</ul>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</section>

	<section class="card m-2 p-2 shadow-lg">
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="summary"
					><h2 class="font-semibold text-surface-900">
						A chequear: {toReview.length}
					</h2></svelte:fragment
				>
				<svelte:fragment slot="content">
					<ul>
						{#each toReview as survey, i (survey.id)}
							<li class="p-1 transition duration-200 ease-in-out">
								<SurveyCard {survey} />
								{#if i !== pending.length - 1}
									<hr class="mt-4 !border-t-2" />
								{/if}
							</li>
						{/each}
					</ul>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</section>

	<section class="card m-2 p-2 shadow-lg">
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="summary">
					<h2 class="font-semibold text-surface-900">Revisados: {accepted.length}</h2>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<ul>
						{#each accepted as survey, i (survey.id)}
							<li class="p-1 transition duration-200 ease-in-out">
								<SurveyCard {survey} />
								{#if i !== pending.length - 1}
									<hr class="mt-4 !border-t-2" />
								{/if}
							</li>
						{/each}
					</ul>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</section>
</div>
