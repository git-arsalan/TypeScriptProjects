#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
//import gradient from 'gradient-string';
//import chalkAnimation from 'chalk-animation';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

 async function welcome() 
 {
  const rainbowTitle = chalkAnimation.rainbow('Here is the number guessing game for you!\n');
  await sleep();
  rainbowTitle.stop();
      
}





const sysGenNo = Math.floor(Math.random() * 10);

async function GetUserGuess()
{
    await sleep();
    const userGuess = await inquirer.prompt({
        name: 'guess',
        type: 'number',
        message: 'Try to Guess a number between 1 to 10, which I guess:\n',
       
      });

      return MatchGuess(sysGenNo, userGuess.guess)
}

async function MatchGuess(sysGen:number, userGuess:number ) 
{
  const spinner = createSpinner('verifying your answer...').start();
    await sleep();
    if (sysGen == userGuess)
    {
        spinner.success({ text: `Congratulations! You have guessed correctly` });
    }
    else
    {
        spinner.error({ text: `oh Sorry! you have guessed a wrong number` });

    }

}

console.clear();
welcome();
await sleep;
GetUserGuess();
//createSpinner.call()





