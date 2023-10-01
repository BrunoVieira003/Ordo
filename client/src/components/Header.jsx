import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext, useState, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import DropdownMenu from './DropdownMenu'

function Header(props){
    const {token, setToken} = useContext(UserContext)
    const [user, setUser] = useState()
    const navigate = useNavigate()

    function logout(){
        setToken("")
        navigate('/')
    }

    useEffect(() => {
        if (token) {
            fetch('/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-access-token': token
                }
            })
            .then((resp) => {
                if(resp.ok){
                    return resp.json()
                }
                return Promise.reject(resp)
                
            })
            .then(data => setUser(data))
            .catch((err) => console.log(err))
        }
     }, [token]);

    return (
        <div className={styles.Header}>
            <h1><Link to='/'>Ordo</Link></h1>
            <nav>
                {!token && 
                    <>
                    <Link to='/login'>Entrar</Link>
                    <Link to='/register'>Criar conta</Link>
                    </>
                }
                {token &&
                    <DropdownMenu text={user?.name}>
                        <button onClick={logout}>Sair</button>
                    </DropdownMenu>
                }
            </nav>
        </div>
    )
}

export default Header