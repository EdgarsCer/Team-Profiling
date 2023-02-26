const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");



// TODO: Write Code to gather information about the development team members, and render the HTML file.

 let team = [];

 async function startProgram(){
    console.log("Let's build your team!");
    
    // Prompt the user to enter the manager's details first
    const { name, id, email, officeNumber } = await inquirer.prompt([
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
    ]);

    // Create a new Manager instance and add it to the team array
    const manager = new Manager(name, id, email, officeNumber);
    team.push(manager);

    // Prompt the user to add an engineer or intern
    let addEmployee = true;
    while (addEmployee) {
        const { employeeType } = await inquirer.prompt([
            {
                type: "list",
                name: "employeeType",
                message: "What type of employee do you want to add?",
                choices: ["Engineer", "Intern", "I don't want to add any more employees"]
            }
        ]);
        // Prompt the user to enter the employee's details
        // Create a new instance of the chosen employee type and add it to the team array
        // Repeat the loop if the user wants to add another employee

        if (employeeType === "Engineer") {
                    const engineerData = await inquirer.prompt([
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
            ]);
        }
        else if (employeeType === "Intern"){
            const internData = await inquirer.prompt([
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
            ]);
        }
        else{
            addEmployee = false;
        }
    }

    let htmlDoc = render(team)

    await fs.writeFile(outputPath, htmlDoc, () => {});
}


