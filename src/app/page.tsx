import prisma from '@/lib/prisma'
import { Download, FileText, ChevronRight, Zap, Shield, Globe } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div className="landing-page" style={{ scrollBehavior: 'smooth' }}>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 5%', position: 'absolute', width: '100%', top: 0, zIndex: 10 }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white', letterSpacing: '1px' }}>DocRepo</div>
        <Link href="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)' }}>
          Administration
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 5%' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '800', marginBottom: '1.5rem', background: 'linear-gradient(90deg, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', maxWidth: '800px', lineHeight: '1.1' }}>
          Partagez vos documents en toute simplicité.
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '600px', marginBottom: '3rem', lineHeight: '1.6' }}>
          Une plateforme moderne et épurée pour héberger et distribuer vos ressources publiques à travers le monde, propulsée par le Cloud Edge.
        </p>
        <a href="#documents" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)' }}>
          Parcourir les fichiers <ChevronRight size={20} />
        </a>
      </header>

      {/* Features Section */}
      <section style={{ padding: '5rem 5%', background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card feature-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', borderRadius: '24px' }}>
            <Zap size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>Ultra-Rapide</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>Téléchargement instantané des documents propulsé par l'infrastructure Cloud Edge de Vercel.</p>
          </div>
          <div className="glass-card feature-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', borderRadius: '24px' }}>
            <Shield size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>Fiable</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>Toutes les données sont stockées de manière résiliente et hautement disponible grâce à PostgreSQL.</p>
          </div>
          <div className="glass-card feature-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', borderRadius: '24px' }}>
            <Globe size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>Accessible</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>Consultez et téléchargez vos documents depuis n'importe où, sur PC, tablette ou smartphone.</p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" style={{ padding: '8rem 5%', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Ressources Publiques</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Fichiers actuellement disponibles en libre accès.</p>
        </div>

        <div className="documents-grid" style={{ gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '800px', width: '100%' }}>
          {documents.map((doc: any) => (
            <div key={doc.id} className="document-card glass-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1.5rem', justifyContent: 'space-between', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.3s ease, background 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '1rem', borderRadius: '16px' }}>
                  <FileText size={32} color="var(--primary)" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.2rem', color: 'white' }}>{doc.name}</h3>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.mimetype.split('/')[1] || doc.mimetype}
                  </span>
                </div>
              </div>
              <a href={`/api/download?id=${doc.id}`} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto', padding: '0.8rem 1.5rem', textDecoration: 'none', borderRadius: '12px', fontWeight: '500' }}>
                <Download size={18} /> Obtenir
              </a>
            </div>
          ))}
          {documents.length === 0 && (
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Aucun document n'a été publié pour le moment.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '3rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>© {new Date().getFullYear()} DocRepo. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
