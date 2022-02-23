<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { Level } from "./core/Level";
	import { Ticker } from "./core/Ticker";
	import { World } from "./core/World";
	import { WorldRenderer } from "./core/WorldRenderer";
	import NumberInput from "./widgets/components/NumberInput.svelte";

	let canvas: HTMLCanvasElement;
	let root: HTMLElement;

	const world = new World();
	const level = new Level();
	let renderer: WorldRenderer;
	let ticker: Ticker;

	level.initialize(world);

	onMount(() => {
		renderer = new WorldRenderer(world, canvas);
		renderer.initialize(root);
		ticker = new Ticker(50, () => world.onTick());
		ticker.start();
		running = true;
		loop();
	});

	onDestroy(() => {
		ticker.stop();
		running = false;
		renderer?.dispose();
	});

	let running = false;

	function loop() {
		if (!running) return;
		renderer.render();
		requestAnimationFrame(loop);
		// console.log(world.getAllBions().length);
	}
</script>

<main bind:this={root} tabindex={1} >
	<canvas class="p-absolute p-a-fill" bind:this={canvas} />
	<div class="hud p-absolute p-a-fill">
		<div class="parameters">
			<NumberInput label="引力常量G" bind:value={world.config.G} min={0} max={0.2} step={0.001} />
			<NumberInput label="摩擦力常量F" bind:value={world.config.F} min={0} max={0.2} step={0.001} />
			<NumberInput label="排斥力常量F" bind:value={world.config.E} min={0} max={10} step={0.001} />
			<NumberInput label="玩家速度playerSpeed" bind:value={world.config.playerSpeed} min={0} max={10} step={0.001} />
			{#if !!renderer}
				<NumberInput label="缩放比例" bind:value={renderer.scale} min={0.001} max={10} step={0.001} />
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		background-color: #2a315a;
		position: relative;
	}
	.p-absolute {
		position: absolute;
	}
	.p-a-fill {
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	canvas {
		width: 100%;
		height: 100%;
	}
	.hud {
		padding: 1em;
		background-color: transparent;
	}
	.parameters {
		width: 20em;
	}
</style>
