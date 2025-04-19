import Link from 'next/link'
import Image from 'next/image'
import './globals.css'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-serif text-white leading-[4rem]">
          This is my universe for WOOZI.
        </h1>
        <p className="text-xl font-serif text-white">
          My personal space to record my thoughts of you.
        </p>
      </header>
      <main className="flex flex-col items-center ">
        <Link href="/thoughts">
          <button className="hover:opacity-80">
            <Image
              src="/images/button.png"
              alt="Button Icon"
              width={300}
              height={100}
              className="object-cover"
            />
          </button>
        </Link>
      </main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4 ">
      <main>
        <Link href="/write">
          <button className=" font-serif bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition">
            💌 前往寫信頁面
          </button>
        </Link>
      </main>
      <main>
        <Link href="/stars">
          <button className=" font-serif bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition">
           🌠 前往我的宇宙
          </button>
        </Link>
      </main>
    </div>
    </div>
  )
}
    
  