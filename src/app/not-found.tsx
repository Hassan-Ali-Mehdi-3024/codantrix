import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
      <h2 className="text-6xl font-bold text-[#f15a2f] mb-4">404</h2>
      <h3 className="text-3xl font-bold text-[#fffdf2] mb-6">Page Not Found</h3>
      <p className="text-[#fffdf2]/70 max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#f15a2f] px-8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#fffdf2] hover:bg-[#d14925] transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
