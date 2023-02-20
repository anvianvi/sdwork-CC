import { arrOfPersons } from './data-example.js';

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const localArrOfPersons = await fetchData('https://63998da716b0fdad77409a5e.mockapi.io/api/v1/hikers') || arrOfPersons;

localArrOfPersons.forEach((person) => {
  const dateString = person.dateOfBirth
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  person.dateOfBirth = `${day}/${month}/${year}`;
})

const atendersCount = document.getElementById('attendees-count')
const tableContentContainer = document.getElementById('table-elements')

function renderAtendersCount() {
  atendersCount.textContent = `Attendees (${localArrOfPersons.length})`
}

const sortState = {
  name: true,
  city: true,
  country: true,
  dateOfBirth: true
}

function toggleSortOrder(property) {
  sortState[property] = !sortState[property];
  localArrOfPersons.sort((a, b) =>
    sortState[property] ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property])
  );
  renderTableContent();
}


function renderTableHeader() {
  const tableHeaderContainer = document.getElementById('table-header');

  const thId = document.createElement('div');
  thId.textContent = 'ID';

  const thAvatar = document.createElement('div');

  const thName = document.createElement('div');
  thName.textContent = 'First name';
  thName.className = 'th-sort-el';
  thName.onclick = () => {
    toggleSortOrder('name');
  };

  const thBirthDate = document.createElement('div');
  thBirthDate.textContent = 'Date of birth';
  thBirthDate.className = 'th-sort-el';
  thBirthDate.onclick = () => {
    toggleSortOrder('dateOfBirth');
  };

  const thCity = document.createElement('div');
  thCity.textContent = 'City';
  thCity.className = 'th-sort-el';
  thCity.onclick = () => {
    toggleSortOrder('city');
  };

  const thCountry = document.createElement('div');
  thCountry.textContent = 'Country';
  thCountry.className = 'th-sort-el';
  thCountry.onclick = () => {
    toggleSortOrder('country');
  };

  const thActions = document.createElement('div');
  thActions.textContent = 'Actions';

  tableHeaderContainer.appendChild(thId);
  tableHeaderContainer.appendChild(thAvatar);
  tableHeaderContainer.appendChild(thName);
  tableHeaderContainer.appendChild(thBirthDate);
  tableHeaderContainer.appendChild(thCity);
  tableHeaderContainer.appendChild(thCountry);
  tableHeaderContainer.appendChild(thActions);
}
let currentPage = 1;
let totalPages = Math.ceil(localArrOfPersons.length / 10)

function renderPagination() {
  const paginationContainer = document.getElementById('pagination')

  paginationContainer.innerHTML = '';

  const toStartButton = document.createElement('button');
  toStartButton.classList.add('paginationButton')
  toStartButton.textContent = '<<';
  toStartButton.disabled = currentPage === 1;
  toStartButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage = 1
      renderPagination();
    }
  });
  paginationContainer.appendChild(toStartButton);

  const prevButton = document.createElement('button');
  prevButton.classList.add('paginationButton')
  prevButton.textContent = '<';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1
      renderPagination();
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.classList.add('paginationButton')
    pageButton.textContent = i;
    pageButton.disabled = i === currentPage;
    i === currentPage ? pageButton.classList.add('currentPage') : null
    pageButton.addEventListener('click', () => {
      currentPage = i
      renderPagination();
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement('button');
  nextButton.classList.add('paginationButton')
  nextButton.textContent = '>';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage += 1
      renderPagination();
    }
  });
  paginationContainer.appendChild(nextButton);

  const gotoEndButton = document.createElement('button');
  gotoEndButton.classList.add('paginationButton')
  gotoEndButton.textContent = '>>';
  gotoEndButton.disabled = currentPage === 1;
  gotoEndButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage = totalPages
      renderPagination();
    }
  });
  paginationContainer.appendChild(gotoEndButton);

  renderTableContent()
}

function renderTableContent() {
  while (tableContentContainer.firstChild) {
    tableContentContainer.removeChild(tableContentContainer.firstChild);
  }

  const startIndex = (currentPage - 1) * 10;
  const endIndex = currentPage * 10;
  const arrOfPersonsToRender = localArrOfPersons.slice(startIndex, endIndex)

  arrOfPersonsToRender.forEach((person) => {
    const el = document.createElement('div');
    el.className = 'table-element';

    const idEl = document.createElement('div');
    idEl.className = 'el-id';
    idEl.textContent = `#${person.id}`;
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
    localArrOfPersons = localArrOfPersons.filter((person) => person.id != id);
    renderAtendersCount();
    renderTableContent();
    console.log(localArrOfPersons);
  }
}

renderTableHeader()
renderAtendersCount()
renderTableContent()
renderPagination()
