import * as React from "react"
import styled from "@emotion/styled"

import { theme } from "../../styles/theme"

const PostHeaderWrapper = styled.div`
    padding: 24px 0;
    width: 100%;
`

const PostHeaderTitle = styled.h1`
    margin-bottom: 16px;
    color: ${theme.colors.grey.$900};
    font-size: 2rem;
    font-weight: 700;
    word-break: keep-all;
`

const PostHeaderDate = styled.p`
    color: ${theme.colors.grey.$500};
    font-size: 1rem;
    font-weight: 400;
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
