
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

function renderTableContent() {
  tableContentContainer.innerHTML = ''
  arrOPersons.forEach((person) => {
    tableContentContainer.innerHTML += `
    <div class="table-element">
    <div class="el-id">${person.id}</div>
    <img src=${person.avatar} alt="person avatar" class="el-avatar">
    <div class="el-name">${person.name}</div>
    <div class="el-birth-date">${person.dateOfBirth}</div> 
    <div class="el-city">${person.city}</div>
    <div class="el-country">${person.country}</div>
    <div class="el-actions">
      <button class="el-edit">edit</button>
      <button class="el-delete" onclick="removeAttender(${person.id})">delite</button>
    </div>
  </div>`;
  })
}

function removeAttender(id) {
  console.log(id)
  arrOPersons = arrOPersons.filter((person) => person.id != id)
  renderAtendersCount()
  renderTableContent()
  console.log(arrOPersons)

}

renderAtendersCount()
renderTableContent()




