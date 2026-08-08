import prisma from '@/lib/prisma'
import { Download, FileText, Zap, Shield, Globe, Eye } from 'lucide-react'
import MobileScrollHint from '@/components/MobileScrollHint'
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
          <Link href="/documents" className="btn-primary hero-btn">
            <FileText size={28} /> Accéder au Rapport
          </Link>
        </div>
      </header>




      
      {/* Footer */}
      <footer className="public-footer">
        <p>© {new Date().getFullYear()} DocRepo. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
