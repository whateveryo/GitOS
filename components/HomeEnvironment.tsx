
import React, { useState, useEffect } from 'react';
import AppIcon from './AppIcon';
import { GithubIcon, TerminalIcon, FileManagerIcon, SettingsIcon, MultitaskingIcon } from '../constants';
import { ScreenName } from '../types';

interface HomeEnvironmentProps {
  onNavigate: (screen: ScreenName, data?: any) => void;
  installedReposCount: number;
}

const HomeEnvironment: React.FC<HomeEnvironmentProps> = ({ onNavigate, installedReposCount }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-transparent text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter mb-2 font-mono">
          {formattedTime}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light mb-4 font-sans">
          {formattedDate}
        </p>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-center font-sans">
          {getGreeting()}, User.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 max-w-lg w-full">
        <AppIcon name="GitHub" icon={<GithubIcon />} onClick={() => onNavigate(ScreenName.GITHUB)} badge={installedReposCount} color="text-purple-600 dark:text-purple-400" />
        <AppIcon name="Terminal" icon={<TerminalIcon />} onClick={() => { /* Mock action */ }} color="text-green-600 dark:text-green-400" />
        <AppIcon name="Files" icon={<FileManagerIcon />} onClick={() => { /* Mock action */ }} color="text-blue-600 dark:text-blue-400" />
        <AppIcon name="Settings" icon={<SettingsIcon />} onClick={() => onNavigate(ScreenName.SETTINGS)} color="text-gray-600 dark:text-gray-400" />
        <AppIcon name="Multi-Task" icon={<MultitaskingIcon />} onClick={() => onNavigate(ScreenName.MULTITASKING)} color="text-indigo-600 dark:text-indigo-400" />
      </div>
    </div>
  );
};

export default HomeEnvironment;
