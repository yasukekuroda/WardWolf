const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const todos = JSON.parse(localStorage.getItem("todos"));

const formatTodo = (list) => (
    {
        text: list.innerText,
        completed: list.classList.contains("text-decoration-line-through")
    }
);

const saveDataToLocalStorage = () => {
    const lists = document.querySelectorAll("li");
    let todos = [];

    lists.forEach(list => {
        const todo = formatTodo(list);
        todos.push(todo);
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

const createListElement = (text, completed) => {
    const li = document.createElement("li");
    li.innerText = text;
    li.classList.add("list-group-item");

    if (completed) li.classList.add("text-decoration-line-through");

    li.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        li.remove();
        saveDataToLocalStorage();
    });

    li.addEventListener("click", function () {
        li.classList.toggle("text-decoration-line-through");
        saveDataToLocalStorage();
    })

    ul.appendChild(li);
    saveDataToLocalStorage();
}

const add = (text, completed) => {
    if (text.length <= 0) return;

    createListElement(text, completed);

    input.value = "";
}

if (todos) {
    todos.forEach(todo => add(todo.text, todo.completed))
}

form.addEventListener("submit", function (event) {
    event.preventDefault();//デフォルトのイベントを発生させない。フォームをサブミットしたときのブラウザのリロードを停止する。
    add(input.value, false);
});
