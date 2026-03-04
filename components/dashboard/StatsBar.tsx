type Props = {
  total: number;
  done: number;
  pct: number;
};

export default function StatusBar({ total, done, pct }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <div className="text-3xl font-bold text-foreground">{total}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Total
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <div className="text-3xl font-bold text-foreground">{done}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Done
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <div className="text-3xl font-bold text-foreground">{pct}%</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Completed
        </div>
      </div>
    </div>
  );
}
