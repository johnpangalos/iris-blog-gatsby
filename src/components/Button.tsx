import * as React from "react"
import cn from "classnames"

type ButtonProps = {
  children?: React.ReactNode
  onClick?: () => void
  outlined?: boolean
  contained?: boolean
}

export const Button = ({
  children,
  onClick,
  outlined,
  contained,
}: ButtonProps) => (
  <button
    className={cn(
      "text-lg uppercase px-2 py-1 rounded duration-300 ease-in-out",
      {
        [`bg-orange-500 shadow hover:shadow-lg transition-shadow text-white`]: contained,
        [`border border-orange-500`]: outlined,
        [`text-orange-500 hover:bg-orange-200 hover:bg-opacity-75 transition-colors`]: !contained,
      }
    )}
    onClick={onClick}
  >
    {children}
  </button>
)
