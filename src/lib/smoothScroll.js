export function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY
  const distance = targetY - startY
  let startTime = null

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    const eased = easeInOutCubic(progress)

    window.scrollTo(0, startY + distance * eased)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}
