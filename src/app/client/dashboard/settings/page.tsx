import { Settings, User, Shield, Bell } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      <div className="text-left">
        <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] mb-2 text-[10px]">User Preferences</h2>
        <h1 className="text-4xl md:text-5xl font-black text-nm-text leading-tight">
          System <span className="text-brand-orange">Control.</span>
        </h1>
        <p className="mt-4 text-nm-text-muted text-lg">
          Manage your account preferences and organization settings.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl nm-flat-md border border-nm-text/5 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="p-4 rounded-2xl nm-inset-sm text-brand-orange">
              <User className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-nm-text group-hover:text-brand-orange transition-colors">Profile Settings</h2>
          </div>
          <p className="text-nm-text-muted/40 text-sm font-black uppercase tracking-widest relative z-10 italic">Module initialization pending...</p>
        </div>

        <div className="rounded-3xl nm-flat-md border border-nm-text/5 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="p-4 rounded-2xl nm-inset-sm text-brand-orange">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-nm-text group-hover:text-brand-orange transition-colors">Security</h2>
          </div>
          <p className="text-nm-text-muted/40 text-sm font-black uppercase tracking-widest relative z-10 italic">Module initialization pending...</p>
        </div>

        <div className="rounded-3xl nm-flat-md border border-nm-text/5 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="p-4 rounded-2xl nm-inset-sm text-brand-orange">
              <Bell className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-nm-text group-hover:text-brand-orange transition-colors">Notifications</h2>
          </div>
          <p className="text-nm-text-muted/40 text-sm font-black uppercase tracking-widest relative z-10 italic">Module initialization pending...</p>
        </div>

        <div className="rounded-3xl nm-inset-md border-2 border-dashed border-nm-text/5 p-8 flex flex-col items-center justify-center text-center">
            <Settings className="h-10 w-10 text-nm-text/10 mb-4" />
            <h3 className="text-nm-text/20 font-bold uppercase tracking-widest text-xs italic">Advanced settings coming in v2.0</h3>
        </div>
      </div>
    </div>
  )
}
