console.log("JS is connected!");

//TO-Do function 

//  Global tasks array (storage मधून load करून ठेवला जातो)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//  LocalStorage मध्ये save करण्यासाठी function
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  Task list render करण्यासाठी function
function renderTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // आधी clear करतो

    tasks.forEach((task, index) => {
        let newLi = document.createElement("li");

        // Task text span
        let textSpan = document.createElement("span");
        textSpan.textContent = task;
        newLi.appendChild(textSpan);

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function () {
            let newValue = prompt("Edit value", task);
            if (newValue) {
                tasks[index] = newValue;
                saveTasks();
                renderTasks(); // पुन्हा refresh
            }
        };
        newLi.appendChild(editBtn);

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
            tasks.splice(index, 1); // array मधून delete
            saveTasks();
            renderTasks(); // पुन्हा refresh
        };
        newLi.appendChild(deleteBtn);

        taskList.appendChild(newLi);
    });
}

//  Add Task function
function addTask() {
    let input = document.getElementById("task-input").value.trim();
    if (input === "") return;

    tasks.push(input);
    saveTasks();
    renderTasks();
    document.getElementById("task-input").value = "";
}

// Add button event
let btn = document.getElementById("add-btn");
btn.addEventListener("click", addTask);

// Enter key press event
let inputBox = document.getElementById("task-input");
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Apply Debounce 
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

//  Filter tasks function
function filterTasks() {
    let filterText = document.getElementById("search-input").value.toLowerCase();
    let items = document.querySelectorAll("#task-list li");

    items.forEach(li => {
        let taskText = li.firstChild.textContent.toLowerCase();
        if (taskText.includes(filterText)) {
            li.style.display = "list-item";
        } else {
            li.style.display = "none";
        }
    });
}

// Attach debounce to search input
let searchBox = document.getElementById("search-input");
searchBox.addEventListener("input", debounce(filterTasks, 300));

//  Page reload झाल्यावर renderTasks()
window.onload = renderTasks;
