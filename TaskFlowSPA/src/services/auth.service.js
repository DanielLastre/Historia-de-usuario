const API_URL = "http://localhost:3000";

export async function login(email, password) {
    const response = await fetch(`${API_URL}/user?email=${email}&password=${password}`);
    const users = await response.json();

    if (users.length === 0) {
        throw new Error("Credenciales invalidas");
    }

    const user = users[0];
    localStorage.setItem("session", JSON.stringify(user));
    return user;
}

export function logout() {
    localStorage.removeItem("session");
}

export function getSession() {
    return JSON.parse(localStorage.getItem("session"));
}

export function isAuthenticated() {
    return getSession() !== null;
}
