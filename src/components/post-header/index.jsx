import * as React from "react"
import styled from "styled-components"

import { theme } from "../../styles/theme"

const PostHeaderWrapper = styled.div`
    padding-top: ${theme.sizes.$6};
    width: 100%;
`

const PostHeaderTitle = styled.h1`
    margin-bottom: ${theme.sizes.$5};
    color: ${theme.colors.grey.$900};
    font-size: ${theme.fonts.size.xl};
    font-weight: ${theme.fonts.weight.bold};
    word-break: keep-all;
`

const PostHeaderDate = styled.p`
    margin: ${theme.sizes.$5} 0;
    color: ${theme.colors.grey.$500};
    font-size: ${theme.fonts.size.sm};
    font-weight: ${theme.fonts.weight.normal};
`

const PostHeaderDivider = styled.hr`
    margin: 0 0 ${theme.sizes.$6};
    border: 0;
    border-top: thin solid ${theme.colors.greyOpacity.$400};
`

const PostHeader = ({ title, date }) => {
    return (
        <PostHeaderWrapper>
            <PostHeaderTitle>{title}</PostHeaderTitle>
            <PostHeaderDate>{date}</PostHeaderDate>
            <PostHeaderDivider />
        </PostHeaderWrapper>
    )
}

export default PostHeader
