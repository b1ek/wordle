#!/usr/bin/env python3

import random

r = random.SystemRandom()

data = [];

with open('targets.csv') as f:
    data = f.read().split(',')

sorteds = []
out = '';

size = 0;

for word in data:
    # if size == 999: break
    if r.randint(0, 16) == 1:
        out += ',' + word
        size += 1

print(size)

with open('targets.csv.1k', 'w+') as f:
    f.write(out[1:])
