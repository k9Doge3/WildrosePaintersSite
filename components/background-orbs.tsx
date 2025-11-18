"use client"

export function BackgroundOrbs() {
  return (
    <>
      <div className="diagonal-lines" />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden mix-blend-multiply">
        <div
          className="absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(244, 187, 146, 0.4) 0%, transparent 70%)",
            animation: "blob-float-1 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-1/4 top-1/3 h-[700px] w-[700px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(150, 196, 168, 0.35) 0%, transparent 70%)",
            animation: "blob-float-2 30s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[750px] w-[750px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255, 221, 210, 0.5) 0%, transparent 70%)",
            animation: "blob-float-3 20s ease-in-out infinite",
          }}
        />
      </div>
    </>
  )
}
