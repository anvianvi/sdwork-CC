
// fetch('https://63998da716b0fdad77409a5e.mockapi.io/api/v1/hikers')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     const arrOPersons = data
//   });


console.log(arrOPersons)
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
    <div class="el-avatar">my avatar</div>
    <div class="el-name">first name</div>
    <div class="el-birth-date">01.02.03</div>
    <div class="el-city">krakow</div>
    <div class="el-country">belarus</div>
    <div class="el-actions">
      <div class="el-edit">edit</div>
      <div class="el-delete">delite</div>
    </div>
  </div>`;
  })

}


renderAtendersCount()
renderTableContent()