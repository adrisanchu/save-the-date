<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { serverTimestamp } from 'firebase/firestore';
	import type { Survey } from '$lib/types';
	import type { Timestamp } from 'firebase/firestore';

	export let surveys: Survey[];

	let unreviewed: Survey[] = [];
	let reviewed: Survey[] = [];

	$: console.log('surveys', surveys);

	$: {
		// Separate surveys into unreviewed and reviewed lists
		unreviewed = surveys.filter((survey) => !('checked' in survey));
		reviewed = surveys.filter(
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
		console.log('reviewed!', survey);

		// Move the invite from the unreviewed to the reviewed list
		unreviewed = unreviewed.filter((i) => i.id !== survey.id);
		reviewed = [...reviewed, survey];
	};
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="card shadow-lg">
		<h2 class="card-header font-semibold text-surface-900">Pendiente de revisión</h2>
		<div class="card-content p-4">
			<ul>
				{#each unreviewed as survey (survey.id)}
					<li class="cursor-pointer rounded-md p-1 transition duration-200 ease-in-out">
						<button on:click={() => handleSurveyClick(survey)}>
							{survey.createdBy.name}
							{survey.createdBy.surname}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="card shadow-lg">
		<h2 class="card-header font-semibold text-surface-900">Revisados</h2>
		<div class="card-content">
			<ul>
				{#each reviewed as survey (survey.id)}
					<li class="invite-item hover:variant-filled">
						<button on:click={() => handleSurveyClick(survey)}>
							{survey.createdBy.name}
							{survey.createdBy.surname}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.card-content {
		padding: 1rem;
	}
</style>
