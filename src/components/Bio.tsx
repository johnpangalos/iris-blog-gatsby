import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Image } from "./Image"

const BioQuery = graphql`
  query BioQuery {
    bio: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/bio.md" } }
    ) {
      edges {
        node {
          frontmatter {
            description
            title
            profile_image
          }
        }
      }
    }
  }
`

type BioResponse = {
  bio: {
    edges: {
      node: {
        frontmatter: {
          description: string
          title: string
          profile_image: string
        }
      }
    }[]
  }
}

export const Bio = () => {
  const {
    bio: {
      edges: [
        {
          node: {
            frontmatter: { title, description, profile_image: profileImage },
          },
        },
      ],
    },
  } = useStaticQuery<BioResponse>(BioQuery)

  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-md px-5 w-full mx-auto py-16 xl:px-0 h-full flex-1">
        <div className="flex flex-col px-4 sm:px-0 sm:flex-row items-center">
          <div className="w-full max-w-xs pb-4 sm:p-0 sm:w-1/3 md:w-1/4">
            <Image name={profileImage} className="rounded-full" />
          </div>
          <div className="sm:pl-6 flex-1">
            <h3>{title}</h3>
            <div>{description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
