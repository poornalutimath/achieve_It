document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => renderTask(task.text, task.completed));
    };

    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(task => ({
            text: task.querySelector("span").textContent,
            completed: task.classList.contains("completed"),
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const renderTask = (text, completed = false) => {
        const taskItem = document.createElement("li");
        if (completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <span>${text}</span>
            <div>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        `;

        taskItem.querySelector(".complete-btn").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });

        taskList.appendChild(taskItem);
    };

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Task cannot be empty!");
            return;
        }

        renderTask(taskText);
        saveTasks();
        taskInput.value = ""; 
    });

    loadTasks();
});
