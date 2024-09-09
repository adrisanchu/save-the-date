<script lang="ts">
	import { auth } from '$lib/db/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { TriangleAlert } from 'lucide-svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let form: any = {
		error: false,
		loading: false
	};

	let email = '';
	let password = '';

	async function handleSubmit() {
		form.loading = true;
		try {
			await signInWithEmailAndPassword(auth, email, password);
			goto('/admin');
		} catch (e) {
			form.loading = false;
			form.error = true;
			console.error(e);
		}
	}
</script>

<div class="flex flex-col">
	<h2 id="form" class="h2 mb-4 ml-6 pt-20">Inicia sesión en tu cuenta</h2>
	<div class="flex flex-wrap items-center justify-center">
		<form
			method="POST"
			on:submit|preventDefault={handleSubmit}
			class="card container mx-4 mb-2 space-y-4 p-4 shadow-xl"
		>
			<label for="email" class="label">
				<span>Correo electrónico</span>
				<input
					class="input"
					class:input-error={form?.error}
					type="email"
					bind:value={email}
					required
				/>
			</label>
			<label for="password" class="label">
				<span>Contraseña</span>
				<input
					class="input"
					class:input-error={form?.error}
					type="password"
					bind:value={password}
					required
				/>
			</label>
			{#if form?.error}
				<p class="flex text-xs text-error-500">
					<span class="mr-2"><TriangleAlert size={16} /></span>Correo electrónico y/o contraseña
					incorrectos.
				</p>
			{:else}
				<p class="h-4"></p>
			{/if}
			<div class="flex justify-end">
				{#if form?.loading}
					<button disabled class="variant-filled btn" type="submit">
						<ProgressRadial value={undefined} class="mr-2 h-4 w-4" />
						Iniciar sesión
					</button>
				{:else}
					<button class="variant-filled btn" type="submit">Iniciar sesión</button>
				{/if}
			</div>
		</form>
	</div>
</div>
