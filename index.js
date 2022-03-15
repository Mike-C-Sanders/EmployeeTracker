//Node Modules included 
const inquirer = require('inquirer');

//local files called

//questions array that's going to be use to kickoff the prompting of inquirer
//based on the choice in the list will prompt a function
const startQuest = [
    {
        type:'list',
        name: 'main',
        message: `What would you like to do?\n`,
        choices: ['View All Employees', 'Update Employee Role', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    },

]

//function used to prompt the user to provide response to above list
const promptUser = () =>{
    //returns the answer to the user choice from above
    return inquirer.prompt(startQuest);
}

//function to initialize app

const init =() =>{
    //initiate the inquirer script
    promptUser()
    //based on user choice go through functions
}