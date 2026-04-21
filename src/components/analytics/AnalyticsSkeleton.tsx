import { Skeleton } from "@/components/ui/skeleton";

export const ChartSkeleton = () => {
  return (
    <div className="h-full w-full rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-6 w-48 bg-slate-800" />
        <Skeleton className="h-4 w-24 bg-slate-800/60" />
      </div>
      <div className="flex h-[250px] w-full items-end gap-2 sm:h-[350px]">
        {/* Simulate bars or area */}
        <Skeleton className="h-[40%] w-full rounded-t bg-slate-800/30" />
        <Skeleton className="h-[60%] w-full rounded-t bg-slate-800/30" />
        <Skeleton className="h-[80%] w-full rounded-t bg-slate-800/30" />
        <Skeleton className="h-[50%] w-full rounded-t bg-slate-800/30" />
        <Skeleton className="h-[70%] w-full rounded-t bg-slate-800/30" />
        <Skeleton className="h-[90%] w-full rounded-t bg-slate-800/30" />
      </div>
    </div>
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24 bg-slate-700/50" />
          <Skeleton className="h-8 w-32 bg-slate-700/50" />
          <Skeleton className="h-3 w-40 bg-slate-700/30" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg bg-slate-700/30" />
      </div>
    </div>
  );
};
