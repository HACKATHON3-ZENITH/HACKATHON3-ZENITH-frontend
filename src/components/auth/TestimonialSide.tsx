export function TestimonialSide() {
  return (
    <div className="flex flex-col justify-center h-full w-full max-w-2xl px-12 lg:px-20 text-white relative z-10">
      <blockquote className="text-5xl lg:text-7xl font-black leading-[1.05] mb-12 tracking-tighter">
        "La formation d'<span className="text-brand-secondary">excellence</span> est le socle de toute <span className="text-brand-secondary">ascension</span> entrepreneuriale sur le continent."
      </blockquote>
      
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full border-2 border-brand-secondary p-1 shadow-2xl shadow-brand-secondary/30">
          <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center font-black text-2xl backdrop-blur-md text-white">DK</div>
        </div>
        <div>
          <p className="text-3xl font-black tracking-tight">DJOMO Karlyn</p>
          <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-xs">CEO & Bâtisseur de Systèmes</p>
        </div>
      </div>
      
      <div className="flex space-x-4 mt-20">
        <div className="w-16 h-2 bg-brand-secondary rounded-full shadow-lg shadow-brand-secondary/40" />
        <div className="w-3 h-2 bg-white/20 rounded-full" />
        <div className="w-3 h-2 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}
