import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
    return (
        <section className="min-h-[80vh] flex items-center pt-32 pb-24">
            <div className="gutter">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                        <p className="eyebrow mb-8">404</p>
                        <h1 className="mb-8">This page isn&apos;t here.</h1>
                        <p className="body-lg measure mb-10 text-fg-70">
                            <Link href="/work" className="text-accent hover:opacity-80 transition-opacity">/work</Link> and{' '}
                            <Link href="/services" className="text-accent hover:opacity-80 transition-opacity">/services</Link> are.
                        </p>
                        <Link href="/book" className="btn btn-primary">
                            Book a call <ArrowRight size={16} className="arrow-nudge" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
