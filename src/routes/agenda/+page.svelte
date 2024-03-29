<script lang="ts">
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
		{ title: '¡Sí Quiero! 💍', time: '01:15 pm' },
		{ title: 'Recepción a Can Ribas', time: '02:30 pm' },
		{ title: 'Comida', time: '03:30 pm' },
		{ title: '¡Que comience la Fiesta! 💃🕺', time: '07:00 pm' },
		{ title: 'Last Call de la barra libre! 🥂', time: '11:30 pm' },
		{ title: 'Que se va el autobús!', time: '12:00 am' }
	];
</script>

<div class="flex flex-col">
	<h2 id="agenda" class="ml-6 h2 pt-20 mb-4">Agenda</h2>
	<div class="flex justify-center items-center">
		<div class="container card p-4 mx-4">
			<Timeline position="alternate" style={'padding: 0;'}>
				{#each agendaOptions as option}
					<TimelineItem style={'min-height: 50px;'}>
						<TimelineOppositeContent slot="opposite-content">
							<p class="text-xs mt-1 mx-1">{option.time}</p>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot />
							<TimelineConnector style={'background-color: bg-primary-900;'} />
						</TimelineSeparator>
						<TimelineContent>
							<h3 class="mx-1">{option.title}</h3>
						</TimelineContent>
					</TimelineItem>
				{/each}
			</Timeline>
		</div>
	</div>
</div>
