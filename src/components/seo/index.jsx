/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";

import useSiteMetaData from "../../hooks/useSiteMetaData";

const Seo = ({ description, lang, meta, title }) => {
    const { siteTitle, author, siteDescription, defaultOgImage, siteUrl } = useSiteMetaData();

    const metaDescription = description || siteDescription;
    const ogImageUrl = `${siteUrl}${defaultOgImage}`;
    const location = useLocation();

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={title === siteTitle ? null : `%s | ${siteTitle}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:url`,
                    content: `${siteUrl}${location.pathname}`,
                },
                {
                    property: `og:image`,
                    content: ogImageUrl,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    property: `twitter:image`,
                    content: ogImageUrl,
                },
                {
                    name: `naver-site-verification`,
                    content: `11caa82a2e04522f65c80a777a7ce992eedcc57d`,
                },
            ].concat(meta)}
        />
    );
};

Seo.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
};

Seo.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
};

export default Seo;
