<script lang="ts">
	import db from '$lib/db/firebase';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

	let form: any = {
		missing: false
	};

	type Survey = {
		name: string;
		surname: string;
		email: string;
		assistance: boolean;
		allergies?: string[];
		otherAllergies?: string;
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

		// Build Survey Doc to be stored
		const surveyDoc: Survey = {
			name: form.name,
			surname: form.surname,
			email: form.email,
			assistance: assistance
		};

		// Keep only selected allergies
		const selectedAllergies = allergies.filter((allergy) => allergy.checked);
		const allergiesStored = selectedAllergies.map((allergy) => {
			return allergy.accessor;
		});

		// Add allergies to Survey Doc (if any)
		if (allergiesStored.length > 0) surveyDoc.allergies = allergiesStored;

		// If other allergies...
		if (allergiesStored.includes('other')) {
			let otherAllergy: Allergy | undefined = allergies.filter(
				(allergy: Allergy) => allergy.accessor === 'other'
			)[0];
			surveyDoc.otherAllergies = otherAllergy.value;
		}

		// console.log('survey doc:', surveyDoc);

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

	let assistance: boolean = true;

	type Allergy = {
		accessor: string;
		name: string;
		checked: boolean;
		value?: string;
	};

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
			checked: false,
			value: ''
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
			<label for="confirm" class="label">
				<span>¿Vas a venir a la boda?</span>
				<div class="space-y-2">
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							name="radio-direct"
							value="true"
							checked={assistance}
							on:click={() => (assistance = true)}
						/>
						<p>Sí</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							name="radio-direct"
							value="false"
							checked={!assistance}
							on:click={() => (assistance = false)}
						/>
						<p>No</p>
					</label>
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
									bind:value={allergy.value}
								/>
							</label>
						{/if}
					{/each}
				</div>
			</label>

			<div class="pt-4 flex justify-end">
				<button class=" btn variant-filled" type="submit">Enviar</button>
			</div>
		</form>
	</div>
</div>
