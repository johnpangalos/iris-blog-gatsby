import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

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

library.add(faInstagram, faPinterestP, faYoutube, faTwitter, faFacebookF)

const logoQuery = graphql`
  query LogoQuery {
    logo: file(absolutePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fixed(height: 35) {
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
  const data = useStaticQuery(logoQuery)
  return (
    <>
      <div className="flex justify-center h-12 bg-red-100">
        <div className="flex w-full h-full items-center max-w-6xl">
          <div className="flex-grow" />
          <div className="flex">
            {icons.map(name => (
              <a href={`#${name}`} className="px-2">
                <FontAwesomeIcon
                  className="text-2xl"
                  icon={{ prefix: "fab" as IconPrefix, iconName: name }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-6">
        <div className="max-w-6xl w-full">
          <div className="flex h-20 items-center px-5 border-b-2 border-gray-300">
            <Link to="/">
              <Image fixed={data.logo.childImageSharp.fixed} alt="logo" />
            </Link>
            <div className="flex-1" />
            <LinkWrapper to="/blogs">Blogs</LinkWrapper>
            <LinkWrapper to="/contact">Contact me</LinkWrapper>
          </div>
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
    <div>
      <Header />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
