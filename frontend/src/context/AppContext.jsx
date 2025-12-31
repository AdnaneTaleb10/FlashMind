import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import {
    getAllFolders,
    getRecentFolders,
    createFolder as createFolderAPI,
    updateFolder as updateFolderAPI,
    deleteFolder as deleteFolderAPI,
    getFolderCards
} from '../services/folderService';
import {
    createFlashcard,
    updateFlashcard,
    deleteFlashcard
} from '../services/flashcardService';
import {
    startStudySession as startStudySessionAPI,
    endStudySession,
    getStudyHistory
} from '../services/studyService';
import {
    getUserProfile,
    updateUserProfile,
    changePassword
} from '../services/userService';
import { logoutUser } from '../services/authService';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // State
    const [folders, setFolders] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [userInfo, setUserInfo] = useState({
        username: '',
        name: '',
        email: '',
        password: '********'
    });
    const [currentModal, setCurrentModal] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [notification, setNotification] = useState(null);
    const [editingFolder, setEditingFolder] = useState(null);
    const [editingCard, setEditingCard] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const [filterType, setFilterType] = useState('date');
    const [isLoading, setIsLoading] = useState(false);

    const [studySession, setStudySession] = useState({
        sessionId: null,
        cards: [],
        currentCardIndex: 0,
        answers: []
    });

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    // User Profile Operations
    const fetchUserProfile = async () => {
        try {
            const userData = await getUserProfile();
            setUserInfo({
                username: userData.username || '',
                name: userData.name || '',
                email: userData.email || '',
                password: '********'
            });
            return userData;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            toast.error('Failed to load user profile');
            throw error;
        }
    };

    const updateProfile = async (name, username) => {
        try {
            await updateUserProfile(name, username);

            setUserInfo(prev => ({
                ...prev,
                name,
                username
            }));

            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.message || 'Failed to update profile');
            throw error;
        }
    };

    const updatePassword = async (currentPassword, newPassword) => {
        console.log('updatePassword called in AppContext');
        console.log('currentPassword:', currentPassword ? '***filled***' : 'empty');
        console.log('newPassword:', newPassword ? '***filled***' : 'empty');
        console.log('newPassword length:', newPassword?.length);

        if (!currentPassword || !newPassword) {
            console.log('Validation failed: empty fields');
            toast.error('Please fill in both password fields');
            throw new Error('Please fill in both password fields');
        }
        if (newPassword.length < 6) {
            console.log('Validation failed: password too short');
            toast.error('New password must be at least 6 characters');
            throw new Error('New password must be at least 6 characters');
        }

        try {
            console.log('Calling changePassword API...');
            const result = await changePassword(currentPassword, newPassword);
            console.log('API call successful:', result);
            toast.success('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
            console.error('Error message:', error.message);
            toast.error(error.message || 'Failed to update password');
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await logoutUser();

            // Clear all state
            setFolders([]);
            setSessions([]);
            setUserInfo({
                username: '',
                name: '',
                email: '',
                password: '********'
            });
            setSelectedFolder(null);
            setStudySession({
                sessionId: null,
                cards: [],
                currentCardIndex: 0,
                answers: []
            });

            toast.success('Logged out successfully!');
            return true;
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Failed to logout');
            return false;
        }
    };

    // Folder Operations
    const createFolder = async (name) => {
        try {
            const newFolderData = await createFolderAPI(name);

            const newFolder = {
                id: newFolderData.id,
                name: newFolderData.folderName,
                date: new Date(newFolderData.createdAt).toLocaleDateString('en-CA'),
                cards: []
            };

            setFolders([newFolder, ...folders]);
            toast.success('Folder created successfully!');
            return newFolder;
        } catch (error) {
            console.error('Error creating folder:', error);
            toast.error(error.message || 'Failed to create folder');
            throw error;
        }
    };

    const updateFolder = async (updatedFolder) => {
        try {
            await updateFolderAPI(updatedFolder.id, updatedFolder.name);

            setFolders(folders.map(f =>
                f.id === updatedFolder.id ? { ...f, name: updatedFolder.name } : f
            ));

            if (selectedFolder?.id === updatedFolder.id) {
                setSelectedFolder({ ...selectedFolder, name: updatedFolder.name });
            }

            toast.success('Folder updated successfully!');
        } catch (error) {
            console.error('Error updating folder:', error);
            toast.error(error.message || 'Failed to update folder');
            throw error;
        }
    };

    const deleteFolder = async (folder) => {
        try {
            await deleteFolderAPI(folder.id);

            setFolders(folders.filter(f => f.id !== folder.id));
            setSessions(sessions.filter(s => s.folderName !== folder.name));

            if (selectedFolder?.id === folder.id) {
                setSelectedFolder(null);
            }

            toast.success('Folder deleted successfully!');
        } catch (error) {
            console.error('Error deleting folder:', error);
            toast.error(error.message || 'Failed to delete folder');
            throw error;
        }
    };

    // Card Operations
    const createCard = async (question, answer) => {
        if (!selectedFolder) {
            toast.error('No folder selected');
            return;
        }

        try {
            const newCardData = await createFlashcard(selectedFolder.id, question, answer);

            const newCard = {
                id: newCardData.id,
                question: newCardData.frontText,
                answer: newCardData.backText,
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

            toast.success('Flashcard created successfully!');
        } catch (error) {
            console.error('Error creating card:', error);
            toast.error(error.message || 'Failed to create flashcard');
            throw error;
        }
    };

    const updateCard = async (folderId, updatedCard) => {
        try {
            await updateFlashcard(updatedCard.id, updatedCard.question, updatedCard.answer);

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

            toast.success('Flashcard updated successfully!');
        } catch (error) {
            console.error('Error updating card:', error);
            toast.error(error.message || 'Failed to update flashcard');
            throw error;
        }
    };

    const deleteCard = async (folderId, card) => {
        try {
            await deleteFlashcard(card.id);

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

            toast.success('Flashcard deleted successfully!');
        } catch (error) {
            console.error('Error deleting card:', error);
            toast.error(error.message || 'Failed to delete flashcard');
            throw error;
        }
    };

    // Study Session Operations
    const startStudySession = async (folder) => {
        if (!folder || !folder.cards || folder.cards.length === 0) {
            toast.error('❌ This folder has no flashcards!');
            return false;
        }

        try {
            const sessionData = await startStudySessionAPI(folder.id);

            const transformedCards = sessionData.cards.map(card => ({
                id: card.id,
                question: card.frontText,
                answer: card.backText
            }));

            setStudySession({
                sessionId: sessionData.sessionId,
                cards: transformedCards,
                currentCardIndex: 0,
                answers: []
            });

            setSelectedFolder(folder);
            return true;
        } catch (error) {
            console.error('Error starting study session:', error);
            toast.error(error.message || 'Failed to start study session');
            return false;
        }
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
            return true;
        } else {
            setStudySession(prev => ({
                ...prev,
                currentCardIndex: nextIndex
            }));
            return false;
        }
    };

    const saveSession = async () => {
        const totalCards = studySession.answers.length;
        const correctAnswers = studySession.answers.filter(a => a === true).length;
        const score = Math.round((correctAnswers / totalCards) * 100);

        try {
            await endStudySession(studySession.sessionId, score);

            const newSession = {
                id: Date.now(),
                folderName: selectedFolder.name,
                percentage: score,
                correctAnswers,
                wrongAnswers: totalCards - correctAnswers,
                timestamp: new Date().toISOString(),
            };

            setSessions([...sessions, newSession]);

            toast.success('Study session saved!');
        } catch (error) {
            console.error('Error saving session:', error);
            toast.error('Failed to save study session');
        }
    };

    const value = {
        // State
        folders,
        sessions,
        userInfo,
        currentModal,
        selectedFolder,
        notification,
        editingFolder,
        editingCard,
        confirmAction,
        filterType,
        studySession,
        isLoading,

        // Setters
        setFolders,
        setSessions,
        setUserInfo,
        setIsLoading,
        setCurrentModal,
        setSelectedFolder,
        setNotification,
        setEditingFolder,
        setEditingCard,
        setConfirmAction,
        setFilterType,

        // Actions
        showNotification,
        fetchUserProfile,
        updateProfile,
        updatePassword,
        logout,
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