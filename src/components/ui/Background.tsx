'use client';

export function Background() {
  return (
    <>
      {/* Base gradient */}
      <div className="fixed inset-0 -z-20 bg-[#0a0a0f]" />

      {/* Subtle noise texture */}
      <div className="fixed inset-0 -z-10 noise-bg" />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 -z-15 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #00d4aa 0%, transparent 70%)',
            top: '-10%',
            right: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #00a4d4 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
          }}
        />
      </div>
    </>
  );
}
