import { getSession, logout } from "../../services/auth.service.js";
import { getTasksByUser } from "../../services/task.service.js";

export function setupDashboard(navigate) {
    const session = getSession();
    if (!session) return;

    const nameEl = document.getElementById("dashboard-name");
    if (nameEl) {
        nameEl.textContent = `Bienvenida, ${session.name}.`;
    }

    document.getElementById("logout-btn").addEventListener("click", (e) => {
        e.preventDefault();
        logout();
        navigate("/");
    });

    cargarResumen(session.id);
}

async function cargarResumen(userId) {
    try {
        const tasks = await getTasksByUser(userId);

        const activas = tasks.filter(t => t.status !== "Completada").length;
        const completadas = tasks.filter(t => t.status === "Completada").length;
        const pendientesHoy = tasks.filter(t => t.status === "Pendiente").length;

        document.getElementById("tasks-activas").textContent = activas;
        document.getElementById("tasks-completadas").textContent = completadas;
        document.getElementById("tasks-pendientes").textContent = pendientesHoy;
    } catch (error) {
        console.error("Error al cargar resumen", error);
    }
}

export function renderDashboard() {
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
  <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
    <h1 id="dashboard-name" class="mt-3 text-4xl font-black tracking-tight">Bienvenida.</h1>
    <p class="mt-4 max-w-2xl text-blue-50">Resumen general del trabajo del usuario, accesos rapidos y estado actual de productividad.</p>
  </section>

  <section class="mt-8 grid gap-4 md:grid-cols-3">
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <p class="text-sm text-slate-500">Tareas activas</p>
      <p id="tasks-activas" class="mt-3 text-4xl font-black text-blue-700">0</p>
    </article>
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <p class="text-sm text-slate-500">Completadas</p>
      <p id="tasks-completadas" class="mt-3 text-4xl font-black text-blue-700">0</p>
    </article>
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <p class="text-sm text-slate-500">Pendientes</p>
      <p id="tasks-pendientes" class="mt-3 text-4xl font-black text-blue-700">0</p>
    </article>
  </section>

  <section class="mt-8">
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
        <a class="text-sm font-semibold text-blue-700 hover:text-blue-600" href="/tasks">Ver tareas</a>
      </div>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/task-form">
          <p class="text-sm font-semibold text-blue-600">Crear</p>
          <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
        </a>
        <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/profile">
          <p class="text-sm font-semibold text-blue-600">Cuenta</p>
          <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
        </a>
      </div>
    </article>
  </section>
</main>`;
}
