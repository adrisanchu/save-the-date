<script lang="ts">
	import type { Invite } from '$lib/types';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let invites: Invite[];
	const modalStore = getModalStore();

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-2';
	const cHeader = 'text-xl font-bold';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article class="grid grid-cols-2">
			<span>{$modalStore[0].body ?? '(body missing)'}</span>
			<span class="justify-self-center">{invites.length}</span>
		</article>

		<ul class="max-h-96 overflow-auto">
			{#each invites as invite}
				<li>
					<div class="grid grid-cols-2">
						<span>{invite.type}</span>
						<span>{invite.name} {invite.surname}</span>
					</div>
				</li>
			{/each}
		</ul>
	</div>
{/if}
