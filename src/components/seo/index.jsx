/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";

import useSiteMetaData from "../../hooks/useSiteMetaData";

const Seo = ({ description, title, keywords, children }) => {
    const { siteTitle, author, siteDescription, siteKeywords, defaultOgImage, siteUrl, naverToken } = useSiteMetaData();

    const metaTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const metaDescription = description || siteDescription;
    const metaKeywords = keywords || siteKeywords;
    const ogImageUrl = `${siteUrl}${defaultOgImage}`;
    const location = useLocation();

    return (
        <>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl + location.pathname} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={author} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaDescription} />
            <meta name="naver-site-verification" content={naverToken} />
            {children}
        </>
    );
};

Seo.defaultProps = {
    description: ``,
};

Seo.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    keywords: PropTypes.string,
};

export default Seo;
