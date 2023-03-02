import { renderAtendersCount } from "../render/attender-counter";
import { renderPagination } from "../render/pagination";
import { renderTableContent } from "../render/table-content";
import { localArrOfPersons } from "../../app";

export function removeAttender(idToDelete) {
  const confirmed = confirm('Are you sure you want to delete this attender?');
  if (confirmed) {

    const index = localArrOfPersons.findIndex(person => person.id === idToDelete);
    localArrOfPersons.splice(index, 1)
    // localArrOfPersons = localArrOfPersons.filter((person) => person.id != id);
    renderAtendersCount();
    renderPagination()
    renderTableContent();
  }
}


// const idToDelete = 2;

// // Find the index of the element with the specified id
// const index = persons.findIndex(person => person.id === idToDelete);

// if (index !== -1) {
//   // Remove the element from the array
//   persons.splice(index, 1);