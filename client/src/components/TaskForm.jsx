import { useForm } from 'react-hook-form'
import styles from './TaskForm.module.css'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import Input from './form/Input'
import Submit from './form/Submit'

function TaskForm(props){
    const { token } = useContext(UserContext)
    const { register, handleSubmit, formState: {errors}, clearErrors } = useForm()

    async function onSubmit(data){

        await fetch('/task', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(resp => {
            if(resp.ok){
                return resp.json()
            }
            return Promise.reject(resp)
            
        })
        .then(data => {
            console.log(data)
            if (props.afterCallback) {
                props.afterCallback()
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.TaskForm}>
            <form onSubmit={(e) => {
                e.preventDefault()
                clearErrors()
                handleSubmit(onSubmit)()}}>
                <Input
                name='title'
                type='text'
                label='Título da tarefa'
                register={register}
                validation={{
                    required: 'Escolha um título para a tarefa'
                }}
                errors={errors}

                />
                <Input
                name='description'
                type='text'
                label='Descrição da tarefa'
                register={register}
                errors={errors}

                />
                <Submit text='Criar'/>
            </form>
        </div>
    )
}

export default TaskForm