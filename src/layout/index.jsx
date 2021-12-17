/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import PageHeader from "../components/page-header"
import "./style.scss"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <>
            <PageHeader siteTitle={data.site.siteMetadata?.title || `Title`} />
            <div className="content-wrapper">
                <main>{children}</main>
            </div>
        </>
    )
}

export default Layout
