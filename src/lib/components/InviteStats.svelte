<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { Invite } from '$lib/types';

	export let invites: Invite[];

	let inviteTypes: { [key: string]: number } = {};
	let assistedInvites: Invite[] = [];
	let allergicInvites: Invite[] = [];

	let invitesByTypeChart: any;
	let invitesAssistingChart: any;

	const style = getComputedStyle(document.body);
	const primaryColor = convertToRGB(style.getPropertyValue('--color-primary-500'));
	const secondaryColor = convertToRGB(style.getPropertyValue('--color-secondary-500'));
	const tertiaryColor = convertToRGB(style.getPropertyValue('--color-tertiary-600'));
	const surfaceColor = convertToRGB(style.getPropertyValue('--color-surface-500'));
	const successColor = convertToRGB(style.getPropertyValue('--color-success-500'));
	const errorColor = convertToRGB(style.getPropertyValue('--color-error-500'));

	function convertToRGB(color: string) {
		const [r, g, b] = color.split(' ');
		return `rgb(${r}, ${g}, ${b})`;
	}

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
		const invitesByTypeCtx = invitesByTypeChart.getContext('2d');
		if (invitesByTypeCtx) {
			invitesByTypeChart = new Chart(invitesByTypeCtx, {
				type: 'doughnut',
				data: {
					labels: Object.keys(inviteTypes),
					datasets: [
						{
							label: 'Invites',
							data: Object.values(inviteTypes),
							backgroundColor: [primaryColor, secondaryColor, tertiaryColor, surfaceColor]
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
		const invitesAssistingCtx = invitesAssistingChart.getContext('2d');
		if (invitesAssistingCtx) {
			invitesAssistingChart = new Chart(invitesAssistingCtx, {
				type: 'pie',
				data: {
					labels: ['Sí', 'No'],
					datasets: [
						{
							label: 'Invites',
							data: [assistedInvites.length, invites.length - assistedInvites.length],
							backgroundColor: [successColor, errorColor]
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
			<canvas bind:this={invitesByTypeChart}></canvas>
		</div>
	</div>

	<div class="card">
		<h2 class="card-header">Asistencia</h2>
		<div class="align-items mb-2 flex justify-center">
			<canvas bind:this={invitesAssistingChart}></canvas>
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
