export function Skeleton({ width = '100%', height = '20px', circle, style }) {
  const borderRadius = circle ? '50%' : (style?.borderRadius || '4px');

  return (
    <div
      className={`skeleton ${circle ? 'skeleton--circle' : ''}`}
      style={{
        width,
        height,
        borderRadius,
         ...style 
        }}
    />
  );
}

export function SkeletonUserCard() {
  return (
    <div className="sk-card">
      <Skeleton circle width={44} height={44} />
      <div className="sk-lines">
        <Skeleton height={12} style={{ width: '80%' }} />
        <Skeleton height={10} style={{ width: '55%' }} />
        <Skeleton height={10} style={{ width: '65%' }} />
      </div>
    </div>
  );
}

export function SkeletonContentCard() {
  return (
    <div className="sk-card">
      <Skeleton height={120} style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} />
      <Skeleton height={12} style={{ width: '90%' }} />
      <Skeleton height={10} style={{ width: '60%' }} />
    </div>
  );
}