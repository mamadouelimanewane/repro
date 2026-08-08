import prisma from '@/lib/prisma'
import { Download, FileText, Eye } from 'lucide-react'
import MobileScrollHint from '@/components/MobileScrollHint'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <nav className="nav-bar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/">
            <img src="/logo.png" alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />
          </Link>
        </div>
        <Link href="/" className="admin-link">
          Retour à l'accueil
        </Link>
      </nav>

      {/* Documents Section */}
      <section className="documents-section-public" style={{ padding: '4rem 5%', flex: 1 }}>
        <div className="documents-header">
          <h2>Ressources Publiques</h2>
          <p>Fichiers actuellement disponibles en libre accès.</p>
        </div>

        <div className="documents-list" style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '10px' }}>
          {documents.map((doc: any) => (
            <div key={doc.id} className="document-card-public">
              <div className="doc-info-public">
                <div className="doc-icon-wrapper">
                  <FileText size={32} color="var(--primary)" />
                </div>
                <div className="doc-text">
                  <h3>{doc.name}</h3>
                  <span>
                    {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.mimetype.split('/')[1] || doc.mimetype}
                  </span>
                </div>
              </div>
              <div className="doc-actions-public">
                {doc.url && (
                  <>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn-secondary" title="Afficher le document">
                      <Eye size={18} /> Afficher
                    </a>
                    <a href={`${doc.url}?download=1`} className="btn-primary" title="Télécharger le document">
                      <Download size={18} /> Télécharger
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
          {documents.length === 0 && (
            <div className="empty-state">
              <p>Aucun document n'a été publié pour le moment.</p>
            </div>
          )}
        </div>
        
        {/* Mobile Scroll Hint (Only shows if multiple documents exist) */}
        {documents.length > 1 && <MobileScrollHint />}
      </section>
      
      {/* Footer */}
      <footer className="public-footer">
        <p>© {new Date().getFullYear()} DocRepo. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
