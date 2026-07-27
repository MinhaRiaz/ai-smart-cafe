import { Star } from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    { name: "Sarah J.", rating: 5, comment: "The AI recommendation was spot on! I tried the Caramel Cloud Latte based on my preferences and it's my new favorite." },
    { name: "Michael T.", rating: 5, comment: "Incredible ambiance and the ordering process is so smooth. The Midnight Espresso is a must-try." },
    { name: "Emily R.", rating: 4, comment: "Loved the tech-forward approach without losing the cozy cafe feel. Great pastries too!" },
    { name: "David L.", rating: 5, comment: "Best coffee shop in the city. The staff is friendly and the app makes reservations a breeze." },
    { name: "Jessica M.", rating: 5, comment: "A truly unique experience. The AI Assistant knew exactly what I needed on a rainy Tuesday morning." },
    { name: "Alex K.", rating: 4, comment: "Great place to work. Fast Wi-Fi, excellent coffee, and comfortable seating." },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--color-primary-container)]/10 blur-[150px] rounded-full pointer-events-none" />

      <section className="pt-20 px-6 max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-hanken font-extrabold mb-4 text-center">Customer Reviews</h1>
        <p className="text-[var(--color-on-surface-variant)] text-center max-w-2xl mx-auto mb-16">
          See what our community has to say about their AI Smart Cafe experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-5 h-5 ${j < review.rating ? 'text-[var(--color-primary)] fill-[var(--color-primary)]' : 'text-white/20'}`} />
                ))}
              </div>
              <p className="text-[var(--color-on-surface)] mb-6 italic">"{review.comment}"</p>
              <div className="font-geist font-bold text-sm uppercase tracking-widest text-[var(--color-primary)]">
                - {review.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
