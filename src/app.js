import { arrOfPersons } from './data-example.js';
import './style.css';
import { renderTableHeader } from './scripts/render/table-header.js';
import { renderAtendersCount } from './scripts/render/attender-counter.js';
import { renderTableContent } from './scripts/render/table-content.js';
import { renderPagination } from './scripts/render/pagination.js';

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export let localArrOfPersons = await fetchData('https://63998da716b0fdad77409a5e.mockapi.io/api/v1/hikers') || arrOfPersons;

localArrOfPersons.forEach((person) => {
  const dateString = person.dateOfBirth
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  person.dateOfBirth = `${day}/${month}/${year}`;
})

renderTableHeader()
renderAtendersCount()
renderTableContent()
renderPagination()
