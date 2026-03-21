import clsx from "clsx"

export default function CardSkeleton({ type }) {
  return (
    <>
      <div className={clsx("skeleton", type)} />
    </>
  )
}
