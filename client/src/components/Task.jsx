import styles from './Task.module.css'

function Task(props){
    return (
        <div className={styles.Task}>
            <div className={styles.TaskInfo}>
                <h3>{props.title}</h3>
                {props.description &&
                    <p>{props.description}</p>}
            </div>
        </div>
    )
}

export default Task