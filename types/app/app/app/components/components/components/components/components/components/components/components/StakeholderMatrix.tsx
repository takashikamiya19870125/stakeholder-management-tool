 'use client'

  import { useState } from 'react'
  import { User, Info, ZoomIn, ZoomOut } from 'lucide-react'
  import { Stakeholder } from '@/types'

  interface StakeholderMatrixProps {
    stakeholders: Stakeholder[]
    loading: boolean
  }

  export default function StakeholderMatrix({
    stakeholders,
    loading,
  }: StakeholderMatrixProps) {
    const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null)
    const [showDetails, setShowDetails] = useState(false)

    const getPositionInMatrix = (influence: string, interest: string) => {
      const influenceValue = influence === 'high' ? 80 : influence === 'medium' ? 50 : 20
      const interestValue = interest === 'high' ? 80 : interest === 'medium' ? 50 : 20

      // 少しランダムさを加えて重複を避ける
      const randomOffset = () => (Math.random() - 0.5) * 10

      return {
        x: influenceValue + randomOffset(),
        y: 100 - interestValue + randomOffset() // Y軸を反転（上が高い関心度）
      }
    }

    const getQuadrantLabel = (x: number, y: number) => {
      const isHighInfluence = x > 50
      const isHighInterest = y < 50 // Y軸が反転されているため

      if (isHighInfluence && isHighInterest) {
        return { label: '管理', color: 'bg-red-100 border-red-300', priority: 'critical' }
      } else if (!isHighInfluence && isHighInterest) {
        return { label: '満足', color: 'bg-green-100 border-green-300', priority: 'high' }
      } else if (isHighInfluence && !isHighInterest) {
        return { label: '監視', color: 'bg-yellow-100 border-yellow-300', priority: 'medium' }
      } else {
        return { label: '最小限', color: 'bg-gray-100 border-gray-300', priority: 'low' }
      }
    }

    const getStakeHolderColor = (stakeholder: Stakeholder) => {
      switch (stakeholder.stance) {
        case 'support':
          return 'bg-green-500 hover:bg-green-600'
        case 'oppose':
          return 'bg-red-500 hover:bg-red-600'
        case 'neutral':
          return 'bg-blue-500 hover:bg-blue-600'
        case 'unknown':
          return 'bg-purple-500 hover:bg-purple-600'
        default:
          return 'bg-gray-500 hover:bg-gray-600'
      }
    }

    const quadrants = [
      { x: 0, y: 0, width: 50, height: 50, ...getQuadrantLabel(25, 25) },
      { x: 50, y: 0, width: 50, height: 50, ...getQuadrantLabel(75, 25) },
      { x: 0, y: 50, width: 50, height: 50, ...getQuadrantLabel(25, 75) },
      { x: 50, y: 50, width: 50, height: 50, ...getQuadrantLabel(75, 75) },
    ]

    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    if (stakeholders.length === 0) {
      return (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            マトリクスを表示するデータがありません
          </h3>
          <p className="text-gray-600">
            ステークホルダーを追加すると、影響度と関心度に基づいたマトリクスが表示されます。
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* 説明パネル */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">影響度・関心度マトリクス</h4>
              <p className="text-sm text-blue-700 mt-1">

  ステークホルダーの影響度（横軸）と関心度（縦軸）に基づいて、適切な管理戦略を決定します。
                各ステークホルダーをクリックすると詳細情報が表示されます。
              </p>
            </div>
          </div>
        </div>

        {/* マトリクス */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="relative">
            {/* マトリクスのメイン領域 */}
            <div className="relative w-full h-96 border-2 border-gray-300">
              {/* 象限の背景 */}
              {quadrants.map((quad, index) => (
                <div
                  key={index}
                  className={`absolute ${quad.color} opacity-30`}
                  style={{
                    left: `${quad.x}%`,
                    top: `${quad.y}%`,
                    width: `${quad.width}%`,
                    height: `${quad.height}%`,
                  }}
                />
              ))}

              {/* 象限ラベル */}
              {quadrants.map((quad, index) => (
                <div
                  key={`label-${index}`}
                  className="absolute text-xs font-medium text-gray-600 pointer-events-none"
                  style={{
                    left: `${quad.x + quad.width/2}%`,
                    top: `${quad.y + quad.height/2}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {quad.label}
                </div>
              ))}

              {/* 軸ラベル */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm 
  font-medium text-gray-700">
                影響度 →
              </div>
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 -rotate-90 
  text-sm font-medium text-gray-700">
                関心度 →
              </div>

              {/* 軸の線 */}
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-400 opacity-50"></div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-400 opacity-50"></div>

              {/* ステークホルダーのプロット */}
              {stakeholders.map((stakeholder) => {
                const position = getPositionInMatrix(stakeholder.influence, stakeholder.interest)
                return (
                  <div
                    key={stakeholder.id}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all 
  duration-200 transform hover:scale-150 ${getStakeHolderColor(stakeholder)}`}
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => {
                      setSelectedStakeholder(stakeholder)
                      setShowDetails(true)
                    }}
                    title={`${stakeholder.name} (${stakeholder.influence}/${stakeholder.interest})`}
                  />
                )
              })}
            </div>

            {/* 軸の値 */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>低</span>
              <span>高</span>
            </div>
            <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs 
  text-gray-500">
              <span>高</span>
              <span>低</span>
            </div>
          </div>
        </div>

        {/* 凡例 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">凡例</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">支持</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">反対</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">中立</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">不明</span>
            </div>
          </div>
        </div>

        {/* 戦略的推奨事項 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">戦略的推奨事項</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mt-1"></div>
                <div>
                  <h5 className="font-medium text-gray-900">管理 (高影響度・高関心度)</h5>
                  <p className="text-sm 
  text-gray-600">積極的な関与。定期的なコミュニケーションと詳細な情報提供が必要。</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mt-1"></div>
                <div>
                  <h5 className="font-medium text-gray-900">監視 (高影響度・低関心度)</h5>
                  <p className="text-sm 
  text-gray-600">関心を高める努力。満足度を維持し、関与を促進する。</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mt-1"></div>
                <div>
                  <h5 className="font-medium text-gray-900">満足 (低影響度・高関心度)</h5>
                  <p className="text-sm text-gray-600">十分な情報提供。適切な関与レベルを維持。</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded mt-1"></div>
                <div>
                  <h5 className="font-medium text-gray-900">最小限 (低影響度・低関心度)</h5>
                  <p className="text-sm text-gray-600">最小限の労力。監視のみで十分。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 詳細モーダル */}
        {showDetails && selectedStakeholder && (
          <div className="modal-overlay">
            <div className="modal-content max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  ステークホルダー詳細
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center 
  justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedStakeholder.name}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedStakeholder.position} @ {selectedStakeholder.organization}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">影響度</span>
                    <p className="font-medium">
                      {selectedStakeholder.influence === 'high' ? '高' :
                       selectedStakeholder.influence === 'medium' ? '中' : '低'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">関心度</span>
                    <p className="font-medium">
                      {selectedStakeholder.interest === 'high' ? '高' :
                       selectedStakeholder.interest === 'medium' ? '中' : '低'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">スタンス</span>
                    <p className="font-medium">
                      {selectedStakeholder.stance === 'support' ? '支持' :
                       selectedStakeholder.stance === 'oppose' ? '反対' :
                       selectedStakeholder.stance === 'neutral' ? '中立' : '不明'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">優先度</span>
                    <p className="font-medium">
                      {selectedStakeholder.priority === 'critical' ? '最重要' :
                       selectedStakeholder.priority === 'high' ? '高' :
                       selectedStakeholder.priority === 'medium' ? '中' : '低'}
                    </p>
                  </div>
                </div>

                {selectedStakeholder.notes && (
                  <div>
                    <span className="text-sm text-gray-500">メモ</span>
                    <p className="text-sm text-gray-700 mt-1">{selectedStakeholder.notes}</p>
                  </div>
                )}

                {selectedStakeholder.tags && selectedStakeholder.tags.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-500">タグ</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedStakeholder.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs 
  bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetails(false)}
                  className="btn-secondary"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
