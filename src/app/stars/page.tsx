'use client'
import { useState , useEffect } from 'react'
import Link from 'next/link'

export default function StarsPage() {
  const [letters, setLetters] = useState<{ id: number; title: string; content: string; date: string; countdown: string }[]>([])
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const savedLettersFromStorage = JSON.parse(localStorage.getItem('starLetters') || '[]')
    setLetters(savedLettersFromStorage)
    console.log(savedLettersFromStorage)
  }, [])
  
    const handleDelete = (id: number) => {
      try {  // <--- 修正這裡的結構
        const confirmDelete = window.confirm('確定要永久刪除這顆星星嗎？')
        if (!confirmDelete) return
  
        const updatedLetters = letters.filter(letter => letter.id !== id)
        setLetters(updatedLetters)
        localStorage.setItem('starLetters', JSON.stringify(updatedLetters))
        
        if (selectedLetter === id) {
          setSelectedLetter(null)
        }
      } catch {  // <--- 保持完整的 catch 結構
        alert('刪除失敗，請稍後再試')
      }
    }

  return (
    <div className="min-h-screen text-white p-20">
      {/* 返回按鈕 */}
      <div className="absolute left-4 top-4">
        <Link href="/" className="font-serif bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
          ← Back
        </Link>
      </div>
      <main>
        <Link href="/write">
          <button className="font-serif bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition">
            💌 前往寫信頁面
          </button>
        </Link>
      </main>
      
      {/* 星星區塊 */}
      <h1 className="text-3xl font-serif mt-10 mb-6">點擊你的星星 🌠</h1>
      <div className="flex gap-6 flex-wrap">
        {letters.map((letter) => (
          <div key={letter.id} className="group relative">
            <button 
              className="w-20 h-20 hover:scale-110 transition-transform text-6xl"
              onClick={() => setSelectedLetter(letter.id)}
            >
              ⭐
            </button>
            <button
              className="absolute -top-2 -right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDelete(letter.id)}
              aria-label="刪除星星"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* 信件內容彈窗 */}
      {selectedLetter !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-6">
          <div className="bg-gray-900 p-10 rounded-lg max-w-xl w-full mx-4 relative">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl">{letters.find(l => l.id === selectedLetter)?.title}</h2>
              <div className="flex gap-2">
                <button
                  className="text-red-500 hover:text-red-400 transition-colors"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  刪除
                </button>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setSelectedLetter(null)}
                >
                  ✕
                </button>
              </div>
            </div>
            <p className="whitespace-pre-wrap">{letters.find(l => l.id === selectedLetter)?.content}</p>
            <div className="mt-4 text-sm text-gray-400">
              <p>📅 {letters.find(l => l.id === selectedLetter)?.date}</p>
              <p>⏳ {letters.find(l => l.id === selectedLetter)?.countdown}</p>
            </div>
          </div>
        </div>
      )}

      {/* 刪除確認彈窗 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-xl mb-4">確定要永久刪除這顆星星嗎？</h3>
            <div className="flex justify-end gap-4">
              <button 
                className="px-4 py-2 text-gray-400 hover:text-white"
                onClick={() => setShowDeleteConfirm(false)}
              >
                取消
              </button>
              <button 
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                onClick={() => {
                  handleDelete(selectedLetter!)
                  setShowDeleteConfirm(false)
                }}
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}