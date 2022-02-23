<script lang="ts">
    import type { Range } from "../../interfaces";
import InputWrapper from "./InputWrapper.svelte";
    export let label: string = "";
    export let value: Range = { start: 0, end: 0 };
    export let min: number = -Infinity;
    export let max: number = Infinity;
    export let step: number = 0;

    let start: number = value.start;
    let end: number = value.end;

    $: value = { start, end };
</script>

<InputWrapper {label}>
    <div>
        <input
            type="number"
            max={Math.min(end, max)}
            {min}
            {step}
            bind:value={start}
        />
        <span>←→</span>
        <input
            type="number"
            {max}
            min={Math.max(min, start)}
            {step}
            bind:value={end}
        />
    </div>
</InputWrapper>

<style>
    div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span {
        flex: 1;
        margin: 0 1em;
    }
    input {
        font-size: 1em;
        min-width: 0;
    }
    input[type="number"] {
        width: 5em;
        margin: 0;
        padding: 0;
        text-align: right;
    }
    /* input[type="range"] {
        padding: 0;
        margin: 0 1em;
        flex: 1;
    } */
</style>
