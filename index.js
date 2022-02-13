const formatTodo = (list) => (
    {
        text: list.innerText,
        completed: list.classList.contains("text-decoration-line-through")
    }
);

const saveDataToLocalStorage = () => {
    const lists = document.querySelectorAll("li");
    const todos = [];

    lists.forEach(list => {
        const todo = formatTodo(list);
        todos.push(todo);
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

const createListElement = (text, completed) => {
    const li = document.createElement("li");

    li.innerText = text;
    if (completed) li.classList.add("text-decoration-line-through");

    li.classList.add("list-group-item");

    li.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        li.remove();
        saveDataToLocalStorage();
    });

    li.addEventListener("click", function () {
        li.classList.toggle("text-decoration-line-through");
        saveDataToLocalStorage();
    })

    const ul = document.getElementById("ul");
    ul.appendChild(li);
}

const addTodo = (text, completed) => {
    if (text.length <= 0) return;
    createListElement(text, completed);
}

const main = () => {
    // LocalStorageからtodoを取得する
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) todos.forEach(todo => addTodo(todo.text, todo.completed))

    const form = document.getElementById("form");
    const input = document.getElementById("input");

    // form送信時の処理を登録する
    form.addEventListener("submit", function (event) {
        event.preventDefault();//デフォルトのイベントを発生させない。フォームをサブミットしたときのブラウザのリロードを停止する。

        addTodo(input.value, false);
        saveDataToLocalStorage();
        input.value = "";
    });
}

main();

