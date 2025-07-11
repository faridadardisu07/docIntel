export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'viewer' | 'uploader' | 'approver' | 'custom';
  title?: string;
  avatar?: string;
  lastActive: Date;
  canUseAI: boolean;
  permissions: string[];
  joinedAt: Date;
  status: 'active' | 'inactive' | 'suspended';
}

export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  folderId: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  aiStatus: 'pending' | 'processing' | 'completed' | 'failed';
  aiEngine?: 'openai' | 'gemini' | 'deepseek' | 'llama';
  summary?: string;
  extractedData?: Record<string, any>;
  ocrText?: string;
  previewUrl?: string;
  downloadUrl: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  path: string;
  permissions: Record<string, string[]>;
  createdAt: Date;
  createdBy: string;
  children?: Folder[];
  files?: File[];
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  fileId?: string;
  aiEngine: string;
  usage?: {
    tokensUsed: number;
    cost: number;
  };
}

export interface Usage {
  uploadsUsed: number;
  uploadsLimit: number;
  chatsUsed: number;
  chatsLimit: number;
  storageUsed: number;
  storageLimit: number;
  period: 'monthly' | 'yearly';
}

export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  usage: Usage;
  settings: {
    defaultAiEngine: string;
    enabledAiEngines: string[];
    language: string;
    retentionDays: number;
    theme?: string;
  };
}

export interface Analytics {
  totalFiles: number;
  totalChats: number;
  totalUploads: number;
  totalStorage: number;
  monthlyData: {
    month: string;
    uploads: number;
    chats: number;
    storage: number;
  }[];
  topFiles: {
    name: string;
    views: number;
    chats: number;
  }[];
  aiEngineUsage: {
    openai: number;
    gemini: number;
    deepseek: number;
    llama: number;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  limits: {
    uploads: number;
    chats: number;
    storage: number;
    users: number;
  };
}