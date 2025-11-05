
import React, { useState, useEffect } from 'react';
import { GitHubRepo, ScreenName } from '../../types';
import { ChevronRightIcon } from '../../constants';

interface CodeEditorProps {
  repo: GitHubRepo;
  initialFilePath?: string;
  onNavigate: (screen: ScreenName, data?: any) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ repo, initialFilePath, onNavigate }) => {
  const [currentFilePath, setCurrentFilePath] = useState(initialFilePath || (repo.files.length > 0 ? repo.files[0].path : ''));
  const [currentFileContent, setCurrentFileContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const file = repo.files.find(f => f.path === currentFilePath);
    setCurrentFileContent(file ? file.content : 'File not found or empty.');
    setIsEditing(false); // Reset editing mode when file changes
  }, [currentFilePath, repo.files]);

  const handleSave = () => {
    // Simulate saving changes
    console.log(`Saving changes to ${currentFilePath}:`, currentFileContent);
    // In a real app, this would involve API calls to GitHub
    setIsEditing(false);
  };

  const renderFileTree = (files: typeof repo.files) => {
    const fileMap: { [key: string]: any } = {};

    files.forEach(file => {
      const parts = file.path.split('/');
      let currentLevel = fileMap;
      parts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = { _isDir: index < parts.length - 1, _files: [] };
        }
        currentLevel = currentLevel[part];
      });
      currentLevel._files.push(file); // Store the actual file object at the leaf
    });

    const renderNode = (node: any, path: string) => {
      const keys = Object.keys(node).filter(key => key !== '_isDir' && key !== '_files').sort();
      return keys.map(key => {
        const itemPath = `${path}/${key}`;
        const isDir = node[key]._isDir;
        const subFiles = node[key]._files;

        return (
          <li key={itemPath} className="ml-4">
            <button
              className="flex items-center w-full text-left py-1 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-sans"
              onClick={() => {
                if (!isDir) {
                  setCurrentFilePath(itemPath.substring(1)); // Remove leading slash for consistency
                }
              }}
            >
              <span className="mr-1">{isDir ? '📁' : '📄'}</span>
              <span>{key}</span>
            </button>
            {isDir && (
              <ul className="list-none">
                {renderNode(node[key], itemPath)}
              </ul>
            )}
            {!isDir && subFiles.length > 0 && subFiles.map((f: any) => (
              <React.Fragment key={f.path}>
                {/* This handles the actual file click when it's a leaf */}
              </React.Fragment>
            ))}
          </li>
        );
      });
    };

    return <ul className="list-none">{renderNode({ '/': fileMap }, '')}</ul>;
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 font-sans text-center">
        Code Editor: {repo.name}
      </h2>

      <div className="flex flex-col md:flex-row flex-grow max-w-5xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* File Tree / Navigation */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3 font-sans">Files</h3>
          {renderFileTree(repo.files)}
        </div>

        {/* Code View */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
            <span className="text-md font-medium text-gray-700 dark:text-gray-300 font-sans">{currentFilePath}</span>
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-sans text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors font-sans text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-sans text-sm"
              >
                Edit
              </button>
            )}
          </div>
          <div className="flex-grow">
            {isEditing ? (
              <textarea
                value={currentFileContent}
                onChange={(e) => setCurrentFileContent(e.target.value)}
                className="w-full h-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md overflow-x-auto text-gray-900 dark:text-gray-100 font-mono text-sm h-full">
                <code>{currentFileContent}</code>
              </pre>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate(ScreenName.REPO_DETAILS, repo)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md font-sans"
        >
          Back to Repo Details
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
