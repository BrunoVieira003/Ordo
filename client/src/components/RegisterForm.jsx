import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RegisterForm.module.css'
import Input from './form/Input'
import Submit from './form/Submit'

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
        .then((res) => navigate('/'))
        .catch((err) => console.log(err))
    }

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const navigate = useNavigate()

    return (
        <div className={styles.RegisterForm}>
            <h1>Criar conta</h1>
            <form onSubmit={registerUser}>
                <Input
                text="Nome de usuário"
                type="text"
                name='username'
                id='username'
                onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                text="Email"
                type="email"
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                text="Senha"
                type="password"
                name='password' 
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                text="Confirmar senha"
                type="password"
                name='confirmPassword'
                id='confirmPassword'
                onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Submit/>
            </form>
        </div>
    )
}

export default RegisterForm