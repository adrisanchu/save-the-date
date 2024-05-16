<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// name is used to define a specific name for the whole group set of options
	// all input options must share the same name!
	export let name: string | undefined = crypto.randomUUID();
	export let value: boolean;
	export let label: string | undefined;
	export let yesLabel: string = 'Yes';
	export let noLabel: string = 'No';
</script>

<label for="confirm" class="label">
	{#if label}
		<span>{label}</span>
	{/if}
	<div class="flex space-x-4">
		<label class="flex items-center space-x-2">
			<input
				class="radio"
				type="radio"
				{name}
				value="true"
				checked={value}
				on:click={() => dispatch('true')}
			/>
			<p>{yesLabel}</p>
		</label>
		<label class="flex items-center space-x-2">
			<input
				class="radio"
				type="radio"
				{name}
				value="false"
				checked={!value}
				on:click={() => dispatch('false')}
			/>
			<p>{noLabel}</p>
		</label>
	</div>
</label>
