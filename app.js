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
    name: 'role',
    message: 'What type of employee would like to add?',
    choices: [
        'Intern',
        'Manager',
        'Engineer',
        'No more to add'
    ]
}];


//function to allow you to choose a role for employees
function promptQuestions() {
    inquirer.prompt(getPosition).then(answers => {
        console.log(answers)
        switch (answers.role) {
            case "Manager":
                return newManager();
                break;

            case "Intern":
                return newIntern();
                break;

            case "Engineer":
                return newEngineer();
                break;
                
            case "No more to add":
                return noMore();
                break;
        }




    });

};
promptQuestions();


//function to generate the html cards with added input
function newManager() {
    inquirer
    .prompt([{
            type: 'input',
            name: 'name',
            message: 'Team member name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'id number:'
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


    ]).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        newEmployee.push(manager)
        promptQuestions();
    })



};

function newEngineer() {
    inquirer
    .prompt([{
            type: 'input',
            name: 'name',
            message: 'Team member name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'id number:'
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
    ]).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        newEmployee.push(engineer)
        promptQuestions();
    })



};

function newIntern() {
    inquirer
    .prompt([{
            type: 'input',
            name: 'name',
            message: 'Team member name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'id number:'
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


    ]).then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
        newEmployee.push(intern)
        promptQuestions();
    })



};

function noMore() {
    renderHTML();
    console.log(newEmployee)
    
}


function renderHTML(){
fs.writeFile(outputPath, render(newEmployee), function(err, data) {

    if (err) {
      return console.log(err);
    }
  
    console.log("Success!");
  
  })};



