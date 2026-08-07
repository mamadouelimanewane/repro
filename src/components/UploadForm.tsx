'use client';

import { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client';
import { useRouter } from 'next/navigation';
import { saveDocumentToDb } from '@/app/admin/documentActions';

export default function UploadForm() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // Direct client upload bypasses the 4.5MB Vercel server limit
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      
      // Once uploaded to Blob, save the metadata in our database
      await saveDocumentToDb({
        name: file.name,
        url: blob.url,
        mimetype: file.type,
        size: file.size
      });

      inputFileRef.current.value = '';
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'upload. Le fichier est peut-être trop lourd ou Vercel Blob n'est pas configuré.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="upload-form">
      <input type="file" ref={inputFileRef} required className="file-input" />
      <button type="submit" className="btn-primary" disabled={uploading} style={{ opacity: uploading ? 0.7 : 1 }}>
        {uploading ? 'Envoi en cours...' : 'Téléverser'}
      </button>
    </form>
  );
}
