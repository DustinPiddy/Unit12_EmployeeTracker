var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Du$tball5',
    database: "employees_db"
});

connection.connect(function(err){
    if (err) throw err;
    promptQuestion();
});

function promptQuestion() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What do you want to do?",
        choices: [
            "Add Departments, Roles and Employees.",
            "View Departments, Roles and Employees.",
            "Update Departments, Roles and Employees.",
            "Exit",
        ]
    })
    .then(function(answer){
        switch(answer.action) {
            case "Add Departments, Roles and Employees.":
                addQuestion();
                break;
            case "Remove Departments, Roles and Employees.":
                viewQuestion();
                break;
            case "Update Departments, Roles and Employees.":
                updateQuestion();
            case "Exit":
                connection.end();
                break;
        }
    });
}

function addQuestion() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What do you want to add?",
        Choices: [
            "Add Departments",
            "Add Roles",
            "Add Employees",
            "Go Back"
        ]
    })
    .then(function(answer){
        switch(answer.action) {
            case "Add Departments":
                addDepartment();
                break;
            case "Add Roles":
                addRole();
                break;
            case "Add Employees.":
                addEmployee();
            case "Go Back":
                connection.end();
                break;
        }
    });
}

function viewQuestion() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What do you want to view?",
        Choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Go Back"
        ]
    })
    .then(function(answer){
        switch(answer.action) {
            case "View Departments":
                viewDepartment();
                break;
            case "View Roles":
                viewRole();
                break;
            case "View Employees":
                viewEmployee();
            case "Go Back":
                connection.end();
                break;
        }
    });
}

function updateQuestion() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What do you want to view?",
        Choices: [
            "Update Departments",
            "Update Roles",
            "Update Employees",
            "Go Back"
        ]
    })
    .then(function(answer){
        switch(answer.action) {
            case "Update Departments":
                viewDepartment();
                break;
            case "Update Roles":
                viewRole();
                break;
            case "Update Employees":
                viewEmployee();
            case "Go Back":
                connection.end();
                break;
        }
    });
}

function addDepartment() {
    
}