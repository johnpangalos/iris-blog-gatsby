import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import cn from "classnames"

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

export const Image: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  const data = useStaticQuery(imageQuery)
  const {
    node: { childImageSharp },
  } = data.allFile.edges.find(edge => {
    return name.includes(edge.node.relativePath)
  })

  return (
    <Img
      className={cn("object-center object-cover", className)}
      fluid={childImageSharp.fluid}
    />
  )
}

const imageQuery = graphql`
  query ImageQuery {
    allFile {
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
