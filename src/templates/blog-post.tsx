import * as React from "react"
import { PageProps, graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { FoodTypeTag, Image } from "../components"

type HtmlNode = {
  type: "root" | "text" | "element"
  value?: string
  tagName?: keyof JSX.IntrinsicElements
  children?: HtmlNode[]
  properties?: any
}

type Data = {
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
        childImageSharp: {
          fluid: FluidObject
        }
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

const BlogPostTemplate = ({ data, location }: PageProps<Data>) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const {
    node: { childImageSharp },
  } = data.allFile.edges.find(edge => {
    return post.frontmatter.thumbnail.includes(edge.node.relativePath)
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="max-w-screen-md m-auto">
        <div className="text-4xl font-bold">{post.frontmatter.title}</div>

        <div>{post.frontmatter.date}</div>
        <div className="flex space-x-2 pt-2 pb-3">
          {post.frontmatter.tags.map(tag => (
            <FoodTypeTag key={`${post.frontmatter.title}-${tag}`} name={tag} />
          ))}
        </div>

        <div className="pb-4">
          <Img
            className="object-center object-cover"
            fluid={childImageSharp.fluid}
          />
        </div>

        <div className="border-b-2 pb-4 space-y-4">
          {post.htmlAst.children.map((item, idx) => (
            <BlogHTML
              node={item}
              key={`root-${idx}`}
              rootIdx={idx.toString()}
            />
          ))}
        </div>

        <div className="flex-grow pb-2">
          <div className="text-3xl pt-4 font-bold">
            {post.frontmatter.title}
          </div>
          <div className="pb-4">{post.frontmatter.description}</div>

          <div className="flex divide-x-2">
            {[
              ["Prep time", post.frontmatter.prep_time],
              ["Cook time", post.frontmatter.cook_time],
              [
                "Total time",
                post.frontmatter.cook_time + post.frontmatter.prep_time,
              ],
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
        </div>

        <div>
          <div className="font-bold text-2xl py-2">Ingredients</div>
          <ul className="list-disc list-inside pl-2">
            {post.frontmatter.meal_part.map((mp, idx) => (
              <React.Fragment key={`meal-part-${idx}`}>
                <div className="font-bold text-lg">{mp.name}</div>
                {mp.ingredients.map((ingredient, idx) => (
                  <li className="pb-2" key={`ingredient-${idx}`}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}{" "}
                    {ingredient.optional ? "(optional)" : ""}
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>

          <div className="font-bold text-2xl py-2">Instructions</div>
          <ol className="list-decimal list-inside pl-2">
            {post.frontmatter.instructions.map((instruction, idx) => (
              <li className="pb-2" key={`instruction-${idx}`}>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}

const BlogHTML = ({ node, rootIdx }: { node: HtmlNode; rootIdx: string }) => {
  if (node.type === "element" && node.tagName === "img") {
    return <Image name={node.properties.src} />
  }

  if (node.type === "element") {
    const Element = node.tagName === "p" ? "div" : node.tagName || "span"
    return (
      <Element>
        {node.children.map((item, idx) => (
          <BlogHTML
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "blog-images" } }) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      frontmatter {
        thumbnail
        tags
        title
        cook_time
        servings
        serving_size
        instructions
        prep_time
        description
        course

        meal_part {
          name
          ingredients {
            amount
            name
            optional
            unit
          }
        }
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
