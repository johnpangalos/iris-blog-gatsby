import * as React from "react"
import { PageProps, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Data } from "./types"
import { BlogPost, Image } from "../../components"

const Article = ({ data, location }: PageProps<Data>) => {
  const article = data.markdownRemark
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO
        title={article.frontmatter.title}
        description={article.frontmatter.description || article.excerpt}
      />
      <div className="max-w-screen-md m-auto px-6 lg:px-0 py-2 pb-6">
        <div className="text-4xl font-bold">{article.frontmatter.title}</div>
        <div className="pb-2">{article.frontmatter.date}</div>

        <div className="pb-4">
          <Image name={article.frontmatter.thumbnail} />
        </div>
        <div className="pb-6 border-gray-900 space-y-4">
          {article.htmlAst.children.map((item, idx) => (
            <BlogPost
              node={item}
              key={`root-${idx}`}
              rootIdx={idx.toString()}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Article

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      frontmatter {
        thumbnail
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
