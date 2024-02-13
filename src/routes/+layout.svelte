<script lang="ts">
	import { page } from '$app/stores';
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';
	import PageHeader from '$lib/components/PageHeader.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppBar background="bg-surface-500 bg-opacity-20" class="fixed top-0 z-10 min-w-full">
	<svelte:fragment slot="lead">A & I</svelte:fragment>
	<svelte:fragment slot="trail">
		<PageHeader currentUrl={$page.url.pathname} />
	</svelte:fragment>
</AppBar>
<slot />
