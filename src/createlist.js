import renderItem from "./listItem"
import appendToProject from "./project"

function creationWindow() {

        //-------------------------------------------------
        const testing = document.getElementById("testing");
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

    testing.appendChild(creationWindow);

    return testing;
}

function listItem(name,description,date) {
    this.name = name
    this.description = description
    this.date = date
}

function newListItem() {
    const testing = document.getElementById("testing");
    const item = new listItem(document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("due").value);

    if (item.title === "" || item.description === "" || item.due === "") {
        alert("Please complete all forms.");
        return;
    }
    renderItem(item);
    testing.removeChild(testing.firstChild);
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
        buttonFunction());
    return button;
}

function cancelCreation() {
    const testing = document.getElementById("testing");
    testing.innerText = '';
}

export default creationWindow;