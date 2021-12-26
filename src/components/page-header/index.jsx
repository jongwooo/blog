import * as React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { theme } from "../../styles/theme"

const PageHeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${theme.zIndices.$1};
    height: ${theme.sizes.$8};
    box-sizing: border-box;
    border-bottom: ${theme.sizes.$1} solid ${theme.colors.greyOpacity.$400};
    background-color: ${theme.colors.whiteOpacity.$900};
`

const PageHeaderBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 5%;
    margin: auto;
    max-width: ${theme.sizes.container};
`

const PageTitle = styled(Link)`
    color: ${theme.colors.green.$700};
    font-size: ${theme.fonts.size.lg};
    font-weight: ${theme.fonts.weight.bold};
    text-decoration: none;
`

const PageHeader = ({ siteTitle }) => {
    return (
        <PageHeaderWrapper>
            <PageHeaderBody>
                <PageTitle to="/">{siteTitle}</PageTitle>
            </PageHeaderBody>
        </PageHeaderWrapper>
    )
}

export default PageHeader
