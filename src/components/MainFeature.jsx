import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ document, onUpdate }) => {
  const [content, setContent] = useState(document.content);
  const [isEditing, setIsEditing] = useState(false);
  const [activeFormatting, setActiveFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    heading: false,
    list: false,
    code: false,
  });
  const [previewMode, setPreviewMode] = useState(false);
  const editorRef = useRef(null);
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" },
    { id: 2, name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" },
  ]);

  // Icon declarations
  const EditIcon = getIcon('Edit3');
  const CheckIcon = getIcon('Check');
  const BoldIcon = getIcon('Bold');
  const ItalicIcon = getIcon('Italic');
  const UnderlineIcon = getIcon('Underline');
  const ListIcon = getIcon('List');
  const HeadingIcon = getIcon('Heading');
  const CodeIcon = getIcon('Code');
  const EyeIcon = getIcon('Eye');
  const EyeOffIcon = getIcon('EyeOff');
  const CalendarIcon = getIcon('Calendar');
  const SaveIcon = getIcon('Save');
  const PlusIcon = getIcon('Plus');
  const UserPlusIcon = getIcon('UserPlus');
  const InfoIcon = getIcon('Info');

  useEffect(() => {
    setContent(document.content);
  }, [document]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    if (isEditing) {
      onUpdate(content);
      setIsEditing(false);
      toast.success("Changes saved!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
      setPreviewMode(false);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }, 0);
    }
  };

  const applyFormatting = (type) => {
    if (!isEditing) return;
    
    // Just toggle the active state for the demo
    setActiveFormatting({
      ...activeFormatting,
      [type]: !activeFormatting[type]
    });
    
    toast.info(`${activeFormatting[type] ? 'Removed' : 'Applied'} ${type} formatting`, {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const handleAddCollaborator = () => {
    const newCollaborator = {
      id: collaborators.length + 1,
      name: "New Collaborator",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    };
    
    setCollaborators([...collaborators, newCollaborator]);
    toast.success("Collaborator added successfully!", {
      position: "bottom-right",
      autoClose: 2000
    });
  };

  const renderMarkdown = (text) => {
    // Very simple markdown parsing for demo purposes
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Heading
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{line.substring(4)}</h3>;
      }
      
      // List items
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-1">{line.substring(2)}</li>;
      }
      if (line.startsWith('* ')) {
        return <li key={index} className="ml-6 mb-1">{line.substring(2)}</li>;
      }
      
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '');
        return <li key={index} className="ml-6 list-decimal mb-1">{content}</li>;
      }
      
      // Task list
      if (line.startsWith('- [ ] ')) {
        return (
          <div key={index} className="flex items-start ml-4 mb-1">
            <input type="checkbox" className="mt-1 mr-2" />
            <span>{line.substring(6)}</span>
          </div>
        );
      }
      if (line.startsWith('- [x] ')) {
        return (
          <div key={index} className="flex items-start ml-4 mb-1">
            <input type="checkbox" checked className="mt-1 mr-2" readOnly />
            <span className="line-through text-surface-500">{line.substring(6)}</span>
          </div>
        );
      }
      
      // Empty line
      if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      }
      
      // Default paragraph
      return <p key={index} className="mb-3">{line}</p>;
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Document info bar */}
      <div className="px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>Last edited: {format(document.updatedAt, 'MMM d, yyyy')}</span>
          </div>
          
          <div className="mx-4 h-4 border-r border-surface-300 dark:border-surface-600"></div>
          
          <div className="flex -space-x-2">
            {collaborators.map(user => (
              <div key={user.id} className="relative group">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-7 h-7 rounded-full border-2 border-white dark:border-surface-800"
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-surface-800 dark:bg-surface-700 text-white text-xs rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {user.name}
                </div>
              </div>
            ))}
            <button 
              onClick={handleAddCollaborator}
              className="w-7 h-7 rounded-full border-2 border-dashed border-surface-300 dark:border-surface-600 flex items-center justify-center text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 hover:border-surface-400 dark:hover:border-surface-500 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-2 rounded-lg text-sm flex items-center ${
              previewMode 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
            }`}
            disabled={isEditing}
          >
            {previewMode ? (
              <>
                <EyeOffIcon className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Hide Preview</span>
              </>
            ) : (
              <>
                <EyeIcon className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Preview</span>
              </>
            )}
          </button>
          
          <button
            onClick={toggleEditing}
            className={`p-2 rounded-lg text-sm flex items-center ${
              isEditing 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {isEditing ? (
              <>
                <SaveIcon className="w-4 h-4 mr-1" />
                <span>Save</span>
              </>
            ) : (
              <>
                <EditIcon className="w-4 h-4 mr-1" />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Formatting toolbar (only visible in edit mode) */}
      {isEditing && (
        <div className="px-6 py-2 border-b border-surface-200 dark:border-surface-700 flex items-center space-x-1 overflow-x-auto bg-surface-100 dark:bg-surface-700 scrollbar-hide">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('bold')}
            className={`p-2 rounded-lg ${
              activeFormatting.bold 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <BoldIcon className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('italic')}
            className={`p-2 rounded-lg ${
              activeFormatting.italic 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <ItalicIcon className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('underline')}
            className={`p-2 rounded-lg ${
              activeFormatting.underline 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <UnderlineIcon className="w-4 h-4" />
          </motion.button>
          
          <div className="h-5 border-r border-surface-300 dark:border-surface-600 mx-1"></div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('heading')}
            className={`p-2 rounded-lg ${
              activeFormatting.heading 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <HeadingIcon className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('list')}
            className={`p-2 rounded-lg ${
              activeFormatting.list 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <ListIcon className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('code')}
            className={`p-2 rounded-lg ${
              activeFormatting.code 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <CodeIcon className="w-4 h-4" />
          </motion.button>
        </div>
      )}
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto relative">
        {isEditing ? (
          <div className="h-full">
            <textarea
              ref={editorRef}
              value={content}
              onChange={handleContentChange}
              className="w-full h-full p-6 md:p-8 lg:p-12 bg-white dark:bg-surface-900 border-none resize-none focus:outline-none leading-relaxed font-sans"
              spellCheck="false"
              placeholder="Start writing here..."
            />
          </div>
        ) : previewMode ? (
          <div className="p-6 md:p-8 lg:p-12 prose dark:prose-invert max-w-none">
            {renderMarkdown(content)}
          </div>
        ) : (
          <div className="p-6 md:p-8 lg:p-12 prose dark:prose-invert max-w-none">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold mb-0">{document.title}</h1>
              <button
                onClick={toggleEditing}
                className="text-sm flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-light"
              >
                <EditIcon className="w-4 h-4 mr-1" />
                <span>Edit document</span>
              </button>
            </div>
            
            <div className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg mb-6 text-sm flex items-center">
              <InfoIcon className="w-5 h-5 text-primary mr-2" />
              <p className="m-0">
                This is a read-only view. Click "Edit" to make changes.
              </p>
            </div>
            
            {renderMarkdown(content)}
          </div>
        )}
      </div>
      
      {/* Footer with hints (only in edit mode) */}
      {isEditing && (
        <div className="px-6 py-2 border-t border-surface-200 dark:border-surface-700 text-xs text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-800 flex items-center justify-between">
          <span>Markdown formatting supported</span>
          <span>Press Ctrl+S to save</span>
        </div>
      )}
    </div>
  );
};

export default MainFeature;