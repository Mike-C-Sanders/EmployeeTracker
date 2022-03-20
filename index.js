//Node Modules included 
const inquirer = require('inquirer');

//local files called
const {Department, Employee, Role} = require('./models/index');
const db = require('./config/connection');

//imported questions for the inquirer
const {startQuest, addDepartmentQuestions,addRoleQuestions, addEmployeeQuestions} = require('./app/questions')

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
                addEmployee();
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
        console.table(roles, ['id', 'title', 'salary', 'department_id','Department.name']);
        
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
        console.log(employees);
        //find all employees, returning a full table of all employees
        console.table(employees, ['id', 'first_name', 'last_name', 'role_id', 'manager_id']);

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
        console.log(departments);
        //loop through all departments and add them to deptArr array
        departments.forEach(dept =>{
            deptArr.push(dept.name);
        })
        
    });
    //using inquirer we prompt the user to answer a series of questions and create a new role
    inquirer.prompt(addRoleQuestions(deptArr)).then((answers) =>{

        //find the department id associated with the choice
        const deptID = deptArr.indexOf(answers.department)+1;

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

//Add a new employee
const addEmployee = () =>{
    const roleArr = [];
    //store manager name for the inquirer
    const managerArr = [];
    //used to store the employee id for final addition
    const employeeIDS = []

    //find all roles and push the titles into an array for the use during inquirer
    Role.findAll().then((roles) =>{
        roles.forEach(role =>{
            roleArr.push(role.title)
        })
    });

    Employee.findAll().then((employees) =>{
        //check the employee role to make sure the person is a manager
        employees.forEach(employee =>{
            
            employeeIDS.push(employee.id);
            managerArr.push(employee.first_name +' '+employee.last_name);
            
        })
    })

    //inquirer prompt initated using the employeequesitons which adds the role array and manager array for choices quesitons 
    inquirer.prompt(addEmployeeQuestions(roleArr, managerArr)).then((answers) =>{
        //determine which role and which manager was chosen
        const roleID = roleArr.indexOf(answers.role) + 1;
        let managerID;

        managerArr.forEach((manager, index ) =>{
            //find the manager called in answers
            if(manager === answers.manager){
                //match the manager's employee id and assign the value to managerID being added
                managerID = employeeIDS[index];
            }
        });

        

        Employee.create({
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: roleID,
            manager_id: managerID,
        }).then(() =>{
            console.log('A new employee was successfully added');

            init();
        });
    })

}

//start the program with main initialize file
init();