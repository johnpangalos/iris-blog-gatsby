import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Image } from "./Image"

const Bio = () => {
  const data = useStaticQuery(graphql`
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
  `)

  const {
    author: { name, summary },
  } = data.site.siteMetadata
  return (
    <div className="bg-blue-200">
      <div className="max-w-screen-md px-5 w-full mx-auto py-10 xl:px-0 h-full flex-1">
        <div className="flex">
          <div className="w-64">
            <Image name="profile-pic.png" className="rounded-full" />
          </div>
          <div className="pl-6">
            <h3>About {name}</h3>
            <div>{summary}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bio
