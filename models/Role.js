//This file is used to define the Role Model
const {Model, DataTypes} = require('sequelize');
//call the connection file to intiate sequelize
const sequelize = require('../config/connection');

class Role extends Model{};

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //title of the role maximum of 30 characters
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                //ensure that the value entered is a character
                isAlphanumeric: true,
                len: [1, 30],
            }
        },
        //value to hold the salary, using the decimal type 
        salary:{
            type: DataTypes.DECIMAL,
            allowNull: false,

        },
        //reference the department table using the department id
        department_id:{
            type: DataTypes.INTEGER,
            reference:{
                model: 'department',
                key: 'id',
            }
        }
    },
    //no timestamps, freeze table and name table role
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'role'
    }
)

//export the role model
module.exports = Role;