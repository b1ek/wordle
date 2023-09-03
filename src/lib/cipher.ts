import { random } from "./random";

export function encode(word: string) {
    let out = '';
    for (const letter of word) {
        out += String.fromCharCode(random(32, 128)) + letter;
    }
    return out
}

export function decode(ciphertext: string) {
    let out = '';
    for (let i = 0; i != ciphertext.length; i++) {
        if (i % 2 == 1) {
            out += ciphertext[i];
        }
    }
    return out;
}

globalThis.encode = encode;
globalThis.decode = decode;