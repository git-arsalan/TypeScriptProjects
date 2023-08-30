#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
//import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

console.log(chalk.bgGreen('Pakistan Zindabad!!!'));

//let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

 async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Here is the calculator for you!\n');
  await sleep();
  rainbowTitle.stop();
  
  
     
}



  async function GetOperationAndOperand() {
  await sleep();
    const operator = await inquirer.prompt({
      name: 'operation',
      type: 'list',
      message: 'Which mathematical operation do you want to perform?\n',
      choices: [
        'Addition +',
        'Subtraction -',
        'Multiplication *',
        'Division /',
      ],
    });

    const firstnum = await inquirer.prompt({
        name: 'number1',
        type: 'number',
        message: 'Please enter first number:\n',
       
      });
    
      const secondnum = await inquirer.prompt({
        name: 'number2',
        type: 'number',
        message: 'Please enter second number:\n',
       
      });
  
    return PerformCalculation(operator.operation, firstnum.number1, secondnum.number2);
  }


  async function PerformCalculation(chioce:string, number1:number , number2:number) 
  {
    const spinner = createSpinner('performing calculation...').start();
  await sleep();
    //await sleep();
    switch(chioce)
    {
      case 'Addition +':
        spinner.success({ text: `Your answer is ${number1 + number2}.` });
        break;
      case 'Subtraction -':
          spinner.success({ text: `Your answer is ${number1 - number2}.` });
          break;
      case 'Multiplication *':
            spinner.success({ text: `Your answer is ${number1 * number2}.` });
            break;
      case 'Division /':
              spinner.success({ text: `Your answer is ${number1 / number2}.` });
              break;            
        default:
          console.log('You have selected an unimplemented operation');
          break;

    }

    
  }


  console.clear();
  welcome();
  await sleep;
  GetOperationAndOperand();

  


