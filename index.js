//Node Modules included 
const inquirer = require('inquirer');

//local files called
const {Department, Employee, Role} = require('./models/index');
const db = require('./config/connection');
//questions array that's going to be use to kickoff the prompting of inquirer
//based on the choice in the list will prompt a function
const startQuest = [
    {
        type:'list',
        name: 'mainOptions',
        message: `What would you like to do?\n`,
        choices: [
            'View All Departments', 
            'View All Roles',
            'View All Employees', 
            'Add Department', 
            'Add Role', 
            'Add Employee',
            'Update Employee Manager',
            'Update Employee Role', 
            'Delete Employee',
            'Quit'
        ],
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
    .then((answers) => {
        //switch case to provide the correct function once the answer is determined
        switch(answers.mainOptions){
            //call the view all employees function
            case 'View All Departments':
                viewDepartments();
                break;
            
            case 'View All Roles':
                viewRoles();
                break;
            
            case 'View All Employees':
                viewEmployees();
                break;
                
            case 'Add Department':
                break;
            
            case 'Add Role':
                break;
                
            case 'Add Employee':
                break;

            case 'Update Employee Manager':
                break;

            case 'Update Employee Role':
                break;
                
            case 'Delete Employee':
                break;

            case 'Quit':
                //exit program
                process.exit();
        }
    })
}

//*FUNCTIONS for above cases
//view all departments function
const viewDepartments = () => {
    //find all departments
    Department.findAll().then((departments) =>{
        //create a table with the results
        console.table(departments, ['id', 'name']);

        //return to the main inquirer prompt
        promptUser();
    })
}

//vew all roles
const viewRoles = () => {
    //find all roles 
    Role.findAll({
        include: [{model: Department}],
    }).then((roles) => {
        console.table(roles, ['id', 'title', 'salary', 'Department.name']);
        
        //return to the main inquirer prompt
        promptUser();
    })
}

//view all employees
const viewEmployees = () =>{
    //find all employees 
    Employee.findAll({
        include: [{model: Role}],
    }).then((employees) =>{
        //find all employees, returning a full table of all employees
        console.table(employees, ['id', 'first name', 'last name', 'Role.title', 'Role.salary', 'Role.department_id', 'manager']);

        //return to the main inquirer prompt
        promptUser();
    })
}