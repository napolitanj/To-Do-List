import Project from "./project"
import ListItem from "./listItem"
import {format, isToday, startOfToday} from "date-fns"

function userInterface() {
    
    //Initialization
    const projectsFolder = document.getElementById("projectsFolder");
    const itemList = document.getElementById("itemList");
    let projects = [] 
    let today = new Project("Today");
    
    lP();
    projectList();
    updateToday();
    activateProject(today);
    
    const todayLink = document.getElementById("today");
    const addTool = document.getElementById("addNewProject")

    todayLink.addEventListener("click", () => activateProject(today))
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
        const icons = document.getElementById("icons")

        icons.style.display="block";

        editIcon.src = "../dist/images/edit.png";
        trashIcon.src = "../dist/images/trash.png";

        editIcon.addEventListener("click", () => editProjectName(project));
        trashIcon.addEventListener("click", () => deleteProjectPrompt(project))

        if (project.name === "Today") {
            icons.style.display = "none";
        }

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
        projectName.classList.add("menuItem")
        projectName.addEventListener("click", () => activateProject(project));
        sP();
        return projectName;
    }

    //Creates button in the Project Window to add a new item
    function newItem(project) {
        const newItem = document.createElement("p")
        newItem.classList.add("addProject");
        newItem.textContent = "+";
        newItem.addEventListener("click", () => creationWindow(project));
        return newItem;
    }

    //Renders item created by popup window
    function renderItem(project,item) {
        const newItem = document.createElement("div");
        const newItemText = document.createElement("div");
        const dateCancel = document.createElement("div");
        const name = paragraph(item.name);
        const description = paragraph(item.description)
        const date = new Date(item.date);
        const remove = paragraph("X");

        const dateDay = format(date, 'do');
        const dateMonth = format(date, 'MMM');
        const dateString = `${dateMonth} ${dateDay}`
        const dateText = paragraph(dateString)

        newItem.classList.add("renderedItem")
        newItemText.classList.add("renderedItemText");
        dateCancel.classList.add("renderedItemText")
        remove.classList.add("removeItem")
        remove.addEventListener("click", () => deleteItem(newItem,project,item))

        newItemText.appendChild(name)
        dateCancel.appendChild(dateText)
        dateCancel.appendChild(remove);
        newItem.appendChild(newItemText);
        newItem.appendChild(description)
        newItem.appendChild(dateCancel);
       
        return newItem;
    }

    //Removes item from a list
    function deleteItem(e,project,item) {
        let deletedItem = item;
        project.items = project.items.filter((item) => item !== deletedItem)
        itemList.removeChild(e);
        console.log(deletedItem)

        projects.forEach(e => 
            deleteFromToday(e)
        )
        function deleteFromToday(project) {
            project.items.forEach(f => {
                if (f === deletedItem) {
                    console.log(f),
                    project.items = project.items.filter((f) => f !== deletedItem)
                }
            }
        )}
        sP();
    }

    //Popup window for creation of an item
    function creationWindow(project) {
        const popup = document.getElementById("popup");
        const creationWindow = document.createElement("div");
        const buttonWindow = document.createElement("div");
        const datePicker = document.createElement("input");
        const addButton = createButton("Add")
        const cancelButton = createButton("Cancel")

        popup.style.display="block"

        creationWindow.classList.add("creationWindow");
        buttonWindow.classList.add("creationButtons");
        datePicker.setAttribute('type', "date");
        datePicker.setAttribute('id','date');
        addButton.addEventListener("click", () => newListItem(project));
        cancelButton.addEventListener("click", () => cancelCreation());

        buttonWindow.appendChild(addButton);
        buttonWindow.appendChild(cancelButton);
        creationWindow.appendChild(paragraph("Title:"))
        creationWindow.appendChild(createInputField("title"));
        creationWindow.appendChild(paragraph("Description:"))
        creationWindow.appendChild(createInputField("description"));
        if (project !== today) {
            creationWindow.appendChild(paragraph("Due By:"))
            creationWindow.appendChild(datePicker);
        }
        creationWindow.appendChild(buttonWindow);
        popup.appendChild(creationWindow);
        popup.appendChild(fullScreen())
        
        return popup;
    }

    //CLEAN ME
    //Creates a new item using information in the popup window.
    function newListItem(project) {
        if (project !== today) {
            console.log("if")
            const item = new ListItem(document.getElementById("title").value,
                document.getElementById("description").value,
                document.getElementById("date").value + " 00:00");

            if (item.title === "" || item.description === "" || item.date === "") {
                alert("Please complete all forms.");
                return;
            }
            cancelCreation();
        project.items.push(item);
        activateProject(project);
        updateToday();
        sP();
        }
        else {
            console.log("else")
            const item = new ListItem(document.getElementById("title").value,
                document.getElementById("description").value,
                startOfToday());

            if (item.title === "" || item.description === "") {
                alert("Please complete all forms.");
                return;
            }
            cancelCreation();
        project.items.push(item);
        activateProject(project);
        updateToday();
        sP();
        }
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
        const popup = document.getElementById("popup");
        const creationWindow = document.createElement("div");
        const text = paragraph("Are you sure you want to delete the project?")
        const buttonWindow = document.createElement("div");
        const yes = createButton("Yes")
        const no = createButton("No")

        creationWindow.classList.add("creationWindow")
        popup.style.display="block"
        buttonWindow.classList.add("creationButtons")

        creationWindow.appendChild(text);
        creationWindow.appendChild(buttonWindow)
        buttonWindow.appendChild(yes)
        buttonWindow.appendChild(no)
        popup.appendChild(creationWindow)
        popup.appendChild(fullScreen());

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

    //Adds any projects on today's date to today list
    function updateToday() {
        projects.forEach(e => 
            checkForToday(e)
        )
        function checkForToday(project) {
            project.items.forEach(item => {
                if (isToday(new Date(item.date)) === true && today.items.indexOf(item) === -1) {
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
        const popup = document.getElementById("popup");
        popup.innerText = '';
        popup.style.display= "none";
    }

    //Creates shading during popup
    function fullScreen() {
        const fullScreen = document.createElement("div");
        fullScreen.classList.add("fullScreen")

        return fullScreen;
    }

    //Save Projects
    function sP() {
        localStorage.setItem('storedProjects',JSON.stringify(projects))
    }

    //Load Projects
    function lP(){
        projects = JSON.parse(localStorage.getItem('storedProjects'))
    }

}


export default userInterface;