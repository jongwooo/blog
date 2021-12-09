exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const { data, errors } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              date
              title
              description
              path 
            }
          }
        }
      }
    }
  `);

    if (errors) {
        throw errors;
    }

    data['allMarkdownRemark'].edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.path,
            context: {
                html: node.html,
                title: node.frontmatter.title,
                description: node.frontmatter.description
            },
            component: require.resolve('./src/templates/postTemplate.js'),
        });
    });
}
