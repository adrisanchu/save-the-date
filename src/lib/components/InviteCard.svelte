<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { allergies } from '$lib/utils/allergiesList';
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import type { Allergy, InviteClientData } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let num: number;
	export let invite: InviteClientData;
	export let missing: boolean = false;
	let anyAllergies: boolean = false;
	let otherAllergies: string;
	// Init list with all possible allergies unchecked
	let inviteAllergies: Allergy[] = allergies.map((allergy) => {
		return { ...allergy, checked: false };
	});

	$: if (invite.allergies?.includes('other') && otherAllergies !== '') {
		invite.otherAllergies = otherAllergies;
	} else {
		delete invite.otherAllergies;
	}

	// Keep only selected allergies
	function updateInviteAllergies() {
		const selectedAllergies = inviteAllergies.filter((allergy) => allergy.checked);
		const allergiesStored = selectedAllergies.map((allergy) => {
			return allergy.accessor;
		});
		// Add allergies to Survey Doc (if any)
		if (allergiesStored.length > 0) invite.allergies = allergiesStored;
	}

	function handleAllergyCheck(id: string) {
		inviteAllergies = inviteAllergies.map((allergy) => {
			if (allergy.accessor === id) {
				allergy.checked = !allergy.checked;
			}
			return allergy;
		});
		updateInviteAllergies();
	}
</script>

<div class="card p-4" transition:slide={{ duration: 600, easing: quintInOut }}>
	<header class="mb-2 flex items-center justify-between">
		<span class="font-bold">Acompañante {num}:</span>
		<button
			type="button"
			class="variant-filled btn-icon btn-icon-sm h-8 w-8 font-bold"
			on:click={() => dispatch('remove', { id: invite.id })}>X</button
		>
	</header>
	<section class="max-w-lg">
		<div class="flex space-x-2">
			<select id="${invite.id}_type" class="select" bind:value={invite.type}>
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
					min="0"
					bind:value={invite.age}
				/>
			{:else}
				<div class="w-36"></div>
			{/if}
		</div>
		<!-- name -->
		<label for="${invite.id}_name" class="label">
			<span>Nombre *</span>
			<input
				id="${invite.id}_name"
				name="name"
				class="input"
				autocomplete="given-name"
				class:input-error={missing && !invite.name}
				type="text"
				placeholder="Juan"
				bind:value={invite.name}
			/>
			{#if missing && !invite.name}
				<p class="text-xs text-error-500">Nombre obligatorio</p>
			{/if}
		</label>
		<!-- surname -->
		<label for="${invite.id}_surname" class="label">
			<span>Apellido/s *</span>
			<input
				id="surname"
				name="surname"
				class="input"
				autocomplete="family-name"
				class:input-error={missing && !invite.surname}
				type="text"
				placeholder="Cuesta"
				bind:value={invite.surname}
			/>
			{#if missing && !invite.surname}
				<p class="text-xs text-error-500">Apellido/s obligatorios</p>
			{/if}
		</label>
		<!-- email -->
		<label for="${invite.id}_email" class="label">
			<span>Correo electrónico (opcional)</span>
			<input
				id="email"
				class="input"
				name="email"
				type="email"
				placeholder="juancuesta@example.com"
				autocomplete="email"
				bind:value={invite.email}
			/>
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
			<div class="mt-4" transition:slide|global={{ duration: 600, easing: quintInOut }}>
				<!--<span>Alérgenos/Intolerancias:</span>-->
				<div class="space-y-2">
					{#each inviteAllergies as allergy (allergy.accessor)}
						<label for={invite.id + '_' + allergy.accessor} class="flex items-center space-x-2">
							<input
								id={invite.id + '_' + allergy.accessor}
								class="checkbox"
								type="checkbox"
								checked={allergy.checked}
								on:click={() => handleAllergyCheck(allergy.accessor)}
							/>
							<p>{allergy.name}</p>
						</label>
						{#if allergy.accessor == 'other' && allergy.checked}
							<label class="label" transition:slide|global={{ duration: 600, easing: quintInOut }}>
								<textarea
									id={invite.id + '_' + 'otherAllergies'}
									class="textarea"
									rows="4"
									placeholder="Detalla otras alergias/intolerancias..."
									bind:value={otherAllergies}
								/>
							</label>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</section>
</div>
