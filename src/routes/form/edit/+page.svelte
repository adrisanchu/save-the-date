<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { Undo2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { db } from '$lib/db/firebase';
	import { getSurvey, getInvite } from '$lib/db/api';
	import FullScreenConfetti from '$lib/components/FullScreenConfetti.svelte';
	import { doc, getDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
	import { sleepTrigger } from '$lib/utils/sleepFunc';
	import type {
		Survey,
		Allergy,
		InviteClientData,
		Invite,
		BusOptions,
		BusOptionsWithReturn
	} from '$lib/types';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import BoolSelector from '$lib/components/BoolSelector.svelte';
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { allergies } from '$lib/utils/allergiesList';
	import InviteCard from '$lib/components/InviteCard.svelte';
	import type { Timestamp } from 'firebase/firestore';
	import { getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import surveys from '$lib/stores/surveys';
	import { TriangleAlert } from 'lucide-svelte';

	// handle modal pop-up
	const modalStore = getModalStore();

	/**
	 * Display a modal after form submission
	 * @param id
	 */
	function showConfirmationModal(id: string) {
		const modal: ModalSettings = {
			type: 'alert',
			title: '¡Formulario actualizado!',
			buttonTextCancel: '¡Entendido!',
			body: `<div class="flex flex-col">
				<p>¡Pues ya estaría! De parte de Isa y Adri, muchas gracias por tu colaboración :) <br />
				Si quieres cambiar el formulario en el futuro, este es tu código: </p>
				<div class="my-2 flex justify-center items-center variant-soft chip">
					<span class="font-semibold">${id}</span>
				</div>
				<div>
					<p class="text-sm italic">(No te preocupes! Este código se guardará en este dispositivo automáticamente)</p>
				</div>
			</div>
			`,
			response: (r: boolean) => {
				// Navigate to main page
				goto(`${base}/form`);
			}
		};
		modalStore.trigger(modal);
	}

	// If you've come this far...this must be true
	let terms: boolean = true;
	let form: any = {
		missing: false,
		loading: false,
		success: false
	};

	let status: string = 'pending';
	let survey: Survey;
	let mainInvite: Invite;
	let invites: Invite[] = [];

	// Default variables
	let anyAllergies: boolean = false;
	let otherAllergies: string = '';

	const handleUpdate = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		form.loading = true;
		if (!survey || !mainInvite) {
			console.error('Something went wrong! Unable to update!');
			form.missing = true;
			form.loading = false;
			return;
		}

		// Check for mandatory props
		if (!mainInvite.name || !mainInvite.surname) {
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

		// Keep only selected allergies
		const selectedAllergies = userAllergies.filter((allergy) => allergy.checked);
		const allergiesStored = selectedAllergies.map((allergy) => {
			return allergy.accessor;
		});

		// If other allergies...
		if (allergiesStored.includes('other')) {
			if (otherAllergies) {
				mainInvite.otherAllergies = otherAllergies;
			} else {
				console.error('Missing otherAllergies!');
				form.missing = true;
				form.loading = false;
				return;
			}
		}

		// Add allergies to main invite (if any)
		if (allergiesStored.length > 0) mainInvite.allergies = allergiesStored;

		// Clean-up invites allergies as well...
		let invalidForm: boolean = false;
		invites.forEach((inv) => {
			if (inv.allergies) {
				if (inv.allergies.includes('other')) {
					if (!('otherAllergies' in inv) || inv.otherAllergies === undefined) {
						console.error('Missing otherAllergies in one of the invites!', inv);
						invalidForm = true;
					}
				}
			}
		});

		if (invalidForm) {
			form.missing = true;
			form.loading = false;
			return;
		}

		// Add main invite as an invite,
		// and add it to the list of invites to be stored in DB,
		// (avoid client manipulation)
		const allInvites: InviteClientData[] = [...invites, mainInvite];

		// Build Survey Doc to be updated
		const surveyDoc: Survey = {
			...survey,
			invites: allInvites.map((invite) => invite.id)
		};

		// Clean up inviteBusOptions depending on if there is a return bus or not
		const busOpts: BusOptions | BusOptionsWithReturn =
			mainInvite.bus && mainInvite.bus.busReturn === false
				? { busGo: inviteBusOptions.busGo, busReturn: inviteBusOptions.busReturn }
				: { ...inviteBusOptions };

		// Convert invites client data into valid invites to store in DB
		if (survey && survey.id) {
			const invitesDocs: Invite[] = allInvites.map((invite) => {
				if (mainInvite.assistance) {
					return {
						...invite,
						surveyId: survey.id || '',
						assistance: mainInvite.assistance,
						bus: busOpts
					};
				} else {
					return {
						...invite,
						surveyId: survey.id || '',
						assistance: mainInvite.assistance
					};
				}
			});

			// Store into DB, in batch mode
			try {
				// Start batch
				const batch = writeBatch(db);

				// Get and update survey
				const surveyRef = doc(db, 'surveys', survey.id);
				const docSnap = await getDoc(surveyRef);

				if (docSnap.exists()) {
					const surveyStored: Survey = {
						...surveyDoc,
						modifiedAt: serverTimestamp() as Timestamp
					};
					batch.update(surveyRef, surveyStored);

					// Add all invites
					invitesDocs.forEach((invite) => {
						const inviteRef = doc(db, 'invites', invite.id);
						batch.set(inviteRef, invite);
					});

					// In case an invite was deleted...
					docSnap.data().invites.forEach((inviteId: string) => {
						if (!surveyDoc.invites.includes(inviteId)) {
							// Delete old invite from DB
							const inviteRef = doc(db, 'invites', inviteId);
							batch.delete(inviteRef);
						}
					});

					// Execute batch
					await batch.commit();

					// store locally a reference to the survey
					if (survey.id && !$surveys.includes(survey.id)) {
						surveys.set([...$surveys, survey.id]);
					}
					// display confirmation message
					showConfirmationModal(surveyRef.id);

					// show some confetti when form is submitted
					form.success = true;
				} else {
					console.error('Unable to find current survey! Impossible to update');
				}
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		} else {
			console.error('No survey found!');
			form.missing = true;
			form.loading = false;
			return;
		}
		form.loading = false;
	};

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

	// Init bus options for all the invites
	const inviteBusOptions: BusOptionsWithReturn = {
		busGo: false,
		busReturn: false,
		busReturnEarly: false
	};

	function newInvite() {
		const uuid = crypto.randomUUID();
		invites = [
			...invites,
			{
				id: uuid,
				type: 'couple',
				name: '',
				surname: '',
				surveyId: survey.id || crypto.randomUUID(),
				assistance: false
			}
		];
	}

	function removeInvite(id: string) {
		const index = invites.findIndex((invite) => invite.id === id);
		if (index !== -1) {
			invites = [...invites.slice(0, index), ...invites.slice(index + 1)];
		}
	}

	const fetchData = async () => {
		sleepTrigger(2500).then(() => {
			const formId = new URLSearchParams(window.location.search).get('id') || '';
			getSurvey(formId)
				.then((data) => {
					console.log('Promise resolved!');
					console.log('Data: ', data);
					survey = data;

					if (survey.invites.length > 0) {
						// populate invites array
						survey.invites.forEach((id) => {
							getInvite(id).then((inv) => {
								console.log('inv data:', inv);
								if (inv.type == 'main') {
									mainInvite = inv;
									// Populate input fields with data from the database
									if (inv.allergies && inv.allergies.length > 0) {
										// There is at least one allergy!
										anyAllergies = true;

										userAllergies = allergies.map((allergy) => {
											if (inv.allergies && inv.allergies.includes(allergy.accessor)) {
												return { ...allergy, checked: true };
											} else {
												return { ...allergy, checked: false };
											}
										});
										if (inv.otherAllergies) {
											// Some special allergy
											otherAllergies = inv.otherAllergies;
										}
									}
									// update bus options
									if (inv.bus) {
										inviteBusOptions.busGo = inv.bus.busGo;
										if (inv.bus.busReturn) {
											inviteBusOptions.busReturn = inv.bus.busReturn;
											if ('busReturnEarly' in inv.bus) {
												inviteBusOptions.busReturnEarly = inv.bus.busReturnEarly;
											}
										}
									}
								} else {
									invites = [...invites, inv];
								}
							});
						});
					}
					status = 'success';
					console.log('status: ', status);
				})
				.catch((err) => {
					console.error('Err: ', err);
					status = 'error';
				});
		});
	};

	onMount(() => {
		console.log('Client ready');
		console.log('status: ', status);

		fetchData();
	});
</script>

{#if form.success}
	<FullScreenConfetti />
{/if}
<div class="flex flex-col">
	<div class="mb-4 ml-6 flex justify-between pt-20">
		<h2 id="form" class="h2">
			{#if status == 'error'}
				Formulario no encontrado
			{:else if status == 'pending'}
				Cargando...
			{:else if status == 'success'}
				Formulario de Asistencia
				<br />
				<span class="variant-filled chip">{survey.id || ''}</span>
			{/if}
		</h2>
		<div class="mr-5">
			<a href="{base}/form" class="variant-filled btn-icon btn-icon-sm h-8 w-8 font-bold">
				<Undo2 size={20} />
			</a>
		</div>
	</div>

	{#if status == 'pending'}
		<div class="flex flex-wrap items-center justify-center">
			<section class="card container mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
			<section class="card container mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
			<section class="card container mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
		</div>
	{/if}

	{#if mainInvite && status == 'success'}
		<div class="flex flex-wrap items-center justify-center">
			<form
				method="PUT"
				on:submit|preventDefault={handleUpdate}
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
						class:input-error={form?.missing && !mainInvite.name}
						type="text"
						placeholder="Juan"
						bind:value={mainInvite.name}
					/>
					{#if form?.missing && !mainInvite.name}
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
						class:input-error={form?.missing && !mainInvite.surname}
						type="text"
						placeholder="Cuesta"
						bind:value={mainInvite.surname}
					/>
					{#if form?.missing && !mainInvite.surname}
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
						bind:value={mainInvite.email}
					/>
				</label>
				<!-- confirm -->
				<div class="mt-4">
					<BoolSelector
						label={'¿Vas a venir a la boda?'}
						bind:value={mainInvite.assistance}
						yesLabel={'Sí'}
						noLabel={'No'}
						on:true={() => (mainInvite.assistance = true)}
						on:false={() => (mainInvite.assistance = false)}
					/>
				</div>

				{#if mainInvite.assistance}
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
													class:input-error={form?.missing &&
														(otherAllergies === '' || otherAllergies == undefined)}
													rows="4"
													placeholder="Detalla otras alergias/intolerancias..."
													bind:value={otherAllergies}
												/>
												{#if form?.missing && (otherAllergies === '' || otherAllergies == undefined)}
													<p class="text-xs text-error-500">Especificar alergias</p>
												{/if}
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
				<label for="terms" class="flex items-center space-x-2">
					<input id="terms" name="terms" class="checkbox" type="checkbox" bind:checked={terms} />
					<p>
						Acepto los <a
							href="{base}/terms"
							class="anchor"
							target="_blank"
							rel="noopener noreferrer">términos y condiciones</a
						> para el tratamiento de mis datos.
					</p>
				</label>
				<div class="flex justify-end pt-4">
					{#if form?.missing}
						<div class="input-error btn mr-4">
							<TriangleAlert />
							<p>Revisar datos!</p>
						</div>
					{/if}
					{#if form.loading}
						<button disabled class="variant-filled btn" type="submit">
							<ProgressRadial value={undefined} class="mr-2 h-4 w-4" />Enviar
						</button>
					{:else}
						<button class="variant-filled btn" type="submit" disabled={!terms}>Enviar</button>
					{/if}
				</div>
			</form>
		</div>
	{/if}
</div>
