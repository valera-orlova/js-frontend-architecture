import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
const listOfTasks = async () => {
  let input = document.querySelector('[type="text"]');
  let taskListContainer = document.querySelector('#tasks');

  const addNewTaskToList = (task) => {
    const container = document.createElement('li');
    container.innerHTML = task.name;
    container.className = 'list-group-item';
    taskListContainer.prepend(container);
  }

  let defaultTasks = await axios.get(routes.tasksPath());
  if (!defaultTasks) return 'error';
  for (let defaultTask of defaultTasks.data.items) {
    if (defaultTask) {
      const container = document.createElement('li');
      container.innerHTML = defaultTask.name;
      container.className = 'list-group-item';
      taskListContainer.append(container);
    }
  }

  document.querySelector('[type="submit"]').addEventListener('click', async (e) => {
    e.preventDefault();
    let value = input.value;
    if (!value) return 'error';
    let newTask = {name: value};
    await axios.post(routes.tasksPath(), newTask);
    addNewTaskToList(newTask);
      
    input.value = '';

  })
}

export default listOfTasks;
// END