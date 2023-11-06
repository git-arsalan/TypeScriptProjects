#! /usr/bin/env node
import { faker } from "@faker-js/faker/locale/af_ZA";
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to ABC Bank !\n');
    await sleep();
    rainbowTitle.stop();
}
// creating customer class
class customer {
    constructor(FirstName, LastName, Age, Gender, MobileNum, AccNum) {
        this.firstname = FirstName;
        this.lastname = LastName;
        this.age = Age;
        this.gender = Gender;
        this.mobileNum = MobileNum;
        this.accNum = AccNum;
    }
}
// creating bank class
class Bank {
    constructor() {
        this.customers = []; // variable for customers in bank
        this.accounts = [];
    }
    addCustomers(objCust) {
        this.customers.push(objCust);
    }
    addAccounts(objAcc) {
        this.accounts.push(objAcc);
    }
    performTransaction(accObj) {
        let old_acc = this.accounts.filter(acc => acc.accNum != accObj.accNum);
        this.accounts = [...old_acc, accObj];
    }
}
let AbcBank = new Bank();
let cust1 = new customer("AKhtar", "Niazi", 25, "Male", "03331234567", 123456789);
let cust2 = new customer("Shama", "Noreen", 30, "Female", "0334-1234567", 987654321);
//console.log(AbcBank);
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//console.log(cust1);
//console.log(cust2);
for (let i = 1; i <= 3; i++) // Loop for adding customer and accounts in bank
 {
    let fname = faker.person.firstName("male");
    let lname = faker.person.lastName("male");
    let pnum = faker.phone.number("3##########");
    const cust = new customer(fname, lname, randomInteger(18, 75), "Male", pnum, 10000 + i);
    AbcBank.addCustomers(cust);
    AbcBank.addAccounts({ accNum: cust.accNum, balance: 1000 * i });
}
//console.log(AbcBank);
async function availService(bank) {
    while (true) {
        let bankingService = await inquirer.prompt({
            type: "list",
            name: "serviceOpt",
            message: "Please select Banking service Options",
            choices: ["View Balance", "Cash WithDraw", "Cash Deposit"]
        });
        let accnumInput = await inquirer.prompt({
            type: "input",
            name: "accNum",
            message: "Please Enter Your account Number"
        });
        if (bankingService.serviceOpt == "View Balance") {
            // console.log("View Balance");
            let acc_exists = AbcBank.accounts.find(acc => (acc).accNum == accnumInput.accNum);
            if (!acc_exists) {
                console.log(chalk.bold.red('Sorry! Your account No. is invalid!'));
            }
            else {
                let cust = AbcBank.customers.find((bank) => bank.accNum == acc_exists?.accNum);
                console.log(`Dear ` + chalk.bold.green(cust?.firstname + ` ` + cust?.lastname) + ` ` +
                    `Your account balance is ` + chalk.bold.blueBright(acc_exists.balance));
            }
        }
        else if (bankingService.serviceOpt == "Cash WithDraw") {
            let acc_exists = AbcBank.accounts.find(acc => (acc).accNum == accnumInput.accNum);
            if (!acc_exists) {
                console.log(chalk.bold.red('Sorry! Your account No. is invalid!'));
            }
            else {
                let cust = AbcBank.customers.find((bank) => bank.accNum == acc_exists?.accNum);
                let withDraw = await inquirer.prompt({
                    type: "input",
                    name: "amount",
                    message: "Please Enter Your Amount"
                });
                if (withDraw.amount > acc_exists.balance) {
                    console.log(chalk.bold.red('Sorry! You have insufficent balance in your account!'));
                }
                else {
                    let newBalance = acc_exists.balance - Number(withDraw.amount);
                    AbcBank.performTransaction({ accNum: acc_exists.accNum, balance: newBalance });
                    console.log(`Dear ` + chalk.bold.green(cust?.firstname + ` ` + cust?.lastname) + ` ` +
                        `Your account has been successfully debited with amount = ${withDraw.amount}. \n Your new balance is ` + chalk.bold.blueBright(newBalance));
                }
                // console.log(`Dear ` + chalk.bold.green( cust?.firstname + ` ` + cust?.lastname) + ` ` +
                // `Your account balance is ` + chalk.bold.blueBright(acc_exists.balance) );
            }
            // console.log("Cash WithDraw");
        }
        else // For Cash deposit
         {
            let acc_exists = AbcBank.accounts.find(acc => (acc).accNum == accnumInput.accNum);
            if (!acc_exists) {
                console.log(chalk.bold.red('Sorry! Your account No. is invalid!'));
            }
            else {
                let cust = AbcBank.customers.find((bank) => bank.accNum == acc_exists?.accNum);
                let deposit = await inquirer.prompt({
                    type: "input",
                    name: "amount",
                    message: "Please Enter Your Amount"
                });
                let newBalance = acc_exists.balance + Number(deposit.amount);
                AbcBank.performTransaction({ accNum: acc_exists.accNum, balance: newBalance });
                console.log(`Dear ` + chalk.bold.green(cust?.firstname + ` ` + cust?.lastname) + ` ` +
                    `Your account has been successfully credited with amount = ${deposit.amount}. \n Your new balance is ` + chalk.bold.blueBright(newBalance));
                // if (withDraw.amount > acc_exists.balance)   
                // {
                //     console.log(chalk.bold.red('Sorry! You have insufficent balance in your account!'));
                // }   
                // else
                // {
                //     let newBalance = acc_exists.balance - withDraw.amount;
                //     AbcBank.performTransaction({accNum:acc_exists.accNum, balance:newBalance})
                // }            
                //console.log("Cash Deposit");
            }
        }
        const IsAddAnother = await inquirer.prompt({
            name: 'Addmore',
            type: 'confirm',
            message: `Do you Want to Perform another transaction ?:\n`,
        });
        // console.log(IsAddAnother.Addmore);
        if (!IsAddAnother.Addmore) {
            break;
        }
    }
}
console.clear();
welcome();
await sleep();
await availService(AbcBank);
console.log("Thankyou for banking with us!");
