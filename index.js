const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const todos = JSON.parse(localStorage.getItem("todos"));

const createListElement = (text, completed) => {
    const li = document.createElement("li");
    li.innerText = text;
    li.classList.add("list-group-item");

    if (completed) li.classList.add("text-decoration-line-through");

    li.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        li.remove();
        savedata();
    });

    li.addEventListener("click", function () {
        li.classList.toggle("text-decoration-line-through");
        savedata();
    })

    ul.appendChild(li);
    savedata();
}

if (todos) {
    todos.forEach(todo => add(todo.text, todo.completed))
}

form.addEventListener("submit", function (event) {
    event.preventDefault();//デフォルトのイベントを発生させない。フォームをサブミットしたときのブラウザのリロードを停止する。
    add(input.value, false);
});




function add(text, completed) {
    if (text.length <= 0) return;

    createListElement(text, completed);

    input.value = "";
}

function savedata() {
    const lists = document.querySelectorAll("li");
    let todos = [];

    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}
