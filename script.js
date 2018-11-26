'use strict';

window.onload = startAction;

function startAction() {
    setEvents();
}

function setEvents() {
    document.querySelector('.btn-add').addEventListener('click', addBtnClick);
    document.querySelector('.btn-close').addEventListener('click', closeBtnClick);
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

function closeBtnClick(event) {
    console.log('Close button clicked');

    const formContainer = document.querySelector('.form-container');
    formContainer.classList.toggle('btn-add-active');

    const addBtn = document.querySelector('.btn-add');
    addBtn.style.display = 'block';

    const header = document.body.children[0];
    const main = document.body.children[3];

    header.style.opacity = 1;
    main.style.opacity = 1;
}