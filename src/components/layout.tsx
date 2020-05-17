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
import Logo from "./Logo"

library.add(faInstagram, faPinterestP, faYoutube, faTwitter, faFacebookF)

const icons: IconName[] = [
  "facebook-f",
  "instagram",
  "twitter",
  "pinterest-p",
  "youtube",
]

const SearchBar = () => (
  <div className="h-12 bg-blue-200">
    <div className="flex w-full h-full mx-auto items-center max-w-screen-lg px-5 xl:px-0">
      <div className="flex-grow" />
      <div className="flex">
        {icons.map(name => (
          <a href={`#${name}`} className="pl-4">
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
)
const HeaderNav = () => (
  <div className="pb-6 pt-5">
    <div className="flex h-20 items-center border-b-2">
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex-1" />
    </div>
  </div>
)

// const LinkWrapper = ({ to, children }) => (
// <div className="pl-4 pb-1">
// <Link to={to}>{children}</Link>
// </div>
// )

const Layout = ({ location, title, children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SearchBar />
      <div className="flex flex-col max-w-screen-lg w-full mx-auto px-5 xl:px-0 h-full flex-1">
        <HeaderNav />
        <div className="flex-1 pb-4">{children}</div>
        <div className="py-3 border-t-2">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </div>
  )
}

export default Layout
