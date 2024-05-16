<script lang="ts">
	import { base } from '$app/paths';
	export let currentUrl: string = '/';
	const baseUrl = base || '/';
</script>

<a class="h5" aria-current={currentUrl === '/' ? 'page' : undefined} href={baseUrl}> A & I </a>
