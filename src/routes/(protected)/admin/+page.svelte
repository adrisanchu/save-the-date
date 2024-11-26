<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { auth } from '$lib/db/firebase';
	import { signOut } from 'firebase/auth';
	import { getInvites, getSurveys } from '$lib/db/api';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { sleepTrigger } from '$lib/utils/sleepFunc';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import InviteStats from '$lib/components/InviteStats.svelte';
	import InvitesView from '$lib/components/InvitesView.svelte';
	import SurveyChecklist from '$lib/components/SurveyChecklist.svelte';
	import type { Invite, Survey } from '$lib/types';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	let status: string = 'pending';
	let tabSet: number = 0;
	let surveys: Survey[] = [];
	let invites: Invite[] = [];

	async function handleLogout() {
		await signOut(auth);
		goto('/login');
	}

	const fetchData = async () => {
		sleepTrigger(2000).then(() => {
			Promise.all([getSurveys(), getInvites()])
				.then((results) => {
					surveys = results[0];
					invites = results[1];
					status = 'success';
				})
				.catch((err) => {
					console.error('Err: ', err);
				});
		});
	};

	onMount(() => {
		fetchData();
	});
</script>

<div class="flex flex-col">
	<p class="h-20"></p>
	<div class="mx-6 mb-4 flex justify-between">
		<h2 id="form" class="h2">Panel de Control</h2>
		<button type="button" class="variant-filled btn btn-sm justify-self-end" on:click={handleLogout}
			>Cerrar sesión</button
		>
	</div>
	{#if $user}
		<section class="container mx-4 mb-2 space-y-4 px-2">
			<p class="text-sm">¡Hola de nuevo, {$user.email}!</p>
		</section>
		{#if status == 'pending'}
			<section class="card mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
			<section class="card mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
		{:else if invites.length > 0}
			<section class="mx-4 mb-4">
				<TabGroup>
					<Tab bind:group={tabSet} name="tab1" value={0}>
						<span>Estadísticas</span>
					</Tab>
					<Tab bind:group={tabSet} name="tab2" value={1}>Revisión</Tab>
					<Tab bind:group={tabSet} name="tab3" value={2}>Alergias</Tab>
					<svelte:fragment slot="panel">
						{#if tabSet === 0}
							<InviteStats {invites} {surveys} />
						{:else if tabSet === 1}
							<SurveyChecklist {surveys} />
						{:else if tabSet === 2}
							<InvitesView {invites} />
						{/if}
					</svelte:fragment>
				</TabGroup>
			</section>
		{/if}
	{/if}
</div>
