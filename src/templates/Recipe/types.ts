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
      tags: string[]
      title: string
      cook_time: number
      prep_time: number
      servings: string
      serving_size: string
      instructions: string[]
      description: string
      course: string
      meal_part: {
        ingredients: {
          amount: string
          name: string
          optional: string
          unit: string
        }[]
        name: string
      }[]
      date: string
    }
  }
}
