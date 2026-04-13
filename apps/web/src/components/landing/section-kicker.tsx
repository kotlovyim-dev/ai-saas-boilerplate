import { cn } from "@/lib/utils";

type SectionKickerProps = {
  label: string;
  className?: string;
  inverted?: boolean;
};

export function SectionKicker({
  label,
  className,
  inverted = false,
}: SectionKickerProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
        inverted
          ? "border-white/25 bg-white/10 text-white/80"
          : "border-border bg-card text-muted-foreground",
        className,
      )}
    >
      {label}
    </span>
  );
}
