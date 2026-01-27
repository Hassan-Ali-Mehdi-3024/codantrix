import { createClient } from '@/utils/supabase/server'
import { FileText, Download, Calendar } from 'lucide-react'

type DocumentRow = {
  id: string
  title: string
  type: string
  created_at: string
  file_url: string
  projects?: { name?: string | null } | null
}

export default async function DocumentsPage() {
  const supabase = await createClient()
  const { data: documents } = await supabase
    .from('documents')
    .select('*, projects(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#fffdf2]">
            Documents
          </h1>
          <p className="mt-2 text-[#fffdf2]/60">
            Access your project documentation, contracts, and guides.
          </p>
        </div>
        {/* Upload button could go here for admins */}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        {documents && documents.length > 0 ? (
          <div className="divide-y divide-white/10">
            {documents.map((doc: DocumentRow) => (
              <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#f15a2f]/10 text-[#f15a2f]">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#fffdf2] group-hover:text-[#f15a2f] transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-[#fffdf2]/50">
                      <span>{doc.type.replace('_', ' ')}</span>
                      {doc.projects?.name && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#fffdf2]/20" />
                          <span>{doc.projects.name}</span>
                        </>
                      )}
                      <span className="w-1 h-1 rounded-full bg-[#fffdf2]/20" />
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(doc.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/10 text-[#fffdf2]/70 hover:text-[#f15a2f] hover:border-[#f15a2f]/50 transition-all"
                >
                  <Download className="h-5 w-5" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <FileText className="h-8 w-8 text-[#fffdf2]/20" />
            </div>
            <h3 className="text-lg font-medium text-[#fffdf2]">No documents found</h3>
            <p className="mt-2 text-[#fffdf2]/50 max-w-sm mx-auto">
              Documents related to your projects will appear here once they are uploaded by the team.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
