import UserContext from '../contexts/UserContext'
import { useContext, useState, useEffect } from 'react'

import styles from './ProfilePage.module.css'


function ProfilePage(props){
    const { token } = useContext(UserContext)
    const [user, setUser] = useState()

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

    return (
        <div className={styles.ProfilePage}>
            <h1>Bem vindo, {user?.username}</h1>
        </div>
    )
}

export default ProfilePage