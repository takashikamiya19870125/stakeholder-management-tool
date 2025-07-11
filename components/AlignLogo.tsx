'use client'

  interface AlignLogoProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
  }

  export default function AlignLogo({ size = 'md', className = '' }: AlignLogoProps) {
    const dimensions = {
      sm: { width: 80, height: 32, fontSize: 'text-lg' },
      md: { width: 120, height: 48, fontSize: 'text-2xl' },
      lg: { width: 160, height: 64, fontSize: 'text-3xl' },
    }

    const { width, height, fontSize } = dimensions[size]

    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {/* ALIGN Logo SVG */}
        <svg
          width={width * 0.4}
          height={height * 0.8}
          viewBox="0 0 100 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Light Blue Circle */}
          <circle
            cx="35"
            cy="30"
            r="25"
            fill="#7DD3FC"
            opacity="0.8"
          />
          {/* Dark Blue Circle */}
          <circle
            cx="65"
            cy="30"
            r="25"
            fill="#2563EB"
            opacity="0.9"
          />
          {/* Intersection (Darker Blue) */}
          <path
            d="M50 5 C 65 5, 80 17, 80 30 C 80 43, 65 55, 50 55 C 35 55, 20 43, 20 30 C 20 17, 35 5, 50 5 Z"
            fill="#1E40AF"
            opacity="0.9"
          />
        </svg>

        {/* ALIGN Text */}
        <div className={`font-bold text-gray-800 ${fontSize} tracking-wide`}>
          ALIGN
        </div>
      </div>
    )
  }
