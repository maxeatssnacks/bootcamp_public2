const form = document.querySelector('#newTodoForm');
const newTodo = document.querySelector('input[name="newTodo"');
let list = document.querySelector('#list');

let storage = JSON.parse(localStorage.getItem("todos")) || [];
if (storage.length > 0) {
    let tempStorage = [];
    for (let i = 0; i < storage.length; i++) {
        const newLi = document.createElement('li');
        newLi.innerText = storage[i].taskName;
        newLi.setAttribute("status", storage[i].status);
        if (storage[i].status === "Completed") {
            newLi.style.textDecoration = "line-through";
        }
        const remove = document.createElement('button');
        remove.innerText = "X";
        const space = document.createElement('span');
        space.innerText = "   ";

        tempStorage.push({ taskName: newLi.innerText, status: newLi.getAttribute("status") });

        newLi.appendChild(space);
        newLi.appendChild(remove);
        console.log("This is from storage", newLi)
        list.appendChild(newLi);
    }
    storage = tempStorage;
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(storage));
};


form.addEventListener('submit', function (e) {
    e.preventDefault();

    const newLi = document.createElement('li');
    newLi.innerText = newTodo.value;
    const remove = document.createElement('button');
    remove.innerText = "X";
    const space = document.createElement('span');
    space.innerText = "   ";

    newLi.setAttribute("status", "Incomplete");
    console.log(newLi);

    storage.push({ taskName: newTodo.value, status: newLi.getAttribute("status") });
    localStorage.setItem("todos", JSON.stringify(storage));

    newLi.appendChild(space);
    newLi.appendChild(remove);
    list.appendChild(newLi);

    form.reset();
});

list.addEventListener('click', function (e) {
    let stringToDo = e.target.parentElement.innerText.slice(0, e.target.parentElement.innerText.length - 2);
    console.log(e.target.getAttribute("status"));
    if (e.target.tagName === 'BUTTON') {
        removeToDo(stringToDo);
        e.target.parentElement.remove();
    } else if (e.target.getAttribute("status") === "Incomplete") {
        updateToDo(stringToDo, 'Completed');
        e.target.setAttribute("status", "Completed");
        e.target.style.textDecoration = "line-through";
        console.log('I was incomplete, now I am completed');
    } else if (e.target.getAttribute("status") === "Completed") {
        updateToDo(stringToDo, 'Incomplete');
        e.target.setAttribute("status", "Incomplete");
        e.target.style.textDecoration = "";
        console.log("I was complete, now I am incomplete")
    }
});

function updateToDo(toDo, statusType) {
    for (stored of storage) {
        if (stored.taskName === toDo) {
            stored.status = statusType;
            console.log("Found match");
            console.log(stored);
        }
    }
    console.log(storage);
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(storage));
};

function removeToDo(toDo) {
    let i = 0;
    for (stored of storage) {
        if (stored.taskName === toDo) {
            storage = storage.toSpliced(i, 1);
            localStorage.clear();
            localStorage.setItem("todos", JSON.stringify(storage));
            break;
        }
        i++;
    }
};