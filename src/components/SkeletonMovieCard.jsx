import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonMovieCard() {
  return (
    <div className="space-y-3">

      {/* poster */}
      <Skeleton className="h-75 w-full rounded-xl" />

      {/* title */}
      <Skeleton className="h-5 w-3/4" />

      {/* rating + year */}
      <div className="flex gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-10" />
      </div>

    </div>
  )
}