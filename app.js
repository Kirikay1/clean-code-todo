//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task.
const addTaskButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskList = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedTaskList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  //input (checkbox)
  const checkBox = document.createElement('input'); //checkbx
  //label
  const taskLabel = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImage = document.createElement('img'); //delete button image

  taskLabel.innerText = taskText;
  taskLabel.className = 'task';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImage.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImage);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const taskLabel = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isInEditMode = listItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isInEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    taskLabel.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = taskLabel.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  //Remove the parent list item from the ul.
  taskList.removeChild(listItem);
};

const toggleTaskStatus = function () {
  const listItem = this.parentNode;
  const targetTaskList = this.checked ? completedTaskList : incompleteTaskList;
  targetTaskList.appendChild(listItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.onclick = addTask;

const bindTaskEvents = function (taskListItem) {
  //select ListItems children
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskStatus;
};

const bindTaskListEvents = (taskList) => {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i]);
  }
};

//cycle over incompleteTaskHolder ul list items
//for each list item
//bind events to list items chldren(tasksCompleted)
bindTaskListEvents(incompleteTaskList);

//cycle over completedTasksHolder ul list items
//bind events to list items chldren(tasksIncompleted)
bindTaskListEvents(completedTaskList);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
