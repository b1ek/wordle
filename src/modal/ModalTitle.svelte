<div class='openwordle-modal-title'>
    <slot />
</div>

<style>
    .openwordle-modal-title {
        background: #151515;
        padding: 16px 40px;
        font-size: 16pt;
        font-weight: 600;
        border-bottom: 1px solid #202020;
        box-shadow: 0 0 1px #30303010;
        border-radius: 16px 16px 0 0;
    }
    @media (prefers-color-scheme: light)  {
        .openwordle-modal-title {
            background: #e1e1e1;
            border-bottom-color: #c0c0c0;
        }
    }
</style>