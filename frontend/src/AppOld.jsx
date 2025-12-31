import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import Dashboard from './pages/Dashboard/Dashboard';
import FolderView from './pages/FolderView/FolderView';
import FolderDetails from './pages/FolderDetails/FolderDetails';
import StudyQuestion from './pages/StudyQuestion/StudyQuestion';
import StudyAnswer from './pages/StudyAnswer/StudyAnswer';
import StudyHistory from './pages/StudyHistory/StudyHistory';
import SessionResults from './pages/SessionResults/SessionResults';
import CreateFolderModal from './components/Modal/CreateFolderModal/CreateFolderModal';
import CreateFlashcardModal from './components/Modal/CreateFlashcardModal/CreateFlashcardModal';
import FilterHistoryModal from './components/Modal/FilterHistoryModal/FilterHistoryModal';
import EditFolderModal from './components/Modal/EditFolderModal/EditFolderModal';
import EditCardModal from './components/Modal/EditCardModal/EditCardModal';
import ConfirmModal from './components/Modal/ConfirmModal/ConfirmModal';
import Notification from './components/Notification/Notification';
import { Storage, generateId } from './utils/helpers';
import './App.css';

const App = () => {
    const [folders, setFolders] = useState(() => Storage.get('folders', [
        {
            id: generateId(),
            name: 'French',
            date: '2025/11/24',
            cards: [
                {
                    id: generateId(),
                    question: '"Bonjour" means what?',
                    answer: '"Bonjour" means "Good Morning"',
                    date: '2025/11/24'
                },
                {
                    id: generateId(),
                    question: '"Merci" means what?',
                    answer: '"Merci" means "Thank you"',
                    date: '2025/11/24'
                },
                {
                    id: generateId(),
                    question: '"Au revoir" means what?',
                    answer: '"Au revoir" means "Goodbye"',
                    date: '2025/11/24'
                }
            ]
        }
    ]));

    const [sessions, setSessions] = useState(() => Storage.get('sessions', []));
    const [currentPage, setCurrentPage] = useState('dashboard');
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

    const handleNavigate = (page, folder = null) => {
        setCurrentPage(page);
        if (folder) setSelectedFolder(folder);
    };

    const handleOpenModal = (modal) => {
        setCurrentModal(modal);
    };

    const handleCloseModal = () => {
        setCurrentModal(null);
        setEditingFolder(null);
        setEditingCard(null);
        setConfirmAction(null);
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
        setCurrentPage('studyQuestion');
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
            setCurrentPage('sessionResults');
        } else {
            setStudySession(prev => ({
                ...prev,
                currentCardIndex: nextIndex
            }));
            setCurrentPage('studyQuestion');
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

    const handleEditFolder = (folder) => {
        setEditingFolder(folder);
        setCurrentModal('editFolder');
    };

    const handleDeleteFolder = (folder) => {
        setConfirmAction({
            message: `Are you sure you want to delete "${folder.name}"? This will also delete all flashcards in this folder and related study history.`,
            onConfirm: () => {
                deleteFolder(folder);
                handleCloseModal();
                if (currentPage === 'folderView' || currentPage === 'folderDetails') {
                    setCurrentPage('dashboard');
                }
            }
        });
        setCurrentModal('confirm');
    };

    const handleEditCard = (folderId, card) => {
        setEditingCard({ folderId, card });
        setCurrentModal('editCard');
    };

    const handleDeleteCard = (folderId, card) => {
        setConfirmAction({
            message: 'Are you sure you want to delete this flashcard?',
            onConfirm: () => {
                deleteCard(folderId, card);
                handleCloseModal();
            }
        });
        setCurrentModal('confirm');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return (
                    <Dashboard
                        folders={folders}
                        sessions={sessions}
                        onNavigate={handleNavigate}
                        onOpenModal={handleOpenModal}
                        onStartStudy={startStudySession}
                        onEditFolder={handleEditFolder}
                        onDeleteFolder={handleDeleteFolder}
                    />
                );
            case 'folderView':
                return (
                    <FolderView
                        folders={folders}
                        onNavigate={handleNavigate}
                        onEdit={handleEditFolder}
                        onDelete={handleDeleteFolder}
                        onStartStudy={startStudySession}
                    />
                );
            case 'folderDetails':
                return (
                    <FolderDetails
                        folder={selectedFolder}
                        onNavigate={handleNavigate}
                        onOpenModal={handleOpenModal}
                        onEditCard={handleEditCard}
                        onDeleteCard={handleDeleteCard}
                    />
                );
            case 'studyQuestion':
                return (
                    <StudyQuestion
                        onNavigate={handleNavigate}
                        folder={selectedFolder}
                        card={studySession.cards[studySession.currentCardIndex]}
                        cardNumber={studySession.currentCardIndex + 1}
                        totalCards={studySession.cards.length}
                    />
                );
            case 'studyAnswer':
                return (
                    <StudyAnswer
                        onNavigate={handleNavigate}
                        folder={selectedFolder}
                        card={studySession.cards[studySession.currentCardIndex]}
                        onAnswer={handleAnswer}
                        onNext={handleNextCard}
                        cardNumber={studySession.currentCardIndex + 1}
                        totalCards={studySession.cards.length}
                    />
                );
            case 'studyHistory':
                return (
                    <StudyHistory
                        sessions={sessions}
                        onNavigate={handleNavigate}
                        onOpenModal={handleOpenModal}
                        filterType={filterType}
                        setFilterType={setFilterType}
                    />
                );
            case 'sessionResults':
                return (
                    <SessionResults
                        onNavigate={handleNavigate}
                        answers={studySession.answers}
                    />
                );
            default:
                return (
                    <Dashboard
                        folders={folders}
                        sessions={sessions}
                        onNavigate={handleNavigate}
                        onOpenModal={handleOpenModal}
                        onStartStudy={startStudySession}
                        onEditFolder={handleEditFolder}
                        onDeleteFolder={handleDeleteFolder}
                    />
                );
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">FLASH MIND</h1>
                <div className="user-icon">
                    <User size={22} color="white" />
                </div>
            </header>

            <main className="app-main">{renderPage()}</main>

            {currentModal === 'createFolder' && (
                <CreateFolderModal onClose={handleCloseModal} onCreate={createFolder} />
            )}
            {currentModal === 'createFlashcard' && (
                <CreateFlashcardModal onClose={handleCloseModal} onCreate={createCard} />
            )}
            {currentModal === 'editFolder' && editingFolder && (
                <EditFolderModal folder={editingFolder} onSave={updateFolder} onClose={handleCloseModal} />
            )}
            {currentModal === 'editCard' && editingCard && (
                <EditCardModal
                    card={editingCard.card}
                    onSave={(updatedCard) => updateCard(editingCard.folderId, updatedCard)}
                    onClose={handleCloseModal}
                />
            )}
            {currentModal === 'filterHistory' && (
                <FilterHistoryModal
                    onClose={handleCloseModal}
                    filterType={filterType}
                    setFilterType={setFilterType}
                />
            )}
            {currentModal === 'confirm' && confirmAction && (
                <ConfirmModal
                    message={confirmAction.message}
                    onConfirm={confirmAction.onConfirm}
                    onCancel={handleCloseModal}
                />
            )}

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};
