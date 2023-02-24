export function togleEdit(id) {
  const targetLine = document.getElementById(`preson-${id}`)
  targetLine.classList.toggle('in-edit')
  const editebleFields = targetLine.querySelectorAll('textarea');
  editebleFields.forEach(field => field.disabled = !field.disabled)
}
