//Using this file for the department model
const {Model, DataTypes} = require('sequelize'); 
//require the connection file for log into mysql
const sequelize = require('../config/connection');

class Department extends Model{};

//Department table specifics
Department.init(
    {
        //primary key for department
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //name is a string max characters of 30
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                //ensure the value is a character not a special character
                isAlphanumeric: true,
                len: [1, 30],
            }
        }
    },
    //freeze the table name
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'department'
    }
)

//export the model
module.exports = Department;