import Carousel from "./CarouselBanner";

export default function TopSection() {
  return (
    <section className="w-full mb-6 flex flex-col md:flex-row gap-4 h-[250px]">
      <div className="flex-1 bg-pink-100 rounded-xl flex items-center justify-center shadow-md border border-pink-200">
        <Carousel />
      </div>
      
      <div className="w-full md:w-64 flex flex-col gap-4">
        <div className="flex-1 relative overflow-hidden bg-pink-50 rounded-xl flex items-center justify-center text-pink-400 font-bold shadow-sm border border-pink-100">
            <img 
            src="dragonite.jpg" 
            alt="" 
            className='inset-0 w-full h-full object-cover'
            />
        </div>

        <div className="flex-1 relative overflow-hidden bg-pink-50 rounded-xl flex items-center justify-center text-pink-400 font-bold shadow-sm border border-pink-100">
            <img 
            src="snorlax.jpg" 
            alt="" 
            className='inset-0 w-full h-full object-cover'
            />
        </div>
      </div>
    </section>
  );
}