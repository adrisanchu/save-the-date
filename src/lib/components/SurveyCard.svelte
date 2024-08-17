<script lang="ts">
	import { clipboard } from '@skeletonlabs/skeleton';
	import { Clipboard } from 'lucide-svelte';
	import type { Survey } from '$lib/types';

	export let survey: Survey;
</script>

<section class="my-2 space-y-2">
	{#if survey.id}
		<button
			use:clipboard={survey.id || ''}
			class="variant-soft chip min-w-full hover:variant-filled"
		>
			<div class="flex items-center justify-between">
				<span class="font-semibold">{survey.id}</span>
				<span class="ml-6">
					<Clipboard size={18} />
				</span>
			</div>
		</button>
	{/if}
	<div class="flex flex-col">
		<span>Creado por:</span>
		<p class="font-semibold text-surface-900">
			{survey.createdBy.name}
			{survey.createdBy.surname}
		</p>
	</div>
	{#if survey.createdBy.email}
		<div class="flex flex-col">
			<span>Email:</span>
			<p class="font-semibold text-surface-900">{survey.createdBy.email}</p>
		</div>
	{/if}
	{#if survey.invites.length > 1}
		<div class="flex space-x-2">
			<span>Acompañantes:</span>
			<p class="font-semibold text-surface-900">+{survey.invites.length - 1}</p>
		</div>
	{/if}
</section>
