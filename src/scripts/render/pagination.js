import { renderTableContent } from "./table-content";
// import { currentPage } from "../../app";
import { localArrOfPersons } from "../../app";

export let currentPage = 1;

export function renderPagination() {
  let totalPages = 3
  const paginationContainer = document.getElementById('pagination')

  totalPages = Math.ceil(localArrOfPersons.length / 10)

  if (currentPage > totalPages) currentPage = totalPages;

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
