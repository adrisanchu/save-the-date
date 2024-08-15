<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let data = {
		id: ''
	};

	onMount(() => {
		data = {
			id: $page.params.formId
		};
	});
</script>

<div class="flex flex-col">
	<h2 id="form" class="h2 mb-4 ml-6 pt-20">
		Formulario de Asistencia
		<span class="variant-filled chip">{data.id}</span>
	</h2>
</div>
