//Index file used to create the relationships between all of the tables outlined in the other model files
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

//department has many roles
Department.hasMany(Role, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE',
});

//Roles have many employees
Role.hasMany(Employee, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
});

//employee has one manager
Employee.hasOne(Employee, {
    foreignKey: 'manager_id',
});

//role belongs to one department
Role.belongsTo(Department, {
    foreignKey: 'department_id'
});

//employee belongs to one role
Employee.belongsTo(Role, {
    foreignKey: 'role_id',
})

//employee belongs to one manager
Employee.belongsTo(Employee, {
    as:'manager',
    foreignKey: 'manager_id'
});

//export all models
module.exports = {Department, Role, Employee};