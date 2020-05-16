import * as React from "react"
import cn from "classnames"

type ButtonProps = {
  children?: React.ReactNode
  onClick?: () => void
  outlined?: boolean
  contained?: boolean
}

const color = "orange"

export const Button = ({
  children,
  onClick,
  outlined,
  contained,
}: ButtonProps) => (
  <div
    role="button"
    className={cn(
      "text-lg uppercase px-4 py-2 rounded duration-300 ease-in-out",
      {
        [`bg-${color}-500 shadow hover:shadow-lg transition-shadow text-white`]: contained,
        [`border border-${color}-500`]: outlined,
        [`text-${color}-500 hover:bg-${color}-200 transition-colors`]: !contained,
      }
    )}
    onClick={onClick}
  >
    {children}
  </div>
)
