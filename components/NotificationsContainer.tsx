
import React from 'react';
import { AppNotification } from '../types';
import NotificationToast from './NotificationToast';

interface NotificationsContainerProps {
  notifications: AppNotification[];
  onDismiss: (id: string) => void;
}

const NotificationsContainer: React.FC<NotificationsContainerProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-3 pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationToast notification={notification} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};

export default NotificationsContainer;
