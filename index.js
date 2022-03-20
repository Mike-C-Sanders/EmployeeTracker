//Node Modules included 
const inquirer = require('inquirer');

//local files called
const {Department, Employee, Role} = require('./models/index');
const db = require('./config/connection');

//imported questions for the inquirer
const {startQuest, addDepartmentQuestions,addRoleQuestions} = require('./app/questions')

//questions array that's going to be use to kickoff the prompting of inquirer
//based on the choice in the list will prompt a function


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
                addDepartment();
                break;
            
            case 'Add Role':
                addRole();
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

//*VIEW FUNCTIONS
//view all departments function
const viewDepartments = () => {
    //find all departments
    Department.findAll().then((departments) =>{
        //create a table with the results
        console.table(departments, ['id', 'name']);

        //return to the main inquirer prompt
        init();
    })
}

//vew all roles
const viewRoles = () => {
    //find all roles 
    Role.findAll({
        include: [{model: Department}],
        raw: true,
    }).then((roles) => {
        console.table(roles, ['id', 'title', 'salary', 'Department.name']);
        
        //return to the main inquirer prompt
        init();
    })
}

//view all employees
const viewEmployees = () =>{
    //find all employees 
    Employee.findAll({
        include: [{model: Role}],
        raw:true,
    }).then((employees) =>{
        //find all employees, returning a full table of all employees
        console.table(employees, ['id', 'first name', 'last name', 'Role.title', 'Role.salary', 'Role.department_id', 'manager_id']);

        //return to the main inquirer prompt
        init();
    })
}

//*ADD FUNCTIONS
//add a new department function
const addDepartment = () =>{
    

    //access inquirer for the prompt
    inquirer.prompt(addDepartmentQuestions).then((answer) => {
        //create the new department based on the answer
        Department.create({
            name: answer.newDept,
        }).then(()=>{
            //log the result
            console.log(`The ${answer.newDept} has been added to your organization.`);
        }).then(() =>{
            //return to the main screen
            init();
        })
    })

}

//add role function to add in a new role
const addRole = () =>{
    // create a department array for the choices 
    const deptArr = [];
    
    //finall departments before asking the user. We need to use the departments array for choices
    
    Department.findAll().then((departments) =>{

        //loop through all departments and add them to deptArr array
        departments.forEach(dept =>{
            deptArr.push(dept.name);
        })
        
    });
    //using inquirer we prompt the user to answer a series of questions and create a new role
    inquirer.prompt(addRoleQuestions).then((answers) =>{

        //find the department id associated with the choice
        const deptID = deptArr.indexOf(answers.department);

        //create the role
        Role.create({
            title: answers.title, 
            salary: answers.salary, 
            department_id: deptID,
        }).then(() =>{
            console.log(`successfully created a new Role`);
        }).then(() =>{
            //back to the main menu
            init();
        })
    })
}

//start the program with main initialize file
init();