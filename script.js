
let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

function displayStudents() {
    table.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        [student.id, student.name, student.department,
         student.year, student.email].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {
            deleteStudent(index);
        };

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        id: document.getElementById("studentId").value,
        name: document.getElementById("studentName").value,
        department: document.getElementById("department").value,
        year: document.getElementById("year").value,
        email: document.getElementById("email").value
    };

    const exists = students.some(s => s.id === student.id);

    if (exists) {
        alert("Student ID already exists!");
        return;
    }

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    form.reset();
});

function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

displayStudents();
