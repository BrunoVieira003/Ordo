import { useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import { useContext, useEffect } from 'react'

function ProtectedRoute({children}){
    const { token } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if (!token){
            navigate('/login')
        }
    }, [token])

    return children
}

export default ProtectedRoute