import { random } from "./random";
import { encode, decode } from "./cipher";

let scriptsAllowed = false;

export function allowScripts() {
    scriptsAllowed = true;
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
}

export class WordleLibrary {
    readonly random = random;
    readonly encode = encode;
    readonly decode = decode;
}

export class ScriptInterface {
    readonly gameState: GameState           = new GameState();
    scriptsAllowed: {(): boolean}           = () => scriptsAllowed;
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
