import { Settings, User, Shield, Bell } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#fffdf2]">
          Settings
        </h1>
        <p className="mt-2 text-[#fffdf2]/60">
          Manage your account preferences and organization settings.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded-lg bg-[#f15a2f]/10 text-[#f15a2f]">
              <User className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-[#fffdf2]">Profile Settings</h2>
          </div>
          <p className="text-[#fffdf2]/50 text-sm">Profile management features coming soon.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded-lg bg-[#f15a2f]/10 text-[#f15a2f]">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-[#fffdf2]">Security</h2>
          </div>
          <p className="text-[#fffdf2]/50 text-sm">Security settings coming soon.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded-lg bg-[#f15a2f]/10 text-[#f15a2f]">
              <Bell className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-[#fffdf2]">Notifications</h2>
          </div>
          <p className="text-[#fffdf2]/50 text-sm">Notification preferences coming soon.</p>
        </div>
      </div>
    </div>
  )
}
