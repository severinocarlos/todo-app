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
                toDoTasks: JSON.parse(localStorage.getItem(toDoTasksKey) || '[]'), 
                inProgressTasks: JSON.parse(localStorage.getItem(inProgressTasksKey) || '[]'), 
                doneTasks: JSON.parse(localStorage.getItem(doneTasksKey) || '[]')
            }
}

const setItems = (_tasks, key) => {
    localStorage.setItem(key, JSON.stringify(_tasks));
}

const generateCards = (taskList, documentList) => {
    const day = new Date();

    taskList.forEach(task => {
        documentList.innerHTML += `<li style="background: var(--bg-body); word-wrap: wrap;">
            <div class="task-header" style="display:flex; justify-content: space-between;">
                <span style="color:gray; font-size:0.8rem;">${day.toLocaleDateString('pt-PT')}</span>
                <span style="font-weight: 700;font-size: 0.7rem;border-radius:1rem; background-color:${colorsBackground[task.priority]}; padding: 0.2rem 1rem; color:${colors[task.priority]}">${task.priority} Level</span>
            </div>
            
            <div style="margin-top: 1.2rem; position: relative;">
                <p>${task.task_name}</p>
                <button 
                onclick="moveCard('${task.task_name}','${task.status}')"
                style="background:transparent; outline:none; border: 0; cursor: pointer; position: absolute; right: 0;"><img style="width: 1rem; height: 1rem;" src="./assets/img/angle-right.png"></button>
                <button onclick="removeCard('${task.task_name}','${task.status}')"
                style="padding-bottom: 0.3rem; background:transparent; outline:none; border: 0; cursor: pointer; position: absolute; right: 0; margin-right: 1.5rem;">
                <img style="width: 1rem; height: 1rem;" src="./assets/img/delete.png"/></button>
            <div>
        </li>`
    })
    
}


const showCards = () =>  {
    const toDoList = document.querySelector('.to-do-tasks-list')
    const inProgressList = document.querySelector('.in-progress-tasks-list')
    const doneList = document.querySelector('.done-tasks-list')
    let { toDoTasks, inProgressTasks, doneTasks } = getItems()

    const taskCounterToDo = document.querySelector('.tasks-counter-to-do')
    const taskCounterInProgress = document.querySelector('.tasks-counter-in-progress')
    const taskCounterDone = document.querySelector('.tasks-counter-done')

    taskCounterToDo.innerHTML = `${toDoTasks.length}`
    taskCounterInProgress.innerHTML = `${inProgressTasks.length}`
    taskCounterDone.innerHTML = `${doneTasks.length}`

    toDoList.innerHTML = ''
    inProgressList.innerHTML = ''
    doneList.innerHTML = ''
    
    const day = new Date();
    generateCards(toDoTasks, toDoList)
    generateCards(inProgressTasks, inProgressList)

    doneTasks.forEach(task => {
        doneList.innerHTML += `<li style="background: var(--bg-body); word-wrap: wrap;">
        <div class="task-header" style="display:flex; justify-content: space-between;">
            <span style="color:gray; font-size:0.8rem;">${day.toLocaleDateString('pt-PT')}</span>
            <span style="font-weight: 700;font-size: 0.8rem;border-radius:1rem; background-color:${colorsBackground[task.priority]}; padding: 0.2rem 1rem; color:${colors[task.priority]}">${task.priority} Level</span>
        </div>
        
        <div style="margin-top: 1.2rem; position: relative;">
            <p>${task.task_name}</p>
            <button onclick="removeCard('${task.task_name}','${task.status}')"
            style="padding-bottom: 0.3rem; background:transparent; outline:none; border: 0; cursor: pointer; position: absolute; right: 0;">
            <img style="width: 1rem; height: 1rem;" src="./assets/img/delete.png"/></button>
        <div>
    </li>`
    })

}

addButton.addEventListener('click', () => {
    const task = document.querySelector('#input-task')
    const priority = document.querySelector('#select-item')

    if (!task.value) {
        alert('Please, write some task')
    } else {
        let { toDoTasks, inProgressTasks, doneTasks } = getItems()
        
        toDoTasks.push({
            task_name: task.value,
            priority: priority.value,
            status: 'to-do'
        })
        setItems(toDoTasks, toDoTasksKey)
        showCards()
    }
    task.value = ''
})

const getCard = (tasks, titleCard) => {
    let index = tasks.findIndex(task => task.task_name == titleCard)
    return index
}

const  removeCard = (_name, status) => {
    let { toDoTasks, inProgressTasks, doneTasks } = getItems()
    let index
    if (status === 'to-do') {
        index = getCard(toDoTasks, _name);
        toDoTasks.splice(index, 1)
        setItems(toDoTasks, toDoTasksKey)
    } else if  (status === 'in-progress') {
        index = getCard(inProgressTasks, _name);
        inProgressTasks.splice(index, 1)
        setItems(inProgressTasks, inProgressTasksKey)
    } else {
        index = getCard(toDoTasks, _name);
        doneTasks.splice(index, 1);
        setItems(doneTasks, doneTasksKey)
    }
    showCards()
}

const moveCard = (_name, _status) => {
    let { toDoTasks, inProgressTasks, doneTasks} = getItems()
   
    if (_status === 'to-do') {
        let index = getCard(toDoTasks, _name)
        let titleCard = toDoTasks[index].task_name
        let priority = toDoTasks[index].priority

        inProgressTasks.push({
            task_name: titleCard,
            priority: priority,
            status: 'in-progress'
        })
        setItems(inProgressTasks, inProgressTasksKey);
    } else if (_status === 'in-progress') {
        let index = getCard(inProgressTasks, _name)
        let titleCard = inProgressTasks[index].task_name
        let priority = inProgressTasks[index].priority
        doneTasks.push({
            task_name: titleCard,
            priority: priority,
            status: 'done'
        })
        setItems(doneTasks, doneTasksKey);
    }
    removeCard(_name, _status)
    showCards()
}

showCards()