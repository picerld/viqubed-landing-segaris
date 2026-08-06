import { Link } from "react-router-dom"

import logoUrl from "@/assets/viqubed-logo.svg"

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center">
      <img
        src={logoUrl}
        alt="VIQUBED — Immersive 3D Content Composer"
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  )
}
