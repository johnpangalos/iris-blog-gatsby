import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

type AllFiles = {
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
}

export const Image: React.FC<{ name: string }> = ({ name }) => {
  const data = useStaticQuery(imageQuery)

  const {
    node: { childImageSharp },
  } = data.allFile.edges.find(edge => {
    return name.includes(edge.node.relativePath)
  })

  return (
    <Img className="object-center object-cover" fluid={childImageSharp.fluid} />
  )
}

const imageQuery = graphql`
  query ImageQuery {
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
  }
`
