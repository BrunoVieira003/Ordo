import { useEffect } from 'react'
import styles from './Task.module.css'

function Task(props){

    async function deleteTask(id){
        fetch(`/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
            }
        })
    }


    return (
        <div className={styles.Task}>
            <div className={styles.TaskInfo}>
                <h3>{props.title}</h3>
                {props.description &&
                    <p>{props.description}</p>}
            </div>
            <button onClick={()=>{
                deleteTask(props.id)
                props.afterCallback()
            }}>Excluir</button>
        </div>
    )
}

export default Task