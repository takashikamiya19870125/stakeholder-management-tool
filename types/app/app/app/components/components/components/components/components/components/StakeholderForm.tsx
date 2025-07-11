 'use client'

  import { useState, useEffect } from 'react'
  import { X, Save, User, Building, Mail, Phone, Shield, Tag } from 'lucide-react'
  import { Stakeholder, StakeholderCategory, InfluenceLevel, InterestLevel, Stance, Priority,
  ConfidentialityLevel, CommunicationChannel } from '@/types'

  interface StakeholderFormProps {
    stakeholder?: Stakeholder
    onSubmit: (stakeholder: Stakeholder | Omit<Stakeholder, 'id' | 'createdAt' | 'updatedAt'>) =>
  void
    onCancel: () => void
  }

  export default function StakeholderForm({
    stakeholder,
    onSubmit,
    onCancel,
  }: StakeholderFormProps) {
    const [formData, setFormData] = useState({
      name: '',
      category: 'internal' as StakeholderCategory,
      subcategory: '',
      organization: '',
      position: '',
      email: '',
      phone: '',
      influence: 'medium' as InfluenceLevel,
      interest: 'medium' as InterestLevel,
      stance: 'neutral' as Stance,
      priority: 'medium' as Priority,
      confidentiality: 'internal' as ConfidentialityLevel,
      preferredChannel: 'email' as CommunicationChannel,
      notes: '',
      tags: [] as string[],
    })
    const [newTag, setNewTag] = useState('')

    useEffect(() => {
      if (stakeholder) {
        setFormData({
          name: stakeholder.name,
          category: stakeholder.category,
          subcategory: stakeholder.subcategory || '',
          organization: stakeholder.organization || '',
          position: stakeholder.position || '',
          email: stakeholder.email || '',
          phone: stakeholder.phone || '',
          influence: stakeholder.influence,
          interest: stakeholder.interest,
          stance: stakeholder.stance,
          priority: stakeholder.priority,
          confidentiality: stakeholder.confidentiality,
          preferredChannel: stakeholder.preferredChannel,
          notes: stakeholder.notes || '',
          tags: stakeholder.tags || [],
        })
      }
    }, [stakeholder])

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      if (stakeholder) {
        // 更新の場合
        onSubmit({
          ...stakeholder,
          ...formData,
          updatedAt: new Date(),
        })
      } else {
        // 新規作成の場合
        onSubmit({
          ...formData,
          lastContact: undefined,
        })
      }
    }

    const handleAddTag = () => {
      if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }))
        setNewTag('')
      }
    }

    const handleRemoveTag = (tagToRemove: string) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== tagToRemove)
      }))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && e.target === e.currentTarget) {
        e.preventDefault()
        handleAddTag()
      }
    }

    const categoryOptions = [
      { value: 'internal', label: '社内メンバー' },
      { value: 'external', label: '社外メンバー' },
      { value: 'personal', label: '個人的関係者' },
    ]

    const subcategoryOptions = {
      internal: [
        '直属の上司・同僚',
        '他部署の関係者',
        '経営層',
        'その他',
      ],
      external: [
        '顧客・クライアント',
        'パートナー企業',
        '外部コンサルタント',
        '規制当局・政府機関',
        'その他',
      ],
      personal: [
        'メンター・アドバイザー',
        '非公式な相談相手',
        'その他',
      ],
    }

    const influenceOptions = [
      { value: 'high', label: '高' },
      { value: 'medium', label: '中' },
      { value: 'low', label: '低' },
    ]

    const stanceOptions = [
      { value: 'support', label: '支持' },
      { value: 'oppose', label: '反対' },
      { value: 'neutral', label: '中立' },
      { value: 'unknown', label: '不明' },
    ]

    const priorityOptions = [
      { value: 'critical', label: '最重要' },
      { value: 'high', label: '高' },
      { value: 'medium', label: '中' },
      { value: 'low', label: '低' },
    ]

    const confidentialityOptions = [
      { value: 'public', label: '公開' },
      { value: 'internal', label: '社内限定' },
      { value: 'secret', label: '機密' },
    ]

    const channelOptions = [
      { value: 'face-to-face', label: '対面' },
      { value: 'email', label: 'メール' },
      { value: 'slack', label: 'Slack' },
      { value: 'teams', label: 'Teams' },
      { value: 'phone', label: '電話' },
      { value: 'other', label: 'その他' },
    ]

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {stakeholder ? 'ステークホルダー編集' : 'ステークホルダー追加'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 基本情報 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>基本情報</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">名前 *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">役職</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">カテゴリ *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as
  StakeholderCategory }))}
                    required
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">サブカテゴリ</label>
                  <select
                    className="form-select"
                    value={formData.subcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value
  }))}
                  >
                    <option value="">選択してください</option>
                    {subcategoryOptions[formData.category].map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group md:col-span-2">
                  <label className="form-label">組織・会社名</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value
  }))}
                  />
                </div>
              </div>
            </div>

            {/* 連絡先情報 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>連絡先情報</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">メールアドレス</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">電話番号</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label className="form-label">推奨コミュニケーション手段</label>
                  <select
                    className="form-select"
                    value={formData.preferredChannel}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredChannel:
  e.target.value as CommunicationChannel }))}
                  >
                    {channelOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 分析情報 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>分析情報</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">影響度</label>
                  <select
                    className="form-select"
                    value={formData.influence}
                    onChange={(e) => setFormData(prev => ({ ...prev, influence: e.target.value as
  InfluenceLevel }))}
                  >
                    {influenceOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">関心度</label>
                  <select
                    className="form-select"
                    value={formData.interest}
                    onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value as
  InterestLevel }))}
                  >
                    {influenceOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">スタンス</label>
                  <select
                    className="form-select"
                    value={formData.stance}
                    onChange={(e) => setFormData(prev => ({ ...prev, stance: e.target.value as
  Stance }))}
                  >
                    {stanceOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">優先度</label>
                  <select
                    className="form-select"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as
  Priority }))}
                  >
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* プライバシー設定 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>プライバシー設定</span>
              </h3>

              <div className="form-group">
                <label className="form-label">機密レベル</label>
                <select
                  className="form-select"
                  value={formData.confidentiality}
                  onChange={(e) => setFormData(prev => ({ ...prev, confidentiality: e.target.value
  as ConfidentialityLevel }))}
                >
                  {confidentialityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  {formData.confidentiality === 'secret' &&
  '機密情報として扱われ、シークレットモードでのみ表示されます'}
                  {formData.confidentiality === 'internal' && '社内限定情報として扱われます'}
                  {formData.confidentiality === 'public' && '公開情報として扱われます'}
                </p>
              </div>
            </div>

            {/* メモ・タグ */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>メモ・タグ</span>
              </h3>

              <div className="form-group">
                <label className="form-label">メモ</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="このステークホルダーに関する重要な情報やメモを記載してください"
                />
              </div>

              <div className="form-group">
                <label className="form-label">タグ</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100
   text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="form-input flex-1"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="新しいタグを入力"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="btn-secondary"
                  >
                    追加
                  </button>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="btn-secondary"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{stakeholder ? '更新' : '保存'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
