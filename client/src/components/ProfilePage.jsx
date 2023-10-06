import UserContext from '../contexts/UserContext'
import { useContext, useState, useEffect } from 'react'

import styles from './ProfilePage.module.css'
import TaskForm from './TaskForm'
import Task from './Task'


function ProfilePage(props){
    const { token } = useContext(UserContext)
    const [user, setUser] = useState()
    const [formVisible, setFormVisible] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch('/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((resp) => {
            if(resp.ok){
                return resp.json()
            }
            return Promise.reject(resp)
            
        })
        .then(data => setUser(data))
        .catch((err) => console.log(err))
     }, [token]);


    function loadTasks(){
        fetch('/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((resp) => {
            if(resp.ok){
                return resp.json()
            }
            return Promise.reject(resp)
            
        })
        .then(data => setTasks(data))
        .catch((err) => console.log(err))
     };

     useEffect(loadTasks, [])

    return (
        <div className={styles.ProfilePage}>
            <h1>Bem vindo, {user?.username}</h1>
            <div className={styles.TaskTable}>
                <div className={styles.TableActions}>
                    <button onClick={()=>{setFormVisible(true)}}>Adicionar tarefa</button>
                </div>
                {formVisible && 
                <TaskForm afterCallback={()=>{loadTasks()
                    setFormVisible(false)}} 
                />}

                {tasks.map((task, index)=>(
                    <Task
                        key={index}
                        title={task.title}
                        description={task.description}

                    />
                ))}
                
                    
            </div>

        </div>
    )
}

export default ProfilePage