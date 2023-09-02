import styles from './Submit.module.css'

function Submit({text="Enviar"}){
    return (
        <div className={styles.Submit}>
            <input type="submit" value={text}/>
        </div>
    )
}

export default Submit