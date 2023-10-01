import { useState } from 'react'
import styles from './DropdownMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function DropdownMenu(props){
    const [visible, setVisible] = useState(false)

    return (
        <div className={styles.DropdownMenu}>
            <div onClick={()=>{setVisible(!visible)}} className={styles.toggle}>
                <button>{props?.text || "Toggle"}</button>
                <FontAwesomeIcon className={`${styles.caretIcon} ${visible && styles.visible}`} icon={faCaretDown}/>
            </div>

            
            <div className={`${styles.DropdownMenuContent} ${visible && styles.visible}`} >
                {props?.children}
            </div>
            
        </div>
    )
}

export default DropdownMenu