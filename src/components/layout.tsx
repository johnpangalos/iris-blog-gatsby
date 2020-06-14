import * as React from "react"
import { Link } from "gatsby"
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
          <a key={name} href={`#${name}`} className="pl-4">
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
  <div>
    <div className="max-w-screen-lg hidden md:block m-auto px-5 xl:px-0">
      <div className="py-5 flex items-center px-3 border-gray-900 border-b-2">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex-1" />
        <LinkWrapper to="/#recipes">Recipes</LinkWrapper>
        <LinkWrapper to="/#articles">Articles</LinkWrapper>
      </div>
    </div>

    <div className="md:hidden flex justify-center pt-6">
      <Link to="/">
        <Logo />
      </Link>
    </div>
  </div>
)

const LinkWrapper: React.FC<{ to: string }> = ({ children, to }) => (
  <Link
    to={to}
    className="pl-4 uppercase text-lg no-underline text-gray-800 hover:text-orange-500 transition-color duration-500 ease-in-out"
  >
    {children}
  </Link>
)

const Layout = ({ location, title, children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SearchBar />
      <HeaderNav />
      <div className="flex flex-col pt-6 h-full flex-1">
        <div className="flex-1 text-lg">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

const Footer: React.FC<{}> = () => (
  <div className="bg-gray-300">
    <div className="max-w-screen-lg pt-3 pb-8 m-auto">
      <div className="flex flex-col items-center">
        <Logo />
        <div className="flex items-baseline pb-2">
          <div className="text-xl">Follow us</div>
          {icons.map(name => (
            <a key={name} href={`#${name}`} className="pl-3">
              <FontAwesomeIcon
                style={{ fontSize: "1.15rem" }}
                className="text-gray-900"
                icon={{ prefix: "fab" as IconPrefix, iconName: name }}
              />
            </a>
          ))}
        </div>
        <div className="px-5 py-4 w-full">
          <div className="w-full border-b-2 border-gray-900" />
        </div>
        <div className="flex w-full justify-center pt-2">
          <LinkWrapper to="/#recipes">Recipes</LinkWrapper>
          <LinkWrapper to="/#articles">Articles</LinkWrapper>
        </div>
      </div>
    </div>
  </div>
)
export default Layout
