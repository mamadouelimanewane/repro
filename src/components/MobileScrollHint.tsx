'use client';

import { ChevronDown } from 'lucide-react';

export default function MobileScrollHint() {
  const scrollDown = () => {
    const list = document.querySelector('.documents-list');
    if (list) {
      list.scrollBy({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mobile-scroll-hint" onClick={scrollDown} style={{ cursor: 'pointer' }}>
      <ChevronDown size={28} color="var(--primary)" />
      <span>Faites défiler pour voir plus</span>
    </div>
  );
}
