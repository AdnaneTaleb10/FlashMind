import { User } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CreateFolderModal from '../components/Modal/CreateFolderModal/CreateFolderModal';
import CreateFlashcardModal from '../components/Modal/CreateFlashcardModal/CreateFlashcardModal';
import FilterHistoryModal from '../components/Modal/FilterHistoryModal/FilterHistoryModal';
import EditFolderModal from '../components/Modal/EditFolderModal/EditFolderModal';
import EditCardModal from '../components/Modal/EditCardModal/EditCardModal';
import ConfirmModal from '../components/Modal/ConfirmModal/ConfirmModal';
import Notification from '../components/Notification/Notification';
import './MainLayout.css';

const MainLayout = () => {
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
        deleteFolder,
        createCard,
        updateCard,
        deleteCard,
    } = useApp();

    const handleCloseModal = () => {
        setCurrentModal(null);
        setEditingFolder(null);
        setEditingCard(null);
        setConfirmAction(null);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">FLASH MIND</h1>
                <div className="user-icon">
                    <User size={22} color="white" />
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