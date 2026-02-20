const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const loadBtn = document.getElementById('load-api');

// Función para crear y mostrar una tarea
function renderTask(text, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');

    li.innerHTML = `
        <span>${text}</span>
        <div class="actions">
            <button class="ok-btn">✅</button>
            <button class="del-btn">🗑️</button>
        </div>
    `;

    // Evento para subrayar al presionar OK
    li.querySelector('.ok-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Evento para borrar tarea
    li.querySelector('.del-btn').addEventListener('click', () => {
        li.remove();
    });

    list.appendChild(li);
}

// Escuchar el formulario para agregar tareas manuales
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim() !== "") {
        renderTask(input.value);
        input.value = '';
    }
});

// Escuchar el botón de API
loadBtn.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
        .then(response => response.json())
        .then(data => {
            data.forEach(task => {
                renderTask(task.title, task.completed);
            });
        })
        .catch(error => console.error("Error al cargar tareas:", error));
});
