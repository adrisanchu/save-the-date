<script lang="ts">
	import { base } from '$app/paths';
	export let currentUrl: string = '/';
</script>

<nav class="flex items-center space-x-2">
	<a
		class="{currentUrl.includes('/agenda') ? 'variant-filled' : ''} btn btn-sm hover:variant-filled"
		aria-current={currentUrl.includes('/agenda') ? 'page' : undefined}
		href="{base}/agenda"
	>
		Agenda
	</a>
	<a
		class="{currentUrl.includes('/info') ? 'variant-filled' : ''} btn btn-sm hover:variant-filled"
		aria-current={currentUrl.includes('/info') ? 'page' : undefined}
		href="{base}/info"
	>
		Información
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
