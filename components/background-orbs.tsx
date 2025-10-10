"use client"

export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-10"
        style={{
          backgroundImage: "url('/images/rocky-mountains-alberta.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `rose-petal-float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            🌹
          </div>
        ))}
      </div>

      {/* Large organic gradient orbs with rose/Alberta colors */}
      <div
        className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(225, 29, 72, 0.4) 0%, transparent 70%)",
          animation: "blob-float-1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
          animation: "blob-float-2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[550px] w-[550px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
          animation: "blob-float-3 15s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(225, 29, 72, 0.1) 0%, rgba(236, 72, 153, 0.1) 25%, rgba(168, 85, 247, 0.1) 50%, rgba(99, 102, 241, 0.1) 75%, rgba(225, 29, 72, 0.1) 100%)",
          backgroundSize: "400% 400%",
          animation: "mesh-gradient 15s ease infinite",
        }}
      />
    </div>
  )
}
