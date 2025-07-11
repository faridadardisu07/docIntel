import React, { createContext, useContext, useState } from 'react';
import { File, Folder, Usage, Organization, ChatMessage, Analytics } from '../types';

interface DataContextType {
  files: File[];
  folders: Folder[];
  currentFolder: Folder | null;
  usage: Usage;
  organization: Organization;
  analytics: Analytics;
  chatMessages: ChatMessage[];
  setCurrentFolder: (folder: Folder | null) => void;
  uploadFile: (file: File) => void;
  deleteFile: (fileId: string) => void;
  createFolder: (name: string, parentId?: string) => void;
  updateUsage: (type: 'uploads' | 'chats' | 'storage', amount: number) => void;
  addChatMessage: (message: ChatMessage) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const mockAnalytics: Analytics = {
  totalFiles: 2847,
  totalChats: 1432,
  totalUploads: 689,
  totalStorage: 45600000000,
  monthlyData: [
    { month: 'Jan', uploads: 45, chats: 120, storage: 3.2 },
    { month: 'Feb', uploads: 52, chats: 98, storage: 4.1 },
    { month: 'Mar', uploads: 78, chats: 156, storage: 5.8 },
    { month: 'Apr', uploads: 65, chats: 134, storage: 4.9 },
    { month: 'May', uploads: 89, chats: 178, storage: 6.3 },
    { month: 'Jun', uploads: 73, chats: 145, storage: 5.4 },
  ],
  topFiles: [
    { name: 'Q4 Financial Report.pdf', views: 245, chats: 89 },
    { name: 'Employee Handbook.docx', views: 189, chats: 56 },
    { name: 'Project Charter.pdf', views: 167, chats: 43 },
  ],
  aiEngineUsage: {
    openai: 45,
    gemini: 25,
    deepseek: 20,
    llama: 10
  }
};

const mockFolders: Folder[] = [
  {
    id: 'root',
    name: 'Root',
    path: '/',
    permissions: { admin: ['read', 'write', 'delete'] },
    createdAt: new Date(),
    createdBy: '1',
    children: [
      {
        id: 'invoices',
        name: 'Invoices',
        parentId: 'root',
        path: '/invoices',
        permissions: { admin: ['read', 'write', 'delete'], uploader: ['read', 'write'] },
        createdAt: new Date(),
        createdBy: '1'
      },
      {
        id: 'contracts',
        name: 'Contracts',
        parentId: 'root',
        path: '/contracts',
        permissions: { admin: ['read', 'write', 'delete'], viewer: ['read'] },
        createdAt: new Date(),
        createdBy: '1'
      },
      {
        id: 'reports',
        name: 'Reports',
        parentId: 'root',
        path: '/reports',
        permissions: { admin: ['read', 'write', 'delete'] },
        createdAt: new Date(),
        createdBy: '1'
      }
    ]
  }
];

const mockFiles: File[] = [
  {
    id: '1',
    name: 'Q4 Financial Report.pdf',
    type: 'application/pdf',
    size: 2048000,
    folderId: 'reports',
    uploadedBy: 'Robert Edwards',
    uploadedAt: new Date('2024-01-15'),
    tags: ['financial', 'q4', 'report'],
    aiStatus: 'completed',
    aiEngine: 'openai',
    summary: 'Q4 financial report showing 15% revenue growth and improved operational efficiency',
    downloadUrl: '#',
    previewUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
  },
  {
    id: '2',
    name: 'Invoice_2024_001.pdf',
    type: 'application/pdf',
    size: 512000,
    folderId: 'invoices',
    uploadedBy: 'Jane Smith',
    uploadedAt: new Date('2024-01-10'),
    tags: ['invoice', '2024', 'payment'],
    aiStatus: 'completed',
    aiEngine: 'gemini',
    summary: 'Invoice for consulting services - $5,000 due within 30 days',
    downloadUrl: '#',
    previewUrl: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
  },
  {
    id: '3',
    name: 'Service Agreement.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1024000,
    folderId: 'contracts',
    uploadedBy: 'Mike Johnson',
    uploadedAt: new Date('2024-01-08'),
    tags: ['contract', 'service', 'agreement'],
    aiStatus: 'processing',
    aiEngine: 'deepseek',
    downloadUrl: '#',
    previewUrl: 'https://images.pexels.com/photos/4386333/pexels-photo-4386333.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
  }
];

const mockUsage: Usage = {
  uploadsUsed: 689,
  uploadsLimit: 1000,
  chatsUsed: 1432,
  chatsLimit: 2000,
  storageUsed: 45600000000,
  storageLimit: 107374182400,
  period: 'monthly'
};

const mockOrganization: Organization = {
  id: '1',
  name: 'DocIntel Enterprise',
  plan: 'enterprise',
  usage: mockUsage,
  settings: {
    defaultAiEngine: 'openai',
    enabledAiEngines: ['openai', 'gemini', 'deepseek', 'llama'],
    language: 'en',
    retentionDays: 365,
    theme: 'dark'
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<File[]>(mockFiles);
  const [folders, setFolders] = useState<Folder[]>(mockFolders);
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [usage, setUsage] = useState<Usage>(mockUsage);
  const [organization] = useState<Organization>(mockOrganization);
  const [analytics] = useState<Analytics>(mockAnalytics);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const uploadFile = (file: File) => {
    setFiles(prev => [...prev, file]);
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const createFolder = (name: string, parentId?: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      parentId,
      path: parentId ? `${folders.find(f => f.id === parentId)?.path}/${name}` : `/${name}`,
      permissions: { admin: ['read', 'write', 'delete'] },
      createdAt: new Date(),
      createdBy: '1'
    };
    setFolders(prev => [...prev, newFolder]);
  };

  const updateUsage = (type: 'uploads' | 'chats' | 'storage', amount: number) => {
    setUsage(prev => ({
      ...prev,
      [`${type}Used`]: prev[`${type}Used` as keyof Usage] as number + amount
    }));
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  return (
    <DataContext.Provider value={{
      files,
      folders,
      currentFolder,
      usage,
      organization,
      analytics,
      chatMessages,
      setCurrentFolder,
      uploadFile,
      deleteFile,
      createFolder,
      updateUsage,
      addChatMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};