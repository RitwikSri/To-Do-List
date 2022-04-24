//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
    //DOM load event : to load the data from the local storage
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event : we apply the listener on the ul (event delegation) since the x buttons are dynamic
    taskList.addEventListener('click', removeTask); 
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter task evet
    filter.addEventListener('keyup', filterTask);
}

//Get tasks from the LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) { //checking if the local storage doesn't contains a value with key tasks i.e. if it doesn't contain any task 
        tasks = []; //since we don't have any tasks in localStorage we create a new tasks array that is going to store the first task
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));  //since we have some tasks in the localStorage we are retrieving them and converting them into approriate format using JSON.parse() method.
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content'; //if we want something to the right of a list item in materialize it needs to have the secondary item class
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);

        //Append the li to the ul
        taskList.appendChild(li);
    });
}

//addTask
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content'; //if we want something to the right of a list item in materialize it needs to have the secondary item class
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    
    //Append the li to the ul
    taskList.appendChild(li);

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) { //checking if the local storage doesn't contains a value with key tasks i.e. if it doesn't contain any task 
        tasks = []; //since we don't have any tasks in localStorage we create a new tasks array that is going to store the first task
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));  //since we have some tasks in the localStorage we are retrieving them and converting them into approriate format using JSON.parse() method.
    }

    tasks.push(task);  //adding to the tasks 

    localStorage.setItem('tasks', JSON.stringify(tasks)); //storing the new tasks to the localStorage under the key tasks
}

//remove task
function removeTask(e) {
    //we need to target the delete item
    if(e.target.parentElement.classList.contains('delete-item') ) { //e.target gives us the i tag, but we want the a tag
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove(); //we go to the parent of the parent since we need to remove the whole li
            
            //Remove from Local Storage
            removeTaskFromLocalStorage
            (e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) { //checking if the local storage doesn't contains a value with key tasks i.e. if it doesn't contain any task 
        tasks = []; //since we don't have any tasks in localStorage we create a new tasks array that is going to store the first task
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));  //since we have some tasks in the localStorage we are retrieving them and converting them into approriate format using JSON.parse() method.
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    //taskList.innerHTML = '';  // it is a way to clear all the tasks

    //faster : it is faster to loop through and remove every child
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksFromLocalStorage();
}

//Clear from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach //we get all the li elements i.e. elements with class collection-item, then we loop through all of them to find the one matching
    (function(task) {
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    }); 
}