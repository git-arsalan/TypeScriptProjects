#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';

// Student managment system

// creating school class

// console.log("Hello");
class school // school class
{
    name:string = ""; // variable for school name
    students:student[] = [];
    teachers:teacher[] = []

    enterStudent(objStd:student)
    {
        this.students.push(objStd); // member function which add student in school
    }

    enterteacher(objTeach:teacher)
    {
        this.teachers.push(objTeach)
    }

    constructor (Name:string) // Constructor method use to initialize school name when we create object
    {
        this.name = Name;
    }

}

// Now Creating student class

class student
{
    name:string = "";
    age:number = 0;
    class:number = 0;
    schoolName:string = "";

    constructor (Name:string, Age:number,Class:number,SchoolName:string)
    {
        this.name = Name;
        this.age = Age;
        this.class = Class;
        this.schoolName = SchoolName;
    }


}

class teacher extends student // Inherit teacher from student as we need same info as in student class
{

    /* name:string = "";
    age:number = 0;
    class:number = 0;
    schoolName:string = "";

    constructor (Name:string, Age:number,Class:number,SchoolName:string)
    {
        this.name = Name;
        this.age = Age;
        this.class = Class;
        this.schoolName = SchoolName;
    } */

    // adding extra information in teacher which do not possess in student class

    qualification:string = "";
    email:string = "";

    addinfo(Qualification:string, Email:string)
    {
        this.qualification = Qualification;
        this.email = Email;
    }


}



// creating school object...

let school1 = new school("MGGS");
let school2 = new school("KPS");

let stud1 = new student("Ahmad Ashraf", 10 ,6,school1.name);
let stud2 = new student("Moazzam",12,8,school2.name);

// creating teacher ojects

let teach1 = new teacher("Ahsan Fasihi",30,8, school1.name);
let teach2 = new teacher("Kashif Kazmi",35,7,school2.name);

// adding extra information to teacher objects

teach1.addinfo("MSC-Physcis", "ahsan.fasihi@mggs.com.pk");
teach2.addinfo("MA English", "kashif.kazmi@kps.com.pk");


console.log(stud1);
console.log(stud2);

// Now adding students in schools by using school class member function

school1.enterStudent(stud1); // adding student 1 in school1
school2.enterStudent(stud2); // adding student 2 in school2

// Now adding teachers in schools by using school class member function

school1.enterStudent(teach1); // adding teacher 1 in school1
school2.enterStudent(teach2); // adding teacher 2 in school2



console.log(school1); 
console.log(school2);

