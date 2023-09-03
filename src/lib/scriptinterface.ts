import { random } from "./random";
import { encode, decode } from "./cipher";

let allowHooks: {(): void}[] = [];

export function addScriptAllowedHook(hook: {(): void}) {
    allowHooks.push(hook)
}

let scriptsAllowed = false;

export function allowScripts() {
    if (scriptsAllowed) return;

    console.warn('Scripts are now allowed');

    scriptsAllowed = true;
    for (const hook of allowHooks) {
        hook();
    }
}

export function areScriptsAllowed() {
    return scriptsAllowed == true;
}

export class GameState {
    word?:              string;
    guesses?:           number;
    guessed?:           string[][];
    current_guess?:     number;
    word_position?:     number;
    wins?:              boolean;
    endgame?:           boolean;
    green_letters?:     string[];
    yellow_letters?:    string[];
    unfit_letters?:     string[];
    set_current_word?:  {(word: string): void};
    submit_guess?:      {(): void};
}

export class WordleLibrary {
    readonly random = random;
    readonly encode = encode;
    readonly decode = decode;
}

export class ScriptInterface {
    readonly gameState: GameState           = new GameState();
    readonly scriptsAllowed: {(): boolean}  = areScriptsAllowed;
    readonly lib: WordleLibrary             = new WordleLibrary();
}
globalThis.ScriptInterface = new ScriptInterface();
const si = globalThis.ScriptInterface;

export function updateScriptInterface(state: GameState) {
    if (!scriptsAllowed)
        return

    for (const key of Object.keys(state)) {
        // @ts-ignore
        si.gameState[key] = state[key];
    }
}

