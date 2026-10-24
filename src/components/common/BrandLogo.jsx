import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ className = '', size = 'md', showTagline = false, light = false }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-lg tracking-[0.25em]',
    lg: 'text-2xl tracking-[0.28em]',
    xl: 'text-3xl tracking-[0.3em]'
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Brand Icon SVG: Shield with sharp V, keyhole, and flowing veil waves */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Outer Shield */}
          <path
            d="M50 12 C68 12 84 18 84 32 C84 62 50 88 50 88 C50 88 16 62 16 32 C16 18 32 12 50 12 Z"
            stroke={light ? "#FFFFFF" : "#171717"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Stylized sharp V */}
          <path
            d="M30 32 L45 66 C47 70 53 70 55 66 L70 32"
            stroke={light ? "#FFFFFF" : "#171717"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central Keyhole */}
          <circle cx="50" cy="46" r="4.5" fill={light ? "#FFFFFF" : "#171717"} />
          <path
            d="M48 48 L46 58 C46 59 47 60 48.5 60 L51.5 60 C53 60 54 59 54 58 L52 48 Z"
            fill={light ? "#FFFFFF" : "#171717"}
          />
          {/* Flowing veil lines */}
          <path
            d="M22 50 C32 44 42 54 50 50 C58 46 68 56 78 50"
            stroke={light ? "#FFFFFF" : "#171717"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 2"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-bold font-sans ${textSizes[size]} ${light ? 'text-white' : 'text-neutral-900'} uppercase transition-colors`}>
          VERIVEIL
        </span>
        {showTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-medium ${light ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Prove Privately. Empower Everyone.
          </span>
        )}
      </div>
    </Link>
  );
}
