import { useState } from 'react'
import styles from './RegisterForm.module.css'

function RegisterForm(props){
    function registerUser(e){
        e.preventDefault()

        fetch('/register', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
              }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch((err) => console.log(err))
    }

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    return (
        <div className={styles.RegisterForm}>
            <h1>Criar conta</h1>
            <form onSubmit={registerUser}>
                <label htmlFor='username'>Nome de usuário</label>
                <input 
                type="text"
                name='username'
                id='username'
                onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor='email'>Email</label>
                <input 
                type="email"
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Senha</label>
                <input 
                type="password"
                name='password' 
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor='confirmPassword'>Confirmar senha</label>
                <input
                type="password"
                name='confirmPassword'
                id='confirmPassword'
                onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <input type='submit' />
            </form>
        </div>
    )
}

export default RegisterForm