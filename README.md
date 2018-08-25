# XOzinho

XOzinho is a bot experiment from the [Crossover](https://crossover.com) people from Brazil with the intent to be used in our Skype channel.

## How to debug it locally

Clone the project and start the bot server with:

```
cd messages
NODE_ENV=development node index.js
```

Download the [BotFramework-Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases) then open the XOzinho.bot file in the emulator and you should be ready to go.

## Build a new function

Create a new module with your new bot function, require it in the index.js file, add the desired condition the bot should match then call your function.

Open a new PR with your new module and wait it to be merged.

Your new function should be up in a few minutes. Have fun!
