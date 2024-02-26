<script lang="ts">
	import { base } from '$app/paths';
	export let currentUrl: string = '/';
	let underlinedStyle: string = 'underline underline-offset-8';
</script>

<nav class="flex items-center space-x-2">
	<a
		class="{currentUrl === '/transport'
			? `font-bold ${underlinedStyle}`
			: ''} btn btn-sm hover:variant-soft-primary"
		aria-current={currentUrl === '/transport' ? 'page' : undefined}
		href="{base}/transport"
	>
		Transporte
	</a>
	<!-- <a
		class="{currentUrl === '/contact'
			? `font-bold ${underlinedStyle}`
			: ''} btn btn-sm hover:variant-soft-primary"
		aria-current={currentUrl === '/contact' ? 'page' : undefined}
		href="{base}/contact"
	>
		Contacto
	</a> -->
</nav>
