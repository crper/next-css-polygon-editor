'use client';

export interface PolygonRendererProps {
  clipPath: string;
  isActive?: boolean;
}

export function PolygonRenderer({ clipPath, isActive = false }: PolygonRendererProps) {
  return (
    <>
      {isActive ? (
        <div
          className="pointer-events-none absolute inset-0 h-full w-full transition-all duration-300"
          style={{
            clipPath,
            background: 'transparent',
            filter: 'drop-shadow(0 18px 28px var(--editor-shadow))',
            transform: 'translateY(4px)',
          }}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 h-full w-full transition-all duration-300"
        style={{
          clipPath,
          background: 'linear-gradient(135deg, var(--editor-fill-start), var(--editor-fill-end))',
          border: '2px solid var(--editor-accent)',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.18)',
        }}
      />
    </>
  );
}
