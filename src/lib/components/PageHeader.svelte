<script lang="ts">
	import { base } from '$app/paths';
	export let currentUrl: string = '/';
</script>

<nav class="flex items-center space-x-2">
	<a
		class="{currentUrl.includes('/transport')
			? 'variant-filled'
			: ''} btn btn-sm hover:variant-filled"
		aria-current={currentUrl.includes('/transport') ? 'page' : undefined}
		href="{base}/transport"
	>
		Transporte
	</a>
	<a
		class="{currentUrl.includes('/contact')
			? 'variant-filled'
			: ''} btn btn-sm hover:variant-filled"
		aria-current={currentUrl.includes('/contact') ? 'page' : undefined}
		href="{base}/contact"
	>
		Contacto
	</a>
</nav>
