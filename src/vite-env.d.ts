/// <reference types="svelte" />
/// <reference types="vite/client" />

import type { ScriptInterface } from "./lib/scriptinterface";

const TARGETS: string;
declare module 'qr-creator';

declare global {
    var ScriptInterface: ScriptInterface;
}
