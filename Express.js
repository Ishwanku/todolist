document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  
    document.getElementById("current-date").textContent = currentDate;
  
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  
    function renderTodos() {
      const todoList = document.getElementById("todo-list");
      todoList.innerHTML = "";
      storedTodos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item p-3";
  
        const todoItem = document.createElement("div");
        todoItem.className = "form-check";
  
        const checkbox = document.createElement("input");
        checkbox.className = "form-check-input";
        checkbox.id = `todo-${index}`;
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
  
        const label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = `todo-${index}`;
        label.innerHTML = todo.completed
          ? `<s>${todo.text}</s>`
          : todo.text;
  
        todoItem.appendChild(checkbox);
        todoItem.appendChild(label);
  
        listItem.appendChild(todoItem);
  
        todoList.appendChild(listItem);
  
        checkbox.addEventListener("change", () => {
          storedTodos[index].completed = checkbox.checked;
          updateLocalStorage();
          renderTodos();
        });
      });
    }
  
    function addTodo(text) {
      storedTodos.push({ text, completed: false });
      updateLocalStorage();
      renderTodos();
    }
  
    function clearAllTodos() {
      storedTodos.length = 0;
      updateLocalStorage();
      renderTodos();
    }
  
    function updateLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(storedTodos));
    }
  
    renderTodos();
  
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const todoInput = document.getElementById("todo-input");
      const todoText = todoInput.value.trim();
      if (todoText) {
        addTodo(todoText);
        todoInput.value = "";
        todoInput.focus();
      }
    });
  
    const clearAllButton = document.getElementById("clear-all");
    clearAllButton.addEventListener("click", () => {
      clearAllTodos();
    });
  });
  