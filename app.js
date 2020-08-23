const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');


const newEmployee = []



//figuring out positions
const getPosition = [{
    type: 'list',
    name: 'employeeSelection',
    message: 'What type of employee would like to add?',
    choices: [
        'Intern',
        'Manager',
        'Engineer'
    ]
}];

//questions for the manager role
const managerQuestion = inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Team member name?'
    },
    {
        type: 'input',
        name: 'position',
        message: 'What is positionon of the team member?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email adress:'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Enter your Office Number:'
    }


]);

// questions for the egnineer
const engineerQuestion = inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Team member name?'
    },
    {
        type: 'input',
        name: 'position',
        message: 'What is the position of the team member?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email adress:'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter GitHub link:'
    }
]);
//questions for the intern 
const internQuestion = inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Team member name?'
        },
        {
            type: 'input',
            name: 'position',
            message: 'What is the position of the team member?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter email adress:'
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter School name:'
        }
    

]);


//function to generate the html cards
function newManager() {
    managerQuestion.then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        newEmployee.push(manager)
    })



};
//function to allow you to choose a role for employees
function promptQuestions() {
    inquirer.prompt(getPosition).then(answers => {
        switch (answers.role) {
            case "Manager":
                newManager();
                break;

            case "Intern":
                newIntern()
                break;

            case "Engineer":
                engineerQuestion()
                break;
        }




    });

};

promptQuestions();

//function to generate the input needed to mark up the html cards
function renderHTML() {
    fs.writeFile(outputPath, render(newEmployee)), (err) => {
        if (err) console.log(err)
        else(console.log("successfully wrote to the team.html!"))
    }
}

renderHTML();