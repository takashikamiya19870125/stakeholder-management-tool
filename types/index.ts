// プライバシー・機密レベル
  export type ConfidentialityLevel = 'public' | 'internal' | 'secret'

  // ステークホルダーカテゴリ
  export type StakeholderCategory = 'internal' | 'external' | 'personal'

  // 影響度・関心度レベル
  export type InfluenceLevel = 'high' | 'medium' | 'low'
  export type InterestLevel = 'high' | 'medium' | 'low'

  // スタンス
  export type Stance = 'support' | 'oppose' | 'neutral' | 'unknown'

  // 優先度
  export type Priority = 'critical' | 'high' | 'medium' | 'low'

  // コミュニケーション手段
  export type CommunicationChannel = 'face-to-face' | 'email' | 'slack' | 'teams' | 'phone' |
  'other'

  // プロジェクト型定義
  export interface Project {
    id: string
    name: string
    description?: string
    confidentiality: ConfidentialityLevel
    ownerId: string
    createdAt: Date
    updatedAt: Date
  }

  // ステークホルダー型定義
  export interface Stakeholder {
    id: string
    name: string
    category: StakeholderCategory
    subcategory?: string
    organization?: string
    position?: string
    email?: string
    phone?: string
    influence: InfluenceLevel
    interest: InterestLevel
    stance: Stance
    priority: Priority
    confidentiality: ConfidentialityLevel
    preferredChannel: CommunicationChannel
    lastContact?: Date
    notes?: string
    tags?: string[]
    createdAt: Date
    updatedAt: Date
  }

  // UI状態管理
  export interface UIState {
    viewMode: 'public' | 'internal' | 'all'
    secretMode: boolean
    searchQuery?: string
  }

  // 分析結果
  export interface StakeholderAnalysis {
    id: string
    stakeholderId: string
    projectId: string
    analysis: {
      influenceScore: number
      interestScore: number
      riskLevel: 'high' | 'medium' | 'low'
      recommendedActions: string[]
      communicationStrategy: string
    }
    createdAt: Date
    updatedAt: Date
  }

  // 会議・メモ情報
  export interface Meeting {
    id: string
    projectId: string
    title: string
    date: Date
    participants: string[]
    notes: string
    actionItems: string[]
    confidentiality: ConfidentialityLevel
    createdAt: Date
    updatedAt: Date
  }

  // 音声メモ
  export interface VoiceMemo {
    id: string
    projectId: string
    title?: string
    audioUrl?: string
    transcript?: string
    summary?: string
    confidentiality: ConfidentialityLevel
    createdAt: Date
    updatedAt: Date
  }

  // Slack連携データ
  export interface SlackMessage {
    id: string
    projectId: string
    channelId: string
    messageId: string
    content: string
    author: string
    timestamp: Date
    relevantStakeholders: string[]
    confidentiality: ConfidentialityLevel
    createdAt: Date
    updatedAt: Date
  }
