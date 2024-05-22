<script lang="ts">
	import { Confetti } from 'svelte-confetti';
</script>

<div class="flex justify-center items-center fixed top-0 w-screen h-screen">
	<Confetti
		noGravity
		amount={300}
		x={[-3, 1]}
		y={[-1, 4]}
		delay={[0, 50]}
		duration={1200}
		colorRange={[0, 120]}
	/>
	<Confetti
		noGravity
		amount={500}
		x={[-1, 3]}
		y={[-1, 4]}
		delay={[550, 600]}
		duration={1200}
		colorRange={[120, 240]}
	/>
	<Confetti
		noGravity
		amount={400}
		x={[-1, 1]}
		y={[-2, 2]}
		delay={[1150, 1200]}
		duration={1200}
		colorRange={[240, 360]}
	/>
</div>
