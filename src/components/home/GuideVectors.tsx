import type { FC, SVGProps } from "react";

type VectorProps = SVGProps<SVGSVGElement>;

/** 1. B2B Research: Radar target crosshairs with data points */
export const B2bResearchVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    {/* Grid Background */}
    <rect width="320" height="140" fill="url(#grid-fade)" />
    <circle cx="160" cy="70" r="60" stroke="#3b82f6" strokeOpacity="0.25" strokeDasharray="3 3" />
    <circle cx="160" cy="70" r="42" stroke="#3b82f6" strokeOpacity="0.35" />
    <circle cx="160" cy="70" r="22" stroke="#3b82f6" strokeOpacity="0.5" />
    <circle cx="160" cy="70" r="70" fill="url(#radar-glow)" />

    {/* Crosshairs */}
    <line x1="80" y1="70" x2="240" y2="70" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
    <line
      x1="160"
      y1="10"
      x2="160"
      y2="130"
      stroke="#3b82f6"
      strokeOpacity="0.3"
      strokeWidth="1.5"
    />

    {/* Center Target Point */}
    <circle cx="160" cy="70" r="4" fill="#60a5fa" />
    <circle cx="160" cy="70" r="8" stroke="#93c5fd" strokeOpacity="0.8" strokeWidth="1.5" />

    {/* Detected Prospect Blips */}
    <circle cx="188" cy="46" r="3.5" fill="#38bdf8" />
    <circle cx="188" cy="46" r="7" stroke="#38bdf8" strokeOpacity="0.4" />
    <circle cx="132" cy="85" r="3" fill="#60a5fa" />
    <circle cx="205" cy="88" r="2.5" fill="#93c5fd" />

    {/* Coordinate HUD tag */}
    <rect
      x="210"
      y="24"
      width="90"
      height="22"
      rx="4"
      fill="#0f172a"
      fillOpacity="0.8"
      stroke="#3b82f6"
      strokeOpacity="0.4"
    />
    <text x="218" y="38" fill="#93c5fd" fontSize="9" fontFamily="monospace" fontWeight="600">
      BUYING SIGNAL: 98%
    </text>
  </svg>
);

/** 2. LinkedIn: Official-style LinkedIn node with conversational bubbles */
export const LinkedinVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="li-bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="140" fill="url(#li-bg)" />

    {/* Central LinkedIn Badge */}
    <g transform="translate(136, 32)">
      <rect width="48" height="48" rx="10" fill="#0284c7" />
      <path
        d="M20 18a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM15 23h5v14h-5V23zm9 0h4.8v2h.1c.7-1.3 2.3-2.6 4.8-2.6 5.1 0 6.1 3.4 6.1 7.8V37h-5v-7.8c0-1.9 0-4.3-2.6-4.3s-3 2-3 4.1V37h-5.2V23z"
        fill="#ffffff"
      />
    </g>

    {/* Incoming message bubble (left) */}
    <g transform="translate(30, 48)">
      <rect
        width="88"
        height="34"
        rx="8"
        fill="#0f172a"
        fillOpacity="0.85"
        stroke="#0284c7"
        strokeOpacity="0.4"
      />
      <circle cx="16" cy="17" r="6" fill="#38bdf8" />
      <line
        x1="28"
        y1="14"
        x2="72"
        y2="14"
        stroke="#e2e8f0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="21"
        x2="58"
        y2="21"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>

    {/* High-reply response bubble (right) */}
    <g transform="translate(202, 58)">
      <rect
        width="94"
        height="36"
        rx="8"
        fill="#0284c7"
        fillOpacity="0.9"
        stroke="#38bdf8"
        strokeOpacity="0.6"
      />
      <line
        x1="16"
        y1="15"
        x2="76"
        y2="15"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="23"
        x2="56"
        y2="23"
        stroke="#e0f2fe"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>

    {/* Connecting conversation dotted line */}
    <path d="M118 65 Q 136 78 140 80" stroke="#38bdf8" strokeOpacity="0.5" strokeDasharray="3 3" />
    <path d="M184 65 Q 194 70 202 76" stroke="#38bdf8" strokeOpacity="0.5" strokeDasharray="3 3" />
  </svg>
);

