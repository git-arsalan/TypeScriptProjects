#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

 async function welcome() 
 {
  const rainbowTitle = chalkAnimation.rainbow('Word and Character Counter!\n');
  await sleep();
  rainbowTitle.stop();
      
}

async function GetSentencefromInquirer()
{
  // taking input sentence using inquirer
  await sleep();
  const input :{sentence:string} = await inquirer.prompt({
      name: 'sentence',
      type: 'input',
      message: 'Please Type a sentence to count its word and Characters:\n',
     
    });

    return CountWordandChars(input.sentence);


}

async function CountWordandChars(sentence:string) 
{
  let words:string[] = sentence.trim().split(' ');
  let charCount:number = 0;

  for (var word of words) 
    charCount += word.length;

    const spinner = createSpinner('Calculating word and Characters in your sentence...').start();
    await sleep();
    
    spinner.success({ text: `Your Sentence contains ` + words.length + ` words`});
    spinner.success({ text: `Your Sentence contains ` + charCount + ` characters`});
   
 


}

console.clear();
 welcome();
 await sleep;
 GetSentencefromInquirer();

