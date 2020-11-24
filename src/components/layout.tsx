import * as React from "react"
import { Link } from "gatsby"
import { Facebook, Instagram, Twitter, Youtube, IconProps } from "react-feather"

import Logo from "./Logo"

const icons: { name: string; Elem: React.FC<IconProps> }[] = [
  { name: "facebook", Elem: Facebook },
  { name: "instagram", Elem: Instagram },
  { name: "twitter", Elem: Twitter },
  { name: "youtube", Elem: Youtube },
]

const SearchBar = () => (
  <div className="h-12 bg-blue-200">
    <div className="flex w-full h-full px-3 md:px-0 mx-auto items-center max-w-screen-md">
      <div className="flex-grow" />
      <div className="flex">
        {icons.map(({ name, Elem }) => (
          <a key={name} href={`#${name}`} className="pl-4">
            <Elem color="black" />
          </a>
        ))}
      </div>
    </div>
  </div>
)

const NavLinks = () => (
  <div className="flex justify-center space-x-4">
    <div className="text-lg font-bold">&middot;</div>
    <LinkWrapper to="/recipes">Recipes</LinkWrapper>
    <div className="text-lg font-bold">&middot;</div>
    <LinkWrapper to="/articles">Articles</LinkWrapper>
    <div className="text-lg font-bold">&middot;</div>
  </div>
)
const HeaderNav = () => (
  <div className="w-full flex justify-center pt-10 px-4 md:px-0">
    <div className="max-w-screen-md w-full flex justify-center pb-8 pt-4 border-gray-900 border-b-2 border-t-2">
      <div className="flex flex-col">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <NavLinks />
      </div>
    </div>
  </div>
)

const LinkWrapper: React.FC<{ to: string }> = ({ children, to }) => (
  <Link
    to={to}
    className="uppercase text-lg text-gray-800 hover:text-orange-500 transition-color duration-500 ease-in-out"
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
    <div className="pt-10 pb-16 sm:pt-6 sm:pb-8 m-auto">
      <div className="flex flex-col items-center">
        <Logo />
        <div className="flex items-center pb-6">
          <div className="text-xl">Follow us</div>
          {icons.map(({ name, Elem }) => (
            <a key={name} href={`#${name}`} className="pl-4">
              <Elem color="black" />
            </a>
          ))}
        </div>

        <NavLinks />
      </div>
    </div>
  </div>
)
export default Layout
