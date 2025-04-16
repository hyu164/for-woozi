import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic' // 強制 API 動態執行

export async function GET() {
  const cardsDir = path.join(process.cwd(), 'public/cards') // 指向 public/cards 資料夾

  try {
    // 讀取目錄中的所有檔案
    const files = await fs.readdir(cardsDir)

    // 過濾出圖片檔案 (支援 jpg, png, gif, webp 等格式)
    const imageFiles = files.filter(file => /\.(jpg|JPG|jpeg|png|gif|webp)$/i.test(file))

    // 回傳圖片路徑 (相對於 public 資料夾)
    return NextResponse.json({
      cards: imageFiles.map(file => `/cards/${file}`)
    })
  } catch (error) {
    console.error('無法讀取卡片目錄:', error)
    return NextResponse.json(
      { error: '無法讀取卡片目錄' },
      { status: 500 }
    )
  }
}
