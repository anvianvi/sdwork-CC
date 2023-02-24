import { localArrOfPersons } from "../../app";
import { renderTableContent } from "../render/table-content";

export const sortState = {
  name: true,
  city: true,
  country: true,
  dateOfBirth: true
}

export function toggleSortOrder(property) {
  sortState[property] = !sortState[property];
  localArrOfPersons.sort((a, b) =>
    sortState[property] ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property])
  );
  renderTableContent();
}
