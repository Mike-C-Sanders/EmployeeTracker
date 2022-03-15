//Index file used to create the relationships between all of the tables outlined in the other model files
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

Department.hasMany(Role, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE',
});

Role.hasMany(Employee, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
});

Employee.hasOne(Employee, {
    foreignKey: 'manager_id',
});

Role.belongsTo(Department, {
    foreignKey: 'department_id'
});

Employee.belongsTo(Role, {
    foreignKey: 'role_id',
})

Employee.belongsTo(Employee, {
    foreignKey: 'manager_id'
});

module.exports = {Department, Role, Employee};