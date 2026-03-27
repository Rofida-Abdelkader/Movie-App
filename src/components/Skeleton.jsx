export function Skeleton({ width = '100%', height = '20px', circle, style }) {
  const borderRadius = circle ? '50%' : (style?.borderRadius || '4px');

  return (
    <div
      className={`skeleton ${circle ? 'skeleton--circle' : ''} bg-gray-200 dark:bg-gray-700`}
      style={{
        width,
        height,
        borderRadius,
        ...style 
      }}
    />
  );
}