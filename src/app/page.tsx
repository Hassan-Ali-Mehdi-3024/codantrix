import Hero from "@/components/home/Hero";
import ServiceCard from "@/components/cards/ServiceCard";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import IndustrySection from "@/components/home/IndustrySection";
import SocialProof from "@/components/home/SocialProof";
import LogoWall from "@/components/home/LogoWall";
import FeaturedTestimonials from "@/components/home/FeaturedTestimonials";
import FeaturedBlog from "@/components/home/FeaturedBlog";

export const dynamic = 'force-dynamic'

const services = [
  { name: 'AI/ML Solutions', slug: 'ai-ml-solutions', icon: 'brain', description: 'Custom machine learning for enterprise problems with ground-truth validation.' },
  { name: 'Computer Vision Models', slug: 'computer-vision', icon: 'camera', description: 'Real-time CV systems for industrial applications and precision manufacturing.' },
  { name: 'Industrial Automation', slug: 'industrial-automation', icon: 'cpu', description: 'End-to-end automation systems designed for reliability and ROI.' },
  { name: 'Web Development', slug: 'web-development', icon: 'code', description: 'Full-stack web solutions supporting complex AI backends and data flows.' },
]

const featuredCaseStudies = [
  {
    title: 'Automotive Defect Detection',
    slug: 'automotive-defect-detection',
    industry: 'Manufacturing',
    client: 'Precision Dynamics Ltd.',
    result: '80% to 97.8% defect detection improvement'
  },
  {
    title: 'Logistics Smart Sorting',
    slug: 'logistics-smart-sorting',
    industry: 'Logistics',
    client: 'FastShip Logistics',
    result: '3.5 hours to 45 minutes sorting efficiency'
  },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <SocialProof />
      <LogoWall />

      {/* Services Section */}
      <section className="relative py-24 bg-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-16 h-72 w-72 rounded-full bg-[#f15a2f] blur-[120px] opacity-25" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#f15a2f] blur-[110px] opacity-15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <h2 className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#fffdf2]/70">What We Solve</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#fffdf2] leading-tight">Enterprise-Grade AI Services</h3>
              <p className="text-base md:text-lg text-[#fffdf2]/60 max-w-2xl">End-to-end pods that ship production ML, computer vision, automation, and full-stack software with measurable ROI.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm text-[#fffdf2]/70 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-md">Delivery windows measured in weeks, not quarters.</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[minmax(280px,1fr)] gap-6">
            {services.map((service, i) => {
              const layout = [
                "lg:col-span-4 lg:row-span-1",
                "lg:col-span-8 lg:row-span-1",
                "lg:col-span-8 lg:row-span-1",
                "lg:col-span-4 lg:row-span-1",
              ][i] || "lg:col-span-6"

              return (
                <div
                  key={service.slug}
                  className={`group relative ${layout} hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/4 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-[6px] h-full shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                    <ServiceCard {...service} index={i} className="h-full" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <IndustrySection />

      {/* Case Studies Section */}
      <section className="py-24 bg-transparent border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-[#f15a2f] blur-[100px] opacity-25" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f15a2f]">Results Delivered</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#fffdf2]">Real-World Impact</h3>
              <p className="text-base md:text-lg text-[#fffdf2]/60">Proof, not promises. Production deployments with clear deltas on accuracy, throughput, and ROI.</p>
            </div>
            <a href="/case-studies" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#fffdf2] hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5">
              View All Case Studies →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCaseStudies.map((study) => (
              <div key={study.slug} className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-1 shadow-[0_18px_70px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-transform duration-300">
                <CaseStudyCard {...study} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedTestimonials />
      <FeaturedBlog />

      {/* CTA Section */}
      <section className="relative py-24 bg-transparent overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-6 rounded-[32px] border border-white/10 bg-gradient-to-br from-[#f15a2f]/25 via-transparent to-white/5 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-[#0f1113]/90 backdrop-blur-xl p-10 sm:p-14 shadow-[0_24px_90px_rgba(0,0,0,0.45)] flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between">
            <div className="space-y-4 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fffdf2]/70">Engage the founders</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#fffdf2] leading-tight">Ready to solve a real problem?</h2>
              <p className="text-lg text-[#fffdf2]/70">Stop chasing hype. Start building solutions. Schedule a consultation with our founding team today.</p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f15a2f] px-10 py-4 text-lg font-bold uppercase tracking-[0.14em] text-[#fffdf2] shadow-[0_18px_70px_rgba(241,90,47,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_90px_rgba(241,90,47,0.7)]"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
