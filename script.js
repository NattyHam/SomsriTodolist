const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add Task: POST request to create new task
async function AddTask() {
    if (inputBox.value === '') {
        alert("Please input the task");
    } else {
        const task_name = inputBox.value;

        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task_name }),
            });
            
            const newTask = await response.json();
            displayTask(newTask);  
        } catch (err) {
            console.error('Error adding task:', err);
        }
    }

    inputBox.value = "";
}

// Show task on UI
function displayTask(task) {
    let li = document.createElement("li");
    li.innerHTML = task.task_name;
    li.dataset.id = task.id;  

    if (task.completed) {
        li.classList.add("checked");
    }

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    listContainer.appendChild(li);
}

// Fetch Tasks: GET request to load all tasks
async function showTask() {
    try {
        const response = await fetch('http://localhost:3001/tasks');
        const tasks = await response.json();

        listContainer.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = task.task_name;
            li.dataset.id = task.id; 

            if (task.completed) {
                li.classList.add("checked");
            }

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);

            listContainer.appendChild(li);
        });

        reorderTasks();  
    } catch (err) {
        console.error('Error fetching tasks:', err);
    }
}

// Reorder tasks (unchecked on top, checked at the bottom)
function reorderTasks() {
    const listItems = Array.from(listContainer.children);

    const checkedItems = listItems.filter(item => item.classList.contains("checked"));
    const uncheckedItems = listItems.filter(item => !item.classList.contains("checked"));
    
    listContainer.innerHTML = "";
    uncheckedItems.forEach(item => listContainer.appendChild(item));
    checkedItems.forEach(item => listContainer.appendChild(item));
}

// Toggle Task Completion: PUT request to update task completion status
listContainer.addEventListener("click", async function (e) {
    if (e.target.tagName === "LI") {
        const taskId = e.target.dataset.id; 
        const isChecked = e.target.classList.contains("checked");

        try {
            const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'PUT',
            });

            const updatedTask = await response.json();
            e.target.classList.toggle("checked", updatedTask.completed);
            reorderTasks(); 
        } catch (err) {
            console.error('Error toggling task:', err);
        }
    }
    else if (e.target.tagName === "SPAN") {
        const taskId = e.target.parentElement.dataset.id; 

        try {
            // Send DELETE request to remove the task from the backend
            await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'DELETE',
            });

            // Delete task from UI
            e.target.parentElement.remove();
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    }
}, false);

showTask();
