<script lang="ts">
    import Switch from "./Switch.svelte";
    import { allowScripts, areScriptsAllowed } from "./lib/scriptinterface";

    let scriptsAllowed = areScriptsAllowed();
    function scriptAllow() {
        scriptsAllowed = true;
        allowScripts();
    }
    
</script>

<div class='openwordle-settings-menu'>
    <h3>Game settings</h3>

    <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li on:click={scriptAllow}>
            Allow scripts
            <span style='margin-left:4px;transform:translateY(1px);display:inline-block'>
                <Switch checked={scriptsAllowed} disabled={scriptsAllowed} />
            </span>
        </li>
        <li style='margin-top:6px;font-size:9pt'>
            Warning: when allowing scripts,
            you will not be able to turn them
            back on without refreshing the tab!
        </li>
    </ul>
</div>

<style>
    .openwordle-settings-menu ul {
        padding-left: 0;
        text-align: left;
    }
    .openwordle-settings-menu li {
        list-style: none;
    }
</style>