<script lang="ts">
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import type { Invite, Allergy } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let num: number;
	export let invite: Invite;
	export let missing: boolean = false;
	let anyAllergies: boolean = false;
	let otherAllergies: string;

	$: if (invite.allergies?.includes('other') && otherAllergies !== '') {
		invite.otherAllergies = otherAllergies;
	} else {
		delete invite.otherAllergies;
	}

	let allergies: Allergy[] = [
		{
			accessor: 'gluten',
			name: 'Gluten/celíaco',
			checked: false
		},
		{
			accessor: 'fish',
			name: 'Pescado',
			checked: false
		},
		{
			accessor: 'seafood',
			name: 'Marisco',
			checked: false
		},
		{
			accessor: 'other',
			name: 'Otros (especificar a continuación)',
			checked: false
		}
	];

	// Keep only selected allergies
	function updateInviteAllergies() {
		const selectedAllergies = allergies.filter((allergy) => allergy.checked);
		const allergiesStored = selectedAllergies.map((allergy) => {
			return allergy.accessor;
		});
		// Add allergies to Survey Doc (if any)
		if (allergiesStored.length > 0) invite.allergies = allergiesStored;
	}

	function handleAllergyCheck(id: string) {
		allergies = allergies.map((allergy) => {
			if (allergy.accessor === id) {
				allergy.checked = !allergy.checked;
			}
			return allergy;
		});
		updateInviteAllergies();
	}
</script>

<div class="card p-4">
	<header class="flex items-center justify-between mb-2">
		<span class="font-bold">Acompañante {num}:</span>
		<button
			type="button"
			class="w-8 h-8 font-bold btn-icon btn-icon-sm variant-filled"
			on:click={() => dispatch('remove', { id: invite.id })}>X</button
		>
	</header>
	<section class="max-w-lg">
		<div class="flex space-x-2">
			<select class="select" bind:value={invite.type}>
				<option value="couple">Pareja</option>
				<option value="child">Niño/a</option>
				<option value="other">Otro</option>
			</select>
			{#if invite.type === 'child'}
				<input
					class="input w-24"
					name="age"
					type="number"
					placeholder="Edad"
					bind:value={invite.age}
				/>
			{:else}
				<div class="w-36"></div>
			{/if}
		</div>
		<!-- name -->
		<label for="name" class="label">
			<span>Nombre *</span>
			<input
				name="name"
				class="input"
				class:input-error={missing && !invite.name}
				type="text"
				placeholder="Juan"
				bind:value={invite.name}
			/>
			{#if missing && !invite.name}
				<p class="text-xs text-error-500">Nombre obligatorio</p>
			{/if}
		</label>
		<!-- alergias ? -->
		<BoolSelector
			label={'¿Alguna alergia o intolerancia?'}
			value={anyAllergies}
			yesLabel={'Sí'}
			noLabel={'No'}
			on:true={() => (anyAllergies = true)}
			on:false={() => (anyAllergies = false)}
		/>
		{#if anyAllergies}
			<!-- alergias -->
			<label for="allergies" class="label">
				<span>Alérgenos/Intolerancias</span>
				<div class="space-y-2">
					{#each allergies as allergy (allergy.accessor)}
						<label class="flex items-center space-x-2">
							<input
								class="checkbox"
								type="checkbox"
								checked={allergy.checked}
								on:click={() => handleAllergyCheck(allergy.accessor)}
							/>
							<p>{allergy.name}</p>
						</label>
						{#if allergy.accessor == 'other' && allergy.checked}
							<label class="label">
								<textarea
									class="textarea"
									rows="4"
									placeholder="Detalla otras alergias/intolerancias..."
									bind:value={otherAllergies}
								/>
							</label>
						{/if}
					{/each}
				</div>
			</label>
		{/if}
	</section>
</div>
