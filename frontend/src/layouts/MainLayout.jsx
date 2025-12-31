import { useEffect } from "react";
import { User, LogOut } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CreateFolderModal from '../components/Modal/CreateFolderModal/CreateFolderModal';
import CreateFlashcardModal from '../components/Modal/CreateFlashcardModal/CreateFlashcardModal';
import FilterHistoryModal from '../components/Modal/FilterHistoryModal/FilterHistoryModal';
import EditFolderModal from '../components/Modal/EditFolderModal/EditFolderModal';
import EditCardModal from '../components/Modal/EditCardModal/EditCardModal';
import ConfirmModal from '../components/Modal/ConfirmModal/ConfirmModal';
import Notification from '../components/Notification/Notification';
import './MainLayout.css';
import { getAllFolders, getFolderCards } from "../services/folderService.js";
import { getStudyHistory } from "../services/studyService.js";
import { toast } from "sonner";

const MainLayout = () => {
    const navigate = useNavigate();
    const {
        currentModal,
        setCurrentModal,
        editingFolder,
        setEditingFolder,
        editingCard,
        setEditingCard,
        confirmAction,
        setConfirmAction,
        notification,
        setNotification,
        filterType,
        setFilterType,
        createFolder,
        updateFolder,
        createCard,
        updateCard,
        logout,
        isLoading,
        setIsLoading,
        setFolders,
        setSessions,
    } = useApp();

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setIsLoading(true);

            const [foldersData, sessionsData] = await Promise.all([
                getAllFolders(),
                getStudyHistory()
            ]);

            const transformedFolders = await Promise.all(
                foldersData.map(async (folder) => {
                    try {
                        const cards = await getFolderCards(folder.id);
                        return {
                            id: folder.id,
                            name: folder.folderName,
                            date: new Date(folder.createdAt).toLocaleDateString('en-CA'),
                            cards: cards.map(card => ({
                                id: card.id,
                                question: card.frontText,
                                answer: card.backText,
                                date: new Date(card.createdAt || folder.createdAt).toLocaleDateString('en-CA')
                            }))
                        };
                    } catch (error) {
                        console.error(`Error fetching cards for folder ${folder.id}:`, error);
                        return {
                            id: folder.id,
                            name: folder.folderName || 'Unnamed Folder',
                            date: new Date(folder.createdAt).toLocaleDateString('en-CA'),
                            cards: []
                        };
                    }
                })
            );

            setFolders(transformedFolders);

            const folderMap = transformedFolders.reduce((map, folder) => {
                map[folder.id] = folder.name;
                return map;
            }, {});

            const transformedSessions = sessionsData.map(session => ({
                id: session.id,
                folderName: folderMap[session.folderId] || 'Unknown',
                percentage: session.score || session.percentage || 0,
                correctAnswers: session.correctAnswers || 0,
                wrongAnswers: session.wrongAnswers || 0,
                timestamp: session.date || session.timestamp || session.createdAt || new Date().toISOString()
            }));

            setSessions(transformedSessions);

        } catch (error) {
            console.error('Error fetching initial data:', error);
            toast.error('Failed to load data. Please try refreshing.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            navigate('/signin');
        }
    };

    const handleCloseModal = () => {
        setCurrentModal(null);
        setEditingFolder(null);
        setEditingCard(null);
        setConfirmAction(null);
    };

    if (isLoading) {
        return (
            <div className="app-container">
                <header className="app-header">
                    <h1 className="app-title">FLASH MIND</h1>
                    <div className="user-icon">
                        <User size={22} color="white" />
                    </div>
                </header>
                <main className="app-main">
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        Loading your data...
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">FLASH MIND</h1>
                <div className="icons">
                    <div
                        className="user-icon"
                        onClick={() => navigate('/app/profile')}
                        title="Profile"
                        style={{ cursor: 'pointer' }}
                    >
                        <User size={22} color="white" />
                    </div>

                    <div
                        className="user-icon"
                        onClick={handleLogout}
                        title="Logout"
                        style={{ cursor: 'pointer' }}
                    >
                        <LogOut size={22} color="white" />
                    </div>
                </div>
            </header>

            <main className="app-main">
                <Outlet />
            </main>

            {/* Modals */}
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

            {/* Notification */}
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

export default MainLayout;