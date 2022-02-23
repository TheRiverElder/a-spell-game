<script lang="ts">
    import InputWrapper from "./InputWrapper.svelte";
    import Switch from "./Switch.svelte";

    export let label: string = "";
    export let value: boolean = false;
</script>

<InputWrapper {label} inline>
    <Switch bind:value />
</InputWrapper>
