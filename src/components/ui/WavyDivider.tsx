export default function WaveDivider() {
  return (
    <div className="w-full">
      <div
        className="relative w-full overflow-hidden h-8"
        style={{ backgroundColor: "#f5f1e8" }}
      >
        <svg
          className="absolute top-0 left-0 w-[200%] h-full animate-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2880 48"
          preserveAspectRatio="none"
        >
          <path
            d="M0,24 C120,8 240,8 360,24 C480,40 600,40 720,24 C840,8 960,8 1080,24 C1200,40 1320,40 1440,24 C1560,8 1680,8 1800,24 C1920,40 2040,40 2160,24 C2280,8 2400,8 2520,24 C2640,40 2760,40 2880,24"
            fill="none"
            stroke="#d4ccba"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* 裝飾小圓點 */}
          <circle cx="180" cy="8" r="3" fill="#e8e0cf" />
          <circle cx="540" cy="40" r="2.5" fill="#cfc7b5" />
          <circle cx="900" cy="8" r="3" fill="#e0d8c7" />
          <circle cx="1260" cy="40" r="2.5" fill="#d9d1c0" />
          <circle cx="1620" cy="8" r="3" fill="#e8e0cf" />
          <circle cx="1980" cy="40" r="2.5" fill="#cfc7b5" />
          <circle cx="2340" cy="8" r="3" fill="#e0d8c7" />
          <circle cx="2700" cy="40" r="2.5" fill="#d9d1c0" />

          {/* 裝飾小星星 */}
          <path
            d="M 450,24 L 453,27 L 456,24 L 453,21 Z"
            fill="#d4ccba"
            opacity="0.8"
          />
          <path
            d="M 1170,24 L 1173,27 L 1176,24 L 1173,21 Z"
            fill="#e0d8c7"
            opacity="0.8"
          />
          <path
            d="M 1890,24 L 1893,27 L 1896,24 L 1893,21 Z"
            fill="#cfc7b5"
            opacity="0.8"
          />
          <path
            d="M 2610,24 L 2613,27 L 2616,24 L 2613,21 Z"
            fill="#d9d1c0"
            opacity="0.8"
          />
        </svg>
        <style>{`
          @keyframes wave {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-wave {
            animation: wave 70s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
