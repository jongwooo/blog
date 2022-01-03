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
                        repo
                    }
                }
            }
        `,
    )

    return site.siteMetadata
}

export default useSiteMetaData
