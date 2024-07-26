document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const dingSound = document.getElementById('ding-sound');

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoItem(todoText);
            todoInput.value = '';
        }
    });

    function addTodoItem(text) {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('completed');
                todoList.appendChild(li);
                dingSound.play();
                li.style.transition = 'background-color 0.5s ease';
                li.style.backgroundColor = '#d0f0c0';
            } else {
                li.classList.remove('completed');
                li.style.backgroundColor = '#fff';
            }
        });

        const span = document.createElement('span');
        span.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.style.transition = 'background-color 0.5s ease';
            li.style.backgroundColor = '#ffcccc';
            setTimeout(() => {
                todoList.removeChild(li);
            }, 500);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }
});
