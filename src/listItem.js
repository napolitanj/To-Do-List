function renderItem(item) {
    const currentList = document.getElementById("activeList")
    currentList.classList.add("activeList");

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
    remove.addEventListener("click", () => currentList.removeChild(newItem))


    newItemText.appendChild(name)
    newItemText.appendChild(description)

    newItem.appendChild(newItemText);
    newItem.appendChild(date)
    newItem.appendChild(remove);

    currentList.appendChild(newItem)

    return currentList;

}

export default renderItem;