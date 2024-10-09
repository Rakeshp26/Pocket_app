import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { NotesGroup } from '../../components/NotesGroup/NotesGroup';
import { NotesHome } from '../../components/NotesHome/NotesHome';
import { NotesDisplay } from '../../components/NotesDisplay/NotesDisplay';
import { Modal } from '../../components/Modal/Modal';
import { useModal } from '../../components/Modal/ModalContext';

export const Home = () => {
  const [noteGroups, setNoteGroups] = useState(() => JSON.parse(localStorage.getItem("createdGroups"))); // Renamed variable
  const [currentGroupId, setCurrentGroupId] = useState(); // Renamed variable
  const [isHomeView, setIsHomeView] = useState(true); // Renamed variable
  const [isMobile, setIsMobile] = useState(false); // Renamed variable
  const [showNotes, setShowNotes] = useState(false); // Renamed variable
  const [navigateBack, setNavigateBack] = useState(false); // Renamed variable
  const { showModal, setShowModal } = useModal();

  const refreshGroups = (updatedGroup) => {
    setNoteGroups(updatedGroup);
  };

  const loadNotes = (id) => {
    setCurrentGroupId(id);
    setIsHomeView(false);
    setShowNotes(true);
    setNavigateBack(false);
  };

  const detectMobileView = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleBackNavigation = () => {
    setNavigateBack(true);
    setShowNotes(false);
  };

  useEffect(() => {
    localStorage.setItem("createdGroups", JSON.stringify(noteGroups));
  }, [noteGroups]);

  useEffect(() => {
    detectMobileView();
    window.addEventListener('resize', detectMobileView);
    return () => {
      window.removeEventListener('resize', detectMobileView);
    };
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        {!isMobile && <NotesGroup setShowModal={setShowModal} groups={noteGroups} getNotes={loadNotes} />}
        {(!showNotes && isMobile) && <NotesGroup setShowModal={setShowModal} groups={noteGroups} getNotes={loadNotes} />}
        {(showModal && isMobile) && <Modal updateGroups={refreshGroups} />}
        {(showNotes && isMobile) && <NotesDisplay groupId={currentGroupId} goBack={handleBackNavigation} />}
      </div>
      <div className={styles.right}>
        {!isMobile && (isHomeView ? <NotesHome /> : <NotesDisplay groupId={currentGroupId} />)}
        {showModal && !isMobile && <Modal updateGroups={refreshGroups} />}
      </div>
    </div>
  );
};
