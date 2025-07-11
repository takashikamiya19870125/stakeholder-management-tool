'use client'

  import { useState } from 'react'
  import { User, Mail, Phone, Building, Edit2, Trash2, MessageCircle, Calendar } from 'lucide-react'
  import { Stakeholder, UIState } from '@/types'

  interface StakeholderListProps {
    stakeholders: Stakeholder[]
    loading: boolean
    onStakeholderSelect: (stakeholder: Stakeholder) => void
    onStakeholderUpdate: (stakeholder: Stakeholder) => void
    onStakeholderDelete: (id: string) => void
    uiState: UIState
  }

  export default function StakeholderList({
    stakeholders,
    loading,
    onStakeholderSelect,
    onStakeholderUpdate,
    onStakeholderDelete,
    uiState,
  }: StakeholderListProps) {
    const [sortBy, setSortBy] = useState<'name' | 'influence' | 'interest' | 'updated'>('name')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const handleSort = (field: 'name' | 'influence' | 'interest' | 'updated') => {
      if (sortBy === field) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      } else {
        setSortBy(field)
        setSortOrder('asc')
      }
    }

    const sortedStakeholders = [...stakeholders].sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]

      if (sortBy === 'updated') {
        aValue = a.updatedAt
        bValue = b.updatedAt
      } else if (sortBy === 'influence' || sortBy === 'interest') {
        const order = { high: 3, medium: 2, low: 1 }
        aValue = order[aValue as keyof typeof order]
        bValue = order[bValue as keyof typeof order]
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'internal':
          return 'bg-blue-100 text-blue-800'
        case 'external':
          return 'bg-purple-100 text-purple-800'
        case 'personal':
          return 'bg-orange-100 text-orange-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const getInfluenceColor = (influence: string) => {
      switch (influence) {
        case 'high':
          return 'bg-red-100 text-red-800'
        case 'medium':
          return 'bg-yellow-100 text-yellow-800'
        case 'low':
          return 'bg-green-100 text-green-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const getStanceColor = (stance: string) => {
      switch (stance) {
        case 'support':
          return 'bg-green-100 text-green-800'
        case 'oppose':
          return 'bg-red-100 text-red-800'
        case 'neutral':
          return 'bg-gray-100 text-gray-800'
        case 'unknown':
          return 'bg-purple-100 text-purple-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const getStanceLabel = (stance: string) => {
      switch (stance) {
        case 'support':
          return '支持'
        case 'oppose':
          return '反対'
        case 'neutral':
          return '中立'
        case 'unknown':
          return '不明'
        default:
          return stance
      }
    }

    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (stakeholders.length === 0) {
      return (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ステークホルダーがありません
          </h3>
          <p className="text-gray-600">
            最初のステークホルダーを追加して、管理を始めましょう。
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {/* ソート機能 */}
        <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
          <span className="text-sm text-gray-500">並び替え:</span>
          <div className="flex space-x-2">
            {[
              { key: 'name', label: '名前' },
              { key: 'influence', label: '影響度' },
              { key: 'interest', label: '関心度' },
              { key: 'updated', label: '更新日' },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => handleSort(option.key as any)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  sortBy === option.key
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
                {sortBy === option.key && (
                  <span className="ml-1">
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ステークホルダー一覧 */}
        <div className="grid grid-cols-1 gap-4">
          {sortedStakeholders.map((stakeholder) => (
            <div
              key={stakeholder.id}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center 
  justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {stakeholder.name}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs 
  font-medium ${getCategoryColor(stakeholder.category)}`}>
                        {stakeholder.category === 'internal' && '社内'}
                        {stakeholder.category === 'external' && '社外'}
                        {stakeholder.category === 'personal' && '個人'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      {stakeholder.position && (
                        <span className="flex items-center space-x-1">
                          <Building className="h-3 w-3" />
                          <span>{stakeholder.position}</span>
                        </span>
                      )}
                      {stakeholder.organization && (
                        <span>@ {stakeholder.organization}</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs 
  font-medium ${getInfluenceColor(stakeholder.influence)}`}>
                        影響度: {stakeholder.influence === 'high' ? '高' : stakeholder.influence ===
   'medium' ? '中' : '低'}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs 
  font-medium ${getInfluenceColor(stakeholder.interest)}`}>
                        関心度: {stakeholder.interest === 'high' ? '高' : stakeholder.interest ===
  'medium' ? '中' : '低'}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs 
  font-medium ${getStanceColor(stakeholder.stance)}`}>
                        {getStanceLabel(stakeholder.stance)}
                      </span>
                    </div>

                    {stakeholder.notes && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {stakeholder.notes}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {stakeholder.email && (
                        <span className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{stakeholder.email}</span>
                        </span>
                      )}
                      {stakeholder.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{stakeholder.phone}</span>
                        </span>
                      )}
                      {stakeholder.lastContact && (
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>最終接触:
  {stakeholder.lastContact.toLocaleDateString('ja-JP')}</span>
                        </span>
                      )}
                    </div>

                    {stakeholder.tags && stakeholder.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {stakeholder.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs 
  bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onStakeholderSelect(stakeholder)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="編集"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onStakeholderDelete(stakeholder.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="削除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
