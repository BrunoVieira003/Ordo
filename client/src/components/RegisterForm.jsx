import styles from './RegisterForm.module.css'

function RegisterForm(props){
    return (
        <div className={styles.RegisterForm}>
            <h1>Criar conta</h1>
            <form>
                <label>Nome de usuário</label>
                <input type="text" />
                <label htmlFor="">Senha</label>
                <input type="password" />
                <label htmlFor="">Confirmar senha</label>
                <input type="password" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default RegisterForm