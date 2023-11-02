#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
//import gradient from 'gradient-string';
//import chalkAnimation from 'chalk-animation';
import chalkAnimation from 'chalk-animation';
//import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

 async function welcome() 
 {
  const rainbowTitle = chalkAnimation.rainbow('Welcome ABC School-Student Admission!\n');
  await sleep();
  rainbowTitle.stop();
      
}

// Creating student class

class student
{
    _name:string = "";

    constructor(name:string)
    {

        this._name = name;
    }

}

// creating school class
class school
{
    _name:string = "";
    _students:student[]=[];

    public admitStudent(Student:student)
    {
        this._students.push(Student);
    }

    constructor (name:string)
    {
        this._name = name;
    }


}

let AbcSchool = new school("ABC School");

//console.log(AbcSchool);

//Const Students

const startAdmissionInScool = async (Student:student, School: school) =>
{
    let addAnother = true;

    do 
    {
    const inputStd = await inquirer.prompt({
        name: 'studentName',
        type: 'input',
        message: `Please Enter Student Name to take Admission in  ${School._name} :\n`,
       
      });
      //console.log(inputStd.studentName);
      Student = new student(inputStd.studentName);

      if (!School._students.find(elem => elem._name === inputStd.studentName))
      {
      School.admitStudent(Student);
      console.log(`${chalk.green.bold(inputStd.studentName)} is successfully admitted in ${chalk.blue.bold(School._name)}`);
      }
      else
      {
        console.log(`${chalk.red.bold(inputStd.studentName)} is already admitted in ${chalk.blue.bold(School._name)}`);
      }

      const IsAddAnother = await inquirer.prompt({
        name: 'Addmore',
        type: 'confirm',
        message: `Do you Want to add another student ?:\n`,
       
      });

     // console.log(IsAddAnother.Addmore);

      if (!IsAddAnother.Addmore)
      {
        addAnother = false;
      }

    }
    while(addAnother)

    return School;


}

let Student:student = new student("");
welcome();
await sleep();
const MySchool = await startAdmissionInScool(Student , AbcSchool)
console.log(chalk.bold.green("Following Student Admitted in School"));

/// displaying each students admitted in school
let count = 1;
for (var Stud of MySchool._students) 
{
  
  console.log(chalk.green(`${count}- ${Stud._name}`));
  count++;
}




