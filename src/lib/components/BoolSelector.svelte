<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// name is used to define a specific name for the whole group set of options
	// all input options must share the same name!
	export let name: string | undefined = crypto.randomUUID();
	export let value: boolean;
	export let label: string | undefined = undefined;
	export let yesLabel: string = 'Yes';
	export let noLabel: string = 'No';
	export let disabled: boolean = false;
	export let layout: string = 'horizontal';

	let layoutClass: string =
		layout == 'horizontal' ? 'flex flex-row space-x-4' : 'flex flex-col space-y-2';
</script>

{#if label}
	<span class="mb-1">{label}</span>
{/if}
<div class="flex {layoutClass}">
	<label for="${name}_true" class="flex items-center space-x-2">
		<input
			{disabled}
			id="${name}_true"
			class="radio"
			type="radio"
			{name}
			value="true"
			checked={value}
			on:click={() => dispatch('true')}
		/>
		<p>{yesLabel}</p>
	</label>
	<label for="${name}_false" class="flex items-center space-x-2">
		<input
			{disabled}
			id="${name}_false"
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
