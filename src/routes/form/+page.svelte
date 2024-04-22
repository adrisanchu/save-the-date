<script lang="ts">
	let form: any = {
		missing: false
	};

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		form.name = data.get('name');
		form.surname = data.get('surname');
		form.email = data.get('email');

		console.log('data:', { name: form.name, surname: form.surname, email: form.email });
		// check for mandatory props
		if (!form.name || !form.surname) {
			console.error('Missing fields!');
			form.missing = true;
		}
	}
</script>

<div class="flex flex-col">
	<h2 id="agenda" class="ml-6 h2 pt-20 mb-4">Confirmación de asistencia</h2>
	<div class="flex justify-center items-center flex-wrap">
		<form
			method="POST"
			on:submit|preventDefault={handleSubmit}
			class="container card p-4 mx-4 mb-2 space-y-2"
		>
			<!-- name -->
			<label for="name" class="label">
				<span>Nombre *</span>
				<input
					name="name"
					class="input"
					class:input-error={form?.missing && !form.name}
					type="text"
					placeholder="Juan"
					value={form?.name ?? ''}
				/>
				{#if form?.missing && !form.name}
					<p class="text-xs text-error-500">Nombre obligatorio</p>
				{/if}
			</label>
			<!-- surname -->
			<label for="name" class="label">
				<span>Apellido/s *</span>
				<input
					name="surname"
					class="input"
					class:input-error={form?.missing && !form.surname}
					type="text"
					placeholder="Cuesta"
				/>
				{#if form?.missing && !form.surname}
					<p class="text-xs text-error-500">Apellido/s obligatorios</p>
				{/if}
			</label>
			<!-- email -->
			<label for="email" class="label">
				<span>Correo electrónico (opcional)</span>
				<input
					class="input"
					name="email"
					type="email"
					placeholder="juancuesta@example.com"
					autocomplete="email"
				/>
			</label>

			<div class="pt-4 flex justify-end">
				<button class=" btn variant-filled" type="submit">Submit</button>
			</div>
		</form>
	</div>
</div>
