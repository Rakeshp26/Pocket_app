import React from 'react'
import styles from './NotesHome.module.css'
import homeImage from '../../assets/home.png'
import lock from '../../assets/lock.png'

export const NotesHome = () => {
  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <img src={homeImage} alt="home background image" />
            <h1>Pocket Notes</h1>
            
            <p className={styles.description}>Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

            <p className={styles.encryption}><img src={lock} alt="" /> end-to-end encrypted</p>
        </div>
    </div>
  )
}
