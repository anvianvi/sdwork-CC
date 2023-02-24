import { localArrOfPersons } from "../../app";
import { togleEdit } from "../secondary-fynctions/edit-button";
import { currentPage } from "./pagination";
import { removeAttender } from "../secondary-fynctions/delite-button";

export function renderTableContent() {
  const tableContentContainer = document.getElementById('table-elements')

  while (tableContentContainer.firstChild) {
    tableContentContainer.removeChild(tableContentContainer.firstChild);
  }

  const startIndex = (currentPage - 1) * 10;
  const endIndex = currentPage * 10;
  const arrOfPersonsToRender = localArrOfPersons.slice(startIndex, endIndex)

  arrOfPersonsToRender.forEach((person) => {
    const el = document.createElement('div');
    el.className = 'table-element';
    el.id = `preson-${person.id}`

    const idEl = document.createElement('div');
    idEl.className = 'el-id';
    idEl.textContent = `#${person.id}`;
    el.appendChild(idEl);

    const elBlankId = document.createElement('div');
    el.appendChild(elBlankId)

    const avatarEl = document.createElement('img');
    avatarEl.className = 'el-avatar';
    avatarEl.src = person.avatar;
    avatarEl.alt = 'person avatar';
    el.appendChild(avatarEl);

    const nameEl = document.createElement('textarea');
    nameEl.className = 'el-name editable';
    nameEl.disabled = true
    nameEl.value = person.name
    el.appendChild(nameEl);

    const birthDateEl = document.createElement('textarea');
    birthDateEl.className = 'el-birth-date editable';
    birthDateEl.disabled = true
    birthDateEl.value = person.dateOfBirth
    el.appendChild(birthDateEl);

    const cityEl = document.createElement('textarea');
    cityEl.className = 'el-city editable';
    cityEl.disabled = true
    cityEl.value = person.city
    el.appendChild(cityEl);

    const countryEl = document.createElement('textarea');
    countryEl.className = 'el-country editable';
    countryEl.disabled = true
    countryEl.value = person.country
    el.appendChild(countryEl);

    const actionsEl = document.createElement('div');
    actionsEl.className = 'el-actions';

    const editButtonEl = document.createElement('button');
    editButtonEl.className = 'el-btn el-edit';
    editButtonEl.onclick = () => {
      togleEdit(person.id);
    };
    actionsEl.appendChild(editButtonEl);

    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.className = 'el-btn el-delete';
    deleteButtonEl.onclick = () => {
      removeAttender(person.id);
    };
    actionsEl.appendChild(deleteButtonEl);

    el.appendChild(actionsEl);

    tableContentContainer.appendChild(el);
  });
}
