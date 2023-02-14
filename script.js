// Elements

// If using local storage parse everything and store otherwise empty array
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Adding items to local storage
document.querySelector('#enter').addEventListener('click', () => {
    const item = document.querySelector('#item');
    createItem(item);
});

function displayItems() {
    let items = '';
    itemsArray.forEach((_, index) => {
        items += `
        <div class="item">
            <div class="input-controller">
                <textarea disabled>${itemsArray[index]}</textarea>
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
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function activateDeleteListeners() {
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            deleteItem(i);
        });
    });
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll('.editBtn');
    const updateController = document.querySelectorAll('.update-controller');
    const inputs = document.querySelectorAll('.input-controller textarea');
    editBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            updateController[i].style.display = 'block';
            inputs[i].disabled = false;
        });
    });
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll('.saveBtn');
    const inputs = document.querySelectorAll('.input-controller textarea');
    saveBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            saveItem(inputs[i].value, i);
        });
    });
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll('.cancelBtn');
    const updateController = document.querySelectorAll('.update-controller');
    const inputs = document.querySelectorAll('.input-controller textarea');
    cancelBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            updateController[i].style.display = 'none';
            inputs[i].disabled = true;
            location.reload();
        });
    });
}

function reloadLocalStorage(items) {
    localStorage.setItem(items, JSON.stringify(itemsArray));
    location.reload();
}

function saveItem(text, i) {
    itemsArray[i] = text;
    reloadLocalStorage('items');
}

function deleteItem(i) {
    itemsArray.splice(i, 1);
    reloadLocalStorage('items');
}

function createItem(item) {
    itemsArray.push(item.value);
    reloadLocalStorage('items');
}

// Date logic

function displayDate() {
    let date = new Date();
    date = date.toString().split(' ');
    document.querySelector('#date').innerHTML = `${date[1]} ${date[2]} ${date[3]}`;
}

window.onload = () => {
    displayDate();
    displayItems();
};
