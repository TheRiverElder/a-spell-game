<script lang="ts">
    export let label: string = "";
    export let inline: boolean = false;
</script>

<div class={"InputWrapper" + (inline ? ' inline' : '')}>
    {#if label}
        <div class="label">{label}</div>
    {/if}
    <div class="input">
        <slot />
    </div>
</div>

<style>
    div.InputWrapper.inline {
        display: flex;
        align-items: center;
    }
    div.label {
        padding: 1em;
        font-size: 0.8em;
        color: #3f3f3f;
    }
    div.input {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 1em;
    }
</style>
