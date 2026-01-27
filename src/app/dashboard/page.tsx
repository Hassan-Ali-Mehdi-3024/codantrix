import { createClient } from '@/utils/supabase/server'
import { Activity, Clock, FileText, CheckCircle2 } from 'lucide-react'
import { Project } from '@/types/database'
import type { ComponentType } from 'react'

// Mock components since we might not have shadcn/ui configured yet
function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: ComponentType<{ className?: string }>, trend: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#fffdf2]/70">{title}</h3>
        <Icon className="h-4 w-4 text-[#f15a2f]" />
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-[#fffdf2]">{value}</div>
        <p className="text-xs text-[#fffdf2]/50 mt-1">{trend}</p>
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch projects (placeholder for now until we have real data)
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#fffdf2]">
          Welcome back, {user?.email?.split('@')[0]}
        </h1>
        <p className="mt-2 text-[#fffdf2]/60">
          Here&apos;s an overview of your active projects and recent activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={projects?.length || "0"}
          icon={Activity}
          trend="+1 from last month"
        />
        <StatCard
          title="Documents"
          value="12"
          icon={FileText}
          trend="3 new this week"
        />
        <StatCard
          title="Hours Logged"
          value="164"
          icon={Clock}
          trend="Project Alpha"
        />
        <StatCard
          title="Tasks Completed"
          value="85%"
          icon={CheckCircle2}
          trend="On track"
        />
      </div>

      {/* Recent Projects */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-[#fffdf2]">Recent Projects</h3>
        </div>
        <div className="p-0">
           {projects && projects.length > 0 ? (
             <div className="divide-y divide-white/10">
               {projects.map((project: Project) => (
                 <div key={project.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div>
                      <h4 className="font-medium text-[#fffdf2]">{project.name}</h4>
                      <p className="text-sm text-[#fffdf2]/60">{project.status}</p>
                    </div>
                    <div className="text-sm text-[#fffdf2]/40">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="p-12 text-center text-[#fffdf2]/40">
               No active projects found.
             </div>
           )}
        </div>
      </div>
    </div>
  )
}
