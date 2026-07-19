const PALETTE = ["#3DB8AE", "#E8A33D", "#5A9BB5", "#3A6B8A"];
const TOTAL_CELLS = 24 * 14;

export default function ClassGrid() {
  const cells = Array.from({ length: TOTAL_CELLS }, (_, i) => {
    // deterministic pseudo-pattern so server/client output match exactly
    const colorIndex = (i * 13 + Math.floor(i / 24) * 5) % PALETTE.length;
    return {
      color: PALETTE[colorIndex],
      delayIndex: i % 40,
    };
  });

  return (
    <div className="class-grid" aria-hidden="true">
      {cells.map((cell, i) => (
        <div
          key={i}
          style={
            {
              "--cell-color": cell.color,
              "--i": cell.delayIndex,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
