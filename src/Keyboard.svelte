<script lang='ts'>
    import Backspace from "./icon/Backspace.svelte";

    const keyboard = [
        'QWERTYUIOP'.split(''),
        'ASDFGHJKL'.split(''),
        ['Backspace', ...'ZXCVBNM'.split(''), 'Enter']
    ]

    export let green_letters: string[] = [];
    export let yellow_letters: string[] = [];
    export let unfit_letters: string[] = [];
</script>

<div class='openwordle-keyboard'>
    {#each keyboard as line}
        <div class="openwordle-keyboard-line">
            {#each line as key}
                <button
                    class={'openwordle-keyboard-btn' + (green_letters.indexOf(key.toLowerCase()) !== -1 ? ' kb-btn-green' : yellow_letters.indexOf(key.toLowerCase()) !== -1 ? ' kb-btn-yellow' : unfit_letters.indexOf(key.toLowerCase()) !== -1 ? ' kb-btn-unfit' : '') }
                    on:click={() => {
                        document.dispatchEvent(new KeyboardEvent('keydown', { key: key.length == 1 ? key.toLowerCase() : key }))
                    }}>
                    {#if key == 'Backspace'}
                        <Backspace height='16pt' width='60px' />
                    {:else}
                        {key}
                    {/if}
                </button>
            {/each}
        </div>
    {/each}
</div>

<style>
    .openwordle-keyboard .openwordle-keyboard-btn {
        padding: 12px 16px;
        border-radius: 3px;
        margin: 3px;
        background: #666686;
        font-size: 14pt;
        font-weight: 700;
        border: 0;
        width: 100%;
    }
    .openwordle-keyboard .openwordle-keyboard-btn:hover {
        background: #8686a6;
    }
    .openwordle-keyboard .openwordle-keyboard-btn:active {
        background: #565676;
    }
    .openwordle-keyboard .openwordle-keyboard-line {
        display: flex;
        justify-content: space-between;
        width: 600px;
        height: 56px;
    }
    @media (max-width: 667px) {
        .openwordle-keyboard .openwordle-keyboard-line {
            width: 96vw;
            height: 40px;
        }
        .openwordle-keyboard .openwordle-keyboard-btn  {
            font-size: 10pt;
            padding: 0 4px;
        }
    }
    .kb-btn-unfit {
        background: #444454 !important;
    }
    .kb-btn-unfit:hover {
        background: #555565 !important;
    }
    .kb-btn-unfit:active {
        background: #404050;
    }

    .kb-btn-green {
        background: #66a666 !important;
    }
    .kb-btn-green:hover {
        background: #76b676 !important;
    }
    .kb-btn-green:active {
        background: #469646 !important;
    }

    .kb-btn-yellow {
        background: #c6a666 !important;
    }
    .kb-btn-yellow:hover {
        background: #d6b676 !important;
    }
    .kb-btn-yellow:active {
        background: #b69656 !important;
    }


    @media (prefers-color-scheme: light) {
        .openwordle-keyboard .openwordle-keyboard-btn {
            background: #e1e1e1;
        }
        .openwordle-keyboard .openwordle-keyboard-btn:hover {
            background: #d1d1d1;
        }
        .kb-btn-unfit           { background: #d1d1d1 !important; }
        .kb-btn-unfit:hover     { background: #dadada !important; }
        .kb-btn-unfit:active    { background: #c1c1c1 !important; }

        .
    }
    
</style>