
import React from 'react';
import { ScreenName, ThemeMode } from '../types';
import { ChevronRightIcon } from '../constants';

interface SettingsProps {
  currentTheme: ThemeMode;
  onToggleTheme: () => void;
  onNavigate: (screen: ScreenName) => void;
}

const Settings: React.FC<SettingsProps> = ({ currentTheme, onToggleTheme, onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 font-sans text-center">
        System Settings
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 max-w-lg mx-auto w-full space-y-4">
        {/* Appearance Settings */}
        <section>
          <h3 className="text-xl font-medium mb-3 border-b border-gray-200 dark:border-gray-700 pb-2 font-sans">
            Appearance
          </h3>
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <span className="font-sans">Theme Mode</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-sans">{currentTheme === ThemeMode.LIGHT ? 'Light' : 'Dark'}</span>
              <label htmlFor="themeToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="themeToggle"
                  className="sr-only peer"
                  checked={currentTheme === ThemeMode.DARK}
                  onChange={onToggleTheme}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            </div>
          </div>
          <button
            onClick={() => { /* Mock action for deep customization */ }}
            className="flex items-center justify-between w-full p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-sans">Personalized Themes & Gestures</span>
            <ChevronRightIcon />
          </button>
        </section>

        {/* Sensory Feedback Settings */}
        <section>
          <h3 className="text-xl font-medium mb-3 border-b border-gray-200 dark:border-gray-700 pb-2 font-sans">
            Sensory Feedback
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="font-sans">Haptic Feedback</span>
              <label htmlFor="hapticToggle" className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="hapticToggle" className="sr-only peer" defaultChecked={true} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="font-sans">System Sounds</span>
              <label htmlFor="soundsToggle" className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="soundsToggle" className="sr-only peer" defaultChecked={true} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="font-sans">Visual Cues</span>
              <label htmlFor="cuesToggle" className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="cuesToggle" className="sr-only peer" defaultChecked={true} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Other settings sections can be added here */}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate(ScreenName.HOME)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md font-sans"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Settings;
