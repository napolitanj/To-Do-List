import Project from "./project"
import ListItem from "./listItem.js"

function userInterface() {

    //Projects Folder in Dom and array that stores them for loading
    const projectsFolder = document.getElementById("projectsFolder");
    projectsFolder.classList.add("projectsFolder");
    projectsFolder.appendChild(addTool());
    const projects = []

    //Creates button to add a new project 
    function addTool() {
        const addTool = document.createElement("p");
        addTool.classList.add("hoverItem")
        addTool.setAttribute("id","addNewProject")
        addTool.innerText = "+ Add Project";
        addTool.addEventListener("click", () => newProjectInput())
        return addTool;
    }
    
    //Clickable link in projects folder upon creation
    function projectLink(project) {
        const projectName = document.createElement("p")
        projectName.textContent = project.name;
        projectName.addEventListener("click", () => loadProject(project));
        return projectName;
    }

    //Function for adding a project
    function newProjectInput(){
        
        //Window + input and cancel button
        const cancel = document.createElement("p");
        cancel.textContent = "X"
        cancel.addEventListener("click", () => cancelButton());
        projectsFolder.removeChild(addNewProject)
        const window = document.createElement("div");
        window.classList.add("projectInputWindow");
        const input = document.createElement("input");
        input.setAttribute("id","newProject")
        function cancelButton() {
            projectsFolder.removeChild(window)
            projectsFolder.appendChild(addTool())
        }

        //Fires creation of projects
        input.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                const newProject = new Project(input.value);
                projects.push(newProject);
                projectsFolder.appendChild(projectLink(newProject));
                cancelButton();
                console.log(projects)
            }
        })

        window.appendChild(input)
        window.appendChild(cancel)
        projectsFolder.appendChild(window);
    }

    //Renders link in DOM folder
    function projectLink(project) {
        const projectName = document.createElement("p")
        projectName.textContent = project.name;
        projectName.addEventListener("click", () => loadProject(project));
    
        return projectName;
    }

    //Renders project to the window
    function loadProject(project) {
        const activeProject = document.getElementById("activeProject")
        activeProject.textContent="";
        
        const projectPage = document.createElement("div")
        const itemWindow = document.createElement("div")
        itemWindow.setAttribute("id","itemWindow")
        const header = document.createElement("h2");
        header.textContent= project.name;
            
        projectPage.appendChild(header);
        projectPage.appendChild(itemWindow);
        projectPage.appendChild(newItemButton());

        activeProject.appendChild(projectPage)
    
        return activeProject;
    }

    function newItemButton() {
        const newItem = document.createElement("p")
        newItem.classList.add("renderedItem");
        newItem.textContent = "+ Add new";
        newItem.addEventListener("click", () => creationWindow());

        return newItem;
    }

    //Popup window for creation of an item
    function creationWindow() {

        const content = document.getElementById("content");
    
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
    
        return content;
    }

    //Renders item created by popup window
    function createItem(item) {

        const newItem = document.createElement("div");
        newItem.classList.add("renderedItem")
    
        const newItemText = document.createElement("div");
        newItemText.classList.add("renderedItemText");
    
        const name = document.createElement("p")
        name.textContent = item.name;
    
        const description = document.createElement("p")
        description.textContent = item.description;
    
        const date = document.createElement("p");
        date.textContent = item.date;
    
        const remove = document.createElement("p");
        remove.textContent = "X";
        remove.addEventListener("click", () => remove.parentElement.remove())
    
    
        newItemText.appendChild(name)
        newItemText.appendChild(description)
    
        newItem.appendChild(newItemText);
        newItem.appendChild(date)
        newItem.appendChild(remove);
    
        return newItem;

    }

    //Creates a new item using information in the popup window.

    function newListItem() {
        const content = document.getElementById("content");
        const itemWindow = document.getElementById("itemWindow")
        const item = new ListItem(document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("due").value);

        if (item.title === "" || item.description === "" || item.due === "") {
            alert("Please complete all forms.");
            return;
        }
        content.removeChild(content.firstChild);
        itemWindow.appendChild(createItem(item))
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

export default userInterface;