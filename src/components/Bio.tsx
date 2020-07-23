import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Image } from "./Image"

const BioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author {
          name
          summary
        }
      }
    }
  }
`

type BioResponse = {
  site: {
    siteMetadata: {
      author: {
        name: string
        summary: string
      }
    }
  }
}

export const Bio = () => {
  const {
    site: {
      siteMetadata: {
        author: { name, summary },
      },
    },
  } = useStaticQuery<BioResponse>(BioQuery)

  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-md px-5 w-full mx-auto py-16 xl:px-0 h-full flex-1">
        <div className="flex flex-col px-4 sm:px-0 sm:flex-row items-center">
          <div className="w-full max-w-xs pb-4 sm:p-0 sm:w-1/3 md:w-1/4">
            <Image name="profile-pic.png" className="rounded-full" />
          </div>
          <div className="sm:pl-6 flex-1">
            <h3>About {name}</h3>
            <div>{summary}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
