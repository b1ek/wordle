/// <reference types="svelte" />
/// <reference types="vite/client" />

import type { ScriptInterface } from "./lib/scriptinterface";

declare module 'qr-creator';

declare global {
    var ScriptInterface: ScriptInterface;
    var TARGETS: string;
}
