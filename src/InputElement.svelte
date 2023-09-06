<script lang='ts'>
    export let letter = ' ';
    export let status: 'unfit' | 'yellow' | 'green' | 'input' | 'standby' = 'input';
</script>

<span class={'wordle-input-element ' + `input-status-${status}`}>
    <span style='transform:translateY(-25%);display:block'>
        {letter}
    </span>
</span>

<style>
    .wordle-input-element {
        line-height: 84px;
        width: 48px;
        height: 48px;
        display: inline-block;
        margin: 3px;
        border: 2px solid #3d4054;
        border-radius: 4px;
        user-select: none;
        box-shadow: 0 0 1px #00000020;
        background: #3d4054;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20pt;
        transition: 350ms ease;
    }
    @media (max-width: 667px) {
        .wordle-input-element {
            width: 38px;
            height: 38px;
            line-height: 74px;
            font-size: 12pt;
        }
    }
    .input-status-input {
        background: #8284a220;
        border-color: #8284a220;
    }
    .input-status-standby {
        background: #3d405420;
        border-color: #3d405415;
    }
    .input-status-yellow {
        background: #f3c237;
        border-color: #f3c237;
    }
    .input-status-green {
        background: #76b676;
        border-color: #76b676;
    }
    @media (prefers-color-scheme: light) {
        .wordle-input-element {
            color: white
        }
        .input-status-input {
            background: #f1f6f6;
            color: black;
            border-color: #e6efef;
        }
        .input-status-standby {
            background: #919191;
        }
        .input-status-unfit {
            background: #b2b4c2;
            border-color: #b2b4c2 !important;
        }
    }
</style>