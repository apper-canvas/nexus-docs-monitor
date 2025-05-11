import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icons for toolbar
const BoldIcon = getIcon('Bold');
const ItalicIcon = getIcon('Italic');
const UnderlineIcon = getIcon('Underline');
const ListIcon = getIcon('List');
const ListOrderedIcon = getIcon('ListOrdered');
const HeadingIcon = getIcon('Heading');
const Heading2Icon = getIcon('Heading2');
const CodeIcon = getIcon('Code');
const QuoteIcon = getIcon('Quote');
const SeparatorIcon = getIcon('Minus');

const MenuButton = ({ onClick, isActive, icon: Icon }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-2 rounded-lg ${
        isActive 
          ? 'bg-primary/10 text-primary dark:bg-primary/20' 
          : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
      }`}
    >
      <Icon className="w-4 h-4" />
    </motion.button>
  );
};

const Editor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-md dark:prose-invert focus:outline-none mx-auto p-6 md:p-8 lg:p-12 max-w-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <div className="editor-toolbar px-6 py-2 flex items-center space-x-1 overflow-x-auto scrollbar-hide">
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={BoldIcon}
        />
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={ItalicIcon}
        />
        
        <div className="h-5 border-r border-surface-300 dark:border-surface-600 mx-1"></div>
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          icon={HeadingIcon}
        />
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={Heading2Icon}
        />
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          icon={HeadingIcon}
        />
        
        <div className="h-5 border-r border-surface-300 dark:border-surface-600 mx-1"></div>
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={ListIcon}
        />
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={ListOrderedIcon}
        />
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          icon={CodeIcon}
        />
      </div>
      
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;