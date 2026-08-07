'use client'

import { useState } from 'react'
import { loginAdmin } from '../actions'

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await loginAdmin(formData)
    
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Administration</h1>
        <p>Veuillez entrer le mot de passe maître pour accéder au panneau d'administration.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Mot de passe" 
              required 
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn-primary">Connexion</button>
        </form>
      </div>
    </div>
  )
}
