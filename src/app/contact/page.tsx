import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden">
      <section className="pt-20 px-6 max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-hanken font-extrabold mb-4 text-center">Contact Us</h1>
        <p className="text-[var(--color-on-surface-variant)] text-center max-w-2xl mx-auto mb-16">
          Have questions or want to get in touch? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-3xl flex gap-6 items-center">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="font-hanken font-bold text-xl mb-1">Visit Us</h3>
                <p className="text-[var(--color-on-surface-variant)]">123 Cafe Street, Tech Hub District, City 10000</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-3xl flex gap-6 items-center">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="font-hanken font-bold text-xl mb-1">Call Us</h3>
                <p className="text-[var(--color-on-surface-variant)]">+92 300 1234567</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-3xl flex gap-6 items-center">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="font-hanken font-bold text-xl mb-1">Email Us</h3>
                <p className="text-[var(--color-on-surface-variant)]">hello@aismartcafe.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="glass-card p-8 md:p-10 rounded-3xl space-y-6">
            <h2 className="text-2xl font-hanken font-bold mb-6">Send a Message</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)]" />
              <input type="email" placeholder="Your Email" className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)]" />
              <textarea rows={5} placeholder="Your Message" className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)]"></textarea>
            </div>
            <button className="w-full bg-[var(--color-primary)] text-[var(--color-on-primary)] py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(242,202,80,0.3)]">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
