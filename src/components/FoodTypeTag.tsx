import * as React from "react"
import cn from "classnames"

enum FoodTypeTags {
  "gluten-free",
  "vegan",
  "vegetarian",
  "dairy-free",
  "naturally-sweetened",
}

const FoodTypeTagMap: {
  [key: string]: {
    text: string
    color: string
    textColor?: string
  }
} = {
  "gluten-free": {
    text: "GF",
    color: "bg-yellow-700",
  },
  vegan: {
    text: "VG",
    color: "bg-green-700",
  },
  vegetarian: {
    text: "V",
    color: "bg-green-500",
  },
  "dairy-free": {
    text: "DF",
    color: "bg-gray-900",
  },
  "naturally-sweetened": {
    text: "NS",
    color: "bg-yellow-500",
  },
}

type FoodTypeTagProps = {
  name: FoodTypeTags
}
export const FoodTypeTag = ({ name }) => {
  return (
    <div
      className={cn(
        "rounded-full h-8 w-8 p-1 font-bold text-white text-center align-middle",
        FoodTypeTagMap[name].color
      )}
    >
      {FoodTypeTagMap[name].text}
    </div>
  )
}
