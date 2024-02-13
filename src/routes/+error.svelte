<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const baseUrl = base || '/';

	console.log('url:', $page.url);
	console.log('base url:', baseUrl);
</script>

<div class="flex flex-col justify-center items-center min-h-screen">
	<div class="card p-4 mx-4">
		<header class="card-header text-center mb-4 p-0">
			<h2>{$page.status}: {$page.error?.message}</h2>
		</header>
		<blockquote>The page you are looking for cannot be found</blockquote>
		<footer class="card-footer mt-4 p-0">
			<a href={baseUrl} class="font-bold">Back to homepage</a>
		</footer>
	</div>
</div>
