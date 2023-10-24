#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to Adventure Fight!\n');
    await sleep();
    rainbowTitle.stop();
}
// creating Player Class
class Player {
    // creating constructor method
    constructor(name) {
        this.fuel = 100; // member variable as fuel and assign initial value = 100
        this.name = name;
    }
    IncreaseFuel() {
        this.fuel += 25;
    }
    DecreaseFuel() {
        this.fuel -= 25;
    }
}
// Now Creating opponent class
class opponent {
    // creating constructor method
    constructor(name) {
        this.fuel = 100; // member variable as fuel and assign initial value = 100
        this.name = name;
    }
    IncreaseFuel() {
        this.fuel += 25;
    }
    DecreaseFuel() {
        this.fuel -= 25;
    }
}
function GetRandom() {
    let num = Math.floor(Math.random() * 2);
    return num;
}
// function to start Game
async function startGame() {
    try {
        const GamePlay = await inquirer.prompt([
            {
                name: 'player1',
                type: 'input',
                message: 'Please Enter Player Name:\n',
            },
            {
                name: 'opp_type',
                type: 'list',
                message: 'Please select your Opponent\n',
                choices: ['Warrior', 'Commando', "Captain"],
            }
            /* {
              name: 'trans_type',
              type: 'list',
              message: 'Please select transaction\n',
              choices: ['Fast cash','Cash Withdrawl', 'Balance Inquiry'],
            },
      
            {
              name: 'amount',
              type: 'list',
              message: 'Please select Amount\n',
              choices: [500,1000,2000,5000,10000,20000],
              when(answers)
              {
                  return answers.trans_type == 'Fast cash'
              },
            },
      
            {
              name: 'amount',
              type: 'number',
              message: 'Please Enter Amount\n',
              when(answers)
              {
                  return answers.trans_type == 'Cash Withdrawl'
              },
            } */
        ]);
        const spinner = createSpinner('Loading Adventure Fight...').start();
        await sleep();
        let player1 = new Player(GamePlay.player1);
        let opp = new opponent(GamePlay.opp_type);
        spinner.success({ text: chalk.bold.green(player1.name) + ` VS ` + chalk.bold.red(opp.name) });
        do {
            const action = await inquirer.prompt({
                name: 'action_type',
                type: 'list',
                message: 'Perform Action\n',
                choices: ['Attack', 'Energy Drink', 'Quit']
            });
            //  await sleep();
            playGame(player1, opp, action.action_type);
            if (player1.fuel <= 0) {
                console.log(chalk.red(player1.name + ' loose!'));
                process.exit();
            }
            else if (opp.fuel <= 0) {
                console.log(chalk.green(player1.name + ' Wins!'));
                process.exit();
            }
        } while (true);
    }
    catch (Exception) {
    }
}
async function playGame(player, opponent, action) {
    // console.log(action);
    if (action == 'Attack') {
        if (GetRandom() == 0) {
            player.DecreaseFuel();
            console.log(chalk.red(player.name + ' fuel is ' + player.fuel));
            console.log(chalk.green(opponent.name + ' fuel is ' + opponent.fuel));
        }
        else {
            opponent.DecreaseFuel();
            console.log(chalk.green(player.name + ' fuel is ' + player.fuel));
            console.log(chalk.red(opponent.name + ' fuel is ' + opponent.fuel));
        }
    }
    else if (action == 'Energy Drink') {
        if (GetRandom() == 0) {
            player.IncreaseFuel();
            console.log(chalk.red(player.name + ' fuel is ' + player.fuel));
            console.log(chalk.green(opponent.name + ' fuel is ' + opponent.fuel));
        }
        else {
            opponent.IncreaseFuel();
            console.log(chalk.red(player.name + ' fuel is ' + player.fuel));
            console.log(chalk.green(opponent.name + ' fuel is ' + opponent.fuel));
        }
    }
    else {
        console.log(chalk.red(player.name + ' Quits!'));
        process.exit();
    }
}
// calling Welcome Function
console.clear();
welcome();
await sleep();
startGame();
