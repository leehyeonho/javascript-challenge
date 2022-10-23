const toDoForm = document.querySelector(".js-toDoForm"),
    todoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    todoPending = document.querySelector(".Pending"),
    todoFinished = document.querySelector(".Finished");
const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pending = [];
let finished = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const div = li.parentNode;
    div.removeChild(li);
    if (div.className === "Pending") {
        const cleanTodos = pending.filter(function (todo) {
        return todo.id !== parseInt(li.id, 10);
        });
        pending = cleanTodos;
    } else {
        const cleanTodos = finished.filter(function (todo) {
        return todo.id !== parseInt(li.id, 10);
        });
        finished = cleanTodos;
    }
    saveTodos();
}

function createFinBtn() {
    const finBtn = document.createElement("button");
    // finBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    finBtn.innerText = "✅";
    finBtn.addEventListener("click", finishTodo);
    return finBtn;
}

function createUndoBtn(params) {
    const undoBtn = document.createElement("button");
    undoBtn.innerText = "⏮";
    undoBtn.addEventListener("click", UndoTodo);
    return undoBtn;
}

function UndoTodo(e) {
    const btn = e.target;
    const li = btn.parentNode;
    li.removeChild(btn);
    const finBtn = createFinBtn();
    li.appendChild(finBtn);
    todoPending.appendChild(li);
    pending.push(finished[li.id]);
    finished.splice(li.id, 1);
    saveTodos();
}

function finishTodo(e) {
    const btn = e.target;
    const li = btn.parentNode;
    li.removeChild(btn);
    const undoBtn = createUndoBtn();
    li.appendChild(undoBtn);
    todoFinished.appendChild(li);
    finished.push(pending[li.id]);
    pending.splice(li.id, 1);
    saveTodos();
}

function InputPending(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const finBtn = createFinBtn();
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    todoPending.appendChild(li);
    const todoObj = {
      text: text,
      id: 0
    };
    pending.push(todoObj);
    saveTodos();
}

function InputFinished(todoObj) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const undoBtn = createUndoBtn();
    const span = document.createElement("span");
    span.innerText = todoObj.text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(undoBtn);
    todoFinished.appendChild(li);
    finished.push(todoObj);
    saveTodos();
}

function saveTodos() {
    let a = todoPending.querySelectorAll("li");
    let b = todoFinished.querySelectorAll("li");
    for (let i = 0; i < pending.length; i++) {
      pending[i].id = i;
      a[i].id = i;
    }
    for (let i = 0; i < finished.length; i++) {
      finished[i].id = i;
      b[i].id = i;
    }
    localStorage.setItem(PENDING, JSON.stringify(pending));
    localStorage.setItem(FINISHED, JSON.stringify(finished));
  }

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    if (currentValue !== "") {
      InputPending(currentValue);
    }
    todoInput.value = "";
}

function loadTodos() {
    const loadedPending = localStorage.getItem(PENDING);
    const loadedFinished = localStorage.getItem(FINISHED);
    if (loadedPending !== null && loadedFinished !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(function (todo) {
        InputPending(todo.text);
        });
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function (todo) {
        InputFinished(todo);
        });
    }
}

function init() {
    loadTodos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();