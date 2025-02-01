import { Button } from "./components/button"
import { GameCard } from "./components/game-card"

export default function HeroView() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="w-full max-w-6xl mx-auto mt-10">
        <div className="rounded-lg overflow-hidden shadow-2xl mb-12">
          <div className="bg-gradient-to-br from-black to-purple-900 p-8 sm:p-12 md:p-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 text-center">
              AgenticMARL
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 text-center">
              Revolutionizing game simulations with Machine Learning
            </p>
            <div className="flex justify-center">
              <Button className="bg-white text-black hover:bg-gray-100 text-lg py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                Choose a Game
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <GameCard
            title="Negotiation V1"
            description="Negotiation is a strategic two-player game where each participant starts with a set of resources valued differently by each player."
            imageSrc="/negogi.jpg"
            gameSlug="negotiationV1"
          />
          <GameCard
            title="Prisoner's Dilemma"
            description="Prisoner's Dilemma is a strategic two-player game where each player can either 'cooperate' or 'defect' in each round."
            imageSrc="/prisonerd.jpg"
            isComingSoon={true}
          />
        </div>
      </div>
    </div>
  )
}