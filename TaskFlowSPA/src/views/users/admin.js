import { obtenerUsuarios } from "../../services/users.service.js";
import { getAllTasks } from "../../services/task.service.js";
import { logout } from "../../services/auth.service.js";

export function setupAdmin(navigate) {
    document.getElementById("logout-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
        navigate("/");
    });

    cargarUsuarios();
    cargarTareas();
}

async function cargarUsuarios() {
    const container = document.getElementById("admin-users");
    if (!container) return;

    try {
        const users = await obtenerUsuarios();
        container.innerHTML = users.map(user => `
        <div class="rounded-2xl bg-blue-50 p-4">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="font-bold text-slate-900">${user.name} ${user.lastname || ""}</p>
              <p class="text-sm text-slate-500">${user.email}</p>
            </div>
            <div class="flex gap-2 items-center">
              <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">${Array.isArray(user.role) ? user.role[0] : user.role}</span>
            </div>
          </div>
        </div>
      `).join("");
    } catch (error) {
        container.innerHTML = `<p class="text-slate-500">Error al cargar usuarios</p>`;
    }
}

async function cargarTareas() {
    const container = document.getElementById("admin-tasks");
    if (!container) return;

    try {
        const tasks = await getAllTasks();
        if (tasks.length === 0) {
            container.innerHTML = `<p class="text-slate-500">No hay tareas registradas.</p>`;
            return;
        }
        container.innerHTML = tasks.map(task => `
        <div class="rounded-2xl bg-blue-50 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-slate-900">${task.title}</p>
              <p class="text-xs text-slate-500">Usuario ID: ${task.userId} | ${task.status}</p>
            </div>
          </div>
        </div>
      `).join("");
    } catch (error) {
        container.innerHTML = `<p class="text-slate-500">Error al cargar tareas</p>`;
    }
}

export function renderAdmin() {
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

<main class="mx-auto max-w-7xl px-6 py-10">
  <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
    <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
    <p class="mt-4 max-w-2xl text-blue-50">Vista reservada para gestionar usuarios, roles, permisos y monitoreo general del sistema.</p>
  </section>

  <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <h2 class="text-xl font-bold text-slate-900">Usuarios</h2>
      <div id="admin-users" class="mt-5 space-y-4">
        <p class="text-slate-500">Cargando...</p>
      </div>
    </article>

    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <h2 class="text-xl font-bold text-slate-900">Todas las tareas</h2>
      <div id="admin-tasks" class="mt-5 space-y-4">
        <p class="text-slate-500">Cargando...</p>
      </div>
    </article>
  </section>
</main>`;
}
