#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
const sleep = (ms = 5000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to Basic Computer Science Quiz!\n');
    await sleep();
    rainbowTitle.stop();
}
let apiUrl = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple&encode=base64";
// function for fetching quiz data from API
let fetchData = async (dataUrl) => {
    let Quiz = await fetch(dataUrl);
    let res = await Quiz.json();
    return res.results;
};
let apiRes = await fetchData(apiUrl);
let startQuiz = async () => {
    let score = 0;
    const stud_Name = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Please Enter Student Name:\n'
    });
    for (let i = 0; i < 5; i++) {
        let answers = [...apiRes[i].incorrect_answers, apiRes[i].correct_answer];
        let quiz = await inquirer.prompt({
            name: 'quest',
            type: 'list',
            message: atob(apiRes[i].question),
            choices: answers.map((val) => atob(val))
        });
        if (quiz.quest === atob(apiRes[i].correct_answer)) {
            console.log(chalk.bold.blue('Correct'));
            score++;
        }
        else {
            console.log(chalk.bold.red(`The Correct answer is ${chalk.bold.red(atob(apiRes[i].correct_answer))}`));
        }
    }
    console.log(`${stud_Name.name} Your score is ${score} out of 5`);
};
console.clear();
await welcome();
startQuiz();
//console.log(apiRes);
//startQuiz();
//
