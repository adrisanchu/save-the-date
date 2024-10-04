<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { auth } from '$lib/db/firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { db } from '$lib/db/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { sleepTrigger } from '$lib/utils/sleepFunc';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import InviteStats from '$lib/components/InviteStats.svelte';
	import InviteChecklist from '$lib/components/InviteChecklist.svelte';
	import type { Invite } from '$lib/types';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	let status: string = 'pending';
	let tabSet: number = 0;
	let invites: Invite[] = [];

	async function handleLogout() {
		await signOut(auth);
		goto('/login');
	}

	/**
	 * Get all invites from firestore
	 */
	const getInvites = async () => {
		const querySnapshot = await getDocs(collection(db, 'invites'));
		const docs: Invite[] = [];
		querySnapshot.forEach((doc) => {
			docs.push(doc.data() as Invite);
		});
		return docs;
	};

	const fetchData = async () => {
		sleepTrigger(2000).then(() => {
			getInvites()
				.then((data) => {
					invites = data;
					status = 'success';
				})
				.catch((err) => {
					console.error('Err: ', err);
					status = 'error';
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
		<div class="flex flex-wrap">
			<section class="container mx-4 mb-2 space-y-4 px-2">
				<p class="text-sm">¡Hola de nuevo, {$user.email}!</p>
			</section>
			{#if status == 'pending'}
				<section class="card container mx-4 mb-2 space-y-4 p-4">
					<Placeholder animated={true} />
				</section>
				<section class="card container mx-4 mb-2 space-y-4 p-4">
					<Placeholder animated={true} />
				</section>
			{:else if invites.length > 0}
				<section class="mx-4 mb-4">
					<TabGroup>
						<Tab bind:group={tabSet} name="tab1" value={0}>
							<span>Estadísticas</span>
						</Tab>
						<Tab bind:group={tabSet} name="tab2" value={1}>Revisión</Tab>
						<svelte:fragment slot="panel">
							{#if tabSet === 0}
								<InviteStats {invites} />
							{:else if tabSet === 1}
								<InviteChecklist {invites} />
							{/if}
						</svelte:fragment>
					</TabGroup>
				</section>
			{/if}
		</div>
	{/if}
</div>
