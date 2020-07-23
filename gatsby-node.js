const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const recipePage = path.resolve(`./src/templates/Recipe/index.tsx`)
  const articlePage = path.resolve(`./src/templates/Article/index.tsx`)
  const result = await graphql(
    `
      {
        recipes: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/content/recipes/**" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        articles: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/content/articles/**" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const recipes = result.data.recipes.edges
  const articles = result.data.articles.edges

  recipes.forEach((post, index) => {
    const previous =
      index === recipes.length - 1 ? null : recipes[index + 1].node
    const next = index === 0 ? null : recipes[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: recipePage,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  articles.forEach((post, index) => {
    const previous =
      index === articles.length - 1 ? null : articles[index + 1].node
    const next = index === 0 ? null : articles[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: articlePage,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
