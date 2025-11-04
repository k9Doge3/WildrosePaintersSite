"use client"

export function BackgroundOrbs() {
  return (
    <>
      <div className="diagonal-lines opacity-30" />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
            animation: "particle-drift 60s linear infinite",
          }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-1/4 top-0 h-[1000px] w-[1000px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)",
            animation: "blob-float-1 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-1/4 top-1/3 h-[900px] w-[900px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)",
            animation: "blob-float-2 30s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[850px] w-[850px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
            animation: "blob-float-3 20s ease-in-out infinite",
          }}
        />
      </div>
    </>
  )
}
