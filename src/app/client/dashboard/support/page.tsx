import Link from 'next/link'
import { LifeBuoy, Send } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="space-y-12">
      <div className="text-left">
        <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] mb-2 text-[10px]">Client Relations</h2>
        <h1 className="text-4xl md:text-5xl font-black text-nm-text leading-tight">
          Priority <span className="text-brand-orange">Support.</span>
        </h1>
        <p className="mt-4 text-nm-text-muted text-lg">
          Need help? Submit a ticket or browse our knowledge base.
        </p>
      </div>

      <div className="rounded-[40px] nm-flat-lg border border-nm-text/5 p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="inline-flex items-center justify-center w-20 h-20 nm-inset-sm rounded-full mb-10 text-brand-orange">
          <LifeBuoy className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold text-nm-text mb-6">Direct Line to Engineering</h2>
        <p className="mt-2 text-nm-text-muted text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Our support team is ready to assist you with any questions or issues regarding your active projects. We prioritize tickets based on operational impact.
        </p>
        
        <button className="inline-flex items-center gap-4 rounded-xl nm-btn-accent px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl hover:scale-105 active:scale-[0.98] transition-all relative z-10">
          <Send className="h-4 w-4" />
          Initialize Support Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-8 nm-flat-md rounded-3xl border border-nm-text/5 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-4">Response Time</h4>
              <p className="text-nm-text-muted">Standard response within <span className="text-nm-text font-bold">4 hours</span> for critical production issues.</p>
          </div>
          <div className="p-8 nm-flat-md rounded-3xl border border-nm-text/5 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-4">Documentation</h4>
              <p className="text-nm-text-muted">Browse the <Link href="/client/dashboard/documents" className="text-nm-text font-bold hover:text-brand-orange transition-colors underline underline-offset-4">Shared Vault</Link> for self-service guides.</p>
          </div>
      </div>
    </div>
  )
}
