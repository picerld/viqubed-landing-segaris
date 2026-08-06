import { useLayoutEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { BackToTop } from "@/components/BackToTop"

export function RootLayout() {
  const { pathname } = useLocation()

  // Runs synchronously before the browser paints the new route, so the
  // scroll position never visibly jumps from the old page's offset.
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="bg-glow flex min-h-screen flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
