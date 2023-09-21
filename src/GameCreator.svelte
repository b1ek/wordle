<script lang='ts'>
    import { onMount } from "svelte";
    import Modal from "./modal/Modal.svelte";
    import ModalButton from "./modal/ModalButton.svelte";
    import ModalContent from "./modal/ModalContent.svelte";
    import ModalFooter from "./modal/ModalFooter.svelte";
    import ModalTitle from "./modal/ModalTitle.svelte";
    import { V1 } from "./lib/cipher";

    import { toCanvas } from "qrcode";

    export let show = false;

    let word = '';
    let wordurl = '';
    let wordgend = false;
    let qrcanvas: HTMLCanvasElement;

    async function upd_qr(e: any) {

        if (!e.target.value.match(/^[a-z]+$/i)) {
            word = e.target.value.replace(/[^a-z]/gm, '');
        }
        
        if (word == '') {
            wordgend = false;
            return
        }
        if (!qrcanvas) return;
        wordurl = `${window.location.protocol}//${window.location.host}?challenge=${encodeURIComponent(btoa((await V1.encode(word)).join(';')))}`;
        toCanvas(qrcanvas, wordurl, {
            width: 200
        });
        wordgend = true;
    }

    async function copylink() {
        const copy = (await import('copy-to-clipboard')).default;
        copy(wordurl);
    }

</script>

{#if show}
    <Modal show>
        <ModalTitle>
            Create a game
        </ModalTitle>
        <ModalContent>
            <p>
                Word:
                <input type='text' bind:value={word} on:input={upd_qr}>
            </p>
            <p style={'min-height:160px;display:' + (wordgend ? 'inherit' : 'none')}>
                <span style='border-radius:12px;padding:20px;background:white;display:inline-block'>
                    <canvas bind:this={qrcanvas} width="200px" height="200px" style='border-radius:4px' />
                </span>
            </p>
        </ModalContent>
        <ModalFooter>
            <ModalButton style='width:50%;border-right:0;border-radius:0 0 0 16px' onclick={() => {show = false}}>
                Close
            </ModalButton>
            <ModalButton style='width:50%;border-radius:0 0 16px 0' onclick={copylink}>
                Copy link
            </ModalButton>
        </ModalFooter>
    </Modal>
{/if}