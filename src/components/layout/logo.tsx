import { cn } from "@/lib/utils";

/** VCFO wordmark — preserved from the original design. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink">
        <span className="block h-3 w-3 rounded-[3px] border-2 border-teal-soft border-b-teal border-s-teal" />
      </span>
      <span className="text-[17px] font-bold tracking-tight text-ink">VCFO</span>
    </span>
  );
}
