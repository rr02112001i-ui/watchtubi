// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-86de7564f0d140120321e01f1b012aef');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/86de7564f0d140120321e01f1b012aef/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/4c/a4/bb/4ca4bb1e651f0a08c1b6e8cf53a636d1.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="7dbff60b76111bb4a46f5e9f7a0dbd02"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/7d/bf/f6/7dbff60b76111bb4a46f5e9f7a0dbd02.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}