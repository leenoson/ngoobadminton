import clsx from "clsx"

export default function CardSkeleton({}) {
  return (
    <ul className="card-list">
      <li className="card-item">
        <div className={clsx(`card card--skeleton`)}>
          <div className="skeleton skeleton--avatar" />
          <div className="skeleton skeleton--title" />
          <div className="skeleton" />
        </div>
      </li>
    </ul>
  )
}
