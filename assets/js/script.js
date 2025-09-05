let listItem = [];

// salva os dados no localstorage.
const storedList = localStorage.getItem("listItem");
if (storedList) {
  listItem = JSON.parse(storedList);
  listItem.forEach((item, index) => {
    addItemDOM(item, index);
  });
}

// função para salvar a lista no localstorage.
function saveList() {
  localStorage.setItem("listItem", JSON.stringify(listItem));
}

// função para adicionar o item na lista.
function addItemDOM(item) {
  const listElement = document.createElement("div");
  const list = document.getElementById("list");
  listElement.className = "list-item";

  const p = document.createElement("p");
  p.textContent = `${item.name} - ${item.category}`;
  listElement.appendChild(p);

  // botão de deletar item.
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delet";
  deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';

  //evento de deletar item.
  deleteBtn.addEventListener("click", () => {
    listItem = listItem.filter((i) => i !== item);
    saveList();
    list.removeChild(listElement);
  });

  //adiciona o botão de deletar ao item da lista.
  listElement.appendChild(deleteBtn);
  list.appendChild(listElement);
}

// função para mostrar mensagem  de erro
function showError(message) {
  let errorContainer = document.createElement("div");
  errorContainer.className = "error-container";

  const span = document.createElement("span");
  span.className = "error";
  span.textContent = message;

  errorContainer.appendChild(span);
  const inputSection = document.querySelector(".input-section");
  inputSection.appendChild(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, 3000);
}

// evento de adicionar item.
document.getElementById("addBtn").addEventListener("click", () => {
  let name = document.getElementById("name").value.trim();
  let category = document.getElementById("category").value.trim();

  if (!name || !category) {
    showError("Por favor, preencha todos os campos!");
    return;
  }

  //verifica se  os  campos não estão vazios.
  if (name && category) {
    const item = { name, category };
    listItem.push(item);

    saveList();
    addItemDOM(item);

    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
  }
});
