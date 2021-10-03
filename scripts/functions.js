const getItems = () => {
  const itemJason = localStorage.getItem("items");
  try {
    return itemJason !== null ? JSON.parse(itemJason) : [];
  } catch (error) {
    return [];
  }
};

const saveItems = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

const toggleItems = (id) => {
  const item = items.find((item) => item.id == id);
  if (item !== undefined) {
    item.exist = !item.exist;
  }
};

const renderItems = (items, filters)=> {
  let filtered ;
  filtered = items.filter((item)=>{
    return item.title.toLowerCase().includes(filters.words.toLowerCase())
  });
  filtered = filtered.filter((item)=>{
    if (filters.undoneItems) {
      return item.exist
    } else {
      return true
    }
  })
  worksArea.innerHTML = "";

  filtered.forEach((item)=> {
    worksArea.appendChild(createItemDOM(item));
  });
};

const createItemDOM = (item) => {
  const itemEl = document.createElement("article");
  const checkbox = document.createElement("input");
  const itemTitle = document.createElement("p");

  checkbox.setAttribute("type", "checkbox");
  itemTitle.textContent = item.title;


  itemEl.appendChild(itemTitle);
  itemEl.appendChild(checkbox);

  checkbox.checked = !item.exist

  if (checkbox.checked) {
    itemEl.classList.add("overline");
  } else {
    itemEl.classList.remove("overline");
  }

  checkbox.addEventListener("change", function () {
    itemEl.classList.toggle("overline");
    toggleItems(item.id)
    saveItems(items)
    renderItems(items , filters)
  });
  return itemEl;
};
