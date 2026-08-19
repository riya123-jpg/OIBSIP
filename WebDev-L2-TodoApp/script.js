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
}

//saveTasks
function saveTasks() {
  const string = JSON.stringify(tasks);
  localStorage.setItem("tasks", string);
}

//createTaskCard
function createTaskCard(task) {
  const html = `
  <article class="task-item" data-task-id="${task.id}">
  <div class="task-content">
    <h3 class="task-title">${task.text}</h3>

    <p class="task-time">
      Added: ${task.createdAt}
    </p>
  </div>

  <div class="task-actions">
    <button class="complete-btn" data-action="complete">
      Complete
    </button>

    <button class="edit-btn" data-action="edit">
      Edit
    </button>

    <button class="delete-btn" data-action="delete">
      Delete
    </button>
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
}
//updateCounts
//toggleTask
//editTask
//deleteTask
