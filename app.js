const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task-button');
const incompleteTaskList = document.getElementById('incompleteTasks');
const completedTaskList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const taskLabel = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImage = document.createElement('img');

  taskLabel.innerText = taskText;
  taskLabel.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImage.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImage);

  listItem.appendChild(checkBox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const taskLabel = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isInEditMode = listItem.classList.contains('editMode');
  if (isInEditMode) {
    taskLabel.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = taskLabel.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const toggleTaskStatus = function () {
  const listItem = this.parentNode;
  const targetTaskList = this.checked ? completedTaskList : incompleteTaskList;
  targetTaskList.appendChild(listItem);
};

addTaskButton.onclick = addTask;

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskStatus;
};

const bindTaskListEvents = (taskList) => {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i]);
  }
};

bindTaskListEvents(incompleteTaskList);

bindTaskListEvents(completedTaskList);
