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
                        siteKeywords
                        defaultOgImage
                        siteUrl
                        githubUrl
                        repo
                        naverToken
                    }
                }
            }
        `,
    );

    return site.siteMetadata;
};

export default useSiteMetaData;
