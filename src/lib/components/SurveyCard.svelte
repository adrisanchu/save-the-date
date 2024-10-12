<script lang="ts">
	import { base } from '$app/paths';
	import { popup, clipboard } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Clipboard, ClipboardCheck, SquarePen, Eye, Trash } from 'lucide-svelte';
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
	<div class="flex items-center justify-between">
		<p class="text-surface-900">
			{survey.createdAt.toDate().toLocaleDateString('es-ES', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>
	</div>
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
	<div class="flex">
		<a href="{base}/form/view/?id={survey.id}" class="variant-filled btn btn-sm mr-2 font-bold">
			<span>Ver</span><Eye size={16} />
		</a>
		<a
			href="{base}/form/edit/?id={survey.id}"
			class="variant-filled-secondary btn btn-sm mr-2 font-bold"
		>
			<span>Editar</span><SquarePen size={16} />
		</a>
		<button class="variant-filled-error btn btn-sm ml-auto font-bold">
			<span>Borrar</span><Trash size={16} />
		</button>
	</div>
</section>
