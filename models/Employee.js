//The file creates the Employee model
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model{}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //employee first name max 30 characters
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [1, 30],
            }
        },
        //employee last name max 30 characters
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [1, 30],
            }
        },
        //role ID references the employee role
        role_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'role',
                key: 'id',
            },
        },
        //manager ID hold reference to another employee aka the manager
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id',
            }

        },
    },
    {
        sequelize,
        modelName: 'employee',
    }
);

//export the employee model
module.exports = Employee;