<script lang="ts">
    import InputWrapper from "./InputWrapper.svelte";

    export let label: string = "";
    export let value: number = 0;
    export let min: number = -Infinity;
    export let max: number = Infinity;
    export let step: number = 0;
</script>

<InputWrapper {label}>
    <div>
        <input type="number" {max} {min} {step} bind:value />
        <input type="range" {max} {min} {step} bind:value size={1} />
    </div>
</InputWrapper>

<style>
    div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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
    input[type="range"] {
        padding: 0;
        margin: 0 0 0 1em;
        flex: 1;
    }
</style>
