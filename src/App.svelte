<script lang="ts">
    import Game from './Game.svelte';
    import Settings from './Settings.svelte';
    import Shield from './icon/Shield.svelte';

    import { areScriptsAllowed, addScriptAllowedHook } from './lib/scriptinterface';

    let currentInterface: 'game' | 'settings' = 'game';
    let scriptEnabled = areScriptsAllowed();
    addScriptAllowedHook(() => {
        scriptEnabled = true;
    })
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
        <a href='javascript:' on:click={() => {currentInterface = currentInterface == 'settings' ? 'game' : 'settings'}}>
            {currentInterface == 'settings' ? 'Go back' : 'Settings'}
        </a>
    </p>

    {#if currentInterface == 'game'}
        <Game />
    {/if}

    {#if currentInterface == 'settings'}
        <Settings />
    {/if}
</main>
