import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header(props){
    return (
        <div className={styles.Header}>
            <h1>Ordo</h1>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/register'>Criar conta</Link>
            </nav>
        </div>
    )
}

export default Header