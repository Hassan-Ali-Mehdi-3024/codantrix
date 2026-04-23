import Hero from "@/components/home/Hero";
import ServiceCard from "@/components/cards/ServiceCard";
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic'

const services = [
  { name: 'AI/ML Solutions', slug: 'ai-ml-solutions', icon: 'brain', description: 'Custom machine learning for enterprise problems with ground-truth validation.' },
  { name: 'Computer Vision Models', slug: 'computer-vision', icon: 'camera', description: 'Real-time CV systems for industrial applications and precision manufacturing.' },
  { name: 'Industrial Automation', slug: 'industrial-automation', icon: 'cpu', description: 'End-to-end automation systems designed for reliability and ROI.' },
  { name: 'Web Development', slug: 'web-development', icon: 'code', description: 'Full-stack web solutions supporting complex AI backends and data flows.' },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />

      {/* Services Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-nm-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-16 h-[min(60vw,18rem)] w-[min(60vw,18rem)] rounded-full bg-brand-orange blur-[min(16vw,120px)] opacity-5" />
          <div className="absolute bottom-0 right-0 h-[min(56vw,16rem)] w-[min(56vw,16rem)] rounded-full bg-brand-orange blur-[min(14vw,110px)] opacity-5" />
        </div>
        <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="space-y-3 flex flex-col items-center text-center sm:items-start sm:text-left">
              <h2 className="inline-flex items-center gap-3 rounded-full nm-flat-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-nm-text-muted">What We Solve</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-nm-text leading-tight">Enterprise-Grade AI Services</h3>
              <p className="text-base md:text-lg text-nm-text-muted max-w-2xl">End-to-end pods that ship production ML, computer vision, automation, and full-stack software with measurable ROI.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[minmax(220px,1fr)] sm:auto-rows-[minmax(260px,1fr)] lg:auto-rows-[minmax(280px,1fr)] gap-8">
            {services.map((service, i) => {
              const layout = [
                "lg:col-span-4 lg:row-span-1",
                "lg:col-span-8 lg:row-span-1",
                "lg:col-span-8 lg:row-span-1",
                "lg:col-span-4 lg:row-span-1",
              ][i] || "lg:col-span-6"

              return (
                <ServiceCard
                  key={service.slug}
                  {...service}
                  index={i}
                  className={cn(layout, "h-full")}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-nm-bg overflow-hidden">
        <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] nm-flat-lg p-7 sm:p-10 lg:p-14 border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left lg:flex-row gap-8 sm:gap-10 lg:items-center lg:justify-between">
            <div className="space-y-4 max-w-2xl flex flex-col items-center sm:items-start">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nm-text-muted">Engage the founders</p>
              <h2 className="text-4xl md:text-5xl font-bold text-nm-text leading-tight">Ready to solve a real problem?</h2>
              <p className="text-lg text-nm-text-muted">Stop chasing hype. Start building solutions. Schedule a consultation with our founding team today.</p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full nm-btn-accent px-7 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-bold uppercase tracking-[0.14em] nm-flat-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(241,90,47,0.4)] active:scale-[0.98]"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
