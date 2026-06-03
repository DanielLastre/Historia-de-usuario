const API_URL = "http://localhost:3000";

export async function getAllTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error("Error al obtener tareas");
    return response.json();
}

export async function getTaskById(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    if (!response.ok) throw new Error("Error al obtener la tarea");
    return response.json();
}

export async function getTasksByUser(userId) {
    const response = await fetch(`${API_URL}/tasks?userId=${userId}`);
    if (!response.ok) throw new Error("Error al obtener tareas del usuario");
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error("Error al crear la tarea");
    return response.json();
}

export async function updateTask(id, task) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error("Error al actualizar la tarea");
    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar la tarea");
    return response.json();
}
