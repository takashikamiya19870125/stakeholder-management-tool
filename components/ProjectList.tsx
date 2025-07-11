'use client'

  import { useState, useEffect } from 'react'
  import { Folder, Calendar, Shield, Users } from 'lucide-react'
  import { Project } from '@/types'

  interface ProjectListProps {
    onProjectSelect: (project: Project) => void
  }

  export default function ProjectList({ onProjectSelect }: ProjectListProps) {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      // TODO: 実際のAPIコールに置き換える
      const mockProjects: Project[] = [
        {
          id: 'proj_001',
          name: '新システム導入プロジェクト',
          description: '社内業務システムのリニューアルプロジェクト',
          confidentiality: 'internal',
          ownerId: 'user_001',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20'),
        },
        {
          id: 'proj_002',
          name: '営業戦略見直しプロジェクト',
          description: '2024年度の営業戦略とKPI設定',
          confidentiality: 'secret',
          ownerId: 'user_001',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-18'),
        },
      ]

      // 模擬的なローディング
      setTimeout(() => {
        setProjects(mockProjects)
        setLoading(false)
      }, 1000)
    }, [])

    const getConfidentialityColor = (level: string) => {
      switch (level) {
        case 'public':
          return 'text-blue-600 bg-blue-50'
        case 'internal':
          return 'text-yellow-600 bg-yellow-50'
        case 'secret':
          return 'text-red-600 bg-red-50'
        default:
          return 'text-gray-600 bg-gray-50'
      }
    }

    const getConfidentialityLabel = (level: string) => {
      switch (level) {
        case 'public':
          return '公開'
        case 'internal':
          return '社内限定'
        case 'secret':
          return '機密'
        default:
          return '不明'
      }
    }

    if (loading) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">プロジェクト一覧</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">プロジェクト一覧</h2>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              プロジェクトが見つかりません
            </h3>
            <p className="text-gray-600">
              新しいプロジェクトを作成して、ステークホルダー管理を始めましょう。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className="card cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-5 w-5 text-gray-400" />
                    <h3 className="font-medium text-gray-900 truncate">
                      {project.name}
                    </h3>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConfidentialityColor(project.confidentiality)}`}>
                    <Shield className="h-3 w-3 mr-1" />
                    {getConfidentialityLabel(project.confidentiality)}
                  </span>
                </div>

                {project.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{project.updatedAt.toLocaleDateString('ja-JP')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>0 人</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
