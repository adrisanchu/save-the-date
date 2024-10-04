<script lang="ts">
	import type { Invite } from '$lib/types';

	export let invites: Invite[];

	let unreviewed: Invite[] = [];
	let reviewed: Invite[] = [];

	$: {
		// Separate invites into unreviewed and reviewed lists
		unreviewed = invites.filter((invite) => !('status' in invite));
		reviewed = invites.filter((invite) => 'status' in invite && invite.status === 'reviewed');
	}

	const handleInviteClick = (invite: Invite) => {
		// Update the invite's status to "reviewed"
		invite.status = 'reviewed';

		// Move the invite from the unreviewed to the reviewed list
		unreviewed = unreviewed.filter((i) => i.id !== invite.id);
		reviewed = [...reviewed, invite];
	};
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="card shadow-lg">
		<h2 class="card-header font-semibold text-surface-900">Pendiente de revisión</h2>
		<div class="card-content p-4">
			<ul>
				{#each unreviewed as invite (invite.id)}
					<li class="cursor-pointer rounded-md p-1 transition duration-200 ease-in-out">
						<button on:click={() => handleInviteClick(invite)}>
							{invite.name}
							{invite.surname}
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
				{#each reviewed as invite (invite.id)}
					<li class="invite-item hover:variant-filled">
						<button on:click={() => handleInviteClick(invite)}>
							{invite.name}
							{invite.surname}
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
