
import React from 'react';
import { AppIconProps } from '../types';

const AppIcon: React.FC<AppIconProps> = ({ name, icon, onClick, color = 'text-gray-700 dark:text-gray-300', badge }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
    >
      <div className={`text-3xl sm:text-4xl md:text-5xl ${color}`}>
        {icon}
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
          {badge}
        </span>
      )}
      <span className="mt-2 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-sans tracking-tight text-center truncate w-full">
        {name}
      </span>
    </button>
  );
};

export default AppIcon;
