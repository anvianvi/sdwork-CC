arrOPersons.forEach((person) => {
  const dateString = person.dateOfBirth
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  person.dateOfBirth = `${day}/${month}/${year}`;
})

const main = document.getElementById('main')
const atendersCount = document.getElementById('attendees-count')
const tableContentContainer = document.getElementById('table-elements')

function renderAtendersCount() {
  atendersCount.textContent = `Attendees (${arrOPersons.length})`
}
function sortDataByNameAZ() {
  arrOPersons.sort((a, b) => a.name.localeCompare(b.name));
}
let sortState = [
  nameOrderAZ = true,
  cityOrderAZ = true,
  countryOrderAZ = true,
  dateOrderAZ = true
]

function toggleNameSortOrder() {
  sortState.nameOrderAZ = !sortState.nameOrderAZ;
  arrOPersons.sort((a, b) =>
    sortState.nameOrderAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  renderTableContent();
} 

function renderTableContent() {
  while (tableContentContainer.firstChild) {
    tableContentContainer.removeChild(tableContentContainer.firstChild);
  }

  arrOPersons.forEach((person) => {
    const el = document.createElement("div");
    el.className = "table-element";

    const idEl = document.createElement("div");
    idEl.className = "el-id";
    idEl.textContent = person.id;
    el.appendChild(idEl);

    const avatarEl = document.createElement("img");
    avatarEl.className = "el-avatar";
    avatarEl.src = person.avatar;
    avatarEl.alt = "person avatar";
    el.appendChild(avatarEl);

    const nameEl = document.createElement("div");
    nameEl.className = "el-name";
    nameEl.textContent = person.name;
    el.appendChild(nameEl);

    const birthDateEl = document.createElement("div");
    birthDateEl.className = "el-birth-date";
    birthDateEl.textContent = person.dateOfBirth;
    el.appendChild(birthDateEl);

    const cityEl = document.createElement("div");
    cityEl.className = "el-city";
    cityEl.textContent = person.city;
    el.appendChild(cityEl);

    const countryEl = document.createElement("div");
    countryEl.className = "el-country";
    countryEl.textContent = person.country;
    el.appendChild(countryEl);

    const actionsEl = document.createElement("div");
    actionsEl.className = "el-actions";

    const editButtonEl = document.createElement("button");
    editButtonEl.className = "el-edit";
    editButtonEl.textContent = "edit";
    actionsEl.appendChild(editButtonEl);

    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.className = "el-delete";
    deleteButtonEl.textContent = "delete";
    deleteButtonEl.onclick = function () {
      removeAttender(person.id);
    };
    actionsEl.appendChild(deleteButtonEl);

    el.appendChild(actionsEl);

    tableContentContainer.appendChild(el);
  });
}

function removeAttender(id) {
  const confirmed = confirm("Are you sure you want to delete this attender?");

  if (confirmed) {
    arrOPersons = arrOPersons.filter((person) => person.id != id);
    renderAtendersCount();
    renderTableContent();
    console.log(arrOPersons);
  }
}

renderAtendersCount()
renderTableContent()