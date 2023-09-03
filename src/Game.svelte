<script lang='ts'>
    import InputElement from "./InputElement.svelte";
    import Modal from "./modal/Modal.svelte";
    import ModalTitle from "./modal/ModalTitle.svelte";
    import ModalContent from "./modal/ModalContent.svelte";
    import ModalFooter from "./modal/ModalFooter.svelte";
    import ModalButton from "./modal/ModalButton.svelte";
    import { getForNWord } from './targets';
    import { random } from "./lib/random";
    import { isIn, loadDict } from "./dictionary";
    import { onMount } from "svelte";
    import Keyboard from "./Keyboard.svelte";
    import GameCreator from "./GameCreator.svelte";
    import { decode } from "./lib/cipher";
    import { GameState, updateScriptInterface } from "./lib/scriptinterface";

    let targets = getForNWord(5);

    let word = targets[random(0, targets.length)];
    let guesses = 6;
    let guessed: string[][] = [];
    let current_guess = 0;
    let word_position = 0;
    let wins = false;
    let endgame = false;
    
    setTimeout(() => {
        setGameState({
            word,
            guesses,
            guessed,
            current_guess,
            word_position,
            wins,
            endgame
        });
    }, 500)

    function setGameState(state: GameState) {
        word = state.word ?? word;
        guesses = state.guesses ?? guesses;
        guessed = state.guessed ?? guessed;
        current_guess = state.current_guess ?? current_guess;
        word_position = state.word_position ?? word_position;
        wins = state.wins ?? wins;
        endgame = state.endgame ?? endgame;

        updateScriptInterface(state);
    }

    let loading = true;
    let not_a_word = false;
    let game_creator = false;

    let green_letters: string[] = [];
    let yellow_letters: string[] = [];
    let unfit_letters: string[] = [];

    (
        function() {
            const urlprops = new URLSearchParams(window.location.search);
            const challenge = urlprops.get('challenge');
            if (challenge !== null) {
                word = decode(atob(decodeURIComponent(challenge)));
                console.log(word)
            }
        }
    )()

    onMount(async () => {
        await loadDict();
        loading = false;
    });

    function current_word() {
        return guessed[current_guess].join('');
    }

    function is_win() {
        return current_word() == word;
    }
    
    for (let i = 0; i != guesses; i++) {
        guessed.push(new Array(word.length).fill(''));
    }

    document.onkeydown = e => {
        if (endgame) return;
        if (not_a_word) return;

        if (e.key == 'Backspace') {
            if (word_position == 0) return;
            guessed[current_guess][word_position - 1] = '';
            word_position -= 1;
        }
        if (e.key == 'Enter') {
            if (word_position != word.length) return;
            if (!isIn(current_word())) {
                not_a_word = true;
                setTimeout(() => {not_a_word = false}, 1000);
                return
            }

            if (current_guess + 1 == guesses) {
                endgame = true;
                wins = is_win();
                green_letters = word.split('');
                current_guess++;
                return;
            }
            if (is_win()) {
                endgame = true;
                wins = true;
                green_letters = word.split('');
                current_guess++;
                return
            }

            let c_word = current_word();
            for (const ii in c_word.split('')) {
                const i = parseInt(ii);
                const letter = c_word[i];

                if (word.indexOf(letter) !== -1) {
                    if (word[i] == letter) {
                        if (green_letters.indexOf(letter) === -1)
                            green_letters.push(letter);
                    } else {
                        if (yellow_letters.indexOf(letter) === -1)
                            yellow_letters.push(letter);
                    }
                } else {
                    unfit_letters.push(letter);
                }
                green_letters = green_letters;
                yellow_letters = yellow_letters;
                unfit_letters = unfit_letters;
            }

            word_position = 0;
            current_guess++;
        }
        if (e.key.length == 1) {
            if (e.ctrlKey || e.shiftKey || e.altKey) return;
            if (e.key.match(/[a-zA-Z]/i) === null) return;
            if (word_position == word.length) return;
            guessed[current_guess][word_position] = e.key;
            word_position += 1;
        }
    }

    function reset_game() {
        word = targets[Math.floor(Math.random() * targets.length)];
        guesses = 6;
        guessed = [];
        for (let i = 0; i != guesses; i++) {
            guessed.push(new Array(word.length).fill(''));
        }
        current_guess = 0;
        word_position = 0;
        wins = false;
        endgame = false;

        green_letters = [];
        yellow_letters = [];
        unfit_letters = [];
    }
</script>

<GameCreator bind:show={game_creator} />

{#if not_a_word}
    <Modal show animate={false}>
        <ModalTitle>
            Error
        </ModalTitle>
        <ModalContent>
            {current_word()} is not a word!
        </ModalContent>
    </Modal>
{/if}

{#if loading}
    <Modal show>
        <ModalTitle>
            Please wait...
        </ModalTitle>
        <ModalContent>
            Loading dictionary
        </ModalContent>
    </Modal>
{/if}

{#if endgame}
    <Modal show={true}>
        <ModalTitle>
            You {wins ? 'won' : 'lost'}!
        </ModalTitle>
        <ModalContent>
            The word was:
            <h3>{word.toUpperCase()}</h3>
            Guesses: {current_guess} / {guesses}
        </ModalContent>
        <ModalFooter>
            <ModalButton style='border-right:0;border-left:0' onclick={reset_game}>
                New game
            </ModalButton>
        </ModalFooter>
    </Modal>
{/if}

<button on:click={() => {endgame = true}}>
    Give up
</button>

<button on:click={() => {game_creator = true}}>
    Create a game
</button>

<p style='line-height:0;margin-top:48px'>
    {#each guessed as g1, i}
        {#each g1 as letter, ii}
            {#if i == current_guess}
                <InputElement {letter} status={wins ? 'standby' : 'input'} />
            {:else}
                {#if i < current_guess}
                    <!-- This guess is before the current guess, so we can paint letters in colors -->
                    <InputElement {letter} status={word.indexOf(letter) === -1 ? 'unfit' : word[ii] == letter ? 'green' : 'yellow'} />
                {:else}
                    <InputElement {letter} status='standby' />
                {/if}
            {/if}
        {/each}
        <br/>
    {/each}
</p>

<Keyboard
    {green_letters}
    {yellow_letters}
    {unfit_letters} />