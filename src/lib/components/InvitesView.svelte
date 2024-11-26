<script lang="ts">
	import type { Invite } from '$lib/types';
	import { allergies } from '$lib/utils/allergiesList';

	let alls: Allergy[] = allergies.filter((allergy) => allergy.accessor !== 'other');
	export let invites: Invite[];
</script>

<div class="table-container">
	<table class="table table-hover table-compact text-sm">
		<thead>
			<tr>
				<th>Nombre</th>
				{#each alls as all}
					<th>{all.name}</th>
				{/each}
				<th>Otros</th>
			</tr>
		</thead>
		<tbody>
			{#each invites as invite}
				{#if invite.allergies}
					<tr>
						<td>{invite.name} {invite.surname}</td>
						{#each alls.map((allergy) => allergy.accessor) as allergy}
							<td class="text-center">{invite.allergies.includes(allergy) ? 'x' : '-'}</td>
						{/each}
						{#if invite.otherAllergies}
							<td class="text-left">{invite.otherAllergies}</td>
						{/if}
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
