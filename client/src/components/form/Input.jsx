import styles from './Input.module.css'
import { useForm } from 'react-hook-form'

function Input({name, type, label, register, validation, errors}){
    

    return (
        <div className={styles.Input}>
            <label htmlFor={name}>{label}</label>
            <input
            type={type}
            {...register(name, validation)}
            />
            {errors && errors[name]?.type === "required" && (
                <span className="error">{errors[name]?.message}</span>
    )}
        </div>
    )
}

export default Input