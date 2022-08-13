const metaConfig = require("./gatsby-meta-config");

module.exports = {
    siteMetadata: metaConfig,

    plugins: [
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `${metaConfig.siteUrl}`,
                stripQueryString: true,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
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
                                    description: edge.node.excerpt,
                                    date: edge.node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [{ "content:encoded": edge.node.html }],
                                });
                            });
                        },
                        query: `
                            {
                                allMarkdownRemark(
                                    sort: { order: DESC, fields: [frontmatter___date] },
                                ) {
                                    edges {
                                        node {
                                            html
                                            excerpt
                                            fields { slug }
                                            frontmatter {
                                                date
                                                title
                                            }
                                        }
                                    }
                                }
                            }
                        `,
                        output: `/rss.xml`,
                        title: `${metaConfig.siteTitle}`,
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
                name: `${metaConfig.siteTitle}`,
                description: `${metaConfig.siteDescription}`,
                start_url: `/`,
                icon: `static/favicon.png`,
                icon_options: {
                    purpose: `any maskable`,
                },
                background_color: `white`,
                theme_color: `white`,
                display: `standalone`,
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
            resolve: `gatsby-plugin-sitemap`,
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
            resolve: `gatsby-transformer-remark`,
            options: {
                excerpt_separator: `<!-- end -->`,
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                            showCaptions: ["title"],
                            markdownCaptions: true,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: "language-",
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-emotion`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-preact`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sharp`,
    ],
};
