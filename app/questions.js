//Questions variables for all 

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
const addRoleQuestions = [
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
]

module.exports = {startQuest, addDepartmentQuestions, addRoleQuestions};