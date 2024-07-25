<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let ready = false;
	onMount(() => (ready = true));
</script>

<head>
	<meta name="description" content="Save the Date! Adri & Isa are getting married the 07/12/2024" />
</head>

<div id="main" class="img-0"></div>
{#if ready}
	<div
		class="fixed top-20 right-10 text-surface-500 flex flex-col items-center"
		in:fly|global={{ delay: 600, duration: 1500, easing: quintOut, x: 100 }}
	>
		<h1 class="h1 title">Save the date!</h1>
		<h2 class="h2 title">Adri & Isa</h2>
		<p>07.12.2024</p>
	</div>
{/if}

<style>
	.title {
		font-family: 'Parisienne-Regular';
		font-weight: lighter;
	}

	#main {
		height: 100vh;
		background-size: cover;
		background-position: center;
		text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
		box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
	}

	.img-0 {
		background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
			url('/img/img_0.jpeg');
	}
</style>
