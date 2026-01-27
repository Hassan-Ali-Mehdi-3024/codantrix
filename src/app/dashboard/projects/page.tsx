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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#fffdf2]">
          Projects
        </h1>
        <p className="mt-2 text-[#fffdf2]/60">
          Track the progress and status of your active initiatives.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project: Project) => (
            <div key={project.id} className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-[#f15a2f]/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#f15a2f]/10 text-[#f15a2f]">
                  <FolderOpen className="h-6 w-6" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider
                  ${project.status === 'in_progress' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                    project.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                    'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#fffdf2] group-hover:text-[#f15a2f] transition-colors">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-[#fffdf2]/60 line-clamp-2">
                {project.description || 'No description provided.'}
              </p>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#fffdf2]/50">
                    <span>Progress</span>
                    <span>{project.progress_percentage || 0}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#f15a2f] to-[#ff8a5c] transition-all duration-1000"
                      style={{ width: `${project.progress_percentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-sm text-[#fffdf2]/40">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-16 text-center rounded-2xl border border-white/10 bg-white/5 border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <Activity className="h-8 w-8 text-[#fffdf2]/20" />
            </div>
            <h3 className="text-lg font-medium text-[#fffdf2]">No projects found</h3>
            <p className="mt-2 text-[#fffdf2]/50">
              Your active projects will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
