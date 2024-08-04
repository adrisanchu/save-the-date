<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import HotelCard from '$lib/components/HotelCard.svelte';

	type HotelInfo = {
		title: string;
		link?: string;
		address?: string;
		addressLink?: string;
		additionalInfo?: string[];
	};
	const hotels: HotelInfo[] = [
		{
			title: 'Hotel Catalonia Mikado, 3*',
			link: 'https://www.cataloniahotels.com/es/hotel/catalonia-mikado',
			address: 'Pg. de la Bonanova, 58, Sarrià-Sant Gervasi, 08017 Barcelona',
			addressLink:
				'https://www.google.es/maps/place/Hotel+Catalonia+Mikado/@41.4033165,2.1244595,17z/data=!3m1!4b1!4m9!3m8!1s0x12a4981510d75053:0x13c7fbf784cc1e9e!5m2!4m1!1i2!8m2!3d41.4033165!4d2.1270344!16s%2Fg%2F1tkzjkgv?entry=ttu',
			additionalInfo: [
				'El descuento es del 10% sobre el precio de la habitación en el momento de hacer la reserva.',
				'El pago se haría en el Hotel a la llegada y se podría cancelar sin gastos hasta 48 horas antes.',
				'Código de descuento: <b>BODAISABELADRIAN</b>',
				'Se aplica automáticamente con el siguiente <a class="anchor" href="https://www.cataloniahotels.com/es/content/boda-isabel-y-adrian" target="_blank" rel="noopener noreferrer">enlace</a>'
			]
		},
		{
			title: 'Hotel Catalonia 505, 4*',
			link: 'https://www.cataloniahotels.com/es/hotel/catalonia-barcelona-505',
			address: 'C/ de Muntaner, 505, Sarrià-Sant Gervasi, 08022 Barcelona',
			addressLink:
				'https://www.google.com/maps/place/Hotel+Catalonia+Barcelona+505/@41.4032776,2.1346616,17z/data=!3m1!5s0x12a4980d1a89cd2f:0x4feb58d51986db3f!4m11!3m10!1s0x12a4980d04dda15b:0xe4d04b1750a256!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4032776!4d2.1372365!16s%2Fg%2F11cs4h1z9b?hl=es&entry=tts',
			additionalInfo: [
				'Código de descuento: <b>BODAISABELADRIAN</b>',
				'Se aplica automáticamente con el siguiente <a class="anchor" href="https://www.cataloniahotels.com/es/content/boda-isabel-y-adrian" target="_blank" rel="noopener noreferrer">enlace</a>'
			]
		},
		{
			title: 'Hotel Silken Sant Gervasi, 3*',
			link: 'https://www.hoteles-silken.com/es/hotel-st-gervasi-barcelona',
			address: 'C/ de Sant Gervasi de Cassoles, 26, Sarrià-Sant Gervasi, 08022 Barcelona',
			addressLink:
				'https://www.google.com/maps/place/Hotel+Silken+Sant+Gervasi/@41.4047246,2.1363157,16z/data=!4m24!1m12!3m11!1s0x12a4980c5d5348b7:0xebeb3ab101cad9e5!2sHotel+Silken+Sant+Gervasi!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4047246!4d2.1388906!16s%2Fg%2F1vxq8wdr!3m10!1s0x12a4980c5d5348b7:0xebeb3ab101cad9e5!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4047246!4d2.1388906!16s%2Fg%2F1vxq8wdr?hl=es&entry=ttu',
			additionalInfo: [
				'Código de 10% : <b>BODA</b>',
				'<em>(si os hacéis miembros del grupo Silken, tendréis más descuento)</em>'
			]
		},
		{
			title: 'Hotel Vilana, 4*',
			link: 'https://vilanahotel.com',
			address: 'Carrer de Vilana, 7, 5, Sarrià-Sant Gervasi, 08017 Barcelona',
			addressLink:
				'https://www.google.com/maps/place/Vilana+Hotel/@41.4049366,2.1260902,17z/data=!4m24!1m12!3m11!1s0x12a498144316f1fd:0x15340980547cfc6a!2sVilana+Hotel!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4049366!4d2.1286651!16s%2Fg%2F1tvdxxf_!3m10!1s0x12a498144316f1fd:0x15340980547cfc6a!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4049366!4d2.1286651!16s%2Fg%2F1tvdxxf_?hl=es&entry=ttu',
			additionalInfo: [
				'Hotel de 20 habitaciones. Código de 10% de descuento llamando (+34 934 340 363) o contactando por email (vilana@ohotels.es) a la atención de Xènia, indicando que vais por la boda.'
			]
		}
	];

	const hotelsWithNoDiscount: HotelInfo[] = [
		{
			title: 'Bonanova Suite, 3*',
			link: 'https://www.premiumsuitehotels.com/bonanova-suite-hotel',
			address: 'C/ del Bisbe Sivilla, 7, Sarrià-Sant Gervasi, 08022 Barcelona',
			addressLink:
				'https://www.google.com/maps/place/Aparthotel+Bonanova/@41.4054914,2.136113,16z/data=!3m1!4b1!4m11!3m10!1s0x12a4980dec0e66cd:0xb2799c8cd693bc4d!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4054914!4d2.136113!16s%2Fg%2F1wfz13f_?entry=ttu'
		},
		{
			title: 'Exe Mitre Hotel, 3*',
			link: 'https://www.eurostarshotels.com/exe-mitre.html',
			address: 'Carrer de Bertran, 9, 15, Distrito de Sarrià-Sant Gervasi, 08023 Barcelona',
			addressLink:
				'https://www.google.com/maps/place/Exe+Mitre+Hotel/@41.4049772,2.1405734,16z/data=!3m1!4b1!4m11!3m10!1s0x12a4980b8ce58e49:0x9f038e3f491185c!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4049772!4d2.1405734!16s%2Fg%2F1vrtw_4n?entry=ttu'
		}
	];

	const otherHotels: HotelInfo[] = [
		{
			title: 'Hotel Zenit Barcelona, 4*',
			link: 'https://barcelona.zenithoteles.com',
			address: 'Carrer de Santaló, 8, Sarrià-Sant Gervasi, 08021 Barcelona',
			addressLink:
				'https://www.google.com/maps/place/Hotel+Zenit+Barcelona/@41.3949582,2.1468892,17z/data=!3m1!4b1!4m11!3m10!1s0x12a4a29db9d734ab:0x534c979eedbd3129!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.3949582!4d2.1468892!16s%2Fg%2F1thk0_w7?entry=ttu'
		},
		{
			title: 'U232 Hotel, 4*',
			link: 'https://www.u232hotel.com/es',
			address: "Carrer del Comte d'Urgell, 232, L'Eixample, 08036 Barcelona",
			addressLink:
				'https://www.google.com/maps/place/U232+Hotel/@41.3896603,2.1489779,16z/data=!3m1!4b1!4m11!3m10!1s0x12a4a2836bfecb21:0x747b0342e2800805!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.3896603!4d2.1489779!16s%2Fg%2F1tmmb00l?entry=ttu'
		},
		{
			title: 'Hotel H10 Art Gallery, 4*',
			link: 'https://www.h10hotels.com/en/barcelona-hotels/h10-art-gallery',
			address: "C. d'Enric Granados, 62-64, L'Eixample, 08008 Barcelona",
			addressLink:
				'https://www.google.com/maps/place//data=!4m2!3m1!1s0x12a4a29033fef059:0x58e1343e06c2dc9b?sa=X&ved=1t:8290&ictx=111'
		},
		{
			title: 'Hotel Room Mate Anna, 4*',
			link: 'https://room-matehotels.com/en/anna/',
			address: "C/ d'Aragó, 271, L'Eixample, 08007 Barcelona",
			addressLink:
				'https://www.google.com/maps/place//data=!4m2!3m1!1s0x12a4a2ed24b8cc65:0x1db2e855107139fd?sa=X&ved=1t:8290&ictx=111'
		}
	];
