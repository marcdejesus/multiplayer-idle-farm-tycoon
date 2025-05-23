import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-green-800 mb-8">
        🌾 Harvest Town Tycoon
      </h1>
      
      <div className="max-w-2xl text-center mb-12">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to Harvest Town Tycoon, where you can build your dream farm, 
          interact with other players, and become a farming legend!
        </p>
        <p className="text-gray-600">
          Plant crops, raise animals, customize your farm, and join a vibrant 
          community of farmers from around the world.
        </p>
      </div>

      <div className="flex gap-4">
        <Link 
          href="/game"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Play Now
        </Link>
        <Link
          href="/about"
          className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-lg border-2 border-green-600 transition-colors"
        >
          Learn More
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <FeatureCard
          icon="🌱"
          title="Idle Farming"
          description="Plant crops and watch them grow even while you're away!"
        />
        <FeatureCard
          icon="👥"
          title="Multiplayer"
          description="Meet other farmers and trade in the town square"
        />
        <FeatureCard
          icon="🎮"
          title="Minigames"
          description="Visit the saloon for fun games and rewards"
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
} 