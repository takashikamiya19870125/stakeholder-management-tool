'use client'

  import { useState } from 'react'
  import { Plus, Users, Shield, FileText, BarChart3, Settings } from 'lucide-react'
  import ProjectList from '@/components/ProjectList'
  import StakeholderDashboard from '@/components/StakeholderDashboard'
  import ProjectForm from '@/components/ProjectForm'
  import PrivacyToggle from '@/components/PrivacyToggle'
  import AlignLogo from '@/components/AlignLogo'
  import { Project, UIState } from '@/types'

  export default function Home() {
    const [currentProject, setCurrentProject] = useState<Project | null>(null)
    const [showCreateProject, setShowCreateProject] = useState(false)
    const [uiState, setUIState] = useState<UIState>({
      viewMode: 'internal',
      secretMode: false,
      searchQuery: '',
    })

    const handleProjectSelect = (project: Project) => {
      setCurrentProject(project)
    }

    const handleCreateProject = () => {
      setShowCreateProject(true)
    }

    const handleProjectSubmit = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 
  'ownerId'>) => {
      const newProject: Project = {
        ...projectData,
        id: `proj_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 'user_001', // 現在のユーザーID
      }

      // TODO: 実際のデータ保存処理
      console.log('New project created:', newProject)

      setShowCreateProject(false)
      setCurrentProject(newProject)
    }

    const handleUIStateChange = (newState: Partial<UIState>) => {
      setUIState(prev => ({ ...prev, ...newState }))
    }

    const handleBackToHome = () => {
      setCurrentProject(null)
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToHome}
                  className="hover:opacity-80 transition-opacity"
                >
                  <AlignLogo size="md" />
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBackToHome}
                    className="text-xl font-bold text-gray-800 hover:text-blue-600 
  transition-colors"
                  >
                    ステークホルダー管理ツール
                  </button>
                </div>
                {currentProject && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>/</span>
                    <span className="font-medium">{currentProject.name}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {currentProject && (
                  <PrivacyToggle
                    viewMode={uiState.viewMode}
                    secretMode={uiState.secretMode}
                    onViewModeChange={(mode) => handleUIStateChange({ viewMode: mode })}
                    onSecretModeChange={(mode) => handleUIStateChange({ secretMode: mode })}
                  />
                )}

                <button
                  onClick={handleCreateProject}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>新規プロジェクト作成</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!currentProject ? (
            <div className="space-y-12">
              {/* ウェルカムセクション */}
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <AlignLogo size="lg" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ステークホルダー管理を始めましょう
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  議事録や音声メモからAIが利害関係マトリクスと効果的な合意形成案を自動生成します。
                  完全ローカル環境で機密性の高い情報も安全に管理できます。
                </p>
                <button
                  onClick={handleCreateProject}
                  className="btn-primary text-lg px-8 py-3"
                >
                  新規プロジェクト作成
                </button>
              </div>

              {/* 機能紹介セクション */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    3つの主要機能
                  </h3>
                  <p className="text-gray-600">
                    このツールの核となる機能をご紹介します
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 
  rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 
  rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      プライバシー管理
                    </h4>
                    <p className="text-gray-600 mb-4">
                      社内/社外の分類とシークレットモードで機密情報を安全に管理
                    </p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• 3段階の機密レベル設定</li>
                      <li>• シークレットモード</li>
                      <li>• アクセス制御</li>
                    </ul>
                  </div>

                  <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 
  rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 
  rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      多様な入力形式
                    </h4>
                    <p className="text-gray-600 mb-4">
                      議事録、音声メモ、Slackメッセージなど様々な形式に対応
                    </p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• 議事録・メモ入力</li>
                      <li>• 音声からテキスト変換</li>
                      <li>• 外部ツール連携</li>
                    </ul>
                  </div>

                  <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-indigo-50 
  rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 
  rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      AI分析・戦略提案
                    </h4>
                    <p className="text-gray-600 mb-4">
                      利害関係マトリクスと効果的な合意形成戦略を自動生成
                    </p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• 影響度マトリクス分析</li>
                      <li>• 戦略的提案</li>
                      <li>• 合意形成ヒント</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* プロジェクト一覧セクション */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <ProjectList onProjectSelect={handleProjectSelect} />
              </div>
            </div>
          ) : (
            <StakeholderDashboard
              project={currentProject}
              uiState={uiState}
              onUIStateChange={handleUIStateChange}
              onBackToHome={handleBackToHome}
            />
          )}
        </main>

        {/* フッター */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <AlignLogo size="sm" />
                <span className="text-sm text-gray-500">
                  ステークホルダー管理ツール v1.0.0
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  ヘルプ
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  プライバシーポリシー
                </button>
                <Settings className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 
  transition-colors" />
              </div>
            </div>
          </div>
        </footer>

        {/* プロジェクト作成フォーム */}
        {showCreateProject && (
          <ProjectForm
            onSubmit={handleProjectSubmit}
            onCancel={() => setShowCreateProject(false)}
          />
        )}
      </div>
    )
  }
