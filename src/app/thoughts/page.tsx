'use client'
export {}  
import { useState } from 'react'
import Link from 'next/link'



export default function WooziThoughtsPage() {
  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  const thoughtSections = [
    {
      title: "音樂天才",
      content: "我寶寶",
      imageUrl: "/images/woozi1.jpg" 
    },
    {
      title: "我的寶貝小勳",
      content: "我愛你",
      imageUrl:"/images/woozi2.jpg" 
    },
    {
      title: "我要一口把你吃掉",
      content: "你是最棒的",
      imageUrl: "/images/woozi3.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-background text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
      <div className="absolute left-4 top-4">
          <Link href="/" className="font-serif bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
            ← Back
          </Link>
        </div>
        <header className="text-center mb-10">
          <h1 className="text-4xl font-serif mb-4">
           僅獻給我的宇宙
          </h1>
        
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {thoughtSections.map((section, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedSection(selectedSection === index ? null : index)}
            >
              <img 
                src={section.imageUrl} 
                alt={section.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-serif mb-2">{section.title}</h2>
                {selectedSection === index && (
                  <p className="text-sm mt-2">{section.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedSection !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
               onClick={() => setSelectedSection(null)}>
            <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-8 relative">
              <button 
                className="absolute top-4 right-4 text-2xl text-white hover:text-gray-300"
                onClick={() => setSelectedSection(null)}
              >
                ✕
              </button>
              <h2 className="text-3xl font-serif mb-4">
                {thoughtSections[selectedSection].title}
              </h2>
              <img 
                src={thoughtSections[selectedSection].imageUrl} 
                alt={thoughtSections[selectedSection].title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-lg">
                {thoughtSections[selectedSection].content}
              </p>
              <main className="flex flex-col items-center ">
      </main>
            </div>
          </div>
          
        )}
      </div>
    </div>
  )
}
