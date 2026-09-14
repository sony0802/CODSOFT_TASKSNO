/* =========================================================
   TASKFLOW - TASK MANAGEMENT APPLICATION
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const taskForm = document.getElementById("taskForm");

const taskModal = document.getElementById("taskModal");

const openModalBtn = document.getElementById("openModalBtn");
const emptyAddBtn = document.getElementById("emptyAddBtn");

const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskDueDate = document.getElementById("taskDueDate");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const titleError = document.getElementById("titleError");
const dateError = document.getElementById("dateError");

const titleCounter = document.getElementById("titleCounter");
const descriptionCounter = document.getElementById("descriptionCounter");

const modalTitle = document.getElementById("modalTitle");
const saveTaskBtn = document.getElementById("saveTaskBtn");

const themeBtn = document.getElementById("themeBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================================================
   STATE
========================================================= */

let tasks = JSON.parse(localStorage.getItem("taskflow_tasks")) || [];

let editingTaskId = null;

let toastTimer;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

    setMinimumDate();

    updateCounters();

    renderTasks();

});


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveTasks() {

    localStorage.setItem(
        "taskflow_tasks",
        JSON.stringify(tasks)
    );

}


/* =========================================================
   DATE
========================================================= */

function setMinimumDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    taskDueDate.min = `${year}-${month}-${day}`;

}


/* =========================================================
   MODAL
========================================================= */

function openModal(task = null) {

    taskModal.classList.add("active");

    document.body.style.overflow = "hidden";

    clearErrors();

    if (task) {

        editingTaskId = task.id;

        modalTitle.textContent = "Edit Task";

        saveTaskBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Update Task';

        taskTitle.value = task.title;

        taskDescription.value = task.description;

        taskCategory.value = task.category;

        taskPriority.value = task.priority;

        taskDueDate.value = task.dueDate;

    } else {

        editingTaskId = null;

        modalTitle.textContent = "Create New Task";

        saveTaskBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Save Task';

        taskForm.reset();

        taskCategory.value = "work";
        taskPriority.value = "medium";

    }

    updateCharacterCounters();

    setTimeout(() => taskTitle.focus(), 150);

}


function closeModal() {

    taskModal.classList.remove("active");

    document.body.style.overflow = "";

    taskForm.reset();

    clearErrors();

    editingTaskId = null;

    modalTitle.textContent = "Create New Task";

    saveTaskBtn.innerHTML =
        '<i class="fa-solid fa-check"></i> Save Task';

    updateCharacterCounters();

}


/* =========================================================
   MODAL EVENTS
========================================================= */

openModalBtn.addEventListener("click", () => {

    openModal();

});


emptyAddBtn.addEventListener("click", () => {

    openModal();

});


closeModalBtn.addEventListener("click", closeModal);

cancelModalBtn.addEventListener("click", closeModal);


taskModal.addEventListener("click", (event) => {

    if (event.target === taskModal) {
        closeModal();
    }

});


document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        taskModal.classList.contains("active")
    ) {
        closeModal();
    }

});


/* =========================================================
   FORM VALIDATION
========================================================= */

function validateTaskForm() {

    clearErrors();

    let valid = true;

    const title = taskTitle.value.trim();

    const dueDate = taskDueDate.value;

    if (!title) {

        titleError.textContent =
            "Task title is required.";

        valid = false;

    } else if (title.length < 3) {

        titleError.textContent =
            "Title must contain at least 3 characters.";

        valid = false;

    }


    if (dueDate) {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(dueDate + "T00:00:00");

        if (selectedDate < today) {

            dateError.textContent =
                "Due date cannot be in the past.";

            valid = false;

        }

    }

    return valid;

}


function clearErrors() {

    titleError.textContent = "";

    dateError.textContent = "";

}


/* =========================================================
   ADD / EDIT TASK
========================================================= */

taskForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!validateTaskForm()) {
        return;
    }

    const title = taskTitle.value.trim();

    const description = taskDescription.value.trim();

    const category = taskCategory.value;

    const priority = taskPriority.value;

    const dueDate = taskDueDate.value;


    if (editingTaskId) {

        const task = tasks.find(
            item => item.id === editingTaskId
        );

        if (task) {

            task.title = title;

            task.description = description;

            task.category = category;

            task.priority = priority;

            task.dueDate = dueDate;

            task.updatedAt = Date.now();

            saveTasks();

            renderTasks();

            updateCounters();

            closeModal();

            showToast("Task updated successfully.");

        }

    } else {

        const newTask = {

            id: Date.now().toString(),

            title,

            description,

            category,

            priority,

            dueDate,

            completed: false,

            createdAt: Date.now(),

            updatedAt: Date.now()

        };

        tasks.unshift(newTask);

        saveTasks();

        renderTasks();

        updateCounters();

        closeModal();

        showToast("Task added successfully.");

    }

});


/* =========================================================
   RENDER TASKS
========================================================= */

function renderTasks() {

    const filteredTasks = getFilteredTasks();

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {

        emptyState.classList.add("show");

        return;

    }

    emptyState.classList.remove("show");


    filteredTasks.forEach(task => {

        const taskElement = createTaskElement(task);

        taskList.appendChild(taskElement);

    });

}


/* =========================================================
   FILTERING
========================================================= */

function getFilteredTasks() {

    const searchTerm =
        searchInput.value.trim().toLowerCase();

    const selectedStatus =
        statusFilter.value;

    const selectedCategory =
        categoryFilter.value;

    const selectedSort =
        sortFilter.value;


    let filtered = tasks.filter(task => {

        const matchesSearch =
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm);

        const matchesStatus =
            selectedStatus === "all" ||
            (
                selectedStatus === "completed" &&
                task.completed
            ) ||
            (
                selectedStatus === "pending" &&
                !task.completed
            );

        const matchesCategory =
            selectedCategory === "all" ||
            task.category === selectedCategory;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
        );

    });


    /* Sorting */

    if (selectedSort === "newest") {

        filtered.sort(
            (a, b) => b.createdAt - a.createdAt
        );

    }


    if (selectedSort === "oldest") {

        filtered.sort(
            (a, b) => a.createdAt - b.createdAt
        );

    }


    if (selectedSort === "priority") {

        const priorityValue = {
            high: 1,
            medium: 2,
            low: 3
        };

        filtered.sort(
            (a, b) =>
                priorityValue[a.priority] -
                priorityValue[b.priority]
        );

    }


    if (selectedSort === "dueDate") {

        filtered.sort((a, b) => {

            if (!a.dueDate) return 1;

            if (!b.dueDate) return -1;

            return (
                new Date(a.dueDate) -
                new Date(b.dueDate)
            );

        });

    }


    return filtered;

}


/* =========================================================
   CREATE TASK ELEMENT
========================================================= */

