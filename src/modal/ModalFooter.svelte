<div class='openwordle-modal-footer'>
    <slot />
</div>

<style>
    .openwordle-modal-footer {
        background: #151515;
        border-top: 1px solid #202020;
        border-radius: 0 0 16px 16px;
    }
    @media (prefers-color-scheme: light)  {
        .openwordle-modal-footer {
            background: #e1e1e1;
            border-top-color: #c0c0c0;
        }
    }
</style>