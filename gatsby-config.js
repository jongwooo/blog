const metaConfig = require("./gatsby-meta-config")

module.exports = {
    siteMetadata: metaConfig,

    plugins: [
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
                host: `https://thearchivelog.dev`,
                sitemap: `https://thearchivelog.dev/sitemap-index.xml`,
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
