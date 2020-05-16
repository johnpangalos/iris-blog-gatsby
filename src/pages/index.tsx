// Gatsby supports TypeScript natively!
import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Button } from "../components"

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
  allMarkdownRemark: {
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

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  console.log(data)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="font-bold text-4xl md:pb-3 flex-1">Brand New Eats!</div>
        <div className="flex pb-3 md:pb-0">
          <Button>All Recipies</Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {posts.map(({ node }) => {
          const {
            node: { childImageSharp },
          } = data.allFile.edges.find(edge => {
            return node.frontmatter.thumbnail.includes(edge.node.relativePath)
          })
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div className="md:w-1/3">
              <Link to={node.fields.slug} key={node.fields.slug}>
                <div className="p-3 shadow-md bg-white">
                  <Img
                    className="h-96 object-center object-cover"
                    fluid={childImageSharp.fluid}
                  />

                  <div className="font-bold text-2xl pt-2">{title}</div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
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
    allMarkdownRemark(
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
