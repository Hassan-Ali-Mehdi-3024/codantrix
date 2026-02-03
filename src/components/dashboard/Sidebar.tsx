'use client'

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
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Overview', href: '/client/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/client/dashboard/projects', icon: FolderOpen },
  { name: 'Documents', href: '/client/dashboard/documents', icon: FileText },
  { name: 'Support', href: '/client/dashboard/support', icon: LifeBuoy },
  { name: 'Settings', href: '/client/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-nm-text/5 bg-nm-bg px-6 pb-4 nm-flat-sm">
        <div className="flex h-24 items-center shrink-0">
          <Link href="/" className="flex items-center gap-3">
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
  )
}
