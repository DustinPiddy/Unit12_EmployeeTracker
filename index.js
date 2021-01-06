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
//question prompts
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
//add questions
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
//view questions
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
    .then(async function(answer){
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
//update questions
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
    .then(async function(answer){
        switch(answer.action) {
            case "Update Departments":
                updateDepartment();
                break;
            case "Update Roles":
                updateRole();
                break;
            case "Update Employees":
                updateEmployee();
            case "Go Back":
                connection.end();
                break;
        }
    });
}

//add functions
function addDepartment() {
    askOneQuestion("What's the name of the Department?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Want to add another?", () => {
            addDepartment();
        });
    });
}

function addRole() {
    const questions = [
        {
            type : 'input',
            name : 'title',
            message : "Role Title?"
        },
        {
            type : 'number',
            name : 'salary',
            message : "Role Salary?"
        },
        {
            type : 'number',
            name : 'departmentID',
            message : "Whats the department ID for the role?"
        }
    ];
    askMultipleQuestions(questions, (answers)=> {        
        askAgain("Want to add another?", () => {
            addRole();
        });
    });
}

function addEmployee() {
    askOneQuestion("Employee name?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Want to add another?", () => {
            addEmployee();
        });
    });
}
//view functions
function viewDepartment(itemToView) {
    var query = "SELECT id, name FROM departments";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
        promptQuestions();
    });
    askOneQuestion("Which department do you want to view?", (answer)=> {
        console.log(answer.userInput);

        askAgain("View another?", () => {
            viewDepartment();
        });
    });
}

function viewRole(itemToView) {
    askOneQuestion("What role do you want to view?", (answer)=> {
        console.log(answer.userInput);

        askAgain("View another?", () => {
            viewRole();
        });
    });
}

function viewEmployee(itemToView) {
    askOneQuestion("Which employee do you want to view?", (answer)=> {
        console.log(answer.userInput);

        askAgain("View another?", () => {
            viewEmployee();
        });
    });
}
//update functions
function updateDepartment(itemToUpdate) {
    askOneQuestion("Which department do you want to update?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Update another?", () => {
            updateDepartment();
        });
    });
}

function updateRole(itemToUpdate) {
    askOneQuestion("Which role do you want to update?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Update another?", () => {
            updateRole();
        });
    });
}

function updateEmployee(itemToUpdate) {
    askOneQuestion("Which employee do you want to update?", (answer)=> {
        console.log(answer.userInput);
        

        askAgain("Update another?", () => {
            updateEmployee();
        });
    });
}

function askAgain (question, callback) {
    inquirer.prompt({
        name: "answer",
        type: "confirm",
        message : question
    }).then(function (answer) {
        if(answer.answer)
        {
            callback();
        }
        else
        {
            promptQuestions();
        }
    });

}

function askOneQuestion(question, callback) {
    inquirer.prompt({
        name: "userInput",
        type: "input",
        message: question
    })
    .then((answer) => callback(answer));
}

function askMultipleQuestions(questionsArray, callback) {
    inquirer.prompt(questionsArray)
    .then((answer) => callback(answer));
}