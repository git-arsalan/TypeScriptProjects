#! /usr/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to Currency Exchange!\n');
    await sleep();
    rainbowTitle.stop();
}
let obj_conversion = // creating currency converter object to handle currency rates
 {
    "PKR": {
        "USD": 0.0034,
        "EUR": 0.0033,
        "PKR": 1
    },
    "EUR": {
        "USD": 1.06,
        "EUR": 1,
        "PKR": 306.60
    },
    "USD": {
        "USD": 1,
        "EUR": 0.95,
        "PKR": 290
    }
};
async function GetUserInputs() {
    await sleep();
    const userinput = await inquirer.prompt([
        {
            name: 'from',
            type: 'list',
            message: 'Please select base currency:\n',
            choices: ["PKR", "EUR", "USD"]
        },
        {
            name: 'to',
            type: 'list',
            message: 'Please select conversion currency:\n',
            choices: ["PKR", "EUR", "USD"]
        },
        {
            name: 'amount',
            type: 'number',
            message: 'Please Enter conversion Amount:\n',
        }
    ]);
    const { from, to, amount } = userinput;
    return PerformConversion(userinput.from, userinput.to, amount);
}
async function PerformConversion(fromcurr, toCurr, amount) {
    try {
        const spinner = createSpinner('verifying your answer...').start();
        if (fromcurr && toCurr && amount) {
            let res = obj_conversion[fromcurr][toCurr] * amount;
            spinner.success({ text: `your conversion from ${fromcurr} to ${toCurr} is : ${res}` });
        }
        else {
            spinner.error({ text: `Invalid Input received!!!` });
        }
    }
    catch (Exception) {
        console.log("Exception occurred:");
    }
}
// Calling functions
console.clear();
welcome();
await sleep;
GetUserInputs();
