// local stroge data collecting
/*let data = localStorage.getItem("tasks");

let tasks;

if (data) {
    tasks = JSON.parse(data);
} else {
    tasks = [];
}*/

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// loac stroge updates
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
/* let data = JSON.stringify(tasks);
localStorage.setItem("tasks", data);
*/

// try catch 
    /* function save() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (e) {
        console.log("Error saving data");
    }
        } */

// Add Task from user
function addTask() {
    let title = document.getElementById("title").value;
    let note = document.getElementById("note").value;
    let priority = document.getElementById("priority").value;
    let time = document.getElementById("time").value;

    if (title === "") return;

    let task = {
        id: Date.now(),
        title,
        note,
        priority,
        time,
        completed: false
    };

    tasks.push(task);
    save();
    display(tasks);

    document.getElementById("title").value = "";
    document.getElementById("note").value = "";
}
 /* function addTask() {

    let title = document.getElementById("title").value.trim();
    let note = document.getElementById("note").value.trim();
    let priority = document.getElementById("priority").value;
    let time = document.getElementById("time").value;

    if (!title) return;

    let task = {
        id: Date.now(),
        title,
        note,
        priority,
        time,
        completed: false
    };

    tasks.push(task);
    save();
    display(tasks);

    document.getElementById("title").value = "";
    document.getElementById("note").value = "";
} */

// Display Tasks.
function display(list) {
    let box = document.getElementById("taskList");
    box.innerHTML = "";

    list.forEach(t => {
        let div = document.createElement("div");
        div.className = "task " + t.priority.toLowerCase();

        if (t.completed) div.classList.add("completed");

        div.innerHTML = `
    <div class="task-header">
        <strong>Task Title :${t.title}</strong><br>
        <span>Priority Type :${t.priority}</span>
    </div>

    <small>Task Note : ${t.note}</small><br>
    <small>Task Time : ${t.time}</small>

    <p>Status: ${t.completed ? "Completed ✅" : "Pending ⏳"}</p>

    <div class="task-actions">
        <button onclick="toggle(${t.id})">✔</button>
        <button onclick="removeTask(${t.id})">X</button>
    </div>
`;

        box.appendChild(div);
    });
}
 /* function display(list) {
    let box = document.getElementById("taskList");
    box.innerHTML = "";

    list.forEach(t => {

        let div = document.createElement("div");
        div.className = "task " + t.priority.toLowerCase();

        if (t.completed) div.classList.add("completed");

        // Title + Priority
        let header = document.createElement("div");
        header.className = "task-header";

        let title = document.createElement("strong");
        title.textContent = t.title;

        let pr = document.createElement("span");
        pr.textContent = t.priority;

        header.appendChild(title);
        header.appendChild(pr);

        // Note
        let note = document.createElement("small");
        note.textContent = t.note;

        // Time
        let time = document.createElement("small");
        time.textContent = t.time;

        // Status
        let status = document.createElement("p");
        status.textContent = t.completed ? "Completed ✅" : "Pending ⏳";

        // Buttons
        let action = document.createElement("div");

        let btn1 = document.createElement("button");
        btn1.textContent = "✔";
        btn1.onclick = () => toggle(t.id);

        let btn2 = document.createElement("button");
        btn2.textContent = "X";
        btn2.onclick = () => removeTask(t.id);

        action.appendChild(btn1);
        action.appendChild(btn2);

        // Append all
        div.appendChild(header);
        div.appendChild(note);
        div.appendChild(time);
        div.appendChild(status);
        div.appendChild(action);

        box.appendChild(div);
    });
} */ 

// Pending and completed
function toggle(id) {
    tasks = tasks.map(t => {
        if (t.id === id) t.completed = !t.completed;
        return t;
    });
    save();
    display(tasks);
}
/* function toggle(id) {
    for (let t of tasks) {
        if (t.id === id) {
            t.completed = !t.completed;
            break;
        }
    }
    save();
    display(tasks);
} */
//remove taske
function removeTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    display(tasks);
}

/* function removeTask(id) {
    let index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    save();
    display(tasks);
} */
//show all
function showAll() {
    display(tasks);
}
//show pending
function showPending() {
    display(tasks.filter(t => !t.completed));
}
/*function showPending() {
    let result = [];
    for (let t of tasks) {
        if (!t.completed) result.push(t);
    }
    display(result);
} */
//show completed
function showCompleted() {
    display(tasks.filter(t => t.completed));
}
//delete completed
display(tasks);
function deleteCompleted() {
    tasks = tasks.filter(t => !t.completed);
    save();
    display(tasks);
}

/*function deleteCompleted() {
    let confirmDelete = confirm("Delete all completed tasks?");
    if (!confirmDelete) return;

    tasks = tasks.filter(t => !t.completed);
    save();
    display(tasks);
} */
//Reminder
function checkReminder() {
    let now = new Date().getTime();

    tasks.forEach(task => {
        if (task.time && !task.alerted) {
            let taskTime = new Date(task.time).getTime();

            // If time reached (within 1 min)
            if (now >= taskTime && now <= taskTime + 60000) {
                alert("⏰ Reminder: " + task.title);

                task.alerted = true; // avoid repeat alert
                save();
            }
        }
    });
}

// Run every 5 seconds
setInterval(checkReminder, 5000);
//cOMPLETED TASK ALERT
function toggle(id) {
    tasks = tasks.map(t => {
        if (t.id === id) {
            t.completed = !t.completed;

            if (t.completed) {
                alert("✅ You successfully completed: " + t.title);
            }
        }
        return t;
    });

    save();
    display(tasks);
}
//REMOVE ALERT
function removeTask(id) {

   
    let task = tasks.find(t => t.id === id);

    // confirm message with task name
    let confirmDelete = confirm(
        "⚠️ Are you sure you want to delete this task?\n\nTask: " + task.title
    );

    if (confirmDelete) {
        tasks = tasks.filter(t => t.id !== id);
        save();
        display(tasks);
    }
} 
// avoid emty task
function addTask() {

    let title = document.getElementById("title").value;
    let note = document.getElementById("note").value;
    let priority = document.getElementById("priority").value;
    let time = document.getElementById("time").value;

    // ❗ Empty check (IMPORTANT)
    if (title.trim() === "") {
        alert("⚠️ Please enter a task for adding!");
        return;
    }

    let task = {
        id: Date.now(),
        title,
        note,
        priority,
        time,
        completed: false
    };

    tasks.push(task);
    save();
    display(tasks);

    document.getElementById("title").value = "";
    document.getElementById("note").value = "";
}