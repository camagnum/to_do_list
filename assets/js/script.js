const btnSubmit = document.querySelector('.btn-submit');
const tasksList = document.querySelector('.tasks-container');
const inputElement = document.querySelector('.input-task');
const formElement = document.querySelector('.new-task-container')

const tamanhoInput = ({target}) => {

    if (target.value.length > 2) {
        btnSubmit.removeAttribute('disabled');
    }
    else {
        btnSubmit.setAttribute('disabled','');
    }
}

inputElement.addEventListener('input', tamanhoInput)

formElement.addEventListener('submit', (Event) => {

    Event.preventDefault();

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');
    taskItemContainer.setAttribute("data-id",Date.now())

    const checkboxElement = document.createElement("input");
    checkboxElement.classList.add('checkbox-item')
    checkboxElement.type = 'checkbox';

    const taskValue = document.createElement('p');
    taskValue.classList.add('text-item')
    taskValue.innerText = inputElement.value;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container')

    const editButton = document.createElement('button');
    editButton.classList.add('btn-edit');
    editButton.innerText = "Editar"
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete');
    deleteButton.innerText = "Excluir"

    
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);
    
    taskItemContainer.appendChild(checkboxElement);
    taskItemContainer.appendChild(taskValue);
    taskItemContainer.appendChild(buttonsContainer);
    
    tasksList.appendChild(taskItemContainer);
    btnSubmit.setAttribute('disabled','');

    deleteButton.addEventListener('click', deleteTask)
    editButton.addEventListener('click', () => {
        taskValue.innerText = inputElement.value;
    })

    checkboxElement.addEventListener('click', () => {
        
        if (taskValue.classList.contains('completed')) {
            taskValue.classList.remove("completed");
        } else {
            taskValue.classList.add("completed");
        }
        updateLocalStorage();
    })

    inputElement.value = '';
    
    updateLocalStorage();

})

const deleteTask = (Event) => {
    const elementoAtual = Event.target.parentNode;
    elementoAtual.parentNode.remove();
    
    updateLocalStorage();
}


// Armazenar no Local Storage
const updateLocalStorage = () => {
    const tasks = tasksList.childNodes;

    const localStorageTasks = [...tasks].map((task) => {
        const content = task.childNodes[1];
        const isCompleted = content.classList.contains("completed");
        const taskId = task.getAttribute("data-id");

        return { description: content.innerText, taskId, isCompleted };
    });

    localStorage.setItem('tasks',JSON.stringify(localStorageTasks));
};

// Atualizar página com o local storage
const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if (!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage) {
        
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");
        taskItemContainer.setAttribute("data-id",task.taskId);
        
        const checkboxElement = document.createElement("input");
        checkboxElement.classList.add('checkbox-item')
        checkboxElement.type = 'checkbox';
        
        const taskValue = document.createElement('p');
        taskValue.classList.add('text-item')
        taskValue.innerText = task.description;
        if (task.isCompleted) {
            taskValue.classList.add("completed");
            checkboxElement.setAttribute('checked','true')
        }
    
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container')
    
        const editButton = document.createElement('button');
        editButton.classList.add('btn-edit');
        editButton.innerText = "Editar"
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-delete');
        deleteButton.innerText = "Excluir"

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);
        
        // taskItemContainer.appendChild(checkNameContainer);
        
        taskItemContainer.appendChild(checkboxElement);
        taskItemContainer.appendChild(taskValue);
        taskItemContainer.appendChild(buttonsContainer);
        
        tasksList.appendChild(taskItemContainer);
        btnSubmit.setAttribute('disabled','');

        deleteButton.addEventListener('click', deleteTask)
        editButton.addEventListener('click', () => {
            taskValue.innerText = inputElement.value;
        })

        checkboxElement.addEventListener('click', () => {
        
            if (taskValue.classList.contains('completed')) {
                taskValue.classList.remove("completed");
            } else {
                taskValue.classList.add("completed");
            }
            updateLocalStorage();
        })
        inputElement.value = '';

    }
};

refreshTasksUsingLocalStorage();