<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { Clipboard } from 'lucide-svelte';
	import { ClipboardCheck } from 'lucide-svelte';
	import type { Survey } from '$lib/types';

	export let survey: Survey;

	let valueCopied: boolean = false;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};

	function onClickHandler(): void {
		valueCopied = true;
		setTimeout(() => {
			valueCopied = false;
		}, 3000);
	}
</script>

<section class="my-2 space-y-2">
	{#if survey.id}
		<div class="card variant-filled-surface p-2" data-popup="popupClick">
			<p class="text-sm text-surface-900">¡Copiado!</p>
			<div class="variant-filled-surface arrow" />
		</div>
		<button
			use:clipboard={survey.id || ''}
			on:click={onClickHandler}
			use:popup={popupClick}
			class="variant-soft chip min-w-full hover:variant-filled"
		>
			<div class="flex items-center justify-between">
				<span class="font-semibold">{survey.id}</span>
				<span class="ml-6">
					{#if !valueCopied}
						<Clipboard size={18} />
					{:else}
						<ClipboardCheck size={18} />
					{/if}
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
