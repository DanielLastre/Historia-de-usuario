import { getSession, logout } from "../../services/auth.service.js";
import { getTaskById, createTask, updateTask } from "../../services/task.service.js";

export function setupTaskForm(navigate) {
    const session = getSession();
    if (!session) return;

    document.getElementById("logout-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
        navigate("/");
    });

    const form = document.getElementById("task-form");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const statusSelect = document.getElementById("status");
    const dateInput = document.getElementById("date");

    const params = new URLSearchParams(window.location.search);
    const editId = params.get("id");
    const heading = document.getElementById("form-heading");
    const statusGroup = document.getElementById("status-group");

    if (editId) {
        heading.textContent = "Editar tarea";
        statusGroup.classList.remove("hidden");
        getTaskById(editId).then(task => {
            titleInput.value = task.title;
            descriptionInput.value = task.description || "";
            statusSelect.value = task.status || "Pendiente";
            dateInput.value = task.date || "";
        });
    } else {
        heading.textContent = "Crear tarea";
        statusGroup.classList.add("hidden");
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!titleInput.value.trim()) {
            alert("El titulo es obligatorio");
            return;
        }

        const data = {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            status: editId ? statusSelect.value : "Pendiente",
            date: dateInput.value,
            userId: session.id
        };

        if (editId) {
            await updateTask(editId, data);
        } else {
            await createTask(data);
        }

        navigate("/tasks");
    });
}

export function renderTaskForm() {
    return `
<header class="border-b border-blue-100 bg-white/90 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <a class="text-xl font-black tracking-tight text-blue-900" href="/">TaskFlowSPA</a>
    <nav class="flex items-center gap-3">
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
      <a id="logout-btn" class="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50" href="/">Cerrar sesion</a>
    </nav>
  </div>
</header>

<main class="mx-auto max-w-5xl px-6 py-10">
  <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Formulario</p>
    <h1 id="form-heading" class="mt-3 text-4xl font-black tracking-tight text-slate-900">Crear tarea</h1>

    <form id="task-form" class="mt-8 grid gap-5">
      <div>
        <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Titulo</label>
        <input id="title" type="text" placeholder="Ej. Preparar proyecto final"
          class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium text-slate-700" for="description">Descripcion</label>
        <textarea id="description" rows="5" placeholder="Describe la tarea..."
          class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"></textarea>
      </div>

      <div id="status-group" class="grid gap-5 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="status">Estado</label>
          <select id="status"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
            <option>Pendiente</option>
            <option>En progreso</option>
            <option>Completada</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="date">Fecha limite</label>
          <input id="date" type="date"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
        </div>
      </div>

      <div class="flex flex-col gap-3 pt-2 sm:flex-row">
        <button type="submit"
          class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Guardar tarea</button>
        <a class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/tasks">Cancelar</a>
      </div>
    </form>
  </section>
</main>`;
}
