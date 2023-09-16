#! /usr/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to ABC Bank ATM!\n');
    await sleep();
    rainbowTitle.stop();
}
async function performATMOperations() {
    await sleep();
    const ATM_OP = await inquirer.prompt([
        {
            name: 'userid',
            type: 'input',
            message: 'Please Enter User ID:\n',
        },
        {
            name: 'PIN',
            type: 'number',
            message: 'Please Enter your PIN:\n',
        },
        {
            name: 'acc_type',
            type: 'list',
            message: 'Please select your account Type\n',
            choices: ['current', 'Saving'],
        },
        {
            name: 'trans_type',
            type: 'list',
            message: 'Please select transaction\n',
            choices: ['Fast cash', 'Cash Withdrawl', 'Balance Inquiry'],
        },
        {
            name: 'amount',
            type: 'list',
            message: 'Please select Amount\n',
            choices: [500, 1000, 2000, 5000, 10000, 20000],
            when(answers) {
                return answers.trans_type == 'Fast cash';
            },
        },
        {
            name: 'amount',
            type: 'number',
            message: 'Please Enter Amount\n',
            when(answers) {
                return answers.trans_type == 'Cash Withdrawl';
            },
        }
    ]);
    if (ATM_OP.trans_type != 'Balance Inquiry') {
        return performcalculations(ATM_OP.amount);
    }
    else {
        return showBalance();
    }
}
async function performcalculations(amount) {
    const spinner = createSpinner('Processing your Transaction...').start();
    await sleep();
    const balance = Math.floor(Math.random() * 100000);
    if (balance >= amount) {
        spinner.success({ text: `Please Collect Your Cash` });
        spinner.success({ text: `Your remaining account balance is ` + (balance - amount).toString() });
    }
    else {
        spinner.error({ text: `Your account balance is insufficent to perform this transaction` });
    }
}
async function showBalance() {
    const spinner = createSpinner('Processing your Transaction...').start();
    await sleep();
    const balance = Math.floor(Math.random() * 100000);
    spinner.success({ text: `Your account balance is ` + (balance).toString() });
}
console.clear();
welcome();
await sleep;
performATMOperations();
