//dom elements
const input = document.querySelector("#task-input");
const submitBtn = document.querySelector("#add-btn");
const pendingList = document.querySelector(".pending-list");
const completedList = document.querySelector(".completed-list");
const pendingCount = document.querySelector(".pending-count");
const completedCount = document.querySelector(".completed-count");
const pendingEmptyState = document.querySelector(".pending-empty");
const completedEmptyState = document.querySelector(".completed-empty");

//global state
const tasks = [];

//
loadTasks();

//event listeners
submitBtn.addEventListener("click", () => {
  addTask();
});

//fucntions
// add task

function addTask() {
  let data = input.value.trim();
  if (data === "") {
    console.log("enter task");
    return;
  }

  let taskObject = {
    id: Date.now(),
    text: data,
    status: "pending",
    createdAt: new Date(),
  };
  console.log(taskObject);
  tasks.push(taskObject);
  console.log(tasks);
  saveTasks();
  renderTasks();
  updateCounts();
}

//saveTasks
function saveTasks() {
  const string = JSON.stringify(tasks);
  localStorage.setItem("tasks", string);
}

//createTaskCard
function createTaskCard(task) {
  let actions = "";

  if (task.status === "pending") {
    actions = `
      <button class="complete-btn" data-action="complete">
        Complete
      </button>

      <button class="edit-btn" data-action="edit">
        Edit
      </button>

      <button class="delete-btn" data-action="delete">
        Delete
      </button>
    `;
  } else if (task.status === "completed") {
    actions = `
      <button class="edit-btn" data-action="edit">
        Edit
      </button>

      <button class="delete-btn" data-action="delete">
        Delete
      </button>
    `;
  }

  const html = `
    <article class="task-item" data-task-id="${task.id}">
      <div class="task-content">
      <input class="edit-input" value="Learn JavaScript">
        <p class="task-time">
          ${task.status === "pending" ? "Added" : "Completed"}:
          ${task.createdAt}
        </p>
      </div>

      <div class="task-actions">
        ${actions}
      </div>
    </article>
  `;

  return html;
}
//renderTasks
function renderTasks() {
  // old ui clear
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach((task) => {
    const taskcard = createTaskCard(task);
    if (task.status === "pending") {
      pendingList.insertAdjacentHTML("beforeend", taskcard);
    } else if (task.status === "completed") {
      completedList.insertAdjacentHTML("beforeend", taskcard);
    }
  });

  //empty state ko show/hide karo
  if (pendingList.children.length === 0) {
    pendingEmptyState.style.display = "block";
  } else {
    pendingEmptyState.style.display = "none";
  }

  if (completedList.children.length === 0) {
    completedEmptyState.style.display = "block";
  } else {
    completedEmptyState.style.display = "none";
  }
}

//loadTasks
function loadTasks() {
  const allTasks = localStorage.getItem("tasks");

  if (allTasks) {
    const data = JSON.parse(allTasks);
    tasks.push(...data);
  }

  renderTasks();
  updateCounts();
}
//updateCounts
function updateCounts() {
  let pending = 0;
  let completed = 0;

  tasks.forEach((task) => {
    if (task.status === "pending") {
      pending++;
    } else if (task.status === "completed") {
      completed++;
    }
  });
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}
//parent listener
pendingList.addEventListener("click", (event) => {
  let clickElement = event.target;
  console.log(clickElement);
  if (clickElement.dataset.action === "complete") {
    let article = event.target.closest(".task-item");
    let id = Number(article.dataset.taskId);
    toggleTask(id);
  }
  if (clickElement.dataset.action === "edit") {
    let article = event.target.closest(".task-item");
    let id = Number(article.dataset.taskId);
    let titleElement = article.querySelector(".task-title");
    let text = titleElement.textContent;
    console.log(text);
    editTask(id, text);
  }
});

completedList.addEventListener("click", (event) => {
  let clickElement = event.target;

  if (clickElement.dataset.action === "edit") {
    let article = event.target.closest(".task-item");
    let id = Number(article.dataset.taskId);
    let titleElement = article.querySelector(".task-title");
    let text = titleElement.textContent;
    console.log(text);
    // editTask(id, text);
  }
});

//toggleTask
function toggleTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.status = "completed";
  }
  saveTasks();
  renderTasks();
  updateCounts();
}

//editTask
function editTask(taskId, newText) {
  newText = newText.trim();
  if (!newText) {
    return;
  }
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return;
  }
  task.text = newText;
  saveTasks();
  renderTasks();
}

//deleteTask
