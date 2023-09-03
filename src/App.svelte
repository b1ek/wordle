<script lang="ts">
    import Game from './Game.svelte';
    import Shield from './icon/Shield.svelte';

    import { areScriptsAllowed } from './lib/scriptinterface';
</script>

<main>
    <h1>blek! Wordle</h1>
    {#if areScriptsAllowed()}
        <p style="color:coral">
            <Shield height='13pt' />
            Scripts are allowed. The game may not be fair-played
        </p>
    {/if}
    <p>
        FOSS wordle game that runs in your browser!<br/>
        <a href='https://git.blek.codes/blek/wordle'>
            Source Code
        </a>
    </p>
    <Game />
</main>
