import CardSkeleton from "@/components/Skeleton"

export default function Loading() {
  return (
    <div className="w-100">
      <CardSkeleton type="avatar avatar--full" />
      <CardSkeleton type="title center" />
      <CardSkeleton type="text short" />
      <CardSkeleton type="text short" />
      <CardSkeleton type="title medium" />
    </div>
  )
}
