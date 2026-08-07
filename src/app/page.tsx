import prisma from '@/lib/prisma'
import { Download, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div className="public-container" style={{ alignItems: 'flex-start', paddingTop: '4rem' }}>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="access-box glass-card" style={{ maxWidth: '800px', width: '100%' }}>
        <h1 style={{ marginBottom: '2rem' }}>Dépôt de Documents</h1>
        <p style={{ marginBottom: '2rem' }}>Liste des documents publics disponibles au téléchargement.</p>
        
        <div className="documents-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
          {documents.map((doc: any) => (
            <div key={doc.id} className="document-card card" style={{ flexDirection: 'row', alignItems: 'center', padding: '1rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FileText size={32} color="var(--primary)" />
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{doc.name}</h3>
                  <span className="doc-meta">
                    {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.mimetype}
                  </span>
                </div>
              </div>
              <a href={`/api/download?id=${doc.id}`} className="btn-primary" style={{ width: 'auto', padding: '0.8rem 1.5rem', textDecoration: 'none' }}>
                <Download size={18} /> Télécharger
              </a>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="empty-state">Aucun document disponible pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  )
}
