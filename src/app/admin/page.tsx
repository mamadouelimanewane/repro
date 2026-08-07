import prisma from '@/lib/prisma'
import { uploadDocument, deleteDocument } from './documentActions'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Tableau de Bord Administrateur</h1>
      </header>

      <section className="upload-section card">
        <h2>Ajouter un document</h2>
        <form action={uploadDocument} className="upload-form">
          <input type="file" name="file" required className="file-input" />
          <button type="submit" className="btn-primary">Téléverser</button>
        </form>
      </section>

      <section className="documents-section">
        <h2>Tous les Documents</h2>
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
                <form action={deleteDocument.bind(null, doc.id)}>
                  <button type="submit" className="btn-danger">Supprimer</button>
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
