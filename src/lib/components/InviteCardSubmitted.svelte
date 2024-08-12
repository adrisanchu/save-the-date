<script lang="ts">
	import type { Invite } from '$lib/types';
	import { allergies } from '$lib/utils/allergiesList';

	export let invite: Invite;
</script>

<div class="mb-2 space-y-4">
	<!-- name -->
	<div>
		<span>Nombre:</span>
		<p class="font-semibold text-surface-900">{invite.name} {invite.surname}</p>
	</div>

	<!-- email -->
	{#if invite.email}
		<div>
			<span>Correo electrónico:</span>
			<p class="font-semibold text-surface-900">{invite.email}</p>
		</div>
	{/if}

	<!-- alergias? -->
	{#if invite.allergies}
		<div class="mt-4">
			<div class="mt-2 space-y-2">
				<span>Alergias/Intolerancias:</span>
				{#each allergies as allergy (allergy.accessor)}
					<label for={allergy.accessor} class="flex items-center space-x-2">
						<input
							id={allergy.accessor}
							class="checkbox"
							type="checkbox"
							checked={invite.allergies.includes(allergy.accessor) ? true : false}
							disabled
						/>
						<p>{allergy.name}</p>
					</label>

					{#if allergy.accessor == 'other' && invite.otherAllergies}
						<label class="label">
							<textarea
								id="otherAllergies"
								class="textarea"
								rows="4"
								value={invite.otherAllergies}
								disabled
							/>
						</label>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
