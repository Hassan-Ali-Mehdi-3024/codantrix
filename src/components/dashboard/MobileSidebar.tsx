'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
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
  { name: 'Overview', href: '/client/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/client/dashboard/projects', icon: FolderOpen },
  { name: 'Documents', href: '/client/dashboard/documents', icon: FileText },
  { name: 'Support', href: '/client/dashboard/support', icon: LifeBuoy },
  { name: 'Settings', href: '/client/dashboard/settings', icon: Settings },
]

export default function MobileSidebar() {
  const pathname = usePathname()
  return <MobileSidebarContent key={pathname} pathname={pathname} />
}

function MobileSidebarContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-nm-bg/80 backdrop-blur-md px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-nm-text/5 nm-flat-sm">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-nm-text lg:hidden hover:text-brand-orange transition-colors"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-black uppercase tracking-[0.2em] text-nm-text">
          Intelligence <span className="text-brand-orange">Portal</span>
        </div>
        <Link href="/">
          <span className="sr-only">Your profile</span>
          <div className="h-10 w-10 nm-inset-sm rounded-full flex items-center justify-center p-2">
            <Image
              className="h-full w-full object-contain"
              src="/logo.svg"
              alt=""
              width={32}
              height={32}
            />
          </div>
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
            "fixed inset-0 bg-nm-bg/80 backdrop-blur-sm transition-opacity duration-300 ease-linear",
            open ? "opacity-100" : "opacity-0"
          )} 
          onClick={() => setOpen(false)}
        />

        {/* Sidebar panel */}
        <div 
          className={cn(
            "fixed inset-y-0 left-0 flex w-full max-w-xs transform flex-col bg-nm-bg pb-12 shadow-2xl transition duration-300 ease-in-out border-r border-nm-text/5 nm-flat-lg",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-nm-text-muted hover:text-brand-orange transition-colors"
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
                <span className="text-xl font-bold tracking-tight text-nm-text">
                  CODANTRIX <span className="text-brand-orange">LABS</span>
                </span>
              </Link>
            </div>
            
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-4">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              isActive
                                ? 'nm-inset-sm text-brand-orange'
                                : 'text-nm-text-muted hover:nm-flat-sm hover:text-nm-text',
                              'group flex gap-x-3 rounded-xl p-4 text-sm font-bold uppercase tracking-widest transition-all duration-200'
                            )}
                          >
                            <item.icon
                              className={cn(
                                isActive ? 'text-brand-orange' : 'text-nm-text-muted group-hover:text-nm-text',
                                'h-5 w-5 shrink-0'
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
                    className="group -mx-2 flex gap-x-3 rounded-xl p-4 text-sm font-bold uppercase tracking-widest text-nm-text-muted hover:nm-inset-sm hover:text-red-500 w-full text-left transition-all duration-200"
                  >
                    <LogOut
                      className="h-5 w-5 shrink-0 text-nm-text-muted group-hover:text-red-500"
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
