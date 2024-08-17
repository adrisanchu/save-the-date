<script lang="ts">
	export let animated: boolean = false;
	let cssClass: string = animated ? 'placeholder animate-pulse' : 'placeholder';
</script>

<div class="space-y-4 p-4">
	<div class={cssClass} />
	<div class="grid grid-cols-3 gap-8">
		<div class={cssClass} />
		<div class={cssClass} />
		<div class={cssClass} />
	</div>
	<div class="grid grid-cols-4 gap-4">
		<div class={cssClass} />
		<div class={cssClass} />
		<div class={cssClass} />
		<div class={cssClass} />
	</div>
</div>