/** 3. SaaS Growth: Upward trending chart curve with launch metrics */
export const SaasGrowthVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
      </linearGradient>
    </defs>
    {/* Grid bars */}
    <line x1="40" y1="120" x2="280" y2="120" stroke="#6366f1" strokeOpacity="0.2" />
    <line
      x1="40"
      y1="90"
      x2="280"
      y2="90"
      stroke="#6366f1"
      strokeOpacity="0.15"
      strokeDasharray="4 4"
    />
    <line
      x1="40"
      y1="60"
      x2="280"
      y2="60"
      stroke="#6366f1"
      strokeOpacity="0.15"
      strokeDasharray="4 4"
    />
    <line
      x1="40"
      y1="30"
      x2="280"
      y2="30"
      stroke="#6366f1"
      strokeOpacity="0.1"
      strokeDasharray="4 4"
    />

    {/* Area fill */}
    <path
      d="M40 115 Q 100 110, 140 85 T 220 50 T 270 24 L 270 120 L 40 120 Z"
      fill="url(#growth-fill)"
    />

    {/* Chart curve */}
    <path
      d="M40 115 Q 100 110, 140 85 T 220 50 T 270 24"
      stroke="#818cf8"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Peak glow node */}
    <circle cx="270" cy="24" r="5" fill="#a5b4fc" />
    <circle cx="270" cy="24" r="10" stroke="#818cf8" strokeOpacity="0.5" strokeWidth="1.5" />

    {/* Pill tag: +340% MRR */}
    <g transform="translate(180, 16)">
      <rect width="78" height="22" rx="11" fill="#4338ca" stroke="#818cf8" strokeOpacity="0.6" />
      <text x="12" y="15" fill="#e0e7ff" fontSize="10" fontWeight="700" fontFamily="sans-serif">
        ↗ +340% MRR
      </text>
    </g>
  </svg>
);

/** 4. Outbound Systems: Modular sequence conveyor with checkmarks */
export const OutboundSystemsVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="sys-bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#059669" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="140" fill="url(#sys-bg)" />

    {/* Step 1 Node */}
    <g transform="translate(30, 48)">
      <rect width="64" height="44" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="32" y="24" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700">
        SOURCE
      </text>
      <text x="32" y="36" textAnchor="middle" fill="#a7f3d0" fontSize="8">
        Apollo/Clay
      </text>
    </g>

    {/* Arrow 1 */}
    <path d="M100 70 L 126 70" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
    <polygon points="126,67 132,70 126,73" fill="#10b981" />

    {/* Step 2 Node */}
    <g transform="translate(132, 48)">
      <rect width="66" height="44" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="33" y="24" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700">
        VERIFY
      </text>
      <text x="33" y="36" textAnchor="middle" fill="#a7f3d0" fontSize="8">
        0% Bounce
      </text>
    </g>

    {/* Arrow 2 */}
    <path d="M204 70 L 230 70" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
    <polygon points="230,67 236,70 230,73" fill="#10b981" />

    {/* Step 3 Node */}
    <g transform="translate(236, 48)">
      <rect width="60" height="44" rx="8" fill="#047857" stroke="#34d399" strokeWidth="2" />
      <text x="30" y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">
        SCALE
      </text>
      <text x="30" y="36" textAnchor="middle" fill="#d1fae5" fontSize="8">
        Book Calls
      </text>
    </g>
  </svg>
);

/** 5. Search Intent: Search bar UI with keyword ranking graphs */
export const SearchIntentVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="search-bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#9333ea" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="140" fill="url(#search-bg)" />

    {/* Search Input Card */}
    <g transform="translate(40, 28)">
      <rect width="240" height="38" rx="19" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
      <circle cx="22" cy="19" r="6" stroke="#c084fc" strokeWidth="1.5" />
      <line x1="26" y1="23" x2="31" y2="28" stroke="#c084fc" strokeWidth="1.5" />
      <text x="40" y="23" fill="#e9d5ff" fontSize="11" fontFamily="sans-serif" fontWeight="500">
        high intent b2b buyers
      </text>
      <rect x="195" y="10" width="36" height="18" rx="9" fill="#9333ea" />
      <text x="213" y="23" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">
        SEO
      </text>
    </g>

    {/* Ranking positions */}
    <g transform="translate(60, 82)">
      <rect x="0" y="16" width="40" height="24" rx="4" fill="#a855f7" fillOpacity="0.3" />
      <text x="20" y="32" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="700">
        #1 Pos
      </text>

      <rect x="52" y="6" width="40" height="34" rx="4" fill="#9333ea" fillOpacity="0.5" />
      <text x="72" y="26" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="700">
        Vol
      </text>
      <text x="72" y="36" textAnchor="middle" fill="#d8b4fe" fontSize="8">
        12.5k
      </text>

      <rect
        x="104"
        y="0"
        width="48"
        height="40"
        rx="4"
        fill="#7e22ce"
        stroke="#c084fc"
        strokeWidth="1.5"
      />
      <text x="128" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">
        CTR
      </text>
      <text x="128" y="34" textAnchor="middle" fill="#f3e8ff" fontSize="9">
        38.4%
      </text>

      {/* Mini Trend Line */}
      <path d="M164 30 Q 180 18, 195 24 T 225 10" stroke="#c084fc" strokeWidth="2.5" fill="none" />
      <circle cx="225" cy="10" r="3.5" fill="#f3e8ff" />
    </g>
  </svg>
);

/** 6. Cold Email: Floating envelope with 99% deliverability shield */
export const ColdEmailVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="mail-bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e11d48" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#be123c" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="140" fill="url(#mail-bg)" />

    {/* Envelope Main */}
    <g transform="translate(100, 32)">
      <rect width="120" height="74" rx="10" fill="#1c1917" stroke="#f43f5e" strokeWidth="1.5" />
      <path
        d="M0 10 L 60 48 L 120 10"
        stroke="#f43f5e"
        strokeWidth="1.5"
        fill="#e11d48"
        fillOpacity="0.15"
      />

      {/* Verified Shield Badge on Top Right */}
      <g transform="translate(90, -10)">
        <circle cx="16" cy="16" r="14" fill="#e11d48" stroke="#ffe4e6" strokeWidth="1.5" />
        <path
          d="M10 16 L 14 20 L 22 12"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Sequence Line Preview */}
      <line
        x1="20"
        y1="36"
        x2="70"
        y2="36"
        stroke="#fb7185"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="46"
        x2="90"
        y2="46"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="54"
        x2="55"
        y2="54"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>

    {/* Flight Lines Left */}
    <path
      d="M40 70 Q 70 65, 95 72"
      stroke="#f43f5e"
      strokeOpacity="0.4"
      strokeWidth="2"
      strokeDasharray="3 3"
    />
    <path
      d="M50 82 Q 75 78, 95 82"
      stroke="#f43f5e"
      strokeOpacity="0.3"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
  </svg>
);

/** 7. List Building: Spreadsheet database table with zero-bounce checkmarks */
export const ListBuildingVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="list-bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#d97706" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#b45309" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="140" fill="url(#list-bg)" />

    {/* Table Container */}
    <g transform="translate(36, 22)">
      <rect width="248" height="96" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
      {/* Header Row */}
      <rect width="248" height="24" rx="8" fill="#27272a" />
      <text x="14" y="16" fill="#fbbf24" fontSize="9" fontWeight="700" fontFamily="sans-serif">
        PROSPECT
      </text>
      <text x="88" y="16" fill="#fbbf24" fontSize="9" fontWeight="700" fontFamily="sans-serif">
        COMPANY
      </text>
      <text x="160" y="16" fill="#fbbf24" fontSize="9" fontWeight="700" fontFamily="sans-serif">
        STATUS
      </text>

      {/* Row 1 */}
      <line x1="0" y1="48" x2="248" y2="48" stroke="#3f3f46" strokeWidth="1" />
      <circle cx="20" cy="36" r="6" fill="#3b82f6" />
      <text x="32" y="39" fill="#f4f4f5" fontSize="9" fontWeight="500">
        Alex Vance
      </text>
      <text x="88" y="39" fill="#a1a1aa" fontSize="9">
        CloudMetric
      </text>
      <rect x="160" y="28" width="60" height="16" rx="8" fill="#065f46" />
      <text x="190" y="40" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="700">
        ✓ 100% VALID
      </text>

      {/* Row 2 */}
      <line x1="0" y1="72" x2="248" y2="72" stroke="#3f3f46" strokeWidth="1" />
      <circle cx="20" cy="60" r="6" fill="#8b5cf6" />
      <text x="32" y="63" fill="#f4f4f5" fontSize="9" fontWeight="500">
        Sarah Jenkins
      </text>
      <text x="88" y="63" fill="#a1a1aa" fontSize="9">
        SaaSFlow
      </text>
      <rect x="160" y="52" width="60" height="16" rx="8" fill="#065f46" />
      <text x="190" y="64" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="700">
        ✓ 100% VALID
      </text>

      {/* Row 3 preview */}
      <circle cx="20" cy="84" r="6" fill="#ec4899" />
      <text x="32" y="87" fill="#f4f4f5" fontSize="9" fontWeight="500">
        David Kaufman
      </text>
      <text x="88" y="87" fill="#a1a1aa" fontSize="9">
        SyncLab
      </text>
      <rect x="160" y="76" width="60" height="16" rx="8" fill="#065f46" />
      <text x="190" y="88" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="700">
        ✓ 100% VALID
      </text>
    </g>
  </svg>
);

/** 8. Automation & AI: n8n workflow canvas with trigger and AI model */
export const AutomationAiVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="ai-bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="140" fill="url(#ai-bg)" />

    {/* n8n Webhook Trigger Node */}
    <g transform="translate(30, 48)">
      <rect width="70" height="44" rx="8" fill="#0e7490" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="20" cy="22" r="8" fill="#0891b2" />
      <path
        d="M17 22 L 23 22 M20 19 L 23 22 L 20 25"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="34" y="25" fill="#e0f2fe" fontSize="9" fontWeight="700">
        Webhook
      </text>
    </g>

    {/* Bezier connector 1 */}
    <path
      d="M100 70 C 120 70, 120 50, 140 50"
      stroke="#22d3ee"
      strokeWidth="2"
      strokeDasharray="3 3"
    />

    {/* AI Enrichment Node */}
    <g transform="translate(140, 30)">
      <rect width="74" height="44" rx="8" fill="#164e63" stroke="#67e8f9" strokeWidth="2" />
      <text x="37" y="22" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="800">
        ⚡ AI Agent
      </text>
      <text x="37" y="34" textAnchor="middle" fill="#cffafe" fontSize="8">
        Lead Scoring
      </text>
    </g>

    {/* Bezier connector 2 */}
    <path
      d="M214 50 C 230 50, 230 70, 250 70"
      stroke="#22d3ee"
      strokeWidth="2"
      strokeDasharray="3 3"
    />

    {/* CRM Record Node */}
    <g transform="translate(250, 48)">
      <rect width="56" height="44" rx="8" fill="#0891b2" stroke="#a5f3fc" strokeWidth="1.5" />
      <text x="28" y="22" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">
        HubSpot
      </text>
      <text x="28" y="34" textAnchor="middle" fill="#ecfeff" fontSize="8">
        Instant Sync
      </text>
    </g>
  </svg>
);

/** 9. SaaS Promotion: Product Hunt launch badge & campaign rocket */
export const SaasPromotionVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="promo-bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#db2777" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#be185d" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="140" fill="url(#promo-bg)" />

    {/* Product Hunt Style Circular Badge */}
    <g transform="translate(80, 36)">
      <circle cx="34" cy="34" r="30" fill="#da552f" stroke="#ffffff" strokeWidth="2" />
      <text
        x="34"
        y="44"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="28"
        fontWeight="900"
        fontFamily="sans-serif"
      >
        P
      </text>
    </g>

    {/* Trophy / Ribbon Banner */}
    <g transform="translate(160, 42)">
      <rect width="110" height="28" rx="6" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
      <text x="55" y="18" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontWeight="700">
        🏆 #1 PRODUCT
      </text>

      <g transform="translate(0, 34)">
        <rect width="110" height="20" rx="4" fill="#db2777" />
        <text x="55" y="14" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
          50,000+ CLICKS
        </text>
      </g>
    </g>
  </svg>
);

/** 10. SaaS Development: Clean IDE window with Next.js & React symbols */
export const SaasDevelopmentVector: FC<VectorProps> = (props) => (
  <svg
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="dev-bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0f766e" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="140" fill="url(#dev-bg)" />

    {/* Code Editor Window */}
    <g transform="translate(50, 24)">
      <rect width="220" height="92" rx="8" fill="#111827" stroke="#14b8a6" strokeWidth="1.5" />
      {/* Title bar */}
      <rect width="220" height="22" rx="8" fill="#1f2937" />
      <circle cx="12" cy="11" r="3.5" fill="#ef4444" />
      <circle cx="22" cy="11" r="3.5" fill="#f59e0b" />
      <circle cx="32" cy="11" r="3.5" fill="#10b981" />
      <text x="110" y="15" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">
        AppRouter.tsx
      </text>

      {/* Code syntax lines */}
      <g transform="translate(14, 34)">
        <text x="0" y="12" fill="#2dd4bf" fontSize="9" fontFamily="monospace" fontWeight="600">
          export default async function
        </text>
        <text x="145" y="12" fill="#f3f4f6" fontSize="9" fontFamily="monospace">
          SaaS() {"{"}
        </text>

        <text x="12" y="26" fill="#a7f3d0" fontSize="9" fontFamily="monospace">
          const pipeline = await init()
        </text>

        <text x="12" y="40" fill="#38bdf8" fontSize="9" fontFamily="monospace">
          return &lt;PipelineEngine scale /&gt;
        </text>

        <text x="0" y="52" fill="#f3f4f6" fontSize="9" fontFamily="monospace">
          {"}"}
        </text>
      </g>
    </g>
  </svg>
);
