import prisma from '@/lib/prisma'
import { Download, FileText, Zap, Shield, Globe, Eye, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div className="landing-page">
      
      {/* Navigation */}
      <nav className="nav-bar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="ICRW, LAREM, Mastercard Foundation" style={{ height: '50px', objectFit: 'contain' }} />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        {/* Animated Background Shapes for Dark Style */}
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>

        <div className="hero-content">
          <div className="hero-subtitle">
            Rapport de Cartographie
          </div>
          <h1 className="hero-title">
            Cartographie du Secteur Créatif<br />au Sénégal sous l'angle du genre
          </h1>
          <p className="hero-description">
            Comprendre et réduire les barrières de genre dans le secteur créatif africain. Une initiative du projet "Behind the Scenes".
          </p>
          <a href="#documents" className="btn-primary hero-btn">
            <FileText size={28} /> Accéder au Rapport
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card card">
            <Zap size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3>Ultra-Rapide</h3>
            <p>Téléchargement instantané des documents propulsé par l'infrastructure Cloud Edge de Vercel.</p>
          </div>
          <div className="feature-card card">
            <Shield size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3>Fiable</h3>
            <p>Toutes les données sont stockées de manière résiliente et hautement disponible grâce à PostgreSQL.</p>
          </div>
          <div className="feature-card card">
            <Globe size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3>Accessible</h3>
            <p>Consultez et téléchargez vos documents depuis n'importe où, sur PC, tablette ou smartphone.</p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" className="documents-section-public">
        <div className="documents-header">
          <h2>Ressources Publiques</h2>
          <p>Fichiers actuellement disponibles en libre accès.</p>
        </div>

        <div className="documents-list" style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
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
        {documents.length > 1 && (
          <div className="mobile-scroll-hint">
            <ChevronDown size={28} color="var(--primary)" />
            <span>Faites défiler pour voir plus</span>
          </div>
        )}
      </section>
      
      {/* Footer */}
      <footer className="public-footer">
        <p>© {new Date().getFullYear()} DocRepo. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
