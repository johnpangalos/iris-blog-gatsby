// Gatsby supports TypeScript natively!
import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Button, FoodTypeTag, Bio } from "../components"

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
  articles: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          thumbnail: string
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

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="max-w-screen-md w-full mx-auto px-6 md:px-0 pt-2 pb-10 h-full flex-1">
        <div className="flex items-center pb-3">
          <div className="font-bold text-2xl flex-1">New Eats!</div>
          <Button>All Recipies</Button>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {data.recipes.edges.map(({ node }) => {
            const {
              node: { childImageSharp },
            } = data.allFile.edges.find(edge => {
              return node.frontmatter.thumbnail.includes(edge.node.relativePath)
            })
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug} className="md:w-1/3">
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
      <div className="bg-blue-200 pt-5">
        <div className="max-w-screen-md w-full mx-auto px-6 md:px-0 pt-2 pb-10 h-full flex-1">
          <div className="flex items-center pb-3">
            <div className="font-bold text-2xl flex-1">Hot Takes!</div>
            <Button>All Posts</Button>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            {data.articles.edges.map(({ node }) => {
              const {
                node: { childImageSharp },
              } = data.allFile.edges.find(edge => {
                return node.frontmatter.thumbnail.includes(
                  edge.node.relativePath
                )
              })
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug} className="md:w-1/3">
                  <div className="shadow-md bg-white rounded">
                    <Img
                      className="h-64 object-center object-cover rounded-t"
                      fluid={childImageSharp.fluid}
                    />

                    <div className="pt-4 px-4">
                      <div className="font-bold text-xl">{title}</div>
                      <div>{node.frontmatter.description}</div>
                    </div>
                    <ReadMoreButton slug={node.fields.slug} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Bio />
    </Layout>
  )
}

export default BlogIndex

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
      limit: 3
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
    articles: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/content/articles/**" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
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
          }
        }
      }
    }
  }
`
