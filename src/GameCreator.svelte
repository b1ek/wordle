<script lang='ts'>
    import { onMount } from "svelte";
    import Modal from "./modal/Modal.svelte";
    import ModalButton from "./modal/ModalButton.svelte";
    import ModalContent from "./modal/ModalContent.svelte";
    import ModalFooter from "./modal/ModalFooter.svelte";
    import ModalTitle from "./modal/ModalTitle.svelte";
    import { encode } from "./lib/cipher";
    import { getRandom } from "./targets";

    export let show = false;

    let word = getRandom(5);
    let qrurl: string | false = false;
    let wordurl = '';
    let qrcanvas: HTMLCanvasElement;

    async function upd_qr() {
        if (word == '') return;
        if (!qrcanvas) return;
        wordurl = `${window.location.protocol}//${window.location.host}?challenge=${encodeURIComponent(btoa(encode(word)))}`;
        const QrCreator = (await import('qr-creator')).default;
        
        QrCreator.render({
            text: wordurl,
            radius: 0.5,
            ecLevel: 'L',
            fill: '#000000',
            background: '#ffffff',
            size: 120
        }, qrcanvas);
    }

    async function copylink() {
        const copy = (await import('copy-to-clipboard')).default;
        copy(wordurl);
    }

    onMount(async () => {
        await upd_qr();
    })
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
            <p style='min-height:160px'>
                <span style='border-radius:12px;padding:20px;background:white;display:inline-block'>
                    <canvas bind:this={qrcanvas} width="120px" height="122px" style='border-radius:4px' />
                </span>
            </p>
        </ModalContent>
        <ModalFooter>
            <ModalButton style='width:50%;border-right:0;border-radius:0 0 0 16px' onclick={() => {show = false; word = getRandom(5); upd_qr()}}>
                Close
            </ModalButton>
            <ModalButton style='width:50%;border-radius:0 0 16px 0' onclick={copylink}>
                Copy link
            </ModalButton>
        </ModalFooter>
    </Modal>
{/if}