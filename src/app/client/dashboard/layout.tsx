import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import MobileSidebar from '@/components/dashboard/MobileSidebar'
import { getCurrentClient } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentClient()
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-nm-bg">
      <Sidebar />
      <MobileSidebar />
      <main className="lg:pl-72 py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
