import { createContext, useContext, useState, useEffect } from 'react';
import { Storage, generateId } from '../utils/helpers';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [folders, setFolders] = useState(() => Storage.get('folders', []));
    const [sessions, setSessions] = useState(() => Storage.get('sessions', []));
    const [currentModal, setCurrentModal] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [notification, setNotification] = useState(null);
    const [editingFolder, setEditingFolder] = useState(null);
    const [editingCard, setEditingCard] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const [filterType, setFilterType] = useState('folder');

    const [studySession, setStudySession] = useState({
        cards: [],
        currentCardIndex: 0,
        answers: []
    });

    useEffect(() => {
        Storage.set('folders', folders);
    }, [folders]);

    useEffect(() => {
        Storage.set('sessions', sessions);
    }, [sessions]);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    const createFolder = (name) => {
        const newFolder = {
            id: generateId(),
            name,
            date: new Date().toLocaleDateString('en-CA'),
            cards: []
        };
        setFolders([...folders, newFolder]);
        showNotification('✅ Folder created successfully!');
    };

    const updateFolder = (updatedFolder) => {
        setFolders(folders.map(f => f.id === updatedFolder.id ? updatedFolder : f));
        if (selectedFolder?.id === updatedFolder.id) {
            setSelectedFolder(updatedFolder);
        }
        showNotification('✅ Folder updated successfully!');
    };

    const deleteFolder = (folder) => {
        setFolders(folders.filter(f => f.id !== folder.id));
        setSessions(sessions.filter(s => s.folderName !== folder.name));
        if (selectedFolder?.id === folder.id) {
            setSelectedFolder(null);
        }
        showNotification('✅ Folder deleted successfully!');
    };

    const createCard = (question, answer) => {
        if (!selectedFolder) return;

        const newCard = {
            id: generateId(),
            question,
            answer,
            date: new Date().toLocaleDateString('en-CA')
        };

        const updatedFolders = folders.map(f =>
            f.id === selectedFolder.id
                ? { ...f, cards: [...f.cards, newCard] }
                : f
        );

        setFolders(updatedFolders);
        const updatedFolder = updatedFolders.find(f => f.id === selectedFolder.id);
        setSelectedFolder(updatedFolder);

        showNotification('✅ Flashcard created successfully!');
    };

    const updateCard = (folderId, updatedCard) => {
        const updatedFolders = folders.map(f =>
            f.id === folderId
                ? { ...f, cards: f.cards.map(c => c.id === updatedCard.id ? updatedCard : c) }
                : f
        );

        setFolders(updatedFolders);

        if (selectedFolder?.id === folderId) {
            const updatedFolder = updatedFolders.find(f => f.id === folderId);
            setSelectedFolder(updatedFolder);
        }

        showNotification('✅ Flashcard updated successfully!');
    };

    const deleteCard = (folderId, card) => {
        const updatedFolders = folders.map(f =>
            f.id === folderId
                ? { ...f, cards: f.cards.filter(c => c.id !== card.id) }
                : f
        );

        setFolders(updatedFolders);

        if (selectedFolder?.id === folderId) {
            const updatedFolder = updatedFolders.find(f => f.id === folderId);
            setSelectedFolder(updatedFolder);
        }

        showNotification('✅ Flashcard deleted successfully!');
    };

    const startStudySession = (folder) => {
        if (!folder || folder.cards.length === 0) {
            showNotification('❌ This folder has no flashcards!', 'error');
            return;
        }

        setStudySession({
            cards: folder.cards,
            currentCardIndex: 0,
            answers: []
        });

        setSelectedFolder(folder);
    };

    const handleAnswer = (isCorrect) => {
        setStudySession(prev => ({
            ...prev,
            answers: [...prev.answers, isCorrect]
        }));
    };

    const handleNextCard = () => {
        const nextIndex = studySession.currentCardIndex + 1;

        if (nextIndex >= studySession.cards.length) {
            saveSession();
            return true; // Session complete
        } else {
            setStudySession(prev => ({
                ...prev,
                currentCardIndex: nextIndex
            }));
            return false; // More cards
        }
    };

    const saveSession = () => {
        const totalCards = studySession.answers.length;
        const correctAnswers = studySession.answers.filter(a => a === true).length;
        const percentage = Math.round((correctAnswers / totalCards) * 100);

        const newSession = {
            folderName: selectedFolder.name,
            percentage,
            correctAnswers,
            wrongAnswers: totalCards - correctAnswers,
            timestamp: new Date().toISOString(),
        };

        setSessions([...sessions, newSession]);
    };

    const value = {
        // State
        folders,
        sessions,
        currentModal,
        selectedFolder,
        notification,
        editingFolder,
        editingCard,
        confirmAction,
        filterType,
        studySession,

        // Setters
        setCurrentModal,
        setSelectedFolder,
        setNotification,
        setEditingFolder,
        setEditingCard,
        setConfirmAction,
        setFilterType,

        // Actions
        showNotification,
        createFolder,
        updateFolder,
        deleteFolder,
        createCard,
        updateCard,
        deleteCard,
        startStudySession,
        handleAnswer,
        handleNextCard,
        saveSession,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};