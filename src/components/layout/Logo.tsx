import { Link } from "react-router-dom"

import logoUrl from "@/assets/Logo-dark.svg"
import logoBlackUrl from "@/assets/Logo-white.svg"
import { useTheme } from "@/lib/theme"

export function Logo() {
  const { theme } = useTheme()

  return (
    <Link to="/home" className="flex shrink-0 items-center">
      <img
        src={theme === "dark" ? logoUrl : logoBlackUrl}
        alt="VIQUBED — Immersive 3D Content Composer"
        className="h-11 w-auto translate-y-[15%] sm:h-7"
      />
    </Link>
  )
}
