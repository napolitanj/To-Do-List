import Project from "./project"
import ListItem from "./listItem"

function userInterface() {
    
    //Initialization
    const projectsFolder = document.getElementById("projectsFolder");
    let projects = [] 

    const today = new Project("Today");
    const thisWeek = new Project("This Week")
    const todayLink = document.getElementById("today");
    const weekLink = document.getElementById("week");
    const addTool = document.getElementById("addNewProject")

    todayLink.addEventListener("click", () => activateProject(today))
    weekLink.addEventListener("click", () => activateProject(thisWeek))
    addTool.addEventListener("click", () => addProject())

    //Renders list of projects
    function projectList() {  
        projectsFolder.innerText ="";
        projects.forEach(e => projectsFolder.appendChild(projectLink(e)))
        sP();
    }

    //Creates button in the Project Window to add a new item
    function newItem(project) {
        const newItem = document.createElement("p")
        newItem.classList.add("renderedItem");
        newItem.textContent = "+ Add item";
        newItem.addEventListener("click", () => creationWindow(project));
        return newItem;
    }
    
    //Renders projects in the window when clicked in the menu
    function activateProject(project) {
        const header = document.getElementById("headerText")
        const itemList = document.getElementById("itemList");
        itemList.textContent = "";
        header.textContent = project.name;
        project.items.forEach(item => listItems(project));
        itemList.appendChild(newItem(project));
        sP();
    }

    //Renders list of items for any given project
    function listItems(project) {
        project.items.forEach(item => itemList.appendChild(renderItem(project,item)));
        sP();
    }

    //Creates a link to a project in the menu
    function projectLink(project) {
        const projectName = document.createElement("p")
        projectName.textContent = project.name;
        projectName.addEventListener("click", () => activateProject(project));
        sP();
        return projectName;
    }

    //Renders item created by popup window
    function renderItem(project,item) {
        const newItem = document.createElement("div");
        const newItemText = document.createElement("div");
        const name = paragraph(item.name);
        const description = paragraph(item.description)
        const date = paragraph(item.date);
        const remove = paragraph("X");

        newItem.classList.add("renderedItem")
        newItemText.classList.add("renderedItemText");

        newItemText.appendChild(name)
        newItemText.appendChild(description)
        newItem.appendChild(newItemText);
        newItem.appendChild(date)
        remove.addEventListener("click", () => project.items.splice(item))
        newItem.appendChild(remove);
        
        sP();
        return newItem;
    }

    //Popup window for creation of an item
    function creationWindow(project) {
        const content = document.getElementById("creationWindow");
        const creationWindow = document.createElement("div");
        const buttonWindow = document.createElement("div");
        const datePicker = document.createElement("input");
        const addButton = createButton("Add", "add")
        const cancelButton = createButton("Cancel", "cancel");

        creationWindow.classList.add("creationWindow");
        buttonWindow.classList.add("creationButtons");
        datePicker.setAttribute('type', "date");
        datePicker.setAttribute('id','due');
        addButton.addEventListener("click", () => newListItem(project));
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
    function newListItem(project) {
        
        const content = document.getElementById("creationWindow");
        const item = new ListItem(document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("due").value);

        if (item.title === "" || item.description === "" || item.due === "") {
            alert("Please complete all forms.");
            return;
        }

        content.removeChild(content.firstChild);
        project.items.push(item);
        activateProject(project);
        sP();
    }

    //Function for adding a project
    function addProject(){
        const cancel = document.createElement("p");
        const window = document.createElement("div");
        const input = document.createElement("input");
        addTool.style.visibility = "hidden"
        
        cancel.textContent = "X"
        cancel.addEventListener("click", () => cancelButton());
        
        window.classList.add("projectInputWindow");
        
        input.setAttribute("id","newProject")
        function cancelButton() {
            projectsFolder.removeChild(window)
            addTool.style.visibility="visible";
        }

        //Fires creation of projects
        input.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                const newProject = new Project(input.value);
                projects.push(newProject);
                cancelButton();
                projectList();
                sP();
            }
        })

        window.appendChild(input)
        window.appendChild(cancel)
        projectsFolder.appendChild(window);
       
    }

    //Edit Project Name
    // function editText(text,project) {
    //     let originalText = text.textContent;
    //     text.textContent="";
    //     let input = document.createElement("input");
    //     input.setAttribute("id","newProject")
    //     text.appendChild(input);
    //     input.placeholder = originalText;
    //     return input.addEventListener('keydown', (e) => {
    //         if (e.keyCode === 13) {
    //             let newProjectName = input.value;
    //             text.removeChild(input)
    //             console.log(activeProject,project)
    //             if (activeProject=project){
    //                 project.name = newProjectName;
    //                 text.innerText = newProjectName;
    //                 loadProject(project.load());
    //             }
    //             else {
    //                 project.name = newProjectName;
    //                 text.innerText = newProjectName;
    //             }
    //         }
    //     })
    // }
    
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

    //Save Projects
    function sP() {
        localStorage.setItem('storedProjects',JSON.stringify(projects))
        console.log("store", projects)
    }

    //Load Projects
    function lP(){
        projects = JSON.parse(localStorage.getItem('storedProjects'))
        console.log(projects)
        projectList();
    }

    lP();
}


export default userInterface;