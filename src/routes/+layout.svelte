<script lang="ts">
	import '../app.postcss';
	import PageHeader from '$lib/components/PageHeader.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<PageHeader />
<div class="flex flex-col justify-center items-center min-h-screen">
	<slot />
</div>
