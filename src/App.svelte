<script lang="ts">
    import Game from './Game.svelte'
</script>

<main style='width:fit-content;margin:0 auto;text-align:center'>
    <h1>blek! Wordle</h1>
    <p>
        FOSS wordle game that runs in your browser!<br/>
        <a href='https://git.blek.codes/blek/wordle'>
            Source Code
        </a>
    </p>
    <div class='game-main'>
        <Game />
    </div>
</main>
