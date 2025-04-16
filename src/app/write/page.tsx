'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function WritePage() {
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [countdown, setCountdown] = useState('')
  const [randomCard, setRandomCard] = useState('') // 用來存放隨機抽到的卡片
  const [allCards, setAllCards] = useState<string[]>([]) // 存放所有卡片路徑
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showCardPopup, setShowCardPopup] = useState(false) // 控制是否顯示彈出卡片
  const [savedLetters, setSavedLetters] = useState<any[]>([]) // 用來存放已儲存的信件
  const cardRef = useRef<HTMLDivElement>(null)

  // 日期顯示邏輯
  useEffect(() => {
    const today = new Date()
    const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`
    setCurrentDate(formattedDate)
  }, [])

  // 倒數計時邏輯
  useEffect(() => {
    const targetDate = new Date('2026-11-22T23:59:59').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        setCountdown('已過期')
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000)) / 1000)

      setCountdown(`${days}天 ${hours}小時 ${minutes}分鐘 ${seconds}秒`)
    }

    const timerInterval = setInterval(updateCountdown, 1000)
    updateCountdown()

    return () => clearInterval(timerInterval)
  }, [])

  // 從後端 API 獲取所有卡片圖片
  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('/api/cards')
        const { cards } = await response.json()
        setAllCards(cards) // 儲存所有卡片路徑到狀態中
      } catch (error) {
        console.error('無法獲取卡片列表:', error)
      }
    }
    fetchCards()
  }, [])

  // 抽卡邏輯
  const drawRandomCard = () => {
    if (allCards.length === 0 || isAnimating) return

    setIsAnimating(true)
    setIsFlipped(true)

    const randomIndex = Math.floor(Math.random() * allCards.length)
    setRandomCard(allCards[randomIndex])

    // 顯示彈出層
    setTimeout(() => {
      setShowCardPopup(true)
      setIsAnimating(false)
    }, 600) // 與動畫時間一致
  }

  // 新增信件並觸發抽卡
  const addLetterAndDrawCard = () => {
    if (newTitle && newContent && !isAnimating) {
      const newLetter = {
        id: Date.now(),
        title: newTitle,
        content: newContent,
        date: currentDate,
        countdown
      }

      if (typeof window !== 'undefined') {
        const savedLettersFromStorage = JSON.parse(localStorage.getItem('starLetters') || '[]')
        const updatedLetters = [...savedLettersFromStorage, newLetter]
        localStorage.setItem('starLetters', JSON.stringify(updatedLetters))
        setSavedLetters(updatedLetters) // 更新狀態以顯示新增的信件
      }

      // 清空輸入框
      setNewTitle('')
      setNewContent('')
      
      drawRandomCard() // 執行抽卡邏輯
    }
  }

return (
<div className="min-h-screen text-white p-20 relative">
{/* 卡片彈出層 */}
{showCardPopup && (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCardPopup(false)}>
<div ref={cardRef} className="relative w-96 h-128 bg-white rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
{randomCard && (
<img src={randomCard} alt="抽到的卡片" className="w-full h-full object-cover rounded-xl"/>
)}
</div>
</div>
)}

{/* 返回按鈕 */}
<div className="absolute left-4 top-4">
<Link href="/" className="font-serif bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
← Back</Link>
</div>

{/* 日期與倒數區塊 */}
<div className="mb-6 space-y-2">
<h2 className="text-xl font-serif bg-white/10 p-3 rounded-lg inline-block">
📅 今天是：{currentDate}</h2>
<h2 className="text-xl font-serif bg-white/10 p-3 rounded-lg inline-block ml-4">
⏳ 倒數：{countdown}</h2>
</div>

{/* 寫信區塊 */}
<h1 className="text-3xl font-serif mb-4">寫在這裡</h1>

<input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} 
className="w-full font-serif p-2 mb-2 bg-gray-800 text-white rounded"/>

<textarea placeholder="write down something..." value={newContent} onChange={(e) => setNewContent(e.target.value)} 
className="w-full font-serif p-2 mb-2 bg-gray-800 text-white rounded h-32"/>

{/* 抽卡按鈕 */}
<div className="mt-6">
<div className="relative w-64 h-96 mx-auto perspective-1000">
<div className={`relative w-full h-full font-serif transition-transform duration-500 transform-style-preserve-3d ${
isFlipped ? 'rotate-y-180' : ''
}`}>
{/* 卡片正面 */}
<div className="absolute w-full h-full bg-gray-600 rounded-xl backface-hidden flex items-center 
justify-center text-2xl font-bold shadow-xl">
寫信後抽
</div>

{/* 卡片背面 */}
<div className="absolute w-full h-full bg-gray-600 rounded-xl backface-hidden rotate-y-180 transform">{randomCard && (
<img src={randomCard} alt="抽到的卡片" className="w-full h-full object-cover rounded-xl"/> )}
</div>
</div>
</div>
<button 
onClick={addLetterAndDrawCard}
disabled={isAnimating}
className={`bg-yellow-500 px-4 py-2 rounded-lg font-serif mt-4 ${
isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
}`} >
⭐ 儲存成星星並抽卡</button>
</div>


{/* 導航到星星頁面的按鈕 */}
<div className="mt-6">
<Link href="/stars" className="bg-gray-500 px-4 py-2 rounded-lg text-white 
font-serif hover:opacity-80 ">查看我的宇宙🌠</Link></div></div>)
}
