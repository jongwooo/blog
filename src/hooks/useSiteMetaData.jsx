import { graphql, useStaticQuery } from "gatsby";

const useSiteMetaData = () => {
  const { site } = useStaticQuery(graphql`
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
          naverToken
          giscusConfig {
            repo
            repoId
            category
            categoryId
            mapping
            reactionsEnabled
            emitMetadata
            inputPosition
            lang
            loading
          }
        }
      }
    }
  `);

  return site.siteMetadata;
};

export default useSiteMetaData;
