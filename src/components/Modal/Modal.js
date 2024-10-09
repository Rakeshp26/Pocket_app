import React, { useEffect, useState, useRef } from 'react';
import styles from './Modal.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colors } from '../../utils/constants';
import { useModal } from './ModalContext';

export const Modal = (props) => {
    const [groupTitle, setGroupTitle] = useState(''); // Changed variable name
    const [activeColor, setActiveColor] = useState(null); // Changed variable name
    const [groupList, setGroupList] = useState([]); // Changed variable name
    const [activeColorIndex, setActiveColorIndex] = useState(null); // Changed variable name
    const { showModal, setShowModal } = useModal();
    const modalWrapperRef = useRef(null); // Changed variable name

    useEffect(() => {
        const savedGroups = JSON.parse(localStorage.getItem("createdGroups")); // Changed variable name
        if (savedGroups) {
            setGroupList(savedGroups);
        }
    }, []);

    const selectColor = (index) => { // Changed function name
        setActiveColor(colors[index]);
        setActiveColorIndex(index);
    };

    const handleInputChange = (e) => { // Changed function name
        setGroupTitle(e.target.value);
    };

    const handleGroupCreation = () => { // Changed function name
        if (groupTitle && activeColor) {
            const duplicateExists = groupList.some(group => group.text === groupTitle); // Changed variable name
            if (!duplicateExists) {
                const newGroupData = {
                    id: groupList.length,
                    text: groupTitle,
                    color: activeColor,
                    notes: []
                };

                const updatedGroupList = [...groupList, newGroupData]; // Changed variable name
                localStorage.setItem("createdGroups", JSON.stringify(updatedGroupList));
                props.updateGroups(updatedGroupList);
                setGroupTitle("");
                setActiveColor(null);
                setShowModal(false);
                toast.success("Group Created Successfully!!");
            } else {
                toast.error('Group Name already exists!');
            }
        } else {
            toast.error('Please enter group name and select a color!');
        }
    };

    useEffect(() => {
        const handleClickOutsideModal = (event) => {
            if (modalWrapperRef.current && !modalWrapperRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideModal);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, [setShowModal]);

    return (
        <div className={styles.container} id="modal" ref={modalWrapperRef} style={{ display: showModal ? 'flex' : 'none' }}>
            <div className={styles.content}>
                <h1>Create New Group</h1>
                <div className={styles.text}>
                    <label htmlFor="group">Group Name 
                        <input maxLength={15} onChange={handleInputChange} type="text" name="group" placeholder='Enter Group Name' />
                    </label>
                </div>
                <div className={styles.colors}>
                    <h1>Choose Color</h1>
                    {colors.map((color, index) => (
                        <div key={index} className={styles.color}>
                            <p style={{
                                background: `${color}`,
                                border: activeColorIndex === index ? '3px solid grey' : 'none'
                            }} onClick={() => selectColor(index)}></p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.btn}>
                <button onClick={handleGroupCreation}>Create</button>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    closeButton={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark" />
            </div>
        </div>
    );
};
