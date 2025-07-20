document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    const body = document.body;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- New: Custom Cursor Implementation ---
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    body.appendChild(customCursor);

    // Style the custom cursor (you can put this in style.css too)
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-color); /* Use your accent color */
            border-radius: 50%;
            position: fixed;
            pointer-events: none; /* Ensures the cursor doesn't block clicks */
            transform: translate(-50%, -50%); /* Center the cursor */
            transition: transform 0.1s ease-out, border-color 0.2s ease-out, background-color 0.2s ease-out;
            z-index: 9999; /* Ensure it's on top */
        }
        .custom-cursor.active {
            transform: translate(-50%, -50%) scale(1.2); /* Slightly larger on hover */
            background-color: rgba(228, 66, 93, 0.2); /* Fills with a translucent color */
        }
        .custom-cursor.click-effect {
            transform: translate(-50%, -50%) scale(0.8); /* Slightly smaller on click */
            background-color: var(--accent-color); /* Fills solid on click */
        }
    `;
    document.head.appendChild(cursorStyle);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    // Add responsiveness for interactive elements
    const interactiveElements = document.querySelectorAll('button, input[type="text"], input[type="checkbox"], .task-item');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('active');
        });
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('active');
        });
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        customCursor.classList.add('click-effect');
    });
    document.addEventListener('mouseup', () => {
        customCursor.classList.remove('click-effect');
    });

    // --- End of Custom Cursor Implementation ---


    // --- Existing Background Color Changer (from previous response) ---
    const colors = ['#f4f7f6', '#e0ffe0', '#fff0e0', '#e0f0ff', '#ffe0f0']; // Array of light background colors
    let currentColorIndex = 0;

    const changeBackgroundColor = () => {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        body.style.backgroundColor = colors[currentColorIndex];
    };

    // Change background every 10 seconds (10000 milliseconds)
    setInterval(changeBackgroundColor, 10000);
    // --- End of Existing Background Color Changer ---


    // --- Existing To-Do List Functionality ---
    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(); // Re-render tasks after saving
    };

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear existing tasks
        if (tasks.length === 0) {
            emptyMessage.classList.remove('hidden');
        } else {
            emptyMessage.classList.add('hidden');
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.classList.add('task-item');
                if (task.completed) {
                    li.classList.add('completed');
                }

                li.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                    <span class="task-text">${task.text}</span>
                    <div class="actions">
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
    };

    // Function to add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }

        tasks.push({ text: taskText, completed: false });
        taskInput.value = ''; // Clear input field
        saveTasks();
    };

    // Event listener for Add Task button
    addTaskBtn.addEventListener('click', addTask);

    // Event listener for Enter key in input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event delegation for task actions (checkbox, edit, delete)
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const index = parseInt(target.dataset.index);

        // Toggle task completion
        if (target.type === 'checkbox') {
            tasks[index].completed = target.checked;
            saveTasks();
        }

        // Edit task
        if (target.classList.contains('edit-btn')) {
            const currentTaskText = tasks[index].text;
            const newTaskText = prompt('Edit your task:', currentTaskText);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                tasks[index].text = newTaskText.trim();
                saveTasks();
            } else if (newTaskText !== null) { // User clicked OK but entered empty string
                alert('Task cannot be empty after editing!');
            }
        }

        // Delete task
        if (target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks.splice(index, 1);
                saveTasks();
            }
        }
    });

    // Initial render of tasks when the page loads
    renderTasks();
});
// --- New: Custom Cursor Implementation ---
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    body.appendChild(customCursor);

    // Style the custom cursor (you can put this in style.css too)
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-color); /* Use your accent color */
            border-radius: 50%;
            position: fixed; /* Crucial for positioning relative to viewport */
            pointer-events: none; /* Ensures the cursor doesn't block clicks */
            transform: translate(-50%, -50%); /* Centers the div element itself */
            transition: transform 0.1s ease-out, border-color 0.2s ease-out, background-color 0.2s ease-out;
            z-index: 9999; /* Ensure it's on top of other content */
        }
        /* ... other custom-cursor styles ... */
    `;
    document.head.appendChild(cursorStyle);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });
    document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    const body = document.body;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- UPDATED: Custom Cursor Implementation with Animation ---
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    body.appendChild(customCursor);

    // Style the custom cursor (you can put this in style.css too)
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-color); /* Use your accent color */
            border-radius: 50%;
            position: fixed;
            pointer-events: none; /* Ensures the cursor doesn't block clicks */
            /* transform is now handled by JS for animation, but keep translate for centering */
            transform: translate(-50%, -50%); /* Center the cursor visually */
            transition: transform 0.1s ease-out, border-color 0.2s ease-out, background-color 0.2s ease-out; /* Keep these for active/click states */
            z-index: 9999; /* Ensure it's on top */
            will-change: left, top; /* Optimize for animation */
        }
        .custom-cursor.active {
            transform: translate(-50%, -50%) scale(1.2);
            background-color: rgba(228, 66, 93, 0.2);
        }
        .custom-cursor.click-effect {
            transform: translate(-50%, -50%) scale(0.8);
            background-color: var(--accent-color);
        }
    `;
    document.head.appendChild(cursorStyle);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const easingFactor = 0.15; // Controls how fast the cursor catches up (0-1)

    // Update target mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation loop for smooth following
    function animateCursor() {
        // Calculate new cursor position by moving it a fraction towards the mouse position
        cursorX += (mouseX - cursorX) * easingFactor;
        cursorY += (mouseY - cursorY) * easingFactor;

        // Apply the new position
        customCursor.style.left = `${cursorX}px`;
        customCursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor); // Loop for the next frame
    }

    // Start the animation
    animateCursor();

    // Add responsiveness for interactive elements
    const interactiveElements = document.querySelectorAll('button, input[type="text"], input[type="checkbox"], .task-item');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('active');
        });
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('active');
        });
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        customCursor.classList.add('click-effect');
    });
    document.addEventListener('mouseup', () => {
        customCursor.classList.remove('click-effect');
    });

    // --- END UPDATED: Custom Cursor Implementation with Animation ---


    // --- Existing Background Color Changer (from previous response) ---
    const colors = ['#f4f7f6', '#e0ffe0', '#fff0e0', '#e0f0ff', '#ffe0f0']; // Array of light background colors
    let currentColorIndex = 0;

    const changeBackgroundColor = () => {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        body.style.backgroundColor = colors[currentColorIndex];
    };

    // Change background every 10 seconds (10000 milliseconds)
    setInterval(changeBackgroundColor, 10000);
    // --- End of Existing Background Color Changer ---


    // --- Existing To-Do List Functionality ---
    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(); // Re-render tasks after saving
    };

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear existing tasks
        if (tasks.length === 0) {
            emptyMessage.classList.remove('hidden');
        } else {
            emptyMessage.classList.add('hidden');
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.classList.add('task-item');
                if (task.completed) {
                    li.classList.add('completed');
                }

                li.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                    <span class="task-text">${task.text}</span>
                    <div class="actions">
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
    };

    // Function to add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }

        tasks.push({ text: taskText, completed: false });
        taskInput.value = ''; // Clear input field
        saveTasks();
    };

    // Event listener for Add Task button
    addTaskBtn.addEventListener('click', addTask);

    // Event listener for Enter key in input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event delegation for task actions (checkbox, edit, delete)
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const index = parseInt(target.dataset.index);

        // Toggle task completion
        if (target.type === 'checkbox') {
            tasks[index].completed = target.checked;
            saveTasks();
        }

        // Edit task
        if (target.classList.contains('edit-btn')) {
            const currentTaskText = tasks[index].text;
            const newTaskText = prompt('Edit your task:', currentTaskText);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                tasks[index].text = newTaskText.trim();
                saveTasks();
            } else if (newTaskText !== null) { // User clicked OK but entered empty string
                alert('Task cannot be empty after editing!');
            }
        }

        // Delete task
        if (target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks.splice(index, 1);
                saveTasks();
            }
        }
    });

    // Initial render of tasks when the page loads
    renderTasks();
});
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const easingFactor = 0.15; // Controls how fast the cursor catches up (0-1)

// ... (mousemove event listener to update mouseX, mouseY) ...

function animateCursor() {
    cursorX += (mouseX - cursorX) * easingFactor;
    cursorY += (mouseY - cursorY) * easingFactor;
    customCursor.style.left = `${cursorX}px`;
    customCursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
}
animateCursor(); // Start the animation
