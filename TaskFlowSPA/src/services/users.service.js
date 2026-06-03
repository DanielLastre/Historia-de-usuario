
export async function crearUsuario(usuario) {
    const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
        throw new Error('Error al crear el usuario');
    }
    return response.json();
}

export async function obtenerUsuarios() {
    const response = await fetch('http://localhost:3000/user');
    if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
    }
    return response.json();
}

export async function obtenerUsuarioPorEmail(email) {
    const response = await fetch(`http://localhost:3000/user/email/${email}`);
    if (!response.ok) {
        throw new Error('Error al obtener el usuario');
    }
    return response.json();
}