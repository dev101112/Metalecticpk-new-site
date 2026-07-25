import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const AlphaAmpereLogo: React.FC<LogoProps> = ({ size = 48, className = "", ...props }) => {
  return (
    <svg
      width={size}
      height={size * 0.82}
      viewBox="0 0 1000 820"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300`}
      {...props}
    >
      {/* Outer Stylized "A" Triangle */}
      <path
        d="M375 0H430L565 240L635 110L420 110H375V0Z"
        fill="white"
      />
      <path
        d="M375 0L85 530H270L360 375L310 280H195L375 0Z"
        fill="white"
      />
      <path
        d="M375 820L535 530H85L375 820Z"
        fill="white"
      />
      <path
        d="M375 820H570L460 620L375 820Z"
        fill="white"
      />
      <path
        d="M600 820H520L610 655L690 820H600Z"
        fill="white"
      />

      {/* Futuristic "A" Inner Structure */}
      <path
        d="M375 220L210 510H540L375 220ZM375 320L450 450H300L375 320Z"
        fill="#111"
      />

      {/* Slanted battery status structure and lightning bolt */}
      <g transform="translate(480, 50) scale(0.9)">
        {/* Slanted Speed lines flying up-left */}
        <line x1="100" y1="120" x2="250" y2="20" stroke="white" strokeWidth="16" strokeLinecap="round" strokeDasharray="50 30" />
        <line x1="140" y1="160" x2="290" y2="60" stroke="white" strokeWidth="16" strokeLinecap="round" strokeDasharray="40 20" />
        <line x1="180" y1="200" x2="330" y2="100" stroke="white" strokeWidth="16" strokeLinecap="round" strokeDasharray="60 30" />

        {/* Battery Container Body (slanted) */}
        <rect
          x="120"
          y="250"
          width="130"
          height="320"
          rx="25"
          transform="rotate(-30 185 410)"
          stroke="white"
          strokeWidth="24"
          fill="#111"
        />
        {/* Battery positive terminal cap */}
        <rect
          x="155"
          y="215"
          width="60"
          height="30"
          rx="8"
          transform="rotate(-30 185 410)"
          fill="white"
        />

        {/* 3 Battery status green bars */}
        <rect
          x="138"
          y="490"
          width="94"
          height="55"
          rx="10"
          transform="rotate(-30 185 410)"
          fill="#10B981"
        />
        <rect
          x="138"
          y="420"
          width="94"
          height="55"
          rx="10"
          transform="rotate(-30 185 410)"
          fill="#10B981"
        />
        <rect
          x="138"
          y="350"
          width="94"
          height="55"
          rx="10"
          transform="rotate(-30 185 410)"
          fill="#10B981"
        />

        {/* Bold Red Lightning Bolt overlying the battery */}
        <polygon
          points="200,320 380,300 220,440 330,440 120,580 200,430 120,430"
          fill="#EF4444"
          stroke="white"
          strokeWidth="8"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const MetalectricLogo: React.FC<LogoProps> = ({ size = 48, className = "", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300`}
      {...props}
    >
      {/* Cog (Gear) outer background with segments */}
      <circle cx="250" cy="250" r="180" stroke="#BFC5C9" strokeWidth="12" fill="#0A0A0A" />

      {/* Cog Teeth (Golden Gear) */}
      <g stroke="#F6B91E" strokeWidth="24" strokeLinecap="square">
        <line x1="250" y1="40" x2="250" y2="70" />
        <line x1="250" y1="430" x2="250" y2="460" />
        <line x1="40" y1="250" x2="70" y2="250" />
        <line x1="430" y1="250" x2="460" y2="250" />

        <line x1="101" y1="101" x2="122" y2="122" />
        <line x1="378" y1="378" x2="399" y2="399" />
        <line x1="101" y1="398" x2="122" y2="377" />
        <line x1="378" y1="102" x2="399" y2="123" />
      </g>

      {/* Custom inner M & E characters */}
      <path
        d="M140 260 L180 160 L220 230 L260 160 L300 260"
        stroke="#BFC5C9"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Letter 'E' horizontal bars on right */}
      <line x1="300" y1="165" x2="370" y2="165" stroke="#BFC5C9" strokeWidth="24" strokeLinecap="round" />
      <line x1="300" y1="212" x2="360" y2="212" stroke="#BFC5C9" strokeWidth="24" strokeLinecap="round" />
      <line x1="300" y1="260" x2="370" y2="260" stroke="#BFC5C9" strokeWidth="24" strokeLinecap="round" />

      {/* Lightning Bolt cutting through the gear core */}
      <polygon
        points="220,135 320,205 260,205 330,285 240,285 280,365 200,245 250,245"
        fill="#F6B91E"
        stroke="#0A0A0A"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
};
