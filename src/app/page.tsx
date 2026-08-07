'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { KeyRound, Download, ShieldCheck } from 'lucide-react'

function AccessForm() {
  const searchParams = useSearchParams()
  const codeParam = searchParams.get('code')
  const [code, setCode] = useState(codeParam || '')

  const handleDownload = () => {
    if (!code) return
    window.location.href = `/api/download?code=${code}`
  }

  return (
    <>
      <div className="input-group">
        <KeyRound className="input-icon" size={20} />
        <input 
          type="text" 
          placeholder="Code d'accès" 
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          maxLength={6}
        />
      </div>
      
      <button 
        onClick={handleDownload} 
        className="btn-primary"
        disabled={!code || code.length < 6}
      >
        <Download size={20} />
        Télécharger le document
      </button>
    </>
  )
}

export default function Home() {
  return (
    <div className="public-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="access-box glass-card">
        <div className="icon-wrapper">
          <ShieldCheck size={48} className="shield-icon" />
        </div>
        <h1>Accès Sécurisé</h1>
        <p>Entrez votre mot de passe ou scannez votre QR code pour déverrouiller le document.</p>
        
        <Suspense fallback={<div className="loading">Chargement...</div>}>
          <AccessForm />
        </Suspense>
      </div>
    </div>
  )
}
