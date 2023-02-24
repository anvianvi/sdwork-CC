import { toggleSortOrder } from "../secondary-fynctions/toggle-sort-order";

export function renderTableHeader() {
  const tableHeaderContainer = document.getElementById('table-header');

  const thId = document.createElement('div');
  const thAvatar = document.createElement('div');

  const thName = document.createElement('div');
  thName.textContent = 'Name  ↑↓';
  thName.className = 'th-sort-el';
  thName.onclick = () => {
    toggleSortOrder('name');
  };

  const thBirthDate = document.createElement('div');
  thBirthDate.textContent = 'Date of birth  ↑↓';
  thBirthDate.className = 'th-sort-el';
  thBirthDate.onclick = () => {
    toggleSortOrder('dateOfBirth');
  };

  const thCity = document.createElement('div');
  thCity.textContent = 'City  ↑↓';
  thCity.className = 'th-sort-el';
  thCity.onclick = () => {
    toggleSortOrder('city');
  };

  const thCountry = document.createElement('div');
  thCountry.textContent = 'Country  ↑↓';
  thCountry.className = 'th-sort-el';
  thCountry.onclick = () => {
    toggleSortOrder('country');
  };

  const thActions = document.createElement('div');

  tableHeaderContainer.appendChild(thId);
  tableHeaderContainer.appendChild(thAvatar);
  tableHeaderContainer.appendChild(thName);
  tableHeaderContainer.appendChild(thBirthDate);
  tableHeaderContainer.appendChild(thCity);
  tableHeaderContainer.appendChild(thCountry);
  tableHeaderContainer.appendChild(thActions);
}
