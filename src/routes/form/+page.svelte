<script lang="ts">
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import InviteCard from '$lib/components/InviteCard.svelte';
	import type { Survey, Allergy, Invite } from '$lib/types';
	import db from '$lib/db/firebase';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

	let form: any = {
		missing: false
	};

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		form.name = data.get('name');
		form.surname = data.get('surname');
		form.email = data.get('email');
		// console.log('data:', { name: form.name, surname: form.surname, email: form.email });

		// Check for mandatory props
		if (!form.name || !form.surname) {
			console.error('Missing fields!');
			form.missing = true;
			return;
		}

		// If invites...
		if (invites.length > 0 && invites.some((invite) => !invite.name)) {
			console.error('Missing invite names!');
			form.missing = true;
			return;
		}

		// Build Survey Doc to be stored
		const surveyDoc: Survey = {
			name: form.name,
			surname: form.surname,
			email: form.email,
			assistance: assistance
		};

		// If invites...
		surveyDoc.invites = invites;

		// Keep only selected allergies
		const selectedAllergies = allergies.filter((allergy) => allergy.checked);
		const allergiesStored = selectedAllergies.map((allergy) => {
			return allergy.accessor;
		});

		// Add allergies to Survey Doc (if any)
		if (allergiesStored.length > 0) surveyDoc.allergies = allergiesStored;

		// If other allergies...
		if (allergiesStored.includes('other')) {
			surveyDoc.otherAllergies = otherAllergies;
		}

		console.log('survey doc:', surveyDoc);

		// Store into DB

		try {
			const docRef = await addDoc(collection(db, 'surveys'), {
				...surveyDoc,
				createdAt: serverTimestamp()
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	let assistance: boolean = false;

	let otherAllergies: string = '';

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

	function handleAllergyCheck(id: string) {
		allergies = allergies.map((allergy) => {
			if (allergy.accessor === id) {
				allergy.checked = !allergy.checked;
			}
			return allergy;
		});
	}

	let invites: Invite[] = [];

	function newInvite() {
		const uuid = crypto.randomUUID();
		console.log('add invite: ', uuid);
		invites = [
			...invites,
			{
				id: uuid,
				type: 'couple',
				name: ''
			}
		];
	}

	function removeInvite(id: string) {
		console.log('remove invite: ', id);
		const index = invites.findIndex((invite) => invite.id === id);
		if (index !== -1) {
			invites = [...invites.slice(0, index), ...invites.slice(index + 1)];
		}
	}
</script>

<div class="flex flex-col">
	<h2 id="agenda" class="ml-6 h2 pt-20 mb-4">Confirmación de asistencia</h2>
	<div class="flex justify-center items-center flex-wrap">
		<form
			method="POST"
			on:submit|preventDefault={handleSubmit}
			class="container card p-4 mx-4 mb-2 space-y-4"
		>
			<!-- name -->
			<label for="name" class="label">
				<span>Nombre *</span>
				<input
					name="name"
					class="input"
					class:input-error={form?.missing && !form.name}
					type="text"
					placeholder="Juan"
					value={form?.name ?? ''}
				/>
				{#if form?.missing && !form.name}
					<p class="text-xs text-error-500">Nombre obligatorio</p>
				{/if}
			</label>
			<!-- surname -->
			<label for="name" class="label">
				<span>Apellido/s *</span>
				<input
					name="surname"
					class="input"
					class:input-error={form?.missing && !form.surname}
					type="text"
					placeholder="Cuesta"
				/>
				{#if form?.missing && !form.surname}
					<p class="text-xs text-error-500">Apellido/s obligatorios</p>
				{/if}
			</label>
			<!-- email -->
			<label for="email" class="label">
				<span>Correo electrónico (opcional)</span>
				<input
					class="input"
					name="email"
					type="email"
					placeholder="juancuesta@example.com"
					autocomplete="email"
				/>
			</label>
			<!-- confirm -->
			<BoolSelector
				label={'¿Vas a venir a la boda?'}
				bind:value={assistance}
				yesLabel={'Sí'}
				noLabel={'No'}
				on:true={() => (assistance = true)}
				on:false={() => (assistance = false)}
			/>
			{#if assistance}
				<!-- +X -->
				<label for="confirm" class="label">
					<span>¿Con quién?</span>
					<button
						type="button"
						class="ml-2 font-bold btn-icon btn-icon-sm variant-filled"
						on:click={newInvite}
					>
						+
					</button>
					<div class="space-y-2">
						{#each invites as invite, idx (invite.id)}
							<InviteCard
								num={idx + 1}
								{invite}
								missing={form?.missing}
								on:remove={() => removeInvite(invite.id)}
							/>
						{/each}
					</div>
				</label>
				<!-- alergias ? -->
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

			<div class="pt-4 flex justify-end">
				<button class="btn variant-filled" type="submit">Enviar</button>
			</div>
		</form>
	</div>
</div>
