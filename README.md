
<h1>
    blek! Wordle
    <img src="https://jenkins.blek.codes/job/bWordle/badge/icon?style=plastic"></img>
</h1>
blek! Wordle is a completely open source and lightweight wordle game with very minimal set of runtime dependencies

<a href='https://wordle.blek.codes'>Play online</a>

## Features

### 1. Scripting!

You can use custom scripts to have fun with wordle!
Script interface is exposed via `globalThis.ScriptInterface`.

In order for scripts to run, the user must enable them by
clicking on the "Enable scripts" button in the settings.

After enabling scripts, all the game data would be available
to the script. To expose cheaters, a warning text would appear near the header:
"Scripts are allowed. The game may not be fair-played"

To run the scripts, I recommend using [Tampermoney](https://www.tampermonkey.net).  
Using the developer console is a fine option too.

### 2. Extremely lightweight

The whole app is \~ 100kb bundled, which is pretty impressive IMHO.

The only 2 libraries are included via `await import`, and most of the
weight is the bundled-in dictionary of ~7k words

### 3. FOSS

So far, I haven't found a wordle game that is FOSS. This is the one

### 4. Customizable

There is no scoped CSS which allows good space for customization.
