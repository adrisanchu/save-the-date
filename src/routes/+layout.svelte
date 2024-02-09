<script lang="ts">
	import '../app.postcss';
	import PageHeader from '$lib/components/PageHeader.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<PageHeader />
<div id="main" class="flex flex-col justify-center items-center min-h-screen">
	<slot />
</div>

<style>
	#main {
		height: 100vh;
		background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
			url('/img/img_2.jpeg');
		background-size: cover;
		background-position: center;
		text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
		box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
	}
</style>
