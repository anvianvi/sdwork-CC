import { renderTableContent } from "../render/table-content";

export function togleEdit(id) {
  const targetLine = document.getElementById(`person-${id}`)
  targetLine.classList.add('in-edit')
  const editebleFields = targetLine.querySelectorAll('input');
  editebleFields.forEach(field => field.disabled = !field.disabled)

  const row = document.getElementById(`person-${id}`)
  const buttonsBlock = row.querySelector('.el-actions')

  const canselEditingBlock = document.createElement('div')
  canselEditingBlock.className = 'canselEditingBlock';
  buttonsBlock.appendChild(canselEditingBlock)

  const saveChanges = document.createElement('button');
  saveChanges.className = 'saveChanges el-btn';
  saveChanges.onclick = () => {
    buttonsBlock.removeChild(canselEditingBlock);
    targetLine.classList.remove('in-edit')
    editebleFields.forEach(field => field.disabled = !field.disabled)
  };

  const declineChanges = document.createElement('button');
  declineChanges.className = 'declineChanges el-btn';
  declineChanges.onclick = () => {
    renderTableContent()
  };

  canselEditingBlock.appendChild(saveChanges)
  canselEditingBlock.appendChild(declineChanges)

}
