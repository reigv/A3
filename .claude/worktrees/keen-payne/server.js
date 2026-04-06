const express = require("express");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Array of task objects (our in-memory data store)
let tasks = [];

// =============================================
// GET / - Home endpoint: show all tasks
// =============================================
app.get("/", (req, res) => {
    res.render("tasks", { tasks: tasks });
});

// =============================================
// GET /completed-tasks - Show only completed tasks
// =============================================
app.get("/completed-tasks", (req, res) => {
    // Build a filtered list using a basic for loop (no higher-order array methods)
    let completedTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isCompleted === true) {
            completedTasks.push(tasks[i]);
        }
    }
    res.render("tasks", { tasks: completedTasks });
});

// =============================================
// POST /add-task - Add a new task to the list
// =============================================
app.post("/add-task", (req, res) => {
    // Get the task name from the form
    const taskName = req.body.taskName;

    // Create a new task object; id = current length of the array
    const newTask = {
        id: tasks.length,
        name: taskName,
        isCompleted: false
    };

    // Add the new task to the array
    tasks.push(newTask);

    // Redirect the user back to the home page
    res.redirect("/");
});

// =============================================
// POST /update-task/:id - Update a task's completion status
// =============================================
app.post("/update-task/:id", (req, res) => {
    // Get the task id from the URL parameter
    const id = Number(req.params.id);

    // Check if the checkbox was checked
    // When a checkbox is checked, its value is sent in the form data
    // When unchecked, nothing is sent (req.body.isCompleted will be undefined)
    const isCompleted = req.body.isCompleted === "on";

    // Find the task and update it using a basic for loop
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].isCompleted = isCompleted;
        }
    }

    // Redirect the user back to the home page
    res.redirect("/");
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
