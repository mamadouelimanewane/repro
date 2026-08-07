import prisma from '@/lib/prisma'
import { deleteDocument } from './documentActions'
import { Eye, Trash2 } from 'lucide-react'
import UploadForm from '@/components/UploadForm'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Tableau de Bord</h1>
        <a href="/" className="btn-secondary">Retour au site</a>
      </header>

      <section className="upload-section card">
        <h2>Ajouter un document</h2>
        <p className="doc-meta" style={{ marginTop: '0.5rem' }}>Prise en charge des gros fichiers PDF (jusqu'à 150 Mo).</p>
        <UploadForm />
      </section>

      <section className="documents-section">
        <h2 style={{ marginBottom: '1.5rem' }}>Tous les Documents ({documents.length})</h2>
        <div className="documents-grid">
          {documents.map((doc: any) => (
            <div key={doc.id} className="document-card card">
              <div className="doc-info">
                <h3>{doc.name}</h3>
                <span className="doc-meta">
                  {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.mimetype}
                </span>
              </div>
              
              <div className="doc-actions">
                {doc.url && (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn-secondary" title="Afficher">
                    <Eye size={16} /> Afficher
                  </a>
                )}
                <form action={deleteDocument.bind(null, doc.id)} style={{ flex: 1 }}>
                  <button type="submit" className="btn-danger" style={{ width: '100%' }}>
                    <Trash2 size={16} /> Supprimer
                  </button>
                </form>
              </div>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="empty-state">Aucun document téléversé pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  )
}
