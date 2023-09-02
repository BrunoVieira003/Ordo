import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header(props){
    return (
        <div className={styles.Header}>
            <nav>
                <Link to='/'>Home</Link>
            </nav>
        </div>
    )
}

export default Header