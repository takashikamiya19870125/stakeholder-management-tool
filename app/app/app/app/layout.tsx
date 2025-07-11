import './globals.css'
  import { Inter, Noto_Sans_JP } from 'next/font/google'

  const inter = Inter({ subsets: ['latin'] })
  const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

  export const metadata = {
    title: 'ステークホルダー管理ツール',
    description: '議事録・音声メモ・Slack等の情報を基に、AIが利害関係マトリクスと効果的な合意形成案
  を自動生成するツール',
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="ja">
        <body className={`${inter.className} ${notoSansJP.className} bg-gray-50`}>
          <div className="min-h-screen">
            {children}
          </div>
        </body>
      </html>
    )
  }
