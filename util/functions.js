const inquirer = require('inquirer');

//local files called
const {Department, Employee, Role} = require('./models/index');
const db = require('./config/connection');