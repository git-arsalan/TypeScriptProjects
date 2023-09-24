#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

 async function welcome() 
 {
  const rainbowTitle = chalkAnimation.rainbow('Todo List Creator!\n');
  await sleep();
  rainbowTitle.stop();
      
}

let isMoreInList:boolean = true;
let todoItems:string[] = [];

async function AddTodoInList()
{
    await sleep();
    while(isMoreInList)
    {
    const answers :{
      todo:string,
      addAnother:boolean
    }
    = await inquirer.prompt([
      {
        type:"input",
        name:"todo",
        message:"Please Add Item in your todo List"
      },
      {
        type:"confirm",
        name:"addAnother",
        message:"Do you want to add another Item in your Todo List?"
      }


    ])
    const {todo, addAnother} = answers;
    isMoreInList = addAnother;
    //console.log(todo);

    if (todo)
    {
      todoItems.push(todo);
    }
    else
    {
        console.log("Invalid Item!"); 
    }

  } // while loop ends

  return showTodoList(todoItems);

}

async function showTodoList(todo:string[])
{
    const spinner = createSpinner('Displaying your TodoList...').start();
    await sleep();
    let count = 1;
    if (todo.length > 0)
    {
        todo.forEach(item => {
          
          spinner.success({ text: count.toString() + `- ` + item });
          count++;
          
        });

    }
    else
    {
      spinner.error({ text: `No Items found in your todo List`});

    }


}


welcome();
await sleep;
AddTodoInList();