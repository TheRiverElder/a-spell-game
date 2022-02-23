<script lang="ts">
    export let name: string = "";
</script>

<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>
        <span>{name}</span>
        <slot />
    </label>
</div>