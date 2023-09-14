import { useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import Input from './form/Input'
import Submit from './form/Submit'
import { useForm } from 'react-hook-form'

function LoginForm(props){
    const { register, handleSubmit, formState: {errors} } = useForm()
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
            return Promise.reject(resp)
            
        })
        .then((res) => navigate('/'))
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.LoginForm}>
            <h1>Entrar</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(onSubmit)()
                } }>
                    
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
                <Submit/>
            </form>

        </div>
    )
}

export default LoginForm