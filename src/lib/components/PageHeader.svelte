<script lang="ts">
	export let currentUrl: string = '/';
	let str = 'hover:underline underline-offset-8';
</script>

<nav class="flex-none flex items-center space-x-2">
	<a
		class="{currentUrl === '/'
			? 'variant-ghost-primary'
			: ''} btn btn-sm hover:variant-soft-primary"
		aria-current={currentUrl === '/' ? 'page' : undefined}
		href="/"
	>
		Inicio
	</a>
	<a
		class="{currentUrl === '/transport'
			? 'variant-ghost-primary'
			: ''} btn btn-sm hover:variant-soft-primary"
		aria-current={currentUrl === '/transport' ? 'page' : undefined}
		href="/transport"
	>
		Transporte
	</a>
	<a
		class="{currentUrl === '/contact'
			? 'variant-ghost-primary'
			: ''} btn btn-sm hover:variant-soft-primary"
		aria-current={currentUrl === '/contact' ? 'page' : undefined}
		href="/contact"
	>
		Contacto
	</a>
</nav>
