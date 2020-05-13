// Gatsby supports TypeScript natively!
import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
      {posts.map(({ node }) => {
        const {
          node: { childImageSharp },
        } = data.allFile.edges.find(edge => {
          return node.frontmatter.thumbnail.includes(edge.node.relativePath)
        })
        // const title = node.frontmatter.title || node.fields.slug
        return (
          <div className="w-1/3 px-2" key={node.fields.slug}>
            <Img fluid={childImageSharp.fluid} />
          </div>
        )
      })}
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
