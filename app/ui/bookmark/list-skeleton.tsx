function SkeletonCard() {
  return (
    <div className="m-6 flex flex-col gap-2 rounded-md border border-neutral-800 p-4">
      <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-300" />
      <div className="h-4 w-full animate-pulse rounded bg-neutral-300" />
    </div>
  );
}

export default function ListSkeleton() {
  return (
    <div>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
