import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import {
  library,
  IconPrefix,
  IconName,
} from "@fortawesome/fontawesome-svg-core"
import {
  faInstagram,
  faPinterestP,
  faYoutube,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Img from "gatsby-image"

library.add(faInstagram, faPinterestP, faYoutube, faTwitter, faFacebookF)

const logoQuery = graphql`
  query LogoQuery {
    logo: file(absolutePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fixed(height: 50) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`

const icons: IconName[] = [
  "facebook-f",
  "instagram",
  "twitter",
  "pinterest-p",
  "youtube",
]

const Header = () => {
  const data = useStaticQuery<any>(logoQuery)
  console.log(data)
  return (
    <>
      <div className="h-12 bg-blue-200">
        <div className="flex w-full h-full mx-auto items-center max-w-screen-lg">
          <div className="flex-grow" />
          <div className="flex">
            {icons.map(name => (
              <a href={`#${name}`} className="px-2">
                <FontAwesomeIcon
                  style={{ fontSize: "1.2rem" }}
                  className="text-gray-900"
                  icon={{ prefix: "fab" as IconPrefix, iconName: name }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg w-full mx-auto pb-6 pt-5">
        <div className="flex h-20 items-center">
          <Link to="/" className="bg-blue-400 p-2">
            <Img fadeIn={false} fixed={data.logo.childImageSharp.fixed} />
          </Link>
          <div className="flex-1" />
          <LinkWrapper to="/blogs">Blogs</LinkWrapper>
          <LinkWrapper to="/contact">Contact me</LinkWrapper>
        </div>
      </div>
    </>
  )
}

const LinkWrapper = ({ to, children }) => (
  <div className="pl-4 pb-1">
    <Link to={to}>{children}</Link>
  </div>
)

const Layout = ({ location, title, children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="max-w-screen-lg w-full mx-auto flex-1">{children}</div>
      <div className="max-w-screen-lg w-full mx-auto py-3 border-t-2">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </div>
  )
}

export default Layout
