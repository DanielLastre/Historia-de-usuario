import { renderLogin } from "../views/auth/login";
import { renderNotFound } from "../views/auth/not-found";
import { renderRegister } from "../views/auth/register";
import { renderTaskForm } from "../views/tasks/task-form";
import { renderTasks } from "../views/tasks/tasks";
import { renderAdmin } from "../views/users/admin";
import { renderDashboard } from "../views/users/dashboard";
import { renderHome } from "../views/users/home";
import { renderProfile } from "../views/users/profile";




export const routes = {
    "/": renderHome,
    "/login": renderLogin,
    "/register": renderRegister,
    "/not-found": renderNotFound,
    "/task-form": renderTaskForm,
    "/tasks": renderTasks,
    "/admin": renderAdmin,
    "/dashboard": renderDashboard,
    "/profile": renderProfile,
};