import * as React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { theme } from "../../styles/theme"

const PostNavWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: ${theme.sizes.$7} 0;
`

const PostNav = styled(Link)`
    flex: 0 0 calc(50% - 0.5rem);
    padding: ${theme.sizes.$5};
    box-sizing: border-box;
    text-decoration: none;
    line-height: 1.4;
    border-radius: 1px;

    & :hover {
        background-color: ${theme.colors.grey.$100};
    }
`

const PreviousCard = styled(PostNav)`
    margin-right: auto;
`

const NextCard = styled(PostNav)`
    margin-left: auto;
    text-align: right;
`

const Label = styled.span`
    font-size: 0.875rem;
    color: ${theme.colors.grey.$500};
`

const PostTitle = styled.p`
    font-weight: ${theme.fonts.weight.bold};
    color: ${theme.colors.grey.$900};
    margin: 0;
`

const PostNavigator = ({ previousPost, nextPost }) => {
    return (
        <PostNavWrapper>
            {previousPost && (
                <PreviousCard key={previousPost.id} to={previousPost.slug}>
                    <Label>이전 글</Label>
                    <PostTitle>{previousPost.title}</PostTitle>
                </PreviousCard>
            )}
            {nextPost && (
                <NextCard key={nextPost.id} to={nextPost.slug}>
                    <Label>다음 글</Label>
                    <PostTitle>{nextPost.title}</PostTitle>
                </NextCard>
            )}
        </PostNavWrapper>
    )
}

export default PostNavigator