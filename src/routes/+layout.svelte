<script lang="ts">
	import { page } from '$app/stores';
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';
	import HeroIcon from '$lib/components/HeroIcon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { onNavigate } from '$app/navigation';

	// smooth navigation using the ViewTransitionAPI
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// $: console.log(`You're visiting: `, { path: $page.url.pathname, url: $page.url });

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Modals setup
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	initializeStores();
</script>

<Modal />

<AppBar
	background="bg-surface-500 bg-opacity-20 backdrop-blur-sm"
	class="fixed top-0 z-10 min-w-full"
>
	<svelte:fragment slot="lead"><HeroIcon currentUrl={$page.url.pathname} /></svelte:fragment>
	<svelte:fragment slot="trail">
		<PageHeader currentUrl={$page.url.pathname} />
	</svelte:fragment>
</AppBar>
<slot />
