'use client'

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
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Support', href: '/dashboard/support', icon: LifeBuoy },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white/10 bg-[#0b0c0e] px-6 pb-4">
        <div className="flex h-24 items-center shrink-0">
          <Link href="/" className="flex items-center gap-3">
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
  )
}
