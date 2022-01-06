module.exports = {
    siteMetadata: {
        title: `아카이브-로그`,
        author: `한종우`,
        description: `프론트엔드 엔지니어 한종우입니다.`,
        siteUrl: `https://thearchivelog.dev/`,
        githubUrl: `https://github.com/jongwooo/`,
        repo: `jongwooo/blog`,
    },
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
                sitemap: `https://thearchivelog.dev/sitemap.xml`,
                policy: [
                    {
                        userAgent: "*",
                        allow: "/",
                    },
                ],
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
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-sharp`,
    ],
}
