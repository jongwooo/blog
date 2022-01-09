import * as React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { theme } from "../../styles/theme"

const PostCardWrapper = styled.div`
    padding: 3% 0;
    margin-top: 3%;
    line-height: 1.6;
    word-break: keep-all;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
`

const PostCardTitle = styled(Link)`
    overflow: hidden;
    font-size: ${theme.fonts.size.base};
    font-weight: ${theme.fonts.weight.bold};
    text-decoration: none;
    transition: color 0.3s ease;
    color: ${theme.colors.grey.$900};

    &:hover {
        color: ${theme.colors.green.$700};
    }
`

const PostCardDescription = styled.p`
    color: ${theme.colors.grey.$700};
    margin-top: ${theme.sizes.$3};
`

const PostCardDate = styled.p`
    color: ${theme.colors.grey.$500};
    margin-top: ${theme.sizes.$4};
`

const PostCard = ({ post }) => {
    return (
        <PostCardWrapper>
            <PostCardTitle to={post.slug}>{post.title}</PostCardTitle>
            <PostCardDescription>{post.description}</PostCardDescription>
            <PostCardDate>{post.date}</PostCardDate>
        </PostCardWrapper>
    )
}

export default PostCard
