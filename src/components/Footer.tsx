import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-surface)] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-hanken font-bold text-[var(--color-primary)] mb-4 block">
            AI Smart Cafe
          </Link>
          <p className="text-[var(--color-on-surface-variant)] max-w-sm mb-6">
            An intelligent cafe experience blending premium artisanal coffee with AI-powered recommendations.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-[var(--color-primary)] cursor-pointer transition-colors">
              IG
            </div>
            <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-[var(--color-primary)] cursor-pointer transition-colors">
              TW
            </div>
            <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-[var(--color-primary)] cursor-pointer transition-colors">
              FB
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-geist text-[var(--color-on-surface)] uppercase tracking-widest mb-6 text-sm font-bold">Quick Links</h4>
          <ul className="space-y-4 text-[var(--color-on-surface-variant)]">
            <li><Link href="/menu" className="hover:text-[var(--color-primary)] transition-colors">Menu</Link></li>
            <li><Link href="/reservations" className="hover:text-[var(--color-primary)] transition-colors">Reservations</Link></li>
            <li><Link href="/ai-assistant" className="hover:text-[var(--color-primary)] transition-colors">AI Assistant</Link></li>
            <li><Link href="/admin" className="hover:text-[var(--color-primary)] transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-geist text-[var(--color-on-surface)] uppercase tracking-widest mb-6 text-sm font-bold">Contact</h4>
          <ul className="space-y-4 text-[var(--color-on-surface-variant)]">
            <li>123 Cafe Street, Tech Hub</li>
            <li>hello@aismartcafe.com</li>
            <li>+92 300 1234567</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-[var(--color-on-surface-variant)] text-sm">
        <p>&copy; {new Date().getFullYear()} AI Smart Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
}
