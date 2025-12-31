import { useEffect } from 'react';
import { X } from 'lucide-react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification notification-${type}`}>
      <span className="notification-icon">
        {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span className="notification-message">{message}</span>
      <button onClick={onClose} className="notification-close">
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification;