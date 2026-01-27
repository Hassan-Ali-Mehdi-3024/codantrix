import { LifeBuoy, Send } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#fffdf2]">
          Support
        </h1>
        <p className="mt-2 text-[#fffdf2]/60">
          Need help? Submit a ticket or browse our knowledge base.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
          <LifeBuoy className="h-8 w-8 text-[#f15a2f]" />
        </div>
        <h2 className="text-xl font-bold text-[#fffdf2]">How can we help?</h2>
        <p className="mt-2 text-[#fffdf2]/60 max-w-md mx-auto mb-8">
          Our support team is ready to assist you with any questions or issues regarding your active projects.
        </p>
        
        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b83a0f] via-[#f15a2f] to-[#b83a0f] bg-[length:200%_100%] hover:bg-[position:100%_0] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-[#f15a2f]/25 transition-all duration-500">
          <Send className="h-4 w-4" />
          Create New Ticket
        </button>
      </div>
    </div>
  )
}
