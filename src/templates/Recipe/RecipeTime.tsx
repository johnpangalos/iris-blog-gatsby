import * as React from "react"

type RecipeTimeProps = { cookTime: number; prepTime: number }

export const RecipeTime: React.FC<RecipeTimeProps> = ({
  cookTime,
  prepTime,
}) => (
  <div className="flex divide-x-2">
    {[
      ["Prep time", prepTime],
      ["Cook time", cookTime],
      ["Total time", prepTime + cookTime],
    ].map(([name, time], idx) => (
      <div
        key={`${name}-${time}-${idx}`}
        className="w-1/3 px-4 py-2 text-center border-gray-900 border-b-2 border-t-2"
      >
        <div className="font-bold uppercase">{name}</div>
        <div>{time} minutes</div>
      </div>
    ))}
  </div>
)
