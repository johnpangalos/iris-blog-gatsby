import { HtmlNode } from "../../components"

export type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allFile: {
    edges: {
      node: {
        name: string
        relativePath: string
      }
    }[]
  }
  markdownRemark: {
    id: string
    excerpt: string
    htmlAst: HtmlNode
    frontmatter: {
      thumbnail: string
      title: string
      description: string
      date: string
    }
  }
}
