import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'

function Header(props){
    const {token, setToken} = useContext(UserContext)
    const navigate = useNavigate()

    function logout(){
        setToken("")
        navigate('/')
    }

    return (
        <div className={styles.Header}>
            <h1><Link to='/'>Ordo</Link></h1>
            <nav>
                {!token.token && 
                    <>
                    <Link to='/register'>Criar conta</Link>
                    <Link to='/login'>Entrar</Link>
                    </>
                }
                {token.token && <>
                    <Link to="/profile">Perfil</Link>
                    <button onClick={() => logout()}>Sair</button>
                </>}
            </nav>
        </div>
    )
}

export default Header