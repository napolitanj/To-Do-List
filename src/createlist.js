import createItem from "./listItem"

function creationWindow(project) {

    const content = document.getElementById("content");
        //-------------------------------------------------

    const creationWindow = document.createElement("div");
    creationWindow.classList.add("creationWindow");

    const buttonWindow = document.createElement("div");
    buttonWindow.classList.add("creationButtons");

    const datePicker = document.createElement("input");
    datePicker.setAttribute('type', "date");
    datePicker.setAttribute('id','due');

    buttonWindow.appendChild(createButton("Add", "add", newListItem));
    buttonWindow.appendChild(createButton("Cancel", "cancel", cancelCreation));

    creationWindow.appendChild(paragraph("Title:"))
    creationWindow.appendChild(createInputField("title"));

    creationWindow.appendChild(paragraph("Description:"))
    creationWindow.appendChild(createInputField("description"));

    creationWindow.appendChild(paragraph("Due By:"))
    creationWindow.appendChild(datePicker);

    creationWindow.appendChild(buttonWindow);

    content.appendChild(creationWindow);

    //Exported function that creates the item.

function newListItem() {

    const content = document.getElementById("content");
    const item = new ListItem(document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("due").value);

    if (item.title === "" || item.description === "" || item.due === "") {
        alert("Please complete all forms.");
        return;
    }
    content.removeChild(content.firstChild);
    project.push(createItem(item))
}

function ListItem(name,description,date) {
    this.name = name
    this.description = description
    this.date = date
}

function paragraph(text) {
    const e = document.createElement("p");
    e.textContent = text;
    return e;
}

function createInputField(fieldID) {
    const field = document.createElement("input");
    field.setAttribute('id', fieldID)
    return field;
}

function createButton(buttonText, buttonID, buttonFunction) {
    const button = document.createElement("button");
    button.setAttribute('id', buttonID);
    button.textContent = buttonText;
    button.addEventListener("click", () =>
        buttonFunction())
    return button;
}

function cancelCreation() {
    const content = document.getElementById("content");
    content.innerText = '';
}
}