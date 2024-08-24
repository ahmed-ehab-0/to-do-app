let input = document.querySelector(".form input[type='text']");
let addBtn = document.querySelector(".form input[type='submit']");
let tasksDiv = document.querySelector(".tasks");

let tasksArr = [];

if (window.localStorage.tasks) {
  tasksArr = JSON.parse(window.localStorage.tasks);
  createTaskDiv(tasksArr);
}

addBtn.onclick = function () {
  if (input.value) {
    addTaskToArray(input.value);
    input.value = "";
  }
};

document.onkeyup = (e) => {
  if (e.key === "Enter" && input.value) {
    addTaskToArray(input.value);
    input.value = "";
  }
};

tasksDiv.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("task")) {
    changeCompletedStatus(ev.target.getAttribute("data-id"));
    ev.target.classList.toggle("done");
  }
  if (ev.target.classList.contains("del")) {
    tasksArr = tasksArr.filter(
      (task) => ev.target.parentElement.getAttribute("data-id") != task.id
    );
    window.localStorage.setItem("tasks", JSON.stringify(tasksArr));
    ev.target.parentElement.remove();
    if (tasksArr.length === 0) {
      tasksDiv.style.display = "none";
    }
  }
});

function addTaskToArray(taskText) {
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  tasksArr.push(task);
  createTaskDiv(tasksArr);
  window.localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function createTaskDiv(tasksArr) {
  tasksDiv.innerHTML = "";
  tasksArr.forEach((task) => {
    let div = document.createElement("div");
    div.className = task.completed ? "task done" : "task";
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let del = document.createElement("span");
    del.className = "del";
    del.appendChild(document.createTextNode("Delete"));

    div.appendChild(del);
    tasksDiv.appendChild(div);
  });
  if (tasksArr.length !== 0) {
    tasksDiv.style.display = "block";
  }
}

function changeCompletedStatus(taskId) {
  for (let i = 0; i < tasksArr.length; i++) {
    if (tasksArr[i].id == taskId) {
      tasksArr[i].completed
        ? (tasksArr[i].completed = false)
        : (tasksArr[i].completed = true);
    }
  }
  window.localStorage.setItem("tasks", JSON.stringify(tasksArr));
}
