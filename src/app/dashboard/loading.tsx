import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#f15a2f]" />
      <p className="mt-4 text-sm text-[#fffdf2]/50 animate-pulse">
        Loading data...
      </p>
    </div>
  )
}
