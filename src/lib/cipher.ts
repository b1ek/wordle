import { random } from "./random";

export async function sha256(data: string) {
    return await bufferToBase64(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data)));
}

export async function bufferToBase64(buffer: BufferSource) {
    const base64url: string = await new Promise(r => {
        const reader = new FileReader()
        // @ts-expect-error
        reader.onload = () => r(reader.result)
        reader.readAsDataURL(new Blob([buffer]))
    });

    return base64url.slice(base64url.indexOf(',') + 1);
}

export function base64ToArrayBuffer(base64: string) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export class AES256 {
    static async str2key(key: string): Promise<CryptoKey> {
        if (key.length > 32)
            throw new Error('Key must not be longer than 32 characters!');

        return crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(key.padEnd(32, '0')),
            'AES-CBC',
            true,
            [ 'encrypt', 'decrypt' ]
        );
    }

    static async encode(data: Uint8Array, secret: string): Promise<ArrayBuffer> {
        const key = await this.str2key(secret);
        return crypto.subtle.encrypt({ name: 'AES-CBC', iv: new Uint8Array(16).fill(0) }, key, data);
    }

    static async encodeStr(text: string, secret: string): Promise<ArrayBuffer> {
        return this.encode(new TextEncoder().encode(text), secret);
    }

    static async decode(data: ArrayBuffer, secret: string): Promise<ArrayBuffer> {
        const key = await this.str2key(secret);
        return crypto.subtle.decrypt({ name: 'AES-CBC', iv: new Uint8Array(16).fill(0) }, key, data);
    }

    static async decodeToStr(data: ArrayBuffer, secret: string): Promise<string> {
        return new TextDecoder().decode(await this.decode(data, secret));
    }
}

export class V1 {

    // sssshhh.. dont tell anyone :p
    static aes256secret = 'skater_girl';

    static async encode(word: string): Promise<object> {
        let scrambled = '';
        for (const letter of word) {
            scrambled += String.fromCharCode(random(32, 128)) + letter;
        }

        return [
            (await sha256(Math.random().toString())).substring(0, 6),
            await bufferToBase64(await AES256.encodeStr(scrambled, this.aes256secret))
        ]
    }

    static async decode(data: [string, string]): Promise<string> {
        const encrypted = base64ToArrayBuffer(data[1]);
        const scrambled = await AES256.decodeToStr(encrypted, this.aes256secret);
        let unscrambled = '';
        for (let i = 0; i != scrambled.length; i++) {
            if (i % 2 == 1) {
                unscrambled += scrambled[i];
            }
        }
        return unscrambled;
    }
}

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
