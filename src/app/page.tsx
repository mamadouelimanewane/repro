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
          <h1 className="hero-title" style={{ fontSize: '2rem', lineHeight: '1.4', marginBottom: '1.5rem', color: '#88d8c0' }}>
            Journée de dissémination<br />des résultats du projet<br />Behind the Scenes Sénégal
          </h1>
          <p className="hero-description" style={{ color: '#0d9488', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Mardi 11 août 2026, 9h30-14h00 •<br />Musée Théodore Monod d'Art africain<br />(IFAN-CAD) - Dakar
          </p>
          <p className="hero-description" style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            LAREM (FASEG/UCAD) et ISAC. Financé par la<br />Mastercard Foundation, coordonné par l'ICRW.<br />Version du 8 août 2026.
          </p>
          <Link href="/documents" className="btn-primary hero-btn" style={{ background: '#c25800', borderRadius: '0', textTransform: 'uppercase', padding: '1rem', letterSpacing: '1px', border: '1px solid #fff', width: '100%', maxWidth: '350px', display: 'flex', justifyContent: 'center', margin: '0 auto', fontSize: '1rem' }}>
            ACCEDER AUX DOCUMENTS
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
