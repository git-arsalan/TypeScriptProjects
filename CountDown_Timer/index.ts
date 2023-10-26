#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import {addHours, addMinutes, addSeconds, differenceInSeconds} from 'date-fns';
import { addDays } from 'date-fns';



const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

 async function welcome() 
 {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to Countdown Timer!\n');
  await sleep();
  rainbowTitle.stop();
      
}

interface custom_Type
{
    timerDuration:number,
    timer_type: 'Seconds'|'Minutes'| 'Hours' | 'Days'
    
}

async function GetInputFromUser()
{
    const timerval:custom_Type  = await inquirer.prompt(
        [{
        name: 'timer_type',
        type: 'list',
        message: 'Please Select Timer Type\n',
        choices: ['Seconds','Minutes', 'Hours', 'Days'],
      },
      {
        name: 'timerDuration',
        type: 'input',
        message: 'Please Enter Duration of Timer:\n',
        validate: (input)=>{
          if (isNaN(input))
          {
            return "Please Enter Valid Number";
          }
          else
          {
            return true;
          }
        }
      }
     ])
           console.log(timerval.timerDuration, timerval.timer_type);

       startTime(timerval.timerDuration, timerval.timer_type);

     

}

function executeTimer(interval:number, dtm:Date, timer_Type:string)
{
        const now = new Date();
        const duration:number = interval;
 
   if (timer_Type === 'Days') 
   {

    const timerDate = addDays(dtm, duration);
    const diff =  differenceInSeconds(timerDate, now);

    if (diff <= 0)
    {
      console.log("The timer has expired!");
      process.exit();
    }
     
    const days = Math.floor(diff / ( 60 * 60 * 24));  // calculation for days
    const hours = Math.floor((diff % ( 60 * 60 * 24)) / ( 60 * 60)); // calculation for hours
    const minutes = Math.floor((diff % ( 60 * 60)) / ( 60)); // calculation for minutes
    const seconds = Math.floor((diff % (60))); // calculation for seconds

   console.log(padTo2Digits(days) + " d " + padTo2Digits(hours) + " h " + padTo2Digits(minutes) + " m " + padTo2Digits(seconds) + " s " );
   }
   else if (timer_Type === 'Hours')
   {
    const timerDate = addHours(dtm, duration);
    const diff =  differenceInSeconds(timerDate, now);
    if (diff <= 0)
    {
      console.log("The timer has expired!");
      process.exit();
    }
    //const days = Math.floor(diff / ( 60 * 60 * 24));  // calculation for days
    const hours = Math.floor((diff % ( 60 * 60 * 24)) / ( 60 * 60)); // calculation for hours
    const minutes = Math.floor((diff % ( 60 * 60)) / ( 60)); // calculation for minutes
    const seconds = Math.floor((diff % (60))); // calculation for seconds

   console.log(padTo2Digits(hours) + " h " + padTo2Digits(minutes) + " m " + padTo2Digits(seconds) + " s " );

   }
   else if(timer_Type === 'Minutes') 
   {
    
    const timerDate = addMinutes(dtm, duration);
    const diff =  differenceInSeconds(timerDate, now);

    if (diff <= 0)
    {
      console.log("The timer has expired!");
      process.exit();
    }
     
    //const days = Math.floor(diff / ( 60 * 60 * 24));  // calculation for days
   // const hours = Math.floor((diff % ( 60 * 60 * 24)) / ( 60 * 60)); // calculation for hours
    const minutes = Math.floor((diff % ( 60 * 60)) / ( 60)); // calculation for minutes
    const seconds = Math.floor((diff % (60))); // calculation for seconds

    console.log(padTo2Digits(minutes) + " m " + padTo2Digits(seconds) + " s " );

   }
   else
   {
    
    const timerDate = addSeconds(dtm, duration);
    const diff =  differenceInSeconds(timerDate, now);

    if (diff <= 0)
    {
      console.log("The timer has expired!");
      process.exit();
    }
     
    //const days = Math.floor(diff / ( 60 * 60 * 24));  // calculation for days
   // const hours = Math.floor((diff % ( 60 * 60 * 24)) / ( 60 * 60)); // calculation for hours
    //const minutes = Math.floor((diff % ( 60 * 60)) / ( 60)); // calculation for minutes
    const seconds = Math.floor((diff % (60))); // calculation for seconds

    console.log( padTo2Digits(seconds) + " s " );

   }

}

function startTime(duration:number, timerType:string)
{
    console.log("Countdown Timer Starts")
    let date = new Date();
    setInterval((executeTimer), 1000, duration , date , timerType); // this will run after every 1000 ms or 1 sec
 
}

function padTo2Digits(num: number) 
{
    return num.toString().padStart(2, '0');
}
  
  



console.clear();
welcome()
await sleep();
GetInputFromUser();
