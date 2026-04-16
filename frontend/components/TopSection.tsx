import Carousel from "./CarouselBanner";

export default function TopSection() {
  return (
    <section className="w-full mb-6 flex flex-col md:flex-row gap-4">
      <div className="h-[200px] md:h-[250px] flex-1 bg-pink-100 rounded-xl shadow-md border border-pink-200">
        <Carousel />
      </div>
      
      <div className="w-full md:w-64 flex flex-row md:flex-col gap-4 h-[120px] md:h-[250px]">
        <div className="flex-1 relative overflow-hidden bg-pink-50 rounded-xl flex items-center justify-center text-pink-400 font-bold shadow-sm border border-pink-100">
            <img 
            src="dragonite.jpg" 
            alt="Dragonite" 
            className='absolute inset-0 w-full h-full object-cover'
            />
        </div>

        <div className="flex-1 relative overflow-hidden bg-pink-50 rounded-xl flex items-center justify-center text-pink-400 font-bold shadow-sm border border-pink-100">
            <img 
            src="snorlax.jpg" 
            alt="Snorlax" 
            className='absolute inset-0 w-full h-full object-cover'
            />
        </div>
      </div>
    </section>
  );
}