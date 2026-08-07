import prisma from '@/lib/prisma'
import { uploadDocument, generateAccess, deleteDocument } from './documentActions'
import { logoutAdmin } from './actions'
import { headers } from 'next/headers'
import QRCode from 'qrcode'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const documents = await prisma.document.findMany({
    include: { accesses: true },
    orderBy: { createdAt: 'desc' }
  })
  
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const fullHost = `${protocol}://${host}`

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Tableau de Bord Administrateur</h1>
        <form action={logoutAdmin}>
          <button type="submit" className="btn-secondary">Déconnexion</button>
        </form>
      </header>

      <section className="upload-section card">
        <h2>Ajouter un document</h2>
        <form action={uploadDocument} className="upload-form">
          <input type="file" name="file" required className="file-input" />
          <button type="submit" className="btn-primary">Téléverser</button>
        </form>
      </section>

      <section className="documents-section">
        <h2>Documents Sécurisés</h2>
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
                <form action={generateAccess.bind(null, doc.id, fullHost)}>
                  <button type="submit" className="btn-accent">Générer un Accès</button>
                </form>
                <form action={deleteDocument.bind(null, doc.id)}>
                  <button type="submit" className="btn-danger">Supprimer</button>
                </form>
              </div>

              {doc.accesses.length > 0 && (
                <div className="access-list">
                  <h4>Accès actifs :</h4>
                  <ul>
                    {doc.accesses.map((access: any) => (
                      <li key={access.id} className="access-item">
                        <span className="access-password">{access.password}</span>
                        <QRCodeImage url={`${fullHost}/?code=${access.password}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

async function QRCodeImage({ url }: { url: string }) {
  const dataUrl = await QRCode.toDataURL(url)
  return <img src={dataUrl} alt="QR Code" className="qr-code-img" />
}
