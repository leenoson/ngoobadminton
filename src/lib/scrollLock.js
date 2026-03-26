let scrollY = 0
let scrollbarWidth = 0
let cleanupFns = []

export function lockScroll() {
  scrollY = window.scrollY
  scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }

  document.body.style.position = "fixed"
  document.body.style.top = `-${scrollY}px`
  document.body.style.left = "0"
  document.body.style.right = "0"
  document.body.style.width = "100%"

  const preventWheel = (e) => e.preventDefault()
  window.addEventListener("wheel", preventWheel, { passive: false })

  const preventTouch = (e) => e.preventDefault()
  window.addEventListener("touchmove", preventTouch, { passive: false })

  const keys = ["Space", "PageDown", "PageUp", "ArrowDown", "ArrowUp"]
  const preventKeys = (e) => {
    if (keys.includes(e.code)) {
      e.preventDefault()
    }
  }
  window.addEventListener("keydown", preventKeys)

  cleanupFns = [
    () => window.removeEventListener("wheel", preventWheel),
    () => window.removeEventListener("touchmove", preventTouch),
    () => window.removeEventListener("keydown", preventKeys),
  ]
}

export function unlockScroll() {
  document.body.style.position = ""
  document.body.style.top = ""
  document.body.style.left = ""
  document.body.style.right = ""
  document.body.style.width = ""
  document.body.style.paddingRight = ""

  window.scrollTo(0, scrollY)

  cleanupFns.forEach((fn) => fn())
  cleanupFns = []
}
