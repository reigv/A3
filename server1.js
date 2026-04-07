const express = require('express');
const { parse } = require('node:path');
const app = express();
const port = 3300;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // get info from forms

let TASKS = [];

app.get('/', (req, res) => {
    res.render('home.ejs', { tasks: TASKS });
});

app.post('/add-task', (req, res) => {
    const task_from_form = req.body.home_add_task;

    // add info to the task
    const new_task = {
        id: TASKS.length, // keep stack on top of each other
        name: task_from_form,
        isCompleted: false
    }

    TASKS.push(new_task);
    res.redirect('/');
});

app.post('/update-task/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // get check box value from form
    const is_checked_box = req.body.home_check_box  === 'on'; // check box value is "on" when checked, undefined when unchecked

    for (let i = 0; i < TASKS.length; i++) {
        if (TASKS[i].id === id) {
            TASKS[i].isCompleted = is_checked_box;
            break; 
        }
    }
    res.redirect('/');
});

// different app.get vs app.post
// app.get is for when the user clicks a link or types a URL in the browser
// app.post is for when the user submits a form (like adding a task or updating a task)
app.get('/completed-tasks',  (req, res) => {
    let completed_tasks = [];
    for (let i = 0; i < TASKS.length; i++) {
        if (TASKS[i].isCompleted) {
            completed_tasks.push(TASKS[i]);
        }
    }
    res.render('completed_tasks.ejs', { tasks: completed_tasks });
    // res.send("This is the completed tasks page");
});








app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});