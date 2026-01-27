'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  Settings, 
  LogOut, 
  LifeBuoy,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Support', href: '/dashboard/support', icon: LifeBuoy },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function MobileSidebar() {
  const pathname = usePathname()
  return <MobileSidebarContent key={pathname} pathname={pathname} />
}

function MobileSidebarContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[#0b0c0e]/80 backdrop-blur-md px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-white/10">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-[#fffdf2] lg:hidden hover:text-[#f15a2f] transition-colors"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-[#fffdf2]">
          Dashboard
        </div>
        <Link href="/">
          <span className="sr-only">Your profile</span>
          <Image
            className="h-8 w-8 rounded-full bg-white/10 p-1"
            src="/logo.svg"
            alt=""
            width={32}
            height={32}
          />
        </Link>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "relative z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className={cn(
            "fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-linear",
            open ? "opacity-100" : "opacity-0"
          )} 
          onClick={() => setOpen(false)}
        />

        {/* Sidebar panel */}
        <div 
          className={cn(
            "fixed inset-y-0 left-0 flex w-full max-w-xs transform flex-col bg-[#0b0c0e] pb-12 shadow-2xl transition duration-300 ease-in-out border-r border-white/10",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#fffdf2] hover:text-[#f15a2f] transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-5 flex-1 h-0 overflow-y-auto px-6">
            <div className="flex h-16 items-center shrink-0 mb-6">
              <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <Image src="/logo.svg" alt="Codantrix" width={32} height={32} className="h-8 w-8" />
                <span className="text-xl font-bold tracking-tight text-[#fffdf2]">
                  CODANTRIX
                </span>
              </Link>
            </div>
            
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              isActive
                                ? 'bg-[#f15a2f]/10 text-[#f15a2f]'
                                : 'text-[#fffdf2]/70 hover:bg-white/5 hover:text-[#fffdf2]',
                              'group flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 transition-all duration-200'
                            )}
                          >
                            <item.icon
                              className={cn(
                                isActive ? 'text-[#f15a2f]' : 'text-[#fffdf2]/50 group-hover:text-[#fffdf2]',
                                'h-6 w-6 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
                <li className="mt-auto">
                  <button
                    onClick={handleSignOut}
                    className="group -mx-2 flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 text-[#fffdf2]/70 hover:bg-red-500/10 hover:text-red-400 w-full text-left transition-all duration-200"
                  >
                    <LogOut
                      className="h-6 w-6 shrink-0 text-[#fffdf2]/50 group-hover:text-red-400"
                      aria-hidden="true"
                    />
                    Sign out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
