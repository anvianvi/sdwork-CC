import { localArrOfPersons } from "../../app"

export function renderAtendersCount() {
  const attenderCountContainer = document.getElementById('attendees-count')
  attenderCountContainer.textContent = `Attendees (${localArrOfPersons.length})`
}
