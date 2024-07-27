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
    // class that tracks time spend on the task
    class Stopwatch{
        constructor(pElement){
            this.hours = 0;
            this.seconds = 0;
            this.minutes = 0;
            this.intervalId = null;
            this.timeString = "";
            this.pElement = pElement;
        }
        incrementCount(){
            
            this.seconds +=1;
            if(this.seconds>=60){
                this.seconds = 0;
                this.minutes += 1;
            }
            if(this.minutes >= 60){
                this.minutes = 0;
                this.hours +=1;
            }
            // format time string 
            this.timeString = `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
            // update textContent of the p element that displays the time every second
            this.pElement.textContent = this.timeString;
            
        }
        start(){
            // bind increment count to the instance of stopwatch and call it every second
            this.intervalId = setInterval(this.incrementCount.bind(this), 1000);
            
            
        }
        stop(){
            clearInterval(this.intervalId);
            // reset all variables
            this.intervalId = null;
            this.hours = 0;
            this.seconds = 0;
            this.minutes = 0;
            // add decoration to the time string 
            this.pElement.style.textDecoration = "overline underline";
        }
        
    }

    function addTodoItem(text) {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('completed');
                // stop stop watch when completed 
                stopwatch.stop();
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
        // instantiate stopwatch
        const p = document.createElement('p');
        const stopwatch = new Stopwatch(p);
        stopwatch.start();
        p.textContent = stopwatch.timeString;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            // stop stopwatch 
            stopwatch.stop();
            li.style.transition = 'background-color 0.5s ease';
            li.style.backgroundColor = '#ffcccc';
            setTimeout(() => {
                todoList.removeChild(li);
            }, 500);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        // append timestring to the list
        li.appendChild(p);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
        p.style.color = "blue";
    }
});
