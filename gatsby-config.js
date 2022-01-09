const metaConfig = require("./gatsby-meta-config")

module.exports = {
    siteMetadata: metaConfig,

    plugins: [
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map(edge => {
                                return Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.description,
                                    date: edge.node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [{ "content:encoded": edge.node.html }],
                                })
                            })
                        },
                        query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      frontmatter {
                        date
                        title
                        description
                      }
                    }
                  }
                }
              }
            `,
                        output: `/rss.xml`,
                        title: `${metaConfig.title}`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-gtag`,
            options: {
                trackingId: `G-G347H7GN1W`,
                head: false,
                anonymize: true,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `thearchivelog.dev`,
                start_url: `/`,
                icon: `src/images/favicon-32x32.png`,
            },
        },
        {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
                host: `${metaConfig.siteUrl}`,
                sitemap: `${metaConfig.siteUrl}/sitemap-index.xml`,
                policy: [
                    {
                        userAgent: "*",
                        allow: "/",
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                output: "/",
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `article`,
                path: `${__dirname}/content`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                            showCaptions: ["title"],
                            markdownCaptions: true,
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-sharp`,
    ],
}
