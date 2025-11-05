
import React, { useEffect, useRef } from 'react';
import { AppNotification } from '../types';
import { CloseIcon, CheckCircleIcon, ExclamationCircleIcon } from '../constants';

interface NotificationToastProps {
  notification: AppNotification;
  onDismiss: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onDismiss }) => {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (notification.timeout && notification.timeout > 0) {
      timerRef.current = window.setTimeout(() => {
        onDismiss(notification.id);
      }, notification.timeout);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [notification, onDismiss]);

  const bgColor = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  }[notification.type];

  const IconComponent = {
    info: CheckCircleIcon, // Using CheckCircle for general info for now
    success: CheckCircleIcon,
    warning: ExclamationCircleIcon,
    error: ExclamationCircleIcon,
  }[notification.type];

  return (
    <div
      className={`relative p-4 rounded-lg shadow-lg text-white flex items-start space-x-3 w-full max-w-sm transition-all duration-300 ease-out transform translate-y-0 opacity-100 ${bgColor}`}
      role="alert"
    >
      <div className="flex-shrink-0 pt-0.5">
        <IconComponent />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{notification.message}</p>
        {notification.actions && notification.actions.length > 0 && (
          <div className="mt-2 flex space-x-2">
            {notification.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  onDismiss(notification.id);
                }}
                className="px-3 py-1 text-xs font-semibold rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="flex-shrink-0 p-1 -m-1 rounded-full hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-current transition-colors"
        aria-label="Dismiss notification"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default NotificationToast;
