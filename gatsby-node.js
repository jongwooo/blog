const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `article` });
        createNodeField({ node, name: `slug`, value: `/article${slug}` });
    }
};

const createBlogPages = ({ createPage, results }) => {
    const blogPostTemplate = require.resolve(`./src/templates/postTemplate.jsx`);
    results.data[`allMarkdownRemark`].edges.forEach(({ node, next, previous }) => {
        createPage({
            path: node.fields.slug,
            component: blogPostTemplate,
            context: {
                slug: node.fields.slug,
                nextSlug: next?.fields.slug ?? "",
                previousSlug: previous?.fields.slug ?? "",
            },
        });
    });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const results = await graphql(`
        {
            allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
                edges {
                    node {
                        id
                        frontmatter {
                            date(formatString: "YYYY년 MM월 DD일")
                            title
                        }
                        fields {
                            slug
                        }
                    }
                    next {
                        fields {
                            slug
                        }
                    }
                    previous {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    if (results.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    createBlogPages({ createPage, results });
};
