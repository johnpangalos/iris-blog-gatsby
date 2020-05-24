import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FoodTypeTag } from "../components"

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
    html: string
    frontmatter: {
      thumbnail: string
      tags: string[]
      title: string
      cook_time: number
      prep_time: number
      servings: string
      serving_size: string
      instructions: string
      description: string
      course: string
      ingredients: {
        amount: string
        name: string
        optional: string
        unit: string
      }
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
      <div className="text-4xl font-bold">{post.frontmatter.title}</div>

      <div>{post.frontmatter.date}</div>
      <div className="flex space-x-2 py-2">
        {post.frontmatter.tags.map(tag => (
          <FoodTypeTag key={`${post.frontmatter.title}-${tag}`} name={tag} />
        ))}
      </div>

      <Img
        className="object-center object-cover"
        fluid={childImageSharp.fluid}
      />

      <div className="py-3">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <div>
        <div className="flex">
          <div className="flex-grow">
            <div className="text-3xl font-bold">{post.frontmatter.title}</div>
            <div>{post.frontmatter.description}</div>
            <div>
              <div>Prep time</div>
              <div>{post.frontmatter.prep_time}</div>
            </div>
          </div>
          <Img
            className="w-64 h-64 object-center object-cover"
            fluid={childImageSharp.fluid}
          />
        </div>
      </div>
    </Layout>
  )
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
      html
      frontmatter {
        thumbnail
        tags
        title
        servings
        serving_size
        instructions
        prep_time
        description
        course
        ingredients {
          amount
          name
          optional
          unit
        }
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
