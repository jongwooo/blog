import { graphql, useStaticQuery } from "gatsby"

const useSiteMetaData = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteTitle
                        author
                        siteDescription
                        greetings
                        githubUrl
                        repo
                    }
                }
            }
        `,
    )

    return site.siteMetadata
}

export default useSiteMetaData
