<script lang="ts">
	import { base } from '$app/paths';
	import type { LegalDetails } from '$lib/types';

	let legal: LegalDetails = {
		name: 'Adrián Sánchez Rodríguez',
		id: '51485315E',
		address: 'calle Alcalá 194, 28028 Madrid (España)'
	};
</script>

<head>
	<meta name="terms" content="Terms and conditions regarding the data privacy" />
</head>

<div class="flex flex-col">
	<h2 id="terms" class="h2 mb-4 ml-6 pt-20">Aviso Legal</h2>
	<div class="flex flex-wrap items-center justify-center">
		<div class="card container mx-4 mb-2 p-4">
			<h3 class="h3">Términos y Condiciones del tratamiento de tus datos</h3>
			<section class="my-2 space-y-2">
				<p>
					El responsable del tratamiento de tus datos es <span class="italic">{legal.name}</span>,
					con DNI: {legal.id} y domicilio en <span class="italic">{legal.address}</span>.
				</p>
				<p>
					Tus datos serán tratados en base al consentimiento manifestado mediante la cumplimentación
					y envío del <a href="{base}/form/new" class="anchor">formulario.</a>
				</p>
				<p>
					La finalidad del tratamiento es la preparación de <span
						class="font-semibold text-pink-500">la boda</span
					>
					(en adelante, <span class="italic">el evento</span>), que tendrá lugar el
					<span class="italic">07/12/2024</span>.
				</p>
				<p>
					Se hará uso de sus datos única y exclusivamente para la organización de dicho evento. Por
					ello, serán compartidos con aquellas empresas o entidades que así lo requieran (iglesia,
					transporte, o empresa de celebración de eventos).
				</p>
				<p>
					Adicionalmente, se podrá hacer uso de estos datos para el envío de comunicaciones,
					genéricas o personalizadas, de carácter informativo sobre las actividades, novedades y/o
					servicios relacionados con el evento, que podamos considerar de tu interés.
				</p>
				<p>Tus datos serán almacenados de manera segura, garantizando que:</p>
				<ul class="list">
					<li class="ml-2">- No abandonarán la Unión Europea</li>
					<li class="ml-2">
						- No serán compartidos con terceros (más allá de los mencionados anteriormente)
					</li>
				</ul>
				<p>
					Tus datos se almacenarán, como máximo, por un periodo de dos años tras el evento (esto es,
					el 07/12/2026).
				</p>
				<p>
					Si deseas retirar el consentimiento y que tus datos sean borrados, puedes <a
						href="{base}/form/new"
						class="anchor">ponerte en contacto con nosotros.</a
					>
				</p>
			</section>
		</div>
	</div>
</div>
