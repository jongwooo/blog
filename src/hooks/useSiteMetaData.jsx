import { graphql, useStaticQuery } from "gatsby"

const useSiteMetaData = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        author
                        description
                        githubUrl
                    }
                }
            }
        `,
    )

    return site.siteMetadata
}

export default useSiteMetaData
