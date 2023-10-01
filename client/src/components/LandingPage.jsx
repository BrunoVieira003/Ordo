import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

function LandingPage(props){
    const {token} = useContext(UserContext)

    if (token.token) {
        return (
            <ProfilePage/>
        )
    }
    return (
        <div className={styles.LandingPage}>
            <h1>Bem-vindo ao Ordo</h1>
            <p>A ferramenta de que ajuda sua equipe a organizar seus projetos</p>
            <Link to='/login'>Começar agora</Link>
        </div>
    )
}

export default LandingPage