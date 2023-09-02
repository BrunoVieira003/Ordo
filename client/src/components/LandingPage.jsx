import styles from './LandingPage.module.css'

function LandingPage(props){
    return (
        <div className={styles.LandingPage}>
            <h1>Bem-vindo ao Ordo</h1>
            <p>A ferramenta de que ajuda sua equipe a organizar seus projetos</p>
        </div>
    )
}

export default LandingPage