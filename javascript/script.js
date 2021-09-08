// Elements from DOM
const addField = document.getElementById('new-text-field');
const addButton = document.getElementById('button-task-Add');
const taskList = document.getElementById('ul-list');

// create function for html list-items for each task
const addTaskToDOM = task => {
  const newLi = document.createElement('li');
  let newCheckbox = document.createElement('input');
  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('value', task);
  let newTaskDescription = document.createElement('p');
  newTaskDescription.innerHTML = `${task.description}`;

//check Task 
  if (task.done === 'true') {
    newCheckbox.setAttribute('checked', 'checked');
    newTaskDescription.innerHTML = `<del>${task.description}</del>`;
  } else {
    newTaskDescription.innerHTML = `${task.description}`;
  }

//create img to element
  const newImg = document.createElement('img');
  newImg.src = `img/trash-can-icon.png`;
  newImg.value = task._id;
  newImg.width = `20`;
  newLi.appendChild(newCheckbox);
  newLi.appendChild(newTaskDescription);
  newLi.appendChild(newImg);
  taskList.appendChild(newLi);
  checkBtn(newCheckbox, task);
  delBtn(newImg, newLi);
};

// create function to test add eventlistener to change set the task.done value
const checkBtn = (btn, task) =>
    btn.addEventListener('change', event => {
      let task2 = event.target.value;
      if (task.done === 'true') {
        task2.done = 'true';
        updateTaskAPI(task2.id, task2).then(() =>
          allTaskItems(getTaskAPI())
        );
      } else {
        task2.done = 'false';
        updateTaskAPI(task2.id, task2).then(() =>
          allTaskItems(getTaskAPI())
        );
      }
});

// function to add eventlistener to trash icon to delete a task
const delBtn = (btn, li) =>
  btn.addEventListener('click', event => {
    let task_id = event.target.value
    deleteTaskAPI(task_id);
    taskList.removeChild(li);
  });

// function to get all task items
const allTaskItems = async anyTask => {
  taskList.innerHTML = '';
  const data = await anyTask;
  data.forEach(task => {
    addTaskToDOM(task);
  });
};
allTaskItems(getTaskAPI());


// function to add a task via the Add button
addButton.addEventListener('click', async event => {
  let mytask = {
    description: `${addField.value}`,
    done: false
  }
  addTaskAPI(mytask).then(() => allTaskItems(getTaskAPI()));
  addField.value = '';
});

