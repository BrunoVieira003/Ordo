import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'

function Header(props){
    const {user, setUser} = useContext(UserContext)

    return (
        <div className={styles.Header}>
            <h1><Link to='/'>Ordo</Link></h1>
            <nav>
                {!user?.token && 
                    <>
                    <Link to='/register'>Criar conta</Link>
                    <Link to='/login'>Entrar</Link>
                    </>
                }
                {user?.token && <button onClick={() => setUser({})}>Sair</button>}
            </nav>
        </div>
    )
}

export default Header