<script lang="ts">
    export let show = false;
    export let animate = true;
</script>

{#if show}
<div class={'openwordle-modal-backdrop' + (animate ? '' : ' no-anim')} />
{/if}

<div class={'openwordle-modal' + (show ? ' show' : '') + (animate ? '' : ' no-anim')}>
    <slot />
</div>

<style>
    @keyframes openwordle-modal-appear {
        0% {
            opacity: 0;
            transform: translate(-50%, -30%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    .openwordle-modal {
        position: fixed;
        top: 130%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #101010;
        border-radius: 16px;
        border: 1px solid #404040;
        color: white;
        min-width: 300px;
        z-index: 1;
        transition: 1250ms ease;

        animation: openwordle-modal-appear 1s ease;
    }
    .openwordle-modal.show {
        top: 30%;
    }
    @keyframes openwordle-modal-backdrop-fade-in {
        0% {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .openwordle-modal-backdrop {
        background: radial-gradient(#00000010, #00000020);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;

        animation: openwordle-modal-backdrop-fade-in 250ms ease;
    }

    @media (prefers-color-scheme: light) {
        .openwordle-modal-backdrop {
            background: radial-gradient(#00000010 50%, #00000060);
        }
        .openwordle-modal {
            background: #e1e1e1;
            color: black;
            border-color: #c0c0c0;
        }
    }
</style>