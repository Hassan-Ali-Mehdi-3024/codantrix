import { FileText, Download, Calendar } from 'lucide-react'
import { getD1 } from '@/lib/d1'
import { getCurrentClient } from '@/lib/auth'
import { PortalDocument } from '@/types/portal'

export default async function DocumentsPage() {
  const user = await getCurrentClient()
  const db = getD1()
  const documents = (await db
    .prepare(
      `SELECT d.id, d.client_id, d.project_id, d.title, d.type, d.file_url, d.created_at,
              p.name as project_name
       FROM client_documents d
       LEFT JOIN client_projects p ON p.id = d.project_id
       WHERE d.client_id = ?
       ORDER BY d.created_at DESC`
    )
    .bind(user?.id)
    .all()).results as unknown as PortalDocument[]

  return (
    <div className="space-y-12">
      <div className="text-left">
        <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] mb-2 text-[10px]">Knowledge Base</h2>
        <h1 className="text-4xl md:text-5xl font-black text-nm-text leading-tight">
          Shared <span className="text-brand-orange">Vault.</span>
        </h1>
        <p className="mt-4 text-nm-text-muted text-lg">
          Access your project documentation, contracts, and guides.
        </p>
      </div>

      <div className="rounded-[32px] nm-flat-lg border border-nm-text/5 overflow-hidden">
        {documents && documents.length > 0 ? (
          <div className="p-4 space-y-4">
            {documents.map((doc: PortalDocument) => (
              <div key={doc.id} className="p-6 nm-flat-sm rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:nm-flat-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-orange/10 transition-colors" />
                
                <div className="flex items-start gap-6 relative z-10">
                  <div className="p-4 rounded-2xl nm-inset-sm text-brand-orange shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-nm-text group-hover:text-brand-orange transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-[10px] font-black uppercase tracking-widest text-nm-text-muted/40">
                      <span className="text-brand-orange">{doc.type.replace('_', ' ')}</span>
                      {doc.project_name && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-nm-text/20" />
                          <span>{doc.project_name}</span>
                        </>
                      )}
                      <span className="w-1 h-1 rounded-full bg-nm-text/20" />
                      <div className="flex items-center gap-1.5">
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
                  className="w-full sm:w-12 h-12 nm-inset-sm rounded-xl flex items-center justify-center text-nm-text-muted hover:text-brand-orange hover:nm-flat-sm transition-all relative z-10"
                >
                  <Download className="h-5 w-5" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-24 text-center nm-inset-md border-2 border-dashed border-nm-text/5 rounded-[32px] flex flex-col items-center justify-center">
            <div className="w-20 h-20 nm-inset-sm rounded-full flex items-center justify-center mb-8 text-nm-text/10">
              <FileText className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-nm-text/20 mb-2 tracking-tight">Vault is empty</h3>
            <p className="text-nm-text/10 font-black uppercase tracking-widest text-xs max-w-sm mx-auto">
              Documents will appear here after deployment initialization.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
