"use client"

import React from 'react'

interface SimulationOutputProps {
  messages: string[]
}

export function SimulationOutput({ messages }: SimulationOutputProps) {
  const outputRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div 
      ref={outputRef}
      className="bg-gray-900 rounded-lg p-4 mt-8 h-96 overflow-y-auto"
    >
      {messages.map((message, index) => (
        <p key={index} className="text-gray-300 mb-2">
          {message}
        </p>
      ))}
    </div>
  )
}