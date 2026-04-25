export default function BoxSkeleton({ label }) {
  return (
    <div className="box__box">
      <p>{label}</p>
      <span className="mt-[4px] skeleton" />
    </div>
  )
}
