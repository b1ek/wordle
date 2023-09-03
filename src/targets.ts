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

export function getRandom(len: number | null = null) {
    const dataset = len ? getForNWord(len) : targets;
    for (const target of dataset) {
        if (random(0, Math.floor(dataset.length * 0.5)) == 0) {
            return target;
        }
    }
    return dataset[0];
}

export default targets