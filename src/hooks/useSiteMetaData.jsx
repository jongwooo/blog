import { graphql, useStaticQuery } from "gatsby";

const useSiteMetaData = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteTitle
                        author
                        greetings
                        siteDescription
                        defaultOgImage
                        siteUrl
                        githubUrl
                        repo
                    }
                }
            }
        `,
    );

    return site.siteMetadata;
};

export default useSiteMetaData;
