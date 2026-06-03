import { routes } from "./routes.js";

function navigateTo(path) {
    history.pushState({}, "", path);
    handleRoute();
}

async function handleRoute() {
    const path = window.location.pathname;
    const route = routes[path];

    if (!route) {
        history.pushState({}, "", "/not-found");
        renderRoute(routes["/not-found"]);
        return;
    }

    const session = JSON.parse(localStorage.getItem("session"));

    if (route.isAuthorized === true && !session) {
        navigateTo("/login");
        return;
    }

    if (route.isAuthorized === false && session) {
        navigateTo("/dashboard");
        return;
    }

    if (route.requiredRole && (!session || !session.role || !session.role.includes(route.requiredRole))) {
        navigateTo("/");
        return;
    }

    renderRoute(route);
}

function renderRoute(route) {
    const appContainer = document.getElementById("app");
    if (!appContainer) return;

    appContainer.innerHTML = route.render();

    if (route.setup) {
        route.setup(navigateTo);
    }
}

export function initRouter() {
    document.addEventListener("click", (e) => {
        const anchor = e.target.closest("a");
        if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
            e.preventDefault();
            const path = new URL(anchor.href).pathname;
            navigateTo(path);
        }
    });

    window.addEventListener("popstate", handleRoute);

    handleRoute();
}
