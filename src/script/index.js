const colors =  {
    'Low': '#293462',
    'Medium': '#FEB139',
    'High': '#C21010'
}
const add_btn = document.querySelector('#btn-add-task');

const addCard = (_list, _taks, _priority) =>  {
    const item = document.createElement('li')
    const text = document.createTextNode(_taks.value)
    item.appendChild(text)
    item.style.background = colors[_priority.value]
    _list.appendChild(item);
}

add_btn.addEventListener('click', () => {
    const list = document.querySelector('.list-in-progress-tasks')
    const task = document.querySelector('#input-task')
    const priority = document.querySelector('#selec-item')
    
    addCard(list, task, priority)
    
    task.value = ''
})