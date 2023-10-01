import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from './RegisterForm.module.css'
import Input from './form/Input'
import Submit from './form/Submit'

function RegisterForm(props){

    const { register, handleSubmit, watch, formState: {errors} } = useForm()
    const navigate = useNavigate()

    const watchPassword = watch('password')

    async function usernameAvailable(value){
        const res = await fetch(`/checkname/${value}`)
        const data = await res.json()
        return data?.status === 'available' || 'Nome de usuário já está em uso'
    }

    async function emailAvailable(value){
        const res = await fetch(`/checkemail/${value}`)
        const data = await res.json()
        return data?.status === 'available' || 'Esse email já está vinculado a uma conta'
    }

    function onSubmit(data){

        fetch('/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then((res) => navigate('/'))
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.RegisterForm}>
            <h1>Criar conta</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(onSubmit)()
                } }>
                    
                <Input
                label="Nome de usuário"
                type="text"
                name='username'
                register={register}
                validation={{
                    required: 'Escolha um nome de usuário',
                    validate: usernameAvailable
                }}
                errors={errors}
                />
                    
                <Input
                label="Email"
                type="email"
                name='email'
                register={register}
                validation={{
                    required: 'Insira um email válido',
                    validate: emailAvailable
                }}
                errors={errors}
                />
                    
                <Input
                label="Senha"
                type="password"
                name='password'
                register={register}
                validation={{
                    required: 'Escolha uma senha'
                }}
                errors={errors}
                />
                    
                <Input
                label="Confirmar senha"
                type="password"
                name='confirmPassword'
                register={register}
                validation={{
                    required: 'Confirme sua senha',
                    validate: (value) => value === watchPassword || 'A senhas devem ser iguais'
                }}
                errors={errors}
                />
                <Link to='/login'>Já possuo uma conta</Link>
                <Submit/>
            </form>
        </div>
    )
}

export default RegisterForm