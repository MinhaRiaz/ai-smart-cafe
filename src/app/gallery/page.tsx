import Image from "next/image";

export default function GalleryPage() {
  const images = [
    { src: "/images/midnight_espresso.png", alt: "Midnight Espresso" },
    { src: "/images/caramel_latte.png", alt: "Caramel Latte" },
    { src: "/images/matcha_zen.png", alt: "Matcha Zen" },
    { src: "/images/lava_cake.png", alt: "Chocolate Lava Cake" },
    { src: "/images/avocado_toast.png", alt: "Avocado Toast" },
    { src: "/images/midnight_espresso.png", alt: "Signature Brew" },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[var(--color-primary-container)]/10 blur-[150px] rounded-full pointer-events-none" />

      <section className="pt-20 px-6 max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-hanken font-extrabold mb-4 text-center">Gallery</h1>
        <p className="text-[var(--color-on-surface-variant)] text-center max-w-2xl mx-auto mb-16">
          A glimpse into the ambiance and artisanal creations at AI Smart Cafe.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-square rounded-3xl overflow-hidden glass-card">
              <div className="absolute inset-0 bg-[var(--color-surface-bright)] flex items-center justify-center text-[var(--color-on-surface-variant)]">
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-geist font-bold">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
