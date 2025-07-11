'use client'

  import { useState } from 'react'
  import { X, Save, Folder, Shield } from 'lucide-react'
  import { Project, ConfidentialityLevel } from '@/types'

  interface ProjectFormProps {
    project?: Project
    onSubmit: (project: Project | Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>) =>
  void
    onCancel: () => void
  }

  export default function ProjectForm({
    project,
    onSubmit,
    onCancel,
  }: ProjectFormProps) {
    const [formData, setFormData] = useState({
      name: project?.name || '',
      description: project?.description || '',
      confidentiality: (project?.confidentiality || 'internal') as ConfidentialityLevel,
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      if (project) {
        // 更新の場合
        onSubmit({
          ...project,
          ...formData,
          updatedAt: new Date(),
        })
      } else {
        // 新規作成の場合
        onSubmit({
          ...formData,
        })
      }
    }

    const confidentialityOptions = [
      { value: 'public', label: '公開', description: '外部に公開しても問題ない情報' },
      { value: 'internal', label: '社内限定', description: '社内メンバーのみが閲覧可能' },
      { value: 'secret', label: '機密', description: '最高機密情報として管理' },
    ]

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Folder className="h-5 w-5" />
              <span>{project ? 'プロジェクト編集' : '新規プロジェクト作成'}</span>
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
              <div className="form-group">
                <label className="form-label">プロジェクト名 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="例：新システム導入プロジェクト"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">説明</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="プロジェクトの概要や目的を記載してください"
                />
              </div>
            </div>

            {/* プライバシー設定 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>プライバシー設定</span>
              </h3>

              <div className="form-group">
                <label className="form-label">機密レベル *</label>
                <div className="space-y-3">
                  {confidentialityOptions.map(option => (
                    <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="confidentiality"
                        value={option.value}
                        checked={formData.confidentiality === option.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, confidentiality:
  e.target.value as ConfidentialityLevel }))}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 注意事項 */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">プライバシーについて</h4>
                  <p className="text-sm text-blue-700 mt-1">

  このプロジェクトに登録されるすべての情報は、選択した機密レベルに応じて管理されます。
                    機密レベルは後で変更することも可能です。
                  </p>
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
                <span>{project ? '更新' : '作成'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
