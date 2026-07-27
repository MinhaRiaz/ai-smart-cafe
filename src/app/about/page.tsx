import { Coffee, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden">
      <section className="pt-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-hanken font-extrabold mb-6">Our Story</h1>
            <p className="text-[var(--color-on-surface-variant)] text-lg mb-6 leading-relaxed">
              Founded at the intersection of technology and artisanal craftsmanship, AI Smart Cafe is not just another coffee shop. We are a destination for those who appreciate the perfect brew, curated with the precision of artificial intelligence and the passion of master baristas.
            </p>
            <p className="text-[var(--color-on-surface-variant)] text-lg mb-8 leading-relaxed">
              Our mission is to redefine the cafe experience, making it highly personalized, seamless, and unforgettable.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl text-center">
                <Coffee className="w-8 h-8 mx-auto text-[var(--color-primary)] mb-3" />
                <h4 className="font-hanken font-bold mb-1">Premium Beans</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)]">Ethically sourced globally</p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <Award className="w-8 h-8 mx-auto text-[var(--color-primary)] mb-3" />
                <h4 className="font-hanken font-bold mb-1">AI Precision</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)]">Perfectly calibrated</p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <Users className="w-8 h-8 mx-auto text-[var(--color-primary)] mb-3" />
                <h4 className="font-hanken font-bold mb-1">Community</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)]">A place to connect</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] bg-[var(--color-surface-bright)] glass-card flex items-center justify-center relative overflow-hidden">
               <iframe 
                  className="w-full h-full object-cover" 
                  src="https://www.youtube.com/embed/FvMBv5kG4aI?autoplay=1&mute=1&loop=1&playlist=FvMBv5kG4aI" 
                  title="Cafe Atmosphere" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
               <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-transparent mix-blend-overlay pointer-events-none"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[var(--color-primary)]/20 blur-[50px] rounded-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
