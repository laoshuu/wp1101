// Outer Frame
let rootNode = document.getElementById("root");

//Section
let sectionNode = document.createElement("section");
sectionNode.classList.add("todo-app__main");
rootNode.appendChild(sectionNode);

//Input
let inputNode = document.createElement("input");
inputNode.classList.add("todo-app__input");
sectionNode.appendChild(inputNode);

//List Container
let listNode = document.createElement("ul");
listNode.classList.add("todo-app__list");
sectionNode.appendChild(listNode);

//Footer
let footerNode = document.createElement("footer");
footerNode.classList.add("todo-app__footer");

//Footer total
let total = document.createElement("div");
total.classList.add("todo-app__total");
footerNode.appendChild(total);

//Footer button
let view_buttons = document.createElement("ul");
view_buttons.classList.add("todo-app__view-buttons");
footerNode.appendChild(view_buttons);

let button1 = document.createElement("button");
button1.textContent = "All";
view_buttons.appendChild(button1);
let button2 = document.createElement("button");
button2.textContent = "Active";
view_buttons.appendChild(button2);
let button3 = document.createElement("button");
button3.textContent = "Completed";
view_buttons.appendChild(button3);


//Footer clean
let clean = document.createElement("div");
clean.classList.add("todo-app__clean");
footerNode.appendChild(clean);


const plans = [];
let unfinish_num = 0;
let true_length = 0;
var buttonExist = false;

class List {
    constructor(order, tags, index) {
        this.node = document.createElement(tags);
        this.node.setAttribute("id", `${index}`);

        let checkBox = document.createElement("div");
        checkBox.classList.add("todo-app__checkbox");

        let label = document.createElement("label");
        let input = document.createElement("input");
        input.type = 'checkbox';

        checkBox.appendChild(input);
        checkBox.appendChild(label);

        let hNode = document.createElement("h1");
        hNode.textContent = order.string;

        let xButton = document.createElement("img");
        xButton.src = "./img/x.png";
        xButton.classList.add("todo-app__item-x");

        this.node.appendChild(checkBox);
        this.node.appendChild(hNode);
        this.node.appendChild(xButton);

        if (order.status === "completed") { input.checked = true; hNode.style = "text-decoration: line-through; opacity: 0.5"; }
        else { input.checked = false; hNode.style = ""; }
        // var done = false;
        checkBox.addEventListener("click", () => {
            if (order.status === "completed") { input.checked = false; order.status = "active"; hNode.style = ""; addEvent(); deleteButton() }
            else { input.checked = true; order.status = "completed"; hNode.style = "text-decoration: line-through; opacity: 0.5"; removeEvent(); addButton(); }
        });

        xButton.addEventListener("click", () => {
            if (order.status === "active") { removeEvent(); }
            deleteEvent(order);
            listNode.removeChild(this.node);
        })
    }
    get itemNode() {
        return this.node;
    }
}

inputNode.addEventListener("keypress", function newList(e) {
    if (e.code === "Enter") {
        var order = { "status": "active", "string": inputNode.value };
        plans.push(order);
        addList();
        inputNode.value = "";
        addEvent();
    }
});

function addList() {
    let iNode = new List(plans[plans.length - 1], "li", plans.length - 1).itemNode;
    iNode.classList.add("todo-app__item");
    listNode.appendChild(iNode);
    true_length++;
}

function addEvent() {
    if (unfinish_num === 0) {
        rootNode.appendChild(footerNode);
    }
    unfinish_num++;
    total.innerText = `${unfinish_num} left`;
}

function removeEvent() {
    unfinish_num--;
    total.innerText = `${unfinish_num} left`;
}

function deleteEvent(order) {
    true_length--;
    if (true_length === 0) {
        rootNode.removeChild(footerNode);
    }
    order.status = "deleted";
}

const button = { "status": "all" };

button1.addEventListener("click", () => {
    resetList();
    for (let i = 0; i < plans.length; i++) {
        let iNode = new List(plans[i], "li", i).itemNode;
        iNode.classList.add("todo-app__item");
        if (plans[i].status != "deleted") listNode.appendChild(iNode);
    }
    button.status = "all";
})

button2.addEventListener("click", () => {
    resetList();
    for (let i = 0; i < plans.length; i++) {
        let iNode = new List(plans[i], "li", i).itemNode;
        iNode.classList.add("todo-app__item");
        if (plans[i].status === "active") listNode.appendChild(iNode);
    }
    button.status = "active";
})

button3.addEventListener("click", () => {
    resetList();
    for (let i = 0; i < plans.length; i++) {
        let iNode = new List(plans[i], "li", i).itemNode;
        iNode.classList.add("todo-app__item");
        if (plans[i].status === "completed") listNode.appendChild(iNode);
    }
    button.status = "completed";
})

function createButton() {
    let clean_button = document.createElement("button");
    clean_button.textContent = "Clear completed";
    clean.appendChild(clean_button);

    clean_button.addEventListener("click", () => {
        resetList();
        for (let i = 0; i < plans.length; i++) {
            if (plans[i].status === "completed") {
                deleteEvent(plans[i]);
            }
            else if (plans[i].status === "active") {
                let iNode = new List(plans[i], "li", i).itemNode;
                iNode.classList.add("todo-app__item");
                listNode.appendChild(iNode);
            }
        }
        deleteButton();
    })
}

function event_completed() {
    var a = 0;
    for (let i = 0; i < plans.length; i++) {
        if (plans[i].status === "completed") { a++; }
    }
    return a;
}

function resetList() {
    while (listNode.firstChild != null) { listNode.removeChild(listNode.firstChild); }
}

function addButton() {
    if (buttonExist === false && event_completed() > 0) {
        createButton();
        buttonExist = true;
    }
}

function deleteButton() {
    if (buttonExist === true && event_completed() === 0) {
        clean.removeChild(clean.firstChild);
        buttonExist = false;
    }
}