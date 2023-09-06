<script>
    export let style = '';
    export let onclick = () => {}
</script>

<button class='openwordle-modal-button' {style} on:click={onclick}>
    <slot />
</button>

<style>
    .openwordle-modal-button {
        width: 100%;
        outline: none;
        padding: 16px;
        padding-bottom: 20px;
        border: 0;
        background: #151515;
        font-size: 14pt;
        font-weight: 300;
        float: left;
        border-right: 1px solid #202020;
        border-left: 1px solid #202020;
        border-radius: 0 0 16px 16px;

        transition: 250ms ease;
    }
    .openwordle-modal-button:hover {
        background: #171717;
    }
    .openwordle-modal-button:active {
        background: #121212;
    }

    @media (prefers-color-scheme: light) {
        .openwordle-modal-button {
            background: #e1e1e1;
            border-color: #f1f1f1
        }
        .openwordle-modal-button:hover { background: #dbdbdb }
        .openwordle-modal-button:active { background: #d6d6d6 }
    }
</style>