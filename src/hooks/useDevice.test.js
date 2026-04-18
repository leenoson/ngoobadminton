import { renderHook, act } from "@testing-library/react"
import { useDevice } from "./useDevice"

describe("useDevice", () => {
  const originalUserAgent = navigator.userAgent

  afterEach(() => {
    // reset lại userAgent
    Object.defineProperty(window.navigator, "userAgent", {
      value: originalUserAgent,
      configurable: true,
    })
  })

  it("should fallback to navigator.vendor", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "",
      configurable: true,
    })

    Object.defineProperty(window.navigator, "vendor", {
      value: "iPhone",
      configurable: true,
    })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobileDevice).toBe(true)
  })

  it("should fallback to window.opera", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "",
      configurable: true,
    })

    Object.defineProperty(window.navigator, "vendor", {
      value: "",
      configurable: true,
    })

    window.opera = "android"

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobileDevice).toBe(true)
  })

  it("should detect mobile device from userAgent", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "iPhone",
      configurable: true,
    })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobileDevice).toBe(true)
  })

  it("should detect non-mobile device", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      configurable: true,
    })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobileDevice).toBe(false)
  })

  it("should detect small screen", () => {
    window.innerWidth = 500

    const { result } = renderHook(() => useDevice())

    expect(result.current.isSmallScreen).toBe(true)
  })

  it("should detect large screen", () => {
    window.innerWidth = 1200

    const { result } = renderHook(() => useDevice())

    expect(result.current.isSmallScreen).toBe(false)
  })

  it("should update on resize event", () => {
    window.innerWidth = 1200

    const { result } = renderHook(() => useDevice())

    expect(result.current.isSmallScreen).toBe(false)

    act(() => {
      window.innerWidth = 600
      window.dispatchEvent(new Event("resize"))
    })

    expect(result.current.isSmallScreen).toBe(true)
  })

  it("should cleanup resize listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener")

    const { unmount } = renderHook(() => useDevice())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    )
  })
})
