import * as React from "react"
import { Image } from "./Image"

export type HtmlNode = {
  type: "root" | "text" | "element"
  value?: string
  tagName?: keyof JSX.IntrinsicElements
  children?: HtmlNode[]
  properties?: any
}

type BlogPostProps = {
  node: HtmlNode
  rootIdx: string
}

export const BlogPost: React.FC<BlogPostProps> = ({ node, rootIdx }) => {
  if (node.type === "element" && node.tagName === "img") {
    return <Image name={node.properties.src} />
  }

  if (node.type === "element") {
    const Element = node.tagName === "p" ? "div" : node.tagName || "span"
    return (
      <Element>
        {node.children.map((item, idx) => (
          <BlogPost
            node={item}
            key={`${rootIdx}-${idx}`}
            rootIdx={`${rootIdx}-${idx}`}
          />
        ))}
      </Element>
    )
  }

  return <React.Fragment key={`${rootIdx}-text`}>{node.value}</React.Fragment>
}
