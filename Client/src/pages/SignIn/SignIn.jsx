import React, { useState } from 'react';
import { users } from '../../data/users';
import Style from './SignIn.module.css'

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Buscar el usuario en el array por el nombre de usuario
        const user = users.find(user => user.userName === username);

        if (user) {
            // Verificar si la contraseña coincide
            if (user.password === password) {
                alert('¡Bienvenido!');
            } else {
                alert('Contraseña incorrecta');
            }
        } else {
            alert('Usuario no encontrado');
        }
    }

    return (
        <div className={Style.container}>
            <form onSubmit={handleSubmit} className={Style.containerForm}>
                <h1 className={Style.title}>Iniciar Sesion</h1>
                <label className={Style.label}>Usuario</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={Style.input} />
                <label className={Style.label}>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={Style.input} />
                <input type="submit" value='Ingresar' className={Style.inputSubmit} />
            </form>
        </div>
    );
}
