export type Pokemon = {
  name: string;
  image: string;
  types: string[];
};

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-blue-200 transition">
      
      <img 
        src={pokemon.image} 
        alt={pokemon.name} 
        className="w-24 h-24 shrink-0 object-contain drop-shadow-md" 
      />
      
      <div className="w-full">
        <h3 className="capitalize font-bold text-lg text-gray-800">
          {pokemon.name}
        </h3>
        
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span 
              key={type} 
              className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md capitalize text-gray-600 border border-gray-200"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}