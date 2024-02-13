<script lang="ts">
	export let currentUrl: string = '/';
</script>

<a
	class="h5"
	aria-current={currentUrl === '/' ? 'page' : undefined}
	href="/"
>
	A & I
</a>
