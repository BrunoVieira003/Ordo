import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom'

function LandingPage(props){
    return (
        <div className={styles.LandingPage}>
            <h1>Bem-vindo ao Ordo</h1>
            <p>A ferramenta de que ajuda sua equipe a organizar seus projetos</p>
            <Link to='/login'>Começar agora</Link>
        </div>
    )
}

export default LandingPage