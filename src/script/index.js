const colors =  {
    'Low': '#293462',
    'Medium': '#FEB139',
    'High': '#C21010'
}
const key = 'tasks'
const addButton = document.querySelector('#btn-add-task');

const getItems = () => {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

const setItems = (_tasks) => {
    localStorage.setItem(key, JSON.stringify(_tasks));
}

const showCards = () =>  {
    const list = document.querySelector('.in-progress-tasks-list')
    let tasks = getItems()
    list.innerHTML = ''
    
    tasks.forEach(task => {
        list.innerHTML += `<li style="background:${colors[task.priority]};">
                                ${task.task_name}
                                <div >
                                    <button id="btn-move-to-trash" onclick="removeCard('${task.task_name}')" style="background: transparent; border:0; cursor: pointer; outline: none;">
                                        <img style="width:1rem; height: 1rem; margin-right: 1rem;"src="${'./assets/img/cross.png'}" alt="Move to trash"/>
                                    </button>
                                    <button id="btn-move-to-done" onclick="doneCard('${task.task_name}')" style="background: transparent; border:0; cursor: pointer; outline: none;">
                                        <img style="width:1rem; height: 1rem;"src="${'./assets/img/check.png'}" alt="Done task"/>
                                    </button>
                                <div>
                            </li>`
    });
}

addButton.addEventListener('click', () => {
    const task = document.querySelector('#input-task')
    const priority = document.querySelector('#select-item')

    if (!task.value) {
        alert('Please, write some task')
    } else {
        let tasks = getItems()
        tasks.push({
            task_name: task.value,
            priority: priority.value
        })
        setItems(tasks)
        showCards()
    }
    task.value = ''
})

const getCard = (tasks, titleCard) => {
    let index = tasks.findIndex(task => task.task_name == titleCard)
    return index, tasks
}

const removeCard = (_name, _tasks) => {
    let tasks = getItems()
    let index = getCard(tasks, _name)
    tasks.splice(index, 1);
    setItems(tasks)
    showCards()
}

// const doneCard = (_name) => {
//     let tasks = getItems()
//     let index = tasks.findIndex(task => task.task_name == _name)

// }

showCards()