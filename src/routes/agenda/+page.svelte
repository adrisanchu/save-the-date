<script lang="ts">
	import { base } from '$app/paths';
	import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent,
		TimelineOppositeContent
	} from 'svelte-vertical-timeline';

	type TimelineItem = {
		title: String;
		time: String;
	};
	const agendaOptions: TimelineItem[] = [
		{ title: 'Llegada a la Iglesia', time: '12:15 pm' },
		{ title: 'Inicio de la Ceremonia', time: '12:30 pm' },
		{ title: '¡Sí Quiero! 💍', time: '01:00 pm' },
		{ title: 'Recepción a Can Ribas', time: '02:30 pm' },
		{ title: 'Comida', time: '03:30 pm' },
		{ title: '¡Que comience la Fiesta! 💃🕺', time: '07:00 pm' },
		{ title: 'Last Call de la barra libre! 🥂', time: '11:30 pm' },
		{ title: 'Que se va el autobús!', time: '12:00 am' }
	];
</script>

<head>
	<meta
		name="description"
		content="Agenda for the wedding day, as well as the location of the important places"
	/>
</head>

<div class="flex flex-col">
	<h2 id="agenda" class="ml-6 h2 pt-20 mb-4">Agenda</h2>
	<div class="flex justify-center items-center flex-wrap">
		<div class="container card p-4 mx-4 mb-2">
			<Timeline position="alternate" style={'padding: 0;'}>
				{#each agendaOptions as option, i}
					<TimelineItem
						style={`${i === 0 ? '' : 'margin-top: -13.5px; '} ${
							i !== agendaOptions.length - 1 ? 'min-height: 70px;' : 'min-height: 50px;'
						}`}
					>
						<TimelineOppositeContent slot="opposite-content">
							<p class="text-xs mt-1 mx-1 text-gray-500">{option.time}</p>
						</TimelineOppositeContent>
						<TimelineSeparator style={'padding-top: 13.5px;'}>
							<TimelineDot
								style={'background-color: #716947; margin-top: 0px; margin-bottom: 0px; display: flex; justify-content: center; border-color: transparent;'}
							/>
							<TimelineConnector style={'background-color: #716947'} />
						</TimelineSeparator>
						<TimelineContent>
							<h3 class="mx-1">{option.title}</h3>
						</TimelineContent>
					</TimelineItem>
				{/each}
			</Timeline>
		</div>

		<div class="container mx-4 my-2 grid grid-cols-1 md:grid-cols-2 md:gap-4">
			<div class="card p-4 my-2 col-span-1 flex flex-col">
				<header class="card-header py-2"><h3 class="h3 text-center">Ceremonia</h3></header>
				<hr class="!border-t-2" />
				<section class="p-4 mb-auto text-center">
					<img
						alt="Bonanova"
						src="{base}/img/bonanova.jpg"
						class="w-full mb-2 flex flex-col justify-center items-center"
					/>
					<a
						class="h5"
						href="https://maps.app.goo.gl/Xfb4t6fvaBdq7QZk8"
						target="_blank"
						rel="noopener noreferrer"
						>Iglesia de los Santos Gervasio y Protasio y Nuestra Señora de la Bonanova</a
					>
				</section>
				<hr class="!border-t-2" />
				<footer class="card-footer py-2 flex items-center justify-between">
					<p>
						Pl. de la Bonanova, 12 <br />
						Sarrià-Sant Gervasi <br />
						08022 Barcelona
					</p>
					<a
						class="anchor"
						href="https://maps.app.goo.gl/Xfb4t6fvaBdq7QZk8"
						target="_blank"
						rel="noopener noreferrer">Cómo llegar</a
					>
				</footer>
			</div>
			<div class="card p-4 my-2 col-span-1 flex flex-col">
				<header class="card-header py-2"><h3 class="h3 text-center">Banquete</h3></header>
				<hr class="!border-t-2" />
				<section class="p-4 mb-auto text-center">
					<img
						alt="Can Ribas"
						src="{base}/img/can-ribas.jpg"
						class="w-full mb-2 flex flex-col justify-center items-center"
					/>
					<a class="h5" href="https://canribas.com/" target="_blank" rel="noopener noreferrer"
						>Can Ribas de Montbui</a
					>
				</section>
				<hr class="!border-t-2" />
				<footer class="card-footer py-2 flex items-center justify-between">
					<p>
						Camí de Can Ribas, s/n <br />
						Bigues i Riells <br />
						08415 Barcelona
					</p>
					<a
						class="anchor"
						href="https://maps.app.goo.gl/KEpiT85bE9R8wWLG7"
						target="_blank"
						rel="noopener noreferrer">Cómo llegar</a
					>
				</footer>
			</div>
		</div>
	</div>
</div>