function createTaskElement(task) {

    const article = document.createElement("article");

    article.className =
        `task-card ${task.completed ? "completed" : ""}`;


    /* Checkbox */

    const checkButton = document.createElement("button");

    checkButton.type = "button";

    checkButton.className = "task-check";

    checkButton.setAttribute(
        "aria-label",
        task.completed
            ? "Mark task as pending"
            : "Mark task as completed"
    );

    checkButton.innerHTML = task.completed
        ? '<i class="fa-solid fa-check"></i>'
        : "";


    checkButton.addEventListener("click", () => {

        toggleTask(task.id);

    });


    /* Main */

    const main = document.createElement("div");

    main.className = "task-main";


    const title = document.createElement("h3");

    title.className = "task-title";

    title.textContent = task.title;


    const description = document.createElement("p");

    description.className = "task-description";

    if (task.description) {

        description.textContent = task.description;

    } else {

        description.textContent = "No description added.";

    }


    const meta = document.createElement("div");

    meta.className = "task-meta";


    /* Category */

    const category = document.createElement("span");

    category.className =
        "task-tag category-tag";

    category.textContent = formatLabel(task.category);

    meta.appendChild(category);


    /* Priority */

    const priority = document.createElement("span");

    priority.className =
        `task-tag priority-tag priority-${task.priority}`;

    priority.textContent =
        `${formatLabel(task.priority)} Priority`;

    meta.appendChild(priority);


    /* Due date */

    if (task.dueDate) {

        const dueDate = document.createElement("span");

        dueDate.className = "due-date";

        const isOverdue =
            !task.completed &&
            new Date(task.dueDate + "T00:00:00") <
            new Date(new Date().setHours(0, 0, 0, 0));

        if (isOverdue) {

            dueDate.classList.add("overdue");

        }

        dueDate.innerHTML =
            `<i class="fa-regular fa-calendar"></i>
             ${formatDate(task.dueDate)}
             ${isOverdue ? "· Overdue" : ""}`;

        meta.appendChild(dueDate);

    }


    main.appendChild(title);

    main.appendChild(description);

    main.appendChild(meta);


    /* Actions */

    const actions = document.createElement("div");

    actions.className = "task-actions";


    const editButton = document.createElement("button");

    editButton.type = "button";

    editButton.className = "task-action-btn";

    editButton.title = "Edit task";

    editButton.setAttribute(
        "aria-label",
        "Edit task"
    );

    editButton.innerHTML =
        '<i class="fa-solid fa-pen"></i>';


    editButton.addEventListener("click", () => {

        openModal(task);

    });


    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className =
        "task-action-btn delete";

    deleteButton.title = "Delete task";

    deleteButton.setAttribute(
        "aria-label",
        "Delete task"
    );

    deleteButton.innerHTML =
        '<i class="fa-solid fa-trash"></i>';


    deleteButton.addEventListener("click", () => {

        deleteTask(task.id);

    });


    actions.appendChild(editButton);

    actions.appendChild(deleteButton);


    article.appendChild(checkButton);

    article.appendChild(main);

    article.appendChild(actions);


    return article;

}


/* =========================================================
   TOGGLE TASK
========================================================= */

function toggleTask(id) {

    const task = tasks.find(
        item => item.id === id
    );

    if (!task) return;

    task.completed = !task.completed;

    task.updatedAt = Date.now();

    saveTasks();

    renderTasks();

    updateCounters();

    showToast(
        task.completed
            ? "Task marked as completed."
            : "Task marked as pending."
    );

}


/* =========================================================
   DELETE TASK
========================================================= */

function deleteTask(id) {

    const task = tasks.find(
        item => item.id === id
    );

    if (!task) return;

    const confirmed = confirm(
        `Delete "${task.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
        return;
    }

    tasks = tasks.filter(
        item => item.id !== id
    );

    saveTasks();

    renderTasks();

    updateCounters();

    showToast("Task deleted successfully.");

}


/* =========================================================
   STATISTICS
========================================================= */

function updateCounters() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending =
        total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}


/* =========================================================
   SEARCH & FILTER EVENTS
========================================================= */

searchInput.addEventListener(
    "input",
    renderTasks
);

statusFilter.addEventListener(
    "change",
    renderTasks
);

categoryFilter.addEventListener(
    "change",
    renderTasks
);

sortFilter.addEventListener(
    "change",
    renderTasks
);


/* =========================================================
   CHARACTER COUNTERS
========================================================= */

function updateCharacterCounters() {

    titleCounter.textContent =
        `${taskTitle.value.length}/80`;

    descriptionCounter.textContent =
        `${taskDescription.value.length}/250`;

}


taskTitle.addEventListener(
    "input",
    updateCharacterCounters
);

taskDescription.addEventListener(
    "input",
    updateCharacterCounters
);


/* =========================================================
   FORM ERROR CLEARING
========================================================= */

taskTitle.addEventListener("input", () => {

    if (taskTitle.value.trim()) {
        titleError.textContent = "";
    }

});


taskDueDate.addEventListener("change", () => {

    dateError.textContent = "";

});


/* =========================================================
   FORMAT LABEL
========================================================= */

function formatLabel(value) {

    if (!value) return "";

    return value.charAt(0).toUpperCase() +
        value.slice(1);

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    const date = new Date(
        dateString + "T00:00:00"
    );

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(message) {

    clearTimeout(toastTimer);

    toastMessage.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2600);

}


/* =========================================================
   DARK MODE
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("taskflow_theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "taskflow_theme",
        isDark ? "dark" : "light"
    );


    themeBtn.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});