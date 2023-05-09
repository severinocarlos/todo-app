const colors =  {
    'Low': '#293462',
    'Medium': '#FEB139',
    'High': '#C21010'
}
const key = 'tasks'
const add_btn = document.querySelector('#btn-add-task');

const getItems = () => {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

const showCards = () =>  {
    const list = document.querySelector('.in-progress-tasks-list')
    let tasks = getItems()
    list.innerHTML = ''
    
    tasks.forEach(task => {
        console.log(colors[task.priority])
        list.innerHTML += `<li style="background:${colors[task.priority]};">${task.task}</li>`
    });
}

add_btn.addEventListener('click', () => {
    const task = document.querySelector('#input-task')
    const priority = document.querySelector('#select-item')

    if (!task.value) {
        alert('Please, write some task')
    } else {
        let tasks = getItems()
        tasks.push({
            task: task.value,
            priority: priority.value
        })
        localStorage.setItem(key, JSON.stringify(tasks));
        showCards()
    }
    task.value = ''
})

showCards()