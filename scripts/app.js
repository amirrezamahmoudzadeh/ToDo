const worksArea = document.querySelector(".works");
let items = getItems()

let filters = {
  words: "",
  undoneItems : false ,
}

renderItems(items, filters);

document.querySelector("#search-input").addEventListener("input", (e) => {
  filters.words = e.target.value;
  renderItems(items, filters)
});

document.querySelector('#check-input').addEventListener('change', (e) => {
  filters.undoneItems = e.target.checked
  renderItems(items, filters)
})

document.querySelector(".add-item").addEventListener("submit", (e) => {
  if (e.target.elements.addInput.value) {
    e.preventDefault();
  const id = uuidv4()
  const time = moment().valueOf()

  items.push({
    title: e.target.elements.addInput.value,
    exist: true,
    id : id,
    time : time,
  });
  saveItems(items);
  renderItems(items, filters);
  e.target.elements.addInput.value = "";
  } else {
    return
  }
});
