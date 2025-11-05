
import React from 'react';
import { ScreenName } from '../types';
import { HomeIcon, MultitaskingIcon, SettingsIcon } from '../constants'; // Reusing SettingsIcon for Hub for now

interface FooterNavProps {
  onNavigate: (screen: ScreenName) => void;
  onToggleIntelligentHub: () => void;
  currentScreen: ScreenName;
}

const FooterNav: React.FC<FooterNavProps> = ({ onNavigate, onToggleIntelligentHub, currentScreen }) => {
  const handleHapticFeedback = () => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50); // Short vibration
    }
  };

  const navItemClass = (screen: ScreenName) => `
    flex-1 flex flex-col items-center justify-center p-2
    text-gray-700 dark:text-gray-300
    hover:text-blue-600 dark:hover:text-blue-400
    ${currentScreen === screen ? 'text-blue-600 dark:text-blue-400' : ''}
    transition-colors duration-200
  `;

  return (
    <div className="flex items-center justify-around w-full h-16 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-30 flex-shrink-0">
      <button
        onClick={() => { onNavigate(ScreenName.HOME); handleHapticFeedback(); }}
        className={navItemClass(ScreenName.HOME)}
        aria-label="Home"
      >
        <HomeIcon />
        <span className="text-xs font-medium mt-1 font-sans">Home</span>
      </button>

      <button
        onClick={() => { onToggleIntelligentHub(); handleHapticFeedback(); }}
        className={navItemClass(ScreenName.INTELLIGENT_HUB)}
        aria-label="Intelligent Hub"
      >
        <SettingsIcon /> {/* Reusing SettingsIcon as a placeholder for the hub */}
        <span className="text-xs font-medium mt-1 font-sans">Hub</span>
      </button>

      <button
        onClick={() => { onNavigate(ScreenName.MULTITASKING); handleHapticFeedback(); }}
        className={navItemClass(ScreenName.MULTITASKING)}
        aria-label="Multitasking"
      >
        <MultitaskingIcon />
        <span className="text-xs font-medium mt-1 font-sans">Apps</span>
      </button>
    </div>
  );
};

export default FooterNav;
