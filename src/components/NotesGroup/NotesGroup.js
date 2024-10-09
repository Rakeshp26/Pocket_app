import React, { useEffect, useState } from 'react'
import styles from './NotesGroup.module.css'
import { generateInitials } from '../../utils/constants'

export const NotesGroup = (props) => {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const handleGroupClick = (groupId) => {
    props.getNotes(groupId)
    setSelectedGroupId(groupId)
  }
  return (
    <>
      <div className={styles.container}>
        <h1>Pocket Notes</h1>
        {props.groups && props.groups.map((group) => (
          
            <div style={{ cursor: "pointer" }} onClick={() => handleGroupClick(group.id)} key={group.id} className={`${styles.notes_group} ${
              selectedGroupId === group.id ? styles.selected : ''
            }`}>
              <p style={{ backgroundColor: `${group.color}` }}>{generateInitials(group.text)}</p><p>{group.text}</p>
            </div>
         
        ))}


        <button onClick={() => { props.setShowModal((prevState) => !prevState) }}>+</button>
      </div>
    </>
  )
}
