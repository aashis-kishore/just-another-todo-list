'use strict';

var currentTaskID = 1;
var currentPageYoffset = 200;

window.onload = startAction;

function startAction() {
    setEvents();
}

function setEvents() {
    document.querySelector('.btn-add').addEventListener('click', addBtnClick);
    document.querySelector('.btn-close').addEventListener('click', closeBtnClick);
    document.querySelector('.btn-submit').addEventListener('click', submitBtnClick);
}

function addBtnClick() {
    console.log('Add button clicked');

    toggleScroll();

    const addBtn = document.querySelector('.btn-add');
    addBtn.style.display = "none";

    const header = document.body.children[0];
    const main = document.body.children[3];
    const formContainer = document.querySelector('.form-container');
    const taskField = document.querySelector('#task-field');

    // header.style.opacity = 0.5;
    // main.style.opacity = 0.5;
    formContainer.classList.toggle('btn-add-active');
    taskField.focus();
}

function closeBtnClick() {
    console.log('Close button clicked');

    toggleScroll();

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

function toggleScroll() {
    if (document.body.classList.contains('disable-scroll')) {
        document.body.classList.remove('disable-scroll');
        window.scrollTo(0, currentPageYoffset);
    } else {
        document.body.classList.add('disable-scroll');
        currentPageYoffset = window.pageYOffset;
        window.scrollTo(0, 0);
    }
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

    return formValues;
}

function storeTask(task) {
    // console.log(`task is: ${task}`);
    if(typeof(Storage) !== "undefined") {
        console.log('Local storage supported');
        // localStorage.setItem('');
    }
}

function addTaskToList(task) {
    // console.log(`Task is: ${task.task}`);
    const list = document.querySelector('#list');

    const taskElement = createListElement(currentTaskID, task);
    currentTaskID += 1;

    list.append(taskElement);

    return 'task-'+currentTaskID;
}

function createListElement(taskID, task) {
    const listElement = document.createElement('li');
    listElement.setAttribute('id', 'task-'+taskID);

    const taskElement = createTask(task);
    listElement.append(taskElement);
     
    const doneBtn = createDoneBtn();
    listElement.append(doneBtn);

    const deleteBtn = createDeleteBtn();
    listElement.append(deleteBtn);

    if(task.description !== "") {
        const descriptionElement = createDescription(task.description);
        listElement.append(descriptionElement);
    }

    return listElement;
}

function createTask(task) {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('task-name');

    const taskName = document.createElement('h3');
    taskName.innerText = task.task;

    wrapperDiv.append(taskName);

    if(task.description !== "") {
        wrapperDiv.addEventListener('click', taskNameClick);
        wrapperDiv.classList.add('has-description');
    }

    return wrapperDiv;
}

function createDescription(description) {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('task-description');

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = description;

    wrapperDiv.append(descriptionElement);

    return wrapperDiv;
}

function createDoneBtn() {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('done-btn-container');

    const doneBtn = document.createElement('i');
    doneBtn.addEventListener('click', doneBtnClick);
    doneBtn.classList.add('fas', 'fa-check');

    wrapperDiv.append(doneBtn);

    return wrapperDiv;
}

function createDeleteBtn() {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('delete-btn-container');

    const deleteBtn = document.createElement('i');
    deleteBtn.addEventListener('click', deleteBtnClick);
    deleteBtn.classList.add('fas', 'fa-times');

    wrapperDiv.append(deleteBtn);

    return wrapperDiv;
}

function taskNameClick(event) {
    console.log('Taskname clicked');

    // Nasty but simple way to pick the right description
    const description = event.target.parentNode.parentNode.children[3];
    description.classList.toggle('description-active');
}

function doneBtnClick(event) {
    console.log('Done button clicked');

    event.target.classList.toggle('task-done');

    const list = document.querySelector('#list');
    const listItem = event.target.parentNode.parentNode;

    if(event.target.classList.contains('task-done')) {
        list.append(listItem);
    } else {
        list.prepend(listItem);
    }
}

function deleteBtnClick(event) {
    console.log('Delete button clicked');

    const item = event.target.parentNode.parentNode;

    item.remove();
}