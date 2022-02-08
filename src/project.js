import ListItem from "./listItem"

export default function Project(name) {
    this.name = name;
    this.items = [];
    
    //Renders project to the window
    this.load = function load() {
        console.log(this.name +" loaded")
        const projectPage = document.createElement("div")
        const itemWindow = document.createElement("div")
        itemWindow.setAttribute("id","itemWindow")
        const header = document.createElement("h2");
        header.textContent= this.name;
            
        projectPage.appendChild(header);
        projectPage.appendChild(itemWindow);
        projectPage.appendChild(this.newItemButton());
        this.items.forEach(e => itemWindow.appendChild(e))

        return projectPage;
    }

    //Creates button to add a new item to each project
    this.newItemButton = function() {
        const newItem = document.createElement("p")
        newItem.classList.add("renderedItem");
        newItem.textContent = "+ Add new";
        newItem.addEventListener("click", () => this.creationWindow());

        return newItem;
    }

    //Popup window for creation of an item
    this.creationWindow = function() {
        const content = document.getElementById("creationWindow");
    
        const creationWindow = document.createElement("div");
        creationWindow.classList.add("creationWindow");
    
        const buttonWindow = document.createElement("div");
        buttonWindow.classList.add("creationButtons");
    
        const datePicker = document.createElement("input");
        datePicker.setAttribute('type', "date");
        datePicker.setAttribute('id','due');
        
        const addButton = createButton("Add", "add")
        addButton.addEventListener("click", () => this.newListItem());
        const cancelButton = createButton("Cancel", "cancel");
        cancelButton.addEventListener("click", () => cancelCreation());

        buttonWindow.appendChild(addButton);
        buttonWindow.appendChild(cancelButton);

        creationWindow.appendChild(paragraph("Title:"))
        creationWindow.appendChild(createInputField("title"));
        creationWindow.appendChild(paragraph("Description:"))
        creationWindow.appendChild(createInputField("description"));
        creationWindow.appendChild(paragraph("Due By:"))
        creationWindow.appendChild(datePicker);
    
        creationWindow.appendChild(buttonWindow);
    
        content.appendChild(creationWindow);
        
        return content;
    }

    //Creates a new item using information in the popup window.

    this.newListItem = function() {
        console.log(this.items)
        const content = document.getElementById("creationWindow");
        const item = new ListItem(document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("due").value);

        if (item.title === "" || item.description === "" || item.due === "") {
            alert("Please complete all forms.");
            return;
        }
        content.removeChild(content.firstChild);
        this.items.push(createItem(item));
        this.items.forEach(e => itemWindow.appendChild(e))
    }

    //Renders item created by popup window
    function createItem(item) {

        const newItem = document.createElement("div");
        newItem.classList.add("renderedItem")
        const newItemText = document.createElement("div");
        newItemText.classList.add("renderedItemText");
        
        const name = paragraph(item.name);
        const description = paragraph(item.description)
        const date = paragraph(item.date);
        const remove = paragraph("X");

        remove.addEventListener("click", () => remove.parentElement.remove())
        
        newItemText.appendChild(name)
        newItemText.appendChild(description)
        
        newItem.appendChild(newItemText);
        newItem.appendChild(date)
        newItem.appendChild(remove);
        return newItem;
    }

    //Creates paragraphs
    function paragraph(text) {
        const e = document.createElement("p");
        e.textContent = text;
        return e;
    }
    
    //Creates input fields
    function createInputField(fieldID) {
        const field = document.createElement("input");
        field.setAttribute('id', fieldID)
        return field;
    }
    
    //Creates buttons
    function createButton(buttonText, buttonID) {
        const button = document.createElement("button");
        button.setAttribute('id', buttonID);
        button.textContent = buttonText;
        return button;
    }
    
    //Cancel button for creation window
    function cancelCreation() {
        const content = document.getElementById("creationWindow");
        content.innerText = '';
    }
}
