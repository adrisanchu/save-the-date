<script lang="ts">
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
				'<em>(código de descuento disponible próximamente)</em>'
			]
		},
		{
			title: 'Hotel Catalonia 505, 4*',
			link: 'https://www.cataloniahotels.com/es/hotel/catalonia-barcelona-505',
			address: 'C/ de Muntaner, 505, Sarrià-Sant Gervasi, 08022 Barcelona',
			addressLink:
				'https://www.google.com/maps/place/Hotel+Catalonia+Barcelona+505/@41.4032776,2.1346616,17z/data=!3m1!5s0x12a4980d1a89cd2f:0x4feb58d51986db3f!4m11!3m10!1s0x12a4980d04dda15b:0xe4d04b1750a256!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4032776!4d2.1372365!16s%2Fg%2F11cs4h1z9b?hl=es&entry=tts',
			additionalInfo: [
				'Código de descuento: <b>ISABEL&ADRIAN</b>',
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
			address: 'Carrer de Vilana, 7, 5, Sarrià-Sant Gervasi, 08017 Barcelona',
			addressLink:
				'https://www.google.com/maps/place/Vilana+Hotel/@41.4049366,2.1260902,17z/data=!4m24!1m12!3m11!1s0x12a498144316f1fd:0x15340980547cfc6a!2sVilana+Hotel!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4049366!4d2.1286651!16s%2Fg%2F1tvdxxf_!3m10!1s0x12a498144316f1fd:0x15340980547cfc6a!5m4!1s2024-07-02!2i2!4m1!1i2!8m2!3d41.4049366!4d2.1286651!16s%2Fg%2F1tvdxxf_?hl=es&entry=ttu',
			additionalInfo: [
				'Hotel de 20 habitaciones. Código de 10% de descuento llamando (+34 934 340 363) o contactando por email (vilana@ohotels.es) a la atención de Xènia, indicando que vais por la boda.'
			]
		}
	];

	const hotelsWithNoDiscount: HotelInfo[] = [
		{ title: 'Bonanova Suite, 3*' },
		{ title: 'Exe Mitre Hotel, 3*' }
	];

	const otherHotels: HotelInfo[] = [
		{ title: 'Hotel Zenit Barcelona, 4*' },
		{ title: 'U232 Hotel, 4*' },
		{ title: 'Hotel H10 Art Gallery, 4*' },
		{ title: 'Hotel Room Mate Anna, 4*' }
	];
</script>

<div class="flex flex-col">
	<h2 id="transport" class="ml-6 h2 pt-20 mb-4">Transporte</h2>
	<div class="flex justify-center items-center">
		<div class="container card p-4 mx-4">
			<p>Se contará con servicio de autobuses:</p>
			<ul class="list mt-4">
				<li>
					<span class="badge variant-filled">13:30</span>
					<span class="flex-auto">
						Autobús de ida desde la Iglesia hasta Can Ribas al acabar la ceremonia
					</span>
				</li>
				<li>
					<span class="badge variant-filled">00:15</span>
					<span class="flex-auto">
						Autobús de vuelta al acabar la fiesta de Can Ribas hasta Barcelona
					</span>
				</li>
			</ul>
		</div>
	</div>
	<h2 id="hotels" class="ml-6 h2 pt-5 mb-4">Hoteles</h2>
	<div class="flex justify-center items-center flex-wrap">
		<div class="container card p-4 mx-4 mb-4">
			<p>Hoteles que hemos contactado, con descuento:</p>
			{#each hotels as { title, link, address, addressLink, additionalInfo }, i (title)}
				<HotelCard {title} {link} {address} {addressLink} {additionalInfo}></HotelCard>
				{#if i !== hotels.length - 1}
					<hr class="!border-t-2" />
				{/if}
			{/each}
		</div>
		<div class="container card p-4 mx-4 my-4">
			<p>Hoteles próximos a la zona, sin descuento:</p>
			{#each hotelsWithNoDiscount as { title, link, address, addressLink, additionalInfo } (title)}
				<HotelCard {title} {link} {address} {addressLink} {additionalInfo}></HotelCard>
			{/each}
		</div>
		<div class="container card p-4 mx-4 my-4">
			<p>Otros hoteles en Barcelona:</p>
			{#each otherHotels as { title, link, address, addressLink, additionalInfo } (title)}
				<HotelCard {title} {link} {address} {addressLink} {additionalInfo}></HotelCard>
			{/each}
		</div>
	</div>
</div>
