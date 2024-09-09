<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { auth } from '$lib/db/firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';

	async function handleLogout() {
		await signOut(auth);
		goto('/login');
	}
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
		<div class="flex flex-wrap items-center justify-center">
			<section class="card container mx-4 mb-2 space-y-4 p-4">
				<p>Welcome, {$user.email}!</p>
			</section>
		</div>
	{/if}
</div>
