document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const tasksContainer = document.getElementById('tasks');
    let editingTaskId = null;

    // Fetch tasks from API and render
    async function fetchTasks() {
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    }

    // Render tasks
    function renderTasks(tasks) {
        tasksContainer.innerHTML = '';
        tasks.forEach(task => {
            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);
        });
    }

    // Create task card element
    function createTaskCard(task) {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <small>Due Date: ${task.due_date}</small>
            <br>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        return taskCard;
    }

    // Add or edit task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;

        const taskData = { title, description, due_date: dueDate };

        try {
            if (editingTaskId) {
                await fetch(`/api/tasks/${editingTaskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });
                editingTaskId = null;
            } else {
                await fetch('/api/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });
            }

            taskForm.reset();
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error.message);
        }
    });

    // Edit task
    window.editTask = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`);
            if (!response.ok) {
                throw new Error('Task not found');
            }
            const task = await response.json();
            if (task) {
                document.getElementById('taskId').value = task.id;
                document.getElementById('title').value = task.title;
                document.getElementById('description').value = task.description;
                document.getElementById('dueDate').value = task.due_date;
                editingTaskId = id;
            }
        } catch (error) {
            console.error('Error editing task:', error.message);
        }
    };

    // Delete task
    window.deleteTask = async (id) => {
        try {
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    // Initial fetch of tasks
    fetchTasks();
});
