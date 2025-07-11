'use client'

  import { Shield, Eye, EyeOff } from 'lucide-react'

  interface PrivacyToggleProps {
    viewMode: 'public' | 'internal' | 'all'
    secretMode: boolean
    onViewModeChange: (mode: 'public' | 'internal' | 'all') => void
    onSecretModeChange: (mode: boolean) => void
  }

  export default function PrivacyToggle({
    viewMode,
    secretMode,
    onViewModeChange,
    onSecretModeChange,
  }: PrivacyToggleProps) {
    const viewModeOptions = [
      { value: 'public', label: '公開', color: 'bg-blue-100 text-blue-800' },
      { value: 'internal', label: '社内', color: 'bg-yellow-100 text-yellow-800' },
      { value: 'all', label: 'すべて', color: 'bg-gray-100 text-gray-800' },
    ]

    return (
      <div className="flex items-center space-x-4">
        {/* 表示モード切り替え */}
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700">表示:</span>
          <div className="flex rounded-md border border-gray-300 overflow-hidden">
            {viewModeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onViewModeChange(option.value as 'public' | 'internal' | 'all')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  viewMode === option.value
                    ? option.color
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* シークレットモード */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSecretModeChange(!secretMode)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-medium
  transition-colors ${
              secretMode
                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {secretMode ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3" />
            )}
            <span>{secretMode ? 'シークレット' : '通常'}</span>
          </button>
        </div>
      </div>
    )
  }
