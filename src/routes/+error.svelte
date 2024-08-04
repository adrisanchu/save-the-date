<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const baseUrl = base || '/';

	console.log('url:', $page.url);
	console.log('base url:', baseUrl);
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<div class="card mx-4 p-4">
		<header class="card-header mb-4 p-0 text-center">
			<h2>{$page.status}: {$page.error?.message}</h2>
		</header>
		<blockquote>The page you are looking for cannot be found</blockquote>
		<footer class="card-footer mt-4 p-0">
			<a href={baseUrl} class="font-bold">Back to homepage</a>
		</footer>
	</div>
</div>
