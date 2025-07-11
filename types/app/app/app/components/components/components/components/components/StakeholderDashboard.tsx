'use client'

  import { useState, useEffect } from 'react'
  import { Users, Plus, Search, Filter, BarChart3, FileText } from 'lucide-react'
  import { Project, UIState, Stakeholder } from '@/types'
  import StakeholderList from './StakeholderList'
  import StakeholderMatrix from './StakeholderMatrix'
  import StakeholderForm from './StakeholderForm'

  interface StakeholderDashboardProps {
    project: Project
    uiState: UIState
    onUIStateChange: (newState: Partial<UIState>) => void
    onBackToHome: () => void
  }

  export default function StakeholderDashboard({
    project,
    uiState,
    onUIStateChange,
    onBackToHome,
  }: StakeholderDashboardProps) {
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'list' | 'matrix' | 'analysis'>('list')
    const [showAddForm, setShowAddForm] = useState(false)
    const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null)

    useEffect(() => {
      // TODO: 実際のAPIコールに置き換える
      const mockStakeholders: Stakeholder[] = [
        {
          id: 'st_001',
          name: '田中部長',
          category: 'internal',
          subcategory: '直属の上司',
          organization: '情報システム部',
          position: '部長',
          email: 'tanaka@company.com',
          phone: '03-1234-5678',
          influence: 'high',
          interest: 'high',
          stance: 'support',
          priority: 'critical',
          confidentiality: 'internal',
          preferredChannel: 'face-to-face',
          lastContact: new Date('2024-01-18'),
          notes: '新システム導入に積極的。予算承認権限を持つ。',
          tags: ['決裁者', '技術理解'],
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20'),
        },
        {
          id: 'st_002',
          name: '佐藤課長',
          category: 'internal',
          subcategory: '他部署の関係者',
          organization: '経理部',
          position: '課長',
          email: 'sato@company.com',
          influence: 'medium',
          interest: 'medium',
          stance: 'neutral',
          priority: 'high',
          confidentiality: 'internal',
          preferredChannel: 'email',
          lastContact: new Date('2024-01-16'),
          notes: '予算管理の観点から慎重な姿勢。データ移行コストを懸念。',
          tags: ['予算管理', '慎重派'],
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-18'),
        },
        {
          id: 'st_003',
          name: '山田社長',
          category: 'internal',
          subcategory: '経営層',
          organization: '経営陣',
          position: '代表取締役社長',
          email: 'yamada@company.com',
          influence: 'high',
          interest: 'low',
          stance: 'support',
          priority: 'critical',
          confidentiality: 'secret',
          preferredChannel: 'face-to-face',
          lastContact: new Date('2024-01-10'),
          notes: '全体的な方針には賛成だが、詳細には関与しない。最終承認権限を持つ。',
          tags: ['最終決裁', '戦略重視'],
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
        },
        {
          id: 'st_004',
          name: '鈴木マネージャー',
          category: 'external',
          subcategory: '外部コンサルタント',
          organization: 'ITコンサルティング株式会社',
          position: 'シニアマネージャー',
          email: 'suzuki@itconsulting.com',
          phone: '03-9876-5432',
          influence: 'medium',
          interest: 'high',
          stance: 'support',
          priority: 'high',
          confidentiality: 'internal',
          preferredChannel: 'email',
          lastContact: new Date('2024-01-19'),
          notes: '技術的な実装に関する専門知識を提供。プロジェクトの成功に向けて協力的。',
          tags: ['技術専門家', '協力的'],
          createdAt: new Date('2024-01-16'),
          updatedAt: new Date('2024-01-19'),
        },
      ]

      // 模擬的なローディング
      setTimeout(() => {
        setStakeholders(mockStakeholders)
        setLoading(false)
      }, 800)
    }, [project.id])

    const filteredStakeholders = stakeholders.filter(stakeholder => {
      // プライバシーフィルタリング
      if (uiState.viewMode === 'public' && stakeholder.confidentiality !== 'public') {
        return false
      }
      if (uiState.viewMode === 'internal' && stakeholder.confidentiality === 'secret') {
        return false
      }
      if (!uiState.secretMode && stakeholder.confidentiality === 'secret') {
        return false
      }

      // 検索フィルタリング
      if (uiState.searchQuery) {
        const query = uiState.searchQuery.toLowerCase()
        return (
          stakeholder.name.toLowerCase().includes(query) ||
          stakeholder.organization?.toLowerCase().includes(query) ||
          stakeholder.notes?.toLowerCase().includes(query)
        )
      }

      return true
    })

    const handleStakeholderAdd = (stakeholder: Omit<Stakeholder, 'id' | 'createdAt' | 'updatedAt'>) 
  => {
      const newStakeholder: Stakeholder = {
        ...stakeholder,
        id: `st_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setStakeholders(prev => [...prev, newStakeholder])
      setShowAddForm(false)
    }

    const handleStakeholderUpdate = (stakeholder: Stakeholder | Omit<Stakeholder, 'id' | 'createdAt'
   | 'updatedAt'>) => {
      if ('id' in stakeholder) {
        // 更新の場合
        setStakeholders(prev =>
          prev.map(s => s.id === stakeholder.id ? { ...stakeholder, updatedAt: new Date() } : s)
        )
      }
      setSelectedStakeholder(null)
    }

    const handleStakeholderDelete = (id: string) => {
      setStakeholders(prev => prev.filter(s => s.id !== id))
    }

    const tabs = [
      { id: 'list', label: 'ステークホルダー一覧', icon: Users },
      { id: 'matrix', label: '影響度マトリクス', icon: BarChart3 },
      { id: 'analysis', label: 'AI分析', icon: FileText },
    ]

    // 最新状況のモックデータ
    const latestUpdates = [
      {
        id: 'update_001',
        stakeholderId: 'st_001',
        type: 'stance_change',
        title: '田中部長のスタンス変化',
        description: '新システムの費用対効果説明後、より積極的な支持に変化',
        timestamp: new Date('2024-01-20T14:30:00'),
        source: '会議議事録',
        impact: 'positive',
      },
      {
        id: 'update_002',
        stakeholderId: 'st_002',
        type: 'concern',
        title: '佐藤課長の懸念事項',
        description: 'データ移行期間中の業務への影響について質問',
        timestamp: new Date('2024-01-19T16:45:00'),
        source: 'Slackメッセージ',
        impact: 'neutral',
      },
      {
        id: 'update_003',
        stakeholderId: 'st_004',
        type: 'recommendation',
        title: '鈴木マネージャーからの提案',
        description: '段階的導入アプローチを提案、リスク軽減策を提示',
        timestamp: new Date('2024-01-18T11:20:00'),
        source: '音声メモ',
        impact: 'positive',
      },
    ]

    const getImpactColor = (impact: string) => {
      switch (impact) {
        case 'positive':
          return 'text-green-600 bg-green-50 border-green-200'
        case 'negative':
          return 'text-red-600 bg-red-50 border-red-200'
        case 'neutral':
          return 'text-yellow-600 bg-yellow-50 border-yellow-200'
        default:
          return 'text-gray-600 bg-gray-50 border-gray-200'
      }
    }

    return (
      <div className="space-y-6">
        {/* 最新状況表示 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">最新状況</h3>
            <span className="text-sm text-gray-500">
              議事録、音声メモ、Slackメッセージから自動抽出
            </span>
          </div>

          <div className="space-y-3">
            {latestUpdates.map((update) => {
              const stakeholder = stakeholders.find(s => s.id === update.stakeholderId)
              return (
                <div
                  key={update.id}
                  className={`p-4 rounded-lg border ${getImpactColor(update.impact)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">
                          {update.title}
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {update.source}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {update.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{stakeholder?.name}</span>
                        <span>{update.timestamp.toLocaleString('ja-JP')}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {update.impact === 'positive' && (
                        <span className="text-green-600">↗️</span>
                      )}
                      {update.impact === 'negative' && (
                        <span className="text-red-600">↘️</span>
                      )}
                      {update.impact === 'neutral' && (
                        <span className="text-yellow-600">➡️</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 合意形成ヒント */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200
   p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <span>💡</span>
              <span>合意形成のヒント</span>
            </h3>
            <span className="text-sm text-gray-500">AI分析による提案</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2">🎯 次のアクション</h4>
              <p className="text-sm text-gray-700">
                佐藤課長の懸念（データ移行の影響）に対する具体的な対策プランを提示し、
                不安を解消することで中立から支持への転換を図る
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-2">⚠️ リスク要因</h4>
              <p className="text-sm text-gray-700">
                山田社長の関心度が低いため、プロジェクトの重要性を
                経営視点で再アピールし、より積極的な関与を促す必要がある
              </p>
            </div>
          </div>
        </div>

        {/* プロジェクト情報ヘッダー */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
              {project.description && (
                <p className="text-gray-600 mt-1">{project.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-500">
                {filteredStakeholders.length} / {stakeholders.length} 件表示
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>ステークホルダー追加</span>
              </button>
            </div>
          </div>

          {/* 検索・フィルター */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
  text-gray-400" />
              <input
                type="text"
                placeholder="名前、組織、メモで検索..."
                className="form-input pl-10"
                value={uiState.searchQuery || ''}
                onChange={(e) => onUIStateChange({ searchQuery: e.target.value })}
              />
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>フィルター</span>
            </button>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'list' | 'matrix' | 'analysis')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* タブコンテンツ */}
          <div className="p-6">
            {activeTab === 'list' && (
              <StakeholderList
                stakeholders={filteredStakeholders}
                loading={loading}
                onStakeholderSelect={setSelectedStakeholder}
                onStakeholderUpdate={handleStakeholderUpdate}
                onStakeholderDelete={handleStakeholderDelete}
                uiState={uiState}
              />
            )}

            {activeTab === 'matrix' && (
              <StakeholderMatrix
                stakeholders={filteredStakeholders}
                loading={loading}
              />
            )}

            {activeTab === 'analysis' && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  AI分析機能
                </h3>
                <p className="text-gray-600 mb-4">
                  ステークホルダーの利害関係を分析して、効果的な合意形成戦略を提案します。
                </p>
                <button className="btn-primary">
                  分析を実行
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ステークホルダー追加フォーム */}
        {showAddForm && (
          <StakeholderForm
            onSubmit={handleStakeholderAdd}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* ステークホルダー編集フォーム */}
        {selectedStakeholder && (
          <StakeholderForm
            stakeholder={selectedStakeholder}
            onSubmit={handleStakeholderUpdate}
            onCancel={() => setSelectedStakeholder(null)}
          />
        )}
      </div>
    )
  }
