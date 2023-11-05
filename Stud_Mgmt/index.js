#! /usr/bin/env node
// Student managment system
// creating school class
// console.log("Hello");
class school // school class
 {
    enterStudent(objStd) {
        this.students.push(objStd); // member function which add student in school
    }
    enterteacher(objTeach) {
        this.teachers.push(objTeach);
    }
    constructor(Name) {
        this.name = ""; // variable for school name
        this.students = [];
        this.teachers = [];
        this.name = Name;
    }
}
// Now Creating student class
class student {
    constructor(Name, Age, Class, SchoolName) {
        this.name = "";
        this.age = 0;
        this.class = 0;
        this.schoolName = "";
        this.name = Name;
        this.age = Age;
        this.class = Class;
        this.schoolName = SchoolName;
    }
}
class teacher extends student // Inherit teacher from student as we need same info as in student class
 {
    constructor() {
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
        super(...arguments);
        // adding extra information in teacher which do not possess in student class
        this.qualification = "";
        this.email = "";
    }
    addinfo(Qualification, Email) {
        this.qualification = Qualification;
        this.email = Email;
    }
}
// creating school object...
let school1 = new school("MGGS");
let school2 = new school("KPS");
let stud1 = new student("Ahmad Ashraf", 10, 6, school1.name);
let stud2 = new student("Moazzam", 12, 8, school2.name);
// creating teacher ojects
let teach1 = new teacher("Ahsan Fasihi", 30, 8, school1.name);
let teach2 = new teacher("Kashif Kazmi", 35, 7, school2.name);
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
export {};
