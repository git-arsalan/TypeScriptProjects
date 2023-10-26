#! /usr/bin/env node
import chalkAnimation from 'chalk-animation';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to General Knowledge Quiz!\n');
    await sleep();
    rainbowTitle.stop();
}
welcome();
