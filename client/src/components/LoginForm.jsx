import { Link, useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import Input from './form/Input'
import Submit from './form/Submit'
import { useForm } from 'react-hook-form'

import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

function LoginForm(props){
    const { setToken } = useContext(UserContext)
    const { register, handleSubmit, formState: {errors}, setError, reset, clearErrors } = useForm()
    const navigate = useNavigate()

    async function userExists(value){
        const res = await fetch(`/checkemail/${value}`)
        const data = await res.json()
        return data?.status === 'taken' || 'Email não encontrado'
    }

    async function onSubmit(data){

        await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(resp => {
            if(resp.ok){
                return resp.json()
            }
            setError('form', { type: 'auth', message: 'Email e/ou senha são inválidos' })
            reset({}, {keepErrors: true, keepValues: true})
            return Promise.reject(resp)
            
        })
        .then(data => {
            setToken(data?.token)
        })
        .then(() => navigate('/'))
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.LoginForm}>
            <h1>Entrar</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                clearErrors()
                handleSubmit(onSubmit)()
            } }>
                <span>{errors?.form?.message}</span>
                    
                <Input
                label="Email"
                type="email"
                name='email'
                register={register}
                validation={{
                    required: 'Digite um email válido',
                    validate: userExists
                }}
                errors={errors}
                />
                
                <Input
                label="Senha"
                type="password"
                name='password'
                register={register}
                validation={{
                    required: 'Insira uma senha'
                }}
                errors={errors}
                />

                <Link to='/register'>Ainda não possuo uma conta</Link>

                <Submit/>
            </form>

        </div>
    )
}

export default LoginForm