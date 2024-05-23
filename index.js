#!/usr/bin/env node
import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 99999);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: "Enter your name",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "please enter a correct value";
        },
    },
    {
        name: "courses",
        type: "list",
        message: "Select your course to enroll",
        choices: ["business", "HTML", "CSS", "PYTHON", "WEB 3.0"],
    },
]);
const tutionFee = {
    business: 5000,
    HTML: 5500,
    CSS: 3000,
    PYTHON: 4000,
    "WEB 3.0": 8000,
};
console.log(`\n Tution fees ${tutionFee[answer.courses]}/-`);
console.log(`balance ${myBalance}\n`);
let paymentMethod = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "select your payment method",
        choices: ["bank", "easypaisa", "jazz cash", "sada pay"],
    },
    {
        name: "amount",
        type: "input",
        message: "value of transfer money",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "please enter a correct value";
        },
    },
]);
console.log(`\n Your selected payment method ${paymentMethod.payment} `);
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentMethod.amount);
if (tutionFees === paymentAmount) {
    console.log(`congratulations, you have successfully enrolled in ${answer.courses}.\n`);
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "what would you like to do next",
            choices: ["view status", "update info", "exit"],
        },
    ]);
    if (ans.select === "view status") {
        console.log("\n********* Status *********");
        console.log(`student name: ${answer.students}`);
        console.log(`student ID: ${randomNumber}`);
        console.log(`course: ${answer.courses}`);
        console.log(`tution fees paid : ${paymentAmount}`);
        console.log(`balance: ${myBalance += paymentAmount}`);
    }
    else if (ans.select === "update info") {
        let updateAnswer = await inquirer.prompt([
            {
                name: "students",
                type: "input",
                message: "Enter your new name",
                validate: function (value) {
                    if (value.trim() !== "") {
                        return true;
                    }
                    return "please enter a correct value";
                },
            },
        ]);
        console.log(`\n Your name has been updated to ${updateAnswer.students} \n`);
        // Add a view status option after update info
        let viewStatusAnswer = await inquirer.prompt([
            {
                name: "viewStatus",
                type: "list",
                message: "Do you want to view your status?",
                choices: ["yes", "no"],
            },
        ]);
        if (viewStatusAnswer.viewStatus === "yes") {
            console.log("\n********* Status *********");
            console.log(`student name: ${updateAnswer.students}`);
            console.log(`student ID: ${randomNumber}`);
            console.log(`course: ${answer.courses}`);
            console.log(`tution fees paid : ${paymentAmount}`);
            console.log(`balance: ${myBalance += paymentAmount}`);
        }
    }
    else {
        console.log("\n existing student management system\n");
    }
}
else {
    console.log(" invalid amount due to course value is else\n");
}
