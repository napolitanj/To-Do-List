import Project from "./project"

function userInterface() {

    //Projects Folder in DOM
    const activeProjectWindow = document.getElementById("activeProject")
    const projectsFolder = document.getElementById("projectsFolder");

    projectsFolder.classList.add("projectsFolder");
    projectsFolder.appendChild(addTool());

    //Initialization
    
    const projects = []

    const today = new Project("Today");
    const thisWeek = new Project("This Week")
    
    loadProject(today.load());

    const todayLink = document.getElementById("today");
    todayLink.addEventListener("click", () => loadProject(today.load()))
    
    const weekLink = document.getElementById("week");
    weekLink.addEventListener("click", () => loadProject(thisWeek.load()))

    
    
    //Loads selected project to the DOM
    function loadProject(project) {
        activeProjectWindow.innerText='';
        activeProjectWindow.appendChild(project);
    }


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
        projectName.addEventListener("click", () => loadProject(project.load()));
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
    
    //Stores a page
    function storePage(name) {
        localStorage.setItem(String(name), JSON.stringify(projects));
    }
}

export default userInterface;