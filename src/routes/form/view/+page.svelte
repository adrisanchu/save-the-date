<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let id: string | null = null;

	onMount(() => {
		id = $page.url.searchParams.get('id');
	});
</script>

<div class="flex flex-col">
	{#if id}
		<h2 id="form" class="h2 mb-4 ml-6 pt-20">
			Formulario de Asistencia
			<span class="variant-filled chip">{id}</span>
		</h2>
	{:else}
		<h2 id="form" class="h2 mb-4 ml-6 pt-20">Identificador no encontrado</h2>
	{/if}
</div>
