type CountCardProps = {
  icon?: string;
  name: string;
  count: number;
  isUpgraded: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onToggleUpgrade: () => void;
};

export default function CountCard({
  icon,
  name,
  count,
  isUpgraded,
  onIncrement,
  onDecrement,
  onToggleUpgrade,
}: CountCardProps) {
  return (
    <div className="count-card">
      <div className="arrow up" onClick={onIncrement}>▲</div>

      <div className="body">
        {icon && (
          <div
            className={`icon-box ${isUpgraded ? "upgraded" : ""}`}
            onClick={onToggleUpgrade}
          >
            <img src={icon} alt={name} decoding="async" />
         </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <span>{name}</span>
          <span style={{ fontWeight: "bold" }}>{count}</span>
        </div>
      </div>

      <div className="arrow down" onClick={onDecrement}>▼</div>
    </div>
  );
}
