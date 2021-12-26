import * as React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { theme } from "../../styles/theme"

const PostCardWrapper = styled.div`
    padding: 3% 0;
    margin-bottom: 3%;
    line-height: 1.6;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
`

const PostCardTitle = styled(Link)`
    margin-top: 0;
    margin-bottom: ${theme.sizes.$3};
    overflow: hidden;
    font-size: ${theme.fonts.size.base};
    font-weight: ${theme.fonts.weight.bold};
    word-break: keep-all;
    overflow-wrap: break-word;
    transition: color 0.3s ease;
    text-decoration: none;
    color: ${theme.colors.grey.$900};

    &:hover {
        color: ${theme.colors.green.$700};
    }
`

const PostCardDescription = styled.p`
    color: ${theme.colors.grey.$700};
`

const PostCardDate = styled.p`
    color: ${theme.colors.grey.$500};
    margin-bottom: ${theme.sizes.$3};
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