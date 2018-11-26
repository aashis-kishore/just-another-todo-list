'use strict';

window.onload = startAction;

function startAction() {
    setEvents();
}

function setEvents() {
    document.querySelector('.btn-add').addEventListener('click', addBtnClick);
    document.querySelector('.btn-close').addEventListener('click', closeBtnClick);
    document.querySelector('.btn-submit').addEventListener('click', submitBtnClick);
}

function addBtnClick(event) {
    console.log('Add button clicked');
    
    event.target.style.display = "none";

    const header = document.body.children[0];
    const main = document.body.children[3];
    const formContainer = document.querySelector('.form-container');

    header.style.opacity = 0.5;
    main.style.opacity = 0.5;
    formContainer.classList.toggle('btn-add-active');
}

function closeBtnClick() {
    console.log('Close button clicked');

    const formContainer = document.querySelector('.form-container');
    formContainer.classList.toggle('btn-add-active');

    const addBtn = document.querySelector('.btn-add');
    addBtn.style.display = 'block';

    const header = document.body.children[0];
    const main = document.body.children[3];

    header.style.opacity = 1;
    main.style.opacity = 1;

    clearFormFields();
}

function clearFormFields() {
    console.log('Form fields cleared');
    const taskField = document.querySelector('#task-field');
    const descriptionField = document.querySelector('#description-field');

    taskField.value = "";
    descriptionField.value = "";
}

function submitBtnClick(event) {
    console.log('Submit button clicked');
    event.preventDefault();

    const formValues = getFormFieldValues();

    if(formValues.formStatus) {
        const taskID = addTaskToList(formValues);

        // store locally for now
        const task = {
            id: taskID,
            taskname: formValues.task,
            description: formValues.description
        };
        storeTask(task);

        closeBtnClick();
    }
}

function getFormFieldValues() {
    const taskField = document.querySelector('#task-field');
    const descriptionField = document.querySelector('#description-field');

    let formStatus = false;

    if(taskField.value !== "") {
        formStatus = true;
    }

    let formValues = { 
        formStatus: formStatus,
        task: taskField.value,
        description: descriptionField.value
    };

    console.log(formValues);

    return formValues;
}

function storeTask(task) {
    console.log(`task is: ${task}`);
    if(typeof(Storage) !== "undefined") {
        console.log('Local storage supported');
        // localStorage.setItem('');
    }
}

var currentTaskID = 1;

function addTaskToList(task) {
    console.log(`Task is: ${task.task}`);

    const list = document.querySelector('#list');
    console.log(list);

    const taskElement = createListElement(currentTaskID, task);
    currentTaskID += 1;

    list.append(taskElement);

    return currentTaskID;
}

function createListElement(taskID, task) {
    const listElement = document.createElement('li');
    listElement.setAttribute('id', 'task-'+taskID);

    const taskElement = createTask(task);
    const deleteBtn = createDeleteBtn();

    listElement.append(taskElement);
    listElement.append(deleteBtn);

    console.log(listElement);

    return listElement;
}

function createTask(task) {
    const wrapperDiv = document.createElement('div');

    const taskName = document.createElement('h3');
    taskName.innerText = task.task;

    wrapperDiv.append(taskName);

    if(task.description !== "") {
        const descriptionElement = document.createElement('p');
        descriptionElement.innerText = task.description;

        wrapperDiv.append(descriptionElement);
    }

    return wrapperDiv;
}

function createDeleteBtn() {
    const wrapperDiv = document.createElement('div');

    const deleteBtn = document.createElement('i');
    deleteBtn.innerText = 'X';

    wrapperDiv.append(deleteBtn);

    return wrapperDiv;
}