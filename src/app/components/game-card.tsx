"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "./button"

interface GameCardProps {
  title: string
  description: string
  imageSrc: string
  isComingSoon?: boolean
  gameSlug?: string
}

export function GameCard({ title, description, imageSrc, isComingSoon = false, gameSlug }: GameCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (!isComingSoon && gameSlug) {
      router.push(`/${gameSlug}`)
    }
  }

  return (
    <div
      className={`bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${isComingSoon ? "opacity-50 cursor-not-allowed" : "hover:shadow-2xl hover:scale-105 cursor-pointer"}`}
      onClick={handleClick}
    >
      <div className="relative h-48">
        <Image src={imageSrc || "/negogi.jpg"} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <Button
          className={`w-full ${isComingSoon ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          disabled={isComingSoon}
        >
          {isComingSoon ? "Coming Soon" : "Simulate Game"}
        </Button>
      </div>
    </div>
  )
}

