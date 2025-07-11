 export default function Home() {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ALIGN ステークホルダー管理ツール
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            議事録や音声メモからAIが利害関係マトリクスと効果的な合意形成案を自動生成します
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
            開始する
          </button>
        </div>
      </div>
    )
  }

