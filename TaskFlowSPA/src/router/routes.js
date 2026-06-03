import { renderLogin, setupLogin } from "../views/auth/login.js";
import { renderNotFound, setupNotFound } from "../views/auth/not-found.js";
import { renderRegister, setupRegister } from "../views/auth/register.js";
import { renderTaskForm, setupTaskForm } from "../views/tasks/task-form.js";
import { renderTasks } from "../views/tasks/tasks.js";
import { renderAdmin, setupAdmin } from "../views/users/admin.js";
import { renderDashboard, setupDashboard } from "../views/users/dashboard.js";
import { renderHome, setupHome } from "../views/users/home.js";
import { setupTasks } from "../views/tasks/tasks.js";
import { renderProfile, setupProfile } from "../views/users/profile.js";

export const routes = {
    "/": {
        render: renderHome,
        setup: setupHome,
        isAuthorized: false
    },
    "/home": {
        render: renderHome,
        setup: setupHome,
        isAuthorized: false
    },
    "/login": {
        render: renderLogin,
        setup: setupLogin,
        isAuthorized: false
    },
    "/register": {
        render: renderRegister,
        setup: setupRegister,
        isAuthorized: false
    },
    "/not-found": {
        render: renderNotFound,
        setup: setupNotFound
    },
    "/task-form": {
        render: renderTaskForm,
        setup: setupTaskForm,
        isAuthorized: true
    },
    "/tasks": {
        render: renderTasks,
        setup: setupTasks,
        isAuthorized: true
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdmin,
        isAuthorized: true,
        requiredRole: "ADMIN"
    },
    "/dashboard": {
        render: renderDashboard,
        setup: setupDashboard,
        isAuthorized: true
    },
    "/profile": {
        render: renderProfile,
        setup: setupProfile,
        isAuthorized: true
    }
};
