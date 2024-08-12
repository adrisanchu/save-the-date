<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
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
		<div class="-mx-4">
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="summary">
						<span>Alergias/Intolerancias:</span>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="mt-2 space-y-2">
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
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
	{/if}
</div>
