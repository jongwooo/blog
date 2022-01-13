import * as React from "react"
import styled from "styled-components"

import { theme } from "../../styles/theme"

const PostHeaderWrapper = styled.div`
    padding: ${theme.sizes.$5} 0;
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
    color: ${theme.colors.grey.$500};
    font-size: ${theme.fonts.size.sm};
    font-weight: ${theme.fonts.weight.normal};
`

const PostHeader = ({ title, date }) => {
    return (
        <PostHeaderWrapper>
            <PostHeaderTitle>{title}</PostHeaderTitle>
            <PostHeaderDate>{date}</PostHeaderDate>
        </PostHeaderWrapper>
    )
}

export default PostHeader
