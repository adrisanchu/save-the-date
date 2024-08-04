<script lang="ts">
	import { clipboard } from '@skeletonlabs/skeleton';
	const accountNumber: string = 'ES55 2100 0988 3702 0010 0793';
</script>

<head>
	<meta name="description" content="Contact information in case of any problems" />
</head>

<div id="main" class="img-1">
	<div class="flex flex-col text-surface-400">
		<h2 id="contact" class="h2 mb-2 ml-6 pt-20">Contacto</h2>
		<div class="flex items-center justify-center">
			<div class="card container mx-4 bg-surface-500 bg-opacity-20 p-4 backdrop-blur-sm">
				<p>Para resolver cualquier duda:</p>
				<dl class="list-dl">
					<div>
						<span class="flex-auto">
							<dt>Adrián</dt>
							<dd class="ml-2 flex flex-col text-sm">
								<span>(+34) 618 59 46 89</span>
								<span>adrian.sanchez.r93@gmail.com</span>
							</dd>
						</span>
					</div>
					<div>
						<span class="flex-auto">
							<dt>Isabel</dt>
							<dd class="ml-2 flex flex-col text-sm">
								<span>(+34) 636 64 24 35</span>
								<span>isabeltorresgomez14@gmail.com</span>
							</dd>
						</span>
					</div>
				</dl>
			</div>
		</div>
		<h2 id="contact" class="h2 mb-2 ml-6 pt-5">Lista de bodas</h2>
		<div class="flex items-center justify-center">
			<div class="card container mx-4 bg-surface-500 bg-opacity-20 p-4 backdrop-blur-sm">
				<p class="text-sm italic">
					Para nosotros, el mejor regalo es que nos acompañéis en este día tan especial.<br />
					Y si queréis ayudarnos a llegar a Japón...
				</p>
				<div class="mt-4 flex items-center justify-center space-x-2">
					<span class="text-lg">{accountNumber}</span>
					<button
						use:clipboard={accountNumber.replace(/\s/g, '')}
						class="variant-filled btn-icon btn-icon-sm h-8 w-8 font-bold">C</button
					>
				</div>
			</div>
		</div>
		<div class="fixed bottom-2 right-4 text-xs text-surface-800">
			Foto de <a
				href="https://unsplash.com/es/@bananablackcat?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
				class="underline">Svetlana Gumerova</a
			>
			en
			<a
				href="https://unsplash.com/es/fotos/templo-cerca-de-los-arboles-durante-el-dia-PMkQ7WVWqr0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
				class="underline">Unsplash</a
			>
		</div>
	</div>
</div>

<style>
	#main {
		width: 100vw;
		height: 100vh;
		background-size: cover;
		background-position: center;
		box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
	}
	.img-1 {
		background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
			url('/img/etlana-gumerova-pmkq7wvwqr0-unsplash.webp');
	}
</style>
