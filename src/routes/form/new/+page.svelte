<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { allergies } from '$lib/utils/allergiesList';
	import FullScreenConfetti from '$lib/components/FullScreenConfetti.svelte';
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import InviteCard from '$lib/components/InviteCard.svelte';
	import type {
		User,
		SurveyClientData,
		Survey,
		Allergy,
		InviteClientData,
		Invite,
		BusOptions,
		BusOptionsWithReturn
	} from '$lib/types';
	import db from '$lib/db/firebase';
	import { doc, writeBatch } from 'firebase/firestore';
	import { serverTimestamp } from 'firebase/firestore';
	import { getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
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
			</div>`,
			response: (r: boolean) => {
				console.log('modal response:', r);
				// If not undefined, it means that the modal was closed by the user
				// Navigate to main page
				goto(`${base}/form`);
			}
		};
		modalStore.trigger(modal);
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

		// Check for mandatory props
		if (!form.name || !form.surname) {
			console.error('Missing fields!');
			form.missing = true;
			form.loading = false;
			return;
		}

		// If invites...
		if (
			invites.length > 0 &&
			(invites.some((invite) => !invite.name) || invites.some((invite) => !invite.surname))
		) {
			console.error('Missing invite compulsory fields!');
			form.missing = true;
			form.loading = false;
			return;
		}

		// Build main user data
		const user: User = {
			id: crypto.randomUUID(),
			name: form.name,
			surname: form.surname,
			email: form.email
		};

		// Keep only selected allergies
		const selectedAllergies = userAllergies.filter((allergy) => allergy.checked);
		const allergiesStored = selectedAllergies.map((allergy) => {
			return allergy.accessor;
		});

		// Add main user as an invite as well
		const mainInvite: InviteClientData = {
			...user,
			type: 'main'
		};

		// Add allergies to main invite (if any)
		if (allergiesStored.length > 0) mainInvite.allergies = allergiesStored;

		// If other allergies...
		if (allergiesStored.includes('other')) {
			mainInvite.otherAllergies = otherAllergies;
		}

		// Add main invite as an invite,
		// and add it to the list of invites to be stored in DB,
		// (avoid client manipulation)
		const allInvites: InviteClientData[] = [...invites, mainInvite];

		// Build Survey Doc to be stored
		const surveyDoc: SurveyClientData = {
			createdBy: user,
			invites: allInvites.map((invite) => invite.id)
		};

		// Clean up inviteBusOptions depending on if there is a return bus or not
		const busOpts: BusOptions | BusOptionsWithReturn =
			inviteBusOptions.busReturn === false
				? { busGo: inviteBusOptions.busGo, busReturn: inviteBusOptions.busReturn }
				: { ...inviteBusOptions };

		// Convert invites client data into valid invites to store in DB
		const invitesDocs: Invite[] = allInvites.map((invite) => {
			if (assistance) {
				return {
					...invite,
					surveyId: surveyId,
					assistance: assistance,
					bus: busOpts
				};
			} else {
				return {
					...invite,
					surveyId: surveyId,
					assistance: assistance
				};
			}
		});

		console.log('survey doc:', surveyDoc);

		// Store into DB, in batch mode
		try {
			// Start batch
			const batch = writeBatch(db);

			// Add survey
			const surveyRef = doc(db, 'surveys', surveyId);
			const surveyStored: Survey = {
				...surveyDoc,
				createdAt: serverTimestamp()
			};
			batch.set(surveyRef, surveyStored);

			// Add all invites
			invitesDocs.forEach((invite) => {
				const inviteRef = doc(db, 'invites', invite.id);
				batch.set(inviteRef, invite);
			});

			// Execute batch
			await batch.commit();

			// store locally
			// TODO: instead of doing it from the client,
			// store the result obtained from the server!
			surveys.set([{ ...surveyStored, id: surveyId }, ...$surveys]);

			// display confirmation message
			showConfirmationModal(surveyRef.id);

			// show some confetti when form is submitted
			form.success = true;
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		form.loading = false;
	}

	// Default variables
	let assistance: boolean = false;
	let anyAllergies: boolean = false;
	let otherAllergies: string = '';

	function handleAllergyCheck(id: string) {
		userAllergies = userAllergies.map((allergy) => {
			if (allergy.accessor === id) {
				allergy.checked = !allergy.checked;
			}
			return allergy;
		});
	}

	// Init list of all allergies available to the user
	let userAllergies: Allergy[] = allergies.map((allergy) => {
		return { ...allergy, checked: false };
	});

	// Init survey id to be referenced later on
	const surveyId: string = crypto.randomUUID();

	// Init bus options for all the invites
	const inviteBusOptions: BusOptionsWithReturn = {
		busGo: false,
		busReturn: false,
		busReturnEarly: false
	};

	let invites: InviteClientData[] = [];

	function newInvite() {
		const uuid = crypto.randomUUID();
		console.log('add invite: ', uuid);
		invites = [
			...invites,
			{
				id: uuid,
				type: 'couple',
				name: '',
				surname: ''
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
					<BoolSelector
						label={'¿Alguna alergia o intolerancia?'}
						value={anyAllergies}
						yesLabel={'Sí'}
						noLabel={'No'}
						on:true={() => (anyAllergies = true)}
						on:false={() => (anyAllergies = false)}
					/>
					{#if anyAllergies}
						<div class="mt-4" transition:slide|global={{ duration: 600, easing: quintInOut }}>
							<div class="mt-2 space-y-2">
								{#each userAllergies as allergy (allergy.accessor)}
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
					{/if}
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
									bind:value={inviteBusOptions.busGo}
									yesLabel={'Sí'}
									noLabel={'No'}
									on:true={() => (inviteBusOptions.busGo = true)}
									on:false={() => (inviteBusOptions.busGo = false)}
								/>
							</div>
							<span class="divider-vertical h-16" />
							<div class="flex flex-col items-center">
								<BoolSelector
									label={'¿Bus de vuelta?'}
									bind:value={inviteBusOptions.busReturn}
									yesLabel={'Sí'}
									noLabel={'No'}
									on:true={() => (inviteBusOptions.busReturn = true)}
									on:false={() => (inviteBusOptions.busReturn = false)}
								/>
							</div>
						</div>
					</div>

					{#if inviteBusOptions.busReturn}
						<div
							class="mt-2 flex flex-col"
							transition:slide|global={{ duration: 600, easing: quintInOut }}
						>
							<BoolSelector
								layout="vertical"
								label={'Si pudieras elegir un bus de vuelta...'}
								bind:value={inviteBusOptions.busReturnEarly}
								yesLabel={'Cogería el más temprano (21:30)'}
								noLabel={'¡El último que haya!'}
								on:true={() => (inviteBusOptions.busReturnEarly = true)}
								on:false={() => (inviteBusOptions.busReturnEarly = false)}
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
				{/if}
			</div>
		</form>
	</div>
</div>
