import prisma from '@/lib/prisma'
import { Download, FileText, BarChart, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div className="landing-page" style={{ scrollBehavior: 'smooth', backgroundColor: '#f8fafc', color: '#1e293b' }}>
      
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="ICRW, LAREM, Mastercard Foundation" style={{ height: '50px', objectFit: 'contain' }} />
        </div>
        <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
          Administration
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" style={{ backgroundColor: '#0F172A', color: 'white', padding: '6rem 5%', textAlign: 'left', minHeight: '65vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background Shapes for Dark Style */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', background: '#4F46E5', borderRadius: '50%', filter: 'blur(100px)', opacity: '0.3', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '30vw', height: '30vw', background: '#EC4899', borderRadius: '50%', filter: 'blur(100px)', opacity: '0.3', zIndex: 0 }}></div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', color: '#94A3B8', fontWeight: '600' }}>
            Rapport de Cartographie
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.3', textTransform: 'uppercase', background: 'linear-gradient(90deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', maxWidth: '850px' }}>
            Cartographie du Secteur Créatif<br />au Sénégal sous l'angle du genre
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#e2e8f0', maxWidth: '700px', marginBottom: '3.5rem', lineHeight: '1.6' }}>
            Comprendre et réduire les barrières de genre dans le secteur créatif africain. Une initiative du projet "Behind the Scenes".
          </p>
          <a href="#documents" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.3rem', borderRadius: '50px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: 'linear-gradient(135deg, #d9534f, #f59e0b)', color: 'white', border: 'none', fontWeight: '700', boxShadow: '0 8px 30px rgba(217, 83, 79, 0.6)', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <FileText size={28} /> Accéder au Rapport
          </a>
        </div>
      </header>

      {/* Sponsors/Partners */}
      <section style={{ backgroundColor: '#ffffff', padding: '3rem 5%', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#334155' }}>ICRW</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#334155' }}>LAREM</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#334155' }}>Mastercard Foundation</div>
        </div>
      </section>

      {/* Highlights Section */}
      <section style={{ padding: '5rem 5%', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <BookOpen size={40} color="#d9534f" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#126b5d' }}>Base Empirique</h3>
            <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>Entretiens qualitatifs, cartographie des infrastructures culturelles et analyses de statistiques nationales (ANSD).</p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <Users size={40} color="#d9534f" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#126b5d' }}>Partenaires</h3>
            <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>En partenariat avec l'International Center for Research on Women (ICRW) et financé par la Mastercard Foundation.</p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" style={{ padding: '5rem 5%', backgroundColor: '#ffffff', minHeight: '50vh', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem', borderLeft: '4px solid #126b5d', paddingLeft: '1rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#126b5d', textTransform: 'uppercase' }}>Documents & Annexes</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.5rem' }}>Téléchargez les versions PDF du rapport et des annexes.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {documents.map((doc: any) => (
              <div key={doc.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1.5rem', justifyContent: 'space-between', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <FileText size={32} color="#126b5d" />
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', color: '#1e293b' }}>{doc.name}</h3>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.mimetype.split('/')[1] || doc.mimetype}
                    </span>
                  </div>
                </div>
                <a href={`/api/download?id=${doc.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', backgroundColor: '#126b5d', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.95rem', fontWeight: '500' }}>
                  <Download size={16} /> Télécharger
                </a>
              </div>
            ))}
            {documents.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                <p style={{ color: '#64748b', fontSize: '1rem' }}>Le rapport final n'est pas encore disponible au téléchargement.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '3rem 5%', textAlign: 'center', backgroundColor: '#0f172a', color: '#94a3b8' }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>LAREM (2026). Cartographie du secteur créatif au Sénégal sous l'angle du genre.</p>
        <p style={{ fontSize: '0.8rem', color: '#475569' }}>Dakar : Laboratoire de Recherches Économiques et Monétaires, Université Cheikh Anta Diop.</p>
      </footer>
    </div>
  )
}
