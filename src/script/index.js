const colors =  {
    'Low': '#293462',
    'Medium': '#FEB139',
    'High': '#C21010'
}
const add_btn = document.querySelector('#btn-add-task');

const addCard = (_list, _tasks, _priority) =>  {
    const item = document.createElement('li')
    const text = document.createTextNode(_tasks.value)
    item.appendChild(text)
    item.style.background = colors[_priority.value]
    _list.appendChild(item);
}

add_btn.addEventListener('click', () => {
    const list = document.querySelector('.in-progress-tasks-list')
    const task = document.querySelector('#input-task')
    const priority = document.querySelector('#select-item')

    addCard(list, task, priority)
    
    task.value = ''
})