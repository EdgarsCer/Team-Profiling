const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let team = [];

function startProgram() {
    console.log("Let's build your team!");

    // Prompt the user to enter the manager's details first
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the manager's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the manager's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the manager's email:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter the manager's office number:"
        }
    ])
        .then(answers => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            team.push(manager);
            addMembers();
        })
}

function addMembers() {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "What type of employee do you want to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more employees"]
        }
    ])
        .then(chosenMember => {
            switch (chosenMember.employeeType) {
                case "Engineer":
                    buildEngineer();
                    break;
                case "Intern":
                    buildIntern();
                    break;
                default:
                    buildPage();
            }
        });
}

function buildEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's ID?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email?",
        },
        {
            type: 'input',
            name: 'gitHub',
            message: "What is the engineer's GitHub User Name?",
        },
    ])
        .then(engineerData => {
            const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.gitHub);
            team.push(engineer);
            addMembers();
        })
}

function buildIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's ID?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email?",
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the intern's School Name?",
        },
    ])
        .then(internData => {
            const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
            team.push(intern);
            addMembers();
        })
}

function buildPage() {
    // Ensure the 'output' directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
  
    // Check if the 'team.html' file exists
    if (!fs.existsSync(outputPath)) {
      // If it doesn't exist, create it and write the rendered HTML to it
      fs.writeFileSync(outputPath, render(team), "utf-8");
      console.log("team.html file created successfully");
    } else {
      // If it exists, write the rendered HTML to it
      fs.writeFileSync(outputPath, render(team), "utf-8");
      console.log("team.html file updated successfully");
    }
  }
  
  
startProgram();



