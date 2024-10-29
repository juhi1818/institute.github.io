const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'employee1', password: 'employee123', role: 'employee' },
    { username: 'student1', password: 'student123', role: 'student' }
];

// Login Function
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        if (user.role === 'admin') {
            window.location.href = 'adminDashboard.html';
        } else if (user.role === 'employee') {
            window.location.href = 'employeeDashboard.html';
        } else {
            window.location.href = 'studentDashboard.html';
        }
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid username or password';
    }
});

// Student Management
let students = JSON.parse(localStorage.getItem('students')) || [];

function manageStudents() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Manage Students</h2>
        <form id="studentForm">
            <input type="text" id="studentName" placeholder="Student Name" required>
            <button type="submit">Add Student</button>
        </form>
        <ul id="studentList"></ul>
    `;

    document.getElementById('studentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('studentName').value;
        students.push({ name });
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        this.reset();
    });
    
    displayStudents();
}

function displayStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Clear existing list
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${student.name}`;
        studentList.appendChild(li);
    });
}

// Add Questions
let questions = JSON.parse(localStorage.getItem('questions')) || [];

function addQuestions() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Add Questions</h2>
        <form id="questionForm">
            <input type="text" id="questionText" placeholder="Question" required>
            <input type="text" id="correctAnswer" placeholder="Correct Answer" required>
            <button type="submit">Add Question</button>
        </form>
        <ul id="questionList"></ul>
    `;

    document.getElementById('questionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const questionText = document.getElementById('questionText').value;
        const correctAnswer = document.getElementById('correctAnswer').value;
        questions.push({ questionText, correctAnswer });
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
        this.reset();
    });
    
    displayQuestions();
}

function displayQuestions() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = ''; // Clear existing list
    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${question.questionText} (Correct Answer: ${question.correctAnswer})`;
        questionList.appendChild(li);
    });
}

// Event Listeners for Buttons
document.getElementById('manageStudentsBtn')?.addEventListener('click', manageStudents);
document.getElementById('addQuestionsBtn')?.addEventListener('click', addQuestions);
document.getElementById('viewAssessmentsBtn')?.addEventListener('click', viewAssessments);
document.getElementById('manageEmployeesBtn')?.addEventListener('click', manageEmployees);
document.getElementById('assignTasksBtn')?.addEventListener('click', assignTasks);
document.getElementById('viewReportsBtn')?.addEventListener('click', viewReports);
document.getElementById('exportDataBtn')?.addEventListener('click', exportData);

// Placeholder functions for other functionalities
function manageEmployees() {
    const content = document.getElementById('content');
    content.innerHTML = `<h2>Manage Employees</h2><p>Employee management functionality here.</p>`;
}

function assignTasks() {
    const content = document.getElementById('content');
    content.innerHTML = `<h2>Assign Tasks</h2><p>Task assignment functionality here.</p>`;
}

function viewReports() {
    const content = document.getElementById('content');
    content.innerHTML = `<h2>View Reports</h2><p>Report viewing functionality here.</p>`;
}

function exportData() {
    const content = document.getElementById('content');
    content.innerHTML = `<h2>Export Data</h2><p>Data export functionality here.</p>`;
}

function viewAssessments() {
    const content = document.getElementById('content');
    content.innerHTML = `<h2>Assessments</h2><ul id="assessmentList"></ul>`;
    const assessmentList = document.getElementById('assessmentList');
    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${question.questionText}`;
        assessmentList.appendChild(li);
    });
}
