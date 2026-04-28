import React from "react"

function LoadingMediaList() {
  return (
    <>
      <ul className="gallery">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="gallery__item">
            <div className="gallery__box">
              <div className="skeleton skeleton--avatar" />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default LoadingMediaList
