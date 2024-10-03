<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/auth';
	import Placeholder from '$lib/components/Placeholder.svelte';

	/**
	 * Check if user is logged in
	 */
	const checkUser = async () => {
		await user.known;
		if (!$user) {
			console.warn('An unknown user is trying to access a protected route. Redirecting to login.');
			goto('/login');
		}
	};

	onMount(async () => {
		checkUser();
	});
</script>

{#if !$user}
	<div class="pt-20">
		<div class="flex flex-wrap items-center justify-center">
			<section class="card container mx-4 mb-2 space-y-4 p-4">
				<Placeholder animated={true} />
			</section>
		</div>
	</div>
{:else if $user}
	<slot />
{/if}
