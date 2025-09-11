import React from 'react'
import { Nav } from '../components/nav'
import { AIAssistant } from '../components/AIAssistant'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Nav />
      {/* Add top padding equal to (or slightly larger than) fixed nav height so content isn't hidden */}
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-8">
        {/* Remove 'compact' so assistant can manage its own full-height layout */}
        <AIAssistant />
      </main>
    </div>
  )
}

