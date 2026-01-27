import Hero from "@/components/home/Hero";
import ServiceCard from "@/components/cards/ServiceCard";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import IndustrySection from "@/components/home/IndustrySection";
import SocialProof from "@/components/home/SocialProof";
import LogoWall from "@/components/home/LogoWall";
import FeaturedTestimonials from "@/components/home/FeaturedTestimonials";
import FeaturedBlog from "@/components/home/FeaturedBlog";
import Link from 'next/link';

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
      {/* <SocialProof />
      <LogoWall /> */}

      {/* Services Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-16 h-[min(60vw,18rem)] w-[min(60vw,18rem)] rounded-full bg-[#000] blur-[min(16vw,120px)] opacity-25" />
          <div className="absolute bottom-0 right-0 h-[min(56vw,16rem)] w-[min(56vw,16rem)] rounded-full bg-[#000] blur-[min(14vw,110px)] opacity-15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center justify-between mb-12 gap-6">
              <div className="space-y-3 flex flex-col items-center">
              <h2 className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">What We Solve</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#fffdf2] leading-tight">Enterprise-Grade AI Services</h3>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl">End-to-end pods that ship production ML, computer vision, automation, and full-stack software with measurable ROI.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[minmax(220px,1fr)] sm:auto-rows-[minmax(260px,1fr)] lg:auto-rows-[minmax(280px,1fr)] gap-6">
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
                  <div className="rounded-3xl glass-card p-[6px] h-full">
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
      <section className="py-16 sm:py-20 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 h-[min(44vw,10rem)] w-[min(44vw,10rem)] rounded-full bg-[#000] blur-[min(12vw,100px)] opacity-25" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="space-y-3">itmscentext
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f15a2f]">Results Delivered</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#fffdf2]">Real-World Impact</h3>
              <p className="text-base md:text-lg text-gray-400">Proof, not promises. Production deployments with clear deltas on accuracy, throughput, and ROI.</p>
            </div> max-w-2xl mx-auto
            <Link href="/case-studies" className="inline-flex items-center gap-2 rounded-full glass-btn px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#fffdf2] hover:border-white/30 hover:text-[#fffdf2] transition-all duration-300 hover:-translate-y-0.5">
              View All Case Studies →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCaseStudies.map((study) => (
              <div key={study.slug} className="group rounded-2xl glass-card p-1 hover:-translate-y-1 transition-transform duration-300">
                <CaseStudyCard {...study} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedTestimonials />
      <FeaturedBlog />

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-3 sm:inset-6 rounded-[32px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-[#0f1113]/90 backdrop-blur-xl p-7 sm:p-10 lg:p-14 shadow-[0_24px_90px_rgba(0,0,0,0.45)] flex flex-col items-center text-center sm:text-left sm:items-start lg:flex-row gap-8 sm:gap-10 lg:items-center lg:justify-between">
            <div className="space-y-4 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fffdf2]/70">Engage the founders</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#fffdf2] leading-tight">Ready to solve a real problem?</h2>
              <p className="text-lg text-[#fffdf2]/70">Stop chasing hype. Start building solutions. Schedule a consultation with our founding team today.</p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f15a2f] px-7 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-bold uppercase tracking-[0.14em] text-[#fffdf2] shadow-[0_18px_70px_rgba(241,90,47,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_90px_rgba(241,90,47,0.7)]"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
