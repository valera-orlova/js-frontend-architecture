import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
    const identifier = uniqueId();
    const info = {
        current: identifier,
        lists: [{ identifier: identifier, name: 'General' }],
        tasks: [],
    };
    
    const displayTaskList = (info, elements) => {
        elements.tasksContainer.innerHTML = '';
        const filteredTasks = info.tasks.filter(({ listId }) => listId === info.current);

        if (filteredTasks.length === 0) {
            return;
        }

        const ul = document.createElement('ul');

        filteredTasks.forEach(({ name }) => {
            const li = document.createElement('li');
            li.textContent = name;
            ul.append(li);
        });

        elements.tasksContainer.append(ul);
    };

    const displayListOfLists = (info, elements) => {
        elements.listsContainer.innerHTML = '';
        const ul = document.createElement('ul');

        info.lists.forEach(({ identifier, name }) => {
        const li = document.createElement('li');
        let newElement;
      
        if (identifier === info.current) {
            newElement = document.createElement('b');
            newElement.textContent = name;
        } else {
            newElement = document.createElement('a');
            newElement.setAttribute('href', `#${name.toLowerCase()}`);
            newElement.textContent = name;
            newElement.addEventListener('click', (e) => {
                e.preventDefault();
                info.current = identifier;
                displayListOfLists(info, elements);
                displayTaskList(info, elements);
            });
        }
      
            li.append(newElement);
            ul.append(li);
        });
        
        elements.listsContainer.append(ul);

    };

    const elements = {
    listsContainer: document.querySelector('[data-container="lists"]'),
    tasksContainer: document.querySelector('[data-container="tasks"]'),
    };
    
    const newListForm = document.querySelector('[data-container="new-list-form"]');
    const newTaskForm = document.querySelector('[data-container="new-task-form"]');
    
    newListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const listName = formData.get('name');
        const list = { identifier: uniqueId(), name: listName.trim() };
        form.reset();
        form.focus();

        let flag = true;
        for (let item of info.lists) {
            if (item.name === listName) {
                flag = false;
            }
        }
        if (flag) {
            info.lists.push(list);
        }


        displayListOfLists(info, elements);
    });

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target);
        const task = { identifier: uniqueId(), name: e.target.querySelector('input').value, listId: info.current };
        e.target.reset();
        e.target.focus();
        info.tasks.push(task);
        displayTaskList(info, elements);
    });

    displayListOfLists(info, elements);
    displayTaskList(info, elements);
};
// END