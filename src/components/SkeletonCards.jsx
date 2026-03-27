import SkeletonMovieCard from "./SkeletonMovieCard"

export function SkeletonCards() {

  const arr = Array.from({ length: 10 })

  return arr.map((_, i) => (
    <SkeletonMovieCard key={i} />
  ))

}