</script>

<head>
	<meta
		name="description"
		content="Information about the hotels and the transport options on the wedding day"
	/>
</head>

<div class="flex flex-col">
	<h2 id="hotels" class="h2 mb-4 ml-6 pt-20">Alojamiento</h2>
	<div class="flex flex-wrap items-center justify-center">
		<div class="card container mx-4 mb-2 p-4">
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="summary"
						><p>Hoteles que hemos contactado, con descuento:</p></svelte:fragment
					>
					<svelte:fragment slot="content"
						>{#each hotels as { title, link, address, addressLink, additionalInfo }, i (title)}
							<HotelCard {title} {link} {address} {addressLink} {additionalInfo}></HotelCard>
							{#if i !== hotels.length - 1}
								<hr class="!border-t-2" />
							{/if}
						{/each}</svelte:fragment
					>
				</AccordionItem>
			</Accordion>
		</div>
		<div class="card container mx-4 my-2 p-4">
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="summary"
						><p>Hoteles próximos a la zona, sin descuento:</p></svelte:fragment
					>
					<svelte:fragment slot="content"
						>{#each hotelsWithNoDiscount as { title, link, address, addressLink, additionalInfo }, i (title)}
							<HotelCard {title} {link} {address} {addressLink} {additionalInfo}></HotelCard>
							{#if i !== hotelsWithNoDiscount.length - 1}
								<hr class="!border-t-2" />
							{/if}
						{/each}</svelte:fragment
					>
				</AccordionItem>
			</Accordion>
		</div>

		<div class="card container mx-4 my-2 p-4">
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="summary">
						<p>Otros hoteles en Barcelona:</p></svelte:fragment
					>
					<svelte:fragment slot="content">
						{#each otherHotels as { title, link, address, addressLink, additionalInfo }, i (title)}
							<HotelCard {title} {link} {address} {addressLink} {additionalInfo}></HotelCard>
							{#if i !== otherHotels.length - 1}
								<hr class="!border-t-2" />
							{/if}
						{/each}</svelte:fragment
					>
				</AccordionItem>
			</Accordion>
		</div>
		<div class="card container mx-4 mt-2 w-full p-4" style="height: 80vh;">
			<iframe
				title="map"
				class="h-full w-full"
				src="https://www.google.com/maps/d/embed?mid=1hmmqatsugJSA89OARtd5P0sOqWevQBM&ehbc=2E312F&noprof=1"
				style="border: 0;"
				allow="fullscreen"
			/>
		</div>
	</div>
	<h2 id="transport" class="h2 mb-4 ml-6 pt-5">Transporte</h2>
	<div class="flex items-center justify-center">
		<div class="card container mx-4 mb-2 p-4">
			<p>Se contará con servicio de autobuses:</p>
			<ul class="list mt-4">
				<li>
					<span class="variant-filled badge">13:30</span>
					<span class="flex-auto">
						Autobús de ida desde la Iglesia hasta Can Ribas al acabar la ceremonia
					</span>
				</li>
				<li>
					<span class="variant-filled badge">00:15</span>
					<span class="flex-auto">
						Autobús de vuelta al acabar la fiesta de Can Ribas hasta Barcelona
					</span>
				</li>
			</ul>
		</div>
	</div>
	<h2 id="other" class="h2 mb-4 ml-6 pt-5">Otra información de interés</h2>
	<div class="flex items-center justify-center">
		<div class="card container mx-4 mb-4 p-4">
			<h3 id="hairdresser" class="h3 mb-2 pt-2">Peluquerías</h3>
			<div class="w-full" style="height: 80vh;">
				<iframe
					title="map"
					class="h-full w-full"
					src="https://www.google.com/maps/d/embed?mid=1cXSt5uCS5fZBfbnxTkx-b6cDCeAQmnY&ehbc=2E312F"
					style="border: 0;"
					allow="fullscreen"
				/>
			</div>
		</div>
	</div>
</div>
