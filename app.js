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
        'Engineer',
        'No more to add'
    ]
}];


//function to allow you to choose a role for employees
function promptQuestions() {
    inquirer.prompt(getPosition).then(answers => {
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


//questions for the manager role
const managerQuestion =
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


    ]);

// questions for the egnineer
const engineerQuestion =
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
    ]);

//questions for the intern 
const internQuestion =
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


    ]);


//function to generate the html cards with added input
function newManager() {
    managerQuestion.then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        newEmployee.push(manager)
    })



};

function newEngineer() {
    engineerQuestion.then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        newEmployee.push(engineer)
    })



};

function newIntern() {
    internQuestion.then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
        newEmployee.push(intern)
    })



};

function noMore() {
    renderHTML;
}








//function to generate the input needed to mark up the html cards
function renderHTML() {
    fs.writeFile(outputPath, render(newEmployee))

} //, (err) => {
//         if (err) console.log(err)
//         else(console.log("successfully wrote to the team.html!"))
//     }
// }