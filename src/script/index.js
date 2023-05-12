const colors =  {
    'Low': '#2ac197',
    'Medium': '#d3ca78',
    'High': '#d27772'
}

const colorsBackground = { 
    'Low': 'rgba(42, 193, 151, 0.2)',
    'Medium': 'rgba(211, 202, 12, 0.2)',
    'High': 'rgba(101, 21, 17, 0.2)'
}

const toDoTasksKey = 'toDoTasksKey'
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
        inProgressList.innerHTML += `<li style="background: var(--bg-body); word-wrap: wrap;">
                                    <div class="task-header" style="display:flex; justify-content: space-between;">
                                        <span style="color:gray; font-size:0.8rem;">${day.toLocaleDateString('pt-PT')}</span>
                                        <span style="font-weight: 700;font-size: 0.8rem;border-radius:1rem; background-color:${colorsBackground[task.priority]}; padding: 0.2rem 1rem; color:${colors[task.priority]}">${task.priority} Level</span>
                                    </div>
                                    
                                    <div style="margin-top: 1.2rem; position: relative;">
                                        <p>${task.task_name}</p>
                                        <button style="background:transparent; outline:none; border: 0; cursor: pointer; position: absolute; right: 0;"><img style="width: 1rem; height: 1rem;" src="./assets/img/angle-right.png"></button>
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