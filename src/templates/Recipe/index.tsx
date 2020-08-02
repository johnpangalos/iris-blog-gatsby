import * as React from "react"
import { PageProps, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { FoodTypeTag, Image, BlogPost } from "../../components"
import { Data } from "./types"
import { RecipeTime } from "./RecipeTime"

const BlogPostTemplate = ({ data, location }: PageProps<Data>) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="max-w-screen-md m-auto px-4 lg:px-0 py-2 pb-6">
        <div className="text-4xl font-bold">{post.frontmatter.title}</div>

        <div>{post.frontmatter.date}</div>
        <div className="flex space-x-2 pt-2 pb-3">
          {post.frontmatter.tags.map(tag => (
            <FoodTypeTag key={`${post.frontmatter.title}-${tag}`} name={tag} />
          ))}
        </div>

        <div className="pb-4">
          <Image name={post.frontmatter.thumbnail} />
        </div>

        <div className="pb-6 border-b-2 border-gray-900 space-y-4">
          {post.htmlAst.children.map((item, idx) => (
            <BlogPost
              node={item}
              key={`root-${idx}`}
              rootIdx={idx.toString()}
            />
          ))}
        </div>

        <div className="flex-grow pb-2">
          <div className="text-3xl pt-6 font-bold">
            {post.frontmatter.title}
          </div>
          <div className="pb-4">{post.frontmatter.description}</div>

          <RecipeTime
            cookTime={post.frontmatter.cook_time}
            prepTime={post.frontmatter.prep_time}
          />
        </div>

        <div>
          <div className="font-bold text-2xl py-2">Ingredients</div>
          <ul className="list-disc list-outside pl-2">
            {post.frontmatter.meal_part.map((mp, idx) => (
              <React.Fragment key={`meal-part-${idx}`}>
                <div className="font-bold text-lg">{mp.name}</div>
                {mp.ingredients.map((ingredient, idx) => (
                  <li className="ml-8 pb-2" key={`ingredient-${idx}`}>
                    {ingredient.amount && `${ingredient.amount} `}
                    {ingredient.unit && `${ingredient.unit}`}
                    {ingredient.name} {ingredient.optional ? "(optional)" : ""}
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>

          <div className="font-bold text-2xl py-2">Instructions</div>
          <ol className="list-decimal list-outside pl-2">
            {post.frontmatter.instructions.map((instruction, idx) => (
              <li className="ml-8 pb-2" key={`instruction-${idx}`}>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        tags
        title
        cook_time
        servings
        serving_size
        instructions
        prep_time
        description
        course

        meal_part {
          name
          ingredients {
            amount
            name
            optional
            unit
          }
        }
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
