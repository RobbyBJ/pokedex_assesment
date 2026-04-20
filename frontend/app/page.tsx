import TopSection from '@/components/TopSection';
import PokemonGrid from '@/components/PokemonGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      <div className="flex items-center justify-center gap-4 pt-10 mb-2">
        <img 
          src="pokeball.png" 
          alt="pokeball" 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 animate-bounce"
        />
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center">
          Pokedex
        </h1>
        <img 
          src="pokeball.png" 
          alt="pokeball" 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 animate-bounce"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        <TopSection />

        <div className="flex flex-col md:flex-row gap-6 md:items-start overflow-hidden">

          <div className="hidden md:flex w-64 bg-blue-50 rounded-xl items-center justify-center border border-blue-100 shadow-sm sticky top-4 h-[calc(100vh-2rem)] shrink-0">
            <img 
            src="starters.jpg" 
            alt="" 
            className='absolute inset-0 w-full h-full object-cover'
            />
          </div>

          <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 relative min-w-0 overflow-y-auto w-full md:sticky top-4 h-[calc(100vh-2rem)]">
             <PokemonGrid />
          </div>

          <div className="hidden md:flex w-64 bg-blue-50 rounded-xl items-center justify-center border border-blue-100 shadow-sm sticky top-4 h-[calc(100vh-2rem)] shrink-0">
            <img 
            src="ash.jpg" 
            alt="" 
            className='absolute inset-0 w-full h-full object-cover'
            />
          </div>

        </div>
      </div>
    </main>
  );
}