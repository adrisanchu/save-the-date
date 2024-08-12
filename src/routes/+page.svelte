<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import type { DiffTimeStr } from '$lib/utils/datetimeFunc';
	import { countdownTimer } from '$lib/utils/datetimeFunc';

	// Animation controls
	let ready: boolean = false;
	const delay: number = 600;
	const duration: number = 1500;

	// Countdown initial setup
	const weddingDate: Date = new Date('2024-12-07T12:30:00+01:00');

	let countdown: DiffTimeStr = {
		months: '00',
		days: '00',
		hours: '00',
		minutes: '00',
		seconds: '00'
	};

	// Once the client is ready
	onMount(() => {
		ready = true;

		// Update countdown every second
		setInterval(() => {
			let today: Date = new Date();
			countdown = countdownTimer(today, weddingDate);
		}, 1000);
	});
</script>

<head>
	<meta name="description" content="Save the Date! Adri & Isa are getting married the 07/12/2024" />
</head>

<div id="main" class="img-0"></div>
{#if ready}
	<div
		class="fixed right-10 top-20 flex flex-col items-center text-surface-500"
		in:fly|global={{ delay: delay, duration: duration, easing: quintOut, x: 100 }}
	>
		<h1 class="title h1">Save the date!</h1>
		<h2 class="title h2">Adri & Isa</h2>
		<p>07.12.2024</p>
	</div>

	<div
		class="fixed bottom-4 flex w-screen flex-col items-center text-surface-500"
		in:fly|global={{ delay: delay * 2, duration: duration, easing: quintOut, y: 100 }}
	>
		<div class="columns-5 gap-2 text-center">
			<div
				class="card flex flex-col items-center bg-surface-500 bg-opacity-20 p-1 backdrop-blur-sm"
			>
				<span class="date-num text-2xl">{countdown.months}</span>
				<span class="text-xs">Meses</span>
			</div>
			<div
				class="card flex flex-col items-center bg-surface-500 bg-opacity-20 p-1 backdrop-blur-sm"
			>
				<span class="date-num text-2xl">{countdown.days}</span>
				<span class="text-xs">Días</span>
			</div>
			<div
				class="card flex flex-col items-center bg-surface-500 bg-opacity-20 p-1 backdrop-blur-sm"
			>
				<span class="date-num text-2xl">{countdown.hours}</span>
				<span class="text-xs">Horas</span>
			</div>
			<div
				class="card flex flex-col items-center bg-surface-500 bg-opacity-20 p-1 backdrop-blur-sm"
			>
				<span class="date-num text-2xl">{countdown.minutes}</span>
				<span class="text-xs">Minutos</span>
			</div>
			<div
				class="card flex flex-col items-center bg-surface-500 bg-opacity-20 p-1 backdrop-blur-sm"
			>
				<span class="date-num text-2xl">{countdown.seconds}</span>
				<span class="text-xs">Segundos</span>
			</div>
		</div>
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
			url('/img/img_0.webp');
	}
</style>
