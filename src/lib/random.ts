export const random = (min = 0, max = 2**32)=> min + Math.floor((crypto.getRandomValues(new Uint32Array(1))[0]/2**32) * max);