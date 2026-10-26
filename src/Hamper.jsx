// Illustrated Christmas hamper with the campaign's foodstuffs.
export default function Hamper() {
  return (
    <svg className="hamper" viewBox="0 0 600 640" role="img" aria-label="A Christmas basket of Nigerian foodstuff: ofada rice, garri, groundnut oil, palm oil, crayfish, dried pepper and tomato paste">
      <defs>
        <pattern id="weave" width="28" height="22" patternUnits="userSpaceOnUse">
          <rect width="28" height="22" fill="#b7793d" />
          <path d="M0 5 Q7 0 14 5 T28 5" stroke="#8f5a2a" strokeWidth="3" fill="none" />
          <path d="M0 16 Q7 11 14 16 T28 16" stroke="#cf9353" strokeWidth="3" fill="none" />
          <path d="M14 0 V22" stroke="#9c642f" strokeWidth="2" opacity=".55" />
        </pattern>
        <pattern id="sack" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#f4efe2" />
          <path d="M0 4H8M4 0V8" stroke="#e2dac6" strokeWidth="1" />
        </pattern>
        <pattern id="sack2" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#ebe4d0" />
          <path d="M0 4H8M4 0V8" stroke="#d7cdb4" strokeWidth="1" />
        </pattern>
        <linearGradient id="gnut" x1="0" x2="1">
          <stop offset="0" stopColor="#f2c94c" />
          <stop offset=".55" stopColor="#f7dc7c" />
          <stop offset="1" stopColor="#e0b237" />
        </linearGradient>
        <linearGradient id="palm" x1="0" x2="1">
          <stop offset="0" stopColor="#c6401c" />
          <stop offset=".55" stopColor="#e2612b" />
          <stop offset="1" stopColor="#ad3415" />
        </linearGradient>
        <linearGradient id="basketShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
        <radialGradient id="floor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#000" stopOpacity=".45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="300" cy="612" rx="250" ry="24" fill="url(#floor)" />

      {/* basket handle (back) */}
      <path d="M92 372 C 92 -50, 508 -50, 508 372" fill="none" stroke="#8f5a2a" strokeWidth="26" strokeLinecap="round" />
      <path d="M92 372 C 92 -50, 508 -50, 508 372" fill="none" stroke="#c48446" strokeWidth="14" strokeLinecap="round" strokeDasharray="18 10" />

      {/* basket back rim */}
      <ellipse cx="300" cy="372" rx="236" ry="34" fill="#7a4a22" />

      {/* rice sack (back left) */}
      <g>
        <path d="M108 168 Q 104 150 122 146 L 250 146 Q 266 150 262 168 L 270 392 L 100 392 Z" fill="url(#sack)" stroke="#d2c8b0" strokeWidth="2" />
        <path d="M118 146 Q 185 122 252 146 Q 228 160 185 158 Q 142 160 118 146 Z" fill="#e6dfcc" />
        <path d="M150 128 Q 185 112 220 128" stroke="#c9a55a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="112" y="166" width="146" height="70" rx="6" fill="#1d5c45" />
        <text x="185" y="198" textAnchor="middle" className="hp-t" fill="#fbf7ef" fontSize="28">OFADA</text>
        <text x="185" y="224" textAnchor="middle" className="hp-t" fill="#fbf7ef" fontSize="18">RICE · 25KG</text>
        <path d="M112 244 H258" stroke="#b9332b" strokeWidth="6" />
      </g>

      {/* groundnut oil keg (back centre) */}
      <g>
        <rect x="258" y="96" width="126" height="296" rx="20" fill="url(#gnut)" stroke="#c99a2c" strokeWidth="3" />
        <path d="M290 96 V74 H330 V96" fill="#1d5c45" />
        <rect x="286" y="62" width="48" height="18" rx="5" fill="#134a37" />
        <path d="M342 96 Q 384 96 384 132 V150" fill="none" stroke="#c99a2c" strokeWidth="14" strokeLinecap="round" />
        <rect x="270" y="180" width="102" height="118" rx="8" fill="#fbf7ef" />
        <text x="321" y="222" textAnchor="middle" className="hp-t" fill="#18201b" fontSize="19">GROUND</text>
        <text x="321" y="244" textAnchor="middle" className="hp-t" fill="#18201b" fontSize="19">NUT OIL</text>
        <text x="321" y="276" textAnchor="middle" className="hp-s" fill="#b9332b" fontSize="15">25 L</text>
        <rect x="268" y="110" width="12" height="260" rx="6" fill="#fff" opacity=".35" />
      </g>

      {/* palm oil keg (back right) */}
      <g>
        <rect x="388" y="142" width="116" height="250" rx="18" fill="url(#palm)" stroke="#8f2a11" strokeWidth="3" />
        <path d="M418 142 V122 H456 V142" fill="#e6b34a" />
        <rect x="414" y="110" width="46" height="16" rx="5" fill="#d49f33" />
        <rect x="400" y="168" width="92" height="88" rx="8" fill="#fbf7ef" />
        <text x="446" y="200" textAnchor="middle" className="hp-t" fill="#18201b" fontSize="20">PALM</text>
        <text x="446" y="222" textAnchor="middle" className="hp-t" fill="#18201b" fontSize="20">OIL</text>
        <text x="446" y="244" textAnchor="middle" className="hp-s" fill="#b9332b" fontSize="14">25 L</text>
        <rect x="398" y="156" width="10" height="220" rx="5" fill="#fff" opacity=".25" />
      </g>

      {/* garri sack (mid left) */}
      <g>
        <path d="M130 262 Q 150 236 200 240 Q 248 236 262 262 L 270 404 L 124 404 Z" fill="url(#sack2)" stroke="#cfc5ab" strokeWidth="2" />
        <path d="M150 248 Q 196 226 244 248" stroke="#bfb393" strokeWidth="4" fill="none" />
        <rect x="140" y="270" width="114" height="54" rx="6" fill="#e6b34a" />
        <text x="197" y="306" textAnchor="middle" className="hp-t" fill="#0e3b2c" fontSize="26">GARRI</text>
      </g>

      {/* dried pepper (front left) */}
      <g>
        <ellipse cx="118" cy="362" rx="62" ry="20" fill="#7a1f17" />
        {[[76, 352, -30], [94, 344, 10], [114, 340, -12], [134, 346, 24], [152, 352, -18], [102, 356, 40], [130, 358, -40]].map(([x, y, r], i) => (
          <path key={i} transform={`rotate(${r} ${x} ${y})`} d={`M${x - 16} ${y} q 16 -12 32 0 q -16 9 -32 0`} fill={i % 2 ? '#c4271c' : '#a81f16'} />
        ))}
      </g>

      {/* tomato paste carton (mid centre) */}
      <g transform="rotate(-6 350 330)">
        <rect x="284" y="270" width="130" height="118" rx="6" fill="#c73a2c" />
        <path d="M284 270 L 300 252 H 430 L 414 270 Z" fill="#a72e22" />
        <path d="M414 270 L 430 252 V 370 L 414 388 Z" fill="#8f251b" />
        <circle cx="322" cy="318" r="22" fill="#e85b3f" />
        <path d="M314 298 Q 322 288 330 298" stroke="#2f7a3f" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="380" y="314" textAnchor="middle" className="hp-t" fill="#fbf7ef" fontSize="16">TOMATO</text>
        <text x="380" y="334" textAnchor="middle" className="hp-t" fill="#fbf7ef" fontSize="16">PASTE</text>
        <rect x="294" y="356" width="110" height="10" rx="3" fill="#fbf7ef" opacity=".85" />
      </g>

      {/* crayfish bag (mid right) */}
      <g>
        <path d="M424 262 Q 470 246 512 262 L 520 400 L 416 400 Z" fill="#f2b38a" opacity=".92" />
        <path d="M424 262 Q 470 246 512 262 L 520 400 L 416 400 Z" fill="none" stroke="#fff" strokeWidth="2" opacity=".6" />
        {[[436, 312], [466, 306], [494, 316], [450, 336], [482, 340], [438, 358], [470, 362], [500, 352]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q 10 -8 18 0 q -4 8 -14 6`} fill="#d9663a" stroke="#b44a24" strokeWidth="1.5" />
        ))}
        <rect x="434" y="244" width="70" height="14" rx="5" fill="#b9332b" />
        <rect x="428" y="270" width="82" height="24" rx="4" fill="#fbf7ef" /><text x="469" y="287" textAnchor="middle" className="hp-s" fill="#7a2b12" fontSize="12">CRAYFISH</text>
      </g>

      {/* basket body */}
      <path d="M64 372 Q 300 420 536 372 L 500 590 Q 300 622 100 590 Z" fill="url(#weave)" />
      <path d="M64 372 Q 300 420 536 372 L 500 590 Q 300 622 100 590 Z" fill="url(#basketShade)" />
      <path d="M64 372 Q 300 420 536 372" fill="none" stroke="#8f5a2a" strokeWidth="18" strokeLinecap="round" />
      <path d="M64 372 Q 300 420 536 372" fill="none" stroke="#cf9353" strokeWidth="6" strokeLinecap="round" strokeDasharray="14 8" />

      {/* ribbon */}
      <path d="M78 452 Q 300 500 522 452 L 516 486 Q 300 534 84 486 Z" fill="#b9332b" />
      <path d="M80 462 Q 300 510 520 462" stroke="#e6b34a" strokeWidth="3" fill="none" />
      <g transform="translate(206 486)">
        <path d="M0 0 C -60 -50, -84 10, -10 10 Z" fill="#c73a2c" />
        <path d="M0 0 C 60 -50, 84 10, 10 10 Z" fill="#c73a2c" />
        <path d="M-4 6 L -34 66 L -18 60 L -10 74 Z" fill="#a72e22" />
        <path d="M4 6 L 30 64 L 14 60 L 8 74 Z" fill="#a72e22" />
        <circle r="14" fill="#e6b34a" />
      </g>

      {/* gift tag */}
      <g transform="rotate(8 430 520)">
        <path d="M352 470 L 386 470 L 386 466" stroke="#e6b34a" strokeWidth="3" fill="none" />
        <path d="M384 486 L 404 466 H 520 V 556 H 404 Z" fill="#fbf7ef" stroke="#e3d9c4" strokeWidth="2" />
        <circle cx="408" cy="511" r="6" fill="#e3d9c4" />
        <text x="466" y="502" textAnchor="middle" className="hp-s" fill="#5f6359" fontSize="12">FROM NIGERIA</text>
        <text x="466" y="528" textAnchor="middle" className="hp-t" fill="#0e3b2c" fontSize="20">To the UK</text>
        <text x="466" y="546" textAnchor="middle" className="hp-s" fill="#b9332b" fontSize="11">MERRY CHRISTMAS</text>
      </g>

      {/* sprigs */}
      <g fill="#2f7a3f">
        <path d="M70 372 q -30 -30 -6 -54 q 10 26 6 54z" />
        <path d="M70 372 q -40 -6 -50 -36 q 30 6 50 36z" fill="#1d5c45" />
        <path d="M530 372 q 30 -30 6 -54 q -10 26 -6 54z" />
        <path d="M530 372 q 40 -6 50 -36 q -30 6 -50 36z" fill="#1d5c45" />
      </g>
      <circle cx="58" cy="362" r="7" fill="#b9332b" />
      <circle cx="70" cy="354" r="6" fill="#c73a2c" />
      <circle cx="542" cy="362" r="7" fill="#b9332b" />
      <circle cx="530" cy="354" r="6" fill="#c73a2c" />
    </svg>
  );
}
