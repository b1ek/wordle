let dict: string[] = [];
let dict_loaded = false;

export async function loadDict(onprogress?: {(data: { loaded: number, total: number }): void}) {
    const req = await fetch('/dictionary.csv', {
        cache: 'force-cache'
    });
    const data = await req.text();
    const total = parseInt(req.headers.get('content-length') ?? '-1', 10);
    let loaded = 0;

    const res = new Response(new ReadableStream({
        async start(controller) {
            if (!req.body) {
                throw new Error('Request body not available');
            }
            const reader = req.body.getReader();
            for (;;) {
                const { done, value } = await reader.read();
                if (done) break;
                loaded += 1;
                if (onprogress) onprogress({ loaded, total });
            }
        }
    }))
    dict = data.split(',');
    dict_loaded = true;
}

export function dictLoaded() {
    return dict_loaded == true;
}

export function isIn(word: string) {
    return dict.indexOf(word) !== -1;
}

export default dict;