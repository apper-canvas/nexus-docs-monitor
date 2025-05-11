import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = ({ darkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  // Mocked documents data
  const [documents, setDocuments] = useState([
    { 
      id: 'doc1', 
      title: 'Getting Started Guide', 
      icon: 'FileText', 
      content: "# Welcome to NexusDocs\n\nThis is your collaborative workspace for organizing information and working with others.\n\n## Features\n\n- Create rich documents\n- Organize with a flexible hierarchy\n- Collaborate in real-time\n- Customize your workspace",
      updatedAt: new Date(2023, 6, 15)
    },
    { 
      id: 'doc2', 
      title: 'Project Roadmap', 
      icon: 'Road', 
      content: "# Project Roadmap\n\n## Q1 Goals\n- Research market needs\n- Develop MVP\n- Initial user testing\n\n## Q2 Goals\n- Launch beta version\n- Gather feedback\n- Implement core features",
      updatedAt: new Date(2023, 7, 2)
    },
    { 
      id: 'doc3', 
      title: 'Meeting Notes', 
      icon: 'CalendarClock', 
      content: "# Team Meeting - August 10\n\n## Attendees\n- Sarah\n- Miguel\n- Jennifer\n- Alex\n\n## Discussion Points\n1. Current project status\n2. Upcoming milestones\n3. Resource allocation\n\n## Action Items\n- [ ] Update documentation\n- [ ] Schedule follow-up meeting\n- [ ] Share progress with stakeholders",
      updatedAt: new Date(2023, 7, 10)
    }
  ]);

  const MenuIcon = getIcon('Menu');
  const FileTextIcon = getIcon('FileText');
  const PlusIcon = getIcon('Plus');
  const ChevronRightIcon = getIcon('ChevronRight');
  const FolderIcon = getIcon('Folder');
  const PenToolIcon = getIcon('PenTool');
  const SettingsIcon = getIcon('Settings');
  const SearchIcon = getIcon('Search');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreateDocument = () => {
    const newDoc = {
      id: `doc${documents.length + 1}`,
      title: `New Document ${documents.length + 1}`,
      icon: 'FileText',
      content: "# New Document\n\nStart writing here...",
      updatedAt: new Date()
    };
    
    setDocuments([...documents, newDoc]);
    setSelectedDoc(newDoc);
    toast.success("New document created!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Sidebar */}
      <motion.div 
        className={`h-full bg-surface-100 dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'}`}
        initial={{ width: sidebarOpen ? '16rem' : '0rem' }}
        animate={{ width: sidebarOpen ? '16rem' : '0rem' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input 
                type="text" 
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-surface-700 text-sm border border-surface-300 dark:border-surface-600"
              />
            </div>
          </div>
          
          <div className="px-3 pt-2">
            <div className="flex items-center justify-between py-2 px-2 text-sm font-medium text-surface-500 dark:text-surface-400">
              <span>DOCUMENTS</span>
              <button 
                onClick={handleCreateDocument}
                className="p-1 hover:bg-surface-200 dark:hover:bg-surface-700 rounded"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1 mt-1">
              {documents.map(doc => (
                <button
                  key={doc.id}
                  className={`w-full flex items-center py-2 px-2 rounded-lg text-left text-sm transition-colors ${
                    selectedDoc?.id === doc.id 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <span className="mr-2 flex-shrink-0">
                    {(() => {
                      const DocIcon = getIcon(doc.icon);
                      return <DocIcon className="w-4 h-4" />;
                    })()}
                  </span>
                  <span className="truncate">{doc.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-3 border-t border-surface-200 dark:border-surface-700">
          <button className="w-full flex items-center justify-between p-2 text-sm rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
            <div className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium mr-2">
                ND
              </span>
              <span>NexusDocs Workspace</span>
            </div>
            <SettingsIcon className="w-4 h-4 text-surface-400" />
          </button>
        </div>
      </motion.div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 border-b border-surface-200 dark:border-surface-700 py-2 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-3 p-2 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            
            {selectedDoc ? (
              <div className="flex items-center">
                {(() => {
                  const DocIcon = getIcon(selectedDoc.icon);
                  return <DocIcon className="w-4 h-4 mr-2 text-surface-500" />;
                })()}
                <h2 className="text-xl font-medium">{selectedDoc.title}</h2>
              </div>
            ) : (
              <div className="flex items-center">
                <FolderIcon className="w-4 h-4 mr-2 text-surface-500" />
                <h2 className="text-xl font-medium">All Documents</h2>
              </div>
            )}
          </div>
          
          <button 
            className="btn btn-primary flex items-center text-sm"
            onClick={handleCreateDocument}
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            <span>New</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          {selectedDoc ? (
            <MainFeature 
              document={selectedDoc} 
              onUpdate={(updatedContent) => {
                const updatedDocs = documents.map(doc => 
                  doc.id === selectedDoc.id ? {...doc, content: updatedContent, updatedAt: new Date()} : doc
                );
                setDocuments(updatedDocs);
                toast.info("Document updated!", {
                  position: "bottom-right", 
                  autoClose: 1500,
                  icon: "✏️"
                });
              }}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6">
              <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-full mb-4">
                <PenToolIcon className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Welcome to NexusDocs</h2>
              <p className="text-surface-600 dark:text-surface-400 text-center max-w-md mb-6">
                Select a document from the sidebar or create a new one to start organizing your information.
              </p>
              <button 
                className="btn btn-primary flex items-center" 
                onClick={handleCreateDocument}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>Create New Document</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;