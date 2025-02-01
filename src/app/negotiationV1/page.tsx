"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "../components/button"
import { Select } from "../components/select"

const MODEL_OPTIONS = [
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-4-mini", label: "GPT-4 Mini" },
]

export default function NegotiationV1() {
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player1, player2, game: "negotiationV1" }),
      })

      if (response.ok) {
        console.log("Simulation started successfully")
        // You might want to redirect to a results page or show a loading state
      } else {
        console.error("Failed to start simulation")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-96">
        <Image
          src="/negogi.jpg"
          alt="Negotiation background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-center">Negotiation V1</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-12 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="player1" className="block text-lg mb-2">
              Player 1 Model:
            </label>
            <Select
              options={MODEL_OPTIONS}
              value={player1}
              onValueChange={setPlayer1}
              placeholder="Select Player 1 Model"
            />
          </div>
          <div>
            <label htmlFor="player2" className="block text-lg mb-2">
              Player 2 Model:
            </label>
            <Select
              options={MODEL_OPTIONS}
              value={player2}
              onValueChange={setPlayer2}
              placeholder="Select Player 2 Model"
            />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Start Simulation
          </Button>
        </form>
      </div>
    </div>
  )
}

