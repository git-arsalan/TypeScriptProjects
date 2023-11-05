// creating customer class
class customer
{
    firstname:string;
    lastname:string;
    age:number;
    gender:string;
    mobileNum:string;
    accNum:number;

    constructor(FirstName:string,LastName:string,Age:number,Gender:string,MobileNum:string,AccNum:number)
    {
        this.firstname = FirstName;
        this.lastname = LastName;
        this.age = Age;
        this.gender = Gender;
        this.mobileNum = MobileNum;
        this.accNum = AccNum;
    }

}


// creating interface for bank account

interface Bankaccount
{
    accNum:number;
    balance:number;
}

// creating bank class

class Bank
{
    customers:customer[] = []; // variable for customers in bank
    accounts:Bankaccount[] = [];
}




