<script lang="ts">
	let activeSearch: boolean = false;

	function newSurvey() {
		console.log('new');
	}
	function findSurvey() {
		console.log('find');
	}
</script>

<div class="flex flex-col">
	<h2 id="form" class="ml-6 h2 pt-20 mb-4">Confirmación de asistencia</h2>
	<div class="mx-auto flex flex-col space-y-2 justify-center">
		<button type="button" class="ml-2 font-bold btn variant-filled" on:click={newSurvey}>
			Nuevo Formulario
		</button>
		<div class="separator"><span class="text-surface-900">O bien...</span></div>
		<div class="flex">
			<input type="text" class="input" />
			<button type="button" class="ml-2 font-bold btn variant-filled" on:click={findSurvey}>
				Buscar...
			</button>
		</div>
	</div>
</div>

<style>
	.separator {
		display: flex;
		align-items: center;
		text-align: center;
	}

	.separator::before,
	.separator::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid rgba(var(--color-surface-800));
	}

	.separator:not(:empty)::before {
		margin-right: 0.25em;
	}

	.separator:not(:empty)::after {
		margin-left: 0.25em;
	}
</style>
