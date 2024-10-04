<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { ChartEvent } from 'chart.js';
	import type { Invite } from '$lib/types';
	import { getColor } from '$lib/utils/colors';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	import ModalInvitesList from '$lib/components/ModalInvitesList.svelte';

	const modalInvList: ModalComponent = {
		ref: ModalInvitesList,
		props: { invites: [] }
	};

	// handle modal pop-up
	const modalStore = getModalStore();

	export let invites: Invite[];

	let inviteTypes: { [key: string]: number } = {};
	let inviteBuses: { [key: string]: Invite[] } = {};
	let assistedInvites: Invite[] = [];
	let allergicInvites: Invite[] = [];

	let invitesByTypeChart: any;
	let invitesByBusChart: any;
	let invitesAssistingChart: any;

	function calculateCharts() {
		// Calculate the number of invites by type
		inviteTypes = {};
		invites.forEach((invite) => {
			inviteTypes[invite.type] = (inviteTypes[invite.type] || 0) + 1;
		});

		// Calculate the number of invites by bus conditions
		inviteBuses = {};

		invites.forEach((invite) => {
			// A: no bus
			if (invite.bus?.busGo === false && invite.bus?.busReturn === false) {
				if ('No Bus' in inviteBuses === false) {
					inviteBuses['No Bus'] = [];
				}
				inviteBuses['No Bus'].push(invite);
			}
			// B: bus go
			if (invite.bus?.busGo === true) {
				if ('Bus Ida' in inviteBuses === false) {
					inviteBuses['Bus Ida'] = [];
				}
				inviteBuses['Bus Ida'].push(invite);
			}
			// C: bus return
			if (invite.bus?.busReturn === true) {
				if ('busReturnEarly' in invite.bus && invite.bus?.busReturnEarly === true) {
					// C1: return early
					if ('Bus Vuelta pronto' in inviteBuses === false) {
						inviteBuses['Bus Vuelta pronto'] = [];
					}
					inviteBuses['Bus Vuelta pronto'].push(invite);
				} else {
					// C2: return late
					if ('Bus Vuelta tarde' in inviteBuses === false) {
						inviteBuses['Bus Vuelta tarde'] = [];
					}
					inviteBuses['Bus Vuelta tarde'].push(invite);
				}
			}
		});

		console.log('inviteBuses: ', inviteBuses);

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
							backgroundColor: [
								getColor('primary', 0.6),
								getColor('secondary', 0.6),
								getColor('tertiary', 0.6),
								getColor('surface', 0.6)
							],
							borderColor: [
								getColor('primary', 0.8),
								getColor('secondary', 0.8),
								getColor('tertiary', 0.8),
								getColor('surface', 0.8)
							]
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
							backgroundColor: [getColor('success', 0.6), getColor('error', 0.6)],
							borderColor: [getColor('success', 0.8), getColor('error', 0.8)]
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

		// Set up the bar chart
		const invitesByBusCtx = invitesByBusChart.getContext('2d');
		if (invitesByBusCtx) {
			invitesByBusChart = new Chart(invitesByBusCtx, {
				type: 'bar',
				data: {
					labels: Object.keys(inviteBuses),
					datasets: [
						{
							label: 'Invites',
							data: Object.entries(inviteBuses).map(([key, value]) => value.length),
							backgroundColor: [
								getColor('primary', 0.6),
								getColor('secondary', 0.6),
								getColor('tertiary', 0.6),
								getColor('surface', 0.6)
							],
							borderColor: [
								getColor('primary', 0.8),
								getColor('secondary', 0.8),
								getColor('tertiary', 0.8),
								getColor('surface', 0.8)
							]
						}
					]
				},
				options: {
					plugins: {
						legend: { display: false },
						title: {
							display: false,
							text: 'Invites by Bus'
						}
					},
					onClick: handleBusClick
				}
			});
		}
	});

	function handleBusClick(event: ChartEvent) {
		const activeElement = invitesByBusChart.getActiveElements(event)[0];
		console.log('activeElement: ', activeElement);
		if (!activeElement) return;
		const ctx = activeElement.element.$context;
		const clickedCategory: string = Object.keys(inviteBuses)[ctx.dataIndex];

		// Update the list of clicked invites and show a modal
		modalInvList.props!.invites = inviteBuses[clickedCategory];
		showInvitesModal(clickedCategory);
	}

	function showInvitesModal(clickedCategory: string) {
		const modal: ModalSettings = {
			type: 'component',
			component: modalInvList,
			title: 'Lista de Invitados',
			body: clickedCategory
		};
		modalStore.trigger(modal);
	}
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-1">
		<div class="card">
			<h2 class="card-header">Núm. Invitados</h2>
			<div class="align-items mb-4 flex justify-center">
				<span class="text-2xl">{assistedInvites.length}</span>
			</div>
		</div>

		<div class="card">
			<h2 class="card-header">Núm. Formularios</h2>
			<div class="align-items mb-4 flex justify-center">
				<span class="text-2xl">{'??'}</span>
			</div>
		</div>
	</div>

	<div class="card">
		<h2 class="card-header">Invitados por Tipo</h2>
		<div class="align-items mb-4 flex justify-center">
			<canvas bind:this={invitesByTypeChart}></canvas>
		</div>
	</div>

	<div class="card">
		<h2 class="card-header">Transporte</h2>
		<div class="align-items mx-4 mb-4 flex justify-center">
			<canvas bind:this={invitesByBusChart}></canvas>
		</div>
	</div>

	<div class="card">
		<h2 class="card-header">Asistencia</h2>
		<div class="align-items mb-4 flex justify-center">
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
