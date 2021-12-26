module.exports = {
    siteMetadata: {
        title: `아카이브-로그`,
        author: `한종우`,
        description: `프론트엔드 엔지니어 한종우입니다.`,
        siteUrl: `https://thearchivelog.dev/`,
        githubUrl: `https://github.com/jongwooo/`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "article",
                path: `${__dirname}/content`,
            },
        },
        `gatsby-plugin-sitemap`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                display: `minimal-ui`,
                icon: `src/images/favicon-32x32.png`,
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
                        },
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
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: "https://thearchivelog.dev",
                sitemap: "https://thearchivelog.dev/sitemap.xml",
                policy: [
                    {
                        userAgent: "*",
                        allow: "/",
                    },
                ],
            },
        },
    ],
}
