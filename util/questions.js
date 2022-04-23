//Questions variables for all 

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

];

//array of questions to ask the user before inqurer prompt 
//TODO ADD VALIDATION 
const addDepartmentQuestions = [
        {
            type: 'input',
            name: 'newDept',
            message: `What's the name of the new department?`
        }
    ];

//questions to ask the user before adding to the database
const addRoleQuestions = (deptArr) =>{
    return [
    {
        type: 'input',
        name: 'title',
        message: `What new role would you like to add?`
    },
    {
        type: 'input',
        name: 'salary',
        message: `Set this new role's salary value. (Enter a number)`
    },
    {
        type:'list',
        name: 'department',
        message: 'Select a department to assign this role.',
        choices: deptArr,
    }
]}

const addEmployeeQuestions = (roleArr, managerArr) =>{
    return[
        {
            type: 'input',
            name: 'first_name',
            message: `What's the first name of the employee?`
        },
        {
            type: 'input',
            name: 'last_name',
            message: `What's the last name of the employee?`,
        },
        {
            type: 'list',
            name: 'role',
            message: `Choose the role this employee is aligned to.`,
            choices: roleArr,
        },
        {
            type: 'list',
            name: 'manager',
            message: `Choose a manager`,
            choices: managerArr,
        }
    ]
}

const updateManagerQuestions = (employeeArr) =>{
    return [
        {
            type: 'list',
            name: 'employee',
            message: `Which employee has a new manager?`,
            choices: employeeArr,
        },
        {
            type: 'list',
            name: 'manager',
            message: `Who's their new manager?`,
            choices: employeeArr,
        }
    ]

}

const updateEmployeeQuestions = (employeeArr, roleArr) =>{
    return [
        {
            type: 'list',
            name: 'employee',
            message: `Which employee has a new role?`,
            choices: employeeArr,
        },
        {
            type: 'list',
            name: 'role',
            message: `What's the employee's new role?`,
            choices: roleArr,
        }
    ]
}

const deleteEmployeeQuestions = (employeeArr) =>{
    return [
        {
            type: 'list',
            name: 'employee',
            message: `Which employee would you like to delete?`,
            choices: employeeArr,
        }
    ]
}
module.exports = {
    startQuest, 
    addDepartmentQuestions, 
    addRoleQuestions, 
    addEmployeeQuestions, 
    updateManagerQuestions,
    updateEmployeeQuestions,
    deleteEmployeeQuestions};