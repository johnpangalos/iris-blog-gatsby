import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const logoQuery = graphql`
  query LogoQuery {
    logo: file(absolutePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fixed(height: 75) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`

const Header = () => {
  const data = useStaticQuery(logoQuery)
  return (
    <div className="px-6">
      <div className="flex h-20 items-center px-5 border-b-2 border-gray-300">
        <Link to="/">
          <Image fixed={data.logo.childImageSharp.fixed} alt="logo" />
        </Link>
        <div className="flex-1" />
        <LinkWrapper to="/blogs">Blogs</LinkWrapper>
        <LinkWrapper to="/contact">Contact me</LinkWrapper>
      </div>
    </div>
  )
}

const LinkWrapper = ({ to, children }) => (
  <div className="pl-4">
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
