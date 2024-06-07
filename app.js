import inquirer from "inquirer";
class Student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let nextStudentId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please enter your name",
        });
        let trimmedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (!studentNameCheck.includes(trimmedStudentName)) {
            if (trimmedStudentName !== "") {
                nextStudentId++;
                studentId = "STTD" + nextStudentId;
                console.log("\nYour account has been created");
                console.log(`Welcome, ${trimmedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course",
                    choices: ["IT", "English", "Cooking"]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English":
                        courseFees = 6000;
                        break;
                    case "Cooking":
                        courseFees = 7000;
                        break;
                }
                let newStudent = new Student(studentId, trimmedStudentName, [course.ans], courseFees);
                students.push(newStudent);
                console.log("You have enrolled in this course");
            }
            else {
                console.log("Invalid name");
            }
        }
        else {
            console.log("This name already exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNamesCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select a name",
                choices: studentNamesCheck
            });
            let foundStudent = students.find(student => student.name === selectedStudent.ans);
            if (foundStudent) {
                console.log("Student information:");
                console.log(foundStudent);
                console.log("\n");
            }
            else {
                console.log("Student not found");
            }
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (!userConfirm.ans) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
