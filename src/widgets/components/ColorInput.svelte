<script lang="ts">
    import InputWrapper from "./InputWrapper.svelte";

    export let label: string = "";
    export let value: string = "#ffffff";
</script>

<InputWrapper {label}>
    <div>
        <input type="text" bind:value />
        <input type="color" bind:value />
    </div>
</InputWrapper>

<style>
    div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    input[type="text"] {
        width: 5em;
        margin: 0 1em 0 0;
        padding: 0;
        text-align: center;
    }
    input[type="color"] {
        font-size: 1em;
        min-width: 0;
        flex: 1;
        height: 1.5em;
        margin: 0;
        padding: 0;
        text-align: right;
    }
</style>
