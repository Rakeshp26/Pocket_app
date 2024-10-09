import React, { useEffect, useRef, useState } from 'react';
import arrow from '../../assets/arrow.png';
import arrow2 from '../../assets/arrow2.png';
import backArrow from '../../assets/back_arrow.png'; // Changed variable name
import styles from './NotesDisplay.module.css';
import { generateInitials } from '../../utils/constants';

export const NotesDisplay = (props) => {
    const [notesList, setNotesList] = useState(() => { // Changed variable name
        const savedData = JSON.parse(localStorage.getItem("createdGroups")); // Changed variable name
        return Array.isArray(savedData) ? savedData : [];
    });

    const [tempNote, setTempNote] = useState(); // Changed variable name
    const [activeNote, setActiveNote] = useState(notesList[props.groupId] || { notes: [] }); // Changed variable name
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); // Changed variable name
    const noteInput = useRef(null); // Changed variable name

    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = JSON.parse(localStorage.getItem("createdGroups"));
        const validData = Array.isArray(storedData) ? storedData : [];

        // Update notes list state
        setNotesList(validData);

        // Update active note based on groupId
        setActiveNote(validData[props.groupId] || { notes: [] });

    }, [props.groupId, setNotesList]);

    const handleInputChange = (e) => { // Changed function name
        const trimmedValue = (e.target.value).trim();
        
        if (trimmedValue.length > 0) {
            setTempNote(trimmedValue);
            setIsSubmitEnabled(true);
        } else {
            setIsSubmitEnabled(false);
        }
    };

    const handleNoteSubmission = () => { // Changed function name
        const newNoteData = {
            text: tempNote,
            date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        };

        if (tempNote && tempNote.length !== 0) {
            setNotesList((previousNotes) => {
                const updatedNotesList = [...previousNotes];
                updatedNotesList[props.groupId].notes.push(newNoteData);
                localStorage.setItem("createdGroups", JSON.stringify(notesList)); // Changed variable name
                noteInput.current.value = "";
                setTempNote("");
                return updatedNotesList;
            });
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <img onClick={() => props.goBack()} src={backArrow} alt="back button" /> {/* Changed variable name */}
                <p style={{ backgroundColor: `${activeNote.color}` }}>{generateInitials(activeNote.text)}</p> {/* Changed variable name */}
                <h1>{activeNote?.text}</h1> {/* Changed variable name */}
            </div>
            <div className={styles.notesSection}> {/* Changed class name */}
                {activeNote.notes.length > 0 && activeNote.notes.map((note, idx) => ( /* Changed variable name */
                    <div key={idx} className={styles.noteItem}> {/* Changed class name */}
                        <p>{note.text}</p>
                        <h4>{note.date} &bull; {note.time}</h4>
                    </div>
                ))}
            </div>
            <div className={styles.textArea}> {/* Changed class name */}
                <textarea onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        setIsSubmitEnabled(false);
                        handleNoteSubmission();
                    }
                }} ref={noteInput} onChange={handleInputChange} cols="130" rows="10" placeholder='Enter text here...'></textarea> {/* Changed variable name */}
                <img onClick={handleNoteSubmission} src={isSubmitEnabled ? arrow2 : arrow} alt="" /> {/* Changed variable name */}
            </div>
        </div>
    );
};
