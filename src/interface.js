import Project from "./project"
import ListItem from "./listItem"
import {toDate, isToday} from "date-fns"

function userInterface() {
    
    //Initialization
    const projectsFolder = document.getElementById("projectsFolder");
    const itemList = document.getElementById("itemList");
    let projects = [] 
    let today = new Project("Today");
    let thisWeek = new Project("This Week");
    
    lP();
    projectList();
    
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
    
    //Renders projects in the window when clicked in the menu
    function activateProject(project) {
        const editIcon = document.getElementById("editIcon");
        const trashIcon = document.getElementById("trashIcon");
        const projectHeader = document.getElementById("headerText")

        editIcon.src = "../dist/images/edit.png";
        trashIcon.src = "../dist/images/trash.png";

        editIcon.addEventListener("click", () => editProjectName(project));
        trashIcon.addEventListener("click", () => deleteProjectPrompt(project))

        projectHeader.textContent = project.name;
        clearAndRender(project);

        sP();
    }

    //Clear item list and render
    function clearAndRender(project) {
        itemList.textContent = "";
        listItems(project);
        itemList.appendChild(newItem(project));
    }

    //Renders list of items for any given project
    function listItems(project) {
        project.items.forEach(item => itemList.appendChild(renderItem(project,item), sP()));
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

    //Creates button in the Project Window to add a new item
    function newItem(project) {
        const newItem = document.createElement("p")
        newItem.classList.add("renderedItem");
        newItem.textContent = "+ Add item";
        newItem.addEventListener("click", () => creationWindow(project));
        return newItem;
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
        newItem.appendChild(remove);
        remove.addEventListener("click", () => deleteItem(newItem,project,item))
        console.log(project.items)
        return newItem;
    }

    //Removes item from a list
    function deleteItem(e,project,item) {
        let deletedItem = item;
        project.items = project.items.filter((item) => item !== deletedItem)
        itemList.removeChild(e);
        sP();
    }

    //Popup window for creation of an item
    function creationWindow(project) {
        const popup = document.getElementById("creationWindow");
        const creationWindow = document.createElement("div");
        const buttonWindow = document.createElement("div");
        const datePicker = document.createElement("input");
        const addButton = createButton("Add")
        const cancelButton = createButton("Cancel")

        creationWindow.classList.add("creationWindow");
        buttonWindow.classList.add("creationButtons");
        datePicker.setAttribute('type', "date");
        datePicker.setAttribute('id','date');
        addButton.addEventListener("click", () => newListItem(project));
        cancelButton.addEventListener("click", () => cancelCreation());
        popup.style.padding = "20px;"

        buttonWindow.appendChild(addButton);
        buttonWindow.appendChild(cancelButton);
        creationWindow.appendChild(paragraph("Title:"))
        creationWindow.appendChild(createInputField("title"));
        creationWindow.appendChild(paragraph("Description:"))
        creationWindow.appendChild(createInputField("description"));
        creationWindow.appendChild(paragraph("Due By:"))
        creationWindow.appendChild(datePicker);
        creationWindow.appendChild(buttonWindow);
        popup.appendChild(creationWindow);
        
        return popup;
    }

    //Creates a new item using information in the popup window.
    function newListItem(project) {
        
        const content = document.getElementById("creationWindow");
        const item = new ListItem(document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("date").value);

        if (item.title === "" || item.description === "" || item.date === "") {
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
        addTool.style.visibility = "hidden";
        
        cancel.textContent = "X";
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

    //Edit Project name
    function editProjectName(project) {
        const headerText = document.getElementById("headerText")
        const originalText = headerText.textContent;
        const editIcon = document.getElementById("editIcon");
        const trashIcon = document.getElementById("trashIcon");

        let input = document.createElement("input");
        
        input.placeholder = originalText;
        headerText.textContent="";
        headerText.appendChild(input);

        editIcon.src="";
        trashIcon.src="";
    
        return input.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                if (input.value === "") {
                    alert("You must give your project a name");
                    return
                }
                else
                project.name = input.value;
                headerText.removeChild(input)
                activateProject(project);
                projectList();
            }
        })
    }

    //Confirmation prompt for deletion
    function deleteProjectPrompt(project) {
        cancelCreation();
        const popup = document.getElementById("creationWindow");
        const text = paragraph("Are you sure you want to delete the project?")
        const buttonWindow = document.createElement("div");
        const yes = createButton("Yes")
        const no = createButton("No")

        popup.classList.add("creationWindow")
        popup.style.padding = "20px";
        buttonWindow.classList.add("creationButtons")

        popup.appendChild(text);
        popup.appendChild(buttonWindow)
        buttonWindow.appendChild(yes)
        buttonWindow.appendChild(no)

        yes.addEventListener("click", () => deleteProject(project))
        no.addEventListener("click", () => cancelCreation())
    }
    
    //Deletes the project
    function deleteProject(project) {
        cancelCreation();
        projects = projects.filter(e => e.name !== project.name)
        refreshDisplay();
        sP();
    }

    function refreshDisplay() {
        const editIcon = document.getElementById("editIcon");
        const trashIcon = document.getElementById("trashIcon");
        const projectHeader = document.getElementById("headerText")

        editIcon.src="";
        trashIcon.src="";
        projectHeader.innerText="";
        itemList.innerText="";

        projectList();
    }
    //START HERE updating today
    //Adds any projects on today's date to today list
    function updateToday() {
        projects.forEach(e => 
            checkForToday(e)
        )
        function checkForToday(project) {
            project.items.forEach(item => {
                let date = new Date();
                console.log(date)
                date = date.setHours(date.getHours() - 3)
                console.log(typeof(date),date,isToday(date))
                console.log(date.toUTCString())
                if (item.date === todaysDate) {
                    today.items.push(item)
                    sP();
                }
            })
        }
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
    function createButton(buttonText) {
        const button = document.createElement("button");
        button.textContent = buttonText;
        return button;
    }
    
    //Cancel button for creation window
    function cancelCreation() {
        const popup = document.getElementById("creationWindow");
        popup.innerText = '';
        popup.style.padding= "0px";
    }

    //Save Projects
    function sP() {
        localStorage.setItem('storedProjects',JSON.stringify(projects))
    }

    //Load Projects
    function lP(){
        projects = JSON.parse(localStorage.getItem('storedProjects'))
        projectList();
        updateToday();
    }

}


export default userInterface;