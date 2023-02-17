import { arrOPersons } from './data-example.js';
let arrOPersonsLocal = arrOPersons

arrOPersonsLocal.forEach((person) => {
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
  atendersCount.textContent = `Attendees (${arrOPersonsLocal.length})`
}

const sortState = {
  name: true,
  city: true,
  country: true,
  dateOfBirth: true
}

function toggleSortOrder(property) {
  sortState[property] = !sortState[property];
  arrOPersonsLocal.sort((a, b) =>
    sortState[property] ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property])
  );
  renderTableContent();
}


function renderTableHeader() {
  const tableHeaderContainer = document.getElementById('table-header');

  const thId = document.createElement('div');
  thId.classList.add('th-id');
  thId.textContent = 'ID';

  const thAvatar = document.createElement('div');
  thAvatar.classList.add('th-avatar');
  thAvatar.textContent = 'Avatar';

  const thName = document.createElement('div');
  thName.classList.add('th-name');
  thName.textContent = 'First name';
  thName.onclick = () => {
    toggleSortOrder('name');
  };

  const thBirthDate = document.createElement('div');
  thBirthDate.classList.add('th-birth-date');
  thBirthDate.textContent = 'Date of birth';
  thBirthDate.onclick = () => {
    toggleSortOrder('dateOfBirth');
  };

  const thCity = document.createElement('div');
  thCity.classList.add('th-city');
  thCity.textContent = 'City';
  thCity.onclick = () => {
    toggleSortOrder('city');
  };

  const thCountry = document.createElement('div');
  thCountry.classList.add('th-country');
  thCountry.textContent = 'Country';
  thCountry.onclick = () => {
    toggleSortOrder('country');
  };

  const thActions = document.createElement('div');
  thActions.classList.add('th-actions');
  thActions.textContent = 'Actions';

  tableHeaderContainer.appendChild(thId);
  tableHeaderContainer.appendChild(thAvatar);
  tableHeaderContainer.appendChild(thName);
  tableHeaderContainer.appendChild(thBirthDate);
  tableHeaderContainer.appendChild(thCity);
  tableHeaderContainer.appendChild(thCountry);
  tableHeaderContainer.appendChild(thActions);
}

function renderTableContent() {
  while (tableContentContainer.firstChild) {
    tableContentContainer.removeChild(tableContentContainer.firstChild);
  }

  arrOPersonsLocal.forEach((person) => {
    const el = document.createElement('div');
    el.className = 'table-element';

    const idEl = document.createElement('div');
    idEl.className = 'el-id';
    idEl.textContent = person.id;
    el.appendChild(idEl);

    const avatarEl = document.createElement('img');
    avatarEl.className = 'el-avatar';
    avatarEl.src = person.avatar;
    avatarEl.alt = 'person avatar';
    el.appendChild(avatarEl);

    const nameEl = document.createElement('div');
    nameEl.className = 'el-name';
    nameEl.textContent = person.name;
    el.appendChild(nameEl);

    const birthDateEl = document.createElement('div');
    birthDateEl.className = 'el-birth-date';
    birthDateEl.textContent = person.dateOfBirth;
    el.appendChild(birthDateEl);

    const cityEl = document.createElement('div');
    cityEl.className = 'el-city';
    cityEl.textContent = person.city;
    el.appendChild(cityEl);

    const countryEl = document.createElement('div');
    countryEl.className = 'el-country';
    countryEl.textContent = person.country;
    el.appendChild(countryEl);

    const actionsEl = document.createElement('div');
    actionsEl.className = 'el-actions';

    const editButtonEl = document.createElement('button');
    editButtonEl.className = 'el-edit';
    editButtonEl.textContent = 'edit';
    actionsEl.appendChild(editButtonEl);

    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.className = 'el-delete';
    deleteButtonEl.textContent = 'delete';
    deleteButtonEl.onclick = () => {
      removeAttender(person.id);
    };
    actionsEl.appendChild(deleteButtonEl);

    el.appendChild(actionsEl);

    tableContentContainer.appendChild(el);
  });
}

function removeAttender(id) {
  const confirmed = confirm('Are you sure you want to delete this attender?');

  if (confirmed) {
    arrOPersonsLocal = arrOPersonsLocal.filter((person) => person.id != id);
    renderAtendersCount();
    renderTableContent();
    console.log(arrOPersonsLocal);
  }
}

renderAtendersCount()
renderTableHeader()
renderTableContent()