import { Calendar, Clock, Users, Mail, Phone, User } from "lucide-react";

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary-container)]/10 blur-[150px] rounded-full pointer-events-none" />

      <section className="pt-20 px-6 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-hanken font-extrabold mb-4">Book a Table</h1>
          <p className="text-[var(--color-on-surface-variant)]">
            Reserve your spot for an unforgettable experience.
          </p>
        </div>

        <form className="glass-card p-8 md:p-12 rounded-3xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-geist text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-outline)]" />
                <input type="text" className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="John Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-geist text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-outline)]" />
                <input type="email" className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-geist text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-outline)]" />
                <input type="tel" className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="+92 300 0000000" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-geist text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Guests</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-outline)]" />
                <select className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none">
                  {[1,2,3,4,5,6,"7+"].map(n => <option key={n} value={n}>{n} People</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-geist text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-outline)]" />
                <input type="date" className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-primary)] transition-colors [color-scheme:dark]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-geist text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Time</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-outline)]" />
                <input type="time" className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-primary)] transition-colors [color-scheme:dark]" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="font-geist text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Special Requests</label>
            <textarea rows={4} className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="Any dietary requirements or special occasions?"></textarea>
          </div>

          <button className="w-full bg-[var(--color-primary)] text-[var(--color-on-primary)] py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(242,202,80,0.3)]">
            Confirm Reservation
          </button>
        </form>
      </section>
    </main>
  );
}
