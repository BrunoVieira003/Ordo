import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header(props){
    return (
        <div className={styles.Header}>
            <h1><Link to='/'>Ordo</Link></h1>
            <nav>
                <Link to='/register'>Criar conta</Link>
            </nav>
        </div>
    )
}

export default Header