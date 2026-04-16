import Link from "next/link"

function createRipple(e) {
  const button = e.currentTarget

  const circle = document.createElement("span")
  circle.className = "ripple"

  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)

  circle.style.width = circle.style.height = size + "px"
  circle.style.left = e.clientX - rect.left - size / 2 + "px"
  circle.style.top = e.clientY - rect.top - size / 2 + "px"

  button.appendChild(circle)

  setTimeout(() => circle.remove(), 600)
}

function ButtonRipple({
  children,
  className = "",
  onClick,
  href,
  disabled,
  noRipple = false,
  ...props
} = {}) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }

    if (!noRipple) {
      createRipple(e)
    }

    onClick?.(e)
  }

  const commonProps = {
    className: `btn-wave-click ${className}`,
    onClick: handleClick,
    ...props,
  }

  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {children}
      </Link>
    )
  }

  return (
    <button {...commonProps} disabled={disabled}>
      {children}
    </button>
  )
}

export default ButtonRipple
