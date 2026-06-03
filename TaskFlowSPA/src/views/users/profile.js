import { getSession, logout } from "../../services/auth.service.js";

export function setupProfile(navigate) {
    const session = getSession();
    if (!session) return;

    document.getElementById("logout-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
        navigate("/");
    });

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("profile-email");
    const passwordInput = document.getElementById("password-new");

    nameInput.value = `${session.name} ${session.lastname || ""}`;
    emailInput.value = session.email;

    const form = document.getElementById("profile-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const parts = nameInput.value.trim().split(" ");
        const data = {
            ...session,
            name: parts[0] || "",
            lastname: parts.slice(1).join(" ") || "",
            email: emailInput.value.trim(),
        };
        if (passwordInput.value.trim()) {
            data.password = passwordInput.value.trim();
        }
        try {
            const response = await fetch(`http://localhost:3000/user/${session.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error("Error al actualizar");
            const updated = await response.json();
            localStorage.setItem("session", JSON.stringify(updated));
            alert("Perfil actualizado");
        } catch (error) {
            alert(error.message);
        }
    });

    const deleteBtn = document.getElementById("delete-account");
    deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (!confirm("Seguro que quieres eliminar tu cuenta? Esta accion no se puede deshacer.")) return;
        try {
            await fetch(`http://localhost:3000/user/${session.id}`, { method: "DELETE" });
            logout();
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    });
}

export function renderProfile() {
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
  <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
    <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
      <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
      <p class="mt-4 text-blue-50">El usuario puede actualizar sus datos personales y gestionar su propia cuenta dentro del sistema.</p>
    </aside>

    <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
      <form id="profile-form" class="grid gap-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="name">Nombre completo</label>
          <input id="name" type="text"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-email">Correo</label>
          <input id="profile-email" type="email"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="password-new">Nueva contrasena</label>
          <input id="password-new" type="password" placeholder="Dejar vacio para mantener la actual"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <div class="flex flex-col gap-3 pt-2 sm:flex-row">
          <button type="submit"
            class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Guardar cambios</button>
          <button id="delete-account"
            class="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50">Eliminar mi cuenta</button>
        </div>
      </form>
    </section>
  </section>
</main>`;
}
