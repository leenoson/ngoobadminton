import CardSkeleton from "@/components/Skeleton"

export default function Loading() {
  return (
    <>
      <CardSkeleton type="avatar avatar--full" />
      <CardSkeleton type="title center" />
      <CardSkeleton type="text short" />
      <CardSkeleton type="text short" />
      <CardSkeleton type="title medium" />
    </>
  )
}
