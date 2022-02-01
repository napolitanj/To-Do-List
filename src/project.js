import creationWindow from "./createlist"

function project(name) {
    this.name = name;
    let items = [addNew()];

    function addNew() {
        const newItem = document.createElement("p")
        newItem.classList.add("renderedItem");
        newItem.textContent = "+ Add new";
        newItem.addEventListener("click", () => creationWindow());

        return newItem;
    }

    function renderProject() {
        const activeList = document.getElementById("activeList");
        const header = document.createElement("h2");
        header.textContent= name;

        activeList.appendChild(header);

        items.forEach(item => activeList.appendChild(item));
    }

    renderProject();
}

function createProject(name) {
    const newProject = new project(name)
    return newProject;
}

export default createProject