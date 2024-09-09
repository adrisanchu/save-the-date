<script lang="ts">
	import { user } from '$lib/stores/auth';
	import Placeholder from '$lib/components/Placeholder.svelte';
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
