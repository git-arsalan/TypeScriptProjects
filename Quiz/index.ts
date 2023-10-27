#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const sleep = (ms = 5000) => new Promise((r) => setTimeout(r, ms));

 async function welcome() 
 {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to General Knowledge Quiz!\n');
  await sleep();
  rainbowTitle.stop();
      
}



let apiUrl = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple&encode=base64";


// function for fetching quiz data from API



let fetchData = async (dataUrl:string) => 
{
  let Quiz:any = await fetch(dataUrl);
  let res = await Quiz.json();
  return res.results;
    
}

let apiRes = await fetchData(apiUrl);



let startQuiz = async () => 
{
  let score = 0;
  const stud_Name = await inquirer.prompt(
        {
          name: 'name',
          type: 'input',
          message: 'Please Enter Student Name:\n'
        });
    
   for (let i = 0; i<5 ;i++)
   {
      let answers = [...apiRes[i].incorrect_answers, apiRes[i].correct_answer];

      let quiz = await inquirer.prompt(
        {
          name: 'quest',
          type: 'list',
          message: atob(apiRes[i].question),
          choices: answers.map((val:any)=> atob(val))
        });

        if (quiz.quest === atob(apiRes[i].correct_answer))
        {
          score++;
        }
   }

   console.log(score);
}


console.clear();
await welcome();
startQuiz();
//console.log(apiRes);
//startQuiz();




//

