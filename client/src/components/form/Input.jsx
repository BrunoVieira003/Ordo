import styles from './Input.module.css'

function Input({name, type, text, onChange}){
    return (
        <div className={styles.Input}>
            <label htmlFor={name}>{text}</label>
            <input
            type={type}
            name={name}
            id={name}
            onChange={onChange}
            />
        </div>
    )
}

export default Input