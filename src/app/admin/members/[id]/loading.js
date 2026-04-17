export default function Loading() {
  return (
    <>
      <div className="mb-(--spac-l)">
        <div className="skeleton skeleton--title04" />
        <div className="member">
          <div className="member__content">
            <div className="skeleton skeleton--title01" />
            <div className="skeleton skeleton--title02" />
            <div className="skeleton skeleton--short" />
            <div className="skeleton skeleton--short" />
            <div className="skeleton skeleton--short" />
          </div>
          <div className="member__avatar">
            <div className="skeleton skeleton--avatar" />
          </div>
        </div>
      </div>
      <div className="skeleton skeleton--title04" />
    </>
  )
}
