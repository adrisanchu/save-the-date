<script lang="ts">
	export let title: string = '';
	export let link: string | undefined;
	export let address: string | undefined;
	export let addressLink: string | undefined;
	export let additionalInfo: string[] | undefined;
</script>

<section class="my-3 space-y-2">
	<h4 class="variant-filled btn">
		{#if link}
			<a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
		{:else}
			{title}
		{/if}
	</h4>
	{#if address}
		<div class="flex flex-col space-y-1 text-sm">
			<span class="mb-1">
				{#if addressLink}
					<a class="anchor" href={addressLink} target="_blank" rel="noopener noreferrer"
						>({address})</a
					>
				{:else}
					({address})
				{/if}
			</span>

			{#if additionalInfo}
				{#each additionalInfo as addInfo}
					<span>{@html addInfo}</span>
				{/each}
			{/if}
		</div>
	{/if}
</section>
