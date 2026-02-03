import Link from 'next/link'
import { Activity, Clock, FileText, CheckCircle2 } from 'lucide-react'
import type { ComponentType } from 'react'
import { getD1 } from '@/lib/d1'
import { getCurrentClient } from '@/lib/auth'
import { PortalProject } from '@/types/portal'

// Mock components since we might not have shadcn/ui configured yet
function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: ComponentType<{ className?: string }>, trend: string }) {
  return (
    <div className="rounded-2xl nm-flat-md border border-nm-text/5 p-6 transition-all hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-nm-text-muted">{title}</h3>
        <div className="w-8 h-8 nm-inset-sm rounded-lg flex items-center justify-center text-brand-orange">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div>
        <div className="text-3xl font-black text-nm-text italic">{value}</div>
        <p className="text-[10px] font-bold text-brand-orange mt-1 uppercase tracking-wider">{trend}</p>
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const user = await getCurrentClient()
  const db = getD1()
  const projects = (await db
    .prepare(
      'SELECT id, client_id, name, description, status, progress_percentage, created_at, updated_at FROM client_projects WHERE client_id = ? ORDER BY updated_at DESC LIMIT 5'
    )
    .bind(user?.id)
    .all()).results as unknown as PortalProject[]

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-left">
          <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] mb-2 text-[10px]">Client Intelligence</h2>
          <h1 className="text-4xl md:text-5xl font-black text-nm-text leading-tight">
            Welcome, <span className="text-brand-orange">{user?.email?.split('@')[0]}</span>
          </h1>
          <p className="mt-4 text-nm-text-muted text-lg">
            Real-time telemetry and project status.
          </p>
        </div>
        <Link href="/client/dashboard/projects" className="nm-btn-accent px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:scale-105 transition-all">
          Create Project +
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Pods"
          value={projects?.length || "0"}
          icon={Activity}
          trend="+1 from last month"
        />
        <StatCard
          title="Repo Docs"
          value="12"
          icon={FileText}
          trend="3 new this week"
        />
        <StatCard
          title="Inference Hrs"
          value="164"
          icon={Clock}
          trend="Project Alpha"
        />
        <StatCard
          title="Uptime Rate"
          value="99.8%"
          icon={CheckCircle2}
          trend="Industrial Grade"
        />
      </div>

      {/* Recent Projects */}
      <div className="rounded-3xl nm-flat-lg border border-nm-text/5 overflow-hidden">
        <div className="p-8 border-b border-nm-text/5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-nm-text uppercase tracking-tight">Active Deployments</h3>
          <Link href="/client/dashboard/projects" className="text-brand-orange text-[10px] font-black uppercase tracking-widest hover:text-nm-text transition-colors">View All</Link>
        </div>
        <div className="p-4">
           {projects && projects.length > 0 ? (
             <div className="space-y-4">
               {projects.map((project: PortalProject) => (
                 <div key={project.id} className="p-6 nm-flat-sm rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:nm-flat-md transition-all group">
                    <div>
                      <h4 className="font-bold text-nm-text text-lg group-hover:text-brand-orange transition-colors">{project.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-nm-text-muted">{project.status}</p>
                      </div>
                    </div>
                    <div className="text-[10px] font-black text-nm-text/20 uppercase tracking-widest">
                      Last Sync: {new Date(project.updated_at).toLocaleDateString()}
                    </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="p-20 text-center nm-inset-xs rounded-2xl border-2 border-dashed border-nm-text/5 flex flex-col items-center justify-center">
                <div className="w-16 h-16 nm-inset-sm rounded-full flex items-center justify-center text-nm-text/10 mb-6">
                  <Activity size={32} />
                </div>
               <p className="text-nm-text/20 font-bold uppercase tracking-widest text-sm italic">No active deployments found.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}
