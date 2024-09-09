<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { Invite } from '$lib/types';

	export let invites: Invite[];

	let inviteTypes: { [key: string]: number } = {};
	let assistedInvites: Invite[] = [];
	let allergicInvites: Invite[] = [];

	let barChart: any;
	let pieChart: any;

	function calculateCharts() {
		// Calculate the number of invites by type
		inviteTypes = {};
		invites.forEach((invite) => {
			inviteTypes[invite.type] = (inviteTypes[invite.type] || 0) + 1;
		});

		// Filter invites with assistance == true
		assistedInvites = invites.filter((invite) => invite.assistance);

		// Filter invites with otherAllergies !== undefined
		allergicInvites = invites.filter((invite) => invite.otherAllergies !== undefined);
	}

	calculateCharts();

	onMount(() => {
		// Set up the bar chart
		const barCtx = barChart.getContext('2d');
		if (barCtx) {
			barChart = new Chart(barCtx, {
				type: 'pie',
				data: {
					labels: Object.keys(inviteTypes),
					datasets: [
						{
							label: 'Invites',
							data: Object.values(inviteTypes),
							backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56']
						}
					]
				},
				options: {
					plugins: {
						title: {
							display: false,
							text: 'Invites by Type'
						}
					}
				}
			});
		}

		// Set up the pie chart
		const pieCtx = pieChart.getContext('2d');
		if (pieCtx) {
			pieChart = new Chart(pieCtx, {
				type: 'pie',
				data: {
					labels: ['Sí', 'No'],
					datasets: [
						{
							label: 'Invites',
							data: [assistedInvites.length, invites.length - assistedInvites.length],
							backgroundColor: ['#36A2EB', '#FF6384']
						}
					]
				},
				options: {
					plugins: {
						title: {
							display: false,
							text: 'Invites Assisting'
						}
					}
				}
			});
		}
	});
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="card">
		<h2 class="card-header">Invitados por Tipo</h2>
		<div class="align-items mb-2 flex justify-center">
			<canvas bind:this={barChart}></canvas>
		</div>
	</div>

	<div class="card">
		<h2 class="card-header">Asistencia</h2>
		<div class="align-items mb-2 flex justify-center">
			<canvas bind:this={pieChart}></canvas>
		</div>
	</div>

	<div class="card">
		<h2 class="card-header">Invitados con alergias especiales</h2>
		<div class="p-4">
			<ul>
				{#each allergicInvites as invite}
					<li>
						{invite.name}
						{invite.surname} - {invite.otherAllergies || '-'}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
