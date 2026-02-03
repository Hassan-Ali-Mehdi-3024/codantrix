import { createClient } from '@/utils/supabase/server'
import { FolderOpen, Clock, Activity } from 'lucide-react'
import { Project } from '@/types/database'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false })

  return (
    <div className="space-y-12">
      <div className="text-left">
        <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] mb-2 text-[10px]">Development Pipeline</h2>
        <h1 className="text-4xl md:text-5xl font-black text-nm-text leading-tight">
          Active <span className="text-brand-orange">Pods.</span>
        </h1>
        <p className="mt-4 text-nm-text-muted text-lg">
          Track the progress and status of your active initiatives.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project: Project) => (
            <div key={project.id} className="group flex flex-col rounded-3xl nm-flat-md border border-nm-text/5 p-8 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="p-4 rounded-2xl nm-inset-sm text-brand-orange">
                  <FolderOpen className="h-6 w-6" />
                </div>
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest nm-inset-xs
                  ${project.status === 'in_progress' ? 'text-green-500 border border-green-500/20' : 
                    project.status === 'completed' ? 'text-blue-500 border border-blue-500/20' : 
                    'text-nm-text-muted border border-nm-text/10'}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-nm-text group-hover:text-brand-orange transition-colors mb-4 relative z-10">
                {project.name}
              </h3>
              <p className="text-nm-text-muted text-sm leading-relaxed line-clamp-2 mb-8 relative z-10">
                {project.description || 'No description provided.'}
              </p>

              <div className="mt-auto space-y-6 relative z-10">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-nm-text-muted/40">
                    <span>Build Progress</span>
                    <span className="text-brand-orange">{project.progress_percentage || 0}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full nm-inset-xs overflow-hidden">
                    <div 
                      className="h-full bg-brand-orange shadow-[0_0_10px_rgba(241,90,47,0.5)] transition-all duration-1000"
                      style={{ width: `${project.progress_percentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-nm-text/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-nm-text-muted/30">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Sync: {new Date(project.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-24 text-center rounded-[40px] nm-inset-md border-2 border-dashed border-nm-text/5 flex flex-col items-center justify-center">
            <div className="w-20 h-20 nm-inset-sm rounded-full flex items-center justify-center mb-8 text-nm-text/10">
              <Activity className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-nm-text/20 mb-2 tracking-tight">No active pods found</h3>
            <p className="text-nm-text/10 font-black uppercase tracking-widest text-xs">
              Project initialization required.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
