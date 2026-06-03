import { getSession, logout } from "../../services/auth.service.js";
import { getTasksByUser, getAllTasks, deleteTask } from "../../services/task.service.js";

export function setupTasks(navigate) {
    document.getElementById("logout-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
        navigate("/");
    });

    renderTasksList(navigate);
}

async function renderTasksList(navigate) {
    const session = getSession();
    if (!session) return;

    const isAdmin = session.role && session.role.includes("ADMIN");
    const tasks = isAdmin ? await getAllTasks() : await getTasksByUser(session.id);

    const container = document.getElementById("tasks-container");
    if (!container) return;

    if (tasks.length === 0) {
        container.innerHTML = `
        <article class="rounded-3xl border border-blue-100 bg-white p-6 text-center shadow-lg shadow-blue-50">
          <p class="text-slate-500">No hay tareas aun.</p>
          <a class="mt-4 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500" href="/task-form">Crear primera tarea</a>
        </article>`;
        return;
    }

    container.innerHTML = tasks.map(task => `
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50" data-id="${task.id}">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-${statusColor(task.status)}">${task.status}</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900">${task.title}</h2>
          <p class="mt-3 max-w-2xl text-slate-600">${task.description || "Sin descripcion"}</p>
          ${task.date ? `<p class="mt-2 text-sm text-slate-400">Vence: ${task.date}</p>` : ""}
        </div>
        <div class="flex gap-3">
          <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/task-form?id=${task.id}">Editar</a>
          <button class="btn-delete rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50" data-id="${task.id}">Eliminar</button>
        </div>
      </div>
    </article>
  `).join("");

    container.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", async () => {
            if (confirm("Eliminar esta tarea?")) {
                await deleteTask(btn.dataset.id);
                renderTasksList(navigate);
            }
        });
    });
}

function statusColor(status) {
    const map = {
        "Completada": "green-600",
        "En progreso": "blue-600",
        "Pendiente": "yellow-600"
    };
    return map[status] || "slate-600";
}

export function renderTasks() {
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

<main class="mx-auto max-w-6xl px-6 py-10">
  <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
      <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
      <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar las tareas del usuario autenticado.</p>
    </div>
    <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/task-form">Crear tarea</a>
  </section>

  <section id="tasks-container" class="mt-8 grid gap-4">

  </section>
</main>`;
}
