<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import FullScreenConfetti from '$lib/components/FullScreenConfetti.svelte';
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import InviteCard from '$lib/components/InviteCard.svelte';
	import type { Survey, Allergy, Invite } from '$lib/types';
	import db from '$lib/db/firebase';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import surveys from '$lib/stores/surveys';

	// handle modal pop-up
	const modalStore = getModalStore();

	/**
	 * Display a modal after form submission
	 * @param id
	 */
	function showConfirmationModal(id: string) {
		const modal: ModalSettings = {
			type: 'alert',
			title: '¡Formulario recibido!',
			buttonTextCancel: '¡Entendido!',
			body: `¡Pues ya estaría! <br />
			De parte de Isa y Adri, muchas gracias por tu colaboración :) <br />
			Si quieres cambiar el formulario en el futuro, guarda este código a buen recaudo! <br />
			<div class="flex justify-center items-center">
				<b>${id}</b>
			</div>`
		};
		modalStore.trigger(modal);
	}

	/**
	 * A function to test if the confetti and modal pop-up
	 * are working as expected
	 * @param id
	 */
	function fakeSubmit(id: string) {
		form.success = true;

		setTimeout(() => {
			console.log('show modal...');
			showConfirmationModal(id);
		}, 2000);

		setTimeout(() => {
			console.log('re-enable fom (remove confetti!)');
			form.success = false;
		}, 2000);
	}

	let form: any = {
		missing: false,
		loading: false,
		success: false
	};

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		form.loading = true;
		const data = new FormData(event.currentTarget);
		form.name = data.get('name');
		form.surname = data.get('surname');
		form.email = data.get('email');
		// console.log('data:', { name: form.name, surname: form.surname, email: form.email });

		// Check for mandatory props
		if (!form.name || !form.surname) {
			console.error('Missing fields!');
			form.missing = true;
			form.loading = false;
			return;
		}

		// If invites...
		if (invites.length > 0 && invites.some((invite) => !invite.name)) {
			console.error('Missing invite names!');
			form.missing = true;
			form.loading = false;
			return;
		}

		// Build Survey Doc to be stored
		const surveyDoc: Survey = {
			name: form.name,
			surname: form.surname,
			email: form.email,
			assistance: assistance,
			busGo: busGo,
			busReturn: busReturn,
			busReturnEarly: busReturnEarly
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

			// store locally
			surveys.set([surveyDoc, ...$surveys]);

			// display confirmation message
			showConfirmationModal(docRef.id);

			// show some confetti when form is submitted
			form.success = true;
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		form.loading = false;
	}

	let assistance: boolean = false;
	let busGo: boolean = false;
	let busReturn: boolean = false;
	let busReturnEarly: boolean = false;

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

{#if form.success}
	<FullScreenConfetti />
{/if}
<div class="flex flex-col">
	<h2 id="form" class="h2 mb-4 ml-6 pt-20">Confirmación de asistencia</h2>
	<div class="flex flex-wrap items-center justify-center">
		<form
			method="POST"
			on:submit|preventDefault={handleSubmit}
			class="card container mx-4 mb-2 space-y-4 p-4"
		>
			<h3 class="h3">Datos personales:</h3>
			<!-- name -->
			<label for="name" class="label">
				<span>Nombre *</span>
				<input
					id="name"
					name="name"
					class="input"
					autocomplete="given-name"
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
			<label for="surname" class="label">
				<span>Apellido/s *</span>
				<input
					id="surname"
					name="surname"
					class="input"
					autocomplete="family-name"
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
					id="email"
					class="input"
					name="email"
					type="email"
					placeholder="juancuesta@example.com"
					autocomplete="email"
				/>
			</label>
			<!-- confirm -->
			<div class="mt-4">
				<BoolSelector
					label={'¿Vas a venir a la boda?'}
					bind:value={assistance}
					yesLabel={'Sí'}
					noLabel={'No'}
					on:true={() => (assistance = true)}
					on:false={() => (assistance = false)}
				/>
			</div>

			{#if assistance}
				<div class="mt-4" transition:slide|global={{ duration: 600, easing: quintInOut }}>
					<!-- alergias ? -->
					<div class="">
						<h3 class="h3">¿Alguna alergia o intolerancia?</h3>
						<div class="mt-2 space-y-2">
							{#each allergies as allergy (allergy.accessor)}
								<label for={allergy.accessor} class="flex items-center space-x-2">
									<input
										id={allergy.accessor}
										class="checkbox"
										type="checkbox"
										checked={allergy.checked}
										on:click={() => handleAllergyCheck(allergy.accessor)}
									/>
									<p>{allergy.name}</p>
								</label>
								{#if allergy.accessor == 'other' && allergy.checked}
									<label
										class="label"
										transition:slide|global={{ duration: 600, easing: quintInOut }}
									>
										<textarea
											id="otherAllergies"
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

					<!-- +X -->
					<div class="mt-4">
						<div class="mb-2 flex">
							<h3 class="h3">¿Con quién más vienes?</h3>
							<button
								type="button"
								class="variant-filled btn-icon btn-icon-sm ml-2 font-bold"
								on:click={newInvite}
							>
								+
							</button>
						</div>
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
					</div>

					<!-- bus -->
					<div class="mt-4">
						<h3 class="h3">En cuanto al transporte...</h3>
						<div class="mt-2 flex justify-start space-x-8">
							<div class="flex flex-col items-center">
								<BoolSelector
									label={'¿Bus de ida?'}
									bind:value={busGo}
									yesLabel={'Sí'}
									noLabel={'No'}
									on:true={() => (busGo = true)}
									on:false={() => (busGo = false)}
								/>
							</div>
							<span class="divider-vertical h-16" />
							<div class="flex flex-col items-center">
								<BoolSelector
									label={'¿Bus de vuelta?'}
									bind:value={busReturn}
									yesLabel={'Sí'}
									noLabel={'No'}
									on:true={() => (busReturn = true)}
									on:false={() => (busReturn = false)}
								/>
							</div>
						</div>
					</div>

					{#if busReturn}
						<div
							class="mt-2 flex flex-col"
							transition:slide|global={{ duration: 600, easing: quintInOut }}
						>
							<BoolSelector
								layout="vertical"
								label={'Si pudieras elegir un bus de vuelta...'}
								bind:value={busReturnEarly}
								yesLabel={'Cogería el más temprano (21:30)'}
								noLabel={'¡El último que haya!'}
								on:true={() => (busReturnEarly = true)}
								on:false={() => (busReturnEarly = false)}
							/>
						</div>
					{/if}
				</div>
			{/if}
			<div class="flex justify-end pt-4">
				{#if form.loading}
					<button disabled class="variant-filled btn" type="submit">
						<ProgressRadial value={undefined} class="mr-2 h-4 w-4" />Enviar
					</button>
				{:else}
					<button class="variant-filled btn" type="submit">Enviar</button>
					<!-- Test button to simulate pop-up -->
					<button
						class="variant-filled btn ml-2"
						type="button"
						on:click={() => fakeSubmit('axjshf123')}>Pop-up</button
					>
				{/if}
			</div>
		</form>
	</div>
</div>
