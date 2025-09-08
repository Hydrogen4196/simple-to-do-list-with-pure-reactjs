let inputs = document.querySelector("input");
let btn = document.getElementById("addBtn");
let taskList = document.getElementById("task-list");
let task = [];
let localstoragedata = localStorage.getItem("task array");

if (localstoragedata != null) {
  task = JSON.parse(localstoragedata);
  maketodo();
}

btn.addEventListener("click", function () {
  let query = inputs.value;
  inputs.value = "";
  if (query.trim() === "") {
    alert("No value entered");
    return;
  }
  let taskObj = { id: Date.now(), text: query };
  task.push(taskObj);
  localStorage.setItem("task array", JSON.stringify(task));
  maketodo();
});

function maketodo() {
  taskList.innerHTML = "";
  for (let i = 0; i < task.length; i++) {
    let { id, text } = task[i];
    let element = document.createElement("div");
    element.innerHTML = `
      <span class="task" contenteditable="false">${text}</span>
      <button class='edit'>Edit</button>
      <span class="delete">Delete</span>
    `;
    let delbtn = element.querySelector(".delete");
    let editbtn = element.querySelector(".edit");
    let taskText = element.querySelector(".task");

    // Delete Task
    delbtn.addEventListener("click", function () {
      task = task.filter((taskobj) => taskobj.id != id);
      localStorage.setItem("task array", JSON.stringify(task));
      maketodo();
    });

    // Edit Task
    editbtn.addEventListener("click", function () {
      if (editbtn.innerText === "Edit") {
        taskText.setAttribute("contenteditable", "true");
        taskText.focus();
        editbtn.innerText = "Save";
      } else {
        taskText.setAttribute("contenteditable", "false");
        let updatedText = taskText.innerText.trim();
        if (updatedText !== "") {
          task = task.map((taskobj) => {
            if (taskobj.id === id) {
              taskobj.text = updatedText;
            }
            return taskobj;
          });
          localStorage.setItem("task array", JSON.stringify(task));
        }
        editbtn.innerText = "Edit";
      }
    });

    element.classList.add("todo");
    taskList.appendChild(element);
  }
}
