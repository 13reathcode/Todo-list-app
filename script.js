'use strict';

// Elements
const date = document.querySelector('#date');
const enterBtn = document.querySelector('#enter');
const enterItem = document.querySelector('#item');

// If using local storage parse everything and store otherwise empty array
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Adding items to local storage
enterBtn.addEventListener('click', () => {
    pushItem(enterItem);
});

enterItem.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') pushItem(enterItem);
});
// Functions

function displayItems() {
    // Creating item
    let items = '';
    itemsArray.forEach((_, index) => {
        items += `
        <div class="item">
            <div class="input-controller">
                <textarea disabled>${index + 1}. ${itemsArray[index]}</textarea>
                <div class="edit-controller">
                    <i class="fa-solid fa-pencil editBtn"></i>
                    <i class="fa-solid fa-xmark deleteBtn"></i>
                </div>
            </div>
            <div class="update-controller">
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
        </div>
        `;
    });
    document.querySelector('.to-do-list').innerHTML = items;

    // Newly Created Elements
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    const editButtons = document.querySelectorAll('.editBtn');
    const saveButtons = document.querySelectorAll('.saveBtn');
    const cancelButtons = document.querySelectorAll('.cancelBtn');

    const inputs = document.querySelectorAll('.input-controller textarea');
    const updateControllers = document.querySelectorAll('.update-controller');

    // Buttons events
    activateDeleteListeners(deleteButtons);
    activateEditListeners(editButtons, updateControllers, inputs);
    activateSaveListeners(saveButtons, inputs);
    activateCancelListeners(cancelButtons, updateControllers, inputs);
}

const activateDeleteListeners = (buttons) => {
    buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            deleteItem(i);
        });
    });
};

const activateEditListeners = (buttons, controllers, inputs) => {
    buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            controllers[i].style.display = 'block';
            inputs[i].disabled = false;
        });
    });
};

const activateSaveListeners = (buttons, inputs) => {
    buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            saveItem(inputs[i].value, i);
        });
    });
};

const activateCancelListeners = (buttons, controllers, inputs) => {
    buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            controllers[i].style.display = 'none';
            inputs[i].disabled = true;
            location.reload();
        });
    });
};

// Help Functions

function reloadLocalStorage(items) {
    localStorage.setItem(items, JSON.stringify(itemsArray));
    location.reload();
}

function pushItem(item) {
    itemsArray.push(item.value);
    reloadLocalStorage('items');
}

function saveItem(text, i) {
    itemsArray[i] = text;
    reloadLocalStorage('items');
}

function deleteItem(i) {
    itemsArray.splice(i, 1);
    reloadLocalStorage('items');
}

// Date logic

function displayDate() {
    let now = new Date();
    now = now.toString().split(' ');
    document.querySelector('#date').innerHTML = `${now[1]} ${now[2]} ${now[3]}`;
}

window.onload = () => {
    displayDate();
    displayItems();
};
