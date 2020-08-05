import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import { Button, FoodTypeTag } from "../components"

import Layout from "../components/layout"

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
  recipes: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          thumbnail: string
          tags: string[]
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const ReadMoreButton = ({ slug }: { slug: string }) => (
  <div className="px-2 py-2">
    <Link to={slug}>
      <Button>Read more</Button>
    </Link>
  </div>
)

const RecipesIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout location={location} title={siteTitle}>
      <div className="max-w-screen-md w-full mx-auto px-6 md:px-0 pt-2 pb-10 h-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.recipes.edges.map(({ node }) => {
            const {
              node: { childImageSharp },
            } = data.allFile.edges.find(edge => {
              return node.frontmatter.thumbnail.includes(edge.node.relativePath)
            })
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <div className="shadow-md bg-white rounded">
                  <Img
                    className="h-64 object-center object-cover rounded-t"
                    fluid={childImageSharp.fluid}
                  />

                  <div className="pt-4 px-4">
                    <div className="font-bold text-xl">{title}</div>
                    <div>{node.frontmatter.description}</div>
                    <div className="flex space-x-2 pt-2">
                      {node.frontmatter.tags.map((tag, idx) => (
                        <FoodTypeTag
                          key={`${node.fields.slug}-labels-${idx}`}
                          name={tag}
                        />
                      ))}
                    </div>
                  </div>
                  <ReadMoreButton slug={node.fields.slug} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default RecipesIndex

export const pageQuery = graphql`
  query {
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
    recipes: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/content/recipes/**" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail
            tags
          }
        }
      }
    }
  }
`
