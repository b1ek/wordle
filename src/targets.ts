import { random } from "./lib/random";

const targets = TARGETS.split(',');

export function getForNWord(len: number) {
    let out = [];
    for (const target of targets) {
        if (target.length != len) continue;
        out.push(target);
    }
    return out
}

export default targets