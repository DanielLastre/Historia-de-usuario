import "./styles/global.css";
import { renderLogin } from "./views/auth/login";
import { renderRegister } from "./views/auth/register";
import { renderHome } from "./views/users/home";

const app = document.getElementById("app");

app.innerHTML = renderHome();
app.innerHTML = renderRegister();
