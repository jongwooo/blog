/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import styled from "@emotion/styled"
import { Global } from "@emotion/react"

import { theme } from "../styles/theme"
import reset from "../styles/reset"
import PageHeader from "../components/page-header"
import useSiteMetaData from "../hooks/useSiteMetaData"

const Content = styled.div`
    margin: ${theme.sizes.$8} auto 0;
    padding: 0 5%;
    max-width: ${theme.sizes.container};
`

const Layout = ({ children }) => {
    const { siteTitle } = useSiteMetaData()

    return (
        <>
            <Global styles={reset} />
            <PageHeader siteTitle={siteTitle} />
            <Content>
                <main>{children}</main>
            </Content>
        </>
    )
}

export default Layout
