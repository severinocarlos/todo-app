const colors =  {
    'Low': '#003049',
    'Medium': '#f77f00',
    'High': '#d62828'
}
const inProgressTasksKey = 'inProgressTasks'
const doneTasksKey = 'DoneTasks'
const addButton = document.querySelector('#btn-add-task');

const getItems = () => {
    return  {
                inProgressTasks: JSON.parse(localStorage.getItem(inProgressTasksKey) || '[]'), 
                doneTasks: JSON.parse(localStorage.getItem(doneTasksKey) || '[]')
            }
}

const setItems = (_tasks, key) => {
    localStorage.setItem(key, JSON.stringify(_tasks));
}

const showCards = () =>  {
    const inProgressList = document.querySelector('.in-progress-tasks-list')
    const doneList = document.querySelector('.done-tasks-list')
    let { inProgressTasks, doneTasks } = getItems()

    inProgressList.innerHTML = ''
    doneList.innerHTML = ''
    const day = new Date();

    inProgressTasks.forEach(task => {
        inProgressList.innerHTML += `<li style="background:${colors[task.priority]}; word-wrap: wrap;">task:<br>
                                ${task.task_name}
                                <div class='btns'>
                                    <button id="btn-move-to-trash" onclick="removeCard('${task.task_name}')" style="background: transparent; border:0; cursor: pointer; outline: none; margin-bottom: 1rem; padding-right: 0.5rem;">
                                        <img style="width:1rem; height: 1rem; margin-right: 1rem;"src="${'./assets/img/cross.png'}" alt="Move to trash"/>
                                    </button>
                                    <button id="btn-move-to-done" onclick="doneCard('${task.task_name}')" style="background: transparent; border:0; cursor: pointer; outline: none;">
                                        <img style="width:1rem; height: 1rem;"src="${'./assets/img/check.png'}" alt="Done task"/>
                                    </button>
                                    <p>${day.toLocaleDateString('pt-PT')}</p>
                                <div>
                                </li>`

        
    });

    doneTasks.forEach(task => {
        doneList.innerHTML += `<li style="background:${colors[task.priority]}; word-wrap: wrap;">
                                    ${task.task_name}
                                    <p>${day.toLocaleDateString('pt-PT')}</p>
                                </li>`
    })

}

addButton.addEventListener('click', () => {
    const task = document.querySelector('#input-task')
    const priority = document.querySelector('#select-item')

    if (!task.value) {
        alert('Please, write some task')
    } else {
        let { inProgressTasks, doneTasks } = getItems()
        inProgressTasks.push({
            task_name: task.value,
            priority: priority.value
        })
        setItems(inProgressTasks, inProgressTasksKey)
        showCards()
    }
    task.value = ''
})

const getCard = (tasks, titleCard) => {
    let index = tasks.findIndex(task => task.task_name == titleCard)
    return index
}

const removeCard = (_name, _tasks) => {
    let { inProgressTasks, doneTasks } = getItems()
    let index = getCard(inProgressTasks, _name)
    console.log(index)
    inProgressTasks.splice(index, 1);
    setItems(inProgressTasks, inProgressTasksKey)
    showCards()
}

const doneCard = (_name) => {
    let {inProgressTasks, doneTasks} = getItems()
    let index = inProgressTasks.findIndex(task => task.task_name == _name)
    let titleCard = inProgressTasks[index].task_name
    let priority = inProgressTasks[index].priority

    doneTasks.push({
        task_name: titleCard,
        priority: priority
    })
    removeCard(titleCard, inProgressTasks)
    setItems(doneTasks, doneTasksKey);
    showCards()
}


showCards